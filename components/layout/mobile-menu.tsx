"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import type { NavigationItem } from "@/data/homepage";
import { HeaderAuthLink } from "@/components/layout/header-auth-link";
import { useCart } from "@/components/cart/cart-context";
import { getAuthToken, subscribeAuthState } from "@/lib/auth-storage";

function getAuthSnapshot(): boolean {
  return Boolean(getAuthToken());
}

function getServerAuthSnapshot(): boolean {
  return false;
}

type MobileMenuProps = {
  items: NavigationItem[];
};

export function MobileMenu({ items }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = useSyncExternalStore(
    subscribeAuthState,
    getAuthSnapshot,
    getServerAuthSnapshot,
  );
  const { itemCount, hydrated } = useCart();
  const count = hydrated ? itemCount : 0;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);
    firstLinkRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div className="min-[1200px]:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setIsOpen((current) => !current)}
        className="relative grid size-11 place-items-center rounded-xl border border-line bg-white text-foreground transition-colors hover:border-brand/30 hover:bg-brand-soft"
      >
        <span aria-hidden="true" className="flex w-5 flex-col gap-1.5">
          <span
            className={`h-0.5 w-5 rounded-full bg-current transition-transform ${
              isOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-5 rounded-full bg-current transition-opacity ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-5 rounded-full bg-current transition-transform ${
              isOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      {isOpen ? (
        <>
          <button
            type="button"
            aria-label="Close menu overlay"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 top-[4.75rem] z-40 cursor-default bg-foreground/30"
          />
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="fixed inset-x-5 top-[5.5rem] z-50 max-h-[calc(100dvh-7rem)] overflow-y-auto rounded-2xl border border-line bg-white p-3 shadow-card md:left-auto md:right-8 md:w-96"
          >
            <ul className="space-y-1">
              {/* Cart link at top of mobile menu */}
              {isAuthenticated ? (
                <>
                  <li>
                    <Link
                      href="/cart"
                      onClick={() => setIsOpen(false)}
                      className="flex min-h-12 items-center justify-between rounded-xl px-4 font-semibold text-brand transition-colors hover:bg-brand-soft"
                    >
                      <span className="flex items-center gap-2">
                        <svg
                          className="size-5 shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                          />
                        </svg>
                        Cart
                      </span>
                      {count > 0 ? (
                        <span className="rounded-full bg-brand px-2 py-0.5 text-xs font-bold text-white">
                          {count}
                        </span>
                      ) : (
                        <span className="text-xs text-muted">Empty</span>
                      )}
                    </Link>
                  </li>

                  <li className="border-t border-line/60 my-1" />
                </>
              ) : null}

              {items.map((item, index) => (
                <li
                  key={item.label}
                  className={index === 6 ? "mt-2 border-t border-line pt-2" : ""}
                >
                  {item.href === "/login" ? (
                    <HeaderAuthLink
                      onNavigate={() => setIsOpen(false)}
                      showArrow
                      className="flex min-h-12 items-center justify-between rounded-xl px-4 font-medium text-foreground transition-colors hover:bg-brand-soft hover:text-brand"
                    />
                  ) : (
                    <Link
                      ref={index === 0 ? firstLinkRef : undefined}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex min-h-12 items-center justify-between rounded-xl px-4 font-medium text-foreground transition-colors hover:bg-brand-soft hover:text-brand"
                    >
                      {item.label}
                      <span aria-hidden="true" className="text-brand">
                        →
                      </span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </>
      ) : null}
    </div>
  );
}
