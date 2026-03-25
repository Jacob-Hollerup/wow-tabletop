"use client";

import { useBuilder } from "./army-builder-provider";
import { resolveUnit } from "@/lib/builder";
import RosterUnitCard from "./roster-unit-card";
import RosterHeroCard from "./roster-hero-card";
import { useTranslations } from "next-intl";

export default function RosterPanel() {
  const { state, faction } = useBuilder();
  const t = useTranslations("builder");

  if (state.units.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-surface/50 p-12 text-center">
        <p className="mb-1 text-foreground/60">{t("rosterEmpty")}</p>
        <p className="text-sm text-muted">
          {t("rosterEmptyDesc")}
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
