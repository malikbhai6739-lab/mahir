import Image from "next/image";
import { cities, trustIndicators } from "@/data/homepage";

export function Hero() {
  return (
    <section id="booking" className="relative overflow-hidden bg-white">
      <div className="site-container grid gap-12 py-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-14 lg:py-20 xl:py-24">
        <div className="min-w-0">
          <p className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.13em] text-brand sm:text-sm">
            <span aria-hidden="true" className="size-2 rounded-full bg-success" />
            Trusted home services across Pakistan
          </p>
          <h1 className="max-w-3xl text-balance text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold leading-[1.07] tracking-[-0.01em] text-foreground">
            <span className="whitespace-nowrap">On Time.</span>{" "}
            <span className="whitespace-nowrap text-brand">Done Right.</span>{" "}
            <span className="whitespace-nowrap">Every Time.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
            Book trusted professionals for repairs, cleaning, and home
            maintenance—at a time that works for you.
          </p>

          <form
            id="city-search"
            action="#services"
            className="mt-8 rounded-2xl border border-line bg-white p-3 shadow-card sm:p-4"
          >
            <div className="grid gap-3 sm:grid-cols-[0.8fr_1.3fr_auto] sm:items-end">
              <label className="block min-w-0">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                  Your city
                </span>
                <select
                  name="city"
                  defaultValue="Lahore"
                  className="h-13 w-full rounded-xl border border-line bg-background px-4 text-base font-medium text-foreground outline-none transition-colors focus:border-brand"
                >
                  {cities.map((city) => (
                    <option key={city}>{city}</option>
                  ))}
                </select>
              </label>
              <label className="block min-w-0">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                  What do you need?
                </span>
                <input
                  type="search"
                  name="service"
                  autoComplete="off"
                  placeholder="Try “AC repair” or “plumber”"
                  className="h-13 w-full rounded-xl border border-line bg-background px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted/70 focus:border-brand"
                />
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

          <ul className="mt-7 grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-4">
            {trustIndicators.map((indicator) => (
              <li
                key={indicator}
                className="flex items-start gap-2 text-sm font-medium leading-5 text-foreground"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-soft text-[0.7rem] font-black text-brand"
                >
                  ✓
                </span>
                {indicator}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:mx-0">
          <div className="relative min-h-[27rem] overflow-hidden rounded-[2rem] bg-brand-soft sm:min-h-[34rem]">
            <Image
              src="/images/mahir-technician.png"
              alt="A Mahir home-service professional ready for an appointment"
              fill
              preload
              sizes="(max-width: 1023px) calc(100vw - 40px), 44vw"
              className="object-cover object-[62%_center]"
            />
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl border border-white/70 bg-white/95 p-4 shadow-card sm:inset-x-auto sm:bottom-7 sm:left-7 sm:w-[19rem]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                  Mahir verified
                </p>
                <p className="mt-1 font-semibold text-foreground">
                  Professional. Prepared. On time.
                </p>
              </div>
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#e8f7f1] text-lg font-black text-success">
                ✓
              </span>
            </div>
          </div>
          <div className="absolute -bottom-5 -right-3 hidden rounded-2xl border border-line bg-white px-4 py-3 shadow-card sm:block lg:-right-5">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">
              Next available
            </p>
            <p className="mt-1 font-semibold text-foreground">Today, 2:30 PM</p>
          </div>
        </div>
      </div>
    </section>
  );
}
