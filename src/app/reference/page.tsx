import { getDocBySlug } from "@/lib/content";
import MarkdownRenderer from "@/components/markdown-renderer";

export default function ReferencePage() {
  const doc = getDocBySlug("core-rules");
  if (!doc) return <p>Not found.</p>;

  // Extract everything from "## 12. QUICK REFERENCE" onwards
  const qrIndex = doc.content.indexOf("## 12. QUICK REFERENCE");
  if (qrIndex === -1) {
    // Try v1.1 format
    const alt = doc.content.indexOf("## 12. Quick Reference");
    if (alt === -1) return <p>Quick reference section not found.</p>;
    const qrContent = doc.content.slice(alt);
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <MarkdownRenderer content={qrContent} />
      </div>
    );
  }

  const qrContent = doc.content.slice(qrIndex);
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <MarkdownRenderer content={qrContent} />
    </div>
  );
}
