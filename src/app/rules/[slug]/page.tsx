import { getDocBySlug, getAllDocs } from "@/lib/content";
import MarkdownRenderer from "@/components/markdown-renderer";
import TableOfContents from "@/components/table-of-contents";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllDocs()
    .filter((d) => d.slug !== "core-rules")
    .map((d) => ({ slug: d.slug }));
}

export default async function RuleDocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);
  if (!doc) notFound();

  return (
    <div className="flex gap-8">
      <main className="min-w-0 flex-1">
        <MarkdownRenderer content={doc.content} />
      </main>
      <aside className="hidden w-56 shrink-0 xl:block">
        <TableOfContents content={doc.content} />
      </aside>
    </div>
  );
}
