interface DocumentViewerProps {
  html: string;
}

export function DocumentViewer({ html }: DocumentViewerProps) {
  return (
    <article
      className="document-content rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
