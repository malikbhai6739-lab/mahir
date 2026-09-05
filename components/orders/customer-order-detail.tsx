import Link from "next/link";
import { OrderSummary } from "@/components/orders/order-summary";
import { getOrderStatusLabel } from "@/data/orders";
import type { MahirOrder } from "@/lib/mahir-api";

function getStatusStyle(status: string) {
  if (status === "completed") return "bg-success/10 text-success";
  if (status === "cancelled") return "bg-red-50 text-red-700";
  if (status === "on-the-way" || status === "in-progress") {
    return "bg-amber-100 text-amber-800";
  }

  return "bg-brand-soft text-brand";
}

export function OrderDetail({ order }: { order: MahirOrder }) {
  const cancelled = order.status === "cancelled";

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
