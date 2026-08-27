"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { mockOrders, type Order } from "@/data/orders";

const STORAGE_KEY = "mahir-orders-v1";
type OrderContextValue = { orders: Order[]; hydrated: boolean; addOrder: (order: Order) => void };
const OrderContext = createContext<OrderContextValue | undefined>(undefined);

function readStoredOrders() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored) as Order[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([...mockOrders]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setOrders((current) => {
        const stored = readStoredOrders();
        const storedIds = new Set(stored.map((order) => order.id));
        return [...current.filter((order) => !storedIds.has(order.id)), ...stored];
      });
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const customerOrders = orders.filter((order) => !mockOrders.some((mock) => mock.id === order.id));
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(customerOrders));
  }, [hydrated, orders]);

  const value = useMemo(() => ({ orders, hydrated, addOrder: (order: Order) => setOrders((current) => [order, ...current.filter((item) => item.id !== order.id)]) }), [hydrated, orders]);
  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used inside OrderProvider");
  return context;
}
