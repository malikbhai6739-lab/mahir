import Link from "next/link";
import { ServiceCard } from "@/components/services/service-card";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  filterServices,
  serviceCategories,
  type ServiceFilters,
} from "@/data/services";

type ServiceDirectoryProps = {
  filters: ServiceFilters;
};

export function ServiceDirectory({ filters }: ServiceDirectoryProps) {
  const filteredServices = filterServices(filters);

  return (
    <section
      id="all-services"
      aria-labelledby="all-services-heading"
      className="scroll-mt-24 bg-background py-20 sm:py-24 lg:py-28"
    >
      <div className="site-container">
        <div className="flex flex-col gap-3 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="All services"
            title="Explore the complete Mahir directory"
            description="Browse the current service catalog by category."
            id="all-services-heading"
          />
          <p role="status" className="shrink-0 text-sm font-semibold text-muted">
            {filteredServices.length} {filteredServices.length === 1 ? "service" : "services"} found
            {filters.city ? ` in ${filters.city}` : ""}
          </p>
        </div>

        {filteredServices.length ? (
          <div className="mt-14 space-y-16">
            {serviceCategories.map((category) => {
              const categoryServices = filteredServices.filter(
                (service) => service.category === category.slug,
              );

              if (!categoryServices.length) return null;

              return (
                <section
                  key={category.slug}
                  aria-labelledby={`${category.slug}-services-heading`}
                >
                  <div className="flex flex-col gap-3 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h3
                        id={`${category.slug}-services-heading`}
                        className="text-2xl font-bold leading-tight tracking-[-0.01em] text-foreground sm:text-3xl"
                      >
                        {category.name}
                      </h3>
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
                        {category.description}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm font-semibold text-muted">
                      {categoryServices.length}{" "}
                      {categoryServices.length === 1 ? "service" : "services"}
                    </span>
                  </div>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {categoryServices.map((service) => (
                      <ServiceCard
                        key={service.slug}
                        service={service}
                        headingLevel={4}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <div className="mt-10 rounded-[1.35rem] border border-line bg-white px-6 py-14 text-center sm:px-10">
            <span
              aria-hidden="true"
              className="mx-auto grid size-12 place-items-center rounded-2xl bg-brand-soft font-black text-brand"
            >
              ?
            </span>
            <h3 className="mt-5 text-2xl font-bold leading-tight tracking-[-0.01em] text-foreground">
              No matching services yet
            </h3>
            <p className="mx-auto mt-3 max-w-xl leading-7 text-muted">
              Try another category, city, or search term to explore more of the
              Mahir catalog.
            </p>
            <Link
              href="/services#all-services"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-5 font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              View all services
            </Link>
          </div>
        )}

        <p className="mt-10 text-center text-xs leading-5 text-muted">
          Starting prices and ratings are illustrative for this frontend phase.
          Final pricing may vary by job scope, property, and city.
        </p>
      </div>
    </section>
  );
}
