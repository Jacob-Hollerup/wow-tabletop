import { bundledDocs, type BundledDoc } from "./content-data";

export interface DocMeta {
  slug: string;
  title: string;
  category: string;
}

export function getAllDocs(): DocMeta[] {
  return bundledDocs.map(({ slug, title, category }) => ({ slug, title, category }));
}

export function getDocBySlug(slug: string): { meta: DocMeta; content: string } | null {
  const doc = bundledDocs.find((d) => d.slug === slug);
  if (!doc) return null;
  return {
    meta: { slug: doc.slug, title: doc.title, category: doc.category },
    content: doc.content,
  };
}

export function getDocsByCategory(): Record<string, DocMeta[]> {
  const grouped: Record<string, DocMeta[]> = {};
  for (const doc of bundledDocs) {
    if (!grouped[doc.category]) grouped[doc.category] = [];
    grouped[doc.category].push({ slug: doc.slug, title: doc.title, category: doc.category });
  }
  return grouped;
}
