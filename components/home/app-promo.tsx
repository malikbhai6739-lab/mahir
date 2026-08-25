import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";

export function AppPromo() {
  return (
    <section
      id="app"
      aria-labelledby="app-heading"
      className="overflow-hidden bg-brand py-20 sm:py-24 lg:py-28"
    >
      <div className="site-container grid gap-12 lg:grid-cols-[1fr_0.82fr] lg:items-center lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Mahir mobile app"
            title="Your home services, always within reach"
            description="Discover services, keep track of appointments, and manage your home care from one simple place."
            id="app-heading"
            inverted
          />
          <div id="app-downloads" className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#app-downloads"
              aria-label="Mahir for iPhone, app store placeholder"
              className="inline-flex min-h-14 items-center gap-3 rounded-xl bg-[#07131f] px-5 text-white transition-colors hover:bg-[#10283d]"
            >
              <span aria-hidden="true" className="text-2xl font-black">
                A
              </span>
              <span>
                <span className="block text-[0.65rem] uppercase tracking-[0.12em] text-white/70">
                  Download on the
                </span>
                <span className="block font-semibold">App Store</span>
              </span>
            </Link>
            <Link
              href="#app-downloads"
              aria-label="Mahir for Android, Google Play placeholder"
              className="inline-flex min-h-14 items-center gap-3 rounded-xl bg-[#07131f] px-5 text-white transition-colors hover:bg-[#10283d]"
            >
              <span aria-hidden="true" className="text-xl">
                ▶
              </span>
              <span>
                <span className="block text-[0.65rem] uppercase tracking-[0.12em] text-white/70">
                  Get it on
                </span>
                <span className="block font-semibold">Google Play</span>
              </span>
            </Link>
          </div>
          <p className="mt-4 text-sm text-white/90">
            App store availability coming soon.
          </p>
        </div>

        <div aria-hidden="true" className="relative mx-auto w-full max-w-[24rem]">
          <div className="absolute -left-10 top-20 size-44 rounded-full bg-white/10" />
          <div className="absolute -right-16 bottom-16 size-56 rounded-full bg-[#75b8ff]/20" />
          <div className="relative mx-auto w-full max-w-[18rem] rounded-[2.75rem] border-[0.55rem] border-[#07131f] bg-background p-2 shadow-[0_30px_80px_rgba(0,0,0,0.28)] sm:max-w-[20rem]">
            <div className="mx-auto mb-2 h-5 w-24 rounded-full bg-[#07131f]" />
            <div className="overflow-hidden rounded-[2rem] bg-white">
              <div className="bg-brand-soft p-5 pb-8">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">Good morning</span>
                  <span className="grid size-8 place-items-center rounded-full bg-white text-xs font-black text-brand">
                    M
                  </span>
                </div>
                <p className="mt-5 text-2xl font-bold leading-[1.15] tracking-[-0.03em] text-foreground">
                  What can we help with today?
                </p>
                <div className="mt-4 rounded-xl border border-line bg-white px-4 py-3 text-sm text-muted">
                  Search for a service
                </div>
              </div>
              <div className="-mt-3 px-4 pb-5">
                <div className="grid grid-cols-2 gap-3">
                  {["AC", "Cleaning", "Plumbing", "Electrical"].map(
                    (service, index) => (
                      <div
                        key={service}
                        className="rounded-xl border border-line bg-white p-3 shadow-[0_8px_20px_rgba(12,33,56,0.06)]"
                      >
                        <span className="grid size-8 place-items-center rounded-lg bg-brand-soft text-[0.65rem] font-black text-brand">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="mt-3 text-xs font-semibold text-foreground">
                          {service}
                        </p>
                      </div>
                    ),
                  )}
                </div>
                <div className="mt-4 rounded-xl bg-foreground p-4 text-white">
                  <p className="text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-[#8dc3ff]">
                    Upcoming booking
                  </p>
                  <p className="mt-1 text-sm font-semibold">AC maintenance · 2:30 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
