export type OrderTab = "upcoming" | "completed" | "cancelled";

export function normalizeOrderStatus(status: string): string {
  return typeof status === "string" ? status.trim().toLowerCase() : "";
}

export function getOrderTab(status: string): OrderTab {
  const normalized = normalizeOrderStatus(status);
  if (normalized === "completed") return "completed";
  if (normalized === "cancelled") return "cancelled";
  return "upcoming";
}

export function isUpcomingOrderStatus(status: string): boolean {
  const normalized = normalizeOrderStatus(status);
  return normalized !== "completed" && normalized !== "cancelled";
}

export function isRecentOrderStatus(status: string): boolean {
  const normalized = normalizeOrderStatus(status);
  return normalized === "completed" || normalized === "cancelled";
}

export function getOrderStatusLabel(status: string) {
  const normalized = normalizeOrderStatus(status);
  if (normalized === "confirmed") return "Confirmed";
  if (normalized === "completed") return "Completed";
  if (normalized === "cancelled") return "Cancelled";
  return normalized
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
