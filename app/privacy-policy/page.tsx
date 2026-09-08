import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the Mahir Company Privacy Policy. Learn how customer, booking, and service partner information is collected, processed, and protected.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteHeader />

      <main className="bg-background">
        {/* Page Hero */}
        <section className="border-b border-line bg-gradient-to-b from-brand/5 via-background to-background py-12 sm:py-16">
          <div className="site-container">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full bg-brand-soft px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.13em] text-brand">
                Legal &amp; Data Transparency
              </span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl">
                Privacy Policy
              </h1>
              <p className="mt-4 text-sm text-muted sm:text-base">
                Last updated: September 2026
              </p>
            </div>
          </div>
        </section>

        {/* Policy Content */}
        <section className="py-12 sm:py-16">
          <div className="site-container">
            <div className="mx-auto max-w-3xl space-y-10 rounded-2xl border border-line bg-white p-6 shadow-card sm:p-10 lg:p-12">
              {/* Introduction */}
              <div>
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  1. Introduction
                </h2>
                <p className="mt-3 text-base leading-7 text-muted">
                  Mahir Company operates a digital home-services marketplace connecting customers across supported cities in Pakistan with home repair, maintenance, and cleaning service professionals available through the platform. This Privacy Policy explains how we collect, process, and handle your information when you access our website, book services, submit partner applications, or send business inquiries.
                </p>
              </div>

              {/* Information We Collect */}
              <div>
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  2. Information We Collect
                </h2>
                <p className="mt-3 text-base leading-7 text-muted">
                  We collect information that you directly provide when using our platform:
                </p>
                <div className="mt-4 space-y-4 text-base leading-7 text-muted">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      A. Customer Account &amp; Authentication Information
                    </h3>
                    <p className="mt-1">
                      When registering or signing in, we collect your full name, email address, phone number, and account verification status. If you authenticate using Google Sign-In, we receive your name, email address, and Google account identifier as authorized through Google&apos;s identity service. We do not receive or store your Google password.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground">
                      B. Service Addresses
                    </h3>
                    <p className="mt-1">
                      To facilitate service visits, you may save service addresses in your account, including location title (e.g., Home or Office), selected city (such as Lahore, Karachi, Islamabad, or Rawalpindi), area/locality, street address, and building or landmark details.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground">
                      C. Booking &amp; Order Information
                    </h3>
                    <p className="mt-1">
                      When placing a booking request, we record the selected service, preferred visit date and time slot, service address, customer contact number, any notes or instructions you provide, and ongoing status updates (such as confirmed, in progress, or completed).
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground">
                      D. Service Professional / Partner Applications
                    </h3>
                    <p className="mt-1">
                      Individuals who apply to become a Mahir service partner submit their full name, phone number, email address, service category expertise, operating city, years of practical experience, and optional background remarks.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground">
                      E. Business Enquiries
                    </h3>
                    <p className="mt-1">
                      Commercial entities contacting us for facility maintenance submit company name, contact person name, corporate email address, phone number, business sector, operating cities, number of facilities, requested service categories, and requirement details.
                    </p>
                  </div>
                </div>
              </div>

              {/* How We Use Information */}
              <div>
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  3. How Information Is Used
                </h2>
                <ul className="mt-3 list-inside list-disc space-y-2 text-base leading-7 text-muted">
                  <li>To schedule, confirm, and coordinate requested home maintenance visits.</li>
                  <li>To verify customer accounts via email confirmation codes or Google authentication.</li>
                  <li>To contact you regarding appointment confirmations, scheduling adjustments, or customer service support.</li>
                  <li>To enable customers to view booking history and manage saved addresses in their personal profile.</li>
                  <li>To review partner applications and assess service provider eligibility.</li>
                  <li>To respond to corporate facility inquiries and prepare business service quotations.</li>
                  <li>To maintain platform security, detect fraudulent requests, and preserve operational integrity.</li>
                </ul>
              </div>

              {/* Technician Coordination */}
              <div>
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  4. Service Provider &amp; Technician Coordination
                </h2>
                <p className="mt-3 text-base leading-7 text-muted">
                  Mahir Company coordinates service requests between customers and service professionals available through the platform. When you book a service, we share the necessary job details—such as the requested service, visit time, service address, and customer contact number—with the assigned technician solely to enable them to travel to your premises and perform the requested work.
                </p>
                <p className="mt-3 text-base leading-7 text-muted">
                  We do not sell, rent, or trade your personal information to third-party advertisers.
                </p>
              </div>

              {/* Authentication Providers */}
              <div>
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  5. Authentication &amp; Third-Party Services
                </h2>
                <p className="mt-3 text-base leading-7 text-muted">
                  Our platform supports sign-in via Google Identity Services. When using Google Sign-In, Google handles authentication on its secure servers in accordance with Google&apos;s Privacy Policy and returns an authorized verification token to Mahir. We never access, handle, or store your Google account credentials or passwords.
                </p>
              </div>

              {/* Browser Storage */}
              <div>
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  6. Browser Storage &amp; Cookies
                </h2>
                <p className="mt-3 text-base leading-7 text-muted">
                  We do not utilize third-party advertising, retargeting, or behavioral tracking cookies. Our platform utilizes essential client-side browser storage (such as localStorage) solely to remember your active login session token, your selected city preference, and your temporary shopping cart items during your visit.
                </p>
              </div>

              {/* Data Security */}
              <div>
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  7. Information Security
                </h2>
                <p className="mt-3 text-base leading-7 text-muted">
                  We use technical and organizational measures intended to protect personal information. Platform communications utilize HTTPS encryption in transit, and customer account endpoints require authorized session authentication. However, no internet transmission or electronic storage method can be guaranteed completely secure.
                </p>
              </div>

              {/* Data Retention & User Controls */}
              <div>
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  8. Data Retention &amp; User Choices
                </h2>
                <p className="mt-3 text-base leading-7 text-muted">
                  We retain personal, booking, and account information for as long as reasonably necessary to maintain your customer account, fulfill scheduled service visits, maintain accurate transaction history, and satisfy legal or accounting recordkeeping obligations.
                </p>
                <p className="mt-3 text-base leading-7 text-muted">
                  Registered customers may view and update their profile details, add or delete saved addresses, and review previous service orders at any time through their personal account dashboard.
                </p>
              </div>

              {/* Children's Privacy */}
              <div>
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  9. Children&apos;s Privacy
                </h2>
                <p className="mt-3 text-base leading-7 text-muted">
                  Mahir Company&apos;s services are intended exclusively for individuals who are at least 18 years of age and capable of entering into binding agreements. We do not knowingly collect personal information from minors.
                </p>
              </div>

              {/* Policy Updates */}
              <div>
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  10. Changes to This Privacy Policy
                </h2>
                <p className="mt-3 text-base leading-7 text-muted">
                  We may periodically update this Privacy Policy to reflect enhancements in our services, platform features, or operational practices. Any revisions will be published on this page with an updated &ldquo;Last updated&rdquo; date.
                </p>
              </div>

              {/* Contact */}
              <div className="rounded-xl border border-line bg-background p-6">
                <h2 className="text-lg font-bold text-foreground sm:text-xl">
                  11. Contact &amp; Privacy Inquiries
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted">
                  For questions regarding this Privacy Policy, your personal account data, or data privacy practices, inquiries may be directed through the Mahir customer platform. Official corporate legal and contact information will be published here prior to public commercial launch.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href="/"
                    className="inline-flex min-h-10 items-center justify-center rounded-lg bg-brand px-4 text-xs font-semibold text-white transition-colors hover:bg-brand-dark"
                  >
                    Return to Home
                  </Link>
                  <Link
                    href="/terms"
                    className="inline-flex min-h-10 items-center justify-center rounded-lg border border-line bg-white px-4 text-xs font-semibold text-foreground transition-colors hover:border-brand hover:text-brand"
                  >
                    View Terms &amp; Conditions
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
