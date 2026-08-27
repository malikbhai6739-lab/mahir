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
    return Array.isArray(parsed) ? parsed : [];
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

  const addItem = (item: CartSeed) => {
    setItems((current) => {
      const existing = current.find((entry) => entry.slug === item.slug || entry.id === item.id);

      if (!existing) {
        return [
          ...current,
          {
            ...item,
            quantity: 1,
          },
        ];
      }

      return current.map((entry) =>
        entry.slug === item.slug || entry.id === item.id
          ? { ...entry, quantity: entry.quantity + 1 }
          : entry,
      );
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems((current) =>
      current
        .map((entry) =>
          entry.id === id ? { ...entry, quantity: Math.max(1, quantity) } : entry,
        )
        .filter((entry) => entry.quantity > 0),
    );
  };

  const removeItem = (id: string) => {
    setItems((current) => current.filter((entry) => entry.id !== id));
  };

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
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

  const estimatedTotal = Math.max(subtotal - discount, 0);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addItem,
      updateQuantity,
      removeItem,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
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
