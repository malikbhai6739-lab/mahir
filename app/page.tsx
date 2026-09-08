import { AppPromo } from "@/components/home/app-promo";
import { BusinessCta } from "@/components/home/business-cta";
import { Faq } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";
import { Guides } from "@/components/home/guides";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { Maintenance } from "@/components/home/maintenance";
import { PopularServices } from "@/components/home/popular-services";
import { Testimonials } from "@/components/home/testimonials";
import { WhyMahir } from "@/components/home/why-mahir";
import { Affiliations } from "@/components/layout/affiliations";
import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SITE_URL, safeJsonLdReplacer } from "@/lib/site-url";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Mahir Company",
  url: SITE_URL,
  description:
    "Trusted home services platform in Pakistan connecting customers with verified professionals for home repairs, maintenance, and cleaning.",
};

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Mahir Company",
  url: SITE_URL,
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdReplacer(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdReplacer(webSiteJsonLd) }}
      />
      <SiteHeader />
      <main>
        <Hero />
        <PopularServices />
        <WhyMahir />
        <HowItWorks />
        <Testimonials />
        <Maintenance />
        <BusinessCta />
        <AppPromo />
        <Guides />
        <Faq />
        <FinalCta />
      </main>
      <Affiliations />
      <SiteFooter />
    </>
  );
}
