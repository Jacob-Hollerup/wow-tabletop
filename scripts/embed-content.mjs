/**
 * One-time script: chunks markdown docs by section and inserts into
 * Supabase rule_chunks table for full-text search.
 *
 * Usage: SUPABASE_URL=... SUPABASE_SERVICE_KEY=... node scripts/embed-content.mjs
 *
 * Requires service role key (not anon) to bypass RLS.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(__dirname, "..", "content");

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const DOC_MAP = [
  { slug: "core-rules", title: "Core Rules", file: "azeroth-at-war-v1.1.md" },
  { slug: "refinement-notes", title: "Refinement Notes", file: "azeroth-at-war-refinement-notes.md" },
  { slug: "faction-overview", title: "Faction Overview", file: "faction-overview.md" },
  { slug: "army-book-humans", title: "Army Book: Humans", file: "army-book-humans.md" },
  { slug: "army-book-dwarves", title: "Army Book: Dwarves", file: "army-book-dwarves.md" },
  { slug: "army-book-night-elves", title: "Army Book: Night Elves", file: "army-book-night-elves.md" },
  { slug: "army-book-orcs", title: "Army Book: Orcs", file: "army-book-orcs.md" },
  { slug: "army-book-forsaken", title: "Army Book: Forsaken", file: "army-book-forsaken.md" },
  { slug: "army-book-darkspear", title: "Army Book: Darkspear Trolls", file: "army-book-darkspear.md" },
  { slug: "army-book-tauren", title: "Army Book: Tauren", file: "army-book-tauren.md" },
  { slug: "army-book-scourge", title: "Army Book: Scourge", file: "army-book-scourge.md" },
  { slug: "unit-customization", title: "Unit Customization System", file: "unit-customization-system.md" },
  { slug: "fly-keyword", title: "Fly Keyword Draft", file: "fly-keyword-draft.md" },
];

/**
 * Split markdown by headings into chunks.
 * Merges small sections into the previous chunk to avoid tiny fragments.
 */
function chunkMarkdown(content, minChars = 200) {
  const lines = content.split("\n");
  const chunks = [];
  let currentHeading = null;
  let currentLines = [];

  function flush() {
    if (currentLines.length === 0) return;
    const text = currentLines.join("\n").trim();
    if (!text) return;

    if (text.length < minChars && chunks.length > 0) {
      chunks[chunks.length - 1].content += "\n\n" + text;
    } else {
      chunks.push({ heading: currentHeading, content: text });
    }
    currentLines = [];
  }

  for (const line of lines) {
    if (/^#{1,3}\s/.test(line)) {
      flush();
      currentHeading = line.replace(/^#+\s*/, "").trim();
    }
    currentLines.push(line);
  }
  flush();

  return chunks;
}

/** Rough token estimate (~4 chars per token) */
function estimateTokens(text) {
  return Math.ceil(text.length / 4);
}

async function main() {
  // Clear existing chunks
  console.log("Clearing existing rule_chunks...");
  const { error: delErr } = await supabase.from("rule_chunks").delete().neq("id", 0);
  if (delErr) {
    console.error("Delete error:", delErr);
    process.exit(1);
  }

  // Build all chunks
  const allChunks = [];
  for (const doc of DOC_MAP) {
    const filePath = path.join(contentDir, doc.file);
    if (!fs.existsSync(filePath)) {
      console.warn(`Skipping missing file: ${doc.file}`);
      continue;
    }
    const content = fs.readFileSync(filePath, "utf-8");
    const chunks = chunkMarkdown(content);

    for (const chunk of chunks) {
      allChunks.push({
        doc_slug: doc.slug,
        doc_title: doc.title,
        section_heading: chunk.heading,
        content: chunk.content,
        token_count: estimateTokens(chunk.content),
      });
    }
  }

  console.log(`Chunked ${DOC_MAP.length} docs into ${allChunks.length} chunks`);

  // Insert in batches of 50
  const BATCH_SIZE = 50;
  for (let i = 0; i < allChunks.length; i += BATCH_SIZE) {
    const batch = allChunks.slice(i, i + BATCH_SIZE);
    const { error } = await supabase.from("rule_chunks").insert(batch);
    if (error) {
      console.error("Insert error:", error);
      process.exit(1);
    }
    console.log(`Inserted batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(allChunks.length / BATCH_SIZE)}`);
  }

  console.log(`Done! Inserted ${allChunks.length} chunks.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
