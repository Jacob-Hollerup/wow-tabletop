/**
 * Prebuild script: reads all markdown content files and generates
 * static JSON files in public/content/ for each doc, plus an index.
 *
 * This keeps the content out of the worker JS bundle (fixes CF 1101/1102)
 * while still being available at build time for static generation.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");
const contentDir = path.join(projectRoot, "content");
const outDir = path.join(projectRoot, "public", "content");

const DOC_MAP = [
  { slug: "core-rules", title: "Core Rules", file: "azeroth-at-war-v1.1.md", category: "Core Rules" },
  { slug: "refinement-notes", title: "Refinement Notes", file: "azeroth-at-war-refinement-notes.md", category: "Core Rules" },
  { slug: "faction-overview", title: "Faction Overview", file: "faction-overview.md", category: "Factions" },
  { slug: "army-book-humans", title: "Army Book: Humans", file: "army-book-humans.md", category: "Army Books — Alliance" },
  { slug: "army-book-dwarves", title: "Army Book: Dwarves", file: "army-book-dwarves.md", category: "Army Books — Alliance" },
  { slug: "army-book-night-elves", title: "Army Book: Night Elves", file: "army-book-night-elves.md", category: "Army Books — Alliance" },
  { slug: "army-book-orcs", title: "Army Book: Orcs", file: "army-book-orcs.md", category: "Army Books — Horde" },
  { slug: "army-book-forsaken", title: "Army Book: Forsaken", file: "army-book-forsaken.md", category: "Army Books — Horde" },
  { slug: "army-book-darkspear", title: "Army Book: Darkspear Trolls", file: "army-book-darkspear.md", category: "Army Books — Horde" },
  { slug: "army-book-tauren", title: "Army Book: Tauren", file: "army-book-tauren.md", category: "Army Books — Horde" },
  { slug: "army-book-scourge", title: "Army Book: Scourge", file: "army-book-scourge.md", category: "Army Books — Scourge" },
  { slug: "unit-customization", title: "Unit Customization System", file: "unit-customization-system.md", category: "Systems" },
  { slug: "fly-keyword", title: "Fly Keyword Draft", file: "fly-keyword-draft.md", category: "Systems" },
];

// Ensure output directory exists
fs.mkdirSync(outDir, { recursive: true });

// Write individual doc JSON files
const index = DOC_MAP.map((doc) => {
  const filePath = path.join(contentDir, doc.file);
  const content = fs.readFileSync(filePath, "utf-8");

  const docData = { slug: doc.slug, title: doc.title, category: doc.category, content };
  fs.writeFileSync(path.join(outDir, `${doc.slug}.json`), JSON.stringify(docData));

  return { slug: doc.slug, title: doc.title, category: doc.category };
});

// Write metadata-only index
fs.writeFileSync(path.join(outDir, "index.json"), JSON.stringify(index));

console.log(`Bundled ${DOC_MAP.length} docs → ${outDir}/ (${DOC_MAP.length} JSON files + index)`);
