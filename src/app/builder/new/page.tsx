/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { GRAND_FACTIONS, getSubfactions, type Faction } from "@/lib/factions";
import { createArmyList } from "@/lib/builder/actions";
import { useTranslations } from "next-intl";

export default function NewArmyPage() {
  const router = useRouter();
  const [creating, setCreating] = useState<string | null>(null);
  const [selectedGF, setSelectedGF] = useState<string | null>(null);
  const t = useTranslations("builder");

  const activeGF = GRAND_FACTIONS.find((gf) => gf.id === selectedGF);
  const subfactions = selectedGF ? getSubfactions(selectedGF) : [];

  async function handleSelect(factionId: string) {
    if (creating) return;
    setCreating(factionId);
    try {
      const id = await createArmyList(factionId);
      router.push(`/builder/${id}`);
    } catch {
      setCreating(null);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-10 animate-fade-in-up">
        <h1 className="font-display mb-2 text-3xl font-bold text-gold sm:text-4xl">
          {t("chooseFaction")}
        </h1>
        <p className="text-muted">
          {selectedGF
            ? t("pickSubfaction")
            : t("chooseGrandFaction")}
        </p>
      </div>

      {/* Grand faction selector */}
      {!selectedGF && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GRAND_FACTIONS.filter((gf) => !gf.comingSoon).map((gf) => {
            const color = `var(${gf.colorVar})`;
            return (
              <button
                key={gf.id}
                onClick={() => setSelectedGF(gf.id)}
                className="card-hover group relative block overflow-hidden rounded-xl border border-border bg-surface p-5 text-left transition-all"
                style={{ borderLeftColor: color, borderLeftWidth: 3 }}
              >
                <div className="relative">
                  <h3
                    className="font-display mb-1 text-lg font-semibold"
                    style={{ color }}
                  >
                    {gf.name}
                  </h3>
                  <p className="text-xs text-muted line-clamp-2">
                    {gf.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Subfaction selector */}
      {selectedGF && activeGF && (
        <div>
          <button
            onClick={() => setSelectedGF(null)}
            className="mb-6 text-sm text-muted transition-colors hover:text-foreground"
          >
            {t("backToFactions")}
          </button>

          <h2
            className="font-display mb-4 text-lg font-bold"
            style={{ color: `var(${activeGF.colorVar})` }}
          >
            {t("subfactions", { name: activeGF.name })}
          </h2>

          <div
            className={`grid gap-4 ${
              subfactions.length === 1
                ? "md:max-w-sm"
                : "sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {subfactions.map((faction: Faction) => {
              const primary = `var(--faction-${faction.colorKey})`;
              const isCreating = creating === faction.id;

              return (
                <button
                  key={faction.id}
                  onClick={() => handleSelect(faction.id)}
                  disabled={!!creating}
                  className="card-hover group relative block overflow-hidden rounded-xl border border-border bg-surface p-5 text-left transition-all disabled:opacity-50"
                  style={{ borderLeftColor: primary, borderLeftWidth: 3 }}
                >
                  {faction.crest && (
                    <img
                      src={faction.crest}
                      alt=""
                      className="pointer-events-none absolute -right-4 -top-4 h-32 w-32 object-contain opacity-[0.08] transition-opacity group-hover:opacity-[0.16]"
                    />
                  )}
                  <div className="relative flex items-center gap-3">
                    <img
                      src={faction.svgIcon}
                      alt={faction.name}
                      width={32}
                      height={32}
                      className="shrink-0 opacity-80"
                    />
                    <div className="min-w-0">
                      <h3 className="font-display truncate font-semibold text-foreground">
                        {faction.name}
                      </h3>
                      <p className="truncate text-xs text-muted">
                        {faction.theme}
                      </p>
                    </div>
                  </div>
                  {isCreating && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-surface/80">
                      <span className="text-sm text-gold">{t("creating")}</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
