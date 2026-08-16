import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eligibility Guide | Bloodflow",
  description:
    "Who can donate blood, temporary deferrals, and how to prepare — a general guide from Bloodflow.",
};

type Criterion = { label: string; detail: string };
type DeferralItem = { label: string; detail: string };

const coreCriteria: Criterion[] = [
  { label: "Age", detail: "Generally 18–60 years old" },
  {
    label: "Weight",
    detail: "At least 45 kg (varies slightly by donation type)",
  },
  {
    label: "Hemoglobin level",
    detail: "Meets the minimum threshold checked before donation",
  },
  {
    label: "General health",
    detail: "Feeling well, no fever, cold, or flu symptoms on donation day",
  },
  {
    label: "Donation interval",
    detail:
      "At least 90 days (about 3 months) since your last whole-blood donation",
  },
];

const temporaryDeferrals: DeferralItem[] = [
  {
    label: "Pregnancy or recent childbirth",
    detail: "Typically deferred until 6 months after delivery",
  },
  {
    label: "Recent tattoo or piercing",
    detail: "Usually a 6–12 month wait, depending on hygiene standards",
  },
  {
    label: "Recent surgery or major dental work",
    detail: "Wait until fully healed, as advised by your doctor",
  },
  {
    label: "Low hemoglobin or iron levels",
    detail: "Deferred until levels return to a safe range",
  },
  {
    label: "Recent infection, fever, or flu",
    detail: "Wait until fully recovered, generally 1–2 weeks",
  },
  {
    label: "Certain medications",
    detail: "Some prescriptions require a waiting period — check with staff",
  },
  {
    label: "Recent travel to malaria-risk areas",
    detail: "May require a temporary deferral period",
  },
  {
    label: "Alcohol consumption",
    detail: "Avoid donating within 24 hours of drinking alcohol",
  },
];

const longTermDeferrals: DeferralItem[] = [
  { label: "HIV/AIDS", detail: "Permanent deferral" },
  { label: "Hepatitis B or C", detail: "Permanent deferral in most cases" },
  {
    label: "Uncontrolled heart disease",
    detail: "Deferred; may vary based on physician clearance",
  },
  {
    label: "Active cancer or recent cancer treatment",
    detail: "Deferred; eligibility depends on type and remission status",
  },
  {
    label: "Uncontrolled diabetes",
    detail: "Deferred until well-managed; confirm with a physician",
  },
  {
    label: "Certain blood or clotting disorders",
    detail: "Evaluated case-by-case by medical staff",
  },
];

const beforeTips = [
  "Get a good night's sleep before donating.",
  "Eat a healthy meal — avoid donating on an empty stomach.",
  "Drink plenty of water in the hours before donating.",
  "Avoid fatty foods, which can affect blood tests.",
  "Bring a valid ID for registration.",
];

const afterTips = [
  "Rest for 10–15 minutes at the donation site before leaving.",
  "Drink extra fluids over the next 24–48 hours.",
  "Avoid heavy lifting or intense exercise for the rest of the day.",
  "Keep the bandage on for a few hours and keep the area clean.",
  "If you feel dizzy or unwell, sit or lie down and inform staff immediately.",
];

export default function EligibilityGuidePage() {
  return (
    <div className="min-h-screen bg-[#fffdfc] text-neutral-900">
      {/* Header */}
      <header className="bg-gradient-to-br from-red-600 to-red-900 px-6 py-12 text-center text-white sm:py-16">
        <div className="text-4xl">🩸</div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Eligibility Guide
        </h1>
        <p className="mt-2 text-sm text-white/85">
          A general guide to who can donate blood — and how to prepare
        </p>
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-10">
        {/* Disclaimer banner */}
        <div className="mb-10 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-[13.5px] text-red-800">
          This guide is general information, not medical advice. Final
          eligibility is always determined by qualified medical staff at the
          time of donation.
        </div>

        {/* Core criteria */}
        <section className="mb-12">
          <h2 className="mb-1 text-lg font-semibold">
            Who can generally donate
          </h2>
          <p className="mb-4 text-sm text-neutral-500">
            If you meet these basic criteria, you're likely eligible to donate —
            final checks happen on site.
          </p>
          <ul className="space-y-2.5">
            {coreCriteria.map((c) => (
              <li
                key={c.label}
                className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3"
              >
                <span className="mt-0.5 text-green-600">✓</span>
                <div>
                  <p className="text-sm font-medium text-neutral-900">
                    {c.label}
                  </p>
                  <p className="text-sm text-neutral-600">{c.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Temporary deferrals */}
        <section className="mb-12">
          <h2 className="mb-1 text-lg font-semibold">Temporary deferrals</h2>
          <p className="mb-4 text-sm text-neutral-500">
            These don't rule you out permanently — you can usually donate again
            after the noted waiting period.
          </p>
          <ul className="space-y-2.5">
            {temporaryDeferrals.map((d) => (
              <li
                key={d.label}
                className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3"
              >
                <span className="mt-0.5 text-amber-600">⏳</span>
                <div>
                  <p className="text-sm font-medium text-neutral-900">
                    {d.label}
                  </p>
                  <p className="text-sm text-neutral-600">{d.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Long-term / permanent deferrals */}
        <section className="mb-12">
          <h2 className="mb-1 text-lg font-semibold">
            Long-term or permanent deferrals
          </h2>
          <p className="mb-4 text-sm text-neutral-500">
            These conditions generally prevent donation, for the safety of both
            donor and recipient.
          </p>
          <ul className="space-y-2.5">
            {longTermDeferrals.map((d) => (
              <li
                key={d.label}
                className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3"
              >
                <span className="mt-0.5 text-red-600">✕</span>
                <div>
                  <p className="text-sm font-medium text-neutral-900">
                    {d.label}
                  </p>
                  <p className="text-sm text-neutral-600">{d.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Before / after tips */}
        <section className="mb-12 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-neutral-200 bg-white p-5">
            <h2 className="mb-3 text-base font-semibold">Before you donate</h2>
            <ul className="list-disc space-y-1.5 pl-5 text-sm text-neutral-700">
              {beforeTips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-white p-5">
            <h2 className="mb-3 text-base font-semibold">After you donate</h2>
            <ul className="list-disc space-y-1.5 pl-5 text-sm text-neutral-700">
              {afterTips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Closing note */}
        <section className="rounded-xl border border-neutral-200 bg-white p-5 text-sm text-neutral-600">
          <p>
            Requirements can vary slightly between blood centers and hospitals.
            If you're unsure whether you're eligible, the safest step is to
            register on Bloodflow and let the medical staff at your nearest
            donation point confirm eligibility in person.
          </p>
        </section>
      </main>
    </div>
  );
}
