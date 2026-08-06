"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/feature/authSlice";
import { useGetPendingRequestsQuery } from "@/redux/feature/blood/bloodRequestApi";
import { useGetCompletedRequestsCountQuery } from "@/redux/feature/blood/bloodRequestApi";
import { useGetAllDonorsQuery } from "@/redux/feature/user/userApi";

// A stylized heartbeat trace — flat, then a real QRS-like spike, then flat again.
// This is the page's one signature element: it draws itself in once on load,
// then holds still. No looping shimmer, no gradient blob.
const PULSE_PATH =
  "M0,60 L120,60 L150,60 L165,20 L180,100 L195,40 L210,60 L260,60 L1000,60";

function PulseLine() {
  const pathRef = useRef<SVGPathElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced || !pathRef.current) {
      setReady(true);
      return;
    }
    const length = pathRef.current.getTotalLength();
    pathRef.current.style.strokeDasharray = `${length}`;
    pathRef.current.style.strokeDashoffset = `${length}`;
    pathRef.current.getBoundingClientRect();
    pathRef.current.style.transition = "stroke-dashoffset 1.6s ease-out";
    pathRef.current.style.strokeDashoffset = "0";
    setReady(true);
  }, []);

  return (
    <svg
      viewBox="0 0 1000 120"
      preserveAspectRatio="none"
      className="h-[60px] w-full sm:h-[80px]"
      aria-hidden="true"
    >
      <path
        d={PULSE_PATH}
        fill="none"
        className="stroke-app-border"
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
      />
      <path
        ref={pathRef}
        d={PULSE_PATH}
        fill="none"
        className="stroke-app-primary"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        style={{ opacity: ready ? 1 : 0 }}
      />
    </svg>
  );
}

function StatBlock({
  value,
  label,
  loading,
}: {
  value: number;
  label: string;
  loading: boolean;
}) {
  return (
    <div className="flex flex-col">
      <span
        style={{ fontFamily: "var(--font-serif)" }}
        className="text-[28px] font-medium leading-none text-app-text sm:text-[34px]"
      >
        {loading ? "—" : value}
      </span>
      <span className="mt-1.5 text-[10.5px] font-medium uppercase tracking-[0.1em] text-app-text-muted">
        {label}
      </span>
    </div>
  );
}

export default function HeroBanner() {
  const currentUser = useAppSelector(selectCurrentUser);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: pendingData, isLoading: pendingLoading } =
    useGetPendingRequestsQuery(undefined);
  const { data: donorsData, isLoading: donorsLoading } = useGetAllDonorsQuery(
    {},
  );
  const { data: completedData, isLoading: completedLoading } =
    useGetCompletedRequestsCountQuery(undefined);

  const pendingCount = pendingData?.data?.length ?? 0;
  const donorCount = donorsData?.data?.length ?? 0;
  const completedCount = completedData?.data?.count ?? 0;

  return (
    <section className="bg-app-bg">
      <div className="w-full px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* Top: text + rounded image card, side by side */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left — text content */}
          <div>
            {/* Eyebrow — live status pulse dot */}
            <div className="mb-6 flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-app-text-light">
              <span className="h-1.75 w-1.75 shrink-0 animate-pulse-soft rounded-full bg-app-primary shadow-[0_0_0_3px_rgba(220,38,38,0.15)]" />
              Live blood network · Bangladesh
            </div>

            {/* Headline */}
            <h1
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-[clamp(32px,5vw,48px)] font-normal leading-[1.1] tracking-tight text-app-text"
            >
              Make your contribution today and be a hero in someone&apos;s
              story.
            </h1>

            <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-app-text-light">
              Post a request and nearby donors are notified in minutes. Register
              once, and every future request finds you automatically.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/requests/new"
                className="rounded-full bg-app-primary px-6 py-3 text-sm font-medium text-white hover:bg-app-primary-dark"
              >
                Request Blood
              </Link>

              {mounted && currentUser ? (
                <Link
                  href="/requests"
                  className="rounded-full border border-app-border bg-app-white px-6 py-3 text-sm font-medium text-app-text hover:bg-app-bg-soft"
                >
                  Browse Requests
                </Link>
              ) : (
                <Link
                  href="/register"
                  className="rounded-full border border-app-border bg-app-white px-6 py-3 text-sm font-medium text-app-text hover:bg-app-bg-soft"
                >
                  Become a Donor
                </Link>
              )}
            </div>
          </div>

          {/* Right — rounded image card, lg and up only */}
          <div className="relative hidden h-64 w-full overflow-hidden rounded-3xl border border-app-border sm:h-80 lg:block lg:h-[400px]">
            <Image
              src="/assets/hero-bg.jpg"
              alt="A donor giving blood at a BloodFlow donation drive"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Full-width stat strip, spanning beneath both columns */}
        <div className="mt-14 flex flex-wrap justify-between gap-x-10 gap-y-6 border-t border-app-border pt-8 sm:mx-5 lg:mx-20">
          <StatBlock
            value={donorCount}
            label="Registered donors"
            loading={donorsLoading}
          />
          <StatBlock
            value={pendingCount}
            label="Open requests now"
            loading={pendingLoading}
          />
          <StatBlock
            value={completedCount}
            label="Requests fulfilled"
            loading={completedLoading}
          />
        </div>

        {/* Signature element — full width, draws in once, then holds */}
        <div className="mt-10">
          <PulseLine />
        </div>
      </div>
    </section>
  );
}
