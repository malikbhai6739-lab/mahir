import { SectionHeading } from "@/components/ui/section-heading";
import { trustIndicators } from "@/data/homepage";

const trustDescriptions = [
  "Professionals are checked before taking Mahir service requests.",
  "Clear service information helps set expectations before work begins.",
  "Appointments are planned around a confirmed service window.",
  "Support remains available if a completed service needs review.",
] as const;

export function TrustSection() {
  return (
    <section
      aria-labelledby="services-trust-heading"
      className="bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="site-container">
        <SectionHeading
          eyebrow="The Mahir standard"
          title="Book with confidence"
          description="The same dependable service principles apply across the Mahir catalog."
          id="services-trust-heading"
          align="center"
        />

        <ul className="mt-10 grid gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {trustIndicators.map((indicator, index) => (
            <li key={indicator} className="min-w-0 bg-white p-6 sm:p-7">
              <span
                aria-hidden="true"
                className="grid size-10 place-items-center rounded-full bg-brand-soft font-black text-brand"
              >
                ✓
              </span>
              <h3 className="mt-6 text-lg font-semibold leading-6 tracking-[-0.01em] text-foreground">
                {indicator}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                {trustDescriptions[index]}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
