import { cities } from "@/data/homepage";
import {
  serviceCatalog,
  type DirectoryService,
  type ServiceCategorySlug,
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

function mapWordPressCategory(
  categorySlug?: string,
): ServiceCategorySlug {
  switch (categorySlug) {
    case "cleaning":
      return "cleaning";

    case "appliance-repair":
      return "appliance-repair";

    case "personal-care":
      return "personal-care";

    case "pest-control":
      return "pest-control";

    case "solar-services":
      return "solar-services";

    case "home-inspection":
      return "home-inspection";

    case "ac-services":
    case "plumbing":
    case "electrical":
    case "carpentry":
    case "painting":
    case "home-maintenance":
    default:
      return "home-maintenance";
  }
}

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
      existingService?.category ??
      mapWordPressCategory(service.category?.slug),

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