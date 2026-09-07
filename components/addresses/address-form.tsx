"use client";

import { useEffect, useState } from "react";
import { getWordPressCities, type MahirAddress, type MahirAddressInput, type WordPressCity } from "@/lib/mahir-api";

type AddressDraft = {
  label: string;
  address_line: string;
  area: string;
  city: string;
  notes: string;
  is_default: boolean;
};

type AddressFormProps = {
  address?: MahirAddress;
  onSave: (address: MahirAddressInput) => void | Promise<void>;
  onCancel: () => void;
  onChange: () => void;
  saving: boolean;
  error: string | null;
};

const inputClass =
  "mt-2 h-12 w-full rounded-xl border border-line bg-white px-3 text-base text-foreground outline-none focus:border-brand disabled:cursor-not-allowed disabled:bg-background disabled:text-muted";

function createDraft(address?: MahirAddress): AddressDraft {
  return {
    label: address?.label ?? "",
    address_line: address?.address_line ?? "",
    area: address?.area ?? "",
    city: address?.city ?? "",
    notes: address?.notes ?? "",
    is_default: address?.is_default ?? false,
  };
}

export function AddressForm({
  address,
  onSave,
  onCancel,
  onChange,
  saving,
  error,
}: AddressFormProps) {
  const [draft, setDraft] = useState<AddressDraft>(() => createDraft(address));
  const [cities, setCities] = useState<WordPressCity[]>([]);

  useEffect(() => {
    let isMounted = true;
    getWordPressCities().then((res) => {
      if (isMounted) setCities(res);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const valid = Boolean(draft.address_line.trim() && draft.city.trim());

  const updateText = (
    field: "label" | "address_line" | "area" | "city" | "notes",
    value: string,
  ) => {
    setDraft((current) => ({ ...current, [field]: value }));
    onChange();
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!valid || saving) return;

        void onSave({
          label: draft.label.trim() || null,
          address_line: draft.address_line.trim(),
          area: draft.area.trim() || null,
          city: draft.city.trim(),
          notes: draft.notes.trim() || null,
          is_default: draft.is_default,
        });
      }}
      noValidate
      className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6"
    >
      <h2 className="text-xl font-bold text-foreground">
        {address ? "Edit Address" : "Add New Address"}
      </h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-foreground">
          Address Label{" "}
          <span className="font-normal text-muted">(optional)</span>
          <input
            value={draft.label}
            maxLength={100}
            disabled={saving}
            onChange={(event) => updateText("label", event.target.value)}
            placeholder="Home, Office, Parents"
            className={inputClass}
          />
        </label>
        <label className="text-sm font-semibold text-foreground sm:col-span-2">
          Full Address
          <input
            required
            value={draft.address_line}
            maxLength={255}
            disabled={saving}
            onChange={(event) => updateText("address_line", event.target.value)}
            placeholder="House / apartment / building number, street name"
            className={inputClass}
          />
        </label>
        <label className="text-sm font-semibold text-foreground">
          Area <span className="font-normal text-muted">(optional)</span>
          <input
            value={draft.area}
            maxLength={150}
            disabled={saving}
            onChange={(event) => updateText("area", event.target.value)}
            placeholder="e.g. Gulberg, DHA, F-7"
            className={inputClass}
          />
        </label>
        <label className="text-sm font-semibold text-foreground">
          City
          <select
            required
            value={draft.city}
            disabled={saving}
            onChange={(event) => updateText("city", event.target.value)}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="">Select your city</option>
            {cities.map((city) => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-semibold text-foreground sm:col-span-2">
          Landmark or notes{" "}
          <span className="font-normal text-muted">(optional)</span>
          <input
            value={draft.notes}
            maxLength={255}
            disabled={saving}
            onChange={(event) => updateText("notes", event.target.value)}
            placeholder="Near mosque, park, market..."
            className={inputClass}
          />
        </label>
        <label className="flex items-center gap-3 text-sm font-semibold text-foreground sm:col-span-2">
          <input
            type="checkbox"
            checked={draft.is_default}
            disabled={saving}
            onChange={(event) => {
              setDraft((current) => ({
                ...current,
                is_default: event.target.checked,
              }));
              onChange();
            }}
            className="size-4 accent-brand"
          />
          Make this my default address
        </label>
      </div>

      {error ? (
        <p role="alert" className="mt-4 text-sm font-semibold text-red-600">
          {error}
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={!valid || saving}
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Saving..." : address ? "Save Changes" : "Save Address"}
        </button>
        <button
          type="button"
          disabled={saving}
          onClick={onCancel}
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-line bg-white px-5 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
