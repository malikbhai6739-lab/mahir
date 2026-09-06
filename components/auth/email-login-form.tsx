"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { requestEmailCode, sanitizeNextPath, MahirApiError } from "@/lib/mahir-api";

export function EmailLoginForm({
  nextPath,
  onBack,
  onSwitchToPhone,
}: {
  nextPath: string;
  onBack?: () => void;
  onSwitchToPhone?: () => void;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await requestEmailCode(trimmedEmail);

      const sanitizedNext = sanitizeNextPath(nextPath);
      const query = new URLSearchParams({ email: trimmedEmail });
      if (sanitizedNext !== "/profile") {
        query.set("next", sanitizedNext);
      }
      router.push(`/verify-email?${query.toString()}`);
    } catch (err) {
      if (err instanceof MahirApiError) {
        if (err.status === 429) {
          setError("Please wait before requesting another verification code.");
        } else {
          setError(err.message);
        }
      } else if (err instanceof Error) {
        setError(err.message || "Failed to send verification code. Please try again.");
      } else {
        setError("Failed to send verification code. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-[1.5rem] border border-line bg-white p-6 shadow-card sm:p-8">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.13em] text-muted transition-colors hover:text-brand"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back
        </button>
      ) : (
        <p className="text-xs font-semibold uppercase tracking-[0.13em] text-brand">Sign in</p>
      )}
      <h1 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-foreground">Sign in with Email</h1>
      <p className="mt-3 text-base leading-7 text-muted">
        Enter your email address and we&apos;ll send you a verification code.
      </p>
      <form onSubmit={handleSubmit} noValidate className="mt-8">
        <label htmlFor="email-address" className="text-sm font-semibold text-foreground">
          Email address
        </label>
        <input
          id="email-address"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          disabled={loading}
          onChange={(event) => {
            setEmail(event.target.value);
            setError("");
          }}
          placeholder="name@example.com"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "email-error" : "email-help"}
          className={`mt-2 h-12 w-full rounded-xl border bg-white px-3 text-base text-foreground outline-none focus:border-brand disabled:opacity-60 ${
            error ? "border-red-500" : "border-line"
          }`}
        />
        {error ? (
          <p id="email-error" role="alert" className="mt-2 text-sm text-red-600">
            {error}
          </p>
        ) : (
          <p id="email-help" className="mt-2 text-sm text-muted">
            We&apos;ll send a 6-digit code to this email.
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-brand px-5 text-base font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Sending code..." : "Continue"}
        </button>
      </form>
      {onSwitchToPhone ? (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={onSwitchToPhone}
            className="text-sm font-semibold text-brand hover:text-brand-dark"
          >
            Continue with phone instead
          </button>
        </div>
      ) : null}
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
