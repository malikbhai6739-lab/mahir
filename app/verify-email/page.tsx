import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/auth-shell";
import { EmailVerificationForm } from "@/components/auth/email-verification-form";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { sanitizeNextPath } from "@/lib/auth-storage";

export const metadata: Metadata = {
  title: "Verify Email",
  robots: {
    index: false,
    follow: false,
  },
};

type VerifyEmailPageProps = {
  searchParams: Promise<{ email?: string; next?: string }>;
};

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const { email, next = "/profile" } = await searchParams;

  if (!email || !email.trim()) {
    const sanitizedNext = sanitizeNextPath(next);
    const nextParam =
      sanitizedNext !== "/profile"
        ? `?next=${encodeURIComponent(sanitizedNext)}`
        : "";
    redirect(`/login${nextParam}`);
  }

  return (
    <>
      <SiteHeader />
      <AuthShell
        asideTitle="One small step to get things moving."
        asideText="Enter the verification code sent to your email to continue your Mahir service journey."
      >
        <EmailVerificationForm email={email.trim()} nextPath={next} />
      </AuthShell>
      <SiteFooter />
    </>
  );
}
