// Re-export all types
export type { UnitStats, HeroAbility, HeroSpec, HeroClassData, Unit, Faction, Loadout, GrandFaction, GrandFactionId } from "./types";

// Import factions
import { HUMANS } from "./humans";
import { DWARVES } from "./dwarves";
import { NIGHT_ELVES } from "./night-elves";
import { ORCS } from "./orcs";
import { DARKSPEAR } from "./darkspear";
import { TAUREN } from "./tauren";
import { FORSAKEN } from "./forsaken";
import { SCOURGE } from "./scourge";

// Re-export individual factions
export { HUMANS, DWARVES, NIGHT_ELVES, ORCS, DARKSPEAR, TAUREN, FORSAKEN, SCOURGE };

// Import types needed for function signatures
import type { Faction, Unit, GrandFaction } from "./types";

// Aggregate export
export const ALL_FACTIONS: Faction[] = [HUMANS, DWARVES, NIGHT_ELVES, ORCS, DARKSPEAR, TAUREN, FORSAKEN, SCOURGE];

// ─── Grand Factions ─────────────────────────────────────────
export const GRAND_FACTIONS: GrandFaction[] = [
  {
    id: "alliance",
    name: "Alliance",
    colorVar: "--alliance",
    accentVar: "--alliance-accent",
    darkVar: "--alliance-dark",
    description: "United under the banner of Stormwind, the Alliance stands for order, honor, and the defense of Azeroth. Human discipline forms the backbone, bolstered by Dwarven resilience and Night Elven cunning.",
    baseFactionId: "humans",
    subfactionIds: ["humans", "dwarves", "night-elves"],
  },
  {
    id: "horde",
    name: "Horde",
    colorVar: "--horde",
    accentVar: "--horde-accent",
    darkVar: "--horde-dark",
    description: "Bound by blood and honor, the Horde is a coalition of outcasts forged in war. Orc ferocity provides the foundation, amplified by Tauren strength, Forsaken cunning, and Darkspear voodoo.",
    baseFactionId: "orcs",
    subfactionIds: ["orcs", "tauren", "forsaken", "darkspear"],
  },
  {
    id: "scourge",
    name: "Scourge",
    colorVar: "--scourge",
    accentVar: "--scourge-accent",
    darkVar: "--scourge-dark",
    description: "The Lich King's undead army marches with relentless, inevitable purpose. Death is not the end — it is conscription. Every fallen soldier rises again to serve.",
    baseFactionId: "scourge",
    subfactionIds: ["scourge"],
  },
  {
    id: "burning-legion",
    name: "Burning Legion",
    colorVar: "--burning-legion",
    accentVar: "--burning-legion-accent",
    darkVar: "--burning-legion-dark",
    description: "The demonic armies of the Burning Legion seek nothing less than the destruction of all life on Azeroth.",
    baseFactionId: "",
    subfactionIds: [],
    comingSoon: true,
  },
  {
    id: "void",
    name: "Void / Old Gods",
    colorVar: "--void",
    accentVar: "--void-accent",
    darkVar: "--void-dark",
    description: "From the darkest depths, the Old Gods whisper madness. Their servants corrupt and consume all they touch.",
    baseFactionId: "",
    subfactionIds: [],
    comingSoon: true,
  },
];

// ─── Lookup helpers ─────────────────────────────────────────

export function getFaction(id: string): Faction | undefined {
  return ALL_FACTIONS.find((f) => f.id === id);
}

export function getGrandFaction(id: string): GrandFaction | undefined {
  return GRAND_FACTIONS.find((gf) => gf.id === id);
}

export function getSubfactions(grandFactionId: string): Faction[] {
  const gf = getGrandFaction(grandFactionId);
  if (!gf) return [];
  return gf.subfactionIds.map((id) => getFaction(id)).filter((f): f is Faction => !!f);
}

export function getBaseFaction(grandFactionId: string): Faction | undefined {
  const gf = getGrandFaction(grandFactionId);
  if (!gf || !gf.baseFactionId) return undefined;
  return getFaction(gf.baseFactionId);
}

export function getUnitsByTier(units: Unit[]): Record<string, Unit[]> {
  const tiers: Record<string, Unit[]> = {};
  const order = ["Hero", "Baseline", "Mounted", "Elite"];
  for (const tier of order) {
    const filtered = units.filter((u) => u.tier === tier);
    if (filtered.length > 0) tiers[tier] = filtered;
  }
  return tiers;
}

export function getFactionCSSVars(colorKey: string): { primary: string; accent: string } {
  return {
    primary: `var(--faction-${colorKey})`,
    accent: `var(--faction-${colorKey}-accent)`,
  };
}
