import Image from "next/image";
import Link from "next/link";
import { getOrderStatusLabel, type Order } from "@/data/orders";

const priceFormatter = new Intl.NumberFormat("en-PK");

const statusStyles: Record<Order["status"], string> = {
  confirmed: "bg-brand-soft text-brand",
  assigned: "bg-brand-soft text-brand",
  "on-the-way": "bg-amber-100 text-amber-800",
  "in-progress": "bg-amber-100 text-amber-800",
  completed: "bg-success/10 text-success",
  cancelled: "bg-red-50 text-red-700",
};

export function OrderCard({ order, priority = false }: { order: Order; priority?: boolean }) {
  const tab = order.status === "completed" ? "completed" : order.status === "cancelled" ? "cancelled" : "upcoming";
  return <article className="rounded-[1.5rem] border border-line bg-white p-4 shadow-card sm:p-5"><div className="flex flex-col gap-5 sm:flex-row sm:items-start"><div className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-brand-soft"><Image src={order.serviceImage} alt="" fill priority={priority} sizes="80px" className="object-cover" /></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-xl font-semibold text-foreground">{order.serviceTitle}</h2><p className="mt-1 text-sm text-muted">{order.bookingId}</p></div><span className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyles[order.status]}`}>{getOrderStatusLabel(order.status)}</span></div><div className="mt-4 grid gap-2 text-sm text-muted sm:grid-cols-3"><p><span className="font-semibold text-foreground">Date</span><br />{order.date}</p><p><span className="font-semibold text-foreground">Time</span><br />{order.time}</p><p><span className="font-semibold text-foreground">Address</span><br />{order.city}</p></div></div></div><div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4"><p className="text-lg font-bold text-foreground">PKR {priceFormatter.format(order.total)}</p><div className="flex flex-wrap gap-3"><Link href={`/orders/${order.id}`} className="inline-flex min-h-10 items-center justify-center rounded-xl bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-dark">View Details</Link>{tab === "upcoming" ? <><button type="button" className="inline-flex min-h-10 items-center justify-center rounded-xl border border-line px-4 text-sm font-semibold text-foreground hover:border-brand hover:text-brand">Get Support</button><button type="button" className="inline-flex min-h-10 items-center justify-center rounded-xl border border-line px-4 text-sm font-semibold text-muted hover:border-red-300 hover:text-red-700">Cancel Booking</button></> : null}{tab === "completed" ? <><Link href={`/services/${order.serviceSlug}`} className="inline-flex min-h-10 items-center justify-center rounded-xl border border-line px-4 text-sm font-semibold text-foreground hover:border-brand hover:text-brand">Rebook</Link><button type="button" className="inline-flex min-h-10 items-center justify-center rounded-xl border border-line px-4 text-sm font-semibold text-foreground hover:border-brand hover:text-brand">Rate Service</button></> : null}{tab === "cancelled" ? <Link href={`/services/${order.serviceSlug}`} className="inline-flex min-h-10 items-center justify-center rounded-xl border border-line px-4 text-sm font-semibold text-foreground hover:border-brand hover:text-brand">Rebook</Link> : null}</div></div></article>;
}
