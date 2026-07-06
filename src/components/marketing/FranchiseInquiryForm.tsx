"use client";

import { useActionState } from "react";
import { submitFranchiseInquiry } from "@/lib/actions/inquiries";

const initialState = { success: false, message: "" };

export function FranchiseInquiryForm() {
  const [state, formAction, pending] = useActionState(
    async (_prev: typeof initialState, formData: FormData) =>
      submitFranchiseInquiry(formData),
    initialState,
  );

  if (state.success) {
    return (
      <div className="rounded-2xl border border-white/30 bg-white/10 p-6 text-center text-white">
        <p className="text-lg font-bold">Thank you for your interest!</p>
        <p className="mt-2 text-sm text-teal-100">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4 text-left">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-bold text-white">Full Name *</label>
          <input
            name="contactName"
            required
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-teal-200"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-bold text-white">Phone *</label>
          <input
            name="contactPhone"
            type="tel"
            required
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-teal-200"
            placeholder="(555) 123-4567"
          />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-bold text-white">Email *</label>
        <input
          name="contactEmail"
          type="email"
          required
          className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-teal-200"
          placeholder="you@email.com"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-bold text-white">City of Interest *</label>
          <input
            name="city"
            required
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-teal-200"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-bold text-white">State *</label>
          <input
            name="state"
            required
            maxLength={2}
            placeholder="CA"
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-teal-200"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-bold text-white">Investment Range</label>
          <select
            name="investmentRange"
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white"
          >
            <option value="" className="text-taco-dark">Select...</option>
            <option className="text-taco-dark">Under $300,000</option>
            <option className="text-taco-dark">$300,000 – $500,000</option>
            <option className="text-taco-dark">$500,000 – $750,000</option>
            <option className="text-taco-dark">$750,000+</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-bold text-white">Restaurant Experience</label>
          <select
            name="restaurantExperience"
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white"
          >
            <option value="" className="text-taco-dark">Select...</option>
            <option className="text-taco-dark">None</option>
            <option className="text-taco-dark">1–5 years</option>
            <option className="text-taco-dark">5–10 years</option>
            <option className="text-taco-dark">10+ years</option>
          </select>
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-bold text-white">Tell us about yourself</label>
        <textarea
          name="message"
          rows={3}
          className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-teal-200"
          placeholder="Why Paco's? Timeline? Multi-unit interest?"
        />
      </div>
      {state.message && !state.success && (
        <p className="text-sm text-red-200">{state.message}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-white px-8 py-4 font-extrabold text-taco-teal shadow-lg transition hover:bg-amber-50 disabled:opacity-50"
      >
        {pending ? "Submitting..." : "Submit Franchise Inquiry"}
      </button>
    </form>
  );
}
