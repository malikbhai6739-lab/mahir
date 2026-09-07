"use client";

import { useState } from "react";
import type {
  WordPressCategory,
  WordPressCity,
  BusinessType,
  LocationsRange,
  RequirementType,
} from "@/lib/mahir-api";
import { submitBusinessEnquiry } from "@/lib/mahir-api";

interface BusinessEnquiryFormProps {
  categories: WordPressCategory[];
  cities: WordPressCity[];
}

const BUSINESS_TYPES: { label: string; value: BusinessType }[] = [
  { label: "Corporate Office", value: "office" },
  { label: "Retail & Showrooms", value: "retail" },
  { label: "Property Management / Real Estate", value: "property_management" },
  { label: "Hospitality (Hotels / Restaurants)", value: "hospitality" },
  { label: "Healthcare & Clinics", value: "healthcare" },
  { label: "Education & Campuses", value: "education" },
  { label: "Other Commercial / Industrial", value: "other" },
];

const LOCATIONS_RANGES: { label: string; value: LocationsRange }[] = [
  { label: "1 Location", value: "1" },
  { label: "2 - 5 Locations", value: "2-5" },
  { label: "6 - 10 Locations", value: "6-10" },
  { label: "11 - 25 Locations", value: "11-25" },
  { label: "25+ Locations", value: "25+" },
];

const REQUIREMENT_TYPES: { label: string; value: RequirementType; desc: string }[] = [
  {
    label: "Recurring Maintenance Contract",
    value: "recurring",
    desc: "Scheduled preventive inspections, recurring servicing, and coordinated dispatch.",
  },
  {
    label: "On-Demand Commercial Facility Services",
    value: "both",
    desc: "Routine coordination plus emergency on-call repairs across your locations.",
  },
  {
    label: "One-Time Fitout or Major Project",
    value: "one-time",
    desc: "Large repair, refurbishment, or seasonal installation project.",
  },
];

export function BusinessEnquiryForm({ categories, cities }: BusinessEnquiryFormProps) {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    businessType: "" as BusinessType | "",
    cityId: "" as number | "",
    locationsRange: "" as LocationsRange | "",
    requirementType: "" as RequirementType | "",
    categoryIds: [] as number[],
    notes: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [referenceCode, setReferenceCode] = useState<string>("");

  const toggleCategory = (id: number) => {
    setFormData((prev) => {
      const exists = prev.categoryIds.includes(id);
      const updated = exists
        ? prev.categoryIds.filter((catId) => catId !== id)
        : [...prev.categoryIds, id];
      return { ...prev, categoryIds: updated };
    });
    if (formErrors.categoryIds) {
      setFormErrors((prev) => {
        const copy = { ...prev };
        delete copy.categoryIds;
        return copy;
      });
    }
  };

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.companyName.trim() || formData.companyName.trim().length < 2) {
      errors.companyName = "Please enter your company or business name (min 2 characters).";
    }

    if (!formData.contactName.trim() || formData.contactName.trim().length < 2) {
      errors.contactName = "Please enter the primary contact person's name (min 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = "Please enter a valid business email address.";
    }

    const digitsOnly = formData.phone.replace(/\D/g, "");
    if (!digitsOnly || (digitsOnly.length !== 10 && digitsOnly.length !== 11 && digitsOnly.length !== 12)) {
      errors.phone = "Please enter a valid Pakistani contact number (e.g. 0300 1234567).";
    }

    if (!formData.businessType) {
      errors.businessType = "Please select your business type.";
    }

    if (!formData.cityId) {
      errors.cityId = "Please select your primary operating city.";
    }

    if (!formData.locationsRange) {
      errors.locationsRange = "Please indicate the number of locations.";
    }

    if (!formData.requirementType) {
      errors.requirementType = "Please select your service requirement type.";
    }

    if (formData.categoryIds.length === 0) {
      errors.categoryIds = "Please select at least one service category.";
    }

    if (!formData.notes.trim() || formData.notes.trim().length < 5) {
      errors.notes = "Please describe your service requirements or scope (at least 5 characters).";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validate()) {
      return;
    }

    setStatus("submitting");

    try {
      const response = await submitBusinessEnquiry({
        companyName: formData.companyName,
        contactName: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        businessType: formData.businessType as BusinessType,
        cityId: Number(formData.cityId),
        locationsRange: formData.locationsRange as LocationsRange,
        categoryIds: formData.categoryIds,
        requirementType: formData.requirementType as RequirementType,
        notes: formData.notes,
      });

      if (response.success) {
        setStatus("success");
        setReferenceCode(response.reference || "");
      } else {
        setStatus("error");
        setErrorMessage(response.message || "Failed to submit your enquiry. Please try again.");
      }
    } catch (err: unknown) {
      setStatus("error");
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again later.");
      }
    }
  };

  const handleReset = () => {
    setFormData({
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      businessType: "",
      cityId: "",
      locationsRange: "",
      requirementType: "",
      categoryIds: [],
      notes: "",
    });
    setFormErrors({});
    setStatus("idle");
    setErrorMessage("");
    setReferenceCode("");
  };

  if (status === "success") {
    const selectedCity = cities.find((c) => c.id === Number(formData.cityId))?.name || "Pakistan";

    return (
      <div className="rounded-2xl border border-emerald-200 bg-white p-8 shadow-sm sm:p-12 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h3 className="mt-5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Business Enquiry Received
        </h3>

        {referenceCode && (
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-4 py-1.5 text-sm font-bold text-brand">
            Reference: {referenceCode}
          </div>
        )}

        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
          Your business enquiry has been received. Our team will review your requirements and contact you regarding the next steps.
        </p>

        <div className="mx-auto mt-8 max-w-md rounded-xl border border-line bg-slate-50/70 p-5 text-left text-xs sm:text-sm">
          <div className="font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-3 border-b border-line pb-2">
            Enquiry Summary
          </div>
          <div className="space-y-1.5 text-slate-600">
            <p><strong className="text-foreground">Company:</strong> {formData.companyName}</p>
            <p><strong className="text-foreground">Contact:</strong> {formData.contactName}</p>
            <p><strong className="text-foreground">Email:</strong> {formData.email}</p>
            <p><strong className="text-foreground">City:</strong> {selectedCity}</p>
          </div>
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-line bg-white px-8 text-sm font-semibold text-foreground transition hover:bg-slate-50"
          >
            Submit Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-line/80 bg-white p-6 shadow-sm sm:p-10"
    >
      {status === "error" && errorMessage && (
        <div className="mb-8 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
          <div className="flex items-start gap-2.5">
            <svg className="h-5 w-5 shrink-0 text-rose-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-semibold">Enquiry submission error</p>
              <p className="mt-0.5 text-xs text-rose-700">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-8">
        {/* ROW 1: Company & Contact Person */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="companyName" className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
              Company / Business Name <span className="text-rose-500">*</span>
            </label>
            <input
              id="companyName"
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              placeholder="e.g. Acme Logistics Pvt Ltd"
              className={`w-full rounded-xl border px-4 py-3 text-sm text-foreground transition focus:outline-none focus:ring-2 ${
                formErrors.companyName
                  ? "border-rose-300 bg-rose-50/30 focus:border-rose-500 focus:ring-rose-200"
                  : "border-line bg-background focus:border-brand focus:ring-brand/10"
              }`}
            />
            {formErrors.companyName && (
              <p className="mt-1.5 text-xs text-rose-600">{formErrors.companyName}</p>
            )}
          </div>

          <div>
            <label htmlFor="contactName" className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
              Contact Person Name <span className="text-rose-500">*</span>
            </label>
            <input
              id="contactName"
              type="text"
              value={formData.contactName}
              onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
              placeholder="e.g. Tariq Mehmood (Admin Manager)"
              className={`w-full rounded-xl border px-4 py-3 text-sm text-foreground transition focus:outline-none focus:ring-2 ${
                formErrors.contactName
                  ? "border-rose-300 bg-rose-50/30 focus:border-rose-500 focus:ring-rose-200"
                  : "border-line bg-background focus:border-brand focus:ring-brand/10"
              }`}
            />
            {formErrors.contactName && (
              <p className="mt-1.5 text-xs text-rose-600">{formErrors.contactName}</p>
            )}
          </div>
        </div>

        {/* ROW 2: Email & Phone */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
              Official Work Email <span className="text-rose-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="name@company.com"
              className={`w-full rounded-xl border px-4 py-3 text-sm text-foreground transition focus:outline-none focus:ring-2 ${
                formErrors.email
                  ? "border-rose-300 bg-rose-50/30 focus:border-rose-500 focus:ring-rose-200"
                  : "border-line bg-background focus:border-brand focus:ring-brand/10"
              }`}
            />
            {formErrors.email && (
              <p className="mt-1.5 text-xs text-rose-600">{formErrors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
              Contact Phone / WhatsApp <span className="text-rose-500">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="0300 1234567"
              className={`w-full rounded-xl border px-4 py-3 text-sm text-foreground transition focus:outline-none focus:ring-2 ${
                formErrors.phone
                  ? "border-rose-300 bg-rose-50/30 focus:border-rose-500 focus:ring-rose-200"
                  : "border-line bg-background focus:border-brand focus:ring-brand/10"
              }`}
            />
            {formErrors.phone && (
              <p className="mt-1.5 text-xs text-rose-600">{formErrors.phone}</p>
            )}
          </div>
        </div>

        {/* ROW 3: Business Type & Primary City */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="businessType" className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
              Business Type <span className="text-rose-500">*</span>
            </label>
            <select
              id="businessType"
              value={formData.businessType}
              onChange={(e) => setFormData({ ...formData, businessType: e.target.value as BusinessType })}
              className={`w-full rounded-xl border px-4 py-3 text-sm text-foreground transition focus:outline-none focus:ring-2 ${
                formErrors.businessType
                  ? "border-rose-300 bg-rose-50/30 focus:border-rose-500 focus:ring-rose-200"
                  : "border-line bg-background focus:border-brand focus:ring-brand/10"
              }`}
            >
              <option value="">Select your business category...</option>
              {BUSINESS_TYPES.map((bt) => (
                <option key={bt.value} value={bt.value}>
                  {bt.label}
                </option>
              ))}
            </select>
            {formErrors.businessType && (
              <p className="mt-1.5 text-xs text-rose-600">{formErrors.businessType}</p>
            )}
          </div>

          <div>
            <label htmlFor="cityId" className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
              Primary Operating City <span className="text-rose-500">*</span>
            </label>
            <select
              id="cityId"
              value={formData.cityId}
              onChange={(e) => setFormData({ ...formData, cityId: e.target.value ? Number(e.target.value) : "" })}
              className={`w-full rounded-xl border px-4 py-3 text-sm text-foreground transition focus:outline-none focus:ring-2 ${
                formErrors.cityId
                  ? "border-rose-300 bg-rose-50/30 focus:border-rose-500 focus:ring-rose-200"
                  : "border-line bg-background focus:border-brand focus:ring-brand/10"
              }`}
            >
              <option value="">Select primary operating city...</option>
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {formErrors.cityId && (
              <p className="mt-1.5 text-xs text-rose-600">{formErrors.cityId}</p>
            )}
          </div>
        </div>

        {/* ROW 4: Number of Locations & Requirement Type */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="locationsRange" className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
              Number of Locations <span className="text-rose-500">*</span>
            </label>
            <select
              id="locationsRange"
              value={formData.locationsRange}
              onChange={(e) => setFormData({ ...formData, locationsRange: e.target.value as LocationsRange })}
              className={`w-full rounded-xl border px-4 py-3 text-sm text-foreground transition focus:outline-none focus:ring-2 ${
                formErrors.locationsRange
                  ? "border-rose-300 bg-rose-50/30 focus:border-rose-500 focus:ring-rose-200"
                  : "border-line bg-background focus:border-brand focus:ring-brand/10"
              }`}
            >
              <option value="">Select number of facilities...</option>
              {LOCATIONS_RANGES.map((lr) => (
                <option key={lr.value} value={lr.value}>
                  {lr.label}
                </option>
              ))}
            </select>
            {formErrors.locationsRange && (
              <p className="mt-1.5 text-xs text-rose-600">{formErrors.locationsRange}</p>
            )}
          </div>

          <div>
            <label htmlFor="requirementType" className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
              Requirement Model <span className="text-rose-500">*</span>
            </label>
            <select
              id="requirementType"
              value={formData.requirementType}
              onChange={(e) => setFormData({ ...formData, requirementType: e.target.value as RequirementType })}
              className={`w-full rounded-xl border px-4 py-3 text-sm text-foreground transition focus:outline-none focus:ring-2 ${
                formErrors.requirementType
                  ? "border-rose-300 bg-rose-50/30 focus:border-rose-500 focus:ring-rose-200"
                  : "border-line bg-background focus:border-brand focus:ring-brand/10"
              }`}
            >
              <option value="">Select contract type...</option>
              {REQUIREMENT_TYPES.map((rt) => (
                <option key={rt.value} value={rt.value}>
                  {rt.label}
                </option>
              ))}
            </select>
            {formErrors.requirementType && (
              <p className="mt-1.5 text-xs text-rose-600">{formErrors.requirementType}</p>
            )}
          </div>
        </div>

        {/* ROW 5: Required Services (Checkboxes) */}
        <div>
          <fieldset>
            <legend className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
              Required Service Categories <span className="text-rose-500">*</span>{" "}
              <span className="text-muted font-normal lowercase">(select all that apply)</span>
            </legend>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 pt-1">
              {categories.map((cat) => {
                const isSelected = formData.categoryIds.includes(cat.id);
                return (
                  <label
                    key={cat.id}
                    className={`flex cursor-pointer items-center gap-2.5 rounded-xl border p-3 text-xs font-semibold transition-colors sm:text-sm ${
                      isSelected
                        ? "border-brand bg-brand-soft/70 text-brand"
                        : "border-line bg-background text-foreground/90 hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleCategory(cat.id)}
                      className="h-4 w-4 rounded border-line text-brand focus:ring-brand/20"
                    />
                    <span className="truncate">{cat.name}</span>
                  </label>
                );
              })}
            </div>
            {formErrors.categoryIds && (
              <p className="mt-2 text-xs text-rose-600">{formErrors.categoryIds}</p>
            )}
          </fieldset>
        </div>

        {/* ROW 6: Scope Notes */}
        <div>
          <label htmlFor="notes" className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
            Requirement Scope & Facility Details <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="notes"
            rows={4}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Describe your specific maintenance needs, number of locations, operating hours, or special facility compliance requirements..."
            className={`w-full rounded-xl border px-4 py-3 text-sm text-foreground transition focus:outline-none focus:ring-2 ${
              formErrors.notes
                ? "border-rose-300 bg-rose-50/30 focus:border-rose-500 focus:ring-rose-200"
                : "border-line bg-background focus:border-brand focus:ring-brand/10"
            }`}
          />
          {formErrors.notes && (
            <p className="mt-1.5 text-xs text-rose-600">{formErrors.notes}</p>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <div>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex min-h-13 w-full items-center justify-center rounded-xl bg-brand px-8 text-base font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? (
              <span className="flex items-center gap-2">
                <svg className="h-5 w-5 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Submitting Business Enquiry...
              </span>
            ) : (
              "Submit Business Enquiry →"
            )}
          </button>
          <p className="mt-3 text-center text-xs text-muted">
            Our team will review your requirements and contact you regarding the next steps.
          </p>
        </div>
      </div>
    </form>
  );
}
