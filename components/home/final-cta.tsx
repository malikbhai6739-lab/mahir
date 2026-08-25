import Link from "next/link";

export function FinalCta() {
  return (
    <section
      id="become-mahir"
      aria-labelledby="final-cta-heading"
      className="bg-background py-16 sm:py-20"
    >
      <div className="site-container overflow-hidden rounded-[2rem] bg-brand px-6 py-12 text-center sm:px-10 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.13em] text-white sm:text-sm">
          Your home deserves a Mahir
        </p>
        <h2
          id="final-cta-heading"
          className="mx-auto mt-4 max-w-3xl text-balance text-[clamp(2.15rem,4.6vw,3.75rem)] font-bold leading-[1.1] tracking-[-0.01em] text-white"
        >
          Ready to get your home sorted?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/90 sm:text-lg sm:leading-8">
          Choose the service you need and start a simple, professional booking
          journey today.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="#booking"
            className="inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-white px-7 font-semibold text-brand transition-colors hover:bg-brand-soft sm:w-auto"
          >
            Book a Service <span aria-hidden="true">→</span>
          </Link>
          <Link
            href="#services"
            className="inline-flex min-h-13 w-full items-center justify-center rounded-xl border border-white/35 px-7 font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
          >
            Browse Services
          </Link>
        </div>
        <p className="mt-7 text-sm text-white/85">
          Service professional? <span className="font-semibold text-white">Become a Mahir</span>
          {" "}and grow with a trusted platform.
        </p>
      </div>
    </section>
  );
}
