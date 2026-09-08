import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="bg-background py-20 sm:py-28">
        <div className="site-container">
          <div className="mx-auto max-w-xl rounded-[2rem] border border-line bg-white p-8 text-center shadow-card sm:p-12">
            <span className="inline-flex rounded-full bg-brand-soft px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.13em] text-brand">
              404 Error
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
              Page Not Found
            </h1>
            <p className="mt-4 text-base leading-7 text-muted">
              Sorry, the page or service you are looking for does not exist or has been moved.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-6 text-base font-semibold text-white transition-colors hover:bg-brand-dark"
              >
                Go to Homepage
              </Link>
              <Link
                href="/services"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-line bg-white px-6 text-base font-semibold text-foreground transition-colors hover:border-brand hover:text-brand"
              >
                Browse All Services
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
