import Image from "next/image";
import type { CartLineItem } from "@/components/cart/cart-context";

const priceFormatter = new Intl.NumberFormat("en-PK");

type CartItemProps = {
  item: CartLineItem;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
};

export function CartItem({ item, onIncrease, onDecrease, onRemove }: CartItemProps) {
  const unitPrice = item.price;
  const lineTotal = unitPrice * item.quantity;

  return (
    <article className="flex w-full flex-col gap-4 rounded-[1.5rem] border border-line bg-white p-4 shadow-card sm:p-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-line bg-brand-soft">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand">
            <span>{item.category}</span>
          </div>
          <h3 className="mt-2 text-lg font-semibold leading-6 tracking-[-0.01em] text-foreground">
            {item.title}
          </h3>
          <p className="mt-1 text-sm leading-6 text-muted">{item.description}</p>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
            <span className="font-bold text-foreground">
              PKR {priceFormatter.format(unitPrice)}
            </span>
            {item.originalPrice ? (
              <span className="text-muted line-through">
                PKR {priceFormatter.format(item.originalPrice)}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 lg:min-w-[290px] lg:justify-end">
        <div className="inline-flex items-center rounded-xl border border-line bg-background">
          <button
            type="button"
            aria-label={`Decrease quantity for ${item.title}`}
            onClick={() => onDecrease(item.id)}
            disabled={item.quantity <= 1}
            className="grid size-11 place-items-center text-xl font-semibold text-foreground transition-colors hover:text-brand disabled:cursor-not-allowed disabled:opacity-40"
          >
            −
          </button>
          <span className="min-w-12 text-center text-base font-semibold text-foreground">
            {item.quantity}
          </span>
          <button
            type="button"
            aria-label={`Increase quantity for ${item.title}`}
            onClick={() => onIncrease(item.id)}
            className="grid size-11 place-items-center text-xl font-semibold text-foreground transition-colors hover:text-brand"
          >
            +
          </button>
        </div>

        <div className="min-w-[110px] text-right">
          <p className="text-lg font-bold tracking-[-0.02em] text-foreground">
            PKR {priceFormatter.format(lineTotal)}
          </p>
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="mt-2 text-sm font-semibold text-muted transition-colors hover:text-brand"
          >
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}
