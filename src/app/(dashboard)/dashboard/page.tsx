import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <h2 className="mb-2 text-xl font-bold text-taco-dark">
          Franchise Dashboard — Coming in Phase 2
        </h2>
        <p className="text-gray-600">
          This portal will let franchisees manage their location hours, menu
          overrides, and view store performance. Authentication via Supabase Auth
          is required before this area goes live.
        </p>
        <Link
          href="/auth/login"
          className="mt-4 inline-block rounded-xl bg-taco-teal px-6 py-2.5 text-sm font-bold text-white transition hover:bg-teal-800"
        >
          Sign In (Preview)
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          { label: "Today's Orders", value: "—" },
          { label: "Weekly Revenue", value: "—" },
          { label: "Menu Items Active", value: "—" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-black text-taco-dark">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
