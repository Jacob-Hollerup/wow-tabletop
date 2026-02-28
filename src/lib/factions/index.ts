// Re-export all types
export type { UnitStats, HeroAbility, HeroSpec, HeroClassData, Unit, Faction } from "./types";

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
import type { Faction, Unit } from "./types";

// Aggregate export
export const ALL_FACTIONS: Faction[] = [HUMANS, DWARVES, NIGHT_ELVES, ORCS, DARKSPEAR, TAUREN, FORSAKEN, SCOURGE];

export function getFaction(id: string): Faction | undefined {
  return ALL_FACTIONS.find((f) => f.id === id);
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
