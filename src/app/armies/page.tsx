/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ALL_FACTIONS, type Faction } from "@/lib/factions";
import StarRating from "@/components/star-rating";

const allegianceColor: Record<string, string> = {
  Alliance: "var(--alliance)",
  Horde: "var(--horde)",
  Scourge: "var(--scourge)",
};

const allegianceText: Record<string, string> = {
  Alliance: "text-alliance",
  Horde: "text-horde",
  Scourge: "text-scourge",
};

function FactionCard({ faction, index }: { faction: Faction; index: number }) {
  const primary = `var(--faction-${faction.colorKey})`;
  const accent = `var(--faction-${faction.colorKey}-accent)`;

  return (
    <Link
      href={`/armies/${faction.id}`}
      className="card-hover faction-glow group relative block min-h-60 overflow-hidden rounded-xl border transition-all"
      style={{
        "--faction-primary": primary,
        borderColor: `color-mix(in srgb, ${primary} 25%, transparent)`,
        animationDelay: `${index * 0.08}s`,
      } as React.CSSProperties}
    >
      {/* Layer 1: Base gradient */}
      <div
        className="absolute inset-0 rounded-xl transition-all duration-500"
        style={{
          background: `linear-gradient(135deg,
            color-mix(in srgb, ${primary} 20%, #0f0f0f) 0%,
            #141414 55%,
            color-mix(in srgb, ${accent} 8%, #0f0f0f) 100%
          )`,
        }}
      />

      {/* Layer 2: Crest / SVG background image */}
      {faction.crest ? (
        <img
          src={faction.crest}
          alt=""
          className="pointer-events-none absolute -right-6 -top-6 h-52 w-52 object-contain opacity-[0.10] transition-opacity duration-500 group-hover:opacity-[0.20]"
        />
      ) : (
        <img
          src={faction.svgIcon}
          alt=""
          className="pointer-events-none absolute -right-4 -top-4 h-44 w-44 object-contain opacity-[0.08] transition-opacity duration-500 group-hover:opacity-[0.16]"
        />
      )}

      {/* Layer 3: Vignette for text readability */}
      <div
        className="absolute inset-0 rounded-xl"
        style={{
          background: "radial-gradient(ellipse 50% 80% at 85% 50%, transparent 30%, #0f0f0f 100%)",
        }}
      />

      {/* Layer 4: Content */}
      <div className="relative flex h-full min-h-60 flex-col justify-between p-5">
        {/* Top: Icon + Name + Allegiance */}
        <div>
          <div className="mb-3 flex items-center gap-3">
            <img
              src={faction.svgIcon}
              alt={faction.name}
              width={28}
              height={28}
              className="shrink-0 opacity-90 transition-opacity group-hover:opacity-100"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-display truncate text-lg font-bold text-foreground">
                {faction.name}
              </h3>
            </div>
            <span
              className="shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
              style={{
                backgroundColor: `color-mix(in srgb, ${primary} 15%, transparent)`,
                color: primary,
              }}
            >
              {faction.allegiance}
            </span>
          </div>

          <p className="mb-3 text-sm leading-relaxed text-muted line-clamp-2">
            {faction.theme}
          </p>

          {/* Mechanic pill */}
          <div
            className="mb-3 inline-block rounded-lg border px-2.5 py-1"
            style={{
              borderColor: `color-mix(in srgb, ${accent} 25%, transparent)`,
              backgroundColor: `color-mix(in srgb, ${accent} 6%, transparent)`,
            }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: accent }}>
              {faction.mechanic.name}
            </p>
          </div>
        </div>

        {/* Bottom: Ratings + unit count */}
        <div>
          <div className="mb-2 space-y-1">
            <StarRating label="Offense" value={faction.ratings.offense} color={accent} />
            <StarRating label="Defense" value={faction.ratings.defense} color={accent} />
            <StarRating label="Magic" value={faction.ratings.magic} color={accent} />
            <StarRating label="Speed" value={faction.ratings.speed} color={accent} />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs text-muted">
              {faction.units.length} units
            </p>
            <span className="text-xs text-muted opacity-0 transition-opacity group-hover:opacity-100">
              View Army &rarr;
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ArmiesPage() {
  const groups: Record<string, typeof ALL_FACTIONS> = {
    Alliance: ALL_FACTIONS.filter((f) => f.allegiance === "Alliance"),
    Horde: ALL_FACTIONS.filter((f) => f.allegiance === "Horde"),
    Scourge: ALL_FACTIONS.filter((f) => f.allegiance === "Scourge"),
  };

  let cardIndex = 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-10 animate-fade-in-up">
        <h1 className="font-display mb-2 text-3xl font-bold text-gold sm:text-4xl">
          Armies
        </h1>
        <p className="text-muted">
          3 allegiances, 8 factions. Choose your side.
        </p>
      </div>

      {Object.entries(groups).map(([allegiance, factions], gi) => (
        <div
          key={allegiance}
          className="mb-10 animate-fade-in-up"
          style={{ animationDelay: `${gi * 0.12}s` }}
        >
          {/* Allegiance section header */}
          <div className="mb-6 flex items-center gap-4">
            <div
              className="h-px flex-1"
              style={{
                background: `linear-gradient(to right, transparent, ${allegianceColor[allegiance]}40)`,
              }}
            />
            <h2 className={`font-display text-xl font-bold tracking-wide ${allegianceText[allegiance]}`}>
              {allegiance}
            </h2>
            <div
              className="h-px w-16"
              style={{
                background: `${allegianceColor[allegiance]}40`,
              }}
            />
          </div>

          {/* Faction cards grid */}
          <div className={`grid gap-5 ${
            factions.length === 1
              ? "md:grid-cols-1 md:max-w-lg"
              : factions.length <= 3
                ? "md:grid-cols-2 lg:grid-cols-3"
                : "md:grid-cols-2 xl:grid-cols-4"
          }`}>
            {factions.map((faction) => {
              const idx = cardIndex++;
              return (
                <FactionCard
                  key={faction.id}
                  faction={faction}
                  index={idx}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
