export type OrderStatus = "confirmed" | "assigned" | "on-the-way" | "in-progress" | "completed" | "cancelled";
export type OrderTab = "upcoming" | "completed" | "cancelled";

export type OrderProfessional = {
  name: string;
  rating: number;
  category: string;
  id: string;
};

export type OrderTimelineItem = {
  label: string;
  completed: boolean;
  current?: boolean;
};

export type Order = {
  id: string;
  bookingId: string;
  serviceTitle: string;
  serviceSlug: string;
  serviceImage: string;
  quantity: number;
  status: OrderStatus;
  date: string;
  time: string;
  address: string;
  city: string;
  subtotal: number;
  discount: number;
  serviceFee: number;
  total: number;
  professional?: OrderProfessional;
  timeline: OrderTimelineItem[];
  createdAt: string;
};

export const mockOrders: readonly Order[] = [
  {
    id: "order-00124",
    bookingId: "MHR-2026-00124",
    serviceTitle: "AC General Service",
    serviceSlug: "ac-general-service",
    serviceImage: "/images/mahir-technician.png",
    quantity: 1,
    status: "assigned",
    date: "Aug 29, 2026",
    time: "09:00 AM - 11:00 AM",
    address: "24-B Main Boulevard, Gulberg III",
    city: "Lahore",
    subtotal: 2250,
    discount: 750,
    serviceFee: 0,
    total: 1500,
    professional: { name: "Usman Raza", rating: 4.9, category: "AC Specialist", id: "MH-4821" },
    timeline: [
      { label: "Booking Confirmed", completed: true },
      { label: "Professional Assigned", completed: true, current: true },
      { label: "Professional On the Way", completed: false },
      { label: "Service Started", completed: false },
      { label: "Completed", completed: false },
    ],
    createdAt: "Aug 26, 2026",
  },
  {
    id: "order-00118",
    bookingId: "MHR-2026-00118",
    serviceTitle: "Deep Home Cleaning",
    serviceSlug: "deep-home-cleaning",
    serviceImage: "/images/mahir-technician.png",
    quantity: 1,
    status: "completed",
    date: "Aug 18, 2026",
    time: "02:00 PM - 04:00 PM",
    address: "10-C Clifton Block 2",
    city: "Karachi",
    subtotal: 5500,
    discount: 500,
    serviceFee: 0,
    total: 5000,
    professional: { name: "Sana Ahmed", rating: 4.8, category: "Cleaning Professional", id: "MH-3910" },
    timeline: [
      { label: "Booking Confirmed", completed: true },
      { label: "Professional Assigned", completed: true },
      { label: "Professional On the Way", completed: true },
      { label: "Service Started", completed: true },
      { label: "Completed", completed: true },
    ],
    createdAt: "Aug 15, 2026",
  },
  {
    id: "order-00097",
    bookingId: "MHR-2026-00097",
    serviceTitle: "Plumbing",
    serviceSlug: "plumbing",
    serviceImage: "/images/mahir-technician.png",
    quantity: 1,
    status: "cancelled",
    date: "Aug 10, 2026",
    time: "11:00 AM - 01:00 PM",
    address: "22 F-8 Markaz",
    city: "Islamabad",
    subtotal: 800,
    discount: 0,
    serviceFee: 0,
    total: 800,
    timeline: [],
    createdAt: "Aug 9, 2026",
  },
];

export function getOrderTab(status: OrderStatus): OrderTab {
  if (status === "completed") return "completed";
  if (status === "cancelled") return "cancelled";
  return "upcoming";
}

export function getOrderStatusLabel(status: OrderStatus) {
  return { confirmed: "Confirmed", assigned: "Professional Assigned", "on-the-way": "On the Way", "in-progress": "In Progress", completed: "Completed", cancelled: "Cancelled" }[status];
}

export function getOrderById(id: string) {
  return mockOrders.find((order) => order.id === id || order.bookingId === id);
}
