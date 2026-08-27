import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { PhoneLoginForm } from "@/components/auth/phone-login-form";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = { title: "Login | Mahir Company" };

type LoginPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { next = "/profile" } = await searchParams;
  return <><SiteHeader /><AuthShell asideTitle="Trusted help, whenever home needs it." asideText="Sign in with your mobile number to keep your service journey simple and connected."><PhoneLoginForm nextPath={next} /></AuthShell><SiteFooter /></>;
}
