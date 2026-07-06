"use client";

import { useActionState } from "react";
import { submitCateringInquiry } from "@/lib/actions/inquiries";

const initialState = { success: false, message: "" };

export function CateringInquiryForm() {
  const [state, formAction, pending] = useActionState(
    async (_prev: typeof initialState, formData: FormData) =>
      submitCateringInquiry(formData),
    initialState,
  );

  if (state.success) {
    return (
      <div className="rounded-2xl border border-teal-200 bg-teal-50 p-6 text-center">
        <p className="text-lg font-bold text-teal-800">Request received!</p>
        <p className="mt-2 text-sm text-teal-700">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-bold text-taco-dark">Name *</label>
          <input
            name="contactName"
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-bold text-taco-dark">Phone *</label>
          <input
            name="contactPhone"
            type="tel"
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm"
          />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-bold text-taco-dark">Email *</label>
        <input
          name="contactEmail"
          type="email"
          required
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-bold text-taco-dark">Event Date</label>
          <input
            name="eventDate"
            type="date"
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-bold text-taco-dark">Guest Count</label>
          <input
            name="guestCount"
            type="number"
            min={10}
            placeholder="50"
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-bold text-taco-dark">Event Type</label>
          <select
            name="eventType"
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm"
          >
            <option value="">Select...</option>
            <option>Corporate event</option>
            <option>Wedding</option>
            <option>Birthday party</option>
            <option>School / sports</option>
            <option>Other</option>
          </select>
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-bold text-taco-dark">Details</label>
        <textarea
          name="message"
          rows={4}
          placeholder="Tell us about your event, dietary needs, and setup preferences..."
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm"
        />
      </div>
      {state.message && !state.success && (
        <p className="text-sm text-red-600">{state.message}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-taco-red px-8 py-4 font-extrabold text-white shadow-lg transition hover:bg-red-700 disabled:opacity-50 sm:w-auto"
      >
        {pending ? "Submitting..." : "Request Catering Quote"}
      </button>
    </form>
  );
}
