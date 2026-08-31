import { cities } from "@/data/homepage";
import { getWordPressCategories } from "@/lib/mahir-api";

type ServicesHeroProps = {
  initialCity?: string;
  initialQuery?: string;
  initialCategory?: string;
};

export async function ServicesHero({
  initialCity = "",
  initialQuery = "",
  initialCategory = "",
}: ServicesHeroProps) {
  const categories = await getWordPressCategories();

  return (
    <section
      aria-labelledby="services-page-heading"
      className="overflow-hidden bg-white"
    >
      <div className="site-container py-12 sm:py-16 lg:py-18">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.13em] text-brand sm:text-sm">
            Professional home services
          </p>

          <h1
            id="services-page-heading"
            className="mt-4 text-balance text-[clamp(2.35rem,5vw,3.75rem)] font-bold leading-[1.07] tracking-[-0.01em] text-foreground"
          >
            Find the Right Service for Your Home
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
            Browse trusted professional services available in your city.
          </p>
        </div>

        <form
          action="/services#all-services"
          className="mx-auto mt-8 max-w-5xl rounded-2xl border border-line bg-white p-3 text-left shadow-card sm:p-4"
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[0.85fr_1.35fr_1fr_auto] lg:items-end">
            <label className="block min-w-0">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                Your city
              </span>

              <select
                name="city"
                defaultValue={initialCity}
                className="h-13 w-full rounded-xl border border-line bg-background px-4 text-base font-medium text-foreground outline-none transition-colors focus:border-brand"
              >
                <option value="">All cities</option>

                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </label>

            <label className="block min-w-0">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                What do you need?
              </span>

              <input
                type="search"
                name="q"
                defaultValue={initialQuery}
                autoComplete="off"
                placeholder="Try “AC repair” or “plumber”"
                className="h-13 w-full rounded-xl border border-line bg-background px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted/70 focus:border-brand"
              />
            </label>

            <label className="block min-w-0">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                Category
              </span>

              <select
                name="category"
                defaultValue={initialCategory}
                className="h-13 w-full rounded-xl border border-line bg-background px-4 text-base font-medium text-foreground outline-none transition-colors focus:border-brand"
              >
                <option value="">All categories</option>

                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.slug}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="submit"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-brand px-6 text-base font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              Search
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}