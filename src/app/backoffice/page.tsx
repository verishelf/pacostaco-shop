import Link from "next/link";
import { PageHeader } from "@/backoffice/components/PageHeader";
import { StatCard } from "@/backoffice/components/StatCard";
import {
  formatCurrency,
  mockLocation,
  mockRoyalties,
  mockStats,
} from "@/backoffice/data/mock-data";

export default function BackofficeOverviewPage() {
  const dueRoyalty = mockRoyalties.find((r) => r.status === "due");

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        title="Dashboard Overview"
        description={`${mockLocation.name} — Performance snapshot`}
      />

      <div className="mb-6 grid gap-4 sm:mb-8 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {mockStats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <h3 className="mb-4 font-bold text-taco-dark">Location Health</h3>
          <dl className="space-y-3">
            <div className="flex justify-between">
              <dt className="text-gray-600">Monthly Revenue</dt>
              <dd className="font-bold">{formatCurrency(mockLocation.monthlyRevenue)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Labor Cost</dt>
              <dd className="font-bold">{mockLocation.laborPercent}%</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Food Cost</dt>
              <dd className="font-bold">{mockLocation.foodCostPercent}%</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Status</dt>
              <dd>
                <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-bold text-green-700 uppercase">
                  {mockLocation.status}
                </span>
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:p-6">
          <h3 className="mb-2 font-bold text-taco-dark">Royalty Reminder</h3>
          {dueRoyalty ? (
            <>
              <p className="text-sm text-gray-600">
                {dueRoyalty.period} — Royalty &amp; marketing fees due
              </p>
              <p className="mt-2 text-2xl font-black text-taco-red">
                {formatCurrency(dueRoyalty.royaltyDue + dueRoyalty.marketingDue)}
              </p>
              <Link
                href="/backoffice/reports"
                className="mt-4 inline-block text-sm font-bold text-taco-teal hover:underline"
              >
                View reports →
              </Link>
            </>
          ) : (
            <p className="text-sm text-gray-600">All royalties current.</p>
          )}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:mt-8 sm:p-6">
        <h3 className="mb-4 font-bold text-taco-dark">Quick Actions</h3>
        <div className="grid gap-3 sm:flex sm:flex-wrap">
          {[
            { href: "/backoffice/ordering", label: "Place Distributor Order" },
            { href: "/backoffice/menu", label: "Update Menu Pricing" },
            { href: "/backoffice/location", label: "Edit Store Hours" },
            { href: "/backoffice/documents", label: "Download Ops Manual" },
            { href: "/backoffice/settings", label: "Account Settings" },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-center text-sm font-bold text-taco-dark transition hover:border-taco-teal hover:text-taco-teal sm:py-2"
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
