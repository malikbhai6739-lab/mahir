"use client";

import Link from "next/link";
import { useState } from "react";
import { EmailLoginForm } from "./email-login-form";
import { GoogleSignInButton } from "./google-sign-in-button";

export type LoginMode = "choice" | "email";

export function LoginForm({
  nextPath,
  initialMethod,
}: {
  nextPath: string;
  initialMethod?: string;
}) {
  const [mode, setMode] = useState<LoginMode>(() => {
    if (initialMethod === "email") return "email";
    return "choice";
  });

  if (mode === "email") {
    return (
      <EmailLoginForm
        nextPath={nextPath}
        onBack={() => setMode("choice")}
      />
    );
  }

  return (
    <div className="rounded-[1.5rem] border border-line bg-white p-6 shadow-card sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.13em] text-brand">Sign in</p>
      <h1 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-foreground">Welcome to Mahir</h1>
      <p className="mt-3 text-base leading-7 text-muted">
        Sign in to manage your bookings, orders, and saved addresses.
      </p>

      <div className="mt-8 space-y-3">
        <GoogleSignInButton nextPath={nextPath} />

        <button
          type="button"
          onClick={() => setMode("email")}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 text-base font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          <svg
            className="h-5 w-5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
          Continue with Email
        </button>
      </div>

      <p className="mt-6 text-center text-xs leading-5 text-muted">
        By continuing, you agree to our{" "}
        <Link href="/#footer" className="font-semibold text-brand hover:text-brand-dark">
          Terms &amp; Conditions
        </Link>{" "}
        and{" "}
        <Link href="/#footer" className="font-semibold text-brand hover:text-brand-dark">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
