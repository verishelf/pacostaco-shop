import { PageHeader } from "@/backoffice/components/PageHeader";
import { mockMenuOverrides } from "@/backoffice/data/mock-data";

function formatPrice(price: number) {
  return `$${price.toFixed(2)}`;
}

export default function BackofficeMenuPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Menu Management"
        description="Override corporate pricing and toggle item availability for your location"
      />

      <div className="space-y-4 lg:hidden">
        {mockMenuOverrides.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <h3 className="font-bold text-taco-dark">{item.name}</h3>
            <dl className="mt-3 space-y-3 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-gray-500">Corporate Price</dt>
                <dd className="font-medium">{formatPrice(item.corporatePrice)}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-gray-500">Your Price</dt>
                <dd>
                  <input
                    type="number"
                    step="0.01"
                    defaultValue={item.localPrice}
                    className="w-28 rounded-lg border border-gray-200 px-2 py-1"
                  />
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-gray-500">Available</dt>
                <dd>
                  <label className="inline-flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      defaultChecked={item.available}
                      className="h-4 w-4 rounded border-gray-300 text-taco-teal"
                    />
                    <span className="text-gray-600">
                      {item.available ? "Yes" : "No"}
                    </span>
                  </label>
                </dd>
              </div>
            </dl>
          </div>
        ))}
      </div>

      <div className="hidden overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm lg:block">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-3 font-bold text-taco-dark">Item</th>
              <th className="px-6 py-3 font-bold text-taco-dark">Corporate Price</th>
              <th className="px-6 py-3 font-bold text-taco-dark">Your Price</th>
              <th className="px-6 py-3 font-bold text-taco-dark">Available</th>
            </tr>
          </thead>
          <tbody>
            {mockMenuOverrides.map((item) => (
              <tr key={item.id} className="border-b border-gray-100">
                <td className="px-6 py-4 font-medium">{item.name}</td>
                <td className="px-6 py-4 text-gray-500">
                  {formatPrice(item.corporatePrice)}
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    step="0.01"
                    defaultValue={item.localPrice}
                    className="w-24 rounded-lg border border-gray-200 px-2 py-1"
                  />
                </td>
                <td className="px-6 py-4">
                  <label className="inline-flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      defaultChecked={item.available}
                      className="h-4 w-4 rounded border-gray-300 text-taco-teal"
                    />
                    <span className="text-gray-600">
                      {item.available ? "Yes" : "No"}
                    </span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          className="rounded-xl bg-taco-teal px-6 py-2.5 text-sm font-bold text-white hover:bg-teal-800"
        >
          Save Menu Changes
        </button>
        <p className="text-xs text-gray-400">
          Price changes outside ±15% require corporate approval.
        </p>
      </div>
    </div>
  );
}
