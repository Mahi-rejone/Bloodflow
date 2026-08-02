"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  useVerifyUserMutation,
  useResendVerificationCodeMutation,
} from "@/redux/feature/user/userApi";

const RESEND_COOLDOWN = 60; 

export default function VerifyPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState("");

  const [verifyUser, { isLoading: isVerifying }] = useVerifyUserMutation();
  const [resendVerificationCode, { isLoading: isResending }] =
    useResendVerificationCodeMutation();

  useEffect(() => {
    const stored = localStorage.getItem("verifyEmail");
    if (!stored) {
      router.replace("/register");
      return;
    }
    setEmail(stored);
  }, [router]);


  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (code.length !== 6) {
      setError("Please enter the 6-digit code");
      return;
    }

    if (!email) return;

    try {
      await verifyUser({ email, verifyCode: code }).unwrap();
      localStorage.removeItem("verifyEmail");
      router.push("/login");
    } catch (err: any) {
      setError(
        err?.data?.message || "Verification failed. Please check the code.",
      );
    }
  };

  const handleResend = async () => {
    if (!email || cooldown > 0) return;
    setError("");

    try {
      await resendVerificationCode({ email }).unwrap();
      setCooldown(RESEND_COOLDOWN);
    } catch (err: any) {
      setError(err?.data?.message || "Failed to resend code.");
    }
  };

  if (!email) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-app-bg px-4">
      <div className="w-full max-w-md rounded-lg border border-app-border bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-2xl font-semibold text-app-text">
          Verify your email
        </h1>
        <p className="mb-6 text-sm text-app-text/70">
          We sent a 6-digit code to <span className="font-medium">{email}</span>
        </p>

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            placeholder="000000"
            className="w-full rounded-md border border-app-border px-4 py-3 text-center text-2xl tracking-[0.5em] focus:border-app-primary focus:outline-none"
            autoFocus
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={isVerifying || code.length !== 6}
            className="w-full rounded-md bg-app-primary py-3 font-medium text-white disabled:opacity-50"
          >
            {isVerifying ? "Verifying..." : "Verify"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-app-text/70">
          Didn&apos;t get the code?{" "}
          <button
            onClick={handleResend}
            disabled={isResending || cooldown > 0}
            className="font-medium text-app-primary disabled:opacity-50"
          >
            {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
          </button>
        </div>
      </div>
    </div>
  );
}
