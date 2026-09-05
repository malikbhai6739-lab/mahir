"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { OrderSummary } from "@/components/orders/order-summary";
import { getOrderStatusLabel } from "@/data/orders";
import {
  cancelOrder,
  clearAuthToken,
  getAuthToken,
  MahirApiError,
  type MahirOrder,
} from "@/lib/mahir-api";

function getStatusStyle(status: string) {
  if (status === "completed") return "bg-success/10 text-success";
  if (status === "cancelled") return "bg-red-50 text-red-700";
  if (status === "confirmed") return "bg-brand-soft text-brand";
  if (status === "on-the-way" || status === "in-progress") {
    return "bg-amber-100 text-amber-800";
  }

  return "bg-brand-soft text-brand";
}

type OrderDetailProps = {
  order: MahirOrder;
  onOrderUpdated?: (order: MahirOrder) => void;
  onRefresh?: () => void;
  onNotFound?: () => void;
};

export function OrderDetail({
  order,
  onOrderUpdated,
  onRefresh,
  onNotFound,
}: OrderDetailProps) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);

  const cancelled = order.status === "cancelled";
  const canCancel = order.status === "confirmed";

  const handleCancelBooking = async () => {
    const token = getAuthToken();
    if (!token) {
      router.replace(`/login?next=${encodeURIComponent(`/orders/${order.id}`)}`);
      return;
    }

    try {
      setIsCancelling(true);
      setCancelError(null);

      const updatedOrder = await cancelOrder(token, order.id);

      onOrderUpdated?.(updatedOrder);
      setShowConfirm(false);
    } catch (err) {
      if (err instanceof MahirApiError && err.status === 401) {
        clearAuthToken();
        router.replace(`/login?next=${encodeURIComponent(`/orders/${order.id}`)}`);
        return;
      }

      if (err instanceof MahirApiError && err.status === 404) {
        onNotFound?.();
        return;
      }

      if (err instanceof MahirApiError && err.status === 409) {
        setCancelError(
          "This booking cannot be cancelled in its current status. Refreshing details...",
        );
        onRefresh?.();
        return;
      }

      if (err instanceof MahirApiError) {
        setCancelError(err.message || "Failed to cancel booking. Please try again.");
      } else if (err instanceof Error) {
        setCancelError(err.message || "Failed to cancel booking. Please try again.");
      } else {
        setCancelError("Unable to cancel booking. Check your connection and try again.");
      }
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <main className="bg-background pb-24">
      <div className="site-container py-8 sm:py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Link
              href="/orders"
              className="text-sm font-semibold text-brand hover:text-brand-dark"
            >
              ← Back to My Orders
            </Link>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.13em] text-brand">
              Booking details
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
              {order.service.name}
            </h1>
            <p className="mt-2 text-sm text-muted">{order.order_number}</p>
          </div>
          <span
            className={`rounded-full px-3 py-1.5 text-sm font-bold ${getStatusStyle(order.status)}`}
          >
            {getOrderStatusLabel(order.status)}
          </span>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)]">
          <div className="space-y-6">
            <section className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6">
              <h2 className="text-xl font-bold text-foreground">
                Service schedule
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                    Scheduled date
                  </p>
                  <p className="mt-2 font-semibold text-foreground">
                    {order.date}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                    Scheduled time
                  </p>
                  <p className="mt-2 font-semibold text-foreground">
                    {order.time}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                    Service city
                  </p>
                  <p className="mt-2 font-semibold text-foreground">
                    {order.service_city.name}
                  </p>
                </div>
              </div>
            </section>

            {cancelled ? (
              <section className="rounded-2xl border border-red-100 bg-red-50 p-5">
                <h2 className="text-lg font-bold text-red-800">
                  This booking was cancelled
                </h2>
                <p className="mt-2 text-sm leading-6 text-red-700">
                  You can book this service again whenever you are ready.
                </p>
              </section>
            ) : null}

            <section className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6">
              <h2 className="text-xl font-bold text-foreground">
                Service address
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                {order.address}
                <br />
                {order.city}
              </p>
              {order.notes ? (
                <div className="mt-5 border-t border-line pt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                    Address notes
                  </p>
                  <p className="mt-2 text-sm leading-6 text-foreground">
                    {order.notes}
                  </p>
                </div>
              ) : null}
            </section>

            {canCancel ? (
              <section className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6">
                <h2 className="text-xl font-bold text-foreground">
                  Cancel Booking
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted">
                  If your schedule has changed, you can cancel this booking. Your reserved time slot will be released.
                </p>
                {!showConfirm ? (
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowConfirm(true);
                        setCancelError(null);
                      }}
                      className="inline-flex min-h-10 items-center justify-center rounded-xl border border-red-200 px-4 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
                    >
                      Cancel Booking
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 rounded-xl border border-red-200 bg-red-50/50 p-4">
                    <p className="text-sm font-semibold text-foreground">
                      Are you sure you want to cancel this booking?
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      This action cannot be undone and your scheduled time slot will be reopened for other customers.
                    </p>
                    {cancelError ? (
                      <p role="alert" className="mt-3 text-sm font-semibold text-red-600">
                        {cancelError}
                      </p>
                    ) : null}
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        type="button"
                        disabled={isCancelling}
                        onClick={handleCancelBooking}
                        className="inline-flex min-h-10 items-center justify-center rounded-xl bg-red-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isCancelling ? "Cancelling..." : "Yes, Cancel Booking"}
                      </button>
                      <button
                        type="button"
                        disabled={isCancelling}
                        onClick={() => {
                          setShowConfirm(false);
                          setCancelError(null);
                        }}
                        className="inline-flex min-h-10 items-center justify-center rounded-xl border border-line bg-white px-4 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Keep Booking
                      </button>
                    </div>
                  </div>
                )}
              </section>
            ) : null}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <OrderSummary order={order} />
            <section className="rounded-2xl border border-line bg-white p-5 shadow-card">
              <h2 className="text-lg font-bold text-foreground">
                Booking reference
              </h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-muted">Order number</dt>
                  <dd className="mt-1 font-semibold text-foreground">
                    {order.order_number}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted">Created</dt>
                  <dd className="mt-1 font-semibold text-foreground">
                    {order.created_at}
                  </dd>
                </div>
              </dl>
              <Link
                href={`/services/${order.service.slug}`}
                className="mt-5 inline-flex min-h-10 items-center justify-center rounded-xl border border-line px-4 text-sm font-semibold text-foreground hover:border-brand hover:text-brand"
              >
                Book This Service Again
              </Link>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
