function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatInline(text: string): string {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>");
}

export function renderMarkdown(markdown: string): string {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html: string[] = [];
  let inList = false;
  let listType: "ul" | "ol" | null = null;
  let index = 0;

  const closeList = () => {
    if (inList && listType) {
      html.push(`</${listType}>`);
      inList = false;
      listType = null;
    }
  };

  const parseTableRow = (row: string) =>
    row
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) => cell.trim());

  const isTableSeparator = (row: string) =>
    /^\|?[\s:-]+\|[\s|:-]+\|?$/.test(row.trim());

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      closeList();
      index += 1;
      continue;
    }

    if (trimmed.startsWith("|") && index + 1 < lines.length && isTableSeparator(lines[index + 1])) {
      closeList();
      const headerCells = parseTableRow(trimmed);
      index += 2;

      const bodyRows: string[][] = [];
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        bodyRows.push(parseTableRow(lines[index]));
        index += 1;
      }

      html.push("<table>");
      html.push("<thead><tr>");
      headerCells.forEach((cell) => {
        html.push(`<th>${formatInline(cell)}</th>`);
      });
      html.push("</tr></thead><tbody>");
      bodyRows.forEach((row) => {
        html.push("<tr>");
        row.forEach((cell) => {
          html.push(`<td>${formatInline(cell)}</td>`);
        });
        html.push("</tr>");
      });
      html.push("</tbody></table>");
      continue;
    }

    if (trimmed === "---") {
      closeList();
      html.push("<hr />");
      index += 1;
      continue;
    }

    const headingMatch = trimmed.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      closeList();
      const level = headingMatch[1].length;
      html.push(`<h${level}>${formatInline(headingMatch[2])}</h${level}>`);
      index += 1;
      continue;
    }

    const unorderedMatch = trimmed.match(/^[-*]\s+(.+)$/);
    if (unorderedMatch) {
      if (!inList || listType !== "ul") {
        closeList();
        html.push("<ul>");
        inList = true;
        listType = "ul";
      }
      html.push(`<li>${formatInline(unorderedMatch[1])}</li>`);
      index += 1;
      continue;
    }

    const orderedMatch = trimmed.match(/^\d+\.\s+(.+)$/);
    if (orderedMatch) {
      if (!inList || listType !== "ol") {
        closeList();
        html.push("<ol>");
        inList = true;
        listType = "ol";
      }
      html.push(`<li>${formatInline(orderedMatch[1])}</li>`);
      index += 1;
      continue;
    }

    closeList();
    html.push(`<p>${formatInline(trimmed)}</p>`);
    index += 1;
  }

  closeList();
  return html.join("\n");
}
