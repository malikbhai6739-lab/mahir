"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { OrderCard } from "@/components/orders/order-card";
import { OrderTabs } from "@/components/orders/order-tabs";
import { getOrderTab, type OrderTab } from "@/data/orders";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  clearAuthToken,
  fetchOrders,
  getAuthToken,
  MahirApiError,
  type MahirOrder,
} from "@/lib/mahir-api";

export default function OrdersPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<OrderTab>("upcoming");
  const [allOrders, setAllOrders] = useState<MahirOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const orders = allOrders.filter((order) => getOrderTab(order.status) === activeTab);

  useEffect(() => {
    const token = getAuthToken();

    if (!token) {
      router.replace("/login?next=/orders");
      return;
    }

    let active = true;

    async function loadOrders(authToken: string) {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchOrders(authToken);
        if (!active) return;

        setAllOrders(response);
      } catch (loadError) {
        if (!active) return;

        if (loadError instanceof MahirApiError && loadError.status === 401) {
          clearAuthToken();
          router.replace("/login?next=/orders");
          return;
        }

        setError(
          "Unable to load your orders. Check your connection and try again.",
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadOrders(token);

    return () => {
      active = false;
    };
  }, [reloadTrigger, router]);

  if (loading) {
    return (
      <>
        <SiteHeader />
        <main className="bg-background pb-24">
          <div className="site-container py-14">
            <div className="mx-auto max-w-xl rounded-2xl border border-line bg-white p-8 text-center shadow-card">
              <div
                className="mx-auto size-9 animate-spin rounded-full border-4 border-brand border-r-transparent"
                role="status"
              >
                <span className="sr-only">Loading your orders...</span>
              </div>
              <h1 className="mt-4 text-3xl font-bold text-foreground">
                Loading your orders
              </h1>
            </div>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      <main className="bg-background pb-24">
        <div className="site-container py-10 sm:py-14">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.13em] text-brand">
                Your account
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
                My Orders
              </h1>
              <p className="mt-3 text-base leading-7 text-muted sm:text-lg">
                Track and review your service bookings.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-line bg-white px-4 text-sm font-semibold text-foreground hover:border-brand hover:text-brand"
            >
              Book another service
            </Link>
          </div>

          {error ? (
            <div className="mt-8 rounded-[1.5rem] border border-line bg-white p-8 text-center shadow-card sm:p-12">
              <h2 className="text-2xl font-bold text-foreground">
                Unable to load orders
              </h2>
              <p className="mx-auto mt-3 max-w-md text-base leading-7 text-muted">
                {error}
              </p>
              <button
                type="button"
                onClick={() => setReloadTrigger((count) => count + 1)}
                className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-6 text-base font-semibold text-white hover:bg-brand-dark"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              <div className="mt-8">
                <OrderTabs activeTab={activeTab} onChange={setActiveTab} />
              </div>
              <div className="mt-6 space-y-4">
                {orders.length ? (
                  orders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))
                ) : (
                  <div className="rounded-[1.5rem] border border-line bg-white p-8 text-center shadow-card sm:p-12">
                    <h2 className="text-2xl font-bold text-foreground">
                      {allOrders.length
                        ? `No ${activeTab} bookings`
                        : "No bookings yet"}
                    </h2>
                    <p className="mx-auto mt-3 max-w-md text-base leading-7 text-muted">
                      {allOrders.length
                        ? "Your bookings with this status will appear here."
                        : "Book a professional home service and your orders will appear here."}
                    </p>
                    {!allOrders.length ? (
                      <Link
                        href="/services"
                        className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-6 text-base font-semibold text-white hover:bg-brand-dark"
                      >
                        Browse Services
                      </Link>
                    ) : null}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
