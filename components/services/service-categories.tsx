import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { serviceToneStyles } from "@/components/services/service-tone-styles";
import type { ServiceFilters } from "@/data/services";
import { getWordPressCategories } from "@/lib/mahir-api";

type ServiceCategoriesProps = {
  filters: ServiceFilters;
};

const tones = [
  "blue",
  "cyan",
  "amber",
  "green",
  "violet",
  "orange",
  "rose",
  "slate",
] as const;

function getCategoryCode(name: string) {
  const words = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!words.length) {
    return "MS";
  }

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return `${words[0][0]}${words[1][0]}`.toUpperCase();
}

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
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => {
              const isActive =
                filters.category === category.slug;

              const tone =
                tones[index % tones.length];

              const code =
                getCategoryCode(category.name);

              return (
                <li
                  key={category.id}
                  className="min-w-0"
                >
                  <Link
                    href={buildCategoryHref(
                      category.slug,
                      filters,
                    )}
                    aria-current={
                      isActive ? "page" : undefined
                    }
                    className={`group flex h-full min-h-44 flex-col rounded-[1.35rem] border p-4 transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-brand/30 hover:shadow-card sm:p-5 ${
                      isActive
                        ? "border-brand/40 bg-white shadow-card"
                        : "border-line bg-white"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`grid size-11 place-items-center rounded-2xl text-sm font-black tracking-[-0.02em] ${serviceToneStyles[tone]}`}
                    >
                      {code}
                    </span>

                    <h3 className="mt-5 text-lg font-semibold leading-6 tracking-[-0.01em] text-foreground">
                      {category.name}
                    </h3>

                    <p className="mt-2 flex-1 text-sm leading-6 text-muted">
                      {category.description ||
                        "Professional Mahir home services."}
                    </p>

                    <span className="mt-4 flex items-center justify-between border-t border-line pt-3 text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                      {category.count}{" "}
                      {category.count === 1
                        ? "service"
                        : "services"}

                      <span
                        aria-hidden="true"
                        className="text-base text-brand transition-transform group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </section>
  );
}