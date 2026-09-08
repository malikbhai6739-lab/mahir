import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BecomeMahirForm } from "@/components/become-mahir/become-mahir-form";
import { getWordPressCategories, getWordPressCities } from "@/lib/mahir-api";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: {
    absolute: "Become a Mahir | Partner with Mahir Company",
  },
  description:
    "Join Mahir Company as a skilled home-service professional. Connect with customer service requests in supported cities across Pakistan.",
  alternates: {
    canonical: "/become-a-mahir",
  },
};

const benefits = [
  {
    title: "Customer Service Requests",
    desc: "Connect with real customer booking requests in your chosen city and category without spending money on marketing.",
    icon: "📈",
  },
  {
    title: "Flexible Working Hours",
    desc: "Work on your own terms. Choose your operating locations and take bookings when it suits your availability.",
    icon: "⏰",
  },
  {
    title: "Transparent Service Rates",
    desc: "Clear service pricing for completed customer visits without hidden terms.",
    icon: "💳",
  },
  {
    title: "Dedicated Partner Support",
    desc: "Our partner operations team assists you with job coordination, customer communication, and issue resolution.",
    icon: "🤝",
  },
];

const steps = [
  {
    step: "01",
    title: "Submit Online Application",
    desc: "Fill in your trade details, contact number, and the city you operate in.",
  },
  {
    step: "02",
    title: "Skill & Identity Check",
    desc: "Our onboarding team contacts you to verify your experience, trade skills, and CNIC.",
  },
  {
    step: "03",
    title: "Account Activation",
    desc: "Once approved by our admin team, your Mahir provider profile is activated in the network.",
  },
  {
    step: "04",
    title: "Receive Jobs",
    desc: "Get assigned customer bookings based on eligibility, deliver great service, and grow your service business.",
  },
];

const requirements = [
  "Valid Pakistani CNIC (National Identity Card)",
  "Proven hands-on experience in your trade (AC, Plumbing, Electrical, etc.)",
  "Standard trade tools, safety gear, and reliable transportation",
  "Reliable mobile phone and reachable contact number for service coordination",
  "Commitment to punctuality, polite customer interaction, and clean work",
];

const faqs = [
  {
    q: "Is there any fee to register as a Mahir?",
    a: "There is no fee to submit a Mahir application.",
  },
  {
    q: "How long does the application review take?",
    a: "Our team reviews applications and contacts suitable candidates for the next onboarding steps.",
  },
  {
    q: "How are jobs assigned?",
    a: "Jobs are assigned based on service requirements, operating city, technician eligibility, and availability.",
  },
  {
    q: "Can I do Mahir work part-time?",
    a: "Availability and working arrangements can be discussed during onboarding.",
  },
];

export default async function BecomeMahirPage() {
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
                Provider Opportunities
              </span>
              <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Partner with Mahir.{" "}
                <span className="text-brand">Grow Your Service Business.</span>
              </h1>
              <p className="mt-6 text-balance text-base text-muted sm:text-lg sm:leading-8">
                Mahir connects skilled home-service professionals with customer service requests in supported cities.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="#apply"
                  className="inline-flex min-h-13 w-full items-center justify-center rounded-xl bg-brand px-8 text-base font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-dark sm:w-auto"
                >
                  Apply as a Provider &rarr;
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex min-h-13 w-full items-center justify-center rounded-xl border border-line bg-white px-8 text-base font-semibold text-foreground transition hover:bg-slate-50 sm:w-auto"
                >
                  How It Works
                </Link>
              </div>

              {/* PLATFORM HIGHLIGHTS */}
              <div className="mt-14 grid grid-cols-2 gap-4 rounded-2xl border border-line/80 bg-white p-6 shadow-sm sm:grid-cols-4">
                <div className="text-center">
                  <div className="text-base font-bold text-brand sm:text-lg">Verified Network</div>
                  <div className="mt-1 text-xs font-medium text-muted">Quality-first service platform</div>
                </div>
                <div className="text-center">
                  <div className="text-base font-bold text-brand sm:text-lg">Service Requests</div>
                  <div className="mt-1 text-xs font-medium text-muted">Customer requests in your city</div>
                </div>
                <div className="text-center">
                  <div className="text-base font-bold text-brand sm:text-lg">Transparent Model</div>
                  <div className="mt-1 text-xs font-medium text-muted">Clear scope and pricing</div>
                </div>
                <div className="text-center">
                  <div className="text-base font-bold text-brand sm:text-lg">Free Application</div>
                  <div className="mt-1 text-xs font-medium text-muted">No application fee</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFITS SECTION */}
        <section className="border-t border-line/60 bg-white py-16 sm:py-20">
          <div className="site-container">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-brand">
                Partner Opportunities
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Supporting skilled service professionals
              </h2>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="rounded-2xl border border-line/80 bg-background p-6 transition hover:shadow-md"
                >
                  <div className="text-3xl">{b.icon}</div>
                  <h3 className="mt-4 text-lg font-bold text-foreground">{b.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="border-t border-line/60 py-16 sm:py-20">
          <div className="site-container">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-brand">
                Simple & Transparent Process
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Your journey to becoming a Mahir
              </h2>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s) => (
                <div
                  key={s.step}
                  className="relative rounded-2xl border border-line/80 bg-white p-6 shadow-sm"
                >
                  <div className="text-xs font-black tracking-widest text-brand">
                    STEP {s.step}
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* REQUIREMENTS & ACTIVE CITIES */}
        <section className="border-t border-line/60 bg-white py-16 sm:py-20">
          <div className="site-container">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand">
                  Quality Standards
                </span>
                <h2 className="mt-2 text-3xl font-bold text-foreground">
                  Requirements & Eligibility
                </h2>
                <p className="mt-3 text-sm text-muted">
                  To maintain service quality and reliability, every Mahir applicant must meet our core standards:
                </p>

                <ul className="mt-6 space-y-3">
                  {requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-foreground">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                        &#10003;
                      </span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-line/80 bg-slate-50/70 p-8">
                <span className="text-xs font-bold uppercase tracking-wider text-brand">
                  Available Across Pakistan
                </span>
                <h3 className="mt-2 text-2xl font-bold text-foreground">
                  Operating Cities & Categories
                </h3>
                <p className="mt-2 text-sm text-muted">
                  We are actively recruiting skilled professionals in the following locations and trades:
                </p>

                <div className="mt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Active Cities
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

                <div className="mt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Service Categories
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

        {/* APPLICATION FORM SECTION */}
        <section id="apply" className="border-t border-line/60 bg-slate-50/50 py-16 sm:py-24">
          <div className="site-container">
            <div className="mx-auto max-w-3xl">
              <div className="text-center mb-10">
                <span className="text-xs font-bold uppercase tracking-wider text-brand">
                  Start Your Application
                </span>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Ready to join as a service partner?
                </h2>
                <p className="mt-3 text-sm text-muted">
                  Fill out the form below. Our team reviews applications and contacts suitable candidates for the next onboarding steps.
                </p>
              </div>

              <BecomeMahirForm categories={categories} cities={cities} />
            </div>
          </div>
        </section>

        {/* PROVIDER FAQ */}
        <section className="border-t border-line/60 bg-white py-16 sm:py-20">
          <div className="site-container">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-brand">
                Questions & Answers
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
