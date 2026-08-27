"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { NavigationItem } from "@/data/homepage";

type MobileMenuProps = {
  items: NavigationItem[];
};

export function MobileMenu({ items }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
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
            aria-label="Close navigation menu"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 top-[4.75rem] z-40 cursor-default bg-foreground/30"
          />
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="fixed inset-x-5 top-[5.5rem] z-50 max-h-[calc(100dvh-7rem)] overflow-y-auto rounded-2xl border border-line bg-white p-3 shadow-card md:left-auto md:right-8 md:w-96"
          >
            <ul className="space-y-1">
              {items.map((item, index) => (
                <li
                  key={item.label}
                  className={index === 6 ? "mt-2 border-t border-line pt-2" : ""}
                >
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
                </li>
              ))}
            </ul>
          </nav>
        </>
      ) : null}
    </div>
  );
}
