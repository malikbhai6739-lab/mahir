import { faqs } from "@/data/homepage";
import { Accordion } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/ui/section-heading";

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="site-container grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-16">
        <div className="min-w-0">
          <SectionHeading
            eyebrow="Frequently asked questions"
            title="Good to know before you book"
            description="Clear answers about professionals, pricing, support, and how Mahir works."
            id="faq-heading"
          />
          <div className="mt-8 rounded-2xl bg-brand-soft p-5">
            <p className="font-semibold text-foreground">Still need help?</p>
            <p className="mt-2 text-sm leading-6 text-muted">
              Our support experience will guide you before, during, and after a
              service.
            </p>
          </div>
        </div>
        <div className="min-w-0">
          <Accordion items={faqs} />
        </div>
      </div>
    </section>
  );
}
