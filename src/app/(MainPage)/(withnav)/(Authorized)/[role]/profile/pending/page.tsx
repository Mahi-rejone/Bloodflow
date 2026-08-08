"use client";

import { useGetMyPendingDonationsQuery } from "@/redux/feature/blood/bloodRequestApi";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BLOOD_GROUP_LABEL: Record<string, string> = {
  A_POS: "A+",
  A_NEG: "A-",
  B_POS: "B+",
  B_NEG: "B-",
  AB_POS: "AB+",
  AB_NEG: "AB-",
  O_POS: "O+",
  O_NEG: "O-",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return isNaN(d.getTime())
    ? "—"
    : d.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
}

interface PendingDonation {
  id: string;
  donationDate: string;
  unitDonated: number;
  recipient: { id: string; username: string; fullName: string };
  bloodRequest: {
    id: string;
    hospital: string;
    bloodGroup: string;
    state: string;
    district: string;
    town: string;
    status: string;
  };
}

export default function MyPendingPage() {
  const pathname = usePathname();
  const { data, isLoading, error } = useGetMyPendingDonationsQuery(undefined);
  const pending: PendingDonation[] = data?.data ?? [];
  return (
    <div className="min-h-screen bg-[#F7F6F3] px-4 py-10 sm:py-12">
      <div className="mx-auto w-full max-w-3xl">
        <h1
          style={{ fontFamily: "var(--font-fraunces)" }}
          className="mb-6 text-2xl font-semibold text-[#1B1714]"
        >
          Pending contributions
        </h1>
        <p className="mb-6 text-sm text-[#5B554F]">
          You've accepted these requests but they haven't been confirmed yet.
        </p>

        {isLoading && <div className="text-sm text-[#5B554F]">Loading…</div>}
        {error && (
          <div className="text-sm text-[#7C1122]">
            Couldn't load pending contributions.
          </div>
        )}
        {!isLoading && pending.length === 0 && (
          <div className="rounded-2xl border border-[#E4E0D8] bg-white p-8 text-center text-sm text-[#5B554F]">
            Nothing pending right now.
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {pending.map((p) => (
            <Link
              key={p.id}
              href={`${pathname}/${p.id}`}
              className="block rounded-2xl border border-[#B3541E]/30 bg-white p-5 transition-shadow hover:shadow-md"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#A6192E]">
                  {BLOOD_GROUP_LABEL[p.bloodRequest.bloodGroup] ||
                    p.bloodRequest.bloodGroup}
                </span>
                <span
                  className="rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                  style={{
                    background: "rgba(179,84,30,0.1)",
                    color: "#B3541E",
                  }}
                >
                  Awaiting confirmation
                </span>
              </div>
              <div className="font-medium text-[#1B1714]">
                {p.bloodRequest.hospital}
              </div>
              <div className="mt-0.5 text-sm text-[#5B554F]">
                {p.bloodRequest.town}, {p.bloodRequest.district},{" "}
                {p.bloodRequest.state}
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-[#E4E0D8] pt-3 text-sm">
                <span className="text-[#5B554F]">
                  To {p.recipient.fullName || p.recipient.username}
                </span>
                <span className="font-medium text-[#1B1714]">
                  {p.unitDonated} unit(s)
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
