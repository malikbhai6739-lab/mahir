"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { AddressStep } from "@/components/booking/address-step";
import { BookingProgress } from "@/components/booking/booking-progress";
import { ConfirmationStep } from "@/components/booking/confirmation-step";
import { ReviewStep } from "@/components/booking/review-step";
import { ScheduleStep } from "@/components/booking/schedule-step";
import type { Address, BookingSnapshot, CustomerDetails, Schedule } from "@/components/booking/types";
import { useCart } from "@/components/cart/cart-context";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PhoneVerificationModal } from "@/components/booking/phone-verification-modal";
import { getStoredCity, setStoredCity } from "@/lib/city-storage";
import {
  clearAuthToken,
  createBooking,
  fetchAddresses,
  fetchCurrentCustomer,
  fetchServiceSlots,
  getAuthToken,
  getWordPressCities,
  MahirApiError,
  type AuthCustomer,
  type BookingSlot,
  type MahirAddress,
  type WordPressCity,
} from "@/lib/mahir-api";

// Empty initial customer state - NEVER use mock dummy identity in live bookings
const initialCustomer: CustomerDetails = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  area: "",
  city: "",
  landmark: "",
};

function mapSavedAddress(address: MahirAddress): Address {
  const area = address.area?.trim() || "";

  return {
    id: String(address.id),
    label: address.label?.trim() || "Saved address",
    address: address.address_line,
    area: area || undefined,
    fullAddress: [address.address_line, area].filter(Boolean).join(", "),
    city: address.city,
    landmark: address.notes ?? undefined,
    isDefault: address.is_default,
  };
}

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
  const router = useRouter();
  const { items, subtotal, discount, estimatedTotal, hydrated, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [availableCities, setAvailableCities] = useState<WordPressCity[]>([]);
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [savedAddressesLoading, setSavedAddressesLoading] = useState(true);
  const [savedAddressesError, setSavedAddressesError] = useState<string | null>(null);
  const [savedAddressesReload, setSavedAddressesReload] = useState(0);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [showNewAddress, setShowNewAddress] = useState(true);
  const [customer, setCustomer] = useState<CustomerDetails>(initialCustomer);
  const [authCustomer, setAuthCustomer] = useState<AuthCustomer | null>(null);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [booking, setBooking] = useState<BookingSnapshot | null>(null);

  const availableDates = useMemo(() => getAvailableBookingDates(), []);

  const [schedule, setSchedule] = useState<Schedule>(() =>
    availableDates[0]
      ? { ...availableDates[0], slot: "" }
      : { dateLabel: "", dateValue: "", slot: "" },
  );

  const [slots, setSlots] = useState<BookingSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const submissionInFlight = useRef(false);

  // Load canonical backend cities and pre-fill stored city if available
  useEffect(() => {
    let isMounted = true;
    getWordPressCities()
      .then((cities) => {
        if (!isMounted) return;
        setAvailableCities(cities);

        const stored = getStoredCity();
        if (stored) {
          const matched = cities.find(
            (c) =>
              c.slug === stored.slug ||
              c.name.toLowerCase() === stored.name.toLowerCase(),
          );
          if (matched) {
            setCustomer((prev) => ({
              ...prev,
              city: prev.city || matched.name,
            }));
          }
        }
      })
      .catch(() => {
        // Handled gracefully with fallback
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const selectedAddress =
    savedAddresses.find((address) => address.id === selectedAddressId) ??
    savedAddresses[0] ??
    null;
  const usingNewAddress = showNewAddress || !selectedAddress;

  const activeAddress: Address = usingNewAddress
    ? {
        id: "new-address",
        label: "New address",
        fullAddress: [customer.address, customer.area].filter(Boolean).join(", "),
        city: customer.city,
        landmark: customer.landmark,
      }
    : selectedAddress;

  const serviceSlug = items[0]?.slug ?? "";

  // Authoritative city slug resolution matching WordPress taxonomy term
  const rawCity = activeAddress?.city?.trim() ?? "";
  const matchedCity = availableCities.find(
    (c) =>
      c.name.toLowerCase() === rawCity.toLowerCase() ||
      c.slug === rawCity.toLowerCase(),
  );
  const citySlug = matchedCity
    ? matchedCity.slug
    : rawCity.toLowerCase().replace(/\s+/g, "-");

  const selectedIsoDate = schedule.isoDate ?? "";

  // Authenticated customer loading
  useEffect(() => {
    let isMounted = true;
    const token = getAuthToken();

    if (!token) {
      router.replace("/login?next=/booking");
      return () => {
        isMounted = false;
      };
    }

    const loadCustomerProfile = async (authToken: string) => {
      try {
        const response = await fetchCurrentCustomer(authToken);
        if (!isMounted) return;
        if (response.data?.customer) {
          const current = response.data.customer;
          setAuthCustomer(current);
          setCustomer((prev) => ({
            ...prev,
            fullName: current.full_name || prev.fullName,
            phone: current.phone || prev.phone,
            email: current.email || prev.email,
          }));
        }
      } catch (error) {
        if (!isMounted) return;
        if (error instanceof MahirApiError && error.status === 401) {
          clearAuthToken();
          router.replace("/login?next=/booking");
        }
      }
    };

    const loadSavedAddresses = async (authToken: string) => {
      setSavedAddressesLoading(true);
      setSavedAddressesError(null);

      try {
        const response = await fetchAddresses(authToken);
        if (!isMounted) return;

        const mappedAddresses = response.map(mapSavedAddress);
        const preferredAddress =
          mappedAddresses.find((address) => address.isDefault) ??
          mappedAddresses[0] ??
          null;

        setSavedAddresses(mappedAddresses);
        setSelectedAddressId(preferredAddress?.id ?? "");
        setShowNewAddress(!preferredAddress);
      } catch (error) {
        if (!isMounted) return;

        if (error instanceof MahirApiError && error.status === 401) {
          clearAuthToken();
          router.replace("/login?next=/booking");
        } else {
          setSavedAddressesError(
            "Saved addresses could not be loaded. Enter a new address or try again.",
          );
          setShowNewAddress(true);
        }
      } finally {
        if (isMounted) {
          setSavedAddressesLoading(false);
        }
      }
    };

    void loadCustomerProfile(token);
    void loadSavedAddresses(token);

    return () => {
      isMounted = false;
    };
  }, [router, savedAddressesReload]);

  // Load slots for selected service, city and date
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
        const availableSlotsList = response.slots.filter(
          (slot) => slot.available,
        );

        setSlots(availableSlotsList);
      } catch (error) {
        if (!isMounted) return;
        setSlots([]);

        // Handle city/service mismatch with a clear, user-friendly message
        const errMsg = error instanceof Error ? error.message : "";
        if (
          errMsg.includes("not available for this service") ||
          errMsg.includes("City was not found") ||
          errMsg.includes("mahir_city_not_assigned") ||
          errMsg.includes("mahir_invalid_city")
        ) {
          setSlotsError(
            `This service is currently not available in ${activeAddress.city || "the selected city"}. Please choose another city or service.`,
          );
        } else {
          setSlotsError(
            errMsg || "Unable to load time slots. Please try again.",
          );
        }
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
  }, [serviceSlug, citySlug, selectedIsoDate, activeAddress.city]);

  const handleCustomerChange = (
    field: keyof CustomerDetails,
    value: string,
  ) => {
    setCustomer((current) => ({ ...current, [field]: value }));
    if (field === "city") {
      // If city changed, reset schedule slot and persist selected city
      setSchedule((current) => ({
        ...current,
        slot: "",
        slotStart: undefined,
        slotEnd: undefined,
      }));
      const matched = availableCities.find(
        (c) => c.name.toLowerCase() === value.toLowerCase(),
      );
      if (matched) {
        setStoredCity(matched.slug, matched.name);
      }
    }
  };

  const handleSelectAddress = (id: string) => {
    setSelectedAddressId(id);
    setShowNewAddress(false);
    setSchedule((current) => ({
      ...current,
      slot: "",
      slotStart: undefined,
      slotEnd: undefined,
    }));
    const address = savedAddresses.find((item) => item.id === id);
    if (address) {
      setCustomer((current) => ({
        ...current,
        address: address.fullAddress,
        city: address.city,
      }));
      const matched = availableCities.find(
        (c) => c.name.toLowerCase() === address.city.toLowerCase(),
      );
      if (matched) {
        setStoredCity(matched.slug, matched.name);
      }
    }
  };

  const handleDateChange = (date: Schedule) => {
    setSchedule({
      dateLabel: date.dateLabel,
      dateValue: date.dateValue,
      isoDate: date.isoDate,
      slot: "",
      slotStart: undefined,
      slotEnd: undefined,
    });
  };

  const continueFromAddress = () => {
    if (!usingNewAddress) {
      setCustomer((current) => ({
        ...current,
        address: activeAddress.fullAddress,
        city: activeAddress.city,
        fullName: current.fullName || authCustomer?.full_name || "",
        phone: current.phone || authCustomer?.phone || "",
        email: current.email || authCustomer?.email || "",
      }));
    }
    setStep(2);
  };

  const continueFromSchedule = () => setStep(3);

  const executeBookingCreation = async (
    token: string,
    verifiedCustomer?: AuthCustomer,
  ) => {
    if (submissionInFlight.current) {
      return;
    }

    const service = items[0];
    const slotStart = schedule.slotStart;

    if (!service || !citySlug || !selectedIsoDate || !slotStart) {
      setSubmissionError(
        "Some booking details are missing. Please review your address and schedule.",
      );
      return;
    }

    const customerPhone =
      verifiedCustomer?.phone || customer.phone.trim() || authCustomer?.phone || "";

    submissionInFlight.current = true;
    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const result = await createBooking(token, {
        service: service.slug,
        city: citySlug,
        date: selectedIsoDate,
        slotStart,
        customer: {
          name: customer.fullName.trim() || (verifiedCustomer?.full_name ?? ""),
          phone: customerPhone,
          email: customer.email.trim() || (verifiedCustomer?.email ?? undefined) || undefined,
        },
        address: {
          line: activeAddress.fullAddress.trim(),
          city: activeAddress.city.trim(),
          notes:
            activeAddress.landmark?.trim() ||
            customer.landmark.trim() ||
            undefined,
        },
      });

      const confirmedSlot = formatSlotDisplay({
        startTime: result.slot.startTime,
        endTime: result.slot.endTime,
        available: false,
      });

      const confirmedSchedule: Schedule = {
        ...schedule,
        isoDate: result.date,
        slot: confirmedSlot,
        slotStart: result.slot.startTime,
        slotEnd: result.slot.endTime,
      };

      const confirmedAddress: Address = {
        ...activeAddress,
        fullAddress: result.address.line,
        city: result.address.city,
        landmark: result.address.notes ?? activeAddress.landmark,
      };

      const confirmedCustomer: CustomerDetails = {
        ...customer,
        fullName: result.customer.name,
        phone: result.customer.phone,
        email: result.customer.email ?? customer.email,
      };

      // Snapshot booking details before clearing cart so ConfirmationStep remains intact
      const snapshot: BookingSnapshot = {
        id: result.id,
        bookingId: result.bookingNumber,
        status: result.status,
        items: [service],
        address: confirmedAddress,
        schedule: confirmedSchedule,
        customer: confirmedCustomer,
        estimatedTotal,
      };

      setBooking(snapshot);

      // Safe cart clear ONLY after confirmed API success
      clearCart();

      setStep(4);
    } catch (error) {
      if (error instanceof MahirApiError && error.status === 401) {
        clearAuthToken();
        router.replace("/login?next=/booking");
      } else if (
        error instanceof MahirApiError &&
        (error.code === "mahir_phone_required" ||
          error.code === "mahir_phone_verification_required")
      ) {
        setShowPhoneModal(true);
      } else if (
        error instanceof MahirApiError &&
        error.code === "mahir_slot_unavailable"
      ) {
        setSlots((current) =>
          current.filter((slot) => slot.startTime !== slotStart),
        );
        setSchedule((current) => ({
          ...current,
          slot: "",
          slotStart: undefined,
          slotEnd: undefined,
        }));
        setSlotsError(
          "This time slot is no longer available. Please choose another time.",
        );
        setStep(2);
      } else {
        const msg = error instanceof Error ? error.message : "";
        setSubmissionError(
          msg || "We could not confirm your booking. Please check your details and try again.",
        );
      }
    } finally {
      submissionInFlight.current = false;
      setIsSubmitting(false);
    }
  };

  const confirmBooking = async () => {
    if (submissionInFlight.current) {
      return;
    }

    const token = getAuthToken();
    if (!token) {
      router.replace("/login?next=/booking");
      return;
    }

    let currentCustomer = authCustomer;
    if (!currentCustomer) {
      try {
        const response = await fetchCurrentCustomer(token);
        if (response.data?.customer) {
          currentCustomer = response.data.customer;
          setAuthCustomer(currentCustomer);
        }
      } catch (err) {
        if (err instanceof MahirApiError && err.status === 401) {
          clearAuthToken();
          router.replace("/login?next=/booking");
          return;
        }
      }
    }

    // Server-side requirement: must have verified phone number before booking
    if (!currentCustomer?.phone || !currentCustomer.phone_verified) {
      setShowPhoneModal(true);
      return;
    }

    await executeBookingCreation(token, currentCustomer);
  };

  const handlePhoneVerified = (updatedCustomer: AuthCustomer) => {
    setAuthCustomer(updatedCustomer);
    setCustomer((prev) => ({
      ...prev,
      phone: updatedCustomer.phone || prev.phone,
    }));
    setShowPhoneModal(false);

    const token = getAuthToken();
    if (token) {
      void executeBookingCreation(token, updatedCustomer);
    }
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

  // If at step 4 (confirmation), render confirmation even though cart was cleared
  if (step === 4 && booking) {
    return (
      <>
        <SiteHeader />
        <main className="bg-background pb-24">
          <div className="site-container py-8 sm:py-12">
            <ConfirmationStep booking={booking} />
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
                Select a service to get started with your appointment.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/services"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-6 text-base font-semibold text-white transition-colors hover:bg-brand-dark"
                >
                  Browse Services
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
                  showNewAddress={usingNewAddress}
                  addressesLoading={savedAddressesLoading}
                  addressesError={savedAddressesError}
                  cities={availableCities}
                  onRetryAddresses={() =>
                    setSavedAddressesReload((count) => count + 1)
                  }
                  onSelectAddress={handleSelectAddress}
                  onToggleNewAddress={() => {
                    if (usingNewAddress && savedAddresses.length) {
                      setShowNewAddress(false);
                    } else {
                      setShowNewAddress(true);
                    }
                  }}
                  onCustomerChange={handleCustomerChange}
                  onContinue={continueFromAddress}
                />
              ) : null}
              {step === 2 ? (
                <ScheduleStep
                  schedule={schedule}
                  dates={availableDates}
                  slots={slots.map(formatSlotDisplay)}
                  loadingSlots={loadingSlots}
                  slotsError={slotsError}
                  onDateChange={handleDateChange}
                  onSlotChange={(slotLabel) => {
                    const selectedSlot = slots.find(
                      (slot) => formatSlotDisplay(slot) === slotLabel,
                    );

                    if (!selectedSlot) {
                      return;
                    }

                    setSlotsError(null);
                    setSchedule((current) => ({
                      ...current,
                      slot: slotLabel,
                      slotStart: selectedSlot.startTime,
                      slotEnd: selectedSlot.endTime,
                    }));
                  }}
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
                  onBack={() => {
                    setSubmissionError(null);
                    setStep(2);
                  }}
                  onConfirm={confirmBooking}
                  isSubmitting={isSubmitting}
                  submissionError={submissionError}
                />
              ) : null}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
      <PhoneVerificationModal
        isOpen={showPhoneModal}
        onClose={() => setShowPhoneModal(false)}
        initialPhone={customer.phone || authCustomer?.phone}
        onVerified={handlePhoneVerified}
      />
    </>
  );
}
