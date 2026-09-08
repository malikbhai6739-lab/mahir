import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Review the Terms & Conditions governing use of the Mahir Company home services marketplace and customer booking platform.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader />

      <main className="bg-background">
        {/* Page Hero */}
        <section className="border-b border-line bg-gradient-to-b from-brand/5 via-background to-background py-12 sm:py-16">
          <div className="site-container">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full bg-brand-soft px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.13em] text-brand">
                Service Agreement
              </span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl">
                Terms &amp; Conditions
              </h1>
              <p className="mt-4 text-sm text-muted sm:text-base">
                Last updated: September 2026
              </p>
            </div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-12 sm:py-16">
          <div className="site-container">
            <div className="mx-auto max-w-3xl space-y-10 rounded-2xl border border-line bg-white p-6 shadow-card sm:p-10 lg:p-12">
              {/* Acceptance of Terms */}
              <div>
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  1. Acceptance of Terms
                </h2>
                <p className="mt-3 text-base leading-7 text-muted">
                  These Terms and Conditions (&ldquo;Terms&rdquo;) constitute a binding agreement between you (&ldquo;Customer,&rdquo; &ldquo;User,&rdquo; or &ldquo;You&rdquo;) and Mahir Company governing your access to and use of the Mahir website, booking portal, and customer services. By browsing our website, registering an account, or requesting home services, you acknowledge that you have read, understood, and agreed to these Terms.
                </p>
              </div>

              {/* About Mahir */}
              <div>
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  2. About the Mahir Platform
                </h2>
                <p className="mt-3 text-base leading-7 text-muted">
                  Mahir Company provides a digital marketplace and coordination platform connecting residential and commercial customers with service professionals (&ldquo;Mahir technicians&rdquo; or &ldquo;service providers&rdquo;) available through the platform for home repairs, maintenance, AC servicing, plumbing, electrical work, and cleaning in supported cities across Pakistan.
                </p>
              </div>

              {/* Eligibility & Accounts */}
              <div>
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  3. Eligibility &amp; Customer Accounts
                </h2>
                <p className="mt-3 text-base leading-7 text-muted">
                  You must be at least 18 years of age to book services through Mahir. When creating an account, you agree to provide accurate, current, and complete contact details (full name, phone number, email address, and service address). You are responsible for safeguarding your login credentials and for all activities that occur under your account.
                </p>
              </div>

              {/* Booking Services */}
              <div>
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  4. Service Bookings &amp; Scheduling
                </h2>
                <p className="mt-3 text-base leading-7 text-muted">
                  When placing a booking, you select the desired service category, specify the service location, and choose a preferred appointment date and time slot. Bookings are subject to technician availability in your designated city and area. While we make every reasonable operational effort to dispatch an available service professional within your selected time window, unforeseen traffic, weather, or job complexities may occasionally impact arrival times.
                </p>
              </div>

              {/* Pricing & Estimates */}
              <div>
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  5. Pricing &amp; Additional Scope
                </h2>
                <p className="mt-3 text-base leading-7 text-muted">
                  Prices displayed on the website may represent baseline starting rates or service estimates. Baseline prices may not cover unexpected repairs, replacement parts, materials, or additional requirements discovered upon physical inspection.
                </p>
                <p className="mt-3 text-base leading-7 text-muted">
                  If additional work, materials, or spare parts are required, the estimated scope and cost will be communicated before additional work proceeds.
                </p>
              </div>

              {/* Customer Responsibilities */}
              <div>
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  6. Customer Responsibilities
                </h2>
                <ul className="mt-3 list-inside list-disc space-y-2 text-base leading-7 text-muted">
                  <li>Ensure an authorized adult representative is present at the designated premises throughout the service visit.</li>
                  <li>Provide safe and unhindered access to the work area, including essential utility connections (water and electricity) necessary to test and complete the service.</li>
                  <li>Disclose any pre-existing hazards, faults, or delicate property conditions relevant to the requested service.</li>
                  <li>Review and verify the completed work with the technician prior to the conclusion of the visit.</li>
                </ul>
              </div>

              {/* Role of Service Providers */}
              <div>
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  7. Service Professionals
                </h2>
                <p className="mt-3 text-base leading-7 text-muted">
                  Service professionals coordinate through the platform and perform work directly at customer premises. Customers are encouraged to treat service professionals with respect and maintain a professional working environment.
                </p>
              </div>

              {/* Payments */}
              <div>
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  8. Payments
                </h2>
                <p className="mt-3 text-base leading-7 text-muted">
                  Payment amounts reflect the agreed service charges, including baseline visit fees and any approved spare parts or extra labor. Applicable charges and available payment arrangements may be communicated through the booking or service process.
                </p>
              </div>

              {/* Cancellations */}
              <div>
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  9. Cancellations
                </h2>
                <p className="mt-3 text-base leading-7 text-muted">
                  Customers may cancel scheduled service appointments through their personal account dashboard subject to operational dispatch status. To facilitate orderly coordination, customers are requested to submit cancellation requests well in advance of the scheduled visit window.
                </p>
              </div>

              {/* Service Issues & Feedback */}
              <div>
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  10. Service Issues &amp; Customer Support
                </h2>
                <p className="mt-3 text-base leading-7 text-muted">
                  If you encounter any concern regarding the quality of service, technician conduct, or job completion, please report the matter promptly to Mahir customer support. Mahir may review reported service concerns and assist with appropriate next steps.
                </p>
              </div>

              {/* Prohibited Activities */}
              <div>
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  11. Prohibited Conduct
                </h2>
                <p className="mt-3 text-base leading-7 text-muted">
                  When using the platform, you agree not to:
                </p>
                <ul className="mt-3 list-inside list-disc space-y-2 text-base leading-7 text-muted">
                  <li>Submit false, fraudulent, or speculative booking requests.</li>
                  <li>Impersonate any person or entity, or misrepresent contact information.</li>
                  <li>Engage in abusive, threatening, or unlawful behavior toward service professionals or support personnel.</li>
                  <li>Interfere with, compromise, or probe the security or functionality of the platform.</li>
                </ul>
              </div>

              {/* Intellectual Property */}
              <div>
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  12. Intellectual Property
                </h2>
                <p className="mt-3 text-base leading-7 text-muted">
                  The Mahir name, branding, website content, user interface designs, and platform materials may be protected by applicable intellectual property laws and may not be used, reproduced, or distributed without appropriate authorization.
                </p>
              </div>

              {/* Disclaimers & Limitation of Liability */}
              <div>
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  13. Disclaimers &amp; Limitation of Liability
                </h2>
                <p className="mt-3 text-base leading-7 text-muted">
                  The platform is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. While Mahir coordinates service requests with available service professionals, Mahir shall not be liable for indirect, incidental, special, or consequential damages arising from the use of the platform or service fulfillment, subject always to mandatory statutory protections under applicable law.
                </p>
              </div>

              {/* Governing Law */}
              <div>
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  14. Governing Law
                </h2>
                <p className="mt-3 text-base leading-7 text-muted">
                  These Terms are governed by and construed in accordance with the applicable laws of Pakistan, subject to any mandatory rights and requirements under applicable law.
                </p>
              </div>

              {/* Changes to Terms */}
              <div>
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  15. Modifications to These Terms
                </h2>
                <p className="mt-3 text-base leading-7 text-muted">
                  We reserve the right to revise these Terms periodically. Material changes will become effective upon publication on the platform with an updated &ldquo;Last updated&rdquo; date. Continued use of the platform following any modifications constitutes your acceptance of the revised Terms.
                </p>
              </div>

              {/* Contact */}
              <div className="rounded-xl border border-line bg-background p-6">
                <h2 className="text-lg font-bold text-foreground sm:text-xl">
                  16. Contact &amp; Questions
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted">
                  For inquiries regarding these Terms and Conditions or your customer service experience, please contact customer support through the Mahir platform. Official corporate legal and contact information will be published here prior to public commercial launch.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href="/"
                    className="inline-flex min-h-10 items-center justify-center rounded-lg bg-brand px-4 text-xs font-semibold text-white transition-colors hover:bg-brand-dark"
                  >
                    Return to Home
                  </Link>
                  <Link
                    href="/privacy-policy"
                    className="inline-flex min-h-10 items-center justify-center rounded-lg border border-line bg-white px-4 text-xs font-semibold text-foreground transition-colors hover:border-brand hover:text-brand"
                  >
                    View Privacy Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
