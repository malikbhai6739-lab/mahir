"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/cart-context";
import { ServiceCard } from "@/components/services/service-card";
import { TrustSection } from "@/components/services/trust-section";
import { Accordion } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/ui/section-heading";
import { serviceCategories, serviceCatalog } from "@/data/services";
import type { ServiceDetail } from "@/data/services";

const priceFormatter = new Intl.NumberFormat("en-PK");

function getPriceDetails(service: ServiceDetail) {
  const pricing = service.pricing;

  if (!pricing) {
    return {
      primary: `PKR ${priceFormatter.format(service.currentPrice)}`,
      secondary: undefined,
      inspectionFee: undefined,
      note: undefined,
    };
  }

  if (pricing.type === "inspection_required") {
    return {
      primary: "Inspection required",
      secondary: undefined,
      inspectionFee:
        pricing.inspectionFee && pricing.inspectionFee > 0
          ? `Inspection fee: PKR ${priceFormatter.format(pricing.inspectionFee)}`
          : undefined,
      note: pricing.note || undefined,
    };
  }

  const displayPrice =
    pricing.type === "starting_from"
      ? pricing.minPrice ??
        pricing.startingPrice ??
        service.currentPrice
      : pricing.startingPrice ?? service.currentPrice;

  return {
    primary:
      pricing.type === "starting_from"
        ? `Starting from PKR ${priceFormatter.format(displayPrice)}`
        : `PKR ${priceFormatter.format(displayPrice)}`,
    secondary:
      pricing.type === "starting_from" &&
      pricing.minPrice !== null &&
      pricing.maxPrice !== null &&
      pricing.minPrice !== pricing.maxPrice
        ? `Estimated range: PKR ${priceFormatter.format(pricing.minPrice)} \u2013 PKR ${priceFormatter.format(pricing.maxPrice)}`
        : undefined,
    inspectionFee:
      pricing.inspectionFee && pricing.inspectionFee > 0
        ? `Inspection fee: PKR ${priceFormatter.format(pricing.inspectionFee)}`
        : undefined,
    note: pricing.note || undefined,
  };
}

function getDiscountPercent(currentPrice: number, originalPrice?: number) {
  if (!originalPrice || originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

type ServiceDetailPageProps = {
  service: ServiceDetail;
};

export function ServiceDetailPage({ service }: ServiceDetailPageProps) {
  const { addItem, getItemBySlug } = useCart();
  const cartItem = getItemBySlug(service.slug);

  const handleAddService = () => {
    addItem({
      id: service.slug,
      slug: service.slug,
      title: service.title,
      category:
        serviceCategories.find((item) => item.slug === service.category)?.name ??
        service.category,
      description: service.description,
      image: service.image,
      price: service.currentPrice,
      originalPrice: service.originalPrice,
    });
  };

  const relatedServices = serviceCatalog
    .filter(
      (item) => item.category === service.category && item.slug !== service.slug,
    )
    .slice(0, 4)
    .map((item) => ({
      ...item,
      slug: item.slug,
    }));

  const category = serviceCategories.find((item) => item.slug === service.category);
  const discountPercent = getDiscountPercent(service.currentPrice, service.originalPrice);
  const priceDetails = getPriceDetails(service);

  return (
    <>
      <main className="bg-background pb-28">
        <div className="site-container py-6 sm:py-8">
          <nav aria-label="Breadcrumb" className="text-sm text-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-brand">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/services" className="transition-colors hover:text-brand">
                  Services
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href={`/services?category=${service.category}#all-services`}
                  className="transition-colors hover:text-brand"
                >
                  {category?.name ?? service.category}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-medium text-foreground">
                {service.title}
              </li>
            </ol>
          </nav>
        </div>

        <section className="site-container pb-8">
          <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
            <div className="overflow-hidden rounded-[1.5rem] border border-line bg-white shadow-card">
              <div className="relative aspect-[16/11] overflow-hidden bg-brand-soft">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 56vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-line bg-white p-5 shadow-card sm:p-6 lg:sticky lg:top-24">
              <p className="text-xs font-semibold uppercase tracking-[0.13em] text-brand">
                {category?.name}
              </p>
              <h1 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.02em] text-foreground sm:text-4xl">
                {service.title}
              </h1>
              <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
                {service.description}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-muted">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-2.5 py-1 font-semibold text-foreground">
                  <span aria-hidden="true" className="text-[#d88400]">
                    ★
                  </span>
                  {service.rating.toFixed(1)}
                </span>
                <span>{service.reviewCount} reviews</span>
                <span>•</span>
                <span>{service.completedOrders}+ completed jobs</span>
              </div>

              <div className="mt-6 rounded-2xl border border-line bg-background p-4">
                <div className="flex flex-wrap items-end gap-3">
                  <p className="text-3xl font-black tracking-[-0.03em] text-foreground">
                    {priceDetails.primary}
                  </p>
                  {service.originalPrice ? (
                    <>
                      <span className="text-lg font-medium text-muted line-through">
                        PKR {priceFormatter.format(service.originalPrice)}
                      </span>
                      {discountPercent ? (
                        <span className="rounded-full bg-success/10 px-2 py-1 text-xs font-bold uppercase tracking-[0.12em] text-success">
                          {discountPercent}% OFF
                        </span>
                      ) : null}
                    </>
                  ) : null}
                </div>

                {priceDetails.secondary ? (
                  <p className="mt-2 text-sm text-muted">
                    {priceDetails.secondary}
                  </p>
                ) : null}

                {priceDetails.inspectionFee ? (
                  <p className="mt-2 text-sm text-muted">
                    {priceDetails.inspectionFee}
                  </p>
                ) : null}

                {priceDetails.note ? (
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {priceDetails.note}
                  </p>
                ) : null}

                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  {cartItem ? (
                    <Link
                      href="/cart"
                      className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-brand px-5 text-base font-semibold text-white transition-colors hover:bg-brand-dark"
                    >
                      View Cart
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={handleAddService}
                      className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-brand px-5 text-base font-semibold text-white transition-colors hover:bg-brand-dark"
                    >
                      Add Service
                    </button>
                  )}
                  <Link
                    href="/cart"
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl border border-line bg-white px-5 text-base font-semibold text-foreground transition-colors hover:border-brand hover:text-brand"
                  >
                    {cartItem ? "Review Cart" : "Book Now"}
                  </Link>
                </div>
              </div>

              <dl className="mt-6 space-y-3 text-sm text-muted">
                <div className="flex items-center justify-between gap-4 border-b border-line pb-3">
                  <dt className="font-medium text-foreground">Estimated duration</dt>
                  <dd>{service.duration}</dd>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-line pb-3">
                  <dt className="font-medium text-foreground">Availability</dt>
                  <dd className="text-right">{service.availability}</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section className="site-container py-10">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[1.5rem] border border-line bg-white p-6 shadow-card">
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-foreground">
                What&apos;s Included
              </h2>
              <ul className="mt-5 space-y-3 text-base leading-7 text-muted">
                {service.includedItems.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="mt-1 grid size-5 place-items-center rounded-full bg-success/10 text-xs font-black text-success">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[1.5rem] border border-line bg-white p-6 shadow-card">
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-foreground">
                What&apos;s Not Included
              </h2>
              <ul className="mt-5 space-y-3 text-base leading-7 text-muted">
                {service.excludedItems.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="mt-1 grid size-5 place-items-center rounded-full bg-amber-100 text-xs font-black text-amber-700">
                      !
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-6 text-muted">
                Additional work or materials may require customer approval before the technician proceeds.
              </p>
            </div>
          </div>
        </section>

        <section className="site-container py-10">
          <div className="rounded-[1.5rem] border border-line bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-foreground">
              Service Details &amp; Important Notes
            </h2>
            <ul className="mt-5 grid gap-3 text-base leading-7 text-muted sm:grid-cols-2">
              {service.notes.map((note) => (
                <li key={note} className="rounded-2xl border border-line bg-background px-4 py-3">
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-brand-soft/60 py-16 sm:py-20">
          <div className="site-container">
            <SectionHeading
              eyebrow="How it works"
              title="Simple steps to book your service"
              description="A clear process keeps the booking smooth and transparent."
              id="service-detail-how-it-works"
              align="center"
            />

            <ol className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-5">
              {[
                "Add the service",
                "Select address",
                "Choose date & time",
                "Professional arrives",
                "Service completed",
              ].map((step, index) => (
                <li key={step} className="rounded-2xl border border-line bg-white p-5 text-left shadow-card md:text-center">
                  <span className="grid size-10 place-items-center rounded-full bg-brand text-sm font-bold tracking-[0.12em] text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{step}</h3>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <TrustSection />

        <section className="site-container py-16 sm:py-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.13em] text-brand">
                Customer reviews
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-foreground">
                {service.rating.toFixed(1)} average rating
              </h2>
            </div>
            <p className="text-sm font-medium text-muted">Based on {service.reviewCount} verified reviews</p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
            {service.reviews.map((review) => (
              <article key={`${review.name}-${review.date}`} className="rounded-[1.5rem] border border-line bg-white p-5 shadow-card">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-foreground">{review.name}</p>
                    <p className="text-sm text-muted">{review.city}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-soft px-2.5 py-1 text-sm font-semibold text-foreground">
                    <span aria-hidden="true" className="text-[#d88400]">
                      ★
                    </span>
                    {review.rating}
                  </span>
                </div>
                <p className="mt-4 text-xs font-medium uppercase tracking-[0.1em] text-muted">
                  {review.date}
                </p>
                <p className="mt-3 text-base leading-7 text-muted">“{review.text}”</p>
              </article>
            ))}
          </div>
        </section>

        <section className="site-container py-10">
          <div className="rounded-[1.5rem] border border-line bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-foreground">FAQs</h2>
            <div className="mt-6">
              <Accordion items={service.faqs.map((faq) => ({ question: faq.question, answer: faq.answer }))} />
            </div>
          </div>
        </section>

        <section className="site-container py-16 sm:py-20">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Related services"
              title="More AC support from Mahir"
              description="Explore related services that are commonly booked with this service."
              id="related-services-heading"
            />
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {relatedServices.map((relatedService) => (
              <ServiceCard
                key={relatedService.slug}
                service={relatedService}
                headingLevel={3}
              />
            ))}
          </div>
        </section>

        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 py-3 shadow-[0_-8px_30px_rgba(12,33,56,0.08)] backdrop-blur sm:hidden">
          <div className="mx-auto flex max-w-md items-center justify-between gap-3">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted">
                {service.pricing?.type === "inspection_required"
                  ? "Pricing"
                  : "Starting at"}
              </p>
              <p className="text-xl font-black tracking-[-0.02em] text-foreground">
                {priceDetails.primary}
              </p>
            </div>
            {cartItem ? (
              <Link
                href="/cart"
                className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-brand px-5 text-base font-semibold text-white transition-colors hover:bg-brand-dark"
              >
                View Cart
              </Link>
            ) : (
              <button
                type="button"
                onClick={handleAddService}
                className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-brand px-5 text-base font-semibold text-white transition-colors hover:bg-brand-dark"
              >
                Add Service
              </button>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
