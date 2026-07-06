import { PageHeader } from "@/backoffice/components/PageHeader";
import { InquiryStatusSelect } from "@/backoffice/components/InquiryStatusSelect";
import {
  getCateringInquiries,
  getFranchiseInquiries,
  getNewInquiryCount,
} from "@/lib/data/inquiries";

export default async function AdminLeadsPage() {
  const [catering, franchise] = await Promise.all([
    getCateringInquiries(),
    getFranchiseInquiries(),
  ]);
  const newCount = getNewInquiryCount(catering, franchise);

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        title="Lead Inbox"
        description="Catering requests and franchise development inquiries"
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">New Leads</p>
          <p className="text-3xl font-black text-taco-red">{newCount}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Catering Inquiries</p>
          <p className="text-3xl font-black text-taco-dark">{catering.length}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Franchise Inquiries</p>
          <p className="text-3xl font-black text-taco-dark">{franchise.length}</p>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="mb-4 text-lg font-bold text-taco-dark">Franchise Development</h2>
        <div className="space-y-4">
          {franchise.map((inquiry) => (
            <div
              key={inquiry.id}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                <div>
                  <h3 className="font-bold">{inquiry.contact_name}</h3>
                  <p className="text-sm text-gray-500">
                    {inquiry.city}, {inquiry.state} · {inquiry.contact_email}
                  </p>
                  <p className="text-sm text-gray-500">{inquiry.contact_phone}</p>
                </div>
                <InquiryStatusSelect
                  type="franchise"
                  id={inquiry.id}
                  currentStatus={inquiry.status}
                />
              </div>
              <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                {inquiry.investment_range && (
                  <div>
                    <dt className="text-gray-400">Investment</dt>
                    <dd>{inquiry.investment_range}</dd>
                  </div>
                )}
                {inquiry.restaurant_experience && (
                  <div>
                    <dt className="text-gray-400">Experience</dt>
                    <dd>{inquiry.restaurant_experience}</dd>
                  </div>
                )}
              </dl>
              {inquiry.message && (
                <p className="mt-3 text-sm text-gray-600">{inquiry.message}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-taco-dark">Catering (All Locations)</h2>
        <div className="space-y-4">
          {catering.map((inquiry) => (
            <div
              key={inquiry.id}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                <div>
                  <h3 className="font-bold">{inquiry.contact_name}</h3>
                  <p className="text-sm text-gray-500">
                    {inquiry.event_type ?? "Event"} · {inquiry.guest_count ?? "?"} guests
                  </p>
                  <p className="text-sm text-gray-500">{inquiry.contact_email}</p>
                </div>
                <InquiryStatusSelect
                  type="catering"
                  id={inquiry.id}
                  currentStatus={inquiry.status}
                />
              </div>
              {inquiry.message && (
                <p className="mt-3 text-sm text-gray-600">{inquiry.message}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
