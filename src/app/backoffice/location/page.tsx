import { PageHeader } from "@/backoffice/components/PageHeader";
import { mockLocation } from "@/backoffice/data/mock-data";

export default function BackofficeLocationPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title="My Location"
        description="Manage store profile, hours, and contact information"
      />

      <form className="space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-bold text-taco-dark">
              Store Name
            </label>
            <input
              type="text"
              defaultValue={mockLocation.name}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-bold text-taco-dark">
              Status
            </label>
            <select
              defaultValue={mockLocation.status}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm"
            >
              <option value="open">Open</option>
              <option value="training">Training</option>
              <option value="remodel">Remodel</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-bold text-taco-dark">
            Street Address
          </label>
          <input
            type="text"
            defaultValue={mockLocation.address}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-bold text-taco-dark">City</label>
            <input
              type="text"
              defaultValue={mockLocation.city}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-bold text-taco-dark">State</label>
            <input
              type="text"
              defaultValue={mockLocation.state}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-bold text-taco-dark">Phone</label>
            <input
              type="tel"
              defaultValue="(555) 123-TACO"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm"
            />
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-bold text-taco-dark">Hours of Operation</h3>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              { day: "Mon – Thu", hours: "10:00 AM – 9:00 PM" },
              { day: "Fri – Sat", hours: "10:00 AM – 11:00 PM" },
              { day: "Sunday", hours: "9:00 AM – 8:00 PM" },
            ].map((row) => (
              <div key={row.day} className="flex items-center gap-3">
                <span className="w-24 text-sm font-medium text-gray-600">{row.day}</span>
                <input
                  type="text"
                  defaultValue={row.hours}
                  className="flex-1 rounded-xl border border-gray-200 px-4 py-2 text-sm"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 border-t border-gray-100 pt-6">
          <button
            type="button"
            className="rounded-xl bg-taco-teal px-6 py-2.5 text-sm font-bold text-white hover:bg-teal-800"
          >
            Save Changes
          </button>
          <button
            type="button"
            className="rounded-xl border border-gray-200 px-6 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
        <p className="text-xs text-gray-400">
          Changes sync to the public website and corporate HQ upon approval.
        </p>
      </form>
    </div>
  );
}
