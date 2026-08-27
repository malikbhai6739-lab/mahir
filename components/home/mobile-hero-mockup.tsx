export function MobileHeroMockup() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[24rem]">
      <div className="absolute -left-10 top-20 size-44 rounded-full bg-white/10" />
      <div className="absolute -right-16 bottom-16 size-56 rounded-full bg-[#75b8ff]/20" />

      <div className="relative mx-auto w-full max-w-[18rem] rounded-[2.75rem] border-[0.55rem] border-[#07131f] bg-background p-2 shadow-[0_30px_80px_rgba(0,0,0,0.28)] sm:max-w-[20rem]">
        <div className="mx-auto mb-2 h-5 w-24 rounded-full bg-[#07131f]" />
        <div className="overflow-hidden rounded-[2rem] bg-white">
          <div className="flex items-center justify-between gap-3 border-b border-line bg-white px-4 py-3.5">
            <div className="flex min-w-0 items-center gap-2">
              <span className="grid size-8 shrink-0 place-items-center rounded-[0.65rem] bg-brand text-xs font-black text-white">
                M
              </span>
              <span className="text-base font-bold tracking-[-0.025em] text-foreground">
                mahir<span className="text-brand">.</span>
              </span>
            </div>
            <span className="min-w-0 truncate rounded-full bg-brand-soft px-2.5 py-1.5 text-[0.65rem] font-semibold text-brand">
              Lahore
            </span>
          </div>

          <div className="bg-brand-soft px-4 py-5">
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.13em] text-brand">
              Trusted home services
            </p>
            <p className="mt-2.5 text-[1.65rem] font-bold leading-[1.08] tracking-[-0.01em] text-foreground">
              On Time. <span className="text-brand">Done Right.</span> Every
              Time.
            </p>
            <p className="mt-3 text-xs leading-5 text-muted">
              Book a verified professional for the service your home needs.
            </p>

            <div className="mt-4 rounded-xl border border-line bg-white p-3 shadow-[0_8px_20px_rgba(12,33,56,0.06)]">
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-muted">
                What do you need?
              </p>
              <p className="mt-1.5 truncate text-xs font-medium text-foreground">
                AC repair or plumber
              </p>
            </div>
            <div className="mt-3 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand px-4 text-xs font-semibold text-white">
              Find a service <span>→</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 p-4">
            {["Verified experts", "Clear pricing"].map((item) => (
              <div
                key={item}
                className="flex min-w-0 items-center gap-2 rounded-xl border border-line bg-white px-2.5 py-3"
              >
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#e8f7f1] text-[0.6rem] font-black text-success">
                  ✓
                </span>
                <span className="text-[0.62rem] font-semibold leading-4 text-foreground">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
