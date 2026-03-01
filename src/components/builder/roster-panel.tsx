"use client";

import { useBuilder } from "./army-builder-provider";
import { resolveUnit } from "@/lib/builder";
import RosterUnitCard from "./roster-unit-card";
import RosterHeroCard from "./roster-hero-card";

export default function RosterPanel() {
  const { state, faction } = useBuilder();

  if (state.units.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-surface/50 p-12 text-center">
        <p className="mb-1 text-foreground/60">Your roster is empty</p>
        <p className="text-sm text-muted">
          Add units from the catalog to start building your army.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {state.units.map((ru) => {
        const unit = resolveUnit(ru.unitName, faction);
        if (!unit) return null;

        if (unit.heroData) {
          return <RosterHeroCard key={ru.id} rosterUnit={ru} unit={unit} />;
        }

        return <RosterUnitCard key={ru.id} rosterUnit={ru} unit={unit} />;
      })}
    </div>
  );
}
