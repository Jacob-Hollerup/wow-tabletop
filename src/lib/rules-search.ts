import { createClient } from "@/lib/supabase/server";

const VOYAGE_API_KEY = process.env.VOYAGE_API_KEY;

/** Embed a query string via Voyage API */
async function embedQuery(text: string): Promise<number[]> {
  if (!VOYAGE_API_KEY) throw new Error("Missing VOYAGE_API_KEY");

  const res = await fetch("https://api.voyageai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${VOYAGE_API_KEY}`,
    },
    body: JSON.stringify({
      model: "voyage-3-lite",
      input: [text],
      input_type: "query",
    }),
  });

  if (!res.ok) {
    throw new Error(`Voyage API error ${res.status}`);
  }

  const data = await res.json();
  return data.data[0].embedding;
}

export interface RuleChunk {
  doc_slug: string;
  doc_title: string;
  section_heading: string | null;
  content: string;
  similarity: number;
}

/**
 * Find the most relevant rule chunks for a user query via vector similarity.
 * Returns formatted context string ready for the AI system prompt.
 */
export async function getRelevantRules(
  query: string,
  matchCount = 8,
  maxChars = 12_000,
): Promise<string> {
  const supabase = await createClient();
  if (!supabase) return "";

  let embedding: number[];
  try {
    embedding = await embedQuery(query);
  } catch {
    return "";
  }

  const { data: chunks, error } = await supabase.rpc("match_rule_chunks", {
    query_embedding: JSON.stringify(embedding),
    match_threshold: 0.3,
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
