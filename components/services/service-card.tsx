import Link from "next/link";
import Image from "next/image";
import { serviceToneStyles } from "@/components/services/service-tone-styles";
import {
  serviceCategories,
  type DirectoryService,
} from "@/data/services";

const priceFormatter = new Intl.NumberFormat("en-PK");

type ServiceCardProps = {
  service: DirectoryService;
  headingLevel?: 3 | 4;
};

export function ServiceCard({
  service,
  headingLevel = 3,
}: ServiceCardProps) {
  const categoryName = serviceCategories.find(
    (category) => category.slug === service.category,
  )?.name;
  const detailHref = `/services/${service.slug}`;
  const Heading = headingLevel === 4 ? "h4" : "h3";

  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-[1.35rem] border border-line bg-white transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-brand/30 hover:shadow-card">
      <Link href={detailHref} className="block focus:outline-none focus-visible:rounded-t-[1.35rem]">
        <div
          className={`relative flex h-32 shrink-0 items-end justify-between overflow-hidden p-5 sm:h-36 ${serviceToneStyles[service.tone]}`}
        >
          <Image
            src={service.image}
            alt={service.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
          />
          <span aria-hidden="true" className="absolute inset-0 bg-foreground/25" />
          <span aria-hidden="true" className="absolute -right-3 -top-8 text-[7.5rem] font-black leading-none tracking-[-0.06em] opacity-[0.08]">
            {service.code}
          </span>
          <span aria-hidden="true" className="relative text-4xl font-black tracking-[-0.04em]">
            {service.code}
          </span>
          <span className="relative max-w-[70%] rounded-full border border-current/20 bg-white/70 px-2.5 py-1 text-right text-[0.65rem] font-semibold uppercase tracking-[0.12em]">
            {categoryName}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold">
          <span
            aria-label={`Static rating: ${service.rating} out of 5 from ${service.reviewCount} reviews`}
            className="inline-flex items-center gap-1.5 text-foreground"
          >
            <span aria-hidden="true" className="text-[#d88400]">
              ★
            </span>
            {service.rating.toFixed(1)}
            <span className="font-medium text-muted">({service.reviewCount})</span>
          </span>
          {service.startingPrice ? (
            <span className="text-muted">
              From <span className="text-foreground">PKR {priceFormatter.format(service.startingPrice)}</span>
            </span>
          ) : null}
        </div>

        <Link href={detailHref} className="block focus:outline-none">
          <Heading className="mt-4 text-xl font-semibold leading-6 tracking-[-0.01em] text-foreground transition-colors hover:text-brand">
            {service.name}
          </Heading>
        </Link>
        <p className="mt-2 flex-1 text-sm leading-6 text-muted">
          {service.description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
          <Link
            href={detailHref}
            className="rounded-lg py-2 text-sm font-semibold text-brand underline decoration-brand/25 underline-offset-4 transition-colors hover:text-brand-dark hover:decoration-brand"
          >
            View Service
          </Link>
          <Link
            href={detailHref}
            aria-label={`Book ${service.name}`}
            className="inline-flex min-h-10 items-center justify-center rounded-xl bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            Book service
          </Link>
        </div>
      </div>
    </article>
  );
}
