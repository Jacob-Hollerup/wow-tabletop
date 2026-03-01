/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useBuilder } from "./army-builder-provider";
import { BATTLE_SIZE_CONFIG, type BattleSize } from "@/lib/builder";

const BATTLE_SIZES: BattleSize[] = ["skirmish", "standard", "large"];

export default function ArmyHeader() {
  const { state, dispatch, faction, totalPoints, pointsBudget } = useBuilder();
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const primary = `var(--faction-${faction.colorKey})`;

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const pctUsed = Math.min((totalPoints / pointsBudget) * 100, 100);
  const overBudget = totalPoints > pointsBudget;

  return (
    <div className="animate-fade-in-up">
      {/* Back link */}
      <Link
        href="/builder"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        All Armies
      </Link>

      <div className="rounded-xl border border-border bg-surface p-5">
        {/* Top row: Name + faction badge */}
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={faction.svgIcon}
              alt={faction.name}
              width={28}
              height={28}
              className="shrink-0 opacity-80"
            />
            <div>
              {editing ? (
                <input
                  ref={inputRef}
                  type="text"
                  value={state.name}
                  onChange={(e) => dispatch({ type: "SET_NAME", name: e.target.value })}
                  onBlur={() => setEditing(false)}
                  onKeyDown={(e) => e.key === "Enter" && setEditing(false)}
                  className="font-display border-b border-gold/40 bg-transparent text-xl font-bold text-foreground outline-none"
                />
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="font-display group flex items-center gap-1.5 text-xl font-bold text-foreground"
                >
                  {state.name}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="text-muted opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <path d="M11.5 2.5l2 2L5 13H3v-2L11.5 2.5z" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </button>
              )}
              <p className="text-xs text-muted">{faction.name}</p>
            </div>
          </div>

          {/* Save indicator */}
          <div className="text-xs text-muted">
            {state.isSaving ? (
              <span className="text-gold">Saving...</span>
            ) : state.lastSavedAt ? (
              <span>Saved</span>
            ) : null}
          </div>
        </div>

        {/* Battle size + points */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Battle size toggle */}
          <div className="flex rounded-lg border border-border bg-background">
            {BATTLE_SIZES.map((size) => {
              const active = state.battleSize === size;
              const config = BATTLE_SIZE_CONFIG[size];
              return (
                <button
                  key={size}
                  onClick={() => dispatch({ type: "SET_BATTLE_SIZE", size })}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors first:rounded-l-lg last:rounded-r-lg ${
                    active
                      ? "bg-gold/15 text-gold"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {config.label}
                  <span className="ml-1 text-[10px] opacity-60">{config.points}</span>
                </button>
              );
            })}
          </div>

          {/* Points bar */}
          <div className="flex flex-1 items-center gap-3">
            <div className="h-2 min-w-24 flex-1 overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${pctUsed}%`,
                  backgroundColor: overBudget ? "var(--horde)" : "var(--gold)",
                }}
              />
            </div>
            <span
              className={`text-sm font-bold tabular-nums ${
                overBudget ? "text-horde" : "text-gold"
              }`}
            >
              {totalPoints} / {pointsBudget} pts
            </span>
          </div>

          {/* Unit count + mana */}
          <div className="flex items-center gap-3 text-xs text-muted">
            <span>{state.units.length} units</span>
            <span className="text-blue-400">{useBuilder().manaGeneration} mana/turn</span>
          </div>
        </div>
      </div>
    </div>
  );
}
