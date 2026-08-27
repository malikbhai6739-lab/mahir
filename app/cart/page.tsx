"use client";

import Link from "next/link";
import { useState } from "react";
import { CartItem } from "@/components/cart/cart-item";
import { useCart } from "@/components/cart/cart-context";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

const priceFormatter = new Intl.NumberFormat("en-PK");

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, discount, estimatedTotal, hydrated } = useCart();
  const [promoCode, setPromoCode] = useState("");

  const serviceFee = 0;
  if (!hydrated) {
    return (
      <>
        <SiteHeader />
        <main className="bg-background pb-24">
          <div className="site-container py-14 sm:py-16">
            <div className="mx-auto max-w-xl rounded-[1.75rem] border border-line bg-white p-8 text-center shadow-card sm:p-10">
              <h1 className="text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
                Loading your cart
              </h1>
            </div>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  const emptyCart = items.length === 0;

  if (emptyCart) {
    return (
      <>
        <SiteHeader />
        <main className="bg-background pb-24">
          <div className="site-container py-14 sm:py-16">
            <div className="mx-auto max-w-xl rounded-[1.75rem] border border-line bg-white p-8 text-center shadow-card sm:p-10">
              <span
                aria-hidden="true"
                className="mx-auto grid size-16 place-items-center rounded-2xl bg-brand-soft text-3xl font-black text-brand"
              >
                ✓
              </span>
              <h1 className="mt-6 text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
                Your cart is empty
              </h1>
              <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
                Browse professional home services and add what you need.
              </p>
              <Link
                href="/services"
                className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-6 text-base font-semibold text-white transition-colors hover:bg-brand-dark"
              >
                Browse Services
              </Link>
            </div>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      <main className="bg-background pb-20 sm:pb-24">
        <div className="site-container py-10 sm:py-14">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.13em] text-brand">
              Your services
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
              Your Services
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted sm:text-lg">
              Review your selected services before continuing to booking.
            </p>
          </div>

          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.7fr)_minmax(18rem,0.8fr)]">
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={(id) => updateQuantity(id, item.quantity + 1)}
                  onDecrease={(id) => updateQuantity(id, item.quantity - 1)}
                  onRemove={removeItem}
                />
              ))}
            </div>

            <aside className="xl:sticky xl:top-24">
              <div className="rounded-[1.5rem] border border-line bg-white p-5 shadow-card sm:p-6">
                <h2 className="text-2xl font-bold tracking-[-0.02em] text-foreground">
                  Order Summary
                </h2>

                <div className="mt-5 space-y-3 text-base text-muted">
                  <div className="flex items-center justify-between gap-4">
                    <span>Subtotal</span>
                    <span className="font-medium text-foreground">
                      Rs. {priceFormatter.format(subtotal)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span>Discount</span>
                    <span className="font-medium text-success">
                      - Rs. {priceFormatter.format(discount)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span>Service Fee</span>
                    <span className="font-medium text-foreground">
                      Rs. {priceFormatter.format(serviceFee)}
                    </span>
                  </div>
                  <div className="border-t border-line pt-3">
                    <div className="flex items-center justify-between gap-4 text-lg font-bold text-foreground">
                      <span>Estimated Total</span>
                      <span>Rs. {priceFormatter.format(estimatedTotal)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-line bg-background p-3">
                  <label htmlFor="promo-code" className="block text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                    Promo code
                  </label>
                  <div className="mt-3 flex gap-2">
                    <input
                      id="promo-code"
                      type="text"
                      value={promoCode}
                      onChange={(event) => setPromoCode(event.target.value)}
                      placeholder="Enter code"
                      className="h-12 flex-1 rounded-xl border border-line bg-white px-3 text-base text-foreground outline-none transition-colors placeholder:text-muted/70 focus:border-brand"
                    />
                    <button
                      type="button"
                      className="inline-flex h-12 items-center justify-center rounded-xl border border-line bg-white px-4 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-6 text-muted">
                  Additional parts or materials, if required, will be confirmed before work begins.
                </p>

                <div className="mt-6 space-y-3">
                  <Link
                    href="/booking"
                    className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-brand px-5 text-base font-semibold text-white transition-colors hover:bg-brand-dark"
                  >
                    Continue to Booking
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-line bg-white px-5 text-base font-semibold text-foreground transition-colors hover:border-brand hover:text-brand"
                  >
                    Add More Services
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>

        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 py-3 shadow-[0_-8px_30px_rgba(12,33,56,0.08)] backdrop-blur sm:hidden">
          <div className="mx-auto flex w-[calc(100%-1rem)] max-w-md items-center justify-between gap-3">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted">
                Total
              </p>
              <p className="text-xl font-black tracking-[-0.02em] text-foreground">
                Rs. {priceFormatter.format(estimatedTotal)}
              </p>
            </div>
            <Link
              href="/booking"
              className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-brand px-5 text-base font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              Continue
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
