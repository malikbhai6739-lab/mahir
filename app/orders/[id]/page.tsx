import type { Metadata } from "next";
import { OrderDetailRoute } from "@/components/orders/order-detail-route";

export const metadata: Metadata = { title: "Order Details | Mahir Company" };

type OrderDetailPageProps = { params: Promise<{ id: string }> };

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params;
  return <OrderDetailRoute orderId={id} />;
}
