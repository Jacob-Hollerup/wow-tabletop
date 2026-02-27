"use client";

import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import React from "react";

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

const calloutPattern = /^\s*\*\*(Important|Tip|Example|Warning|Note)[:\s]*\*\*/i;

function renderCallout(type: string, content: string) {
  const lower = type.toLowerCase();
  const variant =
    lower === "note" || lower === "important"
      ? "callout-important"
      : lower === "tip"
        ? "callout-tip"
        : lower === "example"
          ? "callout-example"
          : "callout-warning";

  const cleaned = content.replace(calloutPattern, "").trim();

  return (
    <div className={`callout ${variant}`}>
      <div className="callout-title">{type}</div>
      <p>{cleaned}</p>
    </div>
  );
}

function HeadingWithAnchor({
  level,
  id,
  children,
}: {
  level: 2 | 3;
  id: string;
  children: React.ReactNode;
}) {
  const Tag = level === 2 ? "h2" : "h3";
  return (
    <Tag id={id} className="group relative">
      {children}
      <a
        href={`#${id}`}
        className="ml-2 inline-block text-muted/0 transition-colors group-hover:text-muted/60"
        aria-label={`Link to ${id}`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="inline -mt-1"
        >
          <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
        </svg>
      </a>
    </Tag>
  );
}

const extractText = (node: React.ReactNode): string => {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (React.isValidElement(node)) {
    const props = node.props as Record<string, unknown>;
    if (props.children) return extractText(props.children as React.ReactNode);
  }
  return "";
};

const components: Partial<Components> = {
  h2: ({ children }) => (
    <HeadingWithAnchor level={2} id={toId(children)}>
      {children}
    </HeadingWithAnchor>
  ),
  h3: ({ children }) => (
    <HeadingWithAnchor level={3} id={toId(children)}>
      {children}
    </HeadingWithAnchor>
  ),
  blockquote: ({ children }) => {
    const textContent = extractText(children);

    const match = textContent.match(calloutPattern);
    if (match) {
      return renderCallout(match[1], textContent);
    }

    return <blockquote>{children}</blockquote>;
  },
};

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
