"use client";

import { useState } from "react";
import type { MahirAddress, MahirAddressInput } from "@/lib/mahir-api";

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
            className={inputClass}
          />
        </label>
        <label className="text-sm font-semibold text-foreground">
          City
          <input
            required
            value={draft.city}
            maxLength={100}
            disabled={saving}
            onChange={(event) => updateText("city", event.target.value)}
            className={inputClass}
          />
        </label>
        <label className="text-sm font-semibold text-foreground sm:col-span-2">
          Landmark or notes{" "}
          <span className="font-normal text-muted">(optional)</span>
          <input
            value={draft.notes}
            maxLength={255}
            disabled={saving}
            onChange={(event) => updateText("notes", event.target.value)}
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
        <p role="alert" className="mt-4 text-sm text-red-600">
          {error}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          disabled={saving}
          onClick={onCancel}
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-5 text-sm font-semibold text-foreground hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!valid || saving}
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          {saving ? "Saving..." : "Save Address"}
        </button>
      </div>
    </form>
  );
}
