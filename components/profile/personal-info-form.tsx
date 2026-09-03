import type { CustomerProfile } from "@/data/profile";

export function PersonalInfoForm({ profile }: { profile: CustomerProfile }) {
  return (
    <section id="personal-information" className="rounded-[1.5rem] border border-line bg-white p-5 shadow-card sm:p-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.13em] text-brand">Account details</p>
        <h2 className="mt-2 text-2xl font-bold text-foreground">Personal Information</h2>
      </div>
      <dl className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Full Name</dt>
          <dd className="mt-2 font-semibold text-foreground">{profile.fullName}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Phone Number</dt>
          <dd className="mt-2 font-semibold text-foreground">{profile.phone}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Email</dt>
          <dd className="mt-2 font-semibold text-foreground">{profile.email || "Email not added"}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">City</dt>
          <dd className="mt-2 font-semibold text-foreground">{profile.city && profile.city !== "Not specified" ? profile.city : "Not specified"}</dd>
        </div>
      </dl>
    </section>
  );
}
