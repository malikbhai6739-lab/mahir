import Image from "next/image";
import type { CartLineItem } from "@/components/cart/cart-context";

const priceFormatter = new Intl.NumberFormat("en-PK");

type CartItemProps = {
  item: CartLineItem;
  onIncrease?: (id: string) => void;
  onDecrease?: (id: string) => void;
  onRemove: (id: string) => void;
};

export function CartItem({ item, onRemove }: CartItemProps) {
  const unitPrice = item.price;

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
            {item.originalPrice && item.originalPrice > item.price ? (
              <span className="text-muted line-through">
                PKR {priceFormatter.format(item.originalPrice)}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-line/60 pt-3 lg:border-t-0 lg:pt-0 lg:min-w-[220px] lg:justify-end">
        <span className="rounded-xl border border-line/70 bg-brand-soft/60 px-3 py-1.5 text-xs font-semibold text-brand">
          1 service visit
        </span>

        <div className="min-w-[110px] text-right">
          <p className="text-lg font-bold tracking-[-0.02em] text-foreground">
            PKR {priceFormatter.format(unitPrice)}
          </p>
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="mt-2 text-sm font-semibold text-muted transition-colors hover:text-red-600"
          >
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}
