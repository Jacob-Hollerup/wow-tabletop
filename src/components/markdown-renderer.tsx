"use client";

import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

function toId(children: React.ReactNode): string {
  const text = typeof children === "string"
    ? children
    : Array.isArray(children)
      ? children.map((c) => (typeof c === "string" ? c : "")).join("")
      : "";
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

const headingComponents: Partial<Components> = {
  h2: ({ children, ...props }) => (
    <h2 id={toId(children)} {...props}>{children}</h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 id={toId(children)} {...props}>{children}</h3>
  ),
};

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={headingComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
