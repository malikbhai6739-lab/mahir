"use client";

import { useState } from "react";
import type { WordPressCategory, WordPressCity } from "@/lib/mahir-api";
import { submitTechnicianApplication, MahirApiError } from "@/lib/mahir-api";

type Props = {
  categories: WordPressCategory[];
  cities: WordPressCity[];
};

type FormData = {
  fullName: string;
  phone: string;
  email: string;
  categoryId: string;
  cityId: string;
  experienceYears: string;
  notes: string;
};

const initialFormData: FormData = {
  fullName: "",
  phone: "",
  email: "",
  categoryId: "",
  cityId: "",
  experienceYears: "2",
  notes: "",
};

export function BecomeMahirForm({ categories, cities }: Props) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<{
    applicationId?: number;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      setErrorMsg("Please enter your full name (at least 2 characters).");
      return;
    }

    const cleanPhone = formData.phone.trim();
    if (!cleanPhone) {
      setErrorMsg("Please enter your mobile or WhatsApp phone number.");
      return;
    }

    const catId = parseInt(formData.categoryId, 10);
    if (isNaN(catId) || catId <= 0) {
      setErrorMsg("Please select your primary service category.");
      return;
    }

    const cityId = parseInt(formData.cityId, 10);
    if (isNaN(cityId) || cityId <= 0) {
      setErrorMsg("Please select your operating city.");
      return;
    }

    setIsSubmitting(true);

    try {
      const expYears = formData.experienceYears ? parseInt(formData.experienceYears, 10) : undefined;
      const res = await submitTechnicianApplication({
        fullName: formData.fullName.trim(),
        phone: cleanPhone,
        email: formData.email.trim() || undefined,
        categoryId: catId,
        cityId: cityId,
        experienceYears: !isNaN(expYears as number) ? expYears : undefined,
        notes: formData.notes.trim() || undefined,
      });

      setSuccessInfo({
        applicationId: res.application_id,
        message:
          "Your application has been received successfully. Our team will review your application and contact suitable candidates for the next onboarding steps.",
      });
      setFormData(initialFormData);
    } catch (err: unknown) {
      if (err instanceof MahirApiError) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Failed to submit application. Please check your internet connection and try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successInfo) {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-8 text-center sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-3xl text-white shadow-lg shadow-emerald-500/20">
          &#10003;
        </div>
        <h3 className="mt-6 text-2xl font-bold text-slate-900 sm:text-3xl">
          Application Received!
        </h3>
        {successInfo.applicationId && (
          <p className="mt-2 text-sm font-semibold text-emerald-800">
            Application Reference #{successInfo.applicationId}
          </p>
        )}
        <p className="mx-auto mt-4 max-w-lg text-base text-slate-700 leading-relaxed">
          {successInfo.message}
        </p>
        <div className="mx-auto mt-6 max-w-md rounded-2xl bg-white p-5 text-left border border-emerald-100 shadow-sm">
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            What Happens Next?
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="font-bold text-emerald-600">1.</span>
              Our partner onboarding specialist reviews your trade profile.
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-emerald-600">2.</span>
              Our team reviews your submission and contacts suitable candidates for the next onboarding steps.
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-emerald-600">3.</span>
              Once verified, your account is activated to receive customer bookings.
            </li>
          </ul>
        </div>
        <button
          type="button"
          onClick={() => setSuccessInfo(null)}
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-line/80 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-10">
      <div className="border-b border-line/60 pb-6 mb-8">
        <h3 className="text-2xl font-bold text-foreground">
          Apply to Become a Mahir
        </h3>
        <p className="mt-2 text-sm text-muted">
          Fill out the form below. All applications are reviewed by our partner team before activation.
        </p>
      </div>

      {errorMsg && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800"
        >
          <span className="text-lg leading-none">&#9888;</span>
          <div>
            <p className="font-semibold">Unable to submit application</p>
            <p className="mt-0.5">{errorMsg}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="fullName"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
            >
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="e.g. Muhammad Ali"
              className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm font-medium text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
            >
              Phone / WhatsApp <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="e.g. 0300 1234567"
              className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm font-medium text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10"
            />
            <p className="mt-1 text-xs text-muted">Pakistani mobile number (+92 / 03XX)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <label
              htmlFor="categoryId"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
            >
              Primary Skill / Trade <span className="text-rose-500">*</span>
            </label>
            <select
              id="categoryId"
              required
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm font-medium text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="cityId"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
            >
              Operating City <span className="text-rose-500">*</span>
            </label>
            <select
              id="cityId"
              required
              value={formData.cityId}
              onChange={(e) => setFormData({ ...formData, cityId: e.target.value })}
              className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm font-medium text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10"
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="experienceYears"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
            >
              Years of Experience
            </label>
            <select
              id="experienceYears"
              value={formData.experienceYears}
              onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
              className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm font-medium text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10"
            >
              <option value="1">1 Year</option>
              <option value="2">2 Years</option>
              <option value="3">3 Years</option>
              <option value="4">4 Years</option>
              <option value="5">5+ Years</option>
              <option value="10">10+ Years</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
          >
            Email Address <span className="text-muted font-normal lowercase">(optional)</span>
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="e.g. name@example.com"
            className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm font-medium text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10"
          />
        </div>

        <div>
          <label
            htmlFor="notes"
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
          >
            Experience, Tools & Specializations <span className="text-muted font-normal lowercase">(optional)</span>
          </label>
          <textarea
            id="notes"
            rows={3}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Tell us about the tools you own, special certifications, or specific areas you cover..."
            className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm font-medium text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10"
          />
        </div>

        <div className="rounded-2xl bg-slate-50 p-4 text-xs text-muted leading-relaxed">
          By applying, you agree to Mahir Company&apos;s verification process. A valid CNIC and professional trade experience are required for final activation.
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-13 w-full items-center justify-center rounded-xl bg-brand px-8 text-base font-bold text-white shadow-lg shadow-brand/20 transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Submitting Application...
            </span>
          ) : (
            "Submit Application &rarr;"
          )}
        </button>
      </form>
    </div>
  );
}
