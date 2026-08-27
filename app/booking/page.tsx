"use client";

import Link from "next/link";
import { useState } from "react";
import { AddressStep } from "@/components/booking/address-step";
import { BookingProgress } from "@/components/booking/booking-progress";
import { ConfirmationStep } from "@/components/booking/confirmation-step";
import { ReviewStep } from "@/components/booking/review-step";
import { ScheduleStep } from "@/components/booking/schedule-step";
import type { Address, BookingSnapshot, CustomerDetails, Schedule } from "@/components/booking/types";
import { useCart } from "@/components/cart/cart-context";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

const savedAddresses: Address[] = [
  {
    id: "home",
    label: "Home",
    fullAddress: "24-B Main Boulevard, Gulberg III",
    city: "Lahore",
  },
  {
    id: "office",
    label: "Office",
    fullAddress: "8th Floor, Blue Area Business Centre",
    city: "Islamabad",
  },
];

const availableDates: Schedule[] = [
  { dateLabel: "Today", dateValue: "Aug 27", slot: "" },
  { dateLabel: "Tomorrow", dateValue: "Aug 28", slot: "" },
  { dateLabel: "Friday", dateValue: "Aug 29", slot: "" },
  { dateLabel: "Saturday", dateValue: "Aug 30", slot: "" },
  { dateLabel: "Sunday", dateValue: "Aug 31", slot: "" },
];

const availableSlots = [
  "09:00 AM - 11:00 AM",
  "11:00 AM - 01:00 PM",
  "02:00 PM - 04:00 PM",
  "04:00 PM - 06:00 PM",
];

const initialCustomer: CustomerDetails = {
  fullName: "",
  phone: "",
  address: "",
  area: "",
  city: "",
  landmark: "",
};

export default function BookingPage() {
  const { items, subtotal, discount, estimatedTotal, hydrated } = useCart();
  const [step, setStep] = useState(1);
  const [selectedAddressId, setSelectedAddressId] = useState("home");
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [customer, setCustomer] = useState<CustomerDetails>(initialCustomer);
  const [schedule, setSchedule] = useState<Schedule>({ dateLabel: "", dateValue: "", slot: "" });
  const [booking, setBooking] = useState<BookingSnapshot | null>(null);

  const selectedAddress = savedAddresses.find((address) => address.id === selectedAddressId) ?? savedAddresses[0];
  const activeAddress: Address = showNewAddress
    ? {
        id: "new-address",
        label: "New address",
        fullAddress: `${customer.address}, ${customer.area}`,
        city: customer.city,
        landmark: customer.landmark,
      }
    : selectedAddress;

  const handleCustomerChange = (field: keyof CustomerDetails, value: string) => {
    setCustomer((current) => ({ ...current, [field]: value }));
  };

  const handleSelectAddress = (id: string) => {
    setSelectedAddressId(id);
    setShowNewAddress(false);
    const address = savedAddresses.find((item) => item.id === id);
    if (address) {
      setCustomer((current) => ({
        ...current,
        address: address.fullAddress,
        city: address.city,
      }));
    }
  };

  const continueFromAddress = () => {
    if (!showNewAddress) {
      setCustomer((current) => ({
        ...current,
        address: activeAddress.fullAddress,
        city: activeAddress.city,
        fullName: current.fullName || "Mahir customer",
        phone: current.phone || "0300 0000000",
      }));
    }
    setStep(2);
  };

  const continueFromSchedule = () => setStep(3);

  const confirmBooking = () => {
    setBooking({ items, address: activeAddress, schedule, customer, estimatedTotal });
    setStep(4);
  };

  if (!hydrated) {
    return (
      <>
        <SiteHeader />
        <main className="bg-background pb-24"><div className="site-container py-14 sm:py-16"><div className="mx-auto max-w-xl rounded-[1.75rem] border border-line bg-white p-8 text-center shadow-card sm:p-10"><h1 className="text-3xl font-bold text-foreground">Loading your booking</h1></div></div></main>
        <SiteFooter />
      </>
    );
  }

  if (!items.length) {
    return (
      <>
        <SiteHeader />
        <main className="bg-background pb-24"><div className="site-container py-14 sm:py-16"><div className="mx-auto max-w-xl rounded-[1.75rem] border border-line bg-white p-8 text-center shadow-card sm:p-10"><span aria-hidden="true" className="mx-auto grid size-16 place-items-center rounded-2xl bg-brand-soft text-3xl font-black text-brand">+</span><h1 className="mt-6 text-3xl font-bold text-foreground">Your booking starts with a service</h1><p className="mt-4 text-base leading-7 text-muted">Add a service to your cart before choosing a date and address.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"><Link href="/services" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-6 text-base font-semibold text-white transition-colors hover:bg-brand-dark">Browse Services</Link><Link href="/cart" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-line bg-white px-6 text-base font-semibold text-foreground transition-colors hover:border-brand hover:text-brand">View Cart</Link></div></div></div></main>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      <main className="bg-background pb-24">
        <div className="site-container py-8 sm:py-12">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-[1.5rem] border border-line bg-white p-5 shadow-card sm:p-7">
              <BookingProgress currentStep={step} />
            </div>

            <div className="mt-8">
              {step === 1 ? <AddressStep addresses={savedAddresses} selectedAddressId={selectedAddressId} customer={customer} showNewAddress={showNewAddress} onSelectAddress={handleSelectAddress} onToggleNewAddress={() => setShowNewAddress((current) => !current)} onCustomerChange={handleCustomerChange} onContinue={continueFromAddress} /> : null}
              {step === 2 ? <ScheduleStep schedule={schedule} dates={availableDates} slots={availableSlots} onDateChange={(date) => setSchedule((current) => ({ ...current, dateLabel: date.dateLabel, dateValue: date.dateValue }))} onSlotChange={(slot) => setSchedule((current) => ({ ...current, slot }))} onBack={() => setStep(1)} onContinue={continueFromSchedule} /> : null}
              {step === 3 ? <ReviewStep items={items} address={activeAddress} schedule={schedule} customer={customer} subtotal={subtotal} discount={discount} estimatedTotal={estimatedTotal} onBack={() => setStep(2)} onConfirm={confirmBooking} /> : null}
              {step === 4 && booking ? <ConfirmationStep booking={booking} /> : null}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
