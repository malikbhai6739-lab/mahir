"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { OrderDetail } from "@/components/orders/customer-order-detail";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  clearAuthToken,
  fetchOrder,
  getAuthToken,
  MahirApiError,
  type MahirOrder,
} from "@/lib/mahir-api";

export function OrderDetailRoute({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [order, setOrder] = useState<MahirOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  useEffect(() => {
    const token = getAuthToken();
    const returnPath = `/orders/${orderId}`;

    if (!token) {
      router.replace(`/login?next=${encodeURIComponent(returnPath)}`);
      return;
    }

    let active = true;

    async function loadOrder(authToken: string) {
      setLoading(true);
      setError(null);
      setNotFound(false);

      try {
        const response = await fetchOrder(authToken, orderId);
        if (!active) return;

        setOrder(response);
      } catch (loadError) {
        if (!active) return;

        if (loadError instanceof MahirApiError && loadError.status === 401) {
          clearAuthToken();
          router.replace(`/login?next=${encodeURIComponent(returnPath)}`);
          return;
        }

        if (loadError instanceof MahirApiError && loadError.status === 404) {
          setOrder(null);
          setNotFound(true);
          return;
        }

        setError(
          "Unable to load this order. Check your connection and try again.",
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadOrder(token);

    return () => {
      active = false;
    };
  }, [orderId, reloadTrigger, router]);

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
                <span className="sr-only">Loading your order...</span>
              </div>
              <h1 className="mt-4 text-3xl font-bold text-foreground">
                Loading your order
              </h1>
            </div>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  if (notFound) {
    return (
      <>
        <SiteHeader />
        <main className="bg-background pb-24">
          <div className="site-container py-14">
            <div className="mx-auto max-w-xl rounded-2xl border border-line bg-white p-8 text-center shadow-card">
              <h1 className="text-3xl font-bold text-foreground">
                Order not found
              </h1>
              <p className="mt-3 text-muted">
                This booking is unavailable or does not belong to your account.
              </p>
              <Link
                href="/orders"
                className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-dark"
              >
                Back to My Orders
              </Link>
            </div>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  if (error) {
    return (
      <>
        <SiteHeader />
        <main className="bg-background pb-24">
          <div className="site-container py-14">
            <div className="mx-auto max-w-xl rounded-2xl border border-line bg-white p-8 text-center shadow-card">
              <h1 className="text-3xl font-bold text-foreground">
                Unable to load order
              </h1>
              <p className="mt-3 text-muted">{error}</p>
              <button
                type="button"
                onClick={() => setReloadTrigger((count) => count + 1)}
                className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-dark"
              >
                Try Again
              </button>
            </div>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  if (!order) return null;

  return (
    <>
      <SiteHeader />
      <OrderDetail
        order={order}
        onOrderUpdated={(updated) => setOrder(updated)}
        onRefresh={() => setReloadTrigger((count) => count + 1)}
        onNotFound={() => setNotFound(true)}
      />
      <SiteFooter />
    </>
  );
}
