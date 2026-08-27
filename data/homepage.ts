export type NavigationItem = {
  label: string;
  href: string;
};

export const navigationItems: NavigationItem[] = [
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Cities", href: "/#city-search" },
  { label: "For Business", href: "/#business" },
  { label: "Become a Mahir", href: "/#become-mahir" },
  { label: "Help", href: "/#faq" },
];

export const mobileNavigationItems: NavigationItem[] = [
  ...navigationItems,
  { label: "Login", href: "/login" },
  { label: "About Us", href: "/#why-mahir" },
];

export const cities = [
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Karachi",
  "Faisalabad",
  "Multan",
] as const;

export const trustIndicators = [
  "Verified Professionals",
  "Transparent Pricing",
  "On-Time Service",
  "Service Guarantee",
];

export type ServiceTone =
  | "blue"
  | "cyan"
  | "amber"
  | "green"
  | "violet"
  | "orange"
  | "rose"
  | "slate";

export type Service = {
  title: string;
  description: string;
  code: string;
  tone: ServiceTone;
};

export const popularServices: Service[] = [
  {
    title: "AC Services",
    description: "Repair, installation & maintenance",
    code: "AC",
    tone: "blue",
  },
  {
    title: "Plumbing",
    description: "Leaks, fittings & water systems",
    code: "PL",
    tone: "cyan",
  },
  {
    title: "Electrical",
    description: "Repairs, fixtures & inspections",
    code: "EL",
    tone: "amber",
  },
  {
    title: "Cleaning",
    description: "Deep cleaning for every room",
    code: "CL",
    tone: "green",
  },
  {
    title: "Home Appliances",
    description: "Diagnosis and dependable repairs",
    code: "HA",
    tone: "violet",
  },
  {
    title: "Carpentry",
    description: "Furniture, doors & custom fixes",
    code: "CP",
    tone: "orange",
  },
  {
    title: "Pest Control",
    description: "Targeted, home-safe treatments",
    code: "PC",
    tone: "rose",
  },
  {
    title: "Painting",
    description: "Fresh finishes, inside and out",
    code: "PT",
    tone: "slate",
  },
];

export const benefits = [
  {
    number: "01",
    title: "Trusted Experts",
    description:
      "Every professional is verified before they can accept a Mahir job.",
  },
  {
    number: "02",
    title: "Easy Booking",
    description:
      "Choose a service and a convenient time in just a few simple steps.",
  },
  {
    number: "03",
    title: "Transparent Pricing",
    description:
      "Clear service information helps you know what to expect before work begins.",
  },
  {
    number: "04",
    title: "Service Guarantee",
    description:
      "Our support stays with you until the booked service is properly completed.",
  },
];

export const bookingSteps = [
  {
    number: "01",
    title: "Choose a Service",
    description: "Tell us what your home needs.",
  },
  {
    number: "02",
    title: "Select Date & Time",
    description: "Pick a slot that fits your day.",
  },
  {
    number: "03",
    title: "Expert Arrives",
    description: "A verified Mahir comes prepared.",
  },
  {
    number: "04",
    title: "Service Completed",
    description: "Review the work with confidence.",
  },
];

export const testimonials = [
  {
    quote:
      "The AC technician arrived within the promised slot, explained the issue clearly, and left the room spotless.",
    name: "Ayesha Khan",
    city: "Lahore",
    service: "AC Service",
    initials: "AK",
  },
  {
    quote:
      "Booking an electrician for my parents was simple. The updates were clear and the work felt genuinely professional.",
    name: "Hamza Siddiqui",
    city: "Islamabad",
    service: "Electrical",
    initials: "HS",
  },
  {
    quote:
      "The cleaning team was punctual, careful with our furniture, and thorough in the details that usually get missed.",
    name: "Sana Raza",
    city: "Karachi",
    service: "Deep Cleaning",
    initials: "SR",
  },
];

export const maintenanceVisits = [
  { month: "Mar", service: "AC tune-up", status: "Scheduled" },
  { month: "Jun", service: "Plumbing check", status: "Planned" },
  { month: "Sep", service: "Electrical inspection", status: "Planned" },
];

export const homeCareGuides = [
  {
    category: "Cooling",
    title: "How often should you service your AC in Pakistan?",
    description:
      "A practical schedule for better cooling, lower energy use, and fewer mid-summer breakdowns.",
    readTime: "5 min read",
    code: "01",
    tone: "blue",
  },
  {
    category: "Home Safety",
    title: "Signs your home wiring needs an inspection",
    description:
      "Know which flickers, smells, and switchboard issues should never be ignored.",
    readTime: "6 min read",
    code: "02",
    tone: "amber",
  },
  {
    category: "Seasonal Care",
    title: "Your monsoon-ready home maintenance checklist",
    description:
      "Simple checks for drains, walls, wiring, and outdoor areas before the rain arrives.",
    readTime: "7 min read",
    code: "03",
    tone: "green",
  },
];

export const faqs = [
  {
    question: "How do I book a home service with Mahir?",
    answer:
      "Choose your city and service, select a convenient appointment slot, and confirm your request. Mahir then keeps the visit details together so you know what to expect.",
  },
  {
    question: "How are Mahir professionals verified?",
    answer:
      "Mahir's service model is built around identity and skill verification before a professional can take customer bookings.",
  },
  {
    question: "Will I know the price before the service starts?",
    answer:
      "Service details and expected pricing are shared before work begins. If the professional discovers additional work, it should be explained and approved first.",
  },
  {
    question: "What happens if I need help after a service?",
    answer:
      "Mahir support can review the booking and help resolve service concerns under the applicable service guarantee.",
  },
  {
    question: "Which cities does Mahir serve?",
    answer:
      "Current city options include Lahore, Islamabad, Rawalpindi, Karachi, Faisalabad, and Multan. Availability can vary by service and area.",
  },
  {
    question: "Can businesses schedule recurring maintenance?",
    answer:
      "Yes. The Mahir for Business experience is designed for recurring and on-demand maintenance across offices, retail locations, and managed properties.",
  },
];

export const footerGroups = [
  {
    title: "Services",
    links: [
      { label: "AC Services", href: "/services?q=AC+Services#all-services" },
      { label: "Plumbing", href: "/services?q=Plumbing#all-services" },
      { label: "Electrical", href: "/services?q=Electrical#all-services" },
      { label: "Cleaning", href: "/services?category=cleaning#all-services" },
      { label: "All Services", href: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Mahir", href: "/#why-mahir" },
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Mahir for Business", href: "/#business" },
      { label: "Become a Mahir", href: "/#become-mahir" },
      { label: "Home Care Guides", href: "/#guides" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Centre", href: "/#faq" },
      { label: "Service Guarantee", href: "/#why-mahir" },
      { label: "Safety", href: "/#why-mahir" },
      { label: "Contact Us", href: "#footer" },
    ],
  },
  {
    title: "Cities",
    links: cities.slice(0, 5).map((city) => ({
      label: city,
      href: "/#city-search",
    })),
  },
] as const;
