import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Bloodflow",
  description:
    "How Bloodflow collects, uses, and protects your personal and health-related information.",
};

type Section = {
  id: string;
  title: string;
  body: React.ReactNode;
};

const sections: Section[] = [
  {
    id: "intro",
    title: "Introduction",
    body: (
      <p>
        This Privacy Policy explains how{" "}
        <span className="font-semibold">Bloodflow</span>{" "}
        we collects, uses, discloses, and protects your
        information when you use the Bloodflow website, mobile application, and
        related services. By using the
        Service, you agree to the collection and use of information as described
        here. If you do not agree, please do not use the Service.
      </p>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    body: (
      <>
        <p>We collect the following categories of information:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong>Account information</strong> — name, email address, phone
            number, password, and profile photo.
          </li>
          <li>
            <strong>Donor &amp; health-related information</strong> — blood
            group, last donation date, and self-reported eligibility details you
            choose to provide.
          </li>
          <li>
            <strong>Location information</strong> — city/area you provide, or
            precise location if you grant permission, used to match you with
            nearby donors or requests.
          </li>
          <li>
            <strong>Usage data</strong> — pages visited, actions taken, device
            type, browser, and IP address, collected automatically.
          </li>
          <li>
            <strong>Communications</strong> — messages sent through the Service,
            and any correspondence with our support team.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "health-data-notice",
    title: "Special Note on Health-Related Information",
    body: (
      <div className="rounded-md border-l-4 border-red-600 bg-red-50 px-4 py-3 text-[14.5px] text-neutral-800">
        <strong className="text-red-800">Sensitive information.</strong> Your
        blood group and donation history are sensitive personal information. We
        collect this only because it is essential to the Service&rsquo;s purpose
        — matching donors with people in need — and we limit its visibility and
        use accordingly, as described in this Policy. You control what
        health-related information you share, and you may decline to provide
        optional fields, though this may limit your ability to be matched as a
        donor.
      </div>
    ),
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    body: (
      <ul className="list-disc space-y-1.5 pl-5">
        <li>To create and manage your account;</li>
        <li>
          To match donors with recipients or blood requests based on blood group
          and location;
        </li>
        <li>
          To send you notifications about matching requests, account activity,
          or updates;
        </li>
        <li>To respond to support inquiries;</li>
        <li>
          To detect, prevent, and address fraud, abuse, or security issues;
        </li>
        <li>To improve and maintain the Service;</li>
        <li>To comply with legal obligations under applicable law.</li>
      </ul>
    ),
  },
  {
    id: "sharing",
    title: "How We Share Your Information",
    body: (
      <>
        <p>
          We do not sell your personal information. We share it only in these
          circumstances:
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong>With matched users</strong> — when you respond to or post a
            blood request, limited profile details (name, blood group, contact
            method) are shared with the matched donor or recipient so they can
            coordinate directly.
          </li>
          <li>
            <strong>With service providers</strong> — third parties who help us
            operate the Service (e.g. hosting, email delivery), bound by
            confidentiality obligations.
          </li>
          <li>
            <strong>For legal reasons</strong> — if required by law, court
            order, or to protect the rights, safety, or property of Bloodflow,
            our users, or the public.
          </li>
          <li>
            <strong>With your consent</strong> — for any other purpose you
            specifically agree to.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies & Tracking",
    body: (
      <p>
        We use cookies and similar technologies (such as local storage and
        access/refresh tokens) to keep you signed in, remember your preferences,
        and understand how the Service is used. You can control cookies through
        your browser settings, though disabling them may affect your ability to
        stay logged in or use certain features.
      </p>
    ),
  },
  {
    id: "data-retention",
    title: "Data Retention",
    body: (
      <p>
        We retain your information for as long as your account is active, or as
        needed to provide the Service. If you delete your account, we will
        delete or anonymize your personal information within a reasonable
        period, except where we are required to retain it to comply with legal
        obligations, resolve disputes, or enforce our agreements.
      </p>
    ),
  },
  {
    id: "security",
    title: "Data Security",
    body: (
      <p>
        We use reasonable technical and organizational measures — including
        password hashing and access controls — to protect your information from
        unauthorized access, alteration, or disclosure. However, no method of
        transmission or storage is completely secure, and we cannot guarantee
        absolute security.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your Rights & Choices",
    body: (
      <ul className="list-disc space-y-1.5 pl-5">
        <li>
          <strong>Access &amp; correction</strong> — you can view and update
          most of your information directly from your account settings.
        </li>
        <li>
          <strong>Deletion</strong> — you can request deletion of your account
          and associated data by contacting us.
        </li>
        <li>
          <strong>Marketing communications</strong> — you can opt out of
          non-essential notifications at any time through your account settings.
        </li>
        <li>
          <strong>Withdrawing consent</strong> — where processing is based on
          consent (such as precise location), you may withdraw it at any time,
          which may limit certain features.
        </li>
      </ul>
    ),
  },
  {
    id: "children",
    title: "Children's Privacy",
    body: (
      <p>
        The Service is not directed to individuals under 18. We do not knowingly
        collect personal information from minors. If you believe a minor has
        provided us with personal information, please contact us so we can
        remove it.
      </p>
    ),
  },
  {
    id: "third-party-links",
    title: "Third-Party Links",
    body: (
      <p>
        The Service may link to third-party websites or services (such as
        partner hospitals). This Policy does not apply to those third parties,
        and we encourage you to review their privacy practices separately.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    body: (
      <p>
        We may update this Privacy Policy from time to time. If we make material
        changes, we will notify you by posting the updated Policy on this page
        with a new &ldquo;Last updated&rdquo; date, and where appropriate, by
        direct notice (e.g. email). Continued use of the Service after changes
        take effect constitutes acceptance of the revised Policy.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact Us",
    body: (
      <>
        <p>
          If you have questions about this Privacy Policy or your information,
          contact us at:
        </p>
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

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#fffdfc] text-neutral-900">
      {/* Header */}
      <header className="bg-linear-to-br from-red-600 to-red-900 px-6 py-12 text-center text-white sm:py-16">
        <div className="text-4xl">🩸</div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Privacy Policy
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
