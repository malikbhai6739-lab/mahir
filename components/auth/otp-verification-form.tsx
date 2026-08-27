"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function maskPhone(phone: string) {
  return `+92 ${phone.slice(0, 1)}** *** ${phone.slice(-4)}`;
}

export function OtpVerificationForm({ phone, nextPath }: { phone: string; nextPath: string }) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [seconds, setSeconds] = useState(30);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (seconds === 0) return;
    const timer = window.setInterval(() => setSeconds((current) => Math.max(current - 1, 0)), 1000);
    return () => window.clearInterval(timer);
  }, [seconds]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!/^\d{6}$/.test(code)) {
      setError("Enter the 6-digit verification code.");
      return;
    }
    if (code !== "123456") {
      setError("The code you entered is incorrect.");
      return;
    }
    window.sessionStorage.setItem("mahir-auth-verified", "true");
    const destination = nextPath.startsWith("/") && !nextPath.startsWith("//") ? nextPath : "/profile";
    router.replace(destination);
  };

  const resendCode = () => {
    setSeconds(30);
    setSent(true);
    setError("");
  };

  return (
    <div className="rounded-[1.5rem] border border-line bg-white p-6 shadow-card sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.13em] text-brand">Verification</p>
      <h1 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-foreground">Verify Your Number</h1>
      <p className="mt-3 text-base leading-7 text-muted">Enter the code sent to <span className="font-semibold text-foreground">{maskPhone(phone)}</span>.</p>
      <form onSubmit={handleSubmit} noValidate className="mt-8">
        <label htmlFor="otp-code" className="text-sm font-semibold text-foreground">6-digit verification code</label>
        <input id="otp-code" name="otp" type="text" inputMode="numeric" autoComplete="one-time-code" maxLength={6} pattern="[0-9]{6}" value={code} onChange={(event) => { setCode(event.target.value.replace(/\D/g, "").slice(0, 6)); setError(""); }} aria-invalid={Boolean(error)} aria-describedby={error ? "otp-error" : "otp-help"} className={`mt-2 h-16 w-full rounded-xl border bg-background px-4 text-center text-3xl font-bold tracking-[0.5em] text-foreground outline-none focus:border-brand ${error ? "border-red-500" : "border-line"}`} placeholder="------" />
        {error ? <p id="otp-error" role="alert" className="mt-2 text-sm text-red-600">{error}</p> : <p id="otp-help" className="mt-2 text-sm text-muted">For this demo, use 123456.</p>}
        <button type="submit" className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-brand px-5 text-base font-semibold text-white transition-colors hover:bg-brand-dark">Verify</button>
      </form>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm"><button type="button" onClick={() => router.push(`/login?next=${encodeURIComponent(nextPath)}`)} className="font-semibold text-brand hover:text-brand-dark">Change phone number</button>{seconds > 0 ? <span className="text-muted">Resend in 00:{String(seconds).padStart(2, "0")}</span> : <button type="button" onClick={resendCode} className="font-semibold text-brand hover:text-brand-dark">Resend code</button>}</div>
      {sent ? <p className="mt-4 text-sm text-success" role="status">A new verification code has been sent.</p> : null}
    </div>
  );
}
