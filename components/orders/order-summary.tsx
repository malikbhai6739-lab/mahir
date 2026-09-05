import type { MahirOrder } from "@/lib/mahir-api";

const priceFormatter = new Intl.NumberFormat("en-PK");

function formatPrice(price: number, currency: string) {
  return `${currency} ${priceFormatter.format(price)}`;
}

export function OrderSummary({ order }: { order: MahirOrder }) {
  const hasPricing =
    order.pricing.starting_price !== null ||
    order.pricing.quoted_price !== null ||
    order.total !== null;

  return (
    <section
      className="rounded-2xl border border-line bg-white p-5 shadow-card"
      aria-labelledby="order-summary-heading"
    >
      <h2
        id="order-summary-heading"
        className="text-xl font-bold text-foreground"
      >
        Order Summary
      </h2>
      <p className="mt-5 font-semibold text-foreground">
        {order.service.name}
      </p>
      {hasPricing ? (
        <dl className="mt-4 space-y-3 border-t border-line pt-4 text-sm text-muted">
          {order.pricing.starting_price !== null ? (
            <div className="flex justify-between gap-4">
              <dt>Starting price</dt>
              <dd className="font-medium text-foreground">
                {formatPrice(order.pricing.starting_price, order.currency)}
              </dd>
            </div>
          ) : null}
          {order.pricing.quoted_price !== null ? (
            <div className="flex justify-between gap-4">
              <dt>Quoted price</dt>
              <dd className="font-medium text-foreground">
                {formatPrice(order.pricing.quoted_price, order.currency)}
              </dd>
            </div>
          ) : null}
          {order.total !== null ? (
            <div className="flex justify-between gap-4 border-t border-line pt-3 text-base font-bold text-foreground">
              <dt>Total</dt>
              <dd>{formatPrice(order.total, order.currency)}</dd>
            </div>
          ) : null}
        </dl>
      ) : (
        <p className="mt-3 text-sm text-muted">Price to be confirmed.</p>
      )}
    </section>
  );
}
