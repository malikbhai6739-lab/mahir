"use client";

import Link from "next/link";
import { useState } from "react";
import { OrderCard } from "@/components/orders/order-card";
import { AccountNavigation } from "@/components/profile/account-navigation";
import { PersonalInfoForm } from "@/components/profile/personal-info-form";
import { ProfileSummary } from "@/components/profile/profile-summary";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { mockOrders } from "@/data/orders";
import { mockCustomerProfile, type CustomerProfile } from "@/data/profile";

export default function ProfilePage() {
  const [profile, setProfile] = useState<CustomerProfile>(mockCustomerProfile);
  const upcomingOrder = mockOrders.find((order) => order.status !== "completed" && order.status !== "cancelled");
  const recentOrders = mockOrders.filter((order) => order.status === "completed").slice(0, 3);

  return (
    <>
      <SiteHeader />
      <main className="bg-background pb-24">
        <div className="site-container py-10 sm:py-14">
          <div className="mb-8"><p className="text-xs font-semibold uppercase tracking-[0.13em] text-brand">Your account</p><h1 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">My Profile</h1><p className="mt-3 max-w-2xl text-base leading-7 text-muted sm:text-lg">Manage your account, bookings, and saved information.</p></div>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)]">
            <div className="space-y-8">
              <ProfileSummary profile={profile} onEdit={() => document.getElementById("personal-information")?.scrollIntoView({ behavior: "smooth" })} />
              {upcomingOrder ? <section aria-labelledby="upcoming-booking-heading"><div className="mb-4 flex items-center justify-between gap-4"><h2 id="upcoming-booking-heading" className="text-2xl font-bold text-foreground">Upcoming Booking</h2><Link href={`/orders/${upcomingOrder.id}`} className="text-sm font-semibold text-brand hover:text-brand-dark">View Order</Link></div><OrderCard order={upcomingOrder} /></section> : <section className="rounded-2xl border border-line bg-white p-6 text-center shadow-card"><h2 className="text-xl font-bold text-foreground">No upcoming bookings</h2><p className="mt-2 text-sm text-muted">Choose a service to get started.</p><Link href="/services" className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-dark">Browse Services</Link></section>}
              <section aria-labelledby="recent-orders-heading"><div className="mb-4 flex items-center justify-between gap-4"><h2 id="recent-orders-heading" className="text-2xl font-bold text-foreground">Recent Orders</h2><Link href="/orders" className="text-sm font-semibold text-brand hover:text-brand-dark">View all</Link></div><div className="space-y-4">{recentOrders.length ? recentOrders.map((order) => <OrderCard key={order.id} order={order} />) : <p className="rounded-2xl border border-line bg-white p-6 text-sm text-muted">No recent orders yet.</p>}</div></section>
              <PersonalInfoForm profile={profile} onSave={setProfile} />
              <section id="support" className="rounded-2xl border border-line bg-white p-5 shadow-card"><h2 className="text-xl font-bold text-foreground">Help &amp; Support</h2><p className="mt-2 text-sm leading-6 text-muted">Need help with a booking or your account? Our support team is here to help.</p><button type="button" className="mt-4 inline-flex min-h-11 rounded-xl border border-line px-4 text-sm font-semibold text-foreground hover:border-brand hover:text-brand">Contact Support</button></section>
            </div>
            <aside className="lg:sticky lg:top-24 lg:h-fit"><AccountNavigation /></aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
