import { PageHeader } from "@/backoffice/components/PageHeader";
import { formatCurrency, mockRoyalties } from "@/backoffice/data/mock-data";

const statusStyles = {
  paid: "bg-green-100 text-green-700",
  due: "bg-amber-100 text-amber-700",
  overdue: "bg-red-100 text-red-700",
};

export default function BackofficeReportsPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Royalties & Reports"
        description="Monthly sales reports, royalty calculations, and payment history"
      />

      <div className="mb-6 grid gap-4 sm:mb-8 sm:gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <p className="text-sm text-gray-500">Royalty Rate</p>
          <p className="text-2xl font-black text-taco-dark">6%</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <p className="text-sm text-gray-500">Marketing Fund</p>
          <p className="text-2xl font-black text-taco-dark">2%</p>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:p-6">
          <p className="text-sm text-gray-500">Current Balance Due</p>
          <p className="text-2xl font-black text-taco-red">
            {formatCurrency(5905.2 + 1968.4)}
          </p>
        </div>
      </div>

      <div className="space-y-4 lg:hidden">
        {mockRoyalties.map((report) => (
          <div
            key={report.period}
            className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-bold text-taco-dark">{report.period}</h3>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-bold uppercase ${statusStyles[report.status]}`}
              >
                {report.status}
              </span>
            </div>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500">Gross Sales</dt>
                <dd className="font-medium">{formatCurrency(report.grossSales)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500">Royalty (6%)</dt>
                <dd className="font-medium">{formatCurrency(report.royaltyDue)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500">Marketing (2%)</dt>
                <dd className="font-medium">{formatCurrency(report.marketingDue)}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>

      <div className="hidden overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm lg:block">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-3 font-bold text-taco-dark">Period</th>
              <th className="px-6 py-3 font-bold text-taco-dark">Gross Sales</th>
              <th className="px-6 py-3 font-bold text-taco-dark">Royalty (6%)</th>
              <th className="px-6 py-3 font-bold text-taco-dark">Marketing (2%)</th>
              <th className="px-6 py-3 font-bold text-taco-dark">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockRoyalties.map((report) => (
              <tr key={report.period} className="border-b border-gray-100">
                <td className="px-6 py-4 font-medium">{report.period}</td>
                <td className="px-6 py-4">{formatCurrency(report.grossSales)}</td>
                <td className="px-6 py-4">{formatCurrency(report.royaltyDue)}</td>
                <td className="px-6 py-4">{formatCurrency(report.marketingDue)}</td>
                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-bold uppercase ${statusStyles[report.status]}`}
                  >
                    {report.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        className="mt-6 w-full rounded-xl bg-taco-red px-6 py-2.5 text-sm font-bold text-white hover:bg-red-700 sm:w-auto"
      >
        Submit June Sales Report
      </button>
    </div>
  );
}
