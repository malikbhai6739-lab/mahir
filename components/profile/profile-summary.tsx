import type { CustomerProfile } from "@/data/profile";

export function ProfileSummary({ profile }: { profile: CustomerProfile }) {
  const initials = profile.fullName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "MC";

  return (
    <section className="rounded-[1.5rem] border border-line bg-white p-5 shadow-card sm:p-6" aria-labelledby="profile-summary-heading">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div aria-hidden="true" className="grid size-16 shrink-0 place-items-center rounded-2xl bg-brand-soft text-2xl font-black text-brand">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <h2 id="profile-summary-heading" className="text-xl font-bold text-foreground">
            {profile.fullName}
          </h2>
          <p className="mt-1 text-sm text-muted">
            {profile.phone}
            {profile.city && profile.city !== "Not specified" ? ` · ${profile.city}` : ""}
          </p>
          <p className="mt-1 text-sm text-muted">
            {profile.email || "Email not added"}
          </p>
        </div>
      </div>
    </section>
  );
}
