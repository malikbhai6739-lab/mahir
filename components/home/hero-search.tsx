"use client";

import { useState, useRef, useEffect, useId } from "react";
import Image from "next/image";
import Link from "next/link";
import type { DirectoryService } from "@/data/services";
import type { WordPressCategory } from "@/lib/mahir-api";

type HeroSearchProps = {
  cities: readonly string[];
  initialServices: DirectoryService[];
  initialCategories: WordPressCategory[];
};

type ServiceCardProps = {
  service: DirectoryService;
  isSelected: boolean;
  hasImage: boolean;
  onSelect: (service: DirectoryService) => void;
  onImageError: (slug: string) => void;
};

function ServiceCard({
  service,
  isSelected,
  hasImage,
  onSelect,
  onImageError,
}: ServiceCardProps) {
  const startingPrice =
    service.pricing?.startingPrice || service.startingPrice;

  return (
    <button
      type="button"
      role="option"
      aria-selected={isSelected}
      onClick={() => onSelect(service)}
      className={`group relative flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
        isSelected
          ? "border-brand bg-brand text-white shadow-sm"
          : "border-line/70 bg-background/60 hover:border-brand/40 hover:bg-brand-soft text-foreground"
      }`}
    >
      {hasImage ? (
        <div className="relative size-9 shrink-0 overflow-hidden rounded-lg bg-white border border-line/40">
          <Image
            src={service.image}
            alt=""
            fill
            sizes="36px"
            className="object-cover"
            unoptimized={service.image.startsWith("http")}
            onError={() => onImageError(service.slug)}
          />
        </div>
      ) : (
        <div
          className={`size-9 shrink-0 rounded-lg flex items-center justify-center font-bold text-xs ${
            isSelected
              ? "bg-white/20 text-white"
              : "bg-brand-soft text-brand"
          }`}
        >
          {service.code || service.name.slice(0, 2).toUpperCase()}
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p
          className={`text-sm font-semibold truncate ${
            isSelected
              ? "text-white"
              : "text-foreground group-hover:text-brand"
          }`}
        >
          {service.name}
        </p>
        {startingPrice ? (
          <p
            className={`text-[11px] truncate ${
              isSelected ? "text-white/80" : "text-muted"
            }`}
          >
            From PKR {startingPrice.toLocaleString()}
          </p>
        ) : null}
      </div>

      {isSelected && (
        <svg
          className="size-4 shrink-0 text-white ml-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
    </button>
  );
}

export function HeroSearch({
  cities,
  initialServices,
  initialCategories,
}: HeroSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<DirectoryService | null>(null);
  const [validationError, setValidationError] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownId = useId();
  const errorId = useId();

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Focus filter input when dropdown opens if search filter exists
  useEffect(() => {
    if (isOpen && initialServices.length > 6) {
      searchInputRef.current?.focus();
    }
  }, [isOpen, initialServices.length]);

  const handleSelectService = (service: DirectoryService) => {
    setSelectedService(service);
    setValidationError(false);
    setIsOpen(false);
  };

  const handleClearSelection = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedService(null);
    setValidationError(false);
    triggerRef.current?.focus();
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!selectedService) {
      e.preventDefault();
      setValidationError(true);
      setIsOpen(true);
      triggerRef.current?.focus();
    }
  };

  // Filter services by search filter text if provided
  const normalizedFilter = searchFilter.trim().toLowerCase();
  const filteredServices = initialServices.filter((service) => {
    if (!normalizedFilter) return true;
    return (
      service.name.toLowerCase().includes(normalizedFilter) ||
      service.description.toLowerCase().includes(normalizedFilter) ||
      (service.keywords &&
        service.keywords.some((kw) => kw.toLowerCase().includes(normalizedFilter)))
    );
  });

  // Group services by category
  const categoriesMap = new Map<string, string>();
  initialCategories.forEach((cat) => {
    categoriesMap.set(cat.slug, cat.name);
  });

  const groupedServices = new Map<string, DirectoryService[]>();
  filteredServices.forEach((service) => {
    const catSlug = service.category || "other";
    const existing = groupedServices.get(catSlug) || [];
    existing.push(service);
    groupedServices.set(catSlug, existing);
  });

  const handleImageError = (serviceSlug: string) => {
    setImageErrors((prev) => ({ ...prev, [serviceSlug]: true }));
  };

  // Adaptive layout configuration based strictly on WordPress service count
  const totalCount = initialServices.length;

  let panelWidthClass = "w-full sm:w-[500px] md:w-[580px] lg:w-[640px]";
  let gridColsClass = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
  let panelPaddingClass = "p-4 sm:p-5";
  let headerSpacingClass = "pb-3 mb-3";

  if (totalCount <= 1) {
    // 1 service: ultra-compact dropdown panel, stays close to service field width, 1 column
    panelWidthClass = "w-full sm:w-[320px] md:w-[360px]";
    gridColsClass = "grid-cols-1";
    panelPaddingClass = "p-3 sm:p-3.5";
    headerSpacingClass = "pb-2.5 mb-2.5";
  } else if (totalCount <= 3) {
    // 2-3 services: compact dropdown panel, width stays close to service field width, up to 2 columns
    panelWidthClass = "w-full sm:w-[380px] md:w-[440px]";
    gridColsClass = "grid-cols-1 sm:grid-cols-2";
    panelPaddingClass = "p-3.5 sm:p-4";
    headerSpacingClass = "pb-2.5 mb-2.5";
  } else if (totalCount <= 6) {
    // 4-6 services: medium-width panel, 2 columns where space allows
    panelWidthClass = "w-full sm:w-[460px] md:w-[520px]";
    gridColsClass = "grid-cols-1 sm:grid-cols-2";
    panelPaddingClass = "p-4";
    headerSpacingClass = "pb-3 mb-3";
  } else {
    // 7+ services: full premium mega-menu style, wider panel, 3-column grid
    panelWidthClass = "w-full sm:w-[500px] md:w-[580px] lg:w-[640px]";
    gridColsClass = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
    panelPaddingClass = "p-4 sm:p-5";
    headerSpacingClass = "pb-3 mb-3";
  }

  // Only show category section groupings when there are multiple categories AND 4+ services
  const showCategoryGroups = groupedServices.size > 1 && totalCount >= 4;

  return (
    <form
      id="city-search"
      action="/services#all-services"
      onSubmit={handleFormSubmit}
      className="mt-8 rounded-2xl border border-line bg-white p-3 shadow-card sm:p-4"
    >
      <div className="grid gap-3 sm:grid-cols-[0.8fr_1.3fr_auto] sm:items-end">
        {/* Your City Select */}
        <label className="block min-w-0">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-muted">
            Your city
          </span>
          <select
            name="city"
            defaultValue="Lahore"
            className="h-13 w-full rounded-xl border border-line bg-background px-4 text-base font-medium text-foreground outline-none transition-colors focus:border-brand cursor-pointer"
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>

        {/* What Do You Need? Mega-Dropdown Trigger */}
        <div ref={containerRef} className="relative min-w-0">
          <label htmlFor="service-picker-button" className="block min-w-0 cursor-pointer">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-muted">
              What do you need?
            </span>
          </label>

          <button
            ref={triggerRef}
            type="button"
            id="service-picker-button"
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-controls={dropdownId}
            aria-describedby={validationError ? errorId : undefined}
            onClick={() => {
              setIsOpen((prev) => !prev);
              if (validationError) setValidationError(false);
            }}
            className={`h-13 w-full flex items-center justify-between rounded-xl border px-4 text-left transition-all duration-150 outline-none cursor-pointer select-none ${
              validationError
                ? "border-amber-500 bg-amber-50/40 ring-2 ring-amber-500/20"
                : isOpen
                ? "border-brand bg-white ring-2 ring-brand/15 shadow-sm"
                : "border-line bg-background hover:border-brand/40 hover:bg-white"
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              {selectedService?.image && !imageErrors[selectedService.slug] ? (
                <span className="relative size-6 shrink-0 overflow-hidden rounded-md border border-line/50 bg-brand-soft">
                  <Image
                    src={selectedService.image}
                    alt=""
                    fill
                    sizes="24px"
                    className="object-cover"
                    unoptimized={selectedService.image.startsWith("http")}
                    onError={() => handleImageError(selectedService.slug)}
                  />
                </span>
              ) : selectedService ? (
                <span className="size-6 shrink-0 rounded-md bg-brand-soft text-brand font-bold text-[10px] flex items-center justify-center">
                  {selectedService.code || selectedService.name.slice(0, 2).toUpperCase()}
                </span>
              ) : null}

              <span
                className={`text-base truncate ${
                  selectedService ? "font-medium text-foreground" : "text-muted/70"
                }`}
              >
                {selectedService ? selectedService.name : "Select a service"}
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0 ml-2">
              {selectedService && (
                <span
                  role="button"
                  tabIndex={0}
                  aria-label="Clear selected service"
                  onClick={handleClearSelection}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleClearSelection(e);
                    }
                  }}
                  className="p-1 rounded-md text-muted hover:text-foreground hover:bg-line/40 transition-colors cursor-pointer"
                >
                  <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </span>
              )}
              <svg
                className={`size-4 text-muted transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-brand" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>

          {/* Hidden input for search query */}
          <input
            type="hidden"
            name="q"
            value={selectedService ? selectedService.name : ""}
          />

          {/* Subtle Inline Validation Alert */}
          {validationError && (
            <p
              id={errorId}
              role="alert"
              className="mt-1.5 text-xs font-medium text-amber-700 flex items-center gap-1.5 animate-in fade-in-0 duration-150"
            >
              <svg
                className="size-3.5 shrink-0 text-amber-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Please select a service from the list
            </p>
          )}

          {/* Mega-Dropdown Panel */}
          {isOpen && (
            <div
              id={dropdownId}
              role="listbox"
              aria-label="Available services"
              className={`absolute left-0 top-full mt-2 ${panelWidthClass} max-w-[calc(100vw-2rem)] z-50 rounded-2xl border border-line bg-white ${panelPaddingClass} shadow-2xl animate-in fade-in-0 zoom-in-95 duration-150`}
            >
              {/* Header */}
              <div
                className={`flex items-center justify-between border-b border-line ${headerSpacingClass}`}
              >
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                    What service do you need?
                  </h3>
                  <p className="text-[11px] font-medium text-muted mt-0.5">
                    {totalCount <= 3
                      ? "Select from available services"
                      : "Select from available professional services"}
                  </p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-soft text-brand shrink-0">
                  {totalCount}{" "}
                  {totalCount === 1 ? "service" : "services"}
                </span>
              </div>

              {/* Optional Quick Filter (if catalog has more than 6 services) */}
              {totalCount > 6 && (
                <div className="mb-3">
                  <div className="relative">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      placeholder="Filter services..."
                      className="h-9 w-full rounded-lg border border-line bg-background pl-8 pr-3 text-xs text-foreground placeholder:text-muted/60 outline-none transition-colors focus:border-brand"
                    />
                    <svg
                      className="size-3.5 text-muted absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    {searchFilter && (
                      <button
                        type="button"
                        onClick={() => setSearchFilter("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-foreground text-xs"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Scrollable Services Area */}
              <div className="max-h-[22rem] overflow-y-auto pr-1">
                {filteredServices.length === 0 ? (
                  <div className="py-8 text-center text-xs text-muted">
                    No services match &ldquo;{searchFilter}&rdquo;.
                  </div>
                ) : showCategoryGroups ? (
                  Array.from(groupedServices.entries()).map(([catSlug, servicesInCat]) => {
                    const catName = categoriesMap.get(catSlug) || catSlug.replace(/-/g, " ");
                    return (
                      <div key={catSlug} className="mb-4 last:mb-1">
                        <div className="flex items-center gap-1.5 mb-2">
                          <span className="size-1.5 rounded-full bg-brand" />
                          <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted">
                            {catName}
                          </h4>
                        </div>
                        <div className={`grid ${gridColsClass} gap-2`}>
                          {servicesInCat.map((service) => (
                            <ServiceCard
                              key={service.slug}
                              service={service}
                              isSelected={selectedService?.slug === service.slug}
                              hasImage={Boolean(service.image && !imageErrors[service.slug])}
                              onSelect={handleSelectService}
                              onImageError={handleImageError}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div>
                    {totalCount > 3 && (
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2 flex items-center gap-1.5">
                        <span className="size-1.5 rounded-full bg-brand" />
                        Available Services
                      </h4>
                    )}
                    <div className={`grid ${gridColsClass} gap-2`}>
                      {filteredServices.map((service) => (
                        <ServiceCard
                          key={service.slug}
                          service={service}
                          isSelected={selectedService?.slug === service.slug}
                          hasImage={Boolean(service.image && !imageErrors[service.slug])}
                          onSelect={handleSelectService}
                          onImageError={handleImageError}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Directory Link */}
              <div className="pt-2.5 mt-2.5 border-t border-line flex items-center justify-between text-xs text-muted">
                <span>Cannot find your service?</span>
                <Link
                  href="/services#all-services"
                  onClick={() => setIsOpen(false)}
                  className="font-semibold text-brand hover:underline"
                >
                  Browse all services &rarr;
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Search / Submit Button */}
        <button
          type="submit"
          className="h-13 rounded-xl bg-brand px-7 text-base font-semibold text-white shadow-button transition-all duration-150 hover:bg-brand-hover active:scale-[0.99] cursor-pointer"
        >
          Search
        </button>
      </div>
    </form>
  );
}
