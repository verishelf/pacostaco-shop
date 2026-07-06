import { PageHeader } from "@/backoffice/components/PageHeader";
import { InquiryStatusSelect } from "@/backoffice/components/InquiryStatusSelect";
import { getCateringInquiries } from "@/lib/data/inquiries";

const statusColors = {
  new: "bg-amber-100 text-amber-700",
  contacted: "bg-blue-100 text-blue-700",
  qualified: "bg-teal-100 text-teal-700",
  closed: "bg-green-100 text-green-700",
  spam: "bg-gray-100 text-gray-500",
};

export default async function BackofficeCateringPage() {
  const inquiries = await getCateringInquiries();
  const newCount = inquiries.filter((item) => item.status === "new").length;

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Catering Leads"
        description="Inbound catering requests for your location"
      />

      {newCount > 0 && (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <p className="font-bold text-amber-800">
            {newCount} new lead{newCount === 1 ? "" : "s"} need follow-up
          </p>
        </div>
      )}

      <div className="space-y-4">
        {inquiries.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-500">
            No catering leads yet. They&apos;ll appear here when guests submit the form on
            the public site.
          </div>
        ) : (
          inquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-bold text-taco-dark">{inquiry.contact_name}</h3>
                  <p className="text-sm text-gray-500">
                    {inquiry.contact_email} · {inquiry.contact_phone}
                  </p>
                  <p className="mt-2 text-xs text-gray-400">
                    Submitted{" "}
                    {new Date(inquiry.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-bold uppercase ${statusColors[inquiry.status]}`}
                  >
                    {inquiry.status}
                  </span>
                  <InquiryStatusSelect
                    type="catering"
                    id={inquiry.id}
                    currentStatus={inquiry.status}
                  />
                </div>
              </div>
              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                {inquiry.event_date && (
                  <div>
                    <dt className="text-gray-400">Event Date</dt>
                    <dd className="font-medium">
                      {new Date(inquiry.event_date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </dd>
                  </div>
                )}
                {inquiry.guest_count && (
                  <div>
                    <dt className="text-gray-400">Guests</dt>
                    <dd className="font-medium">{inquiry.guest_count}</dd>
                  </div>
                )}
                {inquiry.event_type && (
                  <div>
                    <dt className="text-gray-400">Event Type</dt>
                    <dd className="font-medium">{inquiry.event_type}</dd>
                  </div>
                )}
              </dl>
              {inquiry.message && (
                <p className="mt-4 rounded-xl bg-gray-50 p-3 text-sm text-gray-600">
                  {inquiry.message}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
