import { PageHeader } from "@/backoffice/components/PageHeader";
import { mockOwner } from "@/backoffice/data/mock-data";

export default function BackofficeSettingsPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title="Account Settings"
        description="Manage your franchise owner profile and notification preferences"
      />

      <form className="space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-bold text-taco-dark">
              Full Name
            </label>
            <input
              type="text"
              defaultValue={mockOwner.name}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-bold text-taco-dark">
              Email
            </label>
            <input
              type="email"
              defaultValue={mockOwner.email}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-bold text-taco-dark">
            Organization
          </label>
          <input
            type="text"
            defaultValue={mockOwner.organization}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm"
            disabled
          />
        </div>

        <div>
          <h3 className="mb-3 font-bold text-taco-dark">Notifications</h3>
          <div className="space-y-2">
            {[
              "Royalty payment reminders",
              "Corporate announcements",
              "Menu update alerts",
              "Weekly performance summary",
            ].map((label) => (
              <label key={label} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-gray-300 text-taco-teal"
                />
                <span className="text-sm text-gray-600">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="rounded-xl bg-taco-teal px-6 py-2.5 text-sm font-bold text-white hover:bg-teal-800"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}
