import { getDocBySlug } from "@/lib/content";
import MarkdownRenderer from "@/components/markdown-renderer";
import TableOfContents from "@/components/table-of-contents";
import { getTranslations } from "next-intl/server";

export default async function RulesPage() {
  const doc = getDocBySlug("core-rules");
  const t = await getTranslations("rules");

  if (!doc) return <p>{t("documentNotFound")}</p>;

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
