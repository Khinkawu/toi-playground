"use client";

import { useMemo } from "react";

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderMarkdown(md: string): string {
  let html = escapeHtml(md);

  // code blocks
  html = html.replace(/```[\w]*\n([\s\S]*?)```/g, (_, code) => {
    return `<pre><code>${code}</code></pre>`;
  });

  // inline code
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // bold
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // tables (markdown)
  const tableRegex = /(\|.+\|\n)+/g;
  html = html.replace(tableRegex, (match) => {
    const rows = match.trim().split("\n").filter((r) => r.trim());
    let tableHtml = "<table>";
    rows.forEach((row, i) => {
      if (row.match(/^\|[-| ]+\|$/)) return;
      const cells = row
        .split("|")
        .slice(1, -1)
        .map((c) => c.trim());
      const tag = i === 0 ? "th" : "td";
      tableHtml +=
        "<tr>" + cells.map((c) => `<${tag}>${c}</${tag}>`).join("") + "</tr>";
    });
    tableHtml += "</table>";
    return tableHtml;
  });

  // headings
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");

  // bullet list
  html = html.replace(/(^- .+(\n|$))+/gm, (match) => {
    const items = match
      .trim()
      .split("\n")
      .map((l) => `<li>${l.replace(/^- /, "")}</li>`)
      .join("");
    return `<ul>${items}</ul>`;
  });

  // newlines → paragraphs (skip inside tags)
  html = html
    .split("\n\n")
    .map((block) => {
      if (block.match(/^<(pre|ul|ol|h\d|table)/)) return block;
      return `<p>${block.replace(/\n/g, "<br/>")}</p>`;
    })
    .join("");

  return html;
}

export default function MarkdownRenderer({ content }: { content: string }) {
  const html = useMemo(() => renderMarkdown(content), [content]);
  return (
    <div
      className="prose"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
