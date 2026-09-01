import { cities } from "@/data/homepage";
import {
  serviceCatalog,
  type DirectoryService,
} from "@/data/services";

const MAHIR_API_URL =
  process.env.MAHIR_API_URL ??
  "https://dev-mahir1.pantheonsite.io/wp-json/mahir/v1";

type WordPressService = {
  id: number;
  slug: string;
  name: string;
  description: string;
  excerpt: string;
  image: string | null;
  starting_price: number | null;
  duration: string | null;
  availability: string | null;
  included_items: string[];
  excluded_items: string[];
  notes: string[];
  currency: string;
  category: {
    id: number;
    name: string;
    slug: string;
  } | null;
};

export type WordPressCategory = {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
  parent: number;
};

type ServicesApiResponse = {
  success: boolean;
  data: WordPressService[];
};

type CategoriesApiResponse = {
  success: boolean;
  data: WordPressCategory[];
};

function getServiceCode(name: string) {
  const words = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!words.length) {
    return "MS";
  }

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return `${words[0][0]}${words[1][0]}`.toUpperCase();
}

function mapWordPressService(
  service: WordPressService,
): DirectoryService {
  const existingService = serviceCatalog.find(
    (item) => item.slug === service.slug,
  );

  return {
    slug: service.slug,

    name: service.name,

    category:
      service.category?.slug ??
      existingService?.category ??
      "uncategorized",

    image:
      service.image ??
      existingService?.image ??
      "/services/ac-services.jpg",

    description:
      service.description ||
      service.excerpt ||
      existingService?.description ||
      "",

    startingPrice:
      service.starting_price ??
      existingService?.startingPrice,

    duration:
      service.duration ??
      existingService?.duration,

    availability:
      service.availability ??
      existingService?.availability,

    includedItems:
      service.included_items?.length
        ? service.included_items
        : existingService?.includedItems,

    excludedItems:
      service.excluded_items?.length
        ? service.excluded_items
        : existingService?.excludedItems,

    notes:
      service.notes?.length
        ? service.notes
        : existingService?.notes,

    rating:
      existingService?.rating ?? 0,

    reviewCount:
      existingService?.reviewCount ?? 0,

    code:
      existingService?.code ??
      getServiceCode(service.name),

    tone:
      existingService?.tone ?? "blue",

    availableCities:
      existingService?.availableCities ?? cities,

    keywords:
      existingService?.keywords ?? [
        service.name,
        service.description,
        service.category?.name ?? "",
      ],
  };
}

export async function getWordPressServices(): Promise<
  DirectoryService[]
> {
  try {
    const cacheBuster = Date.now();

    const response = await fetch(
      `${MAHIR_API_URL}/services?_=${cacheBuster}`,
      {
        cache: "no-store",
        headers: {
          "Cache-Control":
            "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `Mahir services API returned ${response.status}`,
      );
    }

    const result =
      (await response.json()) as ServicesApiResponse;

    if (
      !result.success ||
      !Array.isArray(result.data)
    ) {
      throw new Error(
        "Invalid Mahir services API response",
      );
    }

    return result.data.map(
      mapWordPressService,
    );
  } catch (error) {
    console.error(
      "Unable to load WordPress services:",
      error,
    );

    return [...serviceCatalog];
  }
}

export async function getWordPressCategories(): Promise<
  WordPressCategory[]
> {
  try {
    const cacheBuster = Date.now();

    const response = await fetch(
      `${MAHIR_API_URL}/categories?_=${cacheBuster}`,
      {
        cache: "no-store",
        headers: {
          "Cache-Control":
            "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `Mahir categories API returned ${response.status}`,
      );
    }

    const result =
      (await response.json()) as CategoriesApiResponse;

    if (
      !result.success ||
      !Array.isArray(result.data)
    ) {
      throw new Error(
        "Invalid Mahir categories API response",
      );
    }

    return result.data;
  } catch (error) {
    console.error(
      "Unable to load WordPress categories:",
      error,
    );

    return [];
  }
}
