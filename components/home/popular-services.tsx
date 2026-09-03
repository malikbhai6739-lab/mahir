import Link from "next/link";
import { popularServices } from "@/data/homepage";
import { getWordPressCategories } from "@/lib/mahir-api";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceCard } from "@/components/home/service-card";

function getCategorySlug(
  title: string,
  categories: Awaited<ReturnType<typeof getWordPressCategories>>,
) {
  const normalizedTitle = title.trim().toLocaleLowerCase("en");
  const fallbackSlug = normalizedTitle
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return (
    categories.find(
      (category) =>
        category.name.trim().toLocaleLowerCase("en") === normalizedTitle ||
        category.slug === fallbackSlug,
    )?.slug ?? fallbackSlug
  );
}

export async function PopularServices() {
  const categories = await getWordPressCategories();
  const viewAllLink = (
    <Link
      href="/services#all-services"
      className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-line bg-white px-4 font-semibold text-foreground transition-colors hover:border-brand/30 hover:text-brand"
    >
      View All Services <span aria-hidden="true">→</span>
    </Link>
  );

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-background py-20 sm:py-24 lg:py-28"
    >
      <div className="site-container">
        <SectionHeading
          eyebrow="Popular services"
          title="Expert help for every corner of your home"
          description="From urgent repairs to planned improvements, find a verified professional for the job in a few simple steps."
          id="services-heading"
          action={viewAllLink}
        />

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {popularServices.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              categorySlug={getCategorySlug(service.title, categories)}
              index={index}
            />
          ))}
        </div>
        <div className="mt-7 sm:hidden">{viewAllLink}</div>
      </div>
    </section>
  );
}
