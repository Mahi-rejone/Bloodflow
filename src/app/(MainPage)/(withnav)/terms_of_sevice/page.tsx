import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Bloodflow",
  description:
    "Terms of Service for Bloodflow, a platform connecting blood donors and recipients.",
};

type Section = {
  id: string;
  title: string;
  body: React.ReactNode;
};

const sections: Section[] = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    body: (
      <p>
        These Terms of Service govern your access to and
        use of the Bloodflow website, mobile application, and related services, operated by{" "}
        <span>Bloodflow</span>. By creating an account or
        otherwise using the Service, you agree to be bound by these Terms. If
        you do not agree, please do not use the Service.
      </p>
    ),
  },
  {
    id: "eligibility",
    title: "Eligibility",
    body: (
      <>
        <p>
          You must be at least 18 years old, or the legal age of majority in
          your jurisdiction, to register as a blood donor or recipient on
          Bloodflow. By registering, you represent that you meet this
          requirement and that all information you provide is accurate and
          complete.
        </p>
        <p>
          Actual eligibility to donate blood is determined by qualified medical
          staff at the time of donation, in accordance with applicable national
          blood donation guidelines — not by anything stated on this Service.
        </p>
      </>
    ),
  },
  {
    id: "accounts",
    title: "Accounts & Registration",
    body: (
      <ul className="list-disc space-y-1.5 pl-5">
        <li>
          You are responsible for maintaining the confidentiality of your login
          credentials and for all activity under your account.
        </li>
        <li>
          You agree to provide accurate information — including blood group,
          contact details, and location — and to keep it up to date.
        </li>
        <li>
          You must notify us promptly of any unauthorized use of your account.
        </li>
        <li>
          We reserve the right to suspend or terminate accounts that contain
          false, misleading, or impersonated information.
        </li>
      </ul>
    ),
  },
  {
    id: "nature",
    title: "Nature of the Service",
    body: (
      <>
        <p>
          Bloodflow is a platform that helps connect potential blood donors with
          individuals or institutions (such as hospitals) seeking blood.
          Bloodflow does not collect, store, handle, transport, or supply blood
          itself, and is not a blood bank, hospital, or medical facility.
        </p>
        <p>
          Any arrangement to donate or receive blood made through the Service is
          strictly between the individuals/institutions involved. Bloodflow is
          not a party to that arrangement and does not guarantee that a donor
          will be available, willing, or medically eligible to donate.
        </p>
      </>
    ),
  },
  {
    id: "medical",
    title: "Medical Disclaimer",
    body: (
      <>
        <div className="rounded-md border-l-4 border-red-600 bg-red-50 px-4 py-3 text-[14.5px] text-neutral-800">
          <strong className="text-red-800">Not medical advice.</strong>{" "}
          Bloodflow does not provide medical advice, diagnosis, or treatment,
          and nothing on the Service should be treated as such. Always seek the
          advice of a qualified physician or medical institution regarding blood
          donation eligibility, health conditions, or any medical concerns.
        </div>
        <p className="mt-3">
          In a medical emergency, contact a hospital or emergency medical
          service directly rather than relying on this Service.
        </p>
      </>
    ),
  },
  {
    id: "conduct",
    title: "User Conduct",
    body: (
      <>
        <p>When using Bloodflow, you agree not to:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            Provide false information about your identity, health, or blood
            group;
          </li>
          <li>
            Use the Service for any commercial sale or purchase of blood, where
            prohibited by law;
          </li>
          <li>Harass, threaten, or discriminate against other users;</li>
          <li>
            Attempt to access another user&rsquo;s account or personal data
            without authorization;
          </li>
          <li>
            Use automated means (bots, scrapers) to access or extract data from
            the Service without our written permission;
          </li>
          <li>
            Upload malicious code or attempt to disrupt the Service&rsquo;s
            operation.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "content",
    title: "User Content",
    body: (
      <p>
        You retain ownership of any information or content you submit (such as
        your profile details). By submitting it, you grant Bloodflow a limited,
        non-exclusive license to use, display, and share that content as
        necessary to operate the Service — for example, showing your donor
        profile to a matching recipient.
      </p>
    ),
  },
  {
    id: "privacy",
    title: "Privacy",
    body: (
      <p>
        Our collection and use of your personal and health-related information
        is described in our{" "}
        <a
          href="/privacy&policy"
          className="text-red-700 underline underline-offset-2"
        >
          Privacy Policy
        </a>
        . By using the Service, you consent to that collection and use.
      </p>
    ),
  },
  {
    id: "ip",
    title: "Intellectual Property",
    body: (
      <p>
        The Bloodflow name, logo, design, and underlying software are the
        property of <span>Bloodflow</span> and are protected by applicable
        intellectual property laws. You may not copy, modify, or distribute any
        part of the Service without our prior written consent.
      </p>
    ),
  },
  {
    id: "third-party",
    title: "Third-Party Links",
    body: (
      <p>
        The Service may contain links to third-party websites or services (such
        as partner hospitals). We are not responsible for the content, accuracy,
        or practices of any third-party site, and linking to it does not imply
        our endorsement.
      </p>
    ),
  },
  {
    id: "termination",
    title: "Suspension & Termination",
    body: (
      <p>
        We may suspend or terminate your access to the Service at any time, with
        or without notice, if we believe you have violated these Terms or
        engaged in conduct that harms other users or the Service. You may also
        delete your account at any time by contacting us.
      </p>
    ),
  },
  {
    id: "disclaimer",
    title: "Disclaimers",
    body: (
      <p>
        The Service is provided &ldquo;as is&rdquo; and &ldquo;as
        available,&rdquo; without warranties of any kind, express or implied,
        including warranties of accuracy, reliability, or fitness for a
        particular purpose. We do not guarantee that the Service will be
        uninterrupted, error-free, or that any donor match will be successful.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    body: (
      <p>
        To the fullest extent permitted under the laws of Bangladesh, Bloodflow
        and its officers, employees, and affiliates shall not be liable for any
        indirect, incidental, special, or consequential damages arising out of
        your use of, or inability to use, the Service — including damages
        related to any blood donation or medical outcome arranged through the
        Service.
      </p>
    ),
  },
  {
    id: "indemnity",
    title: "Indemnification",
    body: (
      <p>
        You agree to indemnify and hold harmless Bloodflow and its affiliates
        from any claims, damages, or expenses (including reasonable legal fees)
        arising from your use of the Service, your violation of these Terms, or
        your violation of any rights of another party.
      </p>
    ),
  },
  {
    id: "law",
    title: "Governing Law & Disputes",
    body: (
      <p>
        These Terms are governed by and construed in accordance with the laws of
        the People&rsquo;s Republic of Bangladesh, without regard to its
        conflict-of-law principles. Any dispute arising out of or relating to
        these Terms or the Service shall be subject to the exclusive
        jurisdiction of the courts of <span>[Dhaka]</span>, Bangladesh.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to These Terms",
    body: (
      <p>
        We may update these Terms from time to time. If we make material
        changes, we will notify you by posting the updated Terms on this page
        with a new &ldquo;Last updated&rdquo; date, and where appropriate, by
        direct notice (e.g. email). Continued use of the Service after changes
        take effect constitutes acceptance of the revised Terms.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact Us",
    body: (
      <>
        <p>If you have questions about these Terms, please contact us at:</p>
        <p>
          <span className="font-semibold">Bloodflow</span>
          <br />
          Email: <span className="font-medium">support@bloodflow.app</span>
          <br />
          Address: <span className="font-medium">Dhaka, Bangladesh</span>
        </p>
      </>
    ),
  },
];

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#fffdfc] text-neutral-900">
      {/* Header */}
      <header className="bg-linear-to-br from-red-600 to-red-900 px-6 py-12 text-center text-white sm:py-16">
        <div className="text-4xl">🩸</div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-white/85">
          Bloodflow — connecting blood donors and recipients
        </p>
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-10">
        {/* Effective date banner */}
        <div className="mb-10 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-[13.5px] text-red-800">
          Last updated: <span>August 1, 2026</span> ·
          Governed by the laws of the People&rsquo;s Republic of Bangladesh
        </div>

        {/* Table of contents */}
        <nav
          aria-label="Table of contents"
          className="mb-10 rounded-xl border border-neutral-200 bg-white px-5 py-4"
        >
          <h2 className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-neutral-500">
            On this page
          </h2>
          <ol className="columns-1 gap-x-8 pl-4 text-sm sm:columns-2">
            {sections.map((s) => (
              <li
                key={s.id}
                className="mb-1.5 list-decimal marker:text-neutral-400"
              >
                <a
                  href={`#${s.id}`}
                  className="hover:text-red-700 hover:underline"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Sections */}
        {sections.map((s, i) => (
          <section key={s.id} id={s.id} className="mb-9 scroll-mt-6">
            <h2 className="mb-3.5 border-b-2 border-neutral-200 pb-2 text-lg font-semibold">
              <span className="mr-2 text-red-600">{i + 1}.</span>
              {s.title}
            </h2>
            <div className="space-y-3 text-[15px] leading-relaxed text-neutral-700 [&_.fill]:rounded [&_.fill]:bg-amber-100 [&_.fill]:px-1 [&_.fill]:font-semibold [&_.fill]:text-neutral-900">
              {s.body}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
