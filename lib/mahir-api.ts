import { cities } from "@/data/homepage";
import {
  serviceCatalog,
  type DirectoryService,
  type ServicePricing,
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
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  cities: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  pricing?: {
    type: string;
    starting_price: number | null;
    min_price: number | null;
    max_price: number | null;
    inspection_fee: number | null;
    note: string;
  };
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

export type WordPressCity = {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
};

type CitiesApiResponse = {
  success: boolean;
  data: WordPressCity[];
};

const staticCities: WordPressCity[] = cities.map(
  (name, index) => ({
    id: index + 1,
    name,
    slug: name.toLocaleLowerCase("en").replace(/\s+/g, "-"),
    description: "",
    count: 0,
  }),
);

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

function normalizePrice(value: unknown) {
  if (
    typeof value !== "number" ||
    !Number.isFinite(value) ||
    value < 0
  ) {
    return null;
  }

  return value;
}

function mapServicePricing(
  pricing: WordPressService["pricing"],
): ServicePricing | undefined {
  if (!pricing) {
    return undefined;
  }

  if (
    ![
      "fixed",
      "starting_from",
      "inspection_required",
    ].includes(pricing.type)
  ) {
    return undefined;
  }

  const type = pricing.type;

  return {
    type: type as ServicePricing["type"],
    startingPrice: normalizePrice(pricing.starting_price),
    minPrice: normalizePrice(pricing.min_price),
    maxPrice: normalizePrice(pricing.max_price),
    inspectionFee: normalizePrice(pricing.inspection_fee),
    note:
      typeof pricing.note === "string"
        ? pricing.note.trim()
        : "",
  };
}

function mapWordPressService(
  service: WordPressService,
): DirectoryService {
  const existingService = serviceCatalog.find(
    (item) => item.slug === service.slug,
  );

  const validFaqs = service.faqs
    ?.filter(
      (faq) =>
        faq.question.trim() !== "" &&
        faq.answer.trim() !== "",
    )
    .map((faq) => ({
      question: faq.question.trim(),
      answer: faq.answer.trim(),
    }));

  const mappedCities = service.cities
    ?.filter(
      (city) =>
        city.name.trim() !== "" &&
        city.slug.trim() !== "",
    )
    .map((city) => ({
      slug: city.slug.trim(),
      name: city.name.trim(),
    }));

  const pricing = mapServicePricing(service.pricing);

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

    faqs:
      validFaqs?.length
        ? validFaqs
        : existingService?.faqs,

    hasStructuredCities: Boolean(mappedCities?.length),

    pricing,

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
      mappedCities?.length
        ? mappedCities
        : existingService?.availableCities ??
          staticCities.map(({ slug, name }) => ({
            slug,
            name,
          })),

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

export async function getWordPressCities(): Promise<
  WordPressCity[]
> {
  try {
    const cacheBuster = Date.now();

    const response = await fetch(
      `${MAHIR_API_URL}/cities?_=${cacheBuster}`,
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
        `Mahir cities API returned ${response.status}`,
      );
    }

    const result =
      (await response.json()) as CitiesApiResponse;

    if (
      !result.success ||
      !Array.isArray(result.data)
    ) {
      throw new Error(
        "Invalid Mahir cities API response",
      );
    }

    return result.data.length
      ? result.data
      : staticCities;
  } catch (error) {
    console.error(
      "Unable to load WordPress cities:",
      error,
    );

    return staticCities;
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

export type BookingSlot = {
  startTime: string;
  endTime: string;
  available: boolean;
};

export type ServiceSlotsResponse = {
  service: {
    id: number;
    slug: string;
    name: string;
  };
  city: {
    id: number;
    slug: string;
    name: string;
  };
  date: string;
  timezone: string;
  slotDurationMinutes: number;
  slots: BookingSlot[];
};

type WordPressSlotsApiResponse = {
  success?: boolean;
  code?: string;
  message?: string;
  data?: {
    service?: { id: number; slug: string; name: string };
    city?: { id: number; slug: string; name: string };
    date?: string;
    timezone?: string;
    slot_duration_minutes?: number;
    slots?: Array<{
      start_time: string;
      end_time: string;
      available: boolean;
    }>;
  };
};

export async function fetchServiceSlots(
  serviceSlug: string,
  date: string,
  citySlug: string,
): Promise<ServiceSlotsResponse> {
  const cacheBuster = Date.now();
  const params = new URLSearchParams({
    service: serviceSlug,
    date,
    city: citySlug,
    _: String(cacheBuster),
  });

  const response = await fetch(`${MAHIR_API_URL}/slots?${params.toString()}`, {
    cache: "no-store",
  });

  const result = (await response.json()) as WordPressSlotsApiResponse;

  if (!response.ok || !result.success || !result.data) {
    const errorMessage =
      result.message || `Unable to fetch time slots (${response.status})`;
    throw new Error(errorMessage);
  }

  const { service, city, timezone, slot_duration_minutes, slots } = result.data;

  if (!service || !city || !Array.isArray(slots)) {
    throw new Error("Invalid slots data received from API.");
  }

  return {
    service: {
      id: service.id,
      slug: service.slug,
      name: service.name,
    },
    city: {
      id: city.id,
      slug: city.slug,
      name: city.name,
    },
    date: result.data.date || date,
    timezone: timezone || "Asia/Karachi",
    slotDurationMinutes: slot_duration_minutes ?? 60,
    slots: slots.map((slot) => ({
      startTime: slot.start_time,
      endTime: slot.end_time,
      available: Boolean(slot.available),
    })),
  };
}

export type CreateBookingInput = {
  service: string;
  city: string;
  date: string;
  slotStart: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
  address: {
    line: string;
    city: string;
    notes?: string;
  };
};

export type CreatedBooking = {
  id: number;
  bookingNumber: string;
  status: "confirmed";
  service: {
    id: number;
    slug: string;
    name: string;
  };
  city: {
    id: number;
    slug: string;
    name: string;
  };
  date: string;
  slot: {
    startTime: string;
    endTime: string;
  };
  customer: {
    name: string;
    phone: string;
    email: string | null;
  };
  address: {
    line: string;
    city: string;
    notes: string | null;
  };
  pricing: {
    type: string;
    startingPrice: number | null;
    quotedPrice: number | null;
    currency: string;
  };
  createdAt: string;
};

type WordPressBookingApiResponse = {
  success?: boolean;
  code?: string;
  message?: string;
  data?: {
    id: number;
    booking_number: string;
    status: "confirmed";
    service: { id: number; slug: string; name: string };
    city: { id: number; slug: string; name: string };
    date: string;
    slot: { start_time: string; end_time: string };
    customer: { name: string; phone: string; email: string | null };
    address: { line: string; city: string; notes: string | null };
    pricing: {
      type: string;
      starting_price: number | null;
      quoted_price: number | null;
      currency: string;
    };
    created_at: string;
  };
};

export class MahirApiError extends Error {
  readonly status: number;
  readonly code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "MahirApiError";
    this.status = status;
    this.code = code;
  }
}

export async function createBooking(
  input: CreateBookingInput,
): Promise<CreatedBooking> {
  const customer = {
    name: input.customer.name,
    phone: input.customer.phone,
    ...(input.customer.email ? { email: input.customer.email } : {}),
  };
  const address = {
    line: input.address.line,
    city: input.address.city,
    ...(input.address.notes ? { notes: input.address.notes } : {}),
  };

  const response = await fetch(`${MAHIR_API_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      service: input.service,
      city: input.city,
      date: input.date,
      slot_start: input.slotStart,
      customer,
      address,
    }),
  });

  let result: WordPressBookingApiResponse | null = null;

  try {
    result = (await response.json()) as WordPressBookingApiResponse;
  } catch {
    throw new MahirApiError(
      `Unable to create booking (${response.status}).`,
      response.status,
    );
  }

  if (!response.ok) {
    throw new MahirApiError(
      result.message || `Unable to create booking (${response.status}).`,
      response.status,
      result.code,
    );
  }

  const booking = result.data;

  if (
    !result.success ||
    !booking ||
    typeof booking.id !== "number" ||
    !booking.booking_number ||
    booking.status !== "confirmed" ||
    !booking.service?.slug ||
    !booking.city?.slug ||
    !booking.date ||
    !booking.slot?.start_time ||
    !booking.slot?.end_time ||
    !booking.customer?.name ||
    !booking.address?.line ||
    !booking.pricing ||
    typeof booking.pricing.type !== "string" ||
    !booking.pricing.type.trim() ||
    (booking.pricing.starting_price !== null &&
      (typeof booking.pricing.starting_price !== "number" ||
        !Number.isFinite(booking.pricing.starting_price))) ||
    (booking.pricing.quoted_price !== null &&
      (typeof booking.pricing.quoted_price !== "number" ||
        !Number.isFinite(booking.pricing.quoted_price))) ||
    typeof booking.pricing.currency !== "string" ||
    !booking.pricing.currency.trim() ||
    !booking.created_at
  ) {
    throw new MahirApiError(
      "Invalid booking data received from API.",
      response.status,
    );
  }

  return {
    id: booking.id,
    bookingNumber: booking.booking_number,
    status: booking.status,
    service: booking.service,
    city: booking.city,
    date: booking.date,
    slot: {
      startTime: booking.slot.start_time,
      endTime: booking.slot.end_time,
    },
    customer: booking.customer,
    address: booking.address,
    pricing: {
      type: booking.pricing.type,
      startingPrice: booking.pricing.starting_price,
      quotedPrice: booking.pricing.quoted_price,
      currency: booking.pricing.currency,
    },
    createdAt: booking.created_at,
  };
}
