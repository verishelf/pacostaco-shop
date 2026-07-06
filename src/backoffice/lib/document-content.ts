import { readFile } from "fs/promises";
import path from "path";
import { renderMarkdown } from "@/lib/markdown";
import { getFranchiseDocument } from "@/backoffice/data/franchise-documents";

export async function getDocumentHtml(slug: string): Promise<string | null> {
  const document = getFranchiseDocument(slug);
  if (!document) {
    return null;
  }

  const filePath = path.join(
    process.cwd(),
    "public",
    "franchise-documents",
    document.fileName,
  );

  const markdown = await readFile(filePath, "utf8");
  return renderMarkdown(markdown);
}
