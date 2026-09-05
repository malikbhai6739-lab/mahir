import type { MahirAddress } from "@/lib/mahir-api";

type AddressCardProps = {
  address: MahirAddress;
  onEdit: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
  busyAction?: "deleting" | "defaulting";
  disabled: boolean;
};

export function AddressCard({
  address,
  onEdit,
  onDelete,
  onSetDefault,
  busyAction,
  disabled,
}: AddressCardProps) {
  return (
    <article className="rounded-2xl border border-line bg-white p-5 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-foreground">
            {address.label?.trim() || "Saved address"}
          </h2>
          {address.is_default ? (
            <span className="mt-2 inline-flex rounded-full bg-brand-soft px-2.5 py-1 text-xs font-bold text-brand">
              Default
            </span>
          ) : null}
        </div>
        <button
          type="button"
          disabled={disabled}
          onClick={onEdit}
          className="min-h-10 rounded-xl border border-line px-3 text-sm font-semibold text-foreground hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-50"
        >
          Edit
        </button>
      </div>
      <p className="mt-4 text-sm leading-6 text-muted">
        {address.address_line}
      </p>
      <p className="mt-1 text-sm text-muted">
        {address.area ? `${address.area}, ${address.city}` : address.city}
      </p>
      {address.notes ? (
        <p className="mt-1 text-sm text-muted">Notes: {address.notes}</p>
      ) : null}
      <div className="mt-5 flex flex-wrap gap-3 border-t border-line pt-4">
        {!address.is_default ? (
          <button
            type="button"
            disabled={disabled}
            onClick={onSetDefault}
            className="text-sm font-semibold text-brand hover:text-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busyAction === "defaulting" ? "Setting default..." : "Set as default"}
          </button>
        ) : null}
        <button
          type="button"
          disabled={disabled}
          onClick={onDelete}
          className="text-sm font-semibold text-muted hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {busyAction === "deleting" ? "Deleting..." : "Delete"}
        </button>
      </div>
    </article>
  );
}
