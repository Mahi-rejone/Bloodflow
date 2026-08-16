import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact Us | Bloodflow",
  description:
    "Get in touch with the Bloodflow team — we usually reply within a day.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#fffdfc] text-neutral-900">
      <header className="bg-linear-to-br from-red-600 to-red-900 px-6 py-12 text-center text-white sm:py-16">
        <div className="text-4xl" aria-hidden="true">
          🩸
        </div>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Contact Us
        </h1>

        <p className="mt-2 text-sm text-white/85">
          Questions, feedback, or an issue with a donation match? Send us a
          message.
        </p>
      </header>

      <main className="mx-auto max-w-xl px-6 pb-24 pt-10">
        <ContactForm />

        <p className="mt-8 text-center text-xs text-neutral-500">
          Prefer email? Reach us directly at{" "}
          <a
            href="mailto:contact@yourdomain.com"
            className="text-red-700 underline underline-offset-2"
          >
            support@bloodflow.app
          </a>
        </p>
      </main>
    </div>
  );
}
