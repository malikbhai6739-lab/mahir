import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { CartProvider } from "@/components/cart/cart-context";
import { OrderProvider } from "@/components/orders/order-context";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mahir Company | Trusted Home Services in Pakistan",
  description:
    "Book verified professionals for home repairs, cleaning, maintenance, and more with Mahir Company.",
  openGraph: {
    title: "Mahir Company | Trusted Home Services in Pakistan",
    description:
      "Reliable home services from verified professionals, booked around your schedule.",
    type: "website",
    siteName: "Mahir Company",
  },
  twitter: {
    card: "summary",
    title: "Mahir Company | Trusted Home Services in Pakistan",
    description:
      "Reliable home services from verified professionals, booked around your schedule.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-PK"
      className={`${geist.variable} antialiased`}
      data-scroll-behavior="smooth"
    >
      <body>
        <CartProvider>
          <OrderProvider>{children}</OrderProvider>
        </CartProvider>
      </body>
    </html>
  );
}
