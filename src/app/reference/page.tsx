import { getDocBySlug } from "@/lib/content";
import MarkdownRenderer from "@/components/markdown-renderer";

export default function ReferencePage() {
  const doc = getDocBySlug("core-rules");
  if (!doc) return <p>Not found.</p>;

  // Extract quick reference section — try multiple heading patterns
  const patterns = [
    "## 12. QUICK REFERENCE",
    "## 12. Quick Reference",
    "## QUICK REFERENCE",
    "## Quick Reference",
  ];

  let qrContent = "";
  for (const pattern of patterns) {
    const idx = doc.content.indexOf(pattern);
    if (idx !== -1) {
      qrContent = doc.content.slice(idx);
      break;
    }
  }

  if (!qrContent) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <p className="text-muted">Quick reference section not found in the core rules document.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 animate-fade-in-up">
        <h1 className="font-display mb-2 text-3xl font-bold text-gold sm:text-4xl">
          Quick Reference
        </h1>
        <p className="text-sm text-muted">
          Key tables and summaries from the core rules, all in one place.
        </p>
      </div>

      <div className="animate-fade-in-up animate-delay-100">
        <MarkdownRenderer content={qrContent} />
      </div>
    </div>
  );
}
