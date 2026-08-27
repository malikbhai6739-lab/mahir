"use client";

import Link from "next/link";
import { OrderDetail } from "@/components/orders/order-detail";
import { useOrders } from "@/components/orders/order-context";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export function OrderDetailRoute({ orderId }: { orderId: string }) {
  const { orders, hydrated } = useOrders();
  const order = orders.find((item) => item.id === orderId || item.bookingId === orderId);

  if (!hydrated) {
    return <><SiteHeader /><main className="bg-background pb-24"><div className="site-container py-14"><div className="mx-auto max-w-xl rounded-2xl border border-line bg-white p-8 text-center shadow-card"><h1 className="text-3xl font-bold text-foreground">Loading your order</h1></div></div></main><SiteFooter /></>;
  }

  if (!order) {
    return <><SiteHeader /><main className="bg-background pb-24"><div className="site-container py-14"><div className="mx-auto max-w-xl rounded-2xl border border-line bg-white p-8 text-center shadow-card"><h1 className="text-3xl font-bold text-foreground">Order not found</h1><p className="mt-3 text-muted">This booking is no longer available.</p><Link href="/orders" className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-dark">Back to My Orders</Link></div></div></main><SiteFooter /></>;
  }

  return <><SiteHeader /><OrderDetail order={order} /><SiteFooter /></>;
}
