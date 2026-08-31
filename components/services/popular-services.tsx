import Link from "next/link";
import { ServiceCard } from "@/components/services/service-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { getWordPressServices } from "@/lib/mahir-api";

export async function PopularServices() {
  const services = await getWordPressServices();

  // Filhaal WordPress ki pehli 4 published services
  // Popular Services section mein show hongi.
  const popularServices = services.slice(0, 4);

  if (popularServices.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="popular-services-page-heading"
      className="bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="site-container">
        <SectionHeading
          eyebrow="Popular services"
          title="Frequently booked by Mahir customers"
          description="Quick access to the repairs, care, and maintenance services homes need most often."
          id="popular-services-page-heading"
          action={
            <Link
              href="#all-services"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-line bg-white px-5 font-semibold text-foreground transition-colors hover:border-brand/30 hover:text-brand"
            >
              Browse all services
            </Link>
          }
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {popularServices.map((service) => (
            <ServiceCard
              key={service.slug}
              service={service}
            />
          ))}
        </div>

        <Link
          href="#all-services"
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-line bg-white px-5 font-semibold text-foreground transition-colors hover:border-brand/30 hover:text-brand sm:hidden"
        >
          Browse all services
        </Link>
      </div>
    </section>
  );
}