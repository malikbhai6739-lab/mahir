/**
 * Lightweight client-side helper for persisting the customer's selected city
 * across the booking funnel.
 *
 * NOTE: WordPress API remains authoritative. This storage is purely a UX convenience
 * to pre-fill the city selector for customers who selected a city on the homepage
 * or in the services directory.
 */

export const MAHIR_SELECTED_CITY_KEY = "mahir_selected_city_v1";

export type StoredCity = {
  slug: string;
  name: string;
};

export function getStoredCity(): StoredCity | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(MAHIR_SELECTED_CITY_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<StoredCity>;
    if (
      parsed &&
      typeof parsed.slug === "string" &&
      parsed.slug.trim() &&
      typeof parsed.name === "string" &&
      parsed.name.trim()
    ) {
      return {
        slug: parsed.slug.trim().toLowerCase(),
        name: parsed.name.trim(),
      };
    }

    return null;
  } catch {
    return null;
  }
}

export function setStoredCity(slug: string, name: string): void {
  if (typeof window === "undefined" || !slug || !name) {
    return;
  }

  try {
    const payload: StoredCity = {
      slug: slug.trim().toLowerCase(),
      name: name.trim(),
    };
    window.localStorage.setItem(MAHIR_SELECTED_CITY_KEY, JSON.stringify(payload));
  } catch {
    // Gracefully ignore storage quota errors
  }
}

export function clearStoredCity(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(MAHIR_SELECTED_CITY_KEY);
  } catch {
    // Gracefully ignore storage errors
  }
}
