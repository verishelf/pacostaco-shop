"use client";

import { useState } from "react";

const checklistItems = [
  { id: "temps", label: "Log walk-in and line temperatures" },
  { id: "prep", label: "Review prep list and 86'd items" },
  { id: "cash", label: "Verify cash drawers ($150 bank)" },
  { id: "staffing", label: "Confirm shift staffing vs. forecast" },
  { id: "lowstock", label: "Review low-stock items for ordering" },
  { id: "catering", label: "Follow up on open catering leads" },
];

const STORAGE_KEY = "pacos-daily-checklist";

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function loadChecked(): Record<string, boolean> {
  if (typeof window === "undefined") {
    return {};
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as { date: string; checked: Record<string, boolean> };
    if (parsed.date !== getTodayKey()) {
      return {};
    }
    return parsed.checked;
  } catch {
    return {};
  }
}

export function TodayChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>(loadChecked);

  function toggle(id: string) {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ date: getTodayKey(), checked: next }),
    );
  }

  const completed = checklistItems.filter((item) => checked[item.id]).length;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-bold text-taco-dark">Today&apos;s Manager Checklist</h3>
        <span className="text-xs font-bold text-taco-teal">
          {completed}/{checklistItems.length}
        </span>
      </div>
      <ul className="space-y-2">
        {checklistItems.map((item) => (
          <li key={item.id}>
            <label className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-gray-50">
              <input
                type="checkbox"
                checked={Boolean(checked[item.id])}
                onChange={() => toggle(item.id)}
                className="h-4 w-4 rounded border-gray-300 text-taco-teal"
              />
              <span
                className={`text-sm ${
                  checked[item.id] ? "text-gray-400 line-through" : "text-gray-700"
                }`}
              >
                {item.label}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
