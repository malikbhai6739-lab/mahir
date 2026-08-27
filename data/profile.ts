import type { Address } from "@/components/booking/types";

export type CustomerProfile = {
  fullName: string;
  phone: string;
  email: string;
  city: string;
};

export const mockCustomerProfile: CustomerProfile = {
  fullName: "Ayesha Khan",
  phone: "0300 1234567",
  email: "ayesha.khan@example.com",
  city: "Lahore",
};

export const mockSavedAddresses: Address[] = [
  { id: "home", label: "Home", address: "24-B Main Boulevard", area: "Gulberg III", fullAddress: "24-B Main Boulevard, Gulberg III", city: "Lahore", landmark: "Near Main Market", isDefault: true },
  { id: "office", label: "Office", address: "8th Floor, Blue Area Business Centre", area: "Blue Area", fullAddress: "8th Floor, Blue Area Business Centre, Blue Area", city: "Islamabad", isDefault: false },
  { id: "other", label: "Other", address: "17 Street 12", area: "F-7/2", fullAddress: "17 Street 12, F-7/2", city: "Islamabad", landmark: "Opposite the park", isDefault: false },
];
