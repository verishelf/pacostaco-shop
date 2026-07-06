import { PageHeader } from "@/backoffice/components/PageHeader";
import { mockDocuments } from "@/backoffice/data/mock-data";

const categoryLabels = {
  operations: "Operations",
  marketing: "Marketing",
  legal: "Legal",
  training: "Training",
};

export default function BackofficeDocumentsPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title="Franchise Documents"
        description="Operations manuals, brand assets, and legal agreements from corporate"
      />

      <div className="space-y-3">
        {mockDocuments.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-taco-teal"
          >
            <div>
              <h3 className="font-bold text-taco-dark">{doc.title}</h3>
              <p className="text-sm text-gray-500">
                {categoryLabels[doc.category]} · Updated{" "}
                {new Date(doc.updatedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <button
              type="button"
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-bold text-taco-teal hover:bg-teal-50"
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
