import Link from "next/link";

export function ServicesFinalCta() {
  return (
    <section
      aria-labelledby="services-final-cta-heading"
      className="bg-background py-16 sm:py-20"
    >
      <div className="site-container overflow-hidden rounded-[2rem] bg-brand px-6 py-12 text-center sm:px-10 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.13em] text-white sm:text-sm">
          Mahir support is here
        </p>
        <h2
          id="services-final-cta-heading"
          className="mx-auto mt-4 max-w-3xl text-balance text-[clamp(2.15rem,4.6vw,3.75rem)] font-bold leading-[1.1] tracking-[-0.01em] text-white"
        >
          Can’t Find What You Need?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/90 sm:text-lg sm:leading-8">
          Tell us what is happening at home and we’ll help you find the closest
          matching service.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/#booking"
            className="inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-white px-7 font-semibold text-brand transition-colors hover:bg-brand-soft sm:w-auto"
          >
            Book a Service <span aria-hidden="true">→</span>
          </Link>
          <Link
            href="/#faq"
            className="inline-flex min-h-13 w-full items-center justify-center rounded-xl border border-white/35 px-7 font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
          >
            Get Help
          </Link>
        </div>
      </div>
    </section>
  );
}
