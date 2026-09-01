import { cities, type ServiceTone } from "@/data/homepage";

export type ServiceCity = (typeof cities)[number];

export type ServiceCategorySlug =
  | "home-maintenance"
  | "cleaning"
  | "appliance-repair"
  | "personal-care"
  | "pest-control"
  | "solar-services"
  | "home-inspection";

export type ServiceCategory = {
  slug: ServiceCategorySlug;
  name: string;
  description: string;
  code: string;
  tone: ServiceTone;
};

export type DirectoryService = {
  slug: string;
  name: string;
  category: string;
  image: string;
  description: string;
  startingPrice?: number;
  duration?: string;
  availability?: string;
  includedItems?: readonly string[];
  excludedItems?: readonly string[];
  notes?: readonly string[];
  faqs?: readonly ServiceFaq[];
  rating: number;
  reviewCount: number;
  code: string;
  tone: ServiceTone;
  availableCities: readonly ServiceCity[];
  keywords: readonly string[];
};

export type ServiceFilters = {
  query: string;
  category: string;
  city: ServiceCity | "";
};

export const serviceCategories: readonly ServiceCategory[] = [
  {
    slug: "home-maintenance",
    name: "Home Maintenance",
    description: "Everyday repairs, fixtures, and home upkeep.",
    code: "HM",
    tone: "blue",
  },
  {
    slug: "cleaning",
    name: "Cleaning",
    description: "Focused cleaning for rooms, surfaces, and furnishings.",
    code: "CL",
    tone: "green",
  },
  {
    slug: "appliance-repair",
    name: "Appliance Repair",
    description: "Diagnosis and repair support for household appliances.",
    code: "AR",
    tone: "violet",
  },
  {
    slug: "personal-care",
    name: "Personal Care",
    description: "Convenient grooming and salon services at home.",
    code: "PC",
    tone: "rose",
  },
  {
    slug: "pest-control",
    name: "Pest Control",
    description: "Targeted treatment options for common household pests.",
    code: "PT",
    tone: "orange",
  },
  {
    slug: "solar-services",
    name: "Solar Services",
    description: "Cleaning, inspection, and upkeep for home solar systems.",
    code: "SO",
    tone: "amber",
  },
  {
    slug: "home-inspection",
    name: "Home Inspection",
    description: "Practical checks to help identify visible home issues.",
    code: "HI",
    tone: "slate",
  },
];

const allCities = cities;

const majorCities = [
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Karachi",
] as const satisfies readonly ServiceCity[];

const inspectionCities = [
  ...majorCities,
  "Faisalabad",
] as const satisfies readonly ServiceCity[];

const serviceDirectoryCatalog: readonly Omit<DirectoryService, "image">[] = [
  {
    slug: "ac-services",
    name: "AC Services",
    category: "home-maintenance",
    description: "Repair, installation, and routine AC maintenance.",
    startingPrice: 1500,
    rating: 4.9,
    reviewCount: 428,
    code: "AC",
    tone: "blue",
    availableCities: allCities,
    keywords: ["air conditioner", "AC repair", "cooling", "installation", "tune-up"],
  },
  {
    slug: "plumbing",
    name: "Plumbing",
    category: "home-maintenance",
    description: "Help with leaks, fittings, drains, and water lines.",
    startingPrice: 800,
    rating: 4.8,
    reviewCount: 367,
    code: "PL",
    tone: "cyan",
    availableCities: allCities,
    keywords: ["plumber", "leak", "tap", "pipe", "drain", "sink", "toilet"],
  },
  {
    slug: "electrical",
    name: "Electrical",
    category: "home-maintenance",
    description: "Repairs and checks for switches, fixtures, fans, and wiring.",
    startingPrice: 800,
    rating: 4.8,
    reviewCount: 312,
    code: "EL",
    tone: "amber",
    availableCities: allCities,
    keywords: ["electrician", "wiring", "switch", "socket", "fan", "breaker", "light"],
  },
  {
    slug: "carpentry",
    name: "Carpentry",
    category: "home-maintenance",
    description: "Furniture, cabinet, door, and minor woodwork repairs.",
    startingPrice: 1200,
    rating: 4.7,
    reviewCount: 184,
    code: "CP",
    tone: "orange",
    availableCities: allCities,
    keywords: ["carpenter", "furniture", "cabinet", "door", "wood", "shelf"],
  },
  {
    slug: "painting",
    name: "Painting",
    category: "home-maintenance",
    description: "Interior and exterior painting for rooms and touch-ups.",
    startingPrice: 4500,
    rating: 4.7,
    reviewCount: 143,
    code: "PA",
    tone: "slate",
    availableCities: allCities,
    keywords: ["painter", "wall paint", "room", "touch-up", "interior", "exterior"],
  },
  {
    slug: "minor-home-repairs",
    name: "Minor Home Repairs",
    category: "home-maintenance",
    description: "Small mounting, fitting, and general household repair jobs.",
    startingPrice: 1000,
    rating: 4.6,
    reviewCount: 97,
    code: "HR",
    tone: "blue",
    availableCities: allCities,
    keywords: ["handyman", "drilling", "mounting", "curtain rod", "shelf", "fixture"],
  },
  {
    slug: "cleaning",
    name: "Cleaning",
    category: "cleaning",
    description: "Flexible home cleaning for everyday and one-time needs.",
    startingPrice: 2500,
    rating: 4.8,
    reviewCount: 391,
    code: "CL",
    tone: "green",
    availableCities: allCities,
    keywords: ["cleaner", "home cleaning", "housekeeping", "room cleaning"],
  },
  {
    slug: "deep-home-cleaning",
    name: "Deep Home Cleaning",
    category: "cleaning",
    description: "Detailed cleaning across commonly used rooms and surfaces.",
    startingPrice: 5500,
    rating: 4.9,
    reviewCount: 244,
    code: "DC",
    tone: "green",
    availableCities: allCities,
    keywords: ["deep clean", "full home", "move-in cleaning", "spring cleaning"],
  },
  {
    slug: "sofa-carpet-cleaning",
    name: "Sofa & Carpet Cleaning",
    category: "cleaning",
    description: "Focused cleaning for fabric sofas, rugs, and carpets.",
    startingPrice: 1800,
    rating: 4.8,
    reviewCount: 208,
    code: "SC",
    tone: "cyan",
    availableCities: allCities,
    keywords: ["sofa", "couch", "carpet", "rug", "upholstery", "fabric cleaning"],
  },
  {
    slug: "kitchen-bathroom-cleaning",
    name: "Kitchen & Bathroom Cleaning",
    category: "cleaning",
    description: "Thorough cleaning for high-use kitchen and bathroom areas.",
    startingPrice: 3000,
    rating: 4.7,
    reviewCount: 176,
    code: "KB",
    tone: "green",
    availableCities: allCities,
    keywords: ["kitchen", "bathroom", "washroom", "grease", "tiles", "sanitation"],
  },
  {
    slug: "water-tank-cleaning",
    name: "Water Tank Cleaning",
    category: "cleaning",
    description: "Scheduled cleaning for accessible household water tanks.",
    startingPrice: 2500,
    rating: 4.8,
    reviewCount: 112,
    code: "WT",
    tone: "cyan",
    availableCities: allCities,
    keywords: ["tank cleaning", "water storage", "overhead tank", "underground tank"],
  },
  {
    slug: "home-appliances-repair",
    name: "Home Appliances Repair",
    category: "appliance-repair",
    description: "General diagnosis and repair support for household appliances.",
    startingPrice: 1000,
    rating: 4.7,
    reviewCount: 286,
    code: "HA",
    tone: "violet",
    availableCities: allCities,
    keywords: ["appliance", "technician", "appliance repair", "diagnosis"],
  },
  {
    slug: "refrigerator-repair",
    name: "Refrigerator Repair",
    category: "appliance-repair",
    description: "Diagnosis for cooling, noise, and common refrigerator issues.",
    startingPrice: 1200,
    rating: 4.8,
    reviewCount: 221,
    code: "RF",
    tone: "violet",
    availableCities: allCities,
    keywords: ["fridge", "freezer", "refrigerator", "cooling", "compressor"],
  },
  {
    slug: "washing-machine-repair",
    name: "Washing Machine Repair",
    category: "appliance-repair",
    description: "Help with drainage, spinning, vibration, and power issues.",
    startingPrice: 1200,
    rating: 4.8,
    reviewCount: 205,
    code: "WM",
    tone: "violet",
    availableCities: allCities,
    keywords: ["washer", "washing machine", "spin", "drain", "motor"],
  },
  {
    slug: "microwave-oven-repair",
    name: "Microwave & Oven Repair",
    category: "appliance-repair",
    description: "Diagnosis for common heating and operating problems.",
    startingPrice: 1000,
    rating: 4.7,
    reviewCount: 139,
    code: "MO",
    tone: "violet",
    availableCities: allCities,
    keywords: ["microwave", "oven", "heating", "kitchen appliance"],
  },
  {
    slug: "geyser-repair",
    name: "Geyser Repair",
    category: "appliance-repair",
    description: "Inspection and repair support for common geyser faults.",
    startingPrice: 1200,
    rating: 4.7,
    reviewCount: 121,
    code: "GY",
    tone: "orange",
    availableCities: allCities,
    keywords: ["geyser", "water heater", "hot water", "thermostat"],
  },
  {
    slug: "salon-at-home",
    name: "Salon at Home",
    category: "personal-care",
    description: "Book selected salon and grooming services at home.",
    startingPrice: 2500,
    rating: 4.8,
    reviewCount: 198,
    code: "SA",
    tone: "rose",
    availableCities: majorCities,
    keywords: ["salon", "beauty", "facial", "manicure", "pedicure", "waxing"],
  },
  {
    slug: "mens-grooming-at-home",
    name: "Men’s Grooming at Home",
    category: "personal-care",
    description: "At-home haircut, beard, and basic grooming options.",
    startingPrice: 1800,
    rating: 4.7,
    reviewCount: 126,
    code: "MG",
    tone: "slate",
    availableCities: majorCities,
    keywords: ["haircut", "barber", "beard", "men grooming"],
  },
  {
    slug: "makeup-styling",
    name: "Makeup & Styling",
    category: "personal-care",
    description: "Occasion-ready makeup and basic hair styling at home.",
    startingPrice: 4000,
    rating: 4.8,
    reviewCount: 104,
    code: "MS",
    tone: "rose",
    availableCities: majorCities,
    keywords: ["makeup artist", "party makeup", "hair styling", "event"],
  },
  {
    slug: "hair-skincare",
    name: "Hair & Skincare",
    category: "personal-care",
    description: "Selected hair-care and skincare service packages.",
    startingPrice: 2200,
    rating: 4.7,
    reviewCount: 92,
    code: "HS",
    tone: "rose",
    availableCities: majorCities,
    keywords: ["hair care", "skincare", "facial", "treatment", "beauty"],
  },
  {
    slug: "pest-control",
    name: "Pest Control",
    category: "pest-control",
    description: "General assessment and treatment for common household pests.",
    startingPrice: 3000,
    rating: 4.8,
    reviewCount: 274,
    code: "PT",
    tone: "rose",
    availableCities: allCities,
    keywords: ["exterminator", "insects", "pest treatment", "fumigation"],
  },
  {
    slug: "termite-control",
    name: "Termite Control",
    category: "pest-control",
    description: "Inspection and treatment options for suspected termite activity.",
    startingPrice: 5000,
    rating: 4.8,
    reviewCount: 153,
    code: "TC",
    tone: "orange",
    availableCities: allCities,
    keywords: ["termite", "deemak", "wood pest", "termite treatment"],
  },
  {
    slug: "cockroach-ant-treatment",
    name: "Cockroach & Ant Treatment",
    category: "pest-control",
    description: "Targeted treatment for common crawling insects.",
    startingPrice: 2800,
    rating: 4.7,
    reviewCount: 189,
    code: "CA",
    tone: "orange",
    availableCities: allCities,
    keywords: ["cockroach", "roach", "ant", "insects", "kitchen pest"],
  },
  {
    slug: "bed-bug-treatment",
    name: "Bed Bug Treatment",
    category: "pest-control",
    description: "Assessment and treatment planning for bed bug activity.",
    startingPrice: 4500,
    rating: 4.7,
    reviewCount: 128,
    code: "BB",
    tone: "rose",
    availableCities: allCities,
    keywords: ["bed bug", "mattress pest", "bedroom treatment"],
  },
  {
    slug: "rodent-control",
    name: "Rodent Control",
    category: "pest-control",
    description: "Inspection and control measures for rats and mice.",
    startingPrice: 3000,
    rating: 4.6,
    reviewCount: 103,
    code: "RC",
    tone: "slate",
    availableCities: allCities,
    keywords: ["rat", "mouse", "mice", "rodent", "traps"],
  },
  {
    slug: "solar-panel-cleaning",
    name: "Solar Panel Cleaning",
    category: "solar-services",
    description: "Surface cleaning for accessible residential solar panels.",
    startingPrice: 2500,
    rating: 4.8,
    reviewCount: 161,
    code: "SP",
    tone: "amber",
    availableCities: allCities,
    keywords: ["solar cleaning", "panel wash", "dust", "energy"],
  },
  {
    slug: "solar-system-inspection",
    name: "Solar System Inspection",
    category: "solar-services",
    description: "Visual and operational checks for home solar equipment.",
    startingPrice: 3000,
    rating: 4.8,
    reviewCount: 122,
    code: "SI",
    tone: "amber",
    availableCities: allCities,
    keywords: ["solar inspection", "panels", "wiring", "inverter", "system check"],
  },
  {
    slug: "inverter-troubleshooting",
    name: "Inverter Troubleshooting",
    category: "solar-services",
    description: "Diagnosis for common inverter alerts and operating issues.",
    startingPrice: 2000,
    rating: 4.7,
    reviewCount: 108,
    code: "IT",
    tone: "blue",
    availableCities: allCities,
    keywords: ["inverter", "fault", "error", "solar power", "battery"],
  },
  {
    slug: "solar-preventive-maintenance",
    name: "Solar Preventive Maintenance",
    category: "solar-services",
    description: "Routine checks and cleaning for residential solar systems.",
    startingPrice: 4500,
    rating: 4.8,
    reviewCount: 89,
    code: "SM",
    tone: "green",
    availableCities: allCities,
    keywords: ["solar maintenance", "preventive", "panels", "inverter", "inspection"],
  },
  {
    slug: "home-inspection",
    name: "Home Inspection",
    category: "home-inspection",
    description: "A practical overview of visible systems and condition concerns.",
    startingPrice: 7000,
    rating: 4.8,
    reviewCount: 96,
    code: "HI",
    tone: "slate",
    availableCities: inspectionCities,
    keywords: ["property inspection", "house check", "condition report"],
  },
  {
    slug: "move-in-home-inspection",
    name: "Move-In Home Inspection",
    category: "home-inspection",
    description: "Pre-move checks for visible defects and maintenance needs.",
    startingPrice: 8000,
    rating: 4.8,
    reviewCount: 78,
    code: "MI",
    tone: "slate",
    availableCities: inspectionCities,
    keywords: ["move in", "rent", "buyer", "property check", "house inspection"],
  },
  {
    slug: "electrical-safety-inspection",
    name: "Electrical Safety Inspection",
    category: "home-inspection",
    description: "Checks for visible electrical risks and common problem areas.",
    startingPrice: 2500,
    rating: 4.7,
    reviewCount: 113,
    code: "ES",
    tone: "amber",
    availableCities: allCities,
    keywords: ["wiring check", "electrical safety", "switchboard", "breaker"],
  },
  {
    slug: "plumbing-moisture-inspection",
    name: "Plumbing & Moisture Inspection",
    category: "home-inspection",
    description: "Checks for visible leaks, drainage issues, and moisture signs.",
    startingPrice: 3000,
    rating: 4.7,
    reviewCount: 91,
    code: "PM",
    tone: "cyan",
    availableCities: allCities,
    keywords: ["leak inspection", "seepage", "damp", "plumbing check", "moisture"],
  },
  {
    slug: "handover-snagging-inspection",
    name: "Handover & Snagging Inspection",
    category: "home-inspection",
    description: "A room-by-room review of visible finishing and fixture issues.",
    startingPrice: 10000,
    rating: 4.8,
    reviewCount: 64,
    code: "SN",
    tone: "slate",
    availableCities: majorCities,
    keywords: ["snagging", "handover", "new home", "defects", "finishing"],
  },
];

const serviceImages: Record<string, string> = {
  "ac-services": "/services/ac-services.jpg",
  plumbing: "/services/plumbing.jpg",
  electrical: "/services/electrical.jpg",
  carpentry: "/services/carpentry.jpg",
  painting: "/services/painting.jpg",
  "minor-home-repairs": "/services/carpentry.jpg",
  cleaning: "/services/cleaning.jpg",
  "deep-home-cleaning": "/services/cleaning.jpg",
  "sofa-carpet-cleaning": "/services/cleaning.jpg",
  "kitchen-bathroom-cleaning": "/services/cleaning.jpg",
  "water-tank-cleaning": "/services/plumbing.jpg",
  "home-appliances-repair": "/services/appliance-repair.jpg",
  "refrigerator-repair": "/services/appliance-repair.jpg",
  "washing-machine-repair": "/services/appliance-repair.jpg",
  "microwave-oven-repair": "/services/appliance-repair.jpg",
  "geyser-repair": "/services/appliance-repair.jpg",
  "salon-at-home": "/services/personal-care.jpg",
  "mens-grooming-at-home": "/services/personal-care.jpg",
  "makeup-styling": "/services/personal-care.jpg",
  "hair-skincare": "/services/personal-care.jpg",
  "pest-control": "/services/pest-control.jpg",
  "termite-control": "/services/pest-control.jpg",
  "cockroach-ant-treatment": "/services/pest-control.jpg",
  "bed-bug-treatment": "/services/pest-control.jpg",
  "rodent-control": "/services/pest-control.jpg",
  "solar-panel-cleaning": "/services/solar.jpg",
  "solar-system-inspection": "/services/solar.jpg",
  "inverter-troubleshooting": "/services/solar.jpg",
  "solar-preventive-maintenance": "/services/solar.jpg",
  "home-inspection": "/services/inspection.jpg",
  "move-in-home-inspection": "/services/inspection.jpg",
  "electrical-safety-inspection": "/services/electrical.jpg",
  "plumbing-moisture-inspection": "/services/plumbing.jpg",
  "handover-snagging-inspection": "/services/inspection.jpg",
};

export const serviceCatalog: readonly DirectoryService[] = serviceDirectoryCatalog.map(
  (service) => ({
    ...service,
    image: serviceImages[service.slug] ?? "/services/inspection.jpg",
  } satisfies DirectoryService),
);

export const popularServiceSlugs = [
  "ac-services",
  "plumbing",
  "electrical",
  "cleaning",
  "home-appliances-repair",
  "carpentry",
  "painting",
  "pest-control",
] as const;

export const popularServices = popularServiceSlugs.flatMap((slug) => {
  const service = serviceCatalog.find((item) => item.slug === slug);
  return service ? [service] : [];
});

export type ServiceReview = {
  name: string;
  city: string;
  rating: number;
  date: string;
  text: string;
};

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceDetail = {
  slug: string;
  title: string;
  category: string;
  image: string;
  description: string;
  rating: number;
  reviewCount: number;
  completedOrders: number;
  currentPrice: number;
  originalPrice?: number;
  duration: string;
  availability: string;
  includedItems: readonly string[];
  excludedItems: readonly string[];
  notes: readonly string[];
  faqs: readonly ServiceFaq[];
  reviews: readonly ServiceReview[];
};

export const serviceDetailCatalog: readonly ServiceDetail[] = [
  {
    slug: "ac-general-service",
    title: "AC General Service",
    category: "home-maintenance",
    image: "/images/mahir-technician.png",
    description:
      "A focused AC service for cleaning, inspection, and performance checks to keep your cooling system efficient and reliable.",
    rating: 4.9,
    reviewCount: 428,
    completedOrders: 1840,
    currentPrice: 2250,
    originalPrice: 3000,
    duration: "Approx. 90 minutes",
    availability: "Available in Lahore, Islamabad, Rawalpindi, Karachi, Faisalabad, Multan",
    includedItems: [
      "AC filter cleaning",
      "Cooling coil cleaning",
      "Outdoor unit inspection",
      "Basic performance check",
      "Drainage check",
    ],
    excludedItems: [
      "Replacement parts",
      "Gas refill unless selected separately",
      "Major repair work",
      "Electrical wiring replacement",
    ],
    notes: [
      "Approximate duration may vary depending on unit size and condition.",
      "Professionals arrive with the standard tools needed for inspection and cleaning.",
      "Parts and material charges are extra and should be approved before work begins.",
      "Final additional charges are confirmed before the technician starts repairs.",
    ],
    faqs: [
      {
        question: "What does AC General Service include?",
        answer:
          "This service includes an inspection of the indoor and outdoor unit, filter cleaning, coil cleaning, drainage review, and a practical performance check to make sure the unit is cooling properly.",
      },
      {
        question: "How long does the service take?",
        answer:
          "Most AC general service visits take around 60 to 90 minutes depending on the unit type, number of units, and level of buildup.",
      },
      {
        question: "Are parts included in the price?",
        answer:
          "The standard cleaning and inspection service price does not include replacement parts, gas refill, or major repair work. Any additional material or parts will be discussed before proceeding.",
      },
      {
        question: "Can I book for the same day?",
        answer:
          "Same-day slots are often available in major service areas depending on technician availability and the nature of the request. You can check the next available slot during booking.",
      },
      {
        question: "What happens if additional repair is required?",
        answer:
          "If the technician identifies a deeper issue during the inspection, they will explain the required additional work and pricing before proceeding with any extra repair or material requirement.",
      },
    ],
    reviews: [
      {
        name: "Ayesha",
        city: "Lahore",
        rating: 5,
        date: "May 2025",
        text: "The technician arrived on time and explained the AC cleaning process clearly. The cooling improved the same day.",
      },
      {
        name: "Usman",
        city: "Islamabad",
        rating: 4,
        date: "Apr 2025",
        text: "Very professional and organised. They checked the outdoor unit and gave honest advice about a small issue before it got worse.",
      },
      {
        name: "Sana",
        city: "Karachi",
        rating: 5,
        date: "Mar 2025",
        text: "Clear pricing and a neat service. The filter and coils were cleaned thoroughly and the AC ran noticeably better.",
      },
      {
        name: "Bilal",
        city: "Rawalpindi",
        rating: 4,
        date: "Feb 2025",
        text: "The team was punctual, professional, and transparent about what was and was not included in the visit.",
      },
    ],
  },
  {
    slug: "ac-installation",
    title: "AC Installation",
    category: "home-maintenance",
    image: "/images/mahir-technician.png",
    description:
      "Professional AC installation and setup for new or replacement units with safe placement and basic testing.",
    rating: 4.8,
    reviewCount: 196,
    completedOrders: 720,
    currentPrice: 4200,
    originalPrice: 5200,
    duration: "Approx. 2-3 hours",
    availability: "Available in Lahore, Islamabad, Karachi, Faisalabad",
    includedItems: [
      "Unit placement guidance",
      "Basic installation setup",
      "Connection check",
      "Power-on testing",
    ],
    excludedItems: [
      "Additional copper piping",
      "Electrical upgrades",
      "Wall bracket or masonry work",
      "Disposal of old unit",
    ],
    notes: [
      "Site conditions and installation complexity may affect service duration.",
      "Standards tools and setup checks are included in the service visit.",
      "Any extra materials or structural work require customer approval.",
    ],
    faqs: [
      {
        question: "Does AC installation include testing?",
        answer:
          "Yes. The technician completes a basic power-on check and confirms the AC is running as expected before leaving the site.",
      },
      {
        question: "Are extra materials covered?",
        answer:
          "Standard installation is included, but additional materials such as piping, fittings, or wiring may be quoted separately before work begins.",
      },
    ],
    reviews: [
      {
        name: "Hassan",
        city: "Islamabad",
        rating: 5,
        date: "Jun 2025",
        text: "The installer was efficient and careful with the placement. The unit runs perfectly after setup.",
      },
      {
        name: "Nadia",
        city: "Karachi",
        rating: 4,
        date: "May 2025",
        text: "Good communication and neat workmanship. They explained the setup process in detail before starting.",
      },
    ],
  },
  {
    slug: "ac-repair",
    title: "AC Repair",
    category: "home-maintenance",
    image: "/images/mahir-technician.png",
    description:
      "Targeted repair support for common AC issues including poor cooling, noise, and basic electrical faults.",
    rating: 4.7,
    reviewCount: 242,
    completedOrders: 910,
    currentPrice: 3100,
    originalPrice: 4200,
    duration: "Approx. 60-120 minutes",
    availability: "Available in Lahore, Islamabad, Rawalpindi, Multan",
    includedItems: [
      "Diagnosis of the reported issue",
      "Basic troubleshooting",
      "Repair of common AC faults",
      "Operational check after repair",
    ],
    excludedItems: [
      "Replacement parts",
      "Compressor replacement",
      "Major electrical rewiring",
      "Gas leak repair without additional quote",
    ],
    notes: [
      "Repair needs can vary based on the make, model, and condition of the unit.",
      "The technician will explain the issue and recommended next steps before major additional work begins.",
      "Additional parts or difficult repairs may require a follow-up visit or separate approval.",
    ],
    faqs: [
      {
        question: "Will you diagnose the problem before quoting extra work?",
        answer:
          "Yes. The technician inspects the AC, explains the likely cause, and outlines any additional repair or material requirement before proceeding.",
      },
      {
        question: "Does the repair include a final test?",
        answer:
          "Yes. A basic operational test is included after the repair to confirm the unit is cooling correctly.",
      },
    ],
    reviews: [
      {
        name: "Ibrahim",
        city: "Rawalpindi",
        rating: 5,
        date: "Jun 2025",
        text: "The issue was fixed quickly and clearly explained. The AC is cooling properly again.",
      },
      {
        name: "Mehwish",
        city: "Lahore",
        rating: 4,
        date: "Apr 2025",
        text: "The technician found the cause and explained why the issue was happening. Very helpful and polite.",
      },
    ],
  },
  {
    slug: "ac-gas-refill",
    title: "AC Gas Refill",
    category: "home-maintenance",
    image: "/images/mahir-technician.png",
    description:
      "Gas top-up and pressure check for AC units that require additional refrigerant to operate efficiently.",
    rating: 4.6,
    reviewCount: 143,
    completedOrders: 480,
    currentPrice: 5200,
    originalPrice: 6500,
    duration: "Approx. 60-90 minutes",
    availability: "Available in Lahore, Karachi, Islamabad, Faisalabad",
    includedItems: [
      "Leak check guidance",
      "Gas pressure assessment",
      "Refrigerant top-up",
      "System performance check",
    ],
    excludedItems: [
      "Leak repair work",
      "Compressor replacement",
      "Electrical repair work",
      "Additional gas beyond the quoted amount",
    ],
    notes: [
      "A gas refill may be needed only after a proper check confirms pressure is low.",
      "If a leak is detected, additional repair work may be required before the AC performs consistently.",
      "Any extra materials or follow-up work must be approved before proceeding.",
    ],
    faqs: [
      {
        question: "Do you check for leaks before refilling gas?",
        answer:
          "Yes. A proper pressure and leak check is important before adding refrigerant to avoid repeating the same issue.",
      },
      {
        question: "Is gas included in the quoted price?",
        answer:
          "The price covers the standard refill service, but the actual gas quantity and any additional repair work may be quoted separately based on the unit condition.",
      },
    ],
    reviews: [
      {
        name: "Zoya",
        city: "Faisalabad",
        rating: 4,
        date: "Mar 2025",
        text: "The technician explained that a refill alone would not solve the issue if there was a leak. Helpful and clear.",
      },
    ],
  },
  {
    slug: "ac-removal",
    title: "AC Removal",
    category: "home-maintenance",
    image: "/images/mahir-technician.png",
    description:
      "Safe removal and disconnection of an AC unit for relocation, replacement, or property work with care for the installation area.",
    rating: 4.5,
    reviewCount: 82,
    completedOrders: 310,
    currentPrice: 2600,
    originalPrice: 3300,
    duration: "Approx. 45-75 minutes",
    availability: "Available in Lahore, Islamabad, Karachi, Rawalpindi",
    includedItems: [
      "Disconnection and safe removal",
      "Basic cleanup around the unit area",
      "Transfer guidance",
      "Inspection before removal",
    ],
    excludedItems: [
      "Reinstallation work",
      "Structural wall work",
      "Electrical rewiring",
      "Disposal of bulky materials beyond the service scope",
    ],
    notes: [
      "Service time varies based on unit condition, access, and indoor or outdoor positioning.",
      "The technician will assess the site before starting and explain any extra requirements.",
      "Any additional work beyond removal must be approved before proceeding.",
    ],
    faqs: [
      {
        question: "Does AC removal include cleanup?",
        answer:
          "A basic cleanup is included, but additional masonry or wall-fixing work is not part of the standard removal service.",
      },
      {
        question: "Can the unit be reinstalled afterwards?",
        answer:
          "Reinstallation is a separate service and can be quoted when needed after the removal is complete.",
      },
    ],
    reviews: [
      {
        name: "Omer",
        city: "Karachi",
        rating: 4,
        date: "Feb 2025",
        text: "The team handled the removal carefully and left the area tidy after the job.",
      },
    ],
  },
];

export function isServiceCategorySlug(
  value: string,
): value is ServiceCategorySlug {
  return serviceCategories.some((category) => category.slug === value);
}

export function isServiceCity(value: string): value is ServiceCity {
  return cities.some((city) => city === value);
}

export function filterServices({
  query,
  category,
  city,
}: ServiceFilters): DirectoryService[] {
  const normalizedQuery = query.trim().toLocaleLowerCase("en");

  return serviceCatalog.filter((service) => {
    if (category && service.category !== category) return false;
    if (city && !service.availableCities.includes(city)) return false;
    if (!normalizedQuery) return true;

    const categoryName = serviceCategories.find(
      (item) => item.slug === service.category,
    )?.name;
    const searchText = [
      service.name,
      service.description,
      categoryName,
      ...service.keywords,
    ]
      .join(" ")
      .toLocaleLowerCase("en");

    return searchText.includes(normalizedQuery);
  });
}
