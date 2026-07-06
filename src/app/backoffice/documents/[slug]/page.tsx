import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/backoffice/components/PageHeader";
import { DocumentViewer } from "@/backoffice/components/DocumentViewer";
import {
  categoryLabels,
  getFranchiseDocument,
} from "@/backoffice/data/franchise-documents";
import { getDocumentHtml } from "@/backoffice/lib/document-content";

interface DocumentPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { franchiseDocuments } = await import("@/backoffice/data/franchise-documents");
  return franchiseDocuments.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: DocumentPageProps) {
  const { slug } = await params;
  const document = getFranchiseDocument(slug);

  if (!document) {
    return { title: "Document Not Found | Paco's Taco Shop" };
  }

  return {
    title: `${document.title} | Paco's Taco Shop Back Office`,
    description: document.description,
  };
}

export default async function FranchiseDocumentPage({ params }: DocumentPageProps) {
  const { slug } = await params;
  const document = getFranchiseDocument(slug);

  if (!document) {
    notFound();
  }

  const html = await getDocumentHtml(slug);

  if (!html) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <Link
          href="/backoffice/documents"
          className="text-sm font-bold text-taco-teal hover:underline"
        >
          ← All Documents
        </Link>
      </div>

      <PageHeader
        title={document.title}
        description={`${categoryLabels[document.category]} · Updated ${new Date(
          document.updatedAt,
        ).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}${document.pages ? ` · ${document.pages} pages` : ""}`}
      />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <a
          href={`/franchise-documents/${document.fileName}`}
          download
          className="inline-flex items-center justify-center rounded-xl bg-taco-teal px-5 py-2.5 text-sm font-bold text-white transition hover:bg-teal-800"
        >
          Download
        </a>
        <p className="text-sm text-gray-500 sm:self-center">{document.description}</p>
      </div>

      <DocumentViewer html={html} />
    </div>
  );
}
