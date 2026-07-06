import Link from "next/link";
import { PageHeader } from "@/backoffice/components/PageHeader";
import {
  categoryLabels,
  franchiseDocuments,
  type FranchiseDocumentCategory,
} from "@/backoffice/data/franchise-documents";

const categoryOrder: FranchiseDocumentCategory[] = [
  "operations",
  "marketing",
  "legal",
  "training",
];

export default function BackofficeDocumentsPage() {
  const documentsByCategory = categoryOrder.map((category) => ({
    category,
    documents: franchiseDocuments.filter((doc) => doc.category === category),
  }));

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title="Franchise Documents"
        description="Operations manuals, brand assets, legal agreements, and training materials from corporate"
      />

      <div className="space-y-8">
        {documentsByCategory.map(({ category, documents }) => (
          <section key={category}>
            <h3 className="mb-3 text-sm font-bold tracking-wide text-gray-500 uppercase">
              {categoryLabels[category]}
            </h3>
            <div className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-taco-teal sm:p-5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-taco-dark">{doc.title}</h4>
                      <p className="mt-1 text-sm text-gray-600">{doc.description}</p>
                      <p className="mt-2 text-xs text-gray-400">
                        Updated{" "}
                        {new Date(doc.updatedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                        {doc.pages ? ` · ${doc.pages} pages` : ""}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 sm:w-40">
                      <Link
                        href={`/backoffice/documents/${doc.slug}`}
                        className="rounded-lg bg-taco-teal px-4 py-2 text-center text-sm font-bold text-white transition hover:bg-teal-800"
                      >
                        View
                      </Link>
                      <a
                        href={`/franchise-documents/${doc.fileName}`}
                        download
                        className="rounded-lg border border-gray-200 px-4 py-2 text-center text-sm font-bold text-taco-teal transition hover:bg-teal-50"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
