import { notFound } from "next/navigation";
import { OrderDetail } from "@/components/orders/order-detail";
import { getOrderById } from "@/data/orders";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

type OrderDetailPageProps = { params: Promise<{ id: string }> };

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params;
  const order = getOrderById(id);
  if (!order) notFound();
  return <><SiteHeader /><OrderDetail order={order} /><SiteFooter /></>;
}
