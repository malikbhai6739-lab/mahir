import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BusinessEnquiryForm } from "@/components/business/business-enquiry-form";
import { getWordPressCategories, getWordPressCities } from "@/lib/mahir-api";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "For Business | Corporate Facility & Maintenance Services | Mahir Company",
  description:
    "Reliable maintenance coordination for multi-location businesses, offices, retail chains, and commercial properties across Pakistan.",
};

const solutions = [
  {
    title: "Corporate Offices",
    desc: "Scheduled HVAC servicing, electrical audits, plumbing upkeep, and preventive workspace maintenance.",
    icon: "🏢",
    tags: ["Preventive Maintenance", "HVAC Upkeep", "Rapid Support"],
  },
  {
    title: "Retail & Showrooms",
    desc: "Multi-branch brand consistency, quick response times, after-hours servicing, and emergency restoration.",
    icon: "🛍️",
    tags: ["Multi-Branch Support", "After-Hours Service", "Lighting & Electrical"],
  },
  {
    title: "Property Management",
    desc: "Unit turnover repairs, routine maintenance handovers, deep cleaning coordination, and ongoing facility care.",
    icon: "🏬",
    tags: ["Tenant Turnovers", "Carpentry & Plumbing", "Asset Care"],
  },
  {
    title: "Hospitality & Healthcare",
    desc: "High-cleanliness environments, scheduled sanitation, rapid-dispatch technicians, and detailed compliance logs.",
    icon: "🏥",
    tags: ["High Cleanliness", "Priority Dispatch", "Compliance Audits"],
  },
];

const processSteps = [
  {
    step: "01",
    title: "Submit Requirements",
    desc: "Tell us about your locations, facility types, and required maintenance trades.",
  },
  {
    step: "02",
    title: "Scope Assessment",
    desc: "Our business operations desk reviews your coverage requirements and operating cities.",
  },
  {
    step: "03",
    title: "Tailored Proposal",
    desc: "Receive clear pricing, transparent service scopes, and consolidated billing terms.",
  },
  {
    step: "04",
    title: "Coordinated Execution",
    desc: "Vetted service technicians deployed with central accountability and job sign-offs.",
  },
];

const faqs = [
  {
    q: "Which cities are supported for business accounts?",
    a: "We currently support commercial and corporate accounts in Lahore, Karachi, Islamabad, and Rawalpindi. Multi-city accounts receive a single point of contact.",
  },
  {
    q: "Do you offer recurring maintenance contracts as well as on-demand repairs?",
    a: "Yes. We offer recurring annual/monthly maintenance agreements (AMCs), scheduled inspections, and on-demand facility repair pools.",
  },
  {
    q: "How does corporate invoicing and billing work?",
    a: "Corporate clients can opt for consolidated monthly invoicing with detailed job logs and formal tax invoices.",
  },
  {
    q: "How does the business desk follow up after submission?",
    a: "Our corporate accounts team reviews submissions and contacts you regarding the next steps and scheduling.",
  },
];

export default async function ForBusinessPage() {
  const [categories, cities] = await Promise.all([
    getWordPressCategories(),
    getWordPressCities(),
  ]);

  return (
    <>
      <SiteHeader />

      <main className="bg-background">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-b from-brand/5 via-background to-background py-16 sm:py-24">
          <div className="site-container">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand">
                Corporate & Commercial Solutions
              </span>
              <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Reliable service coordination{" "}
                <span className="text-brand">for every location.</span>
              </h1>
              <p className="mt-6 text-balance text-base text-muted sm:text-lg sm:leading-8">
                Tell us about your offices, retail branches, or managed facilities. Our corporate desk coordinates preventive maintenance, emergency repairs, and multi-location service contracts.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="#enquiry-form"
                  className="inline-flex min-h-13 w-full items-center justify-center rounded-xl bg-brand px-8 text-base font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-dark sm:w-auto"
                >
                  Request Business Proposal &rarr;
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex min-h-13 w-full items-center justify-center rounded-xl border border-line bg-white px-8 text-base font-semibold text-foreground transition hover:bg-slate-50 sm:w-auto"
                >
                  How It Works
                </Link>
              </div>

              {/* HIGHLIGHT METRICS */}
              <div className="mt-14 grid grid-cols-2 gap-4 rounded-2xl border border-line/80 bg-white p-6 shadow-sm sm:grid-cols-4">
                <div className="text-center">
                  <div className="text-base font-bold text-brand sm:text-lg">Multi-Location</div>
                  <div className="mt-1 text-xs font-medium text-muted">Single point of contact</div>
                </div>
                <div className="text-center">
                  <div className="text-base font-bold text-brand sm:text-lg">Vetted Providers</div>
                  <div className="mt-1 text-xs font-medium text-muted">Background-checked trades</div>
                </div>
                <div className="text-center">
                  <div className="text-base font-bold text-brand sm:text-lg">Central Invoicing</div>
                  <div className="mt-1 text-xs font-medium text-muted">Tax-compliant billing</div>
                </div>
                <div className="text-center">
                  <div className="text-base font-bold text-brand sm:text-lg">Transparent Scopes</div>
                  <div className="mt-1 text-xs font-medium text-muted">Clear service parameters</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SOLUTIONS GRID */}
        <section className="border-t border-line/60 bg-white py-16 sm:py-20">
          <div className="site-container">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-brand">
                Sector Tailored Facilities
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Who we support across Pakistan
              </h2>
              <p className="mt-3 text-sm text-muted">
                From high-traffic retail branches to multi-floor office headquarters, Mahir coordinates specialized trades.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {solutions.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col justify-between rounded-2xl border border-line/80 bg-background p-6 transition hover:shadow-md"
                >
                  <div>
                    <div className="text-3xl">{item.icon}</div>
                    <h3 className="mt-4 text-lg font-bold text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-1.5 border-t border-line/60 pt-4">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-line bg-white px-2 py-0.5 text-[11px] font-medium text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS / HOW IT WORKS */}
        <section id="how-it-works" className="border-t border-line/60 py-16 sm:py-20">
          <div className="site-container">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-brand">
                Streamlined Coordination
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                How our business desk works
              </h2>
              <p className="mt-3 text-sm text-muted">
                Transparent steps from enquiry to regular facility maintenance.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step) => (
                <div
                  key={step.step}
                  className="relative rounded-2xl border border-line/80 bg-white p-6 shadow-sm"
                >
                  <div className="text-xs font-black tracking-widest text-brand">
                    STEP {step.step}
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COVERED CAPABILITIES & CITIES */}
        <section className="border-t border-line/60 bg-white py-16 sm:py-20">
          <div className="site-container">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand">
                  Service Portfolio
                </span>
                <h2 className="mt-2 text-3xl font-bold text-foreground">
                  Available Service Trades & Cities
                </h2>
                <p className="mt-3 text-sm text-muted">
                  Coordinate all your commercial trades under a single contract with structured job reporting.
                </p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-3 text-sm text-foreground">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                      &#10003;
                    </span>
                    <span><strong>Central Point of Contact:</strong> Dedicated corporate coordinator for all service requests.</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-foreground">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                      &#10003;
                    </span>
                    <span><strong>Quality Audits:</strong> Digital proof-of-work, before/after documentation, and admin sign-off.</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-foreground">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                      &#10003;
                    </span>
                    <span><strong>Tax Compliant:</strong> Transparent corporate invoicing with detailed itemized breakdowns.</span>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-line/80 bg-slate-50/70 p-8">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Active Commercial Cities
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {cities.map((city) => (
                      <span
                        key={city.id}
                        className="rounded-xl border border-line bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm"
                      >
                        📍 {city.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Supported Service Categories
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <span
                        key={cat.id}
                        className="rounded-xl border border-brand/20 bg-brand-soft px-3.5 py-1.5 text-xs font-semibold text-brand"
                      >
                        🛠️ {cat.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ENQUIRY FORM SECTION */}
        <section id="enquiry-form" className="border-t border-line/60 bg-slate-50/50 py-16 sm:py-24">
          <div className="site-container">
            <div className="mx-auto max-w-3xl">
              <div className="text-center mb-10">
                <span className="text-xs font-bold uppercase tracking-wider text-brand">
                  Start Conversation
                </span>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Request a Business Consultation
                </h2>
                <p className="mt-3 text-sm text-muted">
                  Fill in your facility details below. Our corporate solutions desk will review your requirements and contact you regarding the next steps.
                </p>
              </div>

              <BusinessEnquiryForm categories={categories} cities={cities} />
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="border-t border-line/60 bg-white py-16 sm:py-20">
          <div className="site-container">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-brand">
                Common Questions
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="mx-auto mt-10 max-w-3xl space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-line/80 bg-background p-6"
                >
                  <h3 className="text-base font-bold text-foreground">{faq.q}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
