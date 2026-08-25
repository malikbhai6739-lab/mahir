import Link from "next/link";
import { bookingSteps } from "@/data/homepage";
import { SectionHeading } from "@/components/ui/section-heading";

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="bg-brand-soft/60 py-20 sm:py-24 lg:py-28"
    >
      <div className="site-container">
        <SectionHeading
          eyebrow="How it works"
          title="Home help, without the hassle"
          description="A clear four-step journey keeps the booking simple and the work accountable."
          id="how-it-works-heading"
          align="center"
        />

        <div className="relative mt-12">
          <span
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-brand/20 md:block"
          />
          <ol className="relative grid gap-4 md:grid-cols-4 md:gap-5">
            {bookingSteps.map((step) => (
              <li
                key={step.number}
                className="relative rounded-2xl border border-line bg-white p-5 text-left shadow-[0_10px_30px_rgba(12,33,56,0.05)] md:border-0 md:bg-transparent md:p-0 md:text-center md:shadow-none"
              >
                <div className="flex items-center gap-4 md:block">
                  <span className="relative z-10 grid size-16 shrink-0 place-items-center rounded-full border-4 border-brand-soft bg-brand text-sm font-bold tracking-[0.1em] text-white md:mx-auto">
                    {step.number}
                  </span>
                  <div className="md:mt-6">
                    <h3 className="text-lg font-semibold tracking-[-0.015em] text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-muted md:mt-2">
                      {step.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="#booking"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            Book your first service <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
