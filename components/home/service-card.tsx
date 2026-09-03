import Link from "next/link";
import type { Service, ServiceTone } from "@/data/homepage";

const toneStyles: Record<ServiceTone, string> = {
  blue: "bg-[#e7f2ff] text-[#0b63ce]",
  cyan: "bg-[#e4f7f8] text-[#087f8c]",
  amber: "bg-[#fff3d8] text-[#ad6800]",
  green: "bg-[#e8f7ef] text-[#16855b]",
  violet: "bg-[#f0ebff] text-[#6750a4]",
  orange: "bg-[#fff0e5] text-[#b95f1d]",
  rose: "bg-[#ffeaee] text-[#b54257]",
  slate: "bg-[#edf1f5] text-[#40566e]",
};

type ServiceCardProps = {
  service: Service;
  categorySlug: string;
  index: number;
};

export function ServiceCard({ service, categorySlug, index }: ServiceCardProps) {
  return (
    <article className="group min-w-0">
      <Link
        href={`/services?category=${encodeURIComponent(categorySlug)}`}
        aria-label={`View ${service.title} services`}
        className="block h-full overflow-hidden rounded-[1.35rem] border border-line bg-white transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-brand/30 hover:shadow-card"
      >
        <div
          className={`relative flex h-32 items-end justify-between overflow-hidden p-5 sm:h-36 ${toneStyles[service.tone]}`}
        >
          <span className="absolute -right-3 -top-8 text-[7.5rem] font-black leading-none tracking-[-0.09em] opacity-[0.08]">
            {service.code}
          </span>
          <span className="relative text-4xl font-black tracking-[-0.07em]">
            {service.code}
          </span>
          <span className="relative rounded-full border border-current/20 bg-white/65 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em]">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-2 sm:gap-3">
            <div className="min-w-0">
              <h3 className="text-base font-semibold leading-5 tracking-[-0.015em] text-foreground sm:text-xl sm:leading-6">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                {service.description}
              </p>
            </div>
            <span
              aria-hidden="true"
              className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-line text-brand transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-white sm:size-9"
            >
              →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
