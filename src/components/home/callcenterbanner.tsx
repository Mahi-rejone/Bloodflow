"use client";

import Link from "next/link";

interface CallCenterBannerProps {
  phoneNumbers?: string[];
  hoursLines?: string[];
  tagline?: string;
  readMoreHref?: string;
}

export default function CallCenterBanner({
  phoneNumbers = ["01XXXXXXXXX", "01XXXXXXXXX"],
  hoursLines = [
    "Sunday to Thursday (8 AM to 12 AM)",
    "Saturday (12 PM to 8 PM), Friday — Closed",
  ],
  tagline = "We don't charge for humanity.",
  readMoreHref = "/contact",
}: CallCenterBannerProps) {
  return (
    <section className="bg-app-primary">
      <div className="w-full px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:divide-x sm:divide-white/25">
          {/* Left — heading + phone numbers */}
          <div className="text-center sm:pr-8 sm:text-left">
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              Blood Donation Call Center
            </h2>
            <p className="mt-2 text-sm text-white/90 sm:text-base">
              {phoneNumbers.join(" or ")}
            </p>
          </div>

          {/* Right — hours + tagline */}
          <div className="text-center sm:pl-8 sm:text-left">
            {hoursLines.map((line, i) => (
              <p key={i} className="text-sm text-white/90 sm:text-base">
                {line}
              </p>
            ))}
            <p className="mt-2 text-sm font-semibold text-yellow-300 sm:text-base">
              {tagline}
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-center sm:justify-start">
          <Link
            href={readMoreHref}
            className="rounded-md bg-app-dark px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Read More...
          </Link>
        </div>
      </div>
    </section>
  );
}
    