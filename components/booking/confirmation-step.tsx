import Link from "next/link";
import type { BookingSnapshot } from "@/components/booking/types";

const priceFormatter = new Intl.NumberFormat("en-PK");

type ConfirmationStepProps = { booking: BookingSnapshot };

export function ConfirmationStep({ booking }: ConfirmationStepProps) {
  const serviceNames = booking.items.map((item) => item.title).join(", ");

  return (
    <section aria-labelledby="confirmation-heading" className="mx-auto max-w-3xl">
      <div className="rounded-[1.5rem] border border-line bg-white p-6 text-center shadow-card sm:p-10">
        <span aria-hidden="true" className="mx-auto grid size-16 place-items-center rounded-2xl bg-success/10 text-3xl font-black text-success">✓</span>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.13em] text-success">Step 4 · Done</p>
        <h1 id="confirmation-heading" className="mt-3 text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">Your Service is Booked!</h1>
        <p className="mt-4 text-base leading-7 text-muted">Your request has been recorded. A professional will be assigned shortly.</p>
        <div className="mt-8 grid gap-4 text-left sm:grid-cols-2">
          <div className="rounded-xl bg-background p-4"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Booking ID</p><p className="mt-2 font-bold text-foreground">MHR-2026-00124</p></div>
          <div className="rounded-xl bg-background p-4"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Estimated total</p><p className="mt-2 font-bold text-foreground">PKR {priceFormatter.format(booking.estimatedTotal)}</p></div>
          <div className="rounded-xl bg-background p-4"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Service</p><p className="mt-2 font-semibold text-foreground">{serviceNames}</p></div>
          <div className="rounded-xl bg-background p-4"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">When</p><p className="mt-2 font-semibold text-foreground">{booking.schedule.dateLabel}, {booking.schedule.dateValue}<br />{booking.schedule.slot}</p></div>
          <div className="rounded-xl bg-background p-4 sm:col-span-2"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Address</p><p className="mt-2 font-semibold text-foreground">{booking.address.fullAddress}, {booking.address.city}</p></div>
        </div>
      </div>

      <div className="mt-8 rounded-[1.5rem] border border-line bg-white p-6 shadow-card sm:p-8"><h2 className="text-2xl font-bold text-foreground">What happens next?</h2><ol className="mt-6 grid gap-4 sm:grid-cols-4">{["Booking received", "Professional assigned", "Professional arrives", "Service completed"].map((step, index) => <li key={step} className="flex gap-3 sm:block"><span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand text-sm font-bold text-white">{index + 1}</span><span className="pt-2 text-sm font-semibold text-foreground sm:mt-3 sm:block sm:pt-0">{step}</span></li>)}</ol></div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"><Link href="/orders" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-6 text-base font-semibold text-white transition-colors hover:bg-brand-dark">View My Orders</Link><Link href="/" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-line bg-white px-6 text-base font-semibold text-foreground transition-colors hover:border-brand hover:text-brand">Back to Home</Link></div>
    </section>
  );
}
