"use client";

import { useBuilder } from "./army-builder-provider";
import { BATTLE_SIZE_CONFIG } from "@/lib/builder";
import { useTranslations } from "next-intl";

export default function ValidationPanel() {
  const { errors, state, tierCounts } = useBuilder();
  const t = useTranslations("builder");

  if (state.units.length === 0) return null;

  const sizeConfig = BATTLE_SIZE_CONFIG[state.battleSize];
  const errorItems = errors.filter((e) => e.type === "error");
  const warningItems = errors.filter((e) => e.type === "warning");

  return (
    <div className="space-y-3">
      {/* Tier summary */}
      <div className="rounded-xl border border-border bg-surface p-4">
        <p className="mb-2 text-[10px] uppercase tracking-wider text-muted">
          {t("compositionLabel", { label: sizeConfig.label })}
        </p>
        <div className="grid grid-cols-4 gap-3 text-center">
          {(["Hero", "Baseline", "Mounted", "Elite"] as const).map((tier) => {
            const count = tierCounts[tier] ?? 0;
            return (
              <div key={tier}>
                <p className="text-[10px] text-muted">{tier}</p>
                <p className="text-sm font-bold text-foreground">{count}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Errors */}
      {errorItems.length > 0 && (
        <div className="rounded-xl border border-horde/20 bg-horde/5 p-4">
          <p className="mb-2 text-xs font-semibold text-horde">{t("errors")}</p>
          <ul className="space-y-1">
            {errorItems.map((err, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-foreground/80">
                <span className="mt-0.5 text-horde">&#10005;</span>
                {err.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Warnings */}
      {warningItems.length > 0 && (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
          <p className="mb-2 text-xs font-semibold text-amber-400">{t("warnings")}</p>
          <ul className="space-y-1">
            {warningItems.map((warn, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-foreground/80">
                <span className="mt-0.5 text-amber-400">&#9888;</span>
                {warn.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      {errors.length === 0 && (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
          <p className="flex items-center gap-2 text-xs font-medium text-emerald-400">
            <span>&#10003;</span>
            {t("compositionValid")}
          </p>
        </div>
      )}
    </div>
  );
}
