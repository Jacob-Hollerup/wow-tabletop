/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { getUserArmyLists } from "@/lib/builder/actions";
import { getFaction } from "@/lib/factions";
import { BATTLE_SIZE_CONFIG } from "@/lib/builder";
import type { BattleSize } from "@/lib/builder";
import ArmyListCard from "@/components/builder/army-list-card";
import { getTranslations } from "next-intl/server";

export default async function BuilderPage() {
  const armies = await getUserArmyLists();
  const t = await getTranslations("builder");

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-10 animate-fade-in-up">
        <h1 className="font-display mb-2 text-3xl font-bold text-gold sm:text-4xl">
          {t("title")}
        </h1>
        <p className="text-muted">
          {t("description")}
        </p>
      </div>

      <div className="mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <Link
          href="/builder/new"
          className="inline-flex items-center gap-2 rounded-lg border border-gold/30 bg-gold/10 px-5 py-2.5 text-sm font-medium text-gold transition-colors hover:bg-gold/20"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          {t("newArmy")}
        </Link>
      </div>

      {armies.length === 0 ? (
        <div className="animate-fade-in-up rounded-xl border border-border bg-surface p-12 text-center" style={{ animationDelay: "0.2s" }}>
          <p className="mb-2 text-lg text-foreground/80">{t("noArmies")}</p>
          <p className="text-sm text-muted">
            {t("noArmiesDesc")}
          </p>
        </div>
      ) : (
        <div
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          {armies.map((army, i) => {
            const faction = getFaction(army.faction_id);
            return (
              <ArmyListCard
                key={army.id}
                army={army}
                faction={faction}
                index={i}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
