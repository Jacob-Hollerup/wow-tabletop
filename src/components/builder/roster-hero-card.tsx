"use client";

import type { Unit, HeroAbility } from "@/lib/factions";
import type { RosterUnit } from "@/lib/builder";
import { useBuilder } from "./army-builder-provider";

const STAT_LABELS = ["MOV", "ATK", "SKL", "STR", "TGH", "DEF", "INI", "WND", "PTS"] as const;

const costStyle: Record<string, string> = {
  mana: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  game: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  battle: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  passive: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30",
};

const typeStyle: Record<string, string> = {
  Instant: "text-emerald-400",
  Buff: "text-sky-400",
  "Spell Shoot": "text-violet-400",
  Reaction: "text-yellow-400",
  Debuff: "text-red-400",
  Blast: "text-orange-400",
  Summon: "text-teal-400",
};

function getCostCategory(cost: string): string {
  if (cost.includes("Mana")) return "mana";
  if (cost.includes("per game")) return "game";
  if (cost.includes("per battle")) return "battle";
  return "passive";
}

function AbilityRow({ ability, highlight }: { ability: HeroAbility; highlight?: boolean }) {
  return (
    <div className={`rounded-lg px-2.5 py-1.5 ${highlight ? "border border-gold/20 bg-gold/5" : "bg-background/50"}`}>
      <div className="flex flex-wrap items-center gap-1.5">
        <span className={`text-xs font-medium ${highlight ? "font-semibold text-gold" : "text-foreground"}`}>
          {ability.name}
        </span>
        <span className={`rounded border px-1.5 py-0.5 text-[10px] font-medium ${costStyle[getCostCategory(ability.cost)]}`}>
          {ability.cost}
        </span>
        <span className={`text-[10px] font-medium ${typeStyle[ability.type] ?? "text-muted"}`}>
          {ability.type}
        </span>
      </div>
      <p className={`mt-0.5 text-xs ${highlight ? "text-foreground/70" : "text-foreground/60"}`}>
        {ability.description}
      </p>
    </div>
  );
}

export default function RosterHeroCard({
  rosterUnit,
  unit,
}: {
  rosterUnit: RosterUnit;
  unit: Unit;
}) {
  const { dispatch, faction } = useBuilder();
  const hero = unit.heroData!;
  const primary = `var(--faction-${faction.colorKey})`;
  const accent = `var(--faction-${faction.colorKey}-accent)`;

  const selectedSpecName = rosterUnit.heroSpec;
  const specIdx = selectedSpecName
    ? hero.specs.findIndex((s) => s.name === selectedSpecName)
    : -1;
  const activeSpec = specIdx >= 0 ? hero.specs[specIdx] : null;

  const level = rosterUnit.heroLevel ?? 1;

  // Determine which abilities are visible at current level
  // Lv.1: classAbility + globals[0] + spec.abilities[0]
  // Lv.2: + globals[1] + spec.abilities[1]
  // Lv.3: + spec.ultimate
  const visibleGlobals = hero.globals.slice(0, level);
  const visibleSpecAbilities = activeSpec ? activeSpec.abilities.slice(0, level) : [];
  const showUltimate = activeSpec && level >= 3;

  return (
    <div
      className="rounded-xl border border-border border-l-[3px] bg-surface p-4"
      style={{ borderLeftColor: primary }}
    >
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-display truncate font-semibold text-foreground">{unit.name}</h3>
            <span className="text-[10px] text-muted">{hero.className}</span>
          </div>
          <p className="text-xs text-muted">
            {unit.subfaction} &middot; {unit.archetype}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="rounded-lg border bg-amber-500/20 text-amber-400 border-amber-500/30 px-2 py-0.5 text-xs font-medium">
            Hero
          </span>
          <span className="rounded-lg bg-gold/10 px-2 py-0.5 text-xs font-bold text-gold">
            {unit.stats.PTS} pts
          </span>
          <button
            onClick={() => dispatch({ type: "REMOVE_UNIT", unitId: rosterUnit.id })}
            className="rounded-lg border border-border p-1 text-muted transition-colors hover:border-horde/30 hover:text-horde"
            title="Remove hero"
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
            const val = unit.stats[stat];
            const display = stat === "SKL" || stat === "DEF" ? `${val}+` : `${val}`;
            return (
              <div key={stat} className="bg-background px-1 py-1.5 text-center">
                <div className="text-[9px] uppercase tracking-wider text-muted">{stat}</div>
                <div className="text-sm font-bold text-foreground">{display}</div>
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-4 gap-px sm:hidden">
          {STAT_LABELS.slice(5).map((stat) => {
            const val = unit.stats[stat];
            const display = stat === "SKL" || stat === "DEF" ? `${val}+` : `${val}`;
            return (
              <div key={stat} className="bg-background px-1 py-1.5 text-center">
                <div className="text-[9px] uppercase tracking-wider text-muted">{stat}</div>
                <div className={`text-sm font-bold ${stat === "PTS" ? "text-gold" : "text-foreground"}`}>{display}</div>
              </div>
            );
          })}
        </div>
        <div className="hidden grid-cols-9 gap-px sm:grid">
          {STAT_LABELS.map((stat) => {
            const val = unit.stats[stat];
            const display = stat === "SKL" || stat === "DEF" ? `${val}+` : `${val}`;
            return (
              <div key={stat} className="bg-background px-1 py-1.5 text-center">
                <div className="text-[10px] uppercase tracking-wider text-muted">{stat}</div>
                <div className={`text-sm font-bold ${stat === "PTS" ? "text-gold" : "text-foreground"}`}>{display}</div>
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

      {/* Hero Customization */}
      <div className="border-t border-border pt-3">
        {/* Level picker */}
        <div className="mb-3 flex items-center gap-3">
          <p className="text-[10px] uppercase tracking-wider text-muted">Level</p>
          <div className="flex gap-1">
            {[1, 2, 3].map((lvl) => (
              <button
                key={lvl}
                onClick={() => dispatch({ type: "SET_HERO_LEVEL", unitId: rosterUnit.id, level: lvl })}
                className={`rounded-lg border px-2.5 py-0.5 text-xs font-medium transition-colors ${
                  level === lvl
                    ? "border-gold/40 bg-gold/15 text-gold"
                    : "border-border bg-background text-muted hover:text-foreground"
                }`}
              >
                Lv.{lvl}
              </button>
            ))}
          </div>
          <span className="text-[10px] text-muted">
            {level === 1 ? "3 abilities" : level === 2 ? "5 abilities" : "6 abilities + ultimate"}
          </span>
        </div>

        {/* Class Ability */}
        <p className="mb-2 text-[10px] uppercase tracking-wider text-muted">Class Ability</p>
        <AbilityRow ability={hero.classAbility} highlight />

        {/* Global Abilities */}
        {visibleGlobals.length > 0 && (
          <>
            <p className="mb-2 mt-3 text-[10px] uppercase tracking-wider text-muted">Class Abilities</p>
            <div className="space-y-1.5">
              {visibleGlobals.map((ability) => (
                <AbilityRow key={ability.name} ability={ability} />
              ))}
            </div>
          </>
        )}

        {/* Spec picker */}
        <div className="mb-2 mt-3 flex items-center gap-2">
          <p className="text-[10px] uppercase tracking-wider text-muted">Spec</p>
          <div className="flex gap-1">
            {hero.specs.map((spec) => {
              const isActive = spec.name === selectedSpecName;
              return (
                <button
                  key={spec.name}
                  onClick={() =>
                    dispatch({ type: "SET_HERO_SPEC", unitId: rosterUnit.id, spec: spec.name })
                  }
                  className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium transition-colors ${
                    isActive
                      ? ""
                      : "border-border bg-background text-muted hover:text-foreground/70"
                  }`}
                  style={
                    isActive
                      ? {
                          borderColor: primary,
                          backgroundColor: `color-mix(in srgb, ${primary} 12%, transparent)`,
                          color: primary,
                        }
                      : undefined
                  }
                >
                  {spec.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Spec abilities */}
        {activeSpec && (
          <div className="space-y-1.5">
            {visibleSpecAbilities.map((ability) => (
              <AbilityRow key={ability.name} ability={ability} />
            ))}
            {showUltimate && <AbilityRow ability={activeSpec.ultimate} highlight />}
          </div>
        )}

        {!activeSpec && (
          <p className="mt-2 text-xs text-muted/60">Select a specialization above.</p>
        )}
      </div>
    </div>
  );
}
