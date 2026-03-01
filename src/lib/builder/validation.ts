import type { Faction, Unit } from "@/lib/factions";
import type { BuilderState, RosterUnit, ValidationError, BattleSize } from "./types";
import { BATTLE_SIZE_CONFIG } from "./types";

const TIER_LIMITS: Record<BattleSize, Record<string, { min: number; max: number }>> = {
  skirmish: { Baseline: { min: 3, max: 5 }, Mounted: { min: 0, max: 2 }, Elite: { min: 0, max: 2 }, Hero: { min: 1, max: 1 } },
  standard: { Baseline: { min: 4, max: 7 }, Mounted: { min: 0, max: 3 }, Elite: { min: 1, max: 3 }, Hero: { min: 1, max: 2 } },
  large: { Baseline: { min: 5, max: 9 }, Mounted: { min: 1, max: 4 }, Elite: { min: 2, max: 5 }, Hero: { min: 2, max: 3 } },
};

function parseRange(s: string): { min: number; max: number } {
  const parts = s.split("-").map((p) => parseInt(p.trim(), 10));
  if (parts.length === 1) return { min: parts[0], max: parts[0] };
  return { min: parts[0], max: parts[1] };
}

function parseFactionLimits(
  faction: Faction,
  battleSize: BattleSize,
): Record<string, { min: number; max: number }> {
  const sizeLabel =
    battleSize === "skirmish" ? "Skirmish" : battleSize === "standard" ? "Standard" : "Large";

  const row = faction.composition.find((c) => c.size.startsWith(sizeLabel));
  if (!row) return TIER_LIMITS[battleSize];

  return {
    Baseline: parseRange(row.baseline),
    Mounted: parseRange(row.mounted),
    Elite: parseRange(row.elite),
    Hero: parseRange(row.hero),
  };
}

export function resolveUnit(unitName: string, faction: Faction): Unit | undefined {
  return faction.units.find((u) => u.name === unitName);
}

export function computeTotalPoints(units: RosterUnit[], faction: Faction): number {
  return units.reduce((sum, ru) => {
    const unit = resolveUnit(ru.unitName, faction);
    if (!unit) return sum;
    return sum + unit.stats.PTS;
  }, 0);
}

export function computeTierCounts(units: RosterUnit[], faction: Faction): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const ru of units) {
    const unit = resolveUnit(ru.unitName, faction);
    if (!unit) continue;

    if (unit.dualSlot) {
      const tiers = unit.dualSlot.split("+").map((t) => t.trim());
      for (const tier of tiers) {
        counts[tier] = (counts[tier] ?? 0) + 1;
      }
    } else {
      counts[unit.tier] = (counts[unit.tier] ?? 0) + 1;
    }
  }
  return counts;
}

export function computeManaGeneration(
  units: RosterUnit[],
  faction: Faction,
  battleSize: BattleSize,
): number {
  const baseMana = battleSize === "skirmish" ? 2 : battleSize === "standard" ? 3 : 4;
  let heroMana = 0;
  let magicalMana = 0;

  for (const ru of units) {
    const unit = resolveUnit(ru.unitName, faction);
    if (!unit) continue;
    if (unit.tier === "Hero") {
      heroMana += 1;
    } else if (unit.keywords.includes("Magical")) {
      magicalMana += 1;
    }
  }

  return baseMana + heroMana + magicalMana;
}

export function validateArmy(state: BuilderState, faction: Faction): ValidationError[] {
  const errors: ValidationError[] = [];
  const { units, battleSize } = state;

  // 1. Points budget
  const totalPoints = computeTotalPoints(units, faction);
  const budget = BATTLE_SIZE_CONFIG[battleSize].points;
  if (totalPoints > budget) {
    errors.push({
      type: "error",
      message: `Over budget: ${totalPoints}/${budget} pts`,
    });
  }

  // 2. Tier limits
  const limits = parseFactionLimits(faction, battleSize);
  const tierCounts = computeTierCounts(units, faction);

  for (const [tier, { min, max }] of Object.entries(limits)) {
    const count = tierCounts[tier] ?? 0;
    if (count < min) {
      errors.push({
        type: "warning",
        message: `Need at least ${min} ${tier} unit(s), have ${count}`,
      });
    }
    if (count > max) {
      errors.push({
        type: "error",
        message: `Maximum ${max} ${tier} unit(s) allowed, have ${count}`,
      });
    }
  }

  // 3. At least 1 Hero
  const heroCount = tierCounts["Hero"] ?? 0;
  if (heroCount < 1 && !errors.some((e) => e.message.includes("Hero"))) {
    errors.push({
      type: "error",
      message: "Army must include at least 1 Hero",
    });
  }

  // 4. No duplicate heroes
  const heroNames = units
    .filter((u) => {
      const unit = resolveUnit(u.unitName, faction);
      return unit?.tier === "Hero";
    })
    .map((u) => u.unitName);

  const seen = new Set<string>();
  for (const name of heroNames) {
    if (seen.has(name)) {
      errors.push({
        type: "error",
        message: `Duplicate hero: ${name}. Each hero can only be taken once.`,
      });
    }
    seen.add(name);
  }

  // 5. Heroes must have spec selected
  for (const ru of units) {
    const unit = resolveUnit(ru.unitName, faction);
    if (unit?.heroData && !ru.heroSpec) {
      errors.push({
        type: "warning",
        message: `${ru.unitName} needs a specialization selected`,
        unitId: ru.id,
      });
    }
  }

  return errors;
}
