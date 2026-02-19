"use client";

import { useState } from "react";
import Image from "next/image";
import type { Unit, HeroAbility } from "@/lib/factions";

const subfactionIconMap: Record<string, string> = {
  Human: "/images/Human_Crest.webp",
  Dwarf: "/images/Dwarf_Crest.webp",
  "Night Elf": "/images/night_elves.webp",
  Orc: "/images/Orc_Crest.webp",

  Forsaken: "/images/Forsaken_Crest.webp",
  Darkspear: "/images/Troll_Crest.webp",
  Troll: "/images/Troll_Crest.webp",
  Scourge: "/images/scourge.webp",
};

const tierColors: Record<string, string> = {
  Hero: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Baseline: "bg-zinc-500/20 text-zinc-300 border-zinc-500/30",
  Mounted: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Elite: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

const factionBorder: Record<string, string> = {
  Alliance: "border-l-alliance",
  Horde: "border-l-horde",
  Scourge: "border-l-scourge",
};

const specActiveStyle: Record<string, string> = {
  Alliance: "bg-alliance/10 text-alliance border-alliance/30",
  Horde: "bg-horde/10 text-horde border-horde/30",
  Scourge: "bg-scourge/10 text-scourge border-scourge/30",
};

const STAT_LABELS = ["MOV", "ATK", "SKL", "STR", "TGH", "DEF", "INI", "WND", "PTS"] as const;

const EQUIPMENT_INI: Record<string, number> = {
  "Plate Armor": -1, "Death Plate": -1, "Heavy Mail": -1,
  "Leather": 1, "Robes/None": 1, "Rags/None": 1,
  "Greatsword": -1, "Halberd": -1, "Greataxe": -1, "War Totem": -1, "Runeblade": -1,
  "Dagger": 1, "Staff": 1, "Bone Staff": 1, "Claws": 1,
};

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

function computeEffectiveINI(unit: Unit): string | null {
  if (unit.equipment.length === 0) return null;

  const baseINI = unit.stats.INI;
  const armor = unit.equipment.filter(
    (e) => ["Plate Armor", "Death Plate", "Heavy Mail", "Mail", "Chain/Hide", "Bone/Chain", "Leather", "Robes/None", "Rags/None"].includes(e)
  );
  const weapons = unit.equipment.filter(
    (e) => !["Plate Armor", "Death Plate", "Heavy Mail", "Mail", "Chain/Hide", "Bone/Chain", "Leather", "Robes/None", "Rags/None", "Shield"].includes(e)
  );

  const armorMods = armor.map((e) => EQUIPMENT_INI[e] ?? 0);
  const weaponMods = weapons.map((e) => EQUIPMENT_INI[e] ?? 0);

  const minArmor = armorMods.length > 0 ? Math.min(...armorMods) : 0;
  const maxArmor = armorMods.length > 0 ? Math.max(...armorMods) : 0;
  const minWeapon = weaponMods.length > 0 ? Math.min(...weaponMods) : 0;
  const maxWeapon = weaponMods.length > 0 ? Math.max(...weaponMods) : 0;

  const minINI = baseINI + minArmor + minWeapon;
  const maxINI = baseINI + maxArmor + maxWeapon;

  if (minINI === maxINI) return null;
  return `${minINI}-${maxINI}`;
}

function AbilityRow({ ability, highlight }: { ability: HeroAbility; highlight?: boolean }) {
  if (highlight) {
    return (
      <div className="rounded border border-gold/20 bg-gold/5 px-2.5 py-1.5">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-semibold text-gold">{ability.name}</span>
          <span className={`rounded border px-1.5 py-0.5 text-[10px] font-medium ${costStyle[getCostCategory(ability.cost)]}`}>
            {ability.cost}
          </span>
          <span className={`text-[10px] font-medium ${typeStyle[ability.type] ?? "text-muted"}`}>
            {ability.type}
          </span>
        </div>
        <p className="mt-0.5 text-xs text-foreground/70">{ability.description}</p>
      </div>
    );
  }

  return (
    <div className="rounded bg-background/50 px-2.5 py-1.5">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-xs font-medium text-foreground">{ability.name}</span>
        <span className={`rounded border px-1.5 py-0.5 text-[10px] font-medium ${costStyle[getCostCategory(ability.cost)]}`}>
          {ability.cost}
        </span>
        <span className={`text-[10px] font-medium ${typeStyle[ability.type] ?? "text-muted"}`}>
          {ability.type}
        </span>
      </div>
      <p className="mt-0.5 text-xs text-foreground/60">{ability.description}</p>
    </div>
  );
}

export default function UnitCard({
  unit,
  allegiance,
}: {
  unit: Unit;
  allegiance: "Alliance" | "Horde" | "Scourge";
}) {
  const [specIdx, setSpecIdx] = useState(0);
  const iniRange = computeEffectiveINI(unit);
  const hero = unit.heroData;

  return (
    <div
      className={`rounded-lg border border-border border-l-[3px] ${factionBorder[allegiance]} bg-surface p-4 transition-colors hover:border-gold/30`}
    >
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-semibold text-foreground">{unit.name}</h3>
            {hero && (
              <span className="shrink-0 text-[10px] text-muted">
                {hero.className}
              </span>
            )}
          </div>
          <p className="flex items-center gap-1 text-xs text-muted">
            {subfactionIconMap[unit.subfaction] && (
              <Image
                src={subfactionIconMap[unit.subfaction]}
                alt={unit.subfaction}
                width={14}
                height={14}
                className="opacity-60"
              />
            )}
            {unit.subfaction} &middot; {unit.archetype}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          {unit.dualSlot && (
            <span className="rounded border border-orange-500/30 bg-orange-500/10 px-1.5 py-0.5 text-[10px] font-medium text-orange-400">
              {unit.dualSlot}
            </span>
          )}
          <span
            className={`rounded border px-2 py-0.5 text-xs font-medium ${
              tierColors[unit.tier] || tierColors.Baseline
            }`}
          >
            {unit.tier}
          </span>
          <span className="rounded bg-gold/10 px-2 py-0.5 text-xs font-bold text-gold">
            {unit.stats.PTS} pts
          </span>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="mb-3 grid grid-cols-9 gap-px overflow-hidden rounded border border-border bg-border">
        {STAT_LABELS.map((stat) => {
          const val = unit.stats[stat];
          const display = (stat === "SKL" || stat === "DEF") ? `${val}+` : `${val}`;
          return (
            <div key={stat} className="bg-background px-1 py-1.5 text-center">
              <div className="text-[10px] uppercase tracking-wider text-muted">{stat}</div>
              <div className={`text-sm font-bold ${stat === "PTS" ? "text-gold" : "text-foreground"}`}>
                {display}
              </div>
            </div>
          );
        })}
      </div>

      {/* Effective INI */}
      {iniRange && (
        <p className="mb-3 text-[11px] text-muted">
          Effective INI: <span className="text-foreground/70">{iniRange}</span>
          <span className="ml-1 text-muted/60">(varies by equipment)</span>
        </p>
      )}

      {/* Keywords */}
      {unit.keywords.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {unit.keywords.map((kw) => (
            <span
              key={kw}
              className="rounded-full border border-gold/20 bg-gold/5 px-2 py-0.5 text-[11px] font-medium text-gold"
            >
              {kw}
            </span>
          ))}
        </div>
      )}

      {/* Equipment */}
      {unit.equipment.length > 0 && (
        <div className="mb-3">
          <p className="mb-1 text-[10px] uppercase tracking-wider text-muted">
            Equipment Options
          </p>
          <div className="flex flex-wrap gap-1">
            {unit.equipment.map((eq) => (
              <span
                key={eq}
                className="rounded bg-background px-1.5 py-0.5 text-[11px] text-foreground/60"
              >
                {eq}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      <p className="text-sm leading-relaxed text-foreground/80">
        {unit.description}
      </p>

      {/* Hero Abilities */}
      {hero && (
        <div className="mt-3 border-t border-border pt-3">
          {/* Class Ability */}
          <p className="mb-2 text-[10px] uppercase tracking-wider text-muted">Class Ability</p>
          <AbilityRow ability={hero.classAbility} highlight />

          {/* Global Abilities */}
          <p className="mb-2 mt-3 text-[10px] uppercase tracking-wider text-muted">Class Abilities</p>
          <div className="space-y-1.5">
            {hero.globals.map((ability) => (
              <AbilityRow key={ability.name} ability={ability} />
            ))}
          </div>

          {/* Spec Toggle */}
          <div className="mb-2 mt-3 flex items-center gap-2">
            <p className="text-[10px] uppercase tracking-wider text-muted">Spec</p>
            <div className="flex gap-1">
              {hero.specs.map((spec, idx) => (
                <button
                  key={spec.name}
                  onClick={() => setSpecIdx(idx)}
                  className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium transition-colors ${
                    idx === specIdx
                      ? specActiveStyle[allegiance]
                      : "border-border bg-background text-muted hover:text-foreground/70"
                  }`}
                >
                  {spec.name}
                </button>
              ))}
            </div>
          </div>

          {/* Spec Abilities */}
          <div className="space-y-1.5">
            {hero.specs[specIdx].abilities.map((ability) => (
              <AbilityRow key={ability.name} ability={ability} />
            ))}
            <AbilityRow ability={hero.specs[specIdx].ultimate} highlight />
          </div>
        </div>
      )}
    </div>
  );
}
