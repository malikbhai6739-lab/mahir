import Link from "next/link";
import { navigationItems } from "@/data/homepage";
import { BrandLogo } from "@/components/ui/brand-logo";
import { MobileMenu } from "@/components/layout/mobile-menu";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-white">
      <div className="site-container flex h-[4.75rem] items-center justify-between gap-3">
        <BrandLogo />

        <nav aria-label="Primary navigation" className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {navigationItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-[0.875rem] font-medium text-muted transition-colors hover:bg-brand-soft hover:text-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 xl:ml-0">
          <Link
            href="#booking"
            className="hidden rounded-xl px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-brand-soft hover:text-brand xl:inline-flex"
          >
            Login
          </Link>
          <Link
            href="#booking"
            className="hidden min-h-11 items-center justify-center rounded-xl bg-brand px-4 text-sm font-semibold text-white shadow-[0_9px_22px_rgba(11,99,206,0.22)] transition-colors hover:bg-brand-dark sm:inline-flex"
          >
            Book a Service
          </Link>
          <MobileMenu items={navigationItems} />
        </div>
      </div>
    </header>
  );
}
