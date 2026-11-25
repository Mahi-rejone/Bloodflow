"use client";

import { DropletsIcon, XCircleIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function DonationFailPage() {
  const searchParams = useSearchParams();
  const tranId = searchParams.get("tran_id");

  return (
    <div className="min-h-screen flex items-center justify-center bg-app-bg px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border border-app-border bg-white p-8 text-center shadow-lg">
        <Link href="/" className="inline-flex items-center gap-2 mb-6">
          <DropletsIcon className="text-app-primary" size={30} />
          <span className="text-2xl font-bold text-app-primary">BloodFlow</span>
        </Link>

        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
          <XCircleIcon className="h-9 w-9 text-red-600" />
        </div>

        <h1 className="text-2xl font-bold text-app-text">Payment failed</h1>
        <p className="mt-2 text-app-text-light">
          Something went wrong and your payment couldn&rsquo;t be completed. You
          have not been charged.
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
          Try Again
        </Link>
      </div>
    </div>
  );
}
