import Image from "next/image";
import type { Address, CustomerDetails, Schedule } from "@/components/booking/types";
import type { CartLineItem } from "@/components/cart/cart-context";

const priceFormatter = new Intl.NumberFormat("en-PK");

type ReviewStepProps = {
  items: CartLineItem[];
  address: Address;
  schedule: Schedule;
  customer: CustomerDetails;
  subtotal: number;
  discount: number;
  estimatedTotal: number;
  onBack: () => void;
  onConfirm: () => void;
};

export function ReviewStep({ items, address, schedule, customer, subtotal, discount, estimatedTotal, onBack, onConfirm }: ReviewStepProps) {
  return (
    <section aria-labelledby="review-heading">
      <p className="text-xs font-semibold uppercase tracking-[0.13em] text-brand">Step 3</p>
      <h1 id="review-heading" className="mt-3 text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">Review Your Booking</h1>
      <p className="mt-3 text-base leading-7 text-muted">Check the details below before confirming your service visit.</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
            <h2 className="text-lg font-bold text-foreground">Service summary</h2>
            <div className="mt-4 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 border-b border-line pb-4 last:border-0 last:pb-0">
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-brand-soft"><Image src={item.image} alt="" fill sizes="64px" className="object-cover" /></div>
                  <div className="min-w-0 flex-1"><h3 className="font-semibold text-foreground">{item.title}</h3><p className="mt-1 text-sm text-muted">Quantity: {item.quantity}</p></div>
                  <span className="shrink-0 text-sm font-bold text-foreground">PKR {priceFormatter.format(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-white p-5 shadow-card"><h2 className="text-lg font-bold text-foreground">Address</h2><p className="mt-3 font-semibold text-foreground">{address.label}</p><p className="mt-1 text-sm leading-6 text-muted">{address.fullAddress}</p><p className="mt-1 text-sm text-muted">{address.city}</p></div>
            <div className="rounded-2xl border border-line bg-white p-5 shadow-card"><h2 className="text-lg font-bold text-foreground">Schedule</h2><p className="mt-3 font-semibold text-foreground">{schedule.dateLabel}, {schedule.dateValue}</p><p className="mt-1 text-sm text-muted">{schedule.slot}</p></div>
          </div>
          <div className="rounded-2xl border border-line bg-white p-5 shadow-card"><h2 className="text-lg font-bold text-foreground">Customer</h2><p className="mt-3 font-semibold text-foreground">{customer.fullName}</p><p className="mt-1 text-sm text-muted">{customer.phone}</p></div>
        </div>

        <aside className="h-fit rounded-2xl border border-line bg-white p-5 shadow-card lg:sticky lg:top-24"><h2 className="text-xl font-bold text-foreground">Price Summary</h2><dl className="mt-5 space-y-3 text-sm text-muted"><div className="flex justify-between gap-4"><dt>Subtotal</dt><dd className="font-medium text-foreground">PKR {priceFormatter.format(subtotal)}</dd></div><div className="flex justify-between gap-4"><dt>Discount</dt><dd className="font-medium text-success">- PKR {priceFormatter.format(discount)}</dd></div><div className="flex justify-between gap-4"><dt>Service fee</dt><dd className="font-medium text-foreground">PKR 0</dd></div><div className="border-t border-line pt-3"><div className="flex justify-between gap-4 text-base font-bold text-foreground"><dt>Estimated total</dt><dd>PKR {priceFormatter.format(estimatedTotal)}</dd></div></div></dl><p className="mt-5 text-sm leading-6 text-muted">Additional parts or materials, if required, will be confirmed before work begins.</p><div className="mt-6 flex flex-col gap-3"><button type="button" onClick={onConfirm} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-5 text-base font-semibold text-white transition-colors hover:bg-brand-dark">Confirm Booking</button><button type="button" onClick={onBack} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-line bg-white px-5 text-base font-semibold text-foreground transition-colors hover:border-brand hover:text-brand">Back</button></div></aside>
      </div>
    </section>
  );
}
