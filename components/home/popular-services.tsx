import Link from "next/link";
import { getWordPressCategories } from "@/lib/mahir-api";
import { SectionHeading } from "@/components/ui/section-heading";
import { CategoryCard } from "@/components/home/category-card";

export async function PopularServices() {
  const categories = await getWordPressCategories();

  // Show published categories that contain services, or all categories if none have explicit count
  const displayCategories = categories.filter(
    (c) => (c.services_count ?? c.count ?? 0) > 0
  );
  const categoriesToRender =
    displayCategories.length > 0 ? displayCategories : categories;

  const viewAllLink = (
    <Link
      href="/services#all-services"
      className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-line bg-white px-4 font-semibold text-foreground transition-colors hover:border-brand/30 hover:text-brand"
    >
      View All Services <span aria-hidden="true">→</span>
    </Link>
  );

  if (categoriesToRender.length === 0) {
    return null;
  }

  // Responsive layout adaptation based on available category count
  let gridLayoutClass = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  if (categoriesToRender.length === 1) {
    gridLayoutClass = "grid-cols-1 max-w-md";
  } else if (categoriesToRender.length === 2) {
    gridLayoutClass = "grid-cols-1 sm:grid-cols-2 max-w-[880px]";
  } else if (categoriesToRender.length === 3) {
    gridLayoutClass = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl";
  }

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

        <div className={`mt-10 grid gap-6 sm:gap-7 lg:gap-8 ${gridLayoutClass}`}>
          {categoriesToRender.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        <div className="mt-7 sm:hidden">{viewAllLink}</div>
      </div>
    </section>
  );
}
