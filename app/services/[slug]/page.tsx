import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ServiceDetailPage } from "@/components/service-detail-page";
import { serviceCatalog, serviceDetailCatalog } from "@/data/services";

function buildFallbackServiceDetail(slug: string) {
  const catalogEntry = serviceCatalog.find((item) => item.slug === slug);

  if (!catalogEntry) {
    return null;
  }

  return {
    slug: catalogEntry.slug,
    title: catalogEntry.name,
    category: catalogEntry.category,
    image: "/images/mahir-technician.png",
    description: catalogEntry.description,
    rating: catalogEntry.rating,
    reviewCount: catalogEntry.reviewCount,
    completedOrders: 1200,
    currentPrice: catalogEntry.startingPrice ?? 0,
    originalPrice: catalogEntry.startingPrice ? catalogEntry.startingPrice + 500 : undefined,
    duration: "Approx. 60-90 minutes",
    availability: "Available across major Mahir service areas.",
    includedItems: [
      "Professional inspection",
      "Service-specific check",
      "Safety review",
      "Basic performance assessment",
    ],
    excludedItems: [
      "Replacement parts",
      "Gas refill unless selected separately",
      "Major repair work",
      "Electrical or structural modification",
    ],
    notes: [
      "Approximate duration may vary depending on the work scope.",
      "Standard tools and inspection steps are included in the service visit.",
      "Additional parts or work require approval before proceeding.",
    ],
    faqs: [
      {
        question: "What does this service include?",
        answer:
          "This service includes a professional assessment, service-specific checks, and a practical completion review performed by a verified Mahir technician.",
      },
      {
        question: "How long does it take?",
        answer:
          "Most visits take about 60 to 90 minutes depending on the service and property conditions.",
      },
      {
        question: "Are extra materials included?",
        answer:
          "Standard service work is included, but parts, gas, or additional materials are quoted separately when required.",
      },
    ],
    reviews: [
      {
        name: "Verified customer",
        city: "Lahore",
        rating: 5,
        date: "Recent",
        text: "The process was clear, the technician was professional, and the job was completed as expected.",
      },
      {
        name: "Customer review",
        city: "Islamabad",
        rating: 4,
        date: "Recent",
        text: "Pricing was transparent and the technician explained the work clearly before starting.",
      },
    ],
  };
}

type ServiceDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ServiceDetailRoutePage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service =
    serviceDetailCatalog.find((item) => item.slug === slug) ??
    buildFallbackServiceDetail(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <ServiceDetailPage service={service} />
      <SiteFooter />
    </>
  );
}
