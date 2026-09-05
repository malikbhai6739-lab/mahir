import type { Address, CustomerDetails } from "@/components/booking/types";

type AddressStepProps = {
  addresses: Address[];
  selectedAddressId: string;
  customer: CustomerDetails;
  showNewAddress: boolean;
  addressesLoading: boolean;
  addressesError: string | null;
  onRetryAddresses: () => void;
  onSelectAddress: (id: string) => void;
  onToggleNewAddress: () => void;
  onCustomerChange: (field: keyof CustomerDetails, value: string) => void;
  onContinue: () => void;
};

const inputClass = "mt-2 h-12 w-full rounded-xl border border-line bg-white px-3 text-base text-foreground outline-none focus:border-brand";

export function AddressStep({
  addresses,
  selectedAddressId,
  customer,
  showNewAddress,
  addressesLoading,
  addressesError,
  onRetryAddresses,
  onSelectAddress,
  onToggleNewAddress,
  onCustomerChange,
  onContinue,
}: AddressStepProps) {
  const canContinue = showNewAddress
    ? customer.fullName.trim() && customer.phone.trim() && customer.address.trim() && customer.area.trim() && customer.city.trim()
    : selectedAddressId;

  return (
    <section aria-labelledby="address-heading">
      <p className="text-xs font-semibold uppercase tracking-[0.13em] text-brand">Step 1</p>
      <h1 id="address-heading" className="mt-3 text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
        Where do you need the service?
      </h1>
      <p className="mt-3 text-base leading-7 text-muted">Choose a saved address or add a new service location.</p>

      {addressesLoading ? (
        <div className="mt-8 rounded-2xl border border-line bg-white p-5 text-sm text-muted">
          Loading saved addresses...
        </div>
      ) : null}

      {addressesError ? (
        <div
          role="alert"
          className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900"
        >
          <p>{addressesError}</p>
          <button
            type="button"
            onClick={onRetryAddresses}
            className="mt-3 font-semibold text-brand hover:text-brand-dark"
          >
            Try loading saved addresses again
          </button>
        </div>
      ) : null}

      {!addressesLoading && !addressesError && !addresses.length ? (
        <p className="mt-8 rounded-2xl border border-line bg-white p-5 text-sm text-muted">
          You do not have any saved addresses yet. Enter a new service location
          below.
        </p>
      ) : null}

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {addresses.map((address) => (
          <button
            key={address.id}
            type="button"
            onClick={() => { onSelectAddress(address.id); }}
            className={`rounded-2xl border p-5 text-left transition-colors ${selectedAddressId === address.id && !showNewAddress ? "border-brand bg-brand-soft" : "border-line bg-white hover:border-brand/50"}`}
            aria-pressed={selectedAddressId === address.id && !showNewAddress}
          >
            <span className="flex items-center justify-between gap-3">
              <span className="font-semibold text-foreground">{address.label}</span>
              {address.isDefault ? (
                <span className="rounded-full bg-brand-soft px-2 py-1 text-xs font-bold text-brand">
                  Default
                </span>
              ) : selectedAddressId === address.id && !showNewAddress ? (
                <span className="text-sm font-bold text-brand">Selected</span>
              ) : null}
            </span>
            <span className="mt-3 block text-sm leading-6 text-muted">{address.fullAddress}</span>
            <span className="mt-1 block text-sm font-medium text-foreground">{address.city}</span>
          </button>
        ))}
      </div>

      {addresses.length ? (
        <button type="button" onClick={onToggleNewAddress} className={`mt-4 inline-flex min-h-11 items-center rounded-xl border px-4 text-sm font-semibold transition-colors ${showNewAddress ? "border-brand bg-brand-soft text-brand" : "border-line bg-white text-foreground hover:border-brand hover:text-brand"}`}>
          {showNewAddress ? "Use a Saved Address" : "Add New Address"}
        </button>
      ) : null}

      {showNewAddress ? (
        <div className="mt-6 rounded-2xl border border-line bg-white p-5 sm:p-6">
          <h2 className="text-xl font-bold text-foreground">New address details</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-foreground">Full name<input required value={customer.fullName} onChange={(event) => onCustomerChange("fullName", event.target.value)} className={inputClass} /></label>
            <label className="text-sm font-semibold text-foreground">Phone number<input required type="tel" value={customer.phone} onChange={(event) => onCustomerChange("phone", event.target.value)} className={inputClass} /></label>
            <label className="text-sm font-semibold text-foreground sm:col-span-2">Email <span className="font-normal text-muted">(optional)</span><input type="email" value={customer.email} onChange={(event) => onCustomerChange("email", event.target.value)} className={inputClass} /></label>
            <label className="text-sm font-semibold text-foreground sm:col-span-2">Address<input required value={customer.address} onChange={(event) => onCustomerChange("address", event.target.value)} className={inputClass} /></label>
            <label className="text-sm font-semibold text-foreground">Area<input required value={customer.area} onChange={(event) => onCustomerChange("area", event.target.value)} className={inputClass} /></label>
            <label className="text-sm font-semibold text-foreground">City<input required value={customer.city} onChange={(event) => onCustomerChange("city", event.target.value)} className={inputClass} /></label>
            <label className="text-sm font-semibold text-foreground sm:col-span-2">Landmark <span className="font-normal text-muted">(optional)</span><input value={customer.landmark} onChange={(event) => onCustomerChange("landmark", event.target.value)} className={inputClass} /></label>
          </div>
        </div>
      ) : null}

      <div className="mt-8 flex justify-end">
        <button type="button" onClick={onContinue} disabled={!canContinue} className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-brand px-6 text-base font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto">Continue</button>
      </div>
    </section>
  );
}
