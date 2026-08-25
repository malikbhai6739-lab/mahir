import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";

export function BusinessCta() {
  return (
    <section
      id="business"
      aria-labelledby="business-heading"
      className="bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="site-container">
        <div className="grid overflow-hidden rounded-[2rem] border border-line lg:grid-cols-[1.08fr_0.92fr]">
          <div className="p-7 sm:p-10 lg:p-14">
            <SectionHeading
              eyebrow="Mahir for Business"
              title="Reliable maintenance, across every location"
              description="Coordinate on-demand repairs and planned upkeep for offices, retail spaces, and managed properties through one dependable service partner."
              id="business-heading"
            />
            <div className="mt-8 flex flex-wrap gap-2">
              {["Offices", "Retail", "Property portfolios", "Multi-site teams"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border border-line bg-background px-3 py-2 text-sm font-medium text-muted"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>
            <Link
              href="#booking"
              className="mt-9 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-dark sm:w-auto sm:px-6 sm:text-base"
            >
              Request a consultation <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="flex flex-col justify-between bg-brand-soft p-7 sm:p-10 lg:p-14">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.13em] text-brand">
                Built for operations teams
              </p>
              <p className="mt-4 max-w-md text-3xl font-bold leading-[1.15] tracking-[-0.01em] text-foreground sm:text-4xl">
                One partner. Clearer coordination. Better-maintained spaces.
              </p>
            </div>
            <ul className="mt-10 space-y-3 text-sm font-medium text-foreground sm:text-base">
              {[
                "Central service coordination",
                "Planned and reactive maintenance",
                "Consistent professional standards",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-xl bg-white/75 px-4 py-3"
                >
                  <span
                    aria-hidden="true"
                    className="grid size-6 shrink-0 place-items-center rounded-full bg-brand text-xs text-white"
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
