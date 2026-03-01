"use client";

import { useState } from "react";
import { useBuilder } from "./army-builder-provider";
import { getUnitsByTier, type Unit } from "@/lib/factions";

const tierOrder = ["Hero", "Baseline", "Mounted", "Elite"];

const tierColors: Record<string, string> = {
  Hero: "text-amber-400",
  Baseline: "text-zinc-300",
  Mounted: "text-blue-400",
  Elite: "text-purple-400",
};

const tierBg: Record<string, string> = {
  Hero: "bg-amber-500/10",
  Baseline: "bg-zinc-500/10",
  Mounted: "bg-blue-500/10",
  Elite: "bg-purple-500/10",
};

export default function UnitCatalog() {
  const { faction, dispatch, state } = useBuilder();
  const [activeTier, setActiveTier] = useState("Hero");
  const unitsByTier = getUnitsByTier(faction.units);

  const currentUnits = unitsByTier[activeTier] ?? [];

  function handleAdd(unit: Unit) {
    dispatch({
      type: "ADD_UNIT",
      unitName: unit.name,
      isHero: unit.tier === "Hero",
    });
  }

  // Check if a hero is already in the roster (no duplicates)
  function isHeroTaken(unit: Unit): boolean {
    if (unit.tier !== "Hero") return false;
    return state.units.some((ru) => ru.unitName === unit.name);
  }

  return (
    <div className="rounded-xl border border-border bg-surface">
      {/* Tier tabs */}
      <div className="flex border-b border-border">
        {tierOrder.map((tier) => {
          const count = unitsByTier[tier]?.length ?? 0;
          if (count === 0) return null;
          const active = activeTier === tier;
          return (
            <button
              key={tier}
              onClick={() => setActiveTier(tier)}
              className={`flex-1 px-2 py-2.5 text-xs font-medium transition-colors ${
                active
                  ? `${tierColors[tier]} ${tierBg[tier]}`
                  : "text-muted hover:text-foreground"
              }`}
            >
              {tier}
              <span className="ml-1 opacity-60">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Unit list */}
      <div className="divide-y divide-border">
        {currentUnits.map((unit) => {
          const taken = isHeroTaken(unit);
          return (
            <div
              key={unit.name}
              className="flex items-center justify-between gap-2 px-4 py-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {unit.name}
                </p>
                <p className="text-[11px] text-muted">
                  {unit.archetype}
                  {unit.dualSlot && (
                    <span className="ml-1 text-orange-400">({unit.dualSlot})</span>
                  )}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className="text-xs font-bold text-gold">{unit.stats.PTS}</span>
                <button
                  onClick={() => handleAdd(unit)}
                  disabled={taken}
                  className={`rounded-lg border px-2 py-1 text-xs font-medium transition-colors ${
                    taken
                      ? "cursor-not-allowed border-border text-muted/40"
                      : "border-gold/30 text-gold hover:bg-gold/10"
                  }`}
                  title={taken ? "Hero already in roster" : `Add ${unit.name}`}
                >
                  {taken ? "Added" : "+"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
