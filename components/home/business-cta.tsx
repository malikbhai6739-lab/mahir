import Link from "next/link";

const audienceChips = [
  "Offices",
  "Retail",
  "Property portfolios",
  "Multi-site teams",
];

const operationsBenefits = [
  "Central service coordination",
  "Planned and reactive maintenance",
  "Consistent service standards",
  "Multi-location visibility",
];

export function BusinessCta() {
  return (
    <section
      id="business"
      aria-labelledby="business-heading"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="site-container">
        <div className="grid overflow-hidden rounded-[2rem] border border-line/80 bg-white shadow-xl shadow-slate-200/40 lg:grid-cols-[1.1fr_0.9fr]">
          {/* LEFT PANEL: Business Value Proposition */}
          <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-14">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-brand-soft px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand">
                Mahir for Business
              </span>

              <h2
                id="business-heading"
                className="mt-5 text-balance text-[clamp(1.95rem,3.4vw,2.75rem)] font-extrabold leading-[1.15] tracking-[-0.015em] text-foreground"
              >
                One maintenance partner for every location.
              </h2>

              <p className="mt-4 max-w-xl text-balance text-base text-muted leading-relaxed sm:text-lg sm:leading-8">
                Coordinate repairs, recurring maintenance, and service requests
                across offices, retail sites, and managed properties through one
                Mahir operations partner.
              </p>

              {/* AUDIENCE CHIPS */}
              <div className="mt-7 flex flex-wrap gap-2 sm:gap-2.5">
                {audienceChips.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-full border border-line bg-background px-3.5 py-1.5 text-xs font-semibold text-foreground/85 transition-colors hover:border-brand/30 hover:bg-brand-soft/40 sm:text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 lg:mt-10">
              <Link
                href="#booking"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 text-sm font-semibold text-white shadow-md shadow-brand/20 transition-colors hover:bg-brand-dark sm:w-auto sm:text-base"
              >
                Talk to Mahir Business Team <span aria-hidden="true">&rarr;</span>
              </Link>
              <p className="mt-2.5 text-xs text-muted leading-normal sm:text-sm">
                For offices, retail chains, property managers, and multi-site operations.
              </p>
            </div>
          </div>

          {/* RIGHT PANEL: Operations Benefits */}
          <div className="flex flex-col justify-between border-t border-line/70 bg-gradient-to-br from-brand-soft/90 via-blue-50/60 to-brand-soft/40 p-7 sm:p-10 lg:border-t-0 lg:border-l lg:p-14">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-brand">
                Operations Support
              </p>
              <h3 className="mt-3 text-2xl font-extrabold leading-snug tracking-tight text-foreground sm:text-3xl">
                Built for smoother operations.
              </h3>
            </div>

            <ul className="mt-8 space-y-3 sm:mt-10">
              {operationsBenefits.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3.5 rounded-xl border border-white/80 bg-white/85 px-4 py-3.5 shadow-sm backdrop-blur-sm transition hover:bg-white"
                >
                  <span
                    aria-hidden="true"
                    className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white shadow-xs"
                  >
                    &#10003;
                  </span>
                  <span className="text-sm font-semibold text-foreground sm:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
