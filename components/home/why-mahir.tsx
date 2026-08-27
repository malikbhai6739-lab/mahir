import Link from "next/link";
import { benefits } from "@/data/homepage";
import { SectionHeading } from "@/components/ui/section-heading";

export function WhyMahir() {
  return (
    <section
      id="why-mahir"
      aria-labelledby="why-mahir-heading"
      className="bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="site-container">
        <div className="grid gap-10 lg:grid-cols-[0.76fr_1.24fr] lg:items-stretch lg:gap-14">
          <div className="min-w-0">
            <SectionHeading
              eyebrow="Why choose Mahir"
              title="A better standard for home services"
              description="Trust is built into each step—from who arrives at your door to how the service is supported after the visit."
              id="why-mahir-heading"
            />

            <div className="mt-8 overflow-hidden rounded-[1.75rem] bg-foreground p-6 text-white sm:p-8">
              <div className="flex items-center gap-4 border-b border-white/12 pb-6">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand text-xl font-black">
                  M
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.13em] text-[#8dc3ff]">
                    The Mahir standard
                  </p>
                  <p className="mt-1 text-lg font-semibold">
                    Professional from booking to completion
                  </p>
                </div>
              </div>
              <ul className="mt-6 space-y-4 text-sm font-medium text-[#d7e2ed]">
                {["Verified before the visit", "Prepared for the booked job", "Supported after the service"].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="grid size-6 shrink-0 place-items-center rounded-full bg-white/10 text-xs text-[#8dc3ff]"
                      >
                        ✓
                      </span>
                      {item}
                    </li>
                  ),
                )}
              </ul>
              <Link
                href="#how-it-works"
                className="mt-7 inline-flex items-center gap-2 font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
              >
                See how booking works <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="grid min-w-0 gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line sm:grid-cols-2 lg:h-full">
            {benefits.map((benefit) => (
              <article key={benefit.title} className="min-h-64 bg-white p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-[0.14em] text-brand">
                    {benefit.number}
                  </span>
                  <span
                    aria-hidden="true"
                    className="grid size-9 place-items-center rounded-full bg-brand-soft font-black text-brand"
                  >
                    ✓
                  </span>
                </div>
                <h3 className="mt-9 text-2xl font-bold leading-tight tracking-[-0.025em] text-foreground">
                  {benefit.title}
                </h3>
                <p className="mt-3 leading-7 text-muted">{benefit.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
