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
};

export type BookingSnapshot = {
  bookingId?: string;
  items: CartLineItem[];
  address: Address;
  schedule: Schedule;
  customer: CustomerDetails;
  estimatedTotal: number;
};
