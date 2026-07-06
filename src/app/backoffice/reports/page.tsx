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

      <div className="mb-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Royalty Rate</p>
          <p className="text-2xl font-black text-taco-dark">6%</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Marketing Fund</p>
          <p className="text-2xl font-black text-taco-dark">2%</p>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <p className="text-sm text-gray-500">Current Balance Due</p>
          <p className="text-2xl font-black text-taco-red">
            {formatCurrency(5905.2 + 1968.4)}
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
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
        className="mt-6 rounded-xl bg-taco-red px-6 py-2.5 text-sm font-bold text-white hover:bg-red-700"
      >
        Submit June Sales Report
      </button>
    </div>
  );
}
