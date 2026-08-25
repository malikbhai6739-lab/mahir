import { homeCareGuides } from "@/data/homepage";
import { SectionHeading } from "@/components/ui/section-heading";

const guideToneStyles: Record<string, string> = {
  blue: "bg-[#e7f2ff] text-[#0b63ce]",
  amber: "bg-[#fff3d8] text-[#ad6800]",
  green: "bg-[#e8f7ef] text-[#16855b]",
};

export function Guides() {
  return (
    <section
      id="guides"
      aria-labelledby="guides-heading"
      className="bg-background py-20 sm:py-24 lg:py-28"
    >
      <div className="site-container">
        <SectionHeading
          eyebrow="Home care guides"
          title="Know your home. Care for it better."
          description="Practical, locally relevant advice to prevent avoidable repairs and make confident maintenance decisions."
          id="guides-heading"
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {homeCareGuides.map((guide) => (
            <article
              key={guide.title}
              className="group overflow-hidden rounded-[1.5rem] border border-line bg-white transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-brand/25 hover:shadow-card"
            >
              <div
                className={`relative flex h-44 items-end overflow-hidden p-6 ${guideToneStyles[guide.tone]}`}
              >
                <span className="absolute -right-3 -top-9 text-[10rem] font-black leading-none tracking-[-0.1em] opacity-[0.08]">
                  {guide.code}
                </span>
                <div className="relative flex w-full items-end justify-between gap-4">
                  <span className="rounded-full bg-white/75 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em]">
                    {guide.category}
                  </span>
                  <span className="text-4xl font-black tracking-[-0.07em]">
                    {guide.code}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">
                  Mahir guide · {guide.readTime}
                </p>
                <h3 className="mt-3 text-xl font-bold leading-[1.25] tracking-[-0.02em] text-foreground sm:text-2xl">
                  {guide.title}
                </h3>
                <p className="mt-3 leading-7 text-muted">{guide.description}</p>
                <p className="mt-6 inline-flex items-center gap-2 font-semibold text-brand">
                  Guide preview <span aria-hidden="true">→</span>
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
