"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { WordPressCategory } from "@/lib/mahir-api";

type CategoryCardProps = {
  category: WordPressCategory;
  href?: string;
  isActive?: boolean;
};

export function CategoryCard({ category, href, isActive }: CategoryCardProps) {
  const [imageError, setImageError] = useState(false);

  const count = category.services_count ?? category.count ?? 0;
  const countLabel = `${count} ${count === 1 ? "Service" : "Services"}`;

  const cities = category.cities || [];
  let citiesDisplay = "";
  if (cities.length === 1) {
    citiesDisplay = cities[0].name;
  } else if (cities.length === 2) {
    citiesDisplay = `${cities[0].name}, ${cities[1].name}`;
  } else if (cities.length === 3) {
    citiesDisplay = `${cities[0].name}, ${cities[1].name}, ${cities[2].name}`;
  } else if (cities.length > 3) {
    citiesDisplay = `${cities[0].name}, ${cities[1].name} +${cities.length - 2} more`;
  }

  const hasImage = Boolean(category.image && !imageError);
  const destinationHref =
    href || `/services?category=${encodeURIComponent(category.slug)}#all-services`;

  const description = category.description?.trim();

  return (
    <article className="group h-full min-w-0">
      <Link
        href={destinationHref}
        aria-label={`Explore ${category.name} (${countLabel})`}
        aria-current={isActive ? "page" : undefined}
        className={`flex h-full flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-200 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-lg ${
          isActive
            ? "border-brand ring-2 ring-brand/20 shadow-card"
            : "border-line/80 shadow-sm"
        }`}
      >
        {/* Main Category Visual (16:9 Landscape Aspect Ratio) */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-brand-soft/80 to-slate-100">
          {hasImage ? (
            <Image
              src={category.image!}
              alt={category.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 450px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              unoptimized={category.image!.startsWith("http")}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center p-6 text-center">
              <div className="flex flex-col items-center gap-2">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-white/80 text-brand shadow-sm">
                  <svg
                    className="size-6 text-brand"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.75}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-muted">Mahir Verified</span>
              </div>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="text-lg font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-brand sm:text-xl">
            {category.name}
          </h3>

          {description ? (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
              {description}
            </p>
          ) : null}

          {/* Metadata & Actions (Anchored at Bottom) */}
          <div className="mt-auto pt-5">
            <div className="flex flex-wrap items-center justify-between gap-2.5 border-t border-line/70 pt-3.5">
              <span className="inline-flex items-center rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
                {countLabel}
              </span>

              {citiesDisplay && (
                <div className="flex items-center gap-1.5 text-xs font-medium text-muted">
                  <svg
                    className="size-3.5 shrink-0 text-brand"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="truncate">{citiesDisplay}</span>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between pt-0.5">
              <span className="text-xs font-bold uppercase tracking-wider text-brand group-hover:underline">
                Explore Services
              </span>
              <span
                aria-hidden="true"
                className="grid size-8 place-items-center rounded-full bg-brand-soft text-sm font-bold text-brand transition-all group-hover:translate-x-1 group-hover:bg-brand group-hover:text-white"
              >
                →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
