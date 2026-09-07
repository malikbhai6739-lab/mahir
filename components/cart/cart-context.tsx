"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartLineItem = {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: number;
  quantity: number;
};

type CartSeed = Pick<
  CartLineItem,
  "id" | "slug" | "title" | "category" | "description" | "image" | "price" | "originalPrice"
>;

type CartContextValue = {
  items: CartLineItem[];
  addItem: (item: CartSeed) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  discount: number;
  estimatedTotal: number;
  hydrated: boolean;
  isInCart: (id: string) => boolean;
  getItemBySlug: (slug: string) => CartLineItem | undefined;
};

const STORAGE_KEY = "mahir-cart-v1";

const CartContext = createContext<CartContextValue | undefined>(undefined);

function readStoredCart(): CartLineItem[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored) as CartLineItem[];
    // Enforce single-service architecture on read: keep at most 1 item with quantity 1
    if (Array.isArray(parsed) && parsed.length > 0) {
      const first = parsed[0];
      if (first && typeof first.slug === "string") {
        return [{ ...first, quantity: 1 }];
      }
    }
    return [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLineItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setItems(readStoredCart());
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [hydrated, items]);

  // Under Mahir single-service booking model, adding a service deterministically replaces
  // any previous service in the cart with quantity 1.
  const addItem = (item: CartSeed) => {
    setItems([
      {
        ...item,
        quantity: 1,
      },
    ]);
  };

  const updateQuantity = (id: string) => {
    // In single-service model, quantity is always strictly 1
    setItems((current) =>
      current.map((entry) =>
        entry.id === id ? { ...entry, quantity: 1 } : entry,
      ),
    );
  };

  const removeItem = (id: string) => {
    setItems((current) => current.filter((entry) => entry.id !== id));
  };

  const clearCart = () => {
    setItems([]);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        // Gracefully ignore storage errors
      }
    }
  };

  // Pricing:
  // - originalSubtotal: sum of (originalPrice ?? price)
  // - discount: sum of (originalPrice - price) when originalPrice > price
  // - estimatedTotal: sum of current price (never double-subtracts discount)
  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) =>
          sum + (item.originalPrice ?? item.price) * item.quantity,
        0,
      ),
    [items],
  );

  const discount = useMemo(
    () =>
      items.reduce((sum, item) => {
        if (!item.originalPrice || item.originalPrice <= item.price) return sum;
        return sum + (item.originalPrice - item.price) * item.quantity;
      }, 0),
    [items],
  );

  const estimatedTotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      itemCount: items.length,
      subtotal,
      discount,
      estimatedTotal,
      hydrated,
      isInCart: (id: string) => items.some((item) => item.id === id),
      getItemBySlug: (slug: string) => items.find((item) => item.slug === slug),
    }),
    [discount, estimatedTotal, hydrated, items, subtotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
