"use client";

import type { Unit } from "@/lib/factions";
import type { RosterUnit } from "@/lib/builder";
import { useBuilder } from "./army-builder-provider";
import LoadoutPicker from "./loadout-picker";

const STAT_LABELS = ["MOV", "ATK", "SKL", "STR", "TGH", "DEF", "INI", "WND", "PTS"] as const;

const tierColors: Record<string, string> = {
  Hero: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Baseline: "bg-zinc-500/20 text-zinc-300 border-zinc-500/30",
  Mounted: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Elite: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

export default function RosterUnitCard({
  rosterUnit,
  unit,
}: {
  rosterUnit: RosterUnit;
  unit: Unit;
}) {
  const { dispatch, faction } = useBuilder();
  const primary = `var(--faction-${faction.colorKey})`;
  const accent = `var(--faction-${faction.colorKey}-accent)`;

  // Compute display stats (apply loadout overrides)
  const selectedLoadout = unit.loadouts?.find((l) => l.name === rosterUnit.loadout);
  const displayStats = { ...unit.stats, ...selectedLoadout?.statOverrides };

  return (
    <div
      className="rounded-xl border border-border border-l-[3px] bg-surface p-4"
      style={{ borderLeftColor: primary }}
    >
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-display truncate font-semibold text-foreground">
            {unit.name}
          </h3>
          <p className="text-xs text-muted">
            {unit.subfaction} &middot; {unit.archetype}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          {unit.dualSlot && (
            <span className="rounded-lg border border-orange-500/30 bg-orange-500/10 px-1.5 py-0.5 text-[10px] font-medium text-orange-400">
              {unit.dualSlot}
            </span>
          )}
          <span
            className={`rounded-lg border px-2 py-0.5 text-xs font-medium ${
              tierColors[unit.tier] || tierColors.Baseline
            }`}
          >
            {unit.tier}
          </span>
          <span className="rounded-lg bg-gold/10 px-2 py-0.5 text-xs font-bold text-gold">
            {unit.stats.PTS} pts
          </span>
          <button
            onClick={() => dispatch({ type: "REMOVE_UNIT", unitId: rosterUnit.id })}
            className="rounded-lg border border-border p-1 text-muted transition-colors hover:border-horde/30 hover:text-horde"
            title="Remove unit"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-3 overflow-hidden rounded-lg border border-border bg-border">
        <div className="grid grid-cols-5 gap-px sm:hidden">
          {STAT_LABELS.slice(0, 5).map((stat) => {
            const val = displayStats[stat];
            const changed = selectedLoadout?.statOverrides?.[stat] !== undefined;
            const display = stat === "SKL" || stat === "DEF" ? `${val}+` : `${val}`;
            return (
              <div key={stat} className="bg-background px-1 py-1.5 text-center">
                <div className="text-[9px] uppercase tracking-wider text-muted">{stat}</div>
                <div className={`text-sm font-bold ${changed ? "text-gold" : "text-foreground"}`}>
                  {display}
                </div>
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-4 gap-px sm:hidden">
          {STAT_LABELS.slice(5).map((stat) => {
            const val = displayStats[stat];
            const changed = selectedLoadout?.statOverrides?.[stat] !== undefined;
            const display = stat === "SKL" || stat === "DEF" ? `${val}+` : `${val}`;
            return (
              <div key={stat} className="bg-background px-1 py-1.5 text-center">
                <div className="text-[9px] uppercase tracking-wider text-muted">{stat}</div>
                <div className={`text-sm font-bold ${changed ? "text-gold" : "text-foreground"}`}>
                  {display}
                </div>
              </div>
            );
          })}
        </div>
        <div className="hidden grid-cols-9 gap-px sm:grid">
          {STAT_LABELS.map((stat) => {
            const val = displayStats[stat];
            const changed = selectedLoadout?.statOverrides?.[stat] !== undefined;
            const display = stat === "SKL" || stat === "DEF" ? `${val}+` : `${val}`;
            return (
              <div key={stat} className="bg-background px-1 py-1.5 text-center">
                <div className="text-[10px] uppercase tracking-wider text-muted">{stat}</div>
                <div className={`text-sm font-bold ${changed ? "text-gold" : "text-foreground"}`}>
                  {display}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Keywords */}
      {unit.keywords.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {unit.keywords.map((kw) => (
            <span
              key={kw}
              className="rounded-full border px-2 py-0.5 text-[11px] font-medium"
              style={{
                borderColor: `color-mix(in srgb, ${accent} 30%, transparent)`,
                backgroundColor: `color-mix(in srgb, ${accent} 8%, transparent)`,
                color: accent,
              }}
            >
              {kw}
            </span>
          ))}
        </div>
      )}

      {/* Loadout picker */}
      {unit.loadouts && unit.loadouts.length > 1 && (
        <LoadoutPicker
          rosterUnit={rosterUnit}
          unit={unit}
        />
      )}
    </div>
  );
}
