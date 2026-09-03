import type { CartLineItem } from "@/components/cart/cart-context";

export type Address = {
  id: string;
  label: string;
  fullAddress: string;
  address?: string;
  area?: string;
  city: string;
  landmark?: string;
  isDefault?: boolean;
};

export type CustomerDetails = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  area: string;
  city: string;
  landmark: string;
};

export type Schedule = {
  dateLabel: string;
  dateValue: string;
  isoDate?: string;
  slot: string;
  slotStart?: string;
  slotEnd?: string;
};

export type BookingSnapshot = {
  id: number;
  bookingId: string;
  status: "confirmed";
  items: CartLineItem[];
  address: Address;
  schedule: Schedule;
  customer: CustomerDetails;
  estimatedTotal: number;
};
