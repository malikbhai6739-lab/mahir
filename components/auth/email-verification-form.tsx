"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  verifyEmailCode,
  requestEmailCode,
  setAuthToken,
  sanitizeNextPath,
  MahirApiError,
} from "@/lib/mahir-api";

export function maskEmail(email: string): string {
  if (!email || !email.includes("@")) return email;
  const [localPart, domain] = email.split("@");
  if (!localPart || !domain) return email;

  if (localPart.length <= 1) {
    return `${localPart}***@${domain}`;
  }
  if (localPart.length === 2) {
    return `${localPart[0]}*@${domain}`;
  }
  const maskedLocal = localPart[0] + "*".repeat(localPart.length - 1);
  return `${maskedLocal}@${domain}`;
}

export function EmailVerificationForm({
  email,
  nextPath,
}: {
  email: string;
  nextPath: string;
}) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [resending, setResending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (seconds === 0) return;
    const timer = window.setInterval(
      () => setSeconds((current) => Math.max(current - 1, 0)),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [seconds]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email) {
      setError("Email address is missing. Please return to login.");
      return;
    }

    if (!/^\d{6}$/.test(code)) {
      setError("Enter the 6-digit verification code.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await verifyEmailCode(email, code);
      const token = response.data?.token;

      if (!token) {
        throw new Error("Invalid response from verification server.");
      }

      setAuthToken(token);

      const destination = sanitizeNextPath(nextPath);
      router.replace(destination);
    } catch (err) {
      if (err instanceof MahirApiError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message || "Verification failed. Please try again.");
      } else {
        setError("Verification failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const resendCode = async () => {
    if (!email) {
      setError("Email address is missing. Please return to login.");
      return;
    }

    try {
      setResending(true);
      setError("");
      setSent(false);

      await requestEmailCode(email);

      setSeconds(60);
      setSent(true);
    } catch (err) {
      if (err instanceof MahirApiError) {
        if (err.status === 429) {
          setError("Please wait before requesting another verification code.");
        } else {
          setError(err.message);
        }
      } else if (err instanceof Error) {
        setError(err.message || "Failed to resend code. Please try again.");
      } else {
        setError("Failed to resend code. Please try again.");
      }
    } finally {
      setResending(false);
    }
  };

  const sanitizedNext = sanitizeNextPath(nextPath);
  const loginUrl =
    sanitizedNext !== "/profile"
      ? `/login?next=${encodeURIComponent(sanitizedNext)}`
      : "/login";

  if (!email) {
    return (
      <div className="rounded-[1.5rem] border border-line bg-white p-6 shadow-card sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.13em] text-brand">
          Verification
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-foreground">
          Email required
        </h1>
        <p className="mt-3 text-base leading-7 text-muted">
          Please provide your email address before verifying.
        </p>
        <div className="mt-8">
          <button
            type="button"
            onClick={() => router.push(loginUrl)}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-brand px-5 text-base font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[1.5rem] border border-line bg-white p-6 shadow-card sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.13em] text-brand">
        Verification
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-foreground">
        Verify Your Email
      </h1>
      <p className="mt-3 text-base leading-7 text-muted">
        Enter the code sent to{" "}
        <span className="font-semibold text-foreground">{maskEmail(email)}</span>.
      </p>
      <form onSubmit={handleSubmit} noValidate className="mt-8">
        <label htmlFor="email-code" className="text-sm font-semibold text-foreground">
          6-digit verification code
        </label>
        <input
          id="email-code"
          name="code"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          pattern="[0-9]{6}"
          value={code}
          disabled={loading}
          onChange={(event) => {
            setCode(event.target.value.replace(/\D/g, "").slice(0, 6));
            setError("");
          }}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "code-error" : "code-help"}
          className={`mt-2 h-16 w-full rounded-xl border bg-background px-4 text-center text-3xl font-bold tracking-[0.5em] text-foreground outline-none focus:border-brand disabled:opacity-60 ${
            error ? "border-red-500" : "border-line"
          }`}
          placeholder="------"
        />
        {error ? (
          <p id="code-error" role="alert" className="mt-2 text-sm text-red-600">
            {error}
          </p>
        ) : (
          <p id="code-help" className="mt-2 text-sm text-muted">
            Enter the 6-digit code sent to your email.
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-brand px-5 text-base font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm">
        <button
          type="button"
          onClick={() => router.push(loginUrl)}
          className="font-semibold text-brand hover:text-brand-dark"
        >
          Change email address
        </button>
        {seconds > 0 ? (
          <span className="text-muted">
            Resend in 00:{String(seconds).padStart(2, "0")}
          </span>
        ) : (
          <button
            type="button"
            onClick={resendCode}
            disabled={resending}
            className="font-semibold text-brand hover:text-brand-dark disabled:opacity-60"
          >
            {resending ? "Sending..." : "Resend code"}
          </button>
        )}
      </div>
      {sent ? (
        <p className="mt-4 text-sm text-success" role="status">
          A new verification code has been sent.
        </p>
      ) : null}
    </div>
  );
}
