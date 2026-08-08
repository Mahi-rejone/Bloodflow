"use client";

import Link from "next/link";
import { useGetMeQuery } from "@/redux/feature/user/userApi";
import {
  useGetMyDonationsQuery,
  useGetMyRequestsQuery,
  useGetMyPendingDonationsQuery,
} from "@/redux/feature/blood/bloodRequestApi";
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/feature/authSlice";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-fraunces",
});
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

type BloodGroup =
  | "A_POS"
  | "A_NEG"
  | "B_POS"
  | "B_NEG"
  | "AB_POS"
  | "AB_NEG"
  | "O_POS"
  | "O_NEG";
type UserRole =
  | "ADMIN"
  | "BLOOD_BANK_MANAGER"
  | "HOSPITAL_REPRESENTATIVE"
  | "USER";
type UserStatus = "ACTIVE" | "BLOCK";

interface UserProfile {
  id: string;
  img: string | null;
  bloodGroup: BloodGroup;
  phoneNumber: string;
  guardianNumber: string | null;
  numberOfDonation: number;
  state: string;
  district: string;
  town: string;
  address: string | null;
  dateOfBirth: string;
  gender: string;
}

interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  status: UserStatus;
  role: UserRole;
  createdAt: string;
  profile: UserProfile | null;
}

// ---------- Display maps ----------
const BLOOD_GROUP_LABEL: Record<BloodGroup, string> = {
  A_POS: "A+",
  A_NEG: "A-",
  B_POS: "B+",
  B_NEG: "B-",
  AB_POS: "AB+",
  AB_NEG: "AB-",
  O_POS: "O+",
  O_NEG: "O-",
};

const ROLE_LABEL: Record<UserRole, string> = {
  ADMIN: "Admin",
  BLOOD_BANK_MANAGER: "Blood Bank Manager",
  HOSPITAL_REPRESENTATIVE: "Hospital Representative",
  USER: "Donor/Recipient",
};

// ---------- Formatting helpers ----------
function initials(name: string): string {
  if (!name) return "?";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function calcAge(dobStr: string | null | undefined): string {
  if (!dobStr) return "—";
  const dob = new Date(dobStr);
  if (isNaN(dob.getTime())) return "—";
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const m = now.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age--;
  return `${age} years`;
}

// ---------- Small display bits ----------
function DetailRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string | null | undefined;
  mono?: boolean;
}) {
  const isEmpty = value === null || value === undefined || value === "";
  return (
    <div className="flex justify-between gap-3 border-b border-[#E4E0D8] py-2.5 text-sm last:border-b-0 sm:flex-row flex-col sm:items-baseline items-start sm:gap-3">
      <span className="shrink-0 text-[#5B554F]">{label}</span>
      <span
        className={[
          "min-w-0 font-medium wrap-break sm:text-right text-left",
          mono ? "font-mono text-[12.5px]" : "",
          isEmpty ? "italic font-normal text-[#5B554F]" : "text-[#1B1714]",
        ].join(" ")}
        style={mono ? { fontFamily: "var(--font-plex-mono)" } : undefined}
      >
        {isEmpty ? "—" : value}
      </span>
    </div>
  );
}

// ---------- Clickable activity stat card ----------
function StatLinkCard({
  label,
  value,
  href,
  loading,
}: {
  label: string;
  value: number | string;
  href: string;
  loading?: boolean;
}) {
  return (
    <Link
      href={href}
      className="group block bg-white px-3 py-4.5 text-center transition-colors hover:bg-[#F7F6F3]"
    >
      <div
        style={{ fontFamily: "var(--font-fraunces)" }}
        className="text-[clamp(20px,4vw,26px)] font-semibold text-[#7C1122]"
      >
        {loading ? "—" : value}
      </div>
      <div className="mt-1 text-[11px] text-[#5B554F] transition-colors group-hover:text-[#1B1714]">
        {label} →
      </div>
    </Link>
  );
}

// ---------- Activity stats row (donations / requests / pending) ----------
function ActivityStats() {
  const user = useAppSelector(selectCurrentUser);
  const { data: donations, isLoading: donationsLoading } =
    useGetMyDonationsQuery(undefined);
  const { data: requests, isLoading: requestsLoading } =
    useGetMyRequestsQuery(undefined);
  const { data: pending, isLoading: pendingLoading } =
    useGetMyPendingDonationsQuery(undefined);
  return (
    <div className="mt-4 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#E4E0D8] bg-[#E4E0D8] sm:grid-cols-3">
      <StatLinkCard
        label="Donations completed"
        value={donations?.data?.length ?? 0}
        loading={donationsLoading}
        href={`/${user?.role.toLowerCase()}/profile/donations`}
      />
      <StatLinkCard
        label="Requests created"
        value={requests?.data?.length ?? 0}
        loading={requestsLoading}
        href={`/${user?.role.toLowerCase()}/profile/requests`}
      />
      <StatLinkCard
        label="Pending contributions"
        value={pending?.data?.length ?? 0}
        loading={pendingLoading}
        href={`/${user?.role.toLowerCase()}/profile/pending`}
      />
    </div>
  );
}

// ---------- Page ----------
export default function ProfilePage() {
  const { data, isLoading, error } = useGetMeQuery(undefined);
  const user = data?.data as User | undefined;

  if (isLoading) {
    return (
      <div
        className={`${plexSans.variable} min-h-screen flex items-center justify-center bg-[#F7F6F3] px-4`}
        style={{ fontFamily: "var(--font-plex-sans)" }}
      >
        <div className="text-sm text-[#5B554F]">Loading profile…</div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div
        className={`${plexSans.variable} min-h-screen flex items-center justify-center bg-[#F7F6F3] px-4`}
        style={{ fontFamily: "var(--font-plex-sans)" }}
      >
        <div className="w-full max-w-md rounded-2xl border border-[#E4E0D8] bg-white p-10 text-center shadow-sm">
          <div className="mb-1 font-semibold text-[#7C1122]">
            Couldn&apos;t load this profile
          </div>
          <p className="text-sm text-[#5B554F]">Something went wrong.</p>
          <a
            href="/profile"
            className="mt-4 inline-block rounded-full bg-[#1B1714] px-5 py-2.5 text-xs tracking-wide text-white"
          >
            Try again
          </a>
        </div>
      </div>
    );
  }

  const profile = user.profile;
  const isActive = user.status === "ACTIVE";

  return (
    <div
      className={`${fraunces.variable} ${plexSans.variable} ${plexMono.variable} min-h-screen bg-[#F7F6F3] px-4 py-10 sm:py-12`}
      style={{
        fontFamily: "var(--font-plex-sans)",
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(27,23,20,0.05) 1px, transparent 0)",
        backgroundSize: "16px 16px",
      }}
    >
      <div className="mx-auto w-full max-w-3xl">
        {/* Eyebrow */}
        <div className="mb-4 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#5B554F]">
          <span
            className="h-1.75 w-1.75 shrink-0 rounded-full"
            style={{
              background: isActive ? "#2F6E4E" : "#B3541E",
              boxShadow: `0 0 0 3px ${isActive ? "rgba(47,110,78,0.15)" : "rgba(179,84,30,0.15)"}`,
            }}
          />
          {ROLE_LABEL[user.role] || user.role}
        </div>

        {/* Donor card */}
        <div className="relative grid grid-cols-1 gap-6 overflow-hidden rounded-[20px] border border-[#E4E0D8] bg-white p-6 shadow-[0_1px_2px_rgba(27,23,20,0.04),0_8px_24px_rgba(27,23,20,0.06)] sm:p-9 md:grid-cols-[1fr_auto]">
          {/* dashed divider, desktop only */}
          <div className="pointer-events-none absolute inset-y-0 right-49 hidden border-l-2 border-dashed border-[#D9D3C7] md:block" />

          <div className="flex min-w-0 flex-col gap-4">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#E4E0D8] bg-linear-to-br from-[#2A241F] to-[#1B1714] text-[#F2EFE9]">
                {profile?.img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profile.img}
                    alt={user.fullName || user.username}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span
                    style={{ fontFamily: "var(--font-fraunces)" }}
                    className="text-lg font-medium"
                  >
                    {initials(user.fullName || user.username)}
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <div
                  style={{ fontFamily: "var(--font-fraunces)" }}
                  className="wrap-break text-[clamp(22px,4.5vw,30px)] font-medium leading-tight tracking-tight"
                >
                  {user.fullName || user.username}
                </div>
                <div className="mt-0.5 wrap-break font-mono text-[13px] text-[#5B554F]">
                  @{user.username}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <span
                className="rounded-full px-3 py-1 text-[11.5px] font-medium"
                style={
                  isActive
                    ? { background: "rgba(47,110,78,0.1)", color: "#2F6E4E" }
                    : { background: "rgba(179,25,46,0.1)", color: "#7C1122" }
                }
              >
                {isActive ? "Active" : "Blocked"}
              </span>
              <span className="rounded-full bg-[#1B1714]/6 px-3 py-1 text-[11.5px] font-medium text-[#5B554F]">
                {ROLE_LABEL[user.role] || user.role}
              </span>
              <span className="rounded-full border border-[#E4E0D8] px-3 py-1 text-[11.5px] font-medium text-[#5B554F]">
                Member since {formatDate(user.createdAt)}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-1 border-t border-[#E4E0D8] pt-3 text-[13.5px] leading-relaxed text-[#5B554F] sm:grid-cols-2 sm:gap-x-6">
              <div className="min-w-0 wrap-break">
                Email
                <br />
                <span className="font-medium text-[#1B1714]">{user.email}</span>
              </div>
              <div className="min-w-0 wrap-break">
                Guardian contact
                <br />
                <span className="font-medium text-[#1B1714]">
                  {profile?.guardianNumber || "Not provided"}
                </span>
              </div>
            </div>
          </div>

          {/* Blood group stamp */}
          <div className="flex shrink-0 flex-row items-center gap-3.5 md:w-43 md:flex-col md:justify-center md:gap-2.5">
            <div className="relative flex h-21 w-21 shrink-0 -rotate-6 items-center justify-center rounded-full border-[2.5px] border-[#A6192E] md:h-27.5 md:w-27.5">
              <div className="absolute inset-1.5 rounded-full border border-dashed border-[#A6192E]/40" />
              <div className="flex flex-col items-center">
                <span
                  style={{ fontFamily: "var(--font-fraunces)" }}
                  className="text-[26px] font-semibold leading-none text-[#7C1122] md:text-[34px]"
                >
                  {profile ? BLOOD_GROUP_LABEL[profile.bloodGroup] : "—"}
                </span>
                <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[#A6192E]">
                  Blood grp
                </span>
              </div>
            </div>
            <div className="text-center font-mono text-[10.5px] uppercase tracking-[0.08em] text-[#5B554F]">
              {ROLE_LABEL[user.role]}
            </div>
          </div>
        </div>
        {/* Activity strip — clickable, links to donation/request/pending pages */}
        <ActivityStats />

        {/* Detail grid */}
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="min-w-0 rounded-2xl border border-[#E4E0D8] bg-white p-5 sm:p-6">
            <h3 className="mb-3.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[#A6192E]">
              Personal
            </h3>
            <DetailRow
              label="Full name"
              value={user.fullName || user.username}
            />
            <DetailRow label="Gender" value={profile?.gender} />
            <DetailRow
              label="Date of birth"
              value={formatDate(profile?.dateOfBirth)}
            />
            <DetailRow label="Age" value={calcAge(profile?.dateOfBirth)} />
          </div>

          <div className="min-w-0 rounded-2xl border border-[#E4E0D8] bg-white p-5 sm:p-6">
            <h3 className="mb-3.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[#A6192E]">
              Contact
            </h3>
            <DetailRow label="Phone" value={profile?.phoneNumber} mono />
            <DetailRow
              label="Guardian phone"
              value={profile?.guardianNumber}
              mono
            />
            <DetailRow label="Email" value={user.email} mono />
          </div>

          <div className="min-w-0 rounded-2xl border border-[#E4E0D8] bg-white p-5 sm:p-6 md:col-span-2">
            <h3 className="mb-3.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[#A6192E]">
              Location
            </h3>
            <DetailRow label="State" value={profile?.state} />
            <DetailRow label="District" value={profile?.district} />
            <DetailRow label="Town" value={profile?.town} />
            <DetailRow label="Address" value={profile?.address} />
          </div>

          <div className="min-w-0 rounded-2xl border border-[#E4E0D8] bg-white p-5 sm:p-6 md:col-span-2">
            <h3 className="mb-3.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[#A6192E]">
              Account
            </h3>
            <DetailRow label="Status" value={isActive ? "Active" : "Blocked"} />
            <DetailRow label="Joined" value={formatDate(user.createdAt)} />
          </div>
        </div>
      </div>
    </div>
  );
}
