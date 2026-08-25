import Link from "next/link";
import { maintenanceVisits } from "@/data/homepage";
import { SectionHeading } from "@/components/ui/section-heading";

export function Maintenance() {
  return (
    <section
      aria-labelledby="maintenance-heading"
      className="bg-background py-20 sm:py-24 lg:py-28"
    >
      <div className="site-container overflow-hidden rounded-[2rem] bg-foreground px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Maintained by Mahir"
              title="A home that stays one step ahead"
              description="Preventive care helps catch small issues before they become urgent repairs. Build a recurring maintenance rhythm around your home and your schedule."
              id="maintenance-heading"
              inverted
            />
            <ul className="mt-8 grid gap-3 text-sm font-medium text-[#d7e2ed] sm:grid-cols-2">
              {[
                "Seasonal service reminders",
                "Planned preventive visits",
                "One clear home-care record",
                "Support between appointments",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
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
            <Link
              href="#booking"
              className="mt-9 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-foreground transition-colors hover:bg-brand-soft hover:text-brand sm:w-auto sm:px-6 sm:text-base"
            >
              Explore home maintenance <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="rounded-[1.6rem] bg-white p-5 shadow-[0_24px_60px_rgba(0,0,0,0.18)] sm:p-7">
            <div className="flex items-center justify-between gap-4 border-b border-line pb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.13em] text-brand">
                  Home care plan
                </p>
                <p className="mt-1 text-xl font-bold tracking-[-0.02em] text-foreground">
                  Your next visits
                </p>
              </div>
              <span className="rounded-full bg-[#e8f7f1] px-3 py-1.5 text-xs font-semibold text-success">
                Active
              </span>
            </div>
            <ol className="mt-2 divide-y divide-line">
              {maintenanceVisits.map((visit, index) => (
                <li key={visit.service} className="flex items-center gap-4 py-5">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-soft text-xs font-semibold uppercase text-brand">
                    {visit.month}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-foreground">{visit.service}</p>
                    <p className="mt-1 text-sm text-muted">{visit.status}</p>
                  </div>
                  <span className="text-xs font-medium text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-2 rounded-xl bg-background p-4 text-sm leading-6 text-muted">
              Your maintenance calendar adapts as your home and seasons change.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
