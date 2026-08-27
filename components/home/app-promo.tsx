import { MobileHeroMockup } from "@/components/home/mobile-hero-mockup";
import { SectionHeading } from "@/components/ui/section-heading";
import { StoreBadges } from "@/components/ui/store-badges";

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
          <StoreBadges id="app-downloads" className="mt-8" variant="app-promo" />
          <p className="mt-4 text-sm text-white/90">
            App store availability coming soon.
          </p>
        </div>

        <MobileHeroMockup />
      </div>
    </section>
  );
}
