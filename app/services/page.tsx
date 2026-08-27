import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PopularServices } from "@/components/services/popular-services";
import { ServiceCategories } from "@/components/services/service-categories";
import { ServiceDirectory } from "@/components/services/service-directory";
import { ServicesFinalCta } from "@/components/services/services-final-cta";
import { ServicesHero } from "@/components/services/services-hero";
import { TrustSection } from "@/components/services/trust-section";
import {
  isServiceCategorySlug,
  isServiceCity,
  type ServiceFilters,
} from "@/data/services";

export const metadata: Metadata = {
  title: "All Services | Mahir Company",
  description:
    "Explore trusted professional home services available through Mahir Company across Pakistan.",
};

type ServicesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function readSearchParam(value: string | string[] | undefined) {
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}

export default async function ServicesPage({
  searchParams,
}: ServicesPageProps) {
  const params = await searchParams;
  const query = readSearchParam(params.q).slice(0, 100);
  const categoryParam = readSearchParam(params.category);
  const cityParam = readSearchParam(params.city);
  const filters: ServiceFilters = {
    query,
    category: isServiceCategorySlug(categoryParam) ? categoryParam : "",
    city: isServiceCity(cityParam) ? cityParam : "",
  };

  return (
    <>
      <SiteHeader />
      <main>
        <ServicesHero
          initialCategory={filters.category}
          initialCity={filters.city}
          initialQuery={filters.query}
        />
        <ServiceCategories filters={filters} />
        <PopularServices />
        <ServiceDirectory filters={filters} />
        <TrustSection />
        <ServicesFinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
