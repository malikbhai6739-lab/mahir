"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { OrderCard } from "@/components/orders/order-card";
import { AccountNavigation } from "@/components/profile/account-navigation";
import { PersonalInfoForm } from "@/components/profile/personal-info-form";
import { ProfileSummary } from "@/components/profile/profile-summary";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { mockOrders } from "@/data/orders";
import type { CustomerProfile } from "@/data/profile";
import { getCurrentCustomer, type AuthCustomer } from "@/lib/mahir-api";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [customer, setCustomer] = useState<AuthCustomer | null>(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const profile: CustomerProfile | null = customer
    ? {
        fullName: customer.full_name?.trim() || "Mahir Customer",
        phone: customer.phone,
        email: customer.email?.trim() || "Email not added",
        city: "Not specified",
      }
    : null;

  useEffect(() => {
    let active = true;

    async function checkAuth() {
      try {
        const current = await getCurrentCustomer();
        if (!active) return;

        if (!current) {
          // Unauthenticated or expired session (401 handled by helper)
          router.replace("/login?next=/profile");
          return;
        }

        setCustomer(current);
      } catch (err) {
        if (!active) return;
        // Network or 5xx server error: do not silently clear token or log out
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load your profile. Please check your internet connection."
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    checkAuth();

    return () => {
      active = false;
    };
  }, [router, reloadTrigger]);

  const retryLoad = () => {
    setLoading(true);
    setError(null);
    setReloadTrigger((count) => count + 1);
  };

  const upcomingOrder = mockOrders.find(
    (order) => order.status !== "completed" && order.status !== "cancelled"
  );
  const recentOrders = mockOrders
    .filter((order) => order.status === "completed")
    .slice(0, 3);

  if (loading) {
    return (
      <>
        <SiteHeader />
        <main className="bg-background pb-24">
          <div className="site-container py-16 sm:py-24">
            <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
              <div
                className="inline-block size-9 animate-spin rounded-full border-4 border-brand border-r-transparent"
                role="status"
              >
                <span className="sr-only">Loading your profile...</span>
              </div>
              <p className="mt-4 text-sm font-medium text-muted">
                Loading your profile...
              </p>
            </div>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  if (error) {
    return (
      <>
        <SiteHeader />
        <main className="bg-background pb-24">
          <div className="site-container py-16 sm:py-24">
            <div className="mx-auto max-w-md rounded-[1.5rem] border border-line bg-white p-6 text-center shadow-card sm:p-8">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-red-50 text-red-600">
                <svg
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h2 className="mt-4 text-xl font-bold text-foreground">
                Unable to load profile
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted">{error}</p>
              <button
                type="button"
                onClick={retryLoad}
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
              >
                Try Again
              </button>
            </div>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  if (!customer || !profile) {
    return null;
  }

  return (
    <>
      <SiteHeader />
      <main className="bg-background pb-24">
        <div className="site-container py-10 sm:py-14">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.13em] text-brand">
              Your account
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
              My Profile
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted sm:text-lg">
              Manage your account, bookings, and saved information.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)]">
            <div className="space-y-8">
              <ProfileSummary profile={profile} />
              {upcomingOrder ? (
                <section aria-labelledby="upcoming-booking-heading">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <h2
                      id="upcoming-booking-heading"
                      className="text-2xl font-bold text-foreground"
                    >
                      Upcoming Booking
                    </h2>
                    <Link
                      href={`/orders/${upcomingOrder.id}`}
                      className="text-sm font-semibold text-brand hover:text-brand-dark"
                    >
                      View Order
                    </Link>
                  </div>
                  <OrderCard order={upcomingOrder} />
                </section>
              ) : (
                <section className="rounded-2xl border border-line bg-white p-6 text-center shadow-card">
                  <h2 className="text-xl font-bold text-foreground">
                    No upcoming bookings
                  </h2>
                  <p className="mt-2 text-sm text-muted">
                    Choose a service to get started.
                  </p>
                  <Link
                    href="/services"
                    className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-dark"
                  >
                    Browse Services
                  </Link>
                </section>
              )}
              <section aria-labelledby="recent-orders-heading">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <h2
                    id="recent-orders-heading"
                    className="text-2xl font-bold text-foreground"
                  >
                    Recent Orders
                  </h2>
                  <Link
                    href="/orders"
                    className="text-sm font-semibold text-brand hover:text-brand-dark"
                  >
                    View all
                  </Link>
                </div>
                <div className="space-y-4">
                  {recentOrders.length ? (
                    recentOrders.map((order) => (
                      <OrderCard key={order.id} order={order} />
                    ))
                  ) : (
                    <p className="rounded-2xl border border-line bg-white p-6 text-sm text-muted">
                      No recent orders yet.
                    </p>
                  )}
                </div>
              </section>
              <PersonalInfoForm profile={profile} />
              <section
                id="support"
                className="rounded-2xl border border-line bg-white p-5 shadow-card"
              >
                <h2 className="text-xl font-bold text-foreground">
                  Help &amp; Support
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Need help with a booking or your account? Our support team is
                  here to help.
                </p>
                <button
                  type="button"
                  className="mt-4 inline-flex min-h-11 rounded-xl border border-line px-4 text-sm font-semibold text-foreground hover:border-brand hover:text-brand"
                >
                  Contact Support
                </button>
              </section>
            </div>
            <aside className="lg:sticky lg:top-24 lg:h-fit">
              <AccountNavigation />
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
