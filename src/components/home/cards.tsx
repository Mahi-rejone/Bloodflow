"use client";

import Link from "next/link";
import { SearchIcon, HeartHandshake, ShieldAlertIcon } from "lucide-react";

export default function ActionBanner() {
  return (
    <section>
      {/* Tagline strip */}
      <div className="bg-app-dark py-4">
        <p className="text-center text-sm font-semibold uppercase tracking-wide text-white sm:text-base">
          Donating blood isn&apos;t optional — it&apos;s more than a
          responsibility.
        </p>
      </div>

      {/* Action cards */}
      <div className="w-full px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {/* Card 1 — Search Donors */}
          <Link
            href="/donors"
            className="group overflow-hidden rounded-3xl border border-app-border bg-app-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <h3 className="pt-5 text-center text-sm font-semibold text-app-text">
              Find a donor near you
            </h3>
            <div className="relative mt-4 flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-app-primary-light via-app-primary to-app-primary-dark">
              {/* decorative depth shapes */}
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-10 -left-6 h-28 w-28 rounded-full bg-black/10 blur-2xl" />

              <span className="absolute left-4 top-4 rounded-full bg-app-dark/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-sm">
                Search Donors
              </span>

              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                <SearchIcon
                  size={36}
                  strokeWidth={1.75}
                  className="text-white"
                />
              </div>
            </div>
          </Link>

          {/* Card 2 — Become a Donor */}
          <Link
            href="/register"
            className="group overflow-hidden rounded-3xl border border-app-border bg-app-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <h3 className="pt-5 text-center text-sm font-semibold text-app-text">
              Register as a donor
            </h3>
            <div className="relative mt-4 flex h-48 flex-col items-center justify-center gap-3 overflow-hidden bg-gradient-to-br from-app-primary-light via-app-primary to-app-primary-dark">
              <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-8 -right-8 h-28 w-28 rounded-full bg-black/10 blur-2xl" />

              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                <HeartHandshake
                  size={30}
                  strokeWidth={1.75}
                  className="text-white"
                />
              </div>
              <p className="relative text-center text-sm font-bold leading-tight text-white">
                Be a hero.
                <br />
                Be a donor.
              </p>
              <span className="relative rounded-full border border-white/70 px-4 py-1 text-xs font-semibold text-white transition-colors group-hover:bg-white group-hover:text-app-primary">
                Click here
              </span>
            </div>
          </Link>

          {/* Card 3 — Fraud warning (informational, not a link) */}
          <div className="overflow-hidden rounded-3xl border border-app-border bg-app-white shadow-sm">
            <h3 className="pt-5 text-center text-sm font-semibold text-app-text">
              Be careful of scams
            </h3>
            <div className="relative mt-4 flex h-48 flex-col items-center justify-center gap-2.5 overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100 px-6 text-center">
              <div className="absolute -right-8 -bottom-8 h-28 w-28 rounded-full bg-app-warning/10 blur-2xl" />

              <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-app-warning/15 ring-1 ring-app-warning/30">
                <ShieldAlertIcon
                  size={28}
                  strokeWidth={1.75}
                  className="text-app-warning"
                />
              </div>
              <p className="relative text-sm font-medium leading-snug text-app-text">
                If anyone asks for money in exchange for blood, report them —
                that&apos;s a{" "}
                <span className="font-bold text-app-error">scam</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
