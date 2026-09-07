"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/cart-context";

export function HeaderCartLink({ className = "" }: { className?: string }) {
  const { itemCount, hydrated } = useCart();
  const count = hydrated ? itemCount : 0;

  return (
    <Link
      href="/cart"
      aria-label={count > 0 ? `Shopping cart with ${count} service` : "Shopping cart is empty"}
      className={`relative inline-flex size-11 items-center justify-center rounded-xl border border-line bg-white text-foreground transition-colors hover:border-brand/40 hover:bg-brand-soft hover:text-brand ${className}`}
    >
      <svg
        className="size-5 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        />
      </svg>
      {count > 0 ? (
        <span
          className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white shadow-sm ring-2 ring-white"
          aria-hidden="true"
        >
          {count}
        </span>
      ) : null}
    </Link>
  );
}
