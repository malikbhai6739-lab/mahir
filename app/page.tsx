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
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function HomePage() {
  return (
    <>
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
