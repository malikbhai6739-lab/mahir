import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ServiceDetailPage } from "@/components/service-detail-page";

import {
  serviceDetailCatalog,
  type DirectoryService,
  type ServiceDetail,
} from "@/data/services";

import { getWordPressServices } from "@/lib/mahir-api";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function buildFallbackServiceDetail(
  service: DirectoryService,
): ServiceDetail {
  return {
    slug: service.slug,
    title: service.name,
    category: service.category,
    image: service.image,
    description: service.description,
    rating: service.rating,
    reviewCount: service.reviewCount,
    completedOrders: 0,
    currentPrice: service.startingPrice ?? 0,

    originalPrice: undefined,

    duration:
      service.duration ??
      "Approx. 60-90 minutes",

    availability:
      "Available across major Mahir service areas.",

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
          service.duration
            ? `Estimated service duration is ${service.duration}.`
            : "Most visits take about 60 to 90 minutes depending on the service and property conditions.",
      },
      {
        question: "Are extra materials included?",
        answer:
          "Standard service work is included, but parts, gas, or additional materials are quoted separately when required.",
      },
    ],

    reviews: [],
  };
}

function mergeWordPressService(
  liveService: DirectoryService,
): ServiceDetail {
  const existingDetail = serviceDetailCatalog.find(
    (item) => item.slug === liveService.slug,
  );

  if (!existingDetail) {
    return buildFallbackServiceDetail(
      liveService,
    );
  }

  return {
    ...existingDetail,

    // WordPress is source of truth
    title: liveService.name,

    category: liveService.category,

    image: liveService.image,

    description: liveService.description,

    currentPrice:
      liveService.startingPrice ??
      existingDetail.currentPrice,

    duration:
      liveService.duration ??
      existingDetail.duration,

    // Old hardcoded discount price disabled
    originalPrice: undefined,
  };
}

type ServiceDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ServiceDetailRoutePage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;

  const liveServices =
    await getWordPressServices();

  const liveService = liveServices.find(
    (item) => item.slug === slug,
  );

  if (!liveService) {
    notFound();
  }

  const service =
    mergeWordPressService(liveService);

  return (
    <>
      <SiteHeader />

      <ServiceDetailPage
        service={service}
      />

      <SiteFooter />
    </>
  );
}