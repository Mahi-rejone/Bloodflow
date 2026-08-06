"use client";

import { useGetMyRequestsQuery } from "@/redux/feature/blood/bloodRequestApi";

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

const STATUS_STYLE: Record<
  string,
  { bg: string; color: string; label: string }
> = {
  PENDING: { bg: "rgba(179,84,30,0.1)", color: "#B3541E", label: "Pending" },
  IN_PROGRESS: {
    bg: "rgba(47,110,78,0.1)",
    color: "#2F6E4E",
    label: "In progress",
  },
  COMPLETE: { bg: "rgba(27,23,20,0.06)", color: "#5B554F", label: "Complete" },
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

interface RequestItem {
  id: string;
  bloodGroup: string;
  unitsNeeded: number;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETE";
  hospital: string;
  state: string;
  district: string;
  town: string;
  createdAt: string;
  neededAt: string;
  donationHistory: { id: string; status: string; unitDonated: number }[];
}

export default function MyRequestsPage() {
  const { data, isLoading, error } = useGetMyRequestsQuery(undefined);
  const requests: RequestItem[] = data?.data ?? [];

  return (
    <div className="min-h-screen bg-[#F7F6F3] px-4 py-10 sm:py-12">
      <div className="mx-auto w-full max-w-3xl">
        <h1
          style={{ fontFamily: "var(--font-fraunces)" }}
          className="mb-6 text-2xl font-semibold text-[#1B1714]"
        >
          Blood requests you've created
        </h1>

        {isLoading && <div className="text-sm text-[#5B554F]">Loading…</div>}
        {error && (
          <div className="text-sm text-[#7C1122]">
            Couldn't load your requests.
          </div>
        )}
        {!isLoading && requests.length === 0 && (
          <div className="rounded-2xl border border-[#E4E0D8] bg-white p-8 text-center text-sm text-[#5B554F]">
            You haven't created any blood requests yet.
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {requests.map((r) => {
            const style = STATUS_STYLE[r.status] ?? STATUS_STYLE.PENDING;
            const contributed = r.donationHistory.reduce(
              (sum, h) => sum + (h.status === "CONFIRMED" ? h.unitDonated : 0),
              0,
            );
            return (
              <div
                key={r.id}
                className="rounded-2xl border border-[#E4E0D8] bg-white p-5"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-[#A6192E]">
                    {BLOOD_GROUP_LABEL[r.bloodGroup] || r.bloodGroup}
                  </span>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                    style={{ background: style.bg, color: style.color }}
                  >
                    {style.label}
                  </span>
                </div>
                <div className="font-medium text-[#1B1714]">{r.hospital}</div>
                <div className="mt-0.5 text-sm text-[#5B554F]">
                  {r.town}, {r.district}, {r.state}
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-[#E4E0D8] pt-3 text-sm">
                  <span className="text-[#5B554F]">
                    Needed by {formatDate(r.neededAt)}
                  </span>
                  <span className="font-medium text-[#1B1714]">
                    {contributed}/{contributed + r.unitsNeeded} units
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
