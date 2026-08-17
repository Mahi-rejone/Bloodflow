// components/ContactForm.tsx
"use client";

import { useState } from "react";
import { useCreateContactMessageMutation } from "@/redux/feature/contact/contactApi";
import type { TContactMessagePayload } from "@/redux/feature/contact/contactApi";

export function ContactForm() {
  const [createContact, { isLoading, isSuccess, isError, error }] =
    useCreateContactMessageMutation();

  const [formData, setFormData] = useState<TContactMessagePayload>({
    name: "",
    email: "",
    message: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const result = await createContact(formData).unwrap();
      if (result.success) {
        setSuccessMessage(result.message || "Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (err: any) {
      setErrorMessage(
        err?.data?.message || "Something went wrong. Please try again.",
      );
    }
  };

  if (isSuccess && successMessage) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 px-6 py-8 text-center">
        <div className="text-3xl">✓</div>
        <h2 className="mt-2 text-lg font-semibold text-neutral-900">
          Message sent
        </h2>
        <p className="mt-1 text-sm text-neutral-600">{successMessage}</p>
        <button
          type="button"
          onClick={() => {
            setSuccessMessage(null);
            setFormData({ name: "", email: "", message: "" });
          }}
          className="mt-4 text-sm font-medium text-red-700 underline underline-offset-2"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl border border-neutral-200 bg-white p-6"
    >
      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-sm font-medium text-neutral-800"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your full name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-medium text-neutral-800"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-medium text-neutral-800"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="How can we help?"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full resize-none rounded-lg border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
        />
      </div>

      {(isError || errorMessage) && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {errorMessage || "Something went wrong. Please try again."}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
