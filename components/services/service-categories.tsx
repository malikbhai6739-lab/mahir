import { SectionHeading } from "@/components/ui/section-heading";
import type { ServiceFilters } from "@/data/services";
import { getWordPressCategories } from "@/lib/mahir-api";
import { CategoryCard } from "@/components/home/category-card";

type ServiceCategoriesProps = {
  filters: ServiceFilters;
};

function buildCategoryHref(
  category: string,
  filters: ServiceFilters,
) {
  const params = new URLSearchParams();

  if (filters.query) {
    params.set("q", filters.query);
  }

  params.set("category", category);

  if (filters.city) {
    params.set("city", filters.city);
  }

  return `/services?${params.toString()}#all-services`;
}

export async function ServiceCategories({
  filters,
}: ServiceCategoriesProps) {
  const categories = await getWordPressCategories();

  if (categories.length === 0) {
    return null;
  }

  // Responsive layout adaptation based on available category count
  let gridLayoutClass = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  if (categories.length === 1) {
    gridLayoutClass = "grid-cols-1 max-w-md";
  } else if (categories.length === 2) {
    gridLayoutClass = "grid-cols-1 sm:grid-cols-2 max-w-[880px]";
  } else if (categories.length === 3) {
    gridLayoutClass = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl";
  }

  return (
    <section
      aria-labelledby="service-categories-heading"
      className="bg-background py-16 sm:py-20 lg:py-24"
    >
      <div className="site-container">
        <SectionHeading
          eyebrow="Service categories"
          title="Start with what your home needs"
          description="Choose a category to narrow the directory, then refine by service or city."
          id="service-categories-heading"
        />

        <nav
          aria-label="Service categories"
          className="mt-10"
        >
          <div className={`grid gap-6 sm:gap-7 lg:gap-8 ${gridLayoutClass}`}>
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                href={buildCategoryHref(category.slug, filters)}
                isActive={filters.category === category.slug}
              />
            ))}
          </div>
        </nav>
      </div>
    </section>
  );
}
