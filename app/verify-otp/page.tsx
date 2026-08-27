import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { OtpVerificationForm } from "@/components/auth/otp-verification-form";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = { title: "Verify Number | Mahir Company" };

type VerifyOtpPageProps = {
  searchParams: Promise<{ phone?: string; next?: string }>;
};

export default async function VerifyOtpPage({ searchParams }: VerifyOtpPageProps) {
  const { phone = "3001234567", next = "/profile" } = await searchParams;
  return <><SiteHeader /><AuthShell asideTitle="One small step to get things moving." asideText="Use the verification code to continue your Mahir service journey."><OtpVerificationForm phone={phone} nextPath={next} /></AuthShell><SiteFooter /></>;
}
