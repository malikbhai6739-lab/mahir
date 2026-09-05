import Link from "next/link";
import { mobileNavigationItems, navigationItems } from "@/data/homepage";
import { BrandLogo } from "@/components/ui/brand-logo";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { HeaderAuthLink } from "@/components/layout/header-auth-link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-white">
      <div className="site-container flex h-[4.75rem] items-center justify-between gap-2 sm:gap-3">
        <BrandLogo />

        <nav
          aria-label="Primary navigation"
          className="hidden min-[1200px]:block"
        >
          <ul className="flex flex-nowrap items-center gap-0.5">
            {navigationItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="whitespace-nowrap rounded-lg px-3 py-2 text-[0.875rem] font-medium text-muted transition-colors hover:bg-brand-soft hover:text-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2 min-[1200px]:ml-0">
          <HeaderAuthLink
            className="hidden whitespace-nowrap rounded-xl px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-brand-soft hover:text-brand min-[1200px]:inline-flex"
          />
          <Link
            href="/#booking"
            aria-label="Book a Service"
            className="inline-flex min-h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-xl bg-brand px-2.5 text-[0.7rem] font-semibold text-white shadow-[0_9px_22px_rgba(11,99,206,0.22)] transition-colors hover:bg-brand-dark min-[360px]:px-3 min-[360px]:text-xs sm:px-4 sm:text-sm"
          >
            Book a Service
          </Link>
          <MobileMenu items={mobileNavigationItems} />
        </div>
      </div>
    </header>
  );
}
