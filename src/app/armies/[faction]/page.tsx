/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound } from "next/navigation";
import { getFaction, getUnitsByTier, ALL_FACTIONS } from "@/lib/factions";
import UnitCard from "@/components/unit-card";
import StarRating from "@/components/star-rating";

export function generateStaticParams() {
  return ALL_FACTIONS.map((f) => ({ faction: f.id }));
}

const tierLabels: Record<string, string> = {
  Hero: "Heroes",
  Baseline: "Baseline Units",
  Mounted: "Mounted Units",
  Elite: "Elite Units",
};

export default async function FactionPage({
  params,
}: {
  params: Promise<{ faction: string }>;
}) {
  const { faction: factionId } = await params;
  const faction = getFaction(factionId);
  if (!faction) notFound();

  const unitsByTier = getUnitsByTier(faction.units);
  const primary = `var(--faction-${faction.colorKey})`;
  const accent = `var(--faction-${faction.colorKey}-accent)`;

  return (
    <div
      className="min-h-screen"
      style={{
        "--faction-primary": primary,
        "--faction-accent": accent,
      } as React.CSSProperties}
    >
      {/* Subtle faction ambient glow across entire page */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 0%,
            color-mix(in srgb, ${primary} 6%, transparent) 0%,
            transparent 60%
          )`,
        }}
      />

      {/* Hero Banner */}
      <div className="relative overflow-hidden">
        {/* Multi-layer gradient background */}
        <div
          className="absolute inset-0 texture-noise"
          style={{
            background: `linear-gradient(160deg,
              color-mix(in srgb, ${primary} 30%, #0a0a0a) 0%,
              #0f0f0f 50%,
              color-mix(in srgb, ${accent} 8%, #0f0f0f) 100%
            )`,
          }}
        />

        {/* Crest watermark */}
        {faction.crest ? (
          <img
            src={faction.crest}
            alt=""
            className="pointer-events-none absolute right-4 top-1/2 h-56 w-56 -translate-y-1/2 object-contain opacity-[0.08] md:right-12 md:h-64 md:w-64"
          />
        ) : (
          <img
            src={faction.svgIcon}
            alt=""
            className="pointer-events-none absolute right-8 top-1/2 h-44 w-44 -translate-y-1/2 object-contain opacity-[0.10] md:right-16"
          />
        )}

        {/* Banner content */}
        <div className="relative mx-auto max-w-5xl px-4 pb-12 pt-8">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-1.5 text-sm animate-fade-in">
            <Link href="/armies" className="text-muted transition-colors hover:text-foreground">
              Armies
            </Link>
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted/50">
              <path d="M4 2l4 4-4 4" />
            </svg>
            <span style={{ color: primary }}>
              {faction.name}
            </span>
          </nav>

          {/* Faction identity */}
          <div className="flex items-end gap-5 animate-fade-in-up">
            <img
              src={faction.svgIcon}
              alt={faction.name}
              width={64}
              height={64}
              className="mb-1 shrink-0"
            />
            <div>
              <p
                className="mb-1 text-xs font-semibold uppercase tracking-[0.25em]"
                style={{ color: accent }}
              >
                {faction.allegiance}
              </p>
              <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
                {faction.name}
              </h1>
            </div>
          </div>
        </div>

        {/* Bottom fade to page background */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-background to-transparent" />
      </div>

      {/* Page content */}
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Theme & Playstyle */}
        <div className="mb-6 grid gap-4 md:grid-cols-2 animate-fade-in-up animate-delay-100">
          <div>
            <h2 className="mb-1 text-sm font-semibold text-muted">Theme</h2>
            <p className="text-sm leading-relaxed text-foreground/80">{faction.theme}</p>
          </div>
          <div>
            <h2 className="mb-1 text-sm font-semibold text-muted">Playstyle</h2>
            <p className="text-sm leading-relaxed text-foreground/80">{faction.playstyle}</p>
          </div>
        </div>

        {/* Faction Mechanic */}
        <div
          className="mb-6 rounded-xl border p-4 animate-fade-in-up animate-delay-200"
          style={{
            borderColor: `color-mix(in srgb, ${primary} 30%, transparent)`,
            backgroundColor: `color-mix(in srgb, ${primary} 8%, transparent)`,
          }}
        >
          <h2 className="font-display text-sm font-bold" style={{ color: accent }}>
            {faction.mechanic.name}
          </h2>
          <p className="mt-1 text-sm text-foreground/80">{faction.mechanic.description}</p>
        </div>

        {/* Ratings & Strengths/Weaknesses */}
        <div className="mb-8 grid gap-4 md:grid-cols-3 animate-fade-in-up animate-delay-300">
          <div className="rounded-xl border border-border bg-surface p-4">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Ratings</h3>
            <div className="space-y-1.5">
              <StarRating label="Offense" value={faction.ratings.offense} color={accent} />
              <StarRating label="Defense" value={faction.ratings.defense} color={accent} />
              <StarRating label="Magic" value={faction.ratings.magic} color={accent} />
              <StarRating label="Speed" value={faction.ratings.speed} color={accent} />
            </div>
          </div>
          <div className="rounded-xl border border-border bg-surface p-4">
            <h3
              className="mb-2 text-xs font-semibold uppercase tracking-wider"
              style={{ color: accent }}
            >
              Strengths
            </h3>
            <p className="text-sm text-foreground/80">{faction.strengths}</p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-4">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-red-400">Weaknesses</h3>
            <p className="text-sm text-foreground/80">{faction.weaknesses}</p>
          </div>
        </div>

        {/* Special Rules */}
        {faction.specialRules && faction.specialRules.length > 0 && (
          <div className="mb-8 rounded-xl border border-border bg-surface p-4">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Special Rules</h3>
            <ul className="space-y-1.5">
              {faction.specialRules.map((rule, i) => (
                <li key={i} className="text-sm text-foreground/80">
                  <span style={{ color: accent }} className="mr-2">&#x2022;</span>{rule}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Unit Roster by Tier */}
        {Object.entries(unitsByTier).map(([tier, units]) => (
          <div key={tier} className="mb-8">
            {/* Tier header with faction gradient line */}
            <div className="mb-4 flex items-center gap-3">
              <div
                className="h-px flex-1"
                style={{
                  background: `linear-gradient(to right, ${primary}, transparent)`,
                }}
              />
              <h2 className="font-display text-xl font-bold text-foreground">
                {tierLabels[tier] || tier}
              </h2>
              <div className="h-px w-8" style={{ background: primary }} />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {units.map((unit) => (
                <UnitCard key={unit.name} unit={unit} allegiance={faction.allegiance} factionId={faction.id} />
              ))}
            </div>
          </div>
        ))}

        {/* Empty state */}
        {faction.units.length === 0 && (
          <div className="mb-8 rounded-xl border border-border bg-surface p-8 text-center">
            <p className="text-muted">Unit profiles coming soon.</p>
          </div>
        )}

        {/* Composition Guidelines */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <div
              className="h-px flex-1"
              style={{
                background: `linear-gradient(to right, ${primary}, transparent)`,
              }}
            />
            <h2 className="font-display text-xl font-bold text-foreground">
              Composition Guidelines
            </h2>
            <div className="h-px w-8" style={{ background: primary }} />
          </div>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface">
                  {["Battle Size", "Baseline", "Mounted", "Elite", "Hero"].map((col) => (
                    <th
                      key={col}
                      className="py-3 px-4 text-left font-semibold"
                      style={{ color: accent }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {faction.composition.map((row, i) => (
                  <tr
                    key={row.size}
                    className="border-b border-border/50"
                    style={i % 2 === 1 ? { backgroundColor: `color-mix(in srgb, ${primary} 4%, transparent)` } : undefined}
                  >
                    <td className="py-2.5 px-4 font-medium text-foreground/80">{row.size}</td>
                    <td className="py-2.5 px-4 text-foreground/60">{row.baseline}</td>
                    <td className="py-2.5 px-4 text-foreground/60">{row.mounted}</td>
                    <td className="py-2.5 px-4 text-foreground/60">{row.elite}</td>
                    <td className="py-2.5 px-4 text-foreground/60">{row.hero}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
