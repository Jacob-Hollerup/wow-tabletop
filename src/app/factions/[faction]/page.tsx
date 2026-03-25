/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  GRAND_FACTIONS,
  getGrandFaction,
  getSubfactions,
  getBaseFaction,
  getBaseUnits,
} from "@/lib/factions";
import StarRating from "@/components/star-rating";
import UnitCard from "@/components/unit-card";

export function generateStaticParams() {
  return GRAND_FACTIONS.filter((gf) => !gf.comingSoon).map((gf) => ({
    faction: gf.id,
  }));
}

export default async function GrandFactionPage({
  params,
}: {
  params: Promise<{ faction: string }>;
}) {
  const { faction: factionId } = await params;
  const gf = getGrandFaction(factionId);
  if (!gf || gf.comingSoon) notFound();

  const subfactions = getSubfactions(gf.id);
  const baseFaction = getBaseFaction(gf.id);
  const baseUnits = getBaseUnits(gf.id);

  const color = `var(${gf.colorVar})`;
  const accent = `var(${gf.accentVar})`;

  return (
    <div
      className="min-h-screen"
      style={
        {
          "--gf-color": color,
          "--gf-accent": accent,
        } as React.CSSProperties
      }
    >
      {/* Page ambient glow */}
      <div className="faction-page-bg pointer-events-none fixed inset-0 -z-10" />

      {/* Banner */}
      <div className="faction-banner texture-noise relative overflow-hidden">
        <div className="relative mx-auto max-w-5xl px-4 pb-12 pt-8">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-1.5 text-sm animate-fade-in">
            <Link
              href="/factions"
              className="text-muted transition-colors hover:text-foreground"
            >
              Factions
            </Link>
            <svg
              width="12"
              height="12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-muted/50"
            >
              <path d="M4 2l4 4-4 4" />
            </svg>
            <span style={{ color }}>{gf.name}</span>
          </nav>

          {/* Title */}
          <div className="animate-fade-in-up">
            <h1
              className="font-display mb-3 text-4xl font-bold sm:text-5xl"
              style={{ color }}
            >
              {gf.name}
            </h1>
            <p className="max-w-2xl text-foreground/70">{gf.description}</p>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-background to-transparent" />
      </div>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Base faction info */}
        {baseFaction && (
          <div
            className="mb-10 rounded-xl border p-5 animate-fade-in-up"
            style={{
              borderColor: `color-mix(in srgb, ${color} 30%, transparent)`,
              backgroundColor: `color-mix(in srgb, ${color} 6%, transparent)`,
            }}
          >
            <h2
              className="font-display mb-1 text-sm font-bold uppercase tracking-wider"
              style={{ color: accent }}
            >
              Base Faction &mdash; {baseFaction.name}
            </h2>
            <p className="mb-3 text-sm text-foreground/70">
              All {gf.name} armies have access to{" "}
              <strong className="text-foreground">{baseFaction.name}</strong>{" "}
              battleline units. Your subfaction adds its own heroes, elites, and
              additional battleline.
            </p>
            <div
              className="inline-block rounded-lg border px-3 py-1.5"
              style={{
                borderColor: `color-mix(in srgb, ${accent} 25%, transparent)`,
                backgroundColor: `color-mix(in srgb, ${accent} 6%, transparent)`,
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: accent }}
              >
                Faction Mechanic: {baseFaction.mechanic.name}
              </p>
              <p className="mt-0.5 text-xs text-foreground/60">
                {baseFaction.mechanic.description}
              </p>
            </div>
          </div>
        )}

        {/* Base units */}
        {baseUnits.length > 0 && baseFaction && (
          <div className="mb-10 animate-fade-in-up animate-delay-100">
            <div className="mb-4 flex items-center gap-3">
              <div className="faction-divider h-px flex-1" />
              <h2 className="font-display text-xl font-bold text-foreground">
                Shared Base Units
              </h2>
              <div
                className="h-px w-12"
                style={{ background: `color-mix(in srgb, ${color} 40%, transparent)` }}
              />
            </div>
            <p className="mb-4 text-sm text-muted">
              Available to all {gf.name} subfactions.
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              {baseUnits.map((unit) => (
                <UnitCard
                  key={unit.name}
                  unit={unit}
                  allegiance={baseFaction.allegiance}
                  factionId={baseFaction.id}
                />
              ))}
            </div>
          </div>
        )}

        {/* Subfaction header */}
        <div className="mb-6 flex items-center gap-3 animate-fade-in-up animate-delay-100">
          <div className="faction-divider h-px flex-1" />
          <h2 className="font-display text-xl font-bold text-foreground">
            Subfactions
          </h2>
          <div
            className="h-px w-12"
            style={{ background: `color-mix(in srgb, ${color} 40%, transparent)` }}
          />
        </div>

        {/* Subfaction cards */}
        <div
          className={`grid gap-5 ${
            subfactions.length === 1 ? "md:max-w-lg" : "md:grid-cols-2"
          }`}
        >
          {subfactions.map((sf, i) => {
            const sfColor = `var(--faction-${sf.colorKey})`;
            const sfAccent = `var(--faction-${sf.colorKey}-accent)`;

            return (
              <Link
                key={sf.id}
                href={`/factions/${gf.id}/${sf.id}`}
                className="subfaction-card faction-glow group relative block min-h-64 overflow-hidden rounded-xl border"
                style={
                  {
                    "--faction-primary": sfColor,
                    "--sf-color": sfColor,
                    borderColor: `color-mix(in srgb, ${sfColor} 25%, transparent)`,
                    animationDelay: `${i * 0.08}s`,
                  } as React.CSSProperties
                }
              >
                {/* Background gradient */}
                <div
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    background: `linear-gradient(135deg,
                      color-mix(in srgb, ${sfColor} 10%, var(--surface)) 0%,
                      var(--surface) 55%,
                      color-mix(in srgb, ${sfAccent} 6%, var(--surface)) 100%
                    )`,
                  }}
                />

                {/* Crest watermark */}
                {sf.crest && (
                  <img
                    src={sf.crest}
                    alt=""
                    className="pointer-events-none absolute -right-6 -top-6 h-52 w-52 object-contain opacity-[0.10] transition-opacity duration-500 group-hover:opacity-[0.20]"
                  />
                )}

                {/* Vignette */}
                <div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background:
                      "radial-gradient(ellipse 50% 80% at 85% 50%, transparent 30%, var(--surface) 100%)",
                  }}
                />

                {/* Content */}
                <div className="relative flex h-full min-h-64 flex-col justify-between p-5">
                  <div>
                    <div className="mb-3 flex items-center gap-3">
                      <img
                        src={sf.crest}
                        alt={sf.name}
                        width={28}
                        height={28}
                        className="shrink-0 opacity-90 transition-opacity group-hover:opacity-100"
                      />
                      <h3 className="font-display flex-1 truncate text-lg font-bold text-foreground">
                        {sf.name}
                      </h3>
                      {sf.upcoming && (
                        <span
                          className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                          style={{
                            backgroundColor: "color-mix(in srgb, #f59e0b 15%, transparent)",
                            color: "#f59e0b",
                          }}
                        >
                          Upcoming
                        </span>
                      )}
                      {sf.isBase && (
                        <span
                          className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                          style={{
                            backgroundColor: `color-mix(in srgb, ${sfColor} 15%, transparent)`,
                            color: sfColor,
                          }}
                        >
                          Base
                        </span>
                      )}
                    </div>

                    <p className="mb-3 text-sm leading-relaxed text-muted line-clamp-2">
                      {sf.theme}
                    </p>

                    {/* Mechanic pill */}
                    <div
                      className="mb-3 inline-block rounded-lg border px-2.5 py-1"
                      style={{
                        borderColor: `color-mix(in srgb, ${sfAccent} 25%, transparent)`,
                        backgroundColor: `color-mix(in srgb, ${sfAccent} 6%, transparent)`,
                      }}
                    >
                      <p
                        className="text-[10px] font-semibold uppercase tracking-wider"
                        style={{ color: sfAccent }}
                      >
                        {sf.mechanic.name}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 space-y-1">
                      <StarRating
                        label="Offense"
                        value={sf.ratings.offense}
                        color={sfAccent}
                      />
                      <StarRating
                        label="Defense"
                        value={sf.ratings.defense}
                        color={sfAccent}
                      />
                      <StarRating
                        label="Magic"
                        value={sf.ratings.magic}
                        color={sfAccent}
                      />
                      <StarRating
                        label="Speed"
                        value={sf.ratings.speed}
                        color={sfAccent}
                      />
                    </div>
                    {sf.upcoming && sf.upcomingHint && (
                      <p className="mb-2 text-[11px] italic text-amber-500/70">
                        {sf.upcomingHint}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted">
                        {sf.units.length} units
                      </p>
                      <span className="text-xs text-muted opacity-0 transition-opacity group-hover:opacity-100">
                        View Subfaction &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
