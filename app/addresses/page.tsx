"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AddressCard } from "@/components/addresses/address-card";
import { AddressForm } from "@/components/addresses/address-form";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  clearAuthToken,
  createAddress,
  deleteAddress,
  fetchAddresses,
  getAuthToken,
  MahirApiError,
  updateAddress,
  type MahirAddress,
  type MahirAddressInput,
} from "@/lib/mahir-api";

const loginPath = "/login?next=/addresses";

type BusyAction = {
  id: number;
  type: "deleting" | "defaulting";
};

function getLoadErrorMessage(error: unknown) {
  if (error instanceof TypeError) {
    return "Unable to reach Mahir. Check your connection and try again.";
  }

  return "Unable to load your saved addresses. Please try again.";
}

export default function AddressesPage() {
  const router = useRouter();
  const [addresses, setAddresses] = useState<MahirAddress[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [editingAddress, setEditingAddress] = useState<
    MahirAddress | undefined
  >();
  const [showForm, setShowForm] = useState(false);
  const [formSaving, setFormSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [busyAction, setBusyAction] = useState<BusyAction | null>(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const mutationInFlight = useRef(false);

  useEffect(() => {
    const token = getAuthToken();

    if (!token) {
      router.replace(loginPath);
      return;
    }

    let active = true;

    async function loadAddresses(authToken: string) {
      setLoading(true);
      setLoadError(null);

      try {
        const savedAddresses = await fetchAddresses(authToken);
        if (!active) return;

        setAddresses(savedAddresses);
      } catch (error) {
        if (!active) return;

        if (error instanceof MahirApiError && error.status === 401) {
          clearAuthToken();
          router.replace(loginPath);
          return;
        }

        setLoadError(getLoadErrorMessage(error));
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadAddresses(token);

    return () => {
      active = false;
    };
  }, [reloadTrigger, router]);

  const getTokenOrRedirect = () => {
    const token = getAuthToken();

    if (!token) {
      router.replace(loginPath);
      return null;
    }

    return token;
  };

  const handleUnauthorized = (error: unknown) => {
    if (error instanceof MahirApiError && error.status === 401) {
      clearAuthToken();
      router.replace(loginPath);
      return true;
    }

    return false;
  };

  const refreshAuthoritativeAddresses = async (token: string) => {
    try {
      setLoadError(null);
      const savedAddresses = await fetchAddresses(token);
      setAddresses(savedAddresses);
      return true;
    } catch (error) {
      if (handleUnauthorized(error)) {
        return false;
      }

      setLoadError(getLoadErrorMessage(error));
      return false;
    }
  };

  const handleSave = async (input: MahirAddressInput) => {
    if (mutationInFlight.current) return;

    const token = getTokenOrRedirect();
    if (!token) return;

    mutationInFlight.current = true;
    setFormSaving(true);
    setFormError(null);
    setActionError(null);
    setNotice(null);

    try {
      if (editingAddress) {
        await updateAddress(token, editingAddress.id, input);
      } else {
        await createAddress(token, input);
      }

      setShowForm(false);
      setEditingAddress(undefined);
      setNotice(
        editingAddress
          ? "Address updated successfully."
          : "Address added successfully.",
      );
      await refreshAuthoritativeAddresses(token);
    } catch (error) {
      if (handleUnauthorized(error)) return;

      if (error instanceof MahirApiError && error.status === 404) {
        setShowForm(false);
        setEditingAddress(undefined);
        setActionError(
          "That address no longer exists. Your address list has been refreshed.",
        );
        await refreshAuthoritativeAddresses(token);
        return;
      }

      if (error instanceof MahirApiError && error.status === 400) {
        setFormError(error.message);
      } else {
        setFormError(
          "Unable to save this address. Your changes are still here; please try again.",
        );
      }
    } finally {
      mutationInFlight.current = false;
      setFormSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (
      mutationInFlight.current ||
      !window.confirm("Delete this saved address?")
    ) {
      return;
    }

    const token = getTokenOrRedirect();
    if (!token) return;

    mutationInFlight.current = true;
    setBusyAction({ id, type: "deleting" });
    setActionError(null);
    setNotice(null);

    try {
      await deleteAddress(token, id);
      setAddresses((current) =>
        current.filter((address) => address.id !== id),
      );
      setNotice("Address deleted successfully.");
      await refreshAuthoritativeAddresses(token);
    } catch (error) {
      if (handleUnauthorized(error)) return;

      if (error instanceof MahirApiError && error.status === 404) {
        setActionError(
          "That address was already removed. Your address list has been refreshed.",
        );
        await refreshAuthoritativeAddresses(token);
      } else {
        setActionError("Unable to delete this address. Please try again.");
      }
    } finally {
      mutationInFlight.current = false;
      setBusyAction(null);
    }
  };

  const handleSetDefault = async (id: number) => {
    if (mutationInFlight.current) return;

    const token = getTokenOrRedirect();
    if (!token) return;

    mutationInFlight.current = true;
    setBusyAction({ id, type: "defaulting" });
    setActionError(null);
    setNotice(null);

    try {
      await updateAddress(token, id, {
        is_default: true,
      });
      setNotice("Default address updated.");
      await refreshAuthoritativeAddresses(token);
    } catch (error) {
      if (handleUnauthorized(error)) return;

      if (error instanceof MahirApiError && error.status === 404) {
        setActionError(
          "That address no longer exists. Your address list has been refreshed.",
        );
        await refreshAuthoritativeAddresses(token);
      } else if (error instanceof MahirApiError && error.status === 400) {
        setActionError(error.message);
      } else {
        setActionError(
          "Unable to change your default address. Please try again.",
        );
      }
    } finally {
      mutationInFlight.current = false;
      setBusyAction(null);
    }
  };

  const openNewAddressForm = () => {
    setEditingAddress(undefined);
    setFormError(null);
    setActionError(null);
    setNotice(null);
    setShowForm(true);
  };

  return (
    <>
      <SiteHeader />
      <main className="bg-background pb-24">
        <div className="site-container py-10 sm:py-14">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.13em] text-brand">
                Your account
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
                Saved Addresses
              </h1>
              <p className="mt-3 text-base leading-7 text-muted sm:text-lg">
                Manage the locations you use for service bookings.
              </p>
            </div>
            <button
              type="button"
              disabled={loading || Boolean(loadError) || Boolean(busyAction)}
              onClick={openNewAddressForm}
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              Add New Address
            </button>
          </div>

          {notice ? (
            <p
              role="status"
              className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
            >
              {notice}
            </p>
          ) : null}
          {actionError ? (
            <p
              role="alert"
              className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {actionError}
            </p>
          ) : null}

          {showForm ? (
            <div className="mt-8">
              <AddressForm
                key={editingAddress ? String(editingAddress.id) : "new"}
                address={editingAddress}
                onSave={handleSave}
                onCancel={() => {
                  setShowForm(false);
                  setEditingAddress(undefined);
                  setFormError(null);
                }}
                onChange={() => setFormError(null)}
                saving={formSaving}
                error={formError}
              />
            </div>
          ) : null}

          <div className="mt-8">
            {loading ? (
              <div className="rounded-[1.5rem] border border-line bg-white p-8 text-center shadow-card sm:p-12">
                <div
                  className="mx-auto size-9 animate-spin rounded-full border-4 border-brand border-r-transparent"
                  role="status"
                >
                  <span className="sr-only">Loading saved addresses...</span>
                </div>
                <p className="mt-4 text-sm font-medium text-muted">
                  Loading your addresses...
                </p>
              </div>
            ) : loadError ? (
              <div className="rounded-[1.5rem] border border-line bg-white p-8 text-center shadow-card sm:p-12">
                <h2 className="text-2xl font-bold text-foreground">
                  Unable to load addresses
                </h2>
                <p className="mx-auto mt-3 max-w-md text-base leading-7 text-muted">
                  {loadError}
                </p>
                <button
                  type="button"
                  onClick={() => setReloadTrigger((count) => count + 1)}
                  className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-6 text-base font-semibold text-white hover:bg-brand-dark"
                >
                  Try Again
                </button>
              </div>
            ) : addresses.length ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {addresses.map((address) => (
                  <AddressCard
                    key={address.id}
                    address={address}
                    disabled={Boolean(busyAction) || formSaving}
                    busyAction={
                      busyAction?.id === address.id
                        ? busyAction.type
                        : undefined
                    }
                    onEdit={() => {
                      setEditingAddress(address);
                      setFormError(null);
                      setActionError(null);
                      setNotice(null);
                      setShowForm(true);
                    }}
                    onDelete={() => void handleDelete(address.id)}
                    onSetDefault={() => void handleSetDefault(address.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-[1.5rem] border border-line bg-white p-8 text-center shadow-card sm:p-12">
                <h2 className="text-2xl font-bold text-foreground">
                  No saved addresses
                </h2>
                <p className="mx-auto mt-3 max-w-md text-base leading-7 text-muted">
                  Save an address to make future bookings faster.
                </p>
                <button
                  type="button"
                  onClick={openNewAddressForm}
                  className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-6 text-base font-semibold text-white hover:bg-brand-dark"
                >
                  Add Address
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
