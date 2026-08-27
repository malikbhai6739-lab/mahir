"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.startsWith("0")) return digits.slice(1);
  if (digits.startsWith("92")) return digits.slice(2);
  return digits;
}

export function PhoneLoginForm({ nextPath }: { nextPath: string }) {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = normalizePhone(phone);
    if (!/^3\d{9}$/.test(normalized)) {
      setError("Enter a valid mobile number.");
      return;
    }
    const query = new URLSearchParams({ phone: normalized });
    if (nextPath.startsWith("/") && !nextPath.startsWith("//")) query.set("next", nextPath);
    router.push(`/verify-otp?${query.toString()}`);
  };

  return (
    <div className="rounded-[1.5rem] border border-line bg-white p-6 shadow-card sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.13em] text-brand">Sign in</p>
      <h1 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-foreground">Welcome to Mahir</h1>
      <p className="mt-3 text-base leading-7 text-muted">Enter your mobile number to continue.</p>
      <form onSubmit={handleSubmit} noValidate className="mt-8">
        <label htmlFor="mobile-number" className="text-sm font-semibold text-foreground">Mobile number</label>
        <div className={`mt-2 flex h-12 overflow-hidden rounded-xl border bg-white ${error ? "border-red-500" : "border-line focus-within:border-brand"}`}>
          <span className="grid w-14 shrink-0 place-items-center border-r border-line bg-background text-sm font-semibold text-foreground">+92</span>
          <input id="mobile-number" name="phone" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={11} value={phone} onChange={(event) => { setPhone(event.target.value.replace(/\D/g, "")); setError(""); }} placeholder="300 1234567" aria-invalid={Boolean(error)} aria-describedby={error ? "phone-error" : "phone-help"} className="min-w-0 flex-1 px-3 text-base text-foreground outline-none" />
        </div>
        {error ? <p id="phone-error" role="alert" className="mt-2 text-sm text-red-600">{error}</p> : <p id="phone-help" className="mt-2 text-sm text-muted">We&apos;ll send you a verification code.</p>}
        <button type="submit" className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-brand px-5 text-base font-semibold text-white transition-colors hover:bg-brand-dark">Continue</button>
      </form>
      <p className="mt-6 text-center text-xs leading-5 text-muted">By continuing, you agree to our <Link href="/#footer" className="font-semibold text-brand hover:text-brand-dark">Terms &amp; Conditions</Link> and <Link href="/#footer" className="font-semibold text-brand hover:text-brand-dark">Privacy Policy</Link>.</p>
    </div>
  );
}
