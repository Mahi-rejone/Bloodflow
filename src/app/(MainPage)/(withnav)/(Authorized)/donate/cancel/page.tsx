"use client";

import { DropletsIcon, MinusCircleIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function DonationCancelPage() {
  const searchParams = useSearchParams();
  const tranId = searchParams.get("tran_id");

  return (
    <div className="min-h-screen flex items-center justify-center bg-app-bg px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border border-app-border bg-white p-8 text-center shadow-lg">
        <Link href="/" className="inline-flex items-center gap-2 mb-6">
          <DropletsIcon className="text-app-primary" size={30} />
          <span className="text-2xl font-bold text-app-primary">BloodFlow</span>
        </Link>

        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50">
          <MinusCircleIcon className="h-9 w-9 text-amber-600" />
        </div>

        <h1 className="text-2xl font-bold text-app-text">Donation cancelled</h1>
        <p className="mt-2 text-app-text-light">
          You cancelled the payment before it was completed. No charge was made.
        </p>

        {tranId && (
          <p className="mt-4 rounded-lg bg-app-bg px-3 py-2 text-xs text-app-text-light">
            Transaction ID: <span className="font-mono">{tranId}</span>
          </p>
        )}

        <Link
          href="/donate"
          className="mt-6 inline-block rounded-lg bg-app-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-app-primary-dark"
        >
          Donate Again
        </Link>
      </div>
    </div>
  );
}
