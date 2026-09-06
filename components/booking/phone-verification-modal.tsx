"use client";

import { useEffect, useRef, useState } from "react";
import {
  getAuthToken,
  requestPhoneVerification,
  verifyPhone,
  MahirApiError,
  type AuthCustomer,
} from "@/lib/mahir-api";

type PhoneVerificationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialPhone?: string | null;
  onVerified: (customer: AuthCustomer) => void;
};

type ModalContentProps = {
  onClose: () => void;
  initialPhone?: string | null;
  onVerified: (customer: AuthCustomer) => void;
};

function PhoneVerificationModalContent({
  onClose,
  initialPhone,
  onVerified,
}: ModalContentProps) {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState(initialPhone ?? "");
  const [activePhone, setActivePhone] = useState(initialPhone ?? "");
  const [otp, setOtp] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);

  const phoneInputRef = useRef<HTMLInputElement>(null);
  const otpInputRef = useRef<HTMLInputElement>(null);

  // Focus management
  useEffect(() => {
    const timer = setTimeout(() => {
      if (step === "phone") {
        phoneInputRef.current?.focus();
      } else {
        otpInputRef.current?.focus();
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [step]);

  // Cooldown countdown timer
  useEffect(() => {
    if (cooldownSeconds <= 0) return;

    const interval = setInterval(() => {
      setCooldownSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldownSeconds]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSendCode = async (phoneToSend: string) => {
    const trimmed = phoneToSend.trim();
    if (!trimmed) {
      setError("Please enter your phone number.");
      return;
    }

    const clean = trimmed.replace(/[\s-]/g, "");
    if (!/^(?:\+92|0092|0)?3[0-9]{9}$/.test(clean)) {
      setError("Please enter a valid Pakistani mobile number (e.g. 0300 1234567).");
      return;
    }

    const token = getAuthToken();
    if (!token) {
      setError("Session expired. Please log in again.");
      return;
    }

    setIsSending(true);
    setError(null);

    try {
      const response = await requestPhoneVerification(token, trimmed);
      if (response.success) {
        setActivePhone(response.data?.phone || trimmed);
        setStep("otp");
        setCooldownSeconds(60);
      }
    } catch (err) {
      if (err instanceof MahirApiError) {
        setError(err.message);
      } else {
        setError("Unable to send verification code. Please try again.");
      }
    } finally {
      setIsSending(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanOtp = otp.trim();
    if (cleanOtp.length !== 6 || !/^\d{6}$/.test(cleanOtp)) {
      setError("Please enter the 6-digit verification code.");
      return;
    }

    const token = getAuthToken();
    if (!token) {
      setError("Session expired. Please log in again.");
      return;
    }

    setIsVerifying(true);
    setError(null);

    try {
      const response = await verifyPhone(token, cleanOtp);
      if (response.success && response.data?.customer) {
        onVerified(response.data.customer);
        onClose();
      } else {
        setError("Verification was not completed. Please try again.");
      }
    } catch (err) {
      if (err instanceof MahirApiError) {
        setError(err.message);
      } else {
        setError("Unable to verify code. Please try again.");
      }
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="phone-modal-title"
    >
      <div className="relative w-full max-w-md rounded-2xl border border-line bg-white p-6 shadow-xl sm:p-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-xl text-muted transition-colors hover:bg-background hover:text-foreground"
        >
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {step === "phone" ? (
          <div>
            <div className="mb-6 text-center">
              <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 id="phone-modal-title" className="text-xl font-bold text-foreground">
                Phone Verification Required
              </h2>
              <p className="mt-2 text-sm text-muted">
                A verified mobile number is required before confirming your booking so our service provider can coordinate with you.
              </p>
            </div>

            {error ? (
              <div role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                void handleSendCode(phone);
              }}
              noValidate
            >
              <label className="block text-sm font-semibold text-foreground">
                Mobile Number
                <input
                  ref={phoneInputRef}
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setError(null);
                  }}
                  placeholder="0300 1234567"
                  disabled={isSending}
                  className="mt-2 h-12 w-full rounded-xl border border-line bg-white px-3 text-base text-foreground outline-none focus:border-brand disabled:bg-background"
                />
              </label>
              <p className="mt-1.5 text-xs text-muted">
                Enter your 11-digit Pakistani mobile number.
              </p>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSending}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-5 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSending || !phone.trim()}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSending ? "Sending code..." : "Send Code"}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <div className="mb-6 text-center">
              <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h2 id="phone-modal-title" className="text-xl font-bold text-foreground">
                Enter Verification Code
              </h2>
              <p className="mt-2 text-sm text-muted">
                We sent a 6-digit code to{" "}
                <span className="font-semibold text-foreground">{activePhone}</span>.
              </p>
              <button
                type="button"
                onClick={() => {
                  setStep("phone");
                  setOtp("");
                  setError(null);
                }}
                className="mt-1 text-xs font-semibold text-brand hover:underline"
              >
                Change phone number
              </button>
            </div>

            {error ? (
              <div role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <form onSubmit={handleVerify} noValidate>
              <label className="block text-sm font-semibold text-foreground">
                Verification Code
                <input
                  ref={otpInputRef}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                    setOtp(val);
                    setError(null);
                  }}
                  placeholder="123456"
                  disabled={isVerifying}
                  className="mt-2 h-12 w-full text-center text-2xl font-bold tracking-widest rounded-xl border border-line bg-white px-3 text-foreground outline-none focus:border-brand disabled:bg-background"
                />
              </label>

              <div className="mt-3 flex items-center justify-between text-xs text-muted">
                <span>Didn&apos;t receive code?</span>
                {cooldownSeconds > 0 ? (
                  <span>Resend in {cooldownSeconds}s</span>
                ) : (
                  <button
                    type="button"
                    disabled={isSending}
                    onClick={() => void handleSendCode(activePhone)}
                    className="font-semibold text-brand hover:underline disabled:opacity-50"
                  >
                    {isSending ? "Resending..." : "Resend Code"}
                  </button>
                )}
              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isVerifying}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-5 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isVerifying || otp.trim().length !== 6}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isVerifying ? "Verifying..." : "Verify & Continue"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export function PhoneVerificationModal({
  isOpen,
  onClose,
  initialPhone,
  onVerified,
}: PhoneVerificationModalProps) {
  if (!isOpen) return null;

  return (
    <PhoneVerificationModalContent
      onClose={onClose}
      initialPhone={initialPhone}
      onVerified={onVerified}
    />
  );
}

