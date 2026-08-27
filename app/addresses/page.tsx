"use client";

import { useEffect, useState } from "react";
import { AddressCard } from "@/components/addresses/address-card";
import { AddressForm } from "@/components/addresses/address-form";
import type { Address } from "@/components/booking/types";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { mockSavedAddresses } from "@/data/profile";

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | undefined>();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const stored = window.localStorage.getItem("mahir-addresses-v1");
        const parsed = stored ? JSON.parse(stored) as Address[] : null;
        setAddresses(Array.isArray(parsed) ? parsed : mockSavedAddresses);
      } catch {
        setAddresses(mockSavedAddresses);
      }
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem("mahir-addresses-v1", JSON.stringify(addresses));
  }, [addresses, hydrated]);

  const saveAddress = (address: Address) => {
    setAddresses((current) => {
      const exists = current.some((item) => item.id === address.id);
      return exists ? current.map((item) => item.id === address.id ? { ...address, isDefault: item.isDefault } : item) : [...current, { ...address, isDefault: current.length === 0 }];
    });
    setShowForm(false);
    setEditingAddress(undefined);
  };

  const deleteAddress = (id: string) => {
    setAddresses((current) => {
      const deleted = current.find((item) => item.id === id);
      const remaining = current.filter((item) => item.id !== id);
      if (deleted?.isDefault && remaining.length) remaining[0] = { ...remaining[0], isDefault: true };
      return remaining;
    });
  };

  const setDefault = (id: string) => setAddresses((current) => current.map((item) => ({ ...item, isDefault: item.id === id })));

  if (!hydrated) return <><SiteHeader /><main className="bg-background pb-24"><div className="site-container py-14"><div className="mx-auto max-w-xl rounded-2xl border border-line bg-white p-8 text-center shadow-card"><h1 className="text-3xl font-bold text-foreground">Loading your addresses</h1></div></div></main><SiteFooter /></>;

  return <><SiteHeader /><main className="bg-background pb-24"><div className="site-container py-10 sm:py-14"><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.13em] text-brand">Your account</p><h1 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">Saved Addresses</h1><p className="mt-3 text-base leading-7 text-muted sm:text-lg">Manage the locations you use for service bookings.</p></div><button type="button" onClick={() => { setEditingAddress(undefined); setShowForm(true); }} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-dark">Add New Address</button></div>{showForm ? <div className="mt-8"><AddressForm address={editingAddress} onSave={saveAddress} onCancel={() => { setShowForm(false); setEditingAddress(undefined); }} /></div> : null}<div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{addresses.length ? addresses.map((address) => <AddressCard key={address.id} address={address} onEdit={() => { setEditingAddress(address); setShowForm(true); }} onDelete={() => deleteAddress(address.id)} onSetDefault={() => setDefault(address.id)} />) : <div className="rounded-[1.5rem] border border-line bg-white p-8 text-center shadow-card sm:col-span-2 sm:p-12 xl:col-span-3"><h2 className="text-2xl font-bold text-foreground">No saved addresses</h2><p className="mx-auto mt-3 max-w-md text-base leading-7 text-muted">Save an address to make future bookings faster.</p><button type="button" onClick={() => setShowForm(true)} className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-6 text-base font-semibold text-white hover:bg-brand-dark">Add Address</button></div>}</div></div></main><SiteFooter /></>;
}
