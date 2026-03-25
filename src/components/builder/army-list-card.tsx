"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import type { ArmyListRow } from "@/lib/builder";
import type { Faction } from "@/lib/factions";
import { BATTLE_SIZE_CONFIG } from "@/lib/builder";
import type { BattleSize } from "@/lib/builder";
import { useTranslations } from "next-intl";

export default function ArmyListCard({
  army,
  faction,
  index,
}: {
  army: ArmyListRow;
  faction: Faction | undefined;
  index: number;
}) {
  const primary = faction ? `var(--faction-${faction.colorKey})` : "var(--gold)";
  const sizeConfig = BATTLE_SIZE_CONFIG[army.battle_size as BattleSize];
  const updated = new Date(army.updated_at).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
  const t = useTranslations("common");
  const tb = useTranslations("builder");

  return (
    <Link
      href={`/builder/${army.id}`}
      className="card-hover group relative block overflow-hidden rounded-xl border border-border bg-surface p-5 transition-all"
      style={{
        borderLeftColor: primary,
        borderLeftWidth: 3,
        animationDelay: `${index * 0.06}s`,
      }}
    >
      {/* Crest watermark */}
      {faction?.crest && (
        <img
          src={faction.crest}
          alt=""
          className="pointer-events-none absolute -right-4 -top-4 h-32 w-32 object-contain opacity-[0.06] transition-opacity group-hover:opacity-[0.12]"
        />
      )}

      <div className="relative">
        <div className="mb-3 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-display truncate text-lg font-semibold text-foreground">
              {army.name}
            </h3>
            <p className="text-xs text-muted">
              {faction?.name ?? army.faction_id}
            </p>
          </div>
          {faction && (
            <img
              src={faction.crest}
              alt=""
              width={24}
              height={24}
              className="shrink-0 opacity-60"
            />
          )}
        </div>

        <div className="flex items-center gap-2">
          <span
            className="rounded-lg px-2 py-0.5 text-xs font-medium"
            style={{
              backgroundColor: `color-mix(in srgb, ${primary} 12%, transparent)`,
              color: primary,
            }}
          >
            {sizeConfig?.label ?? army.battle_size}
          </span>
          <span className="rounded-lg bg-gold/10 px-2 py-0.5 text-xs font-medium text-gold">
            {t("pts", { points: sizeConfig?.points ?? "?" })}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-muted">{t("updated", { date: updated })}</p>
          <span className="text-xs text-muted opacity-0 transition-opacity group-hover:opacity-100">
            {t("edit")}
          </span>
        </div>
      </div>
    </Link>
  );
}
