import type { Metadata } from "next";
import { OrderDetailRoute } from "@/components/orders/order-detail-route";

export const metadata: Metadata = {
  title: "Order Details",
  robots: {
    index: false,
    follow: false,
  },
};

type OrderDetailPageProps = { params: Promise<{ id: string }> };

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params;
  return <OrderDetailRoute orderId={id} />;
}
