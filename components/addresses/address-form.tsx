"use client";

import { useState } from "react";
import type { Address } from "@/components/booking/types";

type AddressFormProps = { address?: Address; onSave: (address: Address) => void; onCancel: () => void };
const blankAddress: Address = { id: "", label: "Home", fullAddress: "", address: "", area: "", city: "", landmark: "", isDefault: false };
const inputClass = "mt-2 h-12 w-full rounded-xl border border-line bg-white px-3 text-base text-foreground outline-none focus:border-brand";

export function AddressForm({ address, onSave, onCancel }: AddressFormProps) {
  const [draft, setDraft] = useState<Address>(address ?? blankAddress);
  const update = (field: keyof Address, value: string) => setDraft((current) => ({ ...current, [field]: value }));
  const valid = Boolean(draft.label && draft.address?.trim() && draft.area?.trim() && draft.city?.trim());
  return <form onSubmit={(event) => { event.preventDefault(); if (!valid) return; onSave({ ...draft, id: draft.id || `address-${Date.now()}`, fullAddress: `${draft.address}, ${draft.area}` }); }} className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6"><h2 className="text-xl font-bold text-foreground">{address ? "Edit Address" : "Add New Address"}</h2><div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-foreground">Address Label<select value={draft.label} onChange={(event) => update("label", event.target.value)} className={inputClass}><option>Home</option><option>Office</option><option>Other</option></select></label><label className="text-sm font-semibold text-foreground sm:col-span-2">Full Address<input required value={draft.address} onChange={(event) => update("address", event.target.value)} className={inputClass} /></label><label className="text-sm font-semibold text-foreground">Area<input required value={draft.area} onChange={(event) => update("area", event.target.value)} className={inputClass} /></label><label className="text-sm font-semibold text-foreground">City<input required value={draft.city} onChange={(event) => update("city", event.target.value)} className={inputClass} /></label><label className="text-sm font-semibold text-foreground sm:col-span-2">Landmark <span className="font-normal text-muted">(optional)</span><input value={draft.landmark} onChange={(event) => update("landmark", event.target.value)} className={inputClass} /></label></div><div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><button type="button" onClick={onCancel} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-5 text-sm font-semibold text-foreground hover:border-brand hover:text-brand">Cancel</button><button type="submit" disabled={!valid} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-40">Save Address</button></div></form>;
}
