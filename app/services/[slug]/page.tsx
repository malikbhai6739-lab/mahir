import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ServiceDetailPage } from "@/components/service-detail-page";
import { SITE_URL, safeJsonLdReplacer } from "@/lib/site-url";

import {
  serviceDetailCatalog,
  type DirectoryService,
  type ServiceDetail,
} from "@/data/services";

import { getWordPressServices } from "@/lib/mahir-api";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function getStructuredAvailability(
  service: DirectoryService,
) {
  if (
    !service.hasStructuredCities ||
    !service.availableCities.length
  ) {
    return undefined;
  }

  return `Available in ${service.availableCities
    .map((city) => city.name)
    .join(", ")}`;
}

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

    currentPrice:
      service.pricing?.startingPrice ??
      service.startingPrice ??
      0,

    pricing: service.pricing,

    originalPrice: undefined,

    duration:
      service.duration ??
      "Approx. 60-90 minutes",

    availability:
      getStructuredAvailability(service) ??
      service.availability ??
      "Available across major Mahir service areas.",

    includedItems:
      service.includedItems?.length
        ? service.includedItems
        : [
            "Professional inspection",
            "Service-specific check",
            "Safety review",
            "Basic performance assessment",
          ],

    excludedItems:
      service.excludedItems?.length
        ? service.excludedItems
        : [
            "Replacement parts",
            "Gas refill unless selected separately",
            "Major repair work",
            "Electrical or structural modification",
          ],

    notes:
      service.notes?.length
        ? service.notes
        : [
            "Approximate duration may vary depending on the work scope.",
            "Standard tools and inspection steps are included in the service visit.",
            "Additional parts or work require approval before proceeding.",
          ],

    faqs:
      service.faqs?.length
        ? service.faqs
        : [
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
  const existingDetail =
    serviceDetailCatalog.find(
      (item) =>
        item.slug === liveService.slug,
    );

  if (!existingDetail) {
    return buildFallbackServiceDetail(
      liveService,
    );
  }

  return {
    ...existingDetail,

    // WordPress is source of truth.
    title: liveService.name,

    category: liveService.category,

    image: liveService.image,

    description: liveService.description,

    currentPrice:
      liveService.pricing?.startingPrice ??
      liveService.startingPrice ??
      existingDetail.currentPrice,

    pricing:
      liveService.pricing ??
      existingDetail.pricing,

    duration:
      liveService.duration ??
      existingDetail.duration,

    availability:
      getStructuredAvailability(liveService) ??
      liveService.availability ??
      existingDetail.availability,

    includedItems:
      liveService.includedItems?.length
        ? liveService.includedItems
        : existingDetail.includedItems,

    excludedItems:
      liveService.excludedItems?.length
        ? liveService.excludedItems
        : existingDetail.excludedItems,

    notes:
      liveService.notes?.length
        ? liveService.notes
        : existingDetail.notes,

    faqs:
      liveService.faqs?.length
        ? liveService.faqs
        : existingDetail.faqs,

    // Old hardcoded discount price disabled.
    originalPrice: undefined,
  };
}

type ServiceDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  const liveServices = await getWordPressServices();
  const liveService = liveServices.find((item) => item.slug === slug);

  if (!liveService) {
    return {
      title: "Service Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${liveService.name} Services in Pakistan`;
  const rawDesc =
    liveService.description ||
    `Book verified professionals for ${liveService.name} services with Mahir Company in Pakistan.`;
  const cleanDesc = rawDesc.replace(/\s+/g, " ").trim().slice(0, 160);
  const canonicalPath = `/services/${liveService.slug}`;
  const absoluteUrl = `${SITE_URL}${canonicalPath}`;

  return {
    title,
    description: cleanDesc,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description: cleanDesc,
      url: absoluteUrl,
      type: "website",
      ...(liveService.image
        ? {
            images: [
              {
                url: liveService.image,
                alt: liveService.name,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: cleanDesc,
      ...(liveService.image
        ? {
            images: [liveService.image],
          }
        : {}),
    },
  };
}

export default async function ServiceDetailRoutePage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;

  const liveServices =
    await getWordPressServices();

  const liveService =
    liveServices.find(
      (item) =>
        item.slug === slug,
    );

  if (!liveService) {
    notFound();
  }

  const service =
    mergeWordPressService(
      liveService,
    );

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: "Mahir Company",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "Pakistan",
    },
    url: `${SITE_URL}/services/${service.slug}`,
    ...(service.image ? { image: service.image } : {}),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${SITE_URL}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `${SITE_URL}/services/${service.slug}`,
      },
    ],
  };

  const hasFaqs = Array.isArray(service.faqs) && service.faqs.length > 0;
  const faqJsonLd = hasFaqs
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: service.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdReplacer(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdReplacer(breadcrumbJsonLd) }}
      />
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLdReplacer(faqJsonLd) }}
        />
      ) : null}

      <SiteHeader />

      <ServiceDetailPage
        service={service}
      />

      <SiteFooter />
    </>
  );
}
