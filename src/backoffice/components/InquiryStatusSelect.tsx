"use client";

import { useTransition } from "react";
import { updateInquiryStatus } from "@/lib/actions/inquiries";
import type { InquiryStatus } from "@/lib/data/inquiries";

interface InquiryStatusSelectProps {
  type: "catering" | "franchise";
  id: string;
  currentStatus: InquiryStatus;
}

const statuses: InquiryStatus[] = ["new", "contacted", "qualified", "closed", "spam"];

export function InquiryStatusSelect({
  type,
  id,
  currentStatus,
}: InquiryStatusSelectProps) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      defaultValue={currentStatus}
      disabled={pending}
      onChange={(event) => {
        startTransition(async () => {
          await updateInquiryStatus(type, id, event.target.value as InquiryStatus);
        });
      }}
      className="rounded-lg border border-gray-200 px-2 py-1 text-xs font-semibold"
    >
      {statuses.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
}
