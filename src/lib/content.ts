import fs from "node:fs";
import path from "node:path";

export interface DocMeta {
  slug: string;
  title: string;
  category: string;
}

interface DocWithContent extends DocMeta {
  content: string;
}

const contentDir = path.join(process.cwd(), "public", "content");

function readIndex(): DocMeta[] {
  return JSON.parse(fs.readFileSync(path.join(contentDir, "index.json"), "utf-8"));
}

function readDoc(slug: string): DocWithContent | null {
  try {
    return JSON.parse(fs.readFileSync(path.join(contentDir, `${slug}.json`), "utf-8"));
  } catch {
    return null;
  }
}

export function getAllDocs(): DocMeta[] {
  return readIndex();
}

export function getDocBySlug(slug: string): { meta: DocMeta; content: string } | null {
  const doc = readDoc(slug);
  if (!doc) return null;
  return {
    meta: { slug: doc.slug, title: doc.title, category: doc.category },
    content: doc.content,
  };
}

export function getDocsByCategory(): Record<string, DocMeta[]> {
  const grouped: Record<string, DocMeta[]> = {};
  for (const doc of readIndex()) {
    if (!grouped[doc.category]) grouped[doc.category] = [];
    grouped[doc.category].push({ slug: doc.slug, title: doc.title, category: doc.category });
  }
  return grouped;
}
