"use client";

import { useGetMyDonationsQuery } from "@/redux/feature/blood/bloodRequestApi";

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

interface Donation {
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
  };
}

export default function MyDonationsPage() {
  const { data, isLoading, error } = useGetMyDonationsQuery(undefined);
  const donations: Donation[] = data?.data ?? [];

  return (
    <div className="min-h-screen bg-[#F7F6F3] px-4 py-10 sm:py-12">
      <div className="mx-auto w-full max-w-3xl">
        <h1
          style={{ fontFamily: "var(--font-fraunces)" }}
          className="mb-6 text-2xl font-semibold text-[#1B1714]"
        >
          Donations you've given
        </h1>

        {isLoading && <div className="text-sm text-[#5B554F]">Loading…</div>}
        {error && (
          <div className="text-sm text-[#7C1122]">
            Couldn't load your donations.
          </div>
        )}
        {!isLoading && donations.length === 0 && (
          <div className="rounded-2xl border border-[#E4E0D8] bg-white p-8 text-center text-sm text-[#5B554F]">
            You haven't completed any donations yet.
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {donations.map((d) => (
            <div
              key={d.id}
              className="rounded-2xl border border-[#E4E0D8] bg-white p-5"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#A6192E]">
                  {BLOOD_GROUP_LABEL[d.bloodRequest.bloodGroup] ||
                    d.bloodRequest.bloodGroup}
                </span>
                <span className="text-[11px] text-[#5B554F]">
                  {formatDate(d.donationDate)}
                </span>
              </div>
              <div className="font-medium text-[#1B1714]">
                {d.bloodRequest.hospital}
              </div>
              <div className="mt-0.5 text-sm text-[#5B554F]">
                {d.bloodRequest.town}, {d.bloodRequest.district},{" "}
                {d.bloodRequest.state}
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-[#E4E0D8] pt-3 text-sm">
                <span className="text-[#5B554F]">
                  To {d.recipient.fullName || d.recipient.username}
                </span>
                <span className="font-medium text-[#1B1714]">
                  {d.unitDonated} unit(s)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
