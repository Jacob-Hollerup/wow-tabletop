import { createClient } from "@/lib/supabase/server";

interface RuleChunk {
  doc_slug: string;
  doc_title: string;
  section_heading: string | null;
  content: string;
  rank: number;
}

/**
 * Find the most relevant rule chunks for a user query via PostgreSQL full-text search.
 * Returns formatted context string ready for the AI system prompt.
 */
export async function getRelevantRules(
  query: string,
  matchCount = 8,
  maxChars = 12_000,
): Promise<string> {
  const supabase = await createClient();
  if (!supabase) return "";

  const { data: chunks, error } = await supabase.rpc("search_rule_chunks", {
    query,
    match_count: matchCount,
  });

  if (error || !chunks || chunks.length === 0) return "";

  // Build context string, respecting char limit
  const sections: string[] = [];
  let totalChars = 0;

  // Group by doc for cleaner output
  const byDoc = new Map<string, RuleChunk[]>();
  for (const chunk of chunks as RuleChunk[]) {
    if (!byDoc.has(chunk.doc_title)) byDoc.set(chunk.doc_title, []);
    byDoc.get(chunk.doc_title)!.push(chunk);
  }

  for (const [title, docChunks] of byDoc) {
    const header = `--- ${title} ---\n`;
    for (const chunk of docChunks) {
      const section = chunk.section_heading
        ? `### ${chunk.section_heading}\n${chunk.content}`
        : chunk.content;

      if (totalChars + section.length > maxChars) continue;
      if (sections.length === 0 || !sections[sections.length - 1].startsWith(`--- ${title}`)) {
        sections.push(header + section);
      } else {
        sections[sections.length - 1] += "\n\n" + section;
      }
      totalChars += section.length;
    }
  }

  return sections.join("\n\n");
}
