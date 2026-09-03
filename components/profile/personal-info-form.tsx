"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import type { CustomerProfile } from "@/data/profile";
import {
  updateCurrentCustomer,
  getAuthToken,
  clearAuthToken,
  MahirApiError,
  type AuthCustomer,
} from "@/lib/mahir-api";

const inputClass =
  "mt-2 h-12 w-full rounded-xl border border-line bg-white px-3 text-base text-foreground outline-none focus:border-brand disabled:cursor-not-allowed disabled:bg-background disabled:text-muted";

type PersonalInfoFormProps = {
  customer: AuthCustomer;
  profile: CustomerProfile;
  isEditing: boolean;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onCustomerUpdated: (customer: AuthCustomer) => void;
};

function EditForm({
  customer,
  profile,
  onCancel,
  onSaved,
}: {
  customer: AuthCustomer;
  profile: CustomerProfile;
  onCancel: () => void;
  onSaved: (customer: AuthCustomer) => void;
}) {
  const router = useRouter();
  const [fullName, setFullName] = useState(customer.full_name ?? "");
  const [email, setEmail] = useState(customer.email ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();

    if (trimmedName.length > 100) {
      setError("Full name cannot exceed 100 characters.");
      return;
    }

    if (trimmedEmail.length > 100) {
      setError("Email address cannot exceed 100 characters.");
      return;
    }

    if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    const token = getAuthToken();
    if (!token) {
      router.replace("/login?next=/profile");
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const response = await updateCurrentCustomer(token, {
        full_name: trimmedName.length > 0 ? trimmedName : null,
        email: trimmedEmail.length > 0 ? trimmedEmail : null,
      });

      if (response.data?.customer) {
        onSaved(response.data.customer);
      }
    } catch (err) {
      if (err instanceof MahirApiError && err.status === 401) {
        clearAuthToken();
        router.replace("/login?next=/profile");
        return;
      }

      if (err instanceof MahirApiError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message || "Failed to update profile. Please try again.");
      } else {
        setError("Failed to update profile. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-foreground">
          Full Name
          <input
            type="text"
            value={fullName}
            disabled={saving}
            maxLength={100}
            onChange={(e) => {
              setFullName(e.target.value);
              setError(null);
            }}
            placeholder="Enter full name"
            className={inputClass}
          />
        </label>

        <div>
          <label className="text-sm font-semibold text-foreground">
            Phone Number
            <input
              type="text"
              value={customer.phone}
              disabled
              readOnly
              aria-readonly="true"
              className={inputClass}
            />
          </label>
          <p className="mt-1 text-xs text-muted">
            Phone number cannot be changed at this time.
          </p>
        </div>

        <label className="text-sm font-semibold text-foreground">
          Email
          <input
            type="email"
            value={email}
            disabled={saving}
            maxLength={100}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
            placeholder="name@example.com"
            className={inputClass}
          />
        </label>

        <div>
          <label className="text-sm font-semibold text-foreground">
            City
            <input
              type="text"
              value={
                profile.city && profile.city !== "Not specified"
                  ? profile.city
                  : "Not specified"
              }
              disabled
              readOnly
              aria-readonly="true"
              className={inputClass}
            />
          </label>
        </div>
      </div>

      {error ? (
        <p role="alert" className="mt-4 text-sm text-red-600">
          {error}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          disabled={saving}
          onClick={onCancel}
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-5 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}

export function PersonalInfoForm({
  customer,
  profile,
  isEditing,
  onStartEdit,
  onCancelEdit,
  onCustomerUpdated,
}: PersonalInfoFormProps) {
  return (
    <section
      id="personal-information"
      className="rounded-[1.5rem] border border-line bg-white p-5 shadow-card sm:p-6"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.13em] text-brand">
            Account details
          </p>
          <h2 className="mt-2 text-2xl font-bold text-foreground">
            Personal Information
          </h2>
        </div>
        {!isEditing ? (
          <button
            type="button"
            onClick={onStartEdit}
            className="inline-flex min-h-11 items-center rounded-xl border border-line px-4 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand"
          >
            Edit
          </button>
        ) : null}
      </div>

      {isEditing ? (
        <EditForm
          customer={customer}
          profile={profile}
          onCancel={onCancelEdit}
          onSaved={onCustomerUpdated}
        />
      ) : (
        <dl className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              Full Name
            </dt>
            <dd className="mt-2 font-semibold text-foreground">
              {profile.fullName}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              Phone Number
            </dt>
            <dd className="mt-2 font-semibold text-foreground">
              {profile.phone}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              Email
            </dt>
            <dd className="mt-2 font-semibold text-foreground">
              {profile.email || "Email not added"}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              City
            </dt>
            <dd className="mt-2 font-semibold text-foreground">
              {profile.city && profile.city !== "Not specified"
                ? profile.city
                : "Not specified"}
            </dd>
          </div>
        </dl>
      )}
    </section>
  );
}
