"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  clearAuthToken,
  getAuthToken,
  logoutCustomer,
  MahirApiError,
} from "@/lib/mahir-api";

const links = [
  { label: "My Orders", text: "Track your service bookings.", href: "/orders" },
  { label: "Saved Addresses", text: "Manage service locations.", href: "/addresses" },
  { label: "Personal Information", text: "Update your account details.", href: "#personal-information" },
  { label: "Help & Support", text: "Get help with a booking.", href: "#support" },
];

export function AccountNavigation() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    const token = getAuthToken();
    if (!token) {
      clearAuthToken();
      router.replace("/login");
      return;
    }

    try {
      setIsLoggingOut(true);
      setLogoutError(null);

      await logoutCustomer(token);

      clearAuthToken();
      router.replace("/login");
    } catch (err) {
      if (err instanceof MahirApiError && err.status === 401) {
        clearAuthToken();
        router.replace("/login");
        return;
      }

      setLogoutError("Unable to log out right now. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div>
      <nav aria-label="Account options" className="grid gap-3 sm:grid-cols-2">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="rounded-2xl border border-line bg-white p-4 transition-colors hover:border-brand hover:bg-brand-soft"
          >
            <span className="font-semibold text-foreground">{link.label}</span>
            <span className="mt-1 block text-sm leading-6 text-muted">{link.text}</span>
          </Link>
        ))}
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          aria-busy={isLoggingOut}
          className="rounded-2xl border border-line bg-white p-4 text-left transition-colors hover:border-red-200 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="font-semibold">
            {isLoggingOut ? "Logging out..." : "Logout"}
          </span>
          <span className="mt-1 block text-sm leading-6 text-muted">
            {isLoggingOut ? "Ending your session..." : "Sign out of this device."}
          </span>
        </button>
      </nav>
      {logoutError ? (
        <p role="alert" className="mt-2 text-xs font-semibold text-red-600">
          {logoutError}
        </p>
      ) : null}
    </div>
  );
}
