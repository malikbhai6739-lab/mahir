"use client";

import Link from "next/link";
import { useState } from "react";
import { OrderCard } from "@/components/orders/order-card";
import { OrderTabs } from "@/components/orders/order-tabs";
import { getOrderTab, mockOrders, type OrderTab } from "@/data/orders";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<OrderTab>("upcoming");
  const orders = mockOrders.filter((order) => getOrderTab(order.status) === activeTab);
  return <><SiteHeader /><main className="bg-background pb-24"><div className="site-container py-10 sm:py-14"><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.13em] text-brand">Your account</p><h1 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">My Orders</h1><p className="mt-3 text-base leading-7 text-muted sm:text-lg">Track, manage, and review your service bookings.</p></div><Link href="/services" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-line bg-white px-4 text-sm font-semibold text-foreground hover:border-brand hover:text-brand">Book another service</Link></div><div className="mt-8"><OrderTabs activeTab={activeTab} onChange={setActiveTab} /></div><div className="mt-6 space-y-4">{orders.length ? orders.map((order) => <OrderCard key={order.id} order={order} />) : <div className="rounded-[1.5rem] border border-line bg-white p-8 text-center shadow-card sm:p-12"><h2 className="text-2xl font-bold text-foreground">No bookings yet</h2><p className="mx-auto mt-3 max-w-md text-base leading-7 text-muted">Book a professional home service and your orders will appear here.</p><Link href="/services" className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-6 text-base font-semibold text-white hover:bg-brand-dark">Browse Services</Link></div>}</div></div></main><SiteFooter /></>;
}
