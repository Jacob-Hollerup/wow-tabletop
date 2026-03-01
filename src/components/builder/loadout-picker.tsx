"use client";

import type { Unit } from "@/lib/factions";
import type { RosterUnit } from "@/lib/builder";
import { useBuilder } from "./army-builder-provider";

export default function LoadoutPicker({
  rosterUnit,
  unit,
}: {
  rosterUnit: RosterUnit;
  unit: Unit;
}) {
  const { dispatch, faction } = useBuilder();
  const primary = `var(--faction-${faction.colorKey})`;

  if (!unit.loadouts || unit.loadouts.length <= 1) return null;

  const selected = rosterUnit.loadout ?? unit.loadouts[0]?.name;

  return (
    <div>
      <p className="mb-1.5 text-[10px] uppercase tracking-wider text-muted">Loadout</p>
      <div className="flex flex-wrap gap-1.5">
        {unit.loadouts.map((loadout) => {
          const active = selected === loadout.name;
          // Compute stat differences from base
          const diffs: string[] = [];
          for (const [key, val] of Object.entries(loadout.statOverrides)) {
            const base = unit.stats[key as keyof typeof unit.stats];
            if (val === undefined || val === base) continue;
            const diff = (val as number) - base;
            const sign = diff > 0 ? "+" : "";
            diffs.push(`${key} ${sign}${diff}`);
          }

          return (
            <button
              key={loadout.name}
              onClick={() =>
                dispatch({ type: "SET_LOADOUT", unitId: rosterUnit.id, loadout: loadout.name })
              }
              className={`rounded-lg border px-2.5 py-1 text-left text-xs transition-colors ${
                active
                  ? "border-gold/40 bg-gold/10 text-gold"
                  : "border-border bg-background text-muted hover:text-foreground"
              }`}
            >
              <span className="font-medium">{loadout.name}</span>
              {diffs.length > 0 && (
                <span className="ml-1.5 text-[10px] opacity-70">
                  ({diffs.join(", ")})
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
