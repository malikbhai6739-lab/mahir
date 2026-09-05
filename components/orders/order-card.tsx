import Link from "next/link";
import { getOrderStatusLabel } from "@/data/orders";
import type { MahirOrder } from "@/lib/mahir-api";

const priceFormatter = new Intl.NumberFormat("en-PK");

function getStatusStyle(status: string) {
  if (status === "completed") return "bg-success/10 text-success";
  if (status === "cancelled") return "bg-red-50 text-red-700";
  if (status === "on-the-way" || status === "in-progress") {
    return "bg-amber-100 text-amber-800";
  }

  return "bg-brand-soft text-brand";
}

export function OrderCard({ order }: { order: MahirOrder }) {
  const total =
    order.total === null
      ? "Price to be confirmed"
      : `${order.currency} ${priceFormatter.format(order.total)}`;

  return (
    <article className="rounded-[1.5rem] border border-line bg-white p-4 shadow-card sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            {order.service.name}
          </h2>
          <p className="mt-1 text-sm text-muted">{order.order_number}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusStyle(order.status)}`}
        >
          {getOrderStatusLabel(order.status)}
        </span>
      </div>
      <div className="mt-4 grid gap-2 text-sm text-muted sm:grid-cols-3">
        <p>
          <span className="font-semibold text-foreground">Date</span>
          <br />
          {order.date}
        </p>
        <p>
          <span className="font-semibold text-foreground">Time</span>
          <br />
          {order.time}
        </p>
        <p>
          <span className="font-semibold text-foreground">Address</span>
          <br />
          {order.city}
        </p>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
        <p className="text-lg font-bold text-foreground">{total}</p>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/orders/${order.id}`}
            className="inline-flex min-h-10 items-center justify-center rounded-xl bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            View Details
          </Link>
          {order.status === "completed" || order.status === "cancelled" ? (
            <Link
              href={`/services/${order.service.slug}`}
              className="inline-flex min-h-10 items-center justify-center rounded-xl border border-line px-4 text-sm font-semibold text-foreground hover:border-brand hover:text-brand"
            >
              Rebook Service
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
