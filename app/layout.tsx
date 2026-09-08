import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { CartProvider } from "@/components/cart/cart-context";
import { SITE_URL } from "@/lib/site-url";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mahir Company | Trusted Home Services in Pakistan",
    template: "%s | Mahir Company",
  },
  description:
    "Book verified professionals for home repairs, cleaning, maintenance, and more with Mahir Company.",
  openGraph: {
    title: {
      default: "Mahir Company | Trusted Home Services in Pakistan",
      template: "%s | Mahir Company",
    },
    description:
      "Reliable home services from verified professionals, booked around your schedule.",
    type: "website",
    siteName: "Mahir Company",
    url: SITE_URL,
    locale: "en_PK",
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: "Mahir Company | Trusted Home Services in Pakistan",
      template: "%s | Mahir Company",
    },
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
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
