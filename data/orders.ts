export type OrderTab = "upcoming" | "completed" | "cancelled";

export function getOrderTab(status: string): OrderTab {
  if (status === "completed") return "completed";
  if (status === "cancelled") return "cancelled";
  return "upcoming";
}

export function getOrderStatusLabel(status: string) {
  return status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
