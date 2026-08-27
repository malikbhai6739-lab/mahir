"use client";

import type { OrderTab } from "@/data/orders";

type OrderTabsProps = { activeTab: OrderTab; onChange: (tab: OrderTab) => void };

const tabs: { id: OrderTab; label: string }[] = [
  { id: "upcoming", label: "Upcoming" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
];

export function OrderTabs({ activeTab, onChange }: OrderTabsProps) {
  return <div role="tablist" aria-label="Order status" className="flex w-full overflow-x-auto rounded-xl border border-line bg-white p-1 sm:w-fit">{tabs.map((tab) => <button key={tab.id} type="button" role="tab" aria-selected={activeTab === tab.id} onClick={() => onChange(tab.id)} className={`min-h-11 flex-1 whitespace-nowrap rounded-lg px-5 text-sm font-semibold transition-colors sm:flex-none ${activeTab === tab.id ? "bg-brand text-white" : "text-muted hover:text-brand"}`}>{tab.label}</button>)}</div>;
}
