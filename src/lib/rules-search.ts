import fs from "node:fs";
import path from "node:path";

interface RulesDoc {
  slug: string;
  title: string;
  content: string;
  keywords: string[];
}

const CONTENT_DIR = path.join(process.cwd(), "content");

const SLUG_META: Record<string, { title: string; keywords: string[] }> = {
  "azeroth-at-war-v1.1": {
    title: "Core Rules v1.1",
    keywords: [
      "rules", "combat", "movement", "phase", "turn", "morale", "mana",
      "hero", "wound", "damage", "save", "charge", "shoot", "shooting",
      "melee", "terrain", "deployment", "army", "building", "points",
      "keyword", "ability", "stat", "initiative", "armor", "piercing",
      "shield", "blast", "template", "scatter", "retreat", "withdrawal",
      "flanking", "objective", "victory", "dice", "roll", "hit",
    ],
  },
  "faction-overview": {
    title: "Faction Overview",
    keywords: [
      "faction", "alliance", "horde", "scourge", "playstyle", "theme",
      "allegiance", "subfaction",
    ],
  },
  "unit-customization-system": {
    title: "Unit Customization / Hero Building",
    keywords: [
      "hero", "customization", "race", "class", "spec", "equipment",
      "ability", "build", "talent", "loadout", "weapon", "armor",
    ],
  },
  "fly-keyword-draft": {
    title: "Fly Keyword",
    keywords: ["fly", "flying", "airborne", "gryphon", "wyvern", "bat"],
  },
  "azeroth-at-war-refinement-notes": {
    title: "Design / Refinement Notes",
    keywords: ["design", "refinement", "balance", "change", "note", "errata"],
  },
  "army-book-humans": {
    title: "Army Book: Humans",
    keywords: [
      "human", "stormwind", "alliance", "footman", "knight", "paladin",
      "priest", "mage", "gryphon",
    ],
  },
  "army-book-dwarves": {
    title: "Army Book: Dwarves",
    keywords: [
      "dwarf", "dwarves", "ironforge", "wildhammer", "rifleman", "gryphon",
      "thunderhammer", "mountaineer",
    ],
  },
  "army-book-night-elves": {
    title: "Army Book: Night Elves",
    keywords: [
      "night elf", "night elves", "kaldorei", "sentinel", "druid",
      "huntress", "archer", "moonwell", "shadowmeld",
    ],
  },
  "army-book-orcs": {
    title: "Army Book: Orcs",
    keywords: [
      "orc", "orcs", "orgrimmar", "horde", "grunt", "warchief", "shaman",
      "axe", "wyvern", "blademaster",
    ],
  },
  "army-book-darkspear": {
    title: "Army Book: Darkspear Trolls",
    keywords: [
      "troll", "darkspear", "horde", "voodoo", "headhunter", "witch doctor",
      "raptor", "berserker", "regenerat",
    ],
  },
  "army-book-tauren": {
    title: "Army Book: Tauren",
    keywords: [
      "tauren", "thunder bluff", "horde", "totem", "chieftain",
      "spirit walker", "kodo", "warchief",
    ],
  },
  "army-book-forsaken": {
    title: "Army Book: Forsaken",
    keywords: [
      "forsaken", "undercity", "horde", "apothecary", "blight", "plague",
      "deathstalker", "abomination", "banshee", "dark ranger",
    ],
  },
  "army-book-scourge": {
    title: "Army Book: Scourge",
    keywords: [
      "scourge", "lich king", "undead", "skeleton", "ghoul", "necromancer",
      "death knight", "raise dead", "lich", "acolyte",
    ],
  },
};

const CORE_SLUG = "azeroth-at-war-v1.1";

let cachedDocs: RulesDoc[] | null = null;

function loadDocs(): RulesDoc[] {
  if (cachedDocs) return cachedDocs;

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  cachedDocs = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const content = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
    const meta = SLUG_META[slug] ?? { title: slug, keywords: [] };
    return { slug, title: meta.title, content, keywords: meta.keywords };
  });
  return cachedDocs;
}

function scoreDoc(doc: RulesDoc, query: string): number {
  const q = query.toLowerCase();
  let score = 0;

  for (const kw of doc.keywords) {
    if (q.includes(kw.toLowerCase())) {
      score += kw.length > 4 ? 3 : 1; // longer keyword matches score higher
    }
  }

  // Boost if the doc title words appear in the query
  for (const word of doc.title.toLowerCase().split(/\W+/)) {
    if (word.length > 2 && q.includes(word)) score += 2;
  }

  return score;
}

/**
 * Returns the core rules + up to `maxExtra` most-relevant docs for the query.
 * Caps total characters to stay well within context limits.
 */
export function getRelevantRules(
  query: string,
  maxExtra = 3,
  maxChars = 80_000,
): string {
  const docs = loadDocs();
  const coreDoc = docs.find((d) => d.slug === CORE_SLUG);

  // Score and sort non-core docs
  const others = docs
    .filter((d) => d.slug !== CORE_SLUG)
    .map((d) => ({ doc: d, score: scoreDoc(d, query) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, maxExtra)
    .filter((d) => d.score > 0)
    .map((d) => d.doc);

  const sections: string[] = [];
  let totalChars = 0;

  if (coreDoc) {
    sections.push(`--- ${coreDoc.title} ---\n\n${coreDoc.content}`);
    totalChars += coreDoc.content.length;
  }

  for (const doc of others) {
    if (totalChars + doc.content.length > maxChars) continue;
    sections.push(`--- ${doc.title} ---\n\n${doc.content}`);
    totalChars += doc.content.length;
  }

  return sections.join("\n\n");
}
