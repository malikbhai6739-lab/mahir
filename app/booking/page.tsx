"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AddressStep } from "@/components/booking/address-step";
import { BookingProgress } from "@/components/booking/booking-progress";
import { ConfirmationStep } from "@/components/booking/confirmation-step";
import { ReviewStep } from "@/components/booking/review-step";
import { ScheduleStep } from "@/components/booking/schedule-step";
import type { Address, BookingSnapshot, CustomerDetails, Schedule } from "@/components/booking/types";
import { useCart } from "@/components/cart/cart-context";
import { useOrders } from "@/components/orders/order-context";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { fetchServiceSlots, type BookingSlot } from "@/lib/mahir-api";

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

const initialCustomer: CustomerDetails = {
  fullName: "",
  phone: "",
  address: "",
  area: "",
  city: "",
  landmark: "",
};

function format24to12(timeStr: string): string {
  const [hStr, mStr] = timeStr.split(":");
  const h = parseInt(hStr, 10);
  if (isNaN(h)) return timeStr;
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${String(h12).padStart(2, "0")}:${mStr} ${period}`;
}

function formatSlotDisplay(slot: BookingSlot): string {
  return `${format24to12(slot.startTime)} - ${format24to12(slot.endTime)}`;
}

function getAvailableBookingDates(): Schedule[] {
  const dates: Schedule[] = [];
  const today = new Date();

  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const isoDate = `${year}-${month}-${day}`;

    let dateLabel: string;
    if (i === 0) {
      dateLabel = "Today";
    } else if (i === 1) {
      dateLabel = "Tomorrow";
    } else {
      dateLabel = d.toLocaleDateString("en-US", { weekday: "short" });
    }

    const dateValue = d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    dates.push({
      dateLabel,
      dateValue,
      isoDate,
      slot: "",
    });
  }

  return dates;
}

export default function BookingPage() {
  const { items, subtotal, discount, estimatedTotal, hydrated } = useCart();
  const { addOrder } = useOrders();
  const [step, setStep] = useState(1);
  const [selectedAddressId, setSelectedAddressId] = useState("home");
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [customer, setCustomer] = useState<CustomerDetails>(initialCustomer);
  const [booking, setBooking] = useState<BookingSnapshot | null>(null);

  const availableDates = useMemo(() => getAvailableBookingDates(), []);

  const [schedule, setSchedule] = useState<Schedule>(() =>
    availableDates[0]
      ? { ...availableDates[0], slot: "" }
      : { dateLabel: "", dateValue: "", slot: "" },
  );

  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);

  const selectedAddress =
    savedAddresses.find((address) => address.id === selectedAddressId) ??
    savedAddresses[0];

  const activeAddress: Address = showNewAddress
    ? {
        id: "new-address",
        label: "New address",
        fullAddress: `${customer.address}, ${customer.area}`,
        city: customer.city,
        landmark: customer.landmark,
      }
    : selectedAddress;

  const serviceSlug = items[0]?.slug ?? "";
  const citySlug = activeAddress.city
    ? activeAddress.city.toLowerCase().trim().replace(/\s+/g, "-")
    : "";
  const selectedIsoDate = schedule.isoDate ?? "";

  useEffect(() => {
    let isMounted = true;

    if (!serviceSlug || !citySlug || !selectedIsoDate) {
      return;
    }

    const loadSlots = async () => {
      setLoadingSlots(true);
      setSlotsError(null);

      try {
        const response = await fetchServiceSlots(
          serviceSlug,
          selectedIsoDate,
          citySlug,
        );
        if (!isMounted) return;
        const availableSlotsList = response.slots
          .filter((slot) => slot.available)
          .map((slot) => formatSlotDisplay(slot));

        setSlots(availableSlotsList);
      } catch (error) {
        if (!isMounted) return;
        setSlots([]);
        setSlotsError(
          error instanceof Error
            ? error.message
            : "Unable to load time slots. Please try again.",
        );
      } finally {
        if (isMounted) {
          setLoadingSlots(false);
        }
      }
    };

    void loadSlots();

    return () => {
      isMounted = false;
    };
  }, [serviceSlug, citySlug, selectedIsoDate]);

  const handleCustomerChange = (
    field: keyof CustomerDetails,
    value: string,
  ) => {
    setCustomer((current) => ({ ...current, [field]: value }));
    if (field === "city") {
      setSchedule((current) => ({ ...current, slot: "" }));
    }
  };

  const handleSelectAddress = (id: string) => {
    setSelectedAddressId(id);
    setShowNewAddress(false);
    setSchedule((current) => ({ ...current, slot: "" }));
    const address = savedAddresses.find((item) => item.id === id);
    if (address) {
      setCustomer((current) => ({
        ...current,
        address: address.fullAddress,
        city: address.city,
      }));
    }
  };

  const handleDateChange = (date: Schedule) => {
    setSchedule({
      dateLabel: date.dateLabel,
      dateValue: date.dateValue,
      isoDate: date.isoDate,
      slot: "",
    });
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
    const bookingId = "MHR-2026-00125";
    const snapshot = {
      bookingId,
      items,
      address: activeAddress,
      schedule,
      customer,
      estimatedTotal,
    };
    addOrder({
      id: `order-${bookingId.toLowerCase()}`,
      bookingId,
      serviceTitle: items.map((item) => item.title).join(", "),
      serviceSlug: items[0].slug,
      serviceImage: items[0].image,
      quantity: items.reduce((sum, item) => sum + item.quantity, 0),
      status: "confirmed",
      date: `${schedule.dateLabel}, ${schedule.dateValue}`,
      time: schedule.slot,
      address: activeAddress.fullAddress,
      city: activeAddress.city,
      subtotal,
      discount,
      serviceFee: 0,
      total: estimatedTotal,
      timeline: [
        { label: "Booking Confirmed", completed: true, current: true },
        { label: "Professional Assigned", completed: false },
        { label: "Professional On the Way", completed: false },
        { label: "Service Started", completed: false },
        { label: "Completed", completed: false },
      ],
      createdAt: new Date().toLocaleDateString("en-PK", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    });
    setBooking(snapshot);
    setStep(4);
  };

  if (!hydrated) {
    return (
      <>
        <SiteHeader />
        <main className="bg-background pb-24">
          <div className="site-container py-14 sm:py-16">
            <div className="mx-auto max-w-xl rounded-[1.75rem] border border-line bg-white p-8 text-center shadow-card sm:p-10">
              <h1 className="text-3xl font-bold text-foreground">
                Loading your booking
              </h1>
            </div>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  if (!items.length) {
    return (
      <>
        <SiteHeader />
        <main className="bg-background pb-24">
          <div className="site-container py-14 sm:py-16">
            <div className="mx-auto max-w-xl rounded-[1.75rem] border border-line bg-white p-8 text-center shadow-card sm:p-10">
              <span
                aria-hidden="true"
                className="mx-auto grid size-16 place-items-center rounded-2xl bg-brand-soft text-3xl font-black text-brand"
              >
                +
              </span>
              <h1 className="mt-6 text-3xl font-bold text-foreground">
                Your booking starts with a service
              </h1>
              <p className="mt-4 text-base leading-7 text-muted">
                Add a service to your cart before choosing a date and address.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/services"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-6 text-base font-semibold text-white transition-colors hover:bg-brand-dark"
                >
                  Browse Services
                </Link>
                <Link
                  href="/cart"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-line bg-white px-6 text-base font-semibold text-foreground transition-colors hover:border-brand hover:text-brand"
                >
                  View Cart
                </Link>
              </div>
            </div>
          </div>
        </main>
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
              {step === 1 ? (
                <AddressStep
                  addresses={savedAddresses}
                  selectedAddressId={selectedAddressId}
                  customer={customer}
                  showNewAddress={showNewAddress}
                  onSelectAddress={handleSelectAddress}
                  onToggleNewAddress={() =>
                    setShowNewAddress((current) => !current)
                  }
                  onCustomerChange={handleCustomerChange}
                  onContinue={continueFromAddress}
                />
              ) : null}
              {step === 2 ? (
                <ScheduleStep
                  schedule={schedule}
                  dates={availableDates}
                  slots={slots}
                  loadingSlots={loadingSlots}
                  slotsError={slotsError}
                  onDateChange={handleDateChange}
                  onSlotChange={(slot) =>
                    setSchedule((current) => ({ ...current, slot }))
                  }
                  onBack={() => setStep(1)}
                  onContinue={continueFromSchedule}
                />
              ) : null}
              {step === 3 ? (
                <ReviewStep
                  items={items}
                  address={activeAddress}
                  schedule={schedule}
                  customer={customer}
                  subtotal={subtotal}
                  discount={discount}
                  estimatedTotal={estimatedTotal}
                  onBack={() => setStep(2)}
                  onConfirm={confirmBooking}
                />
              ) : null}
              {step === 4 && booking ? (
                <ConfirmationStep booking={booking} />
              ) : null}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
