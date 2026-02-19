import { notFound } from "next/navigation";
import Image from "next/image";
import { getFaction, getUnitsByTier, ALL_FACTIONS } from "@/lib/factions";
import UnitCard from "@/components/unit-card";
import StarRating from "@/components/star-rating";

export function generateStaticParams() {
  return ALL_FACTIONS.map((f) => ({ faction: f.id }));
}

const allegianceBorder: Record<string, string> = {
  Alliance: "border-alliance",
  Horde: "border-horde",
  Scourge: "border-scourge",
};

const allegianceText: Record<string, string> = {
  Alliance: "text-alliance",
  Horde: "text-horde",
  Scourge: "text-scourge",
};

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

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Header with icon */}
      <div className={`mb-8 flex items-center gap-4 border-l-4 ${allegianceBorder[faction.allegiance]} pl-4`}>
        <Image
          src={faction.icon}
          alt={faction.name}
          width={56}
          height={56}
          className="shrink-0"
        />
        <div>
          <p className={`text-xs font-semibold uppercase tracking-wider ${allegianceText[faction.allegiance]}`}>
            {faction.allegiance}
          </p>
          <h1 className="text-3xl font-bold text-foreground">{faction.name}</h1>
        </div>
      </div>

      {/* Theme & Playstyle */}
      <div className="mb-6 grid gap-4 md:grid-cols-2">
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
      <div className="mb-6 rounded-lg border border-gold/20 bg-gold/5 p-4">
        <h2 className="text-sm font-bold text-gold">{faction.mechanic.name}</h2>
        <p className="mt-1 text-sm text-foreground/80">{faction.mechanic.description}</p>
      </div>

      {/* Ratings & Strengths */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-border bg-surface p-4">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Ratings</h3>
          <div className="space-y-1.5">
            <StarRating label="Offense" value={faction.ratings.offense} />
            <StarRating label="Defense" value={faction.ratings.defense} />
            <StarRating label="Magic" value={faction.ratings.magic} />
            <StarRating label="Speed" value={faction.ratings.speed} />
          </div>
        </div>
        <div className="rounded-lg border border-border bg-surface p-4">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-green-500">Strengths</h3>
          <p className="text-sm text-foreground/80">{faction.strengths}</p>
        </div>
        <div className="rounded-lg border border-border bg-surface p-4">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-red-400">Weaknesses</h3>
          <p className="text-sm text-foreground/80">{faction.weaknesses}</p>
        </div>
      </div>

      {/* Special Rules */}
      {faction.specialRules && faction.specialRules.length > 0 && (
        <div className="mb-8 rounded-lg border border-border bg-surface p-4">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Special Rules</h3>
          <ul className="space-y-1.5">
            {faction.specialRules.map((rule, i) => (
              <li key={i} className="text-sm text-foreground/80">
                <span className="mr-2 text-gold">&#x2022;</span>{rule}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Unit Roster by Tier */}
      {Object.entries(unitsByTier).map(([tier, units]) => (
        <div key={tier} className="mb-8">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-foreground">
              {tierLabels[tier] || tier}
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {units.map((unit) => (
              <UnitCard key={unit.name} unit={unit} allegiance={faction.allegiance} />
            ))}
          </div>
        </div>
      ))}

      {/* Empty state for factions with no units yet */}
      {faction.units.length === 0 && (
        <div className="mb-8 rounded-lg border border-border bg-surface p-8 text-center">
          <p className="text-muted">Unit profiles coming soon.</p>
        </div>
      )}

      {/* Composition Guidelines */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-bold text-foreground">
          Composition Guidelines
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 pr-4 text-left font-semibold text-gold">Battle Size</th>
                <th className="py-2 pr-4 text-left font-semibold text-gold">Baseline</th>
                <th className="py-2 pr-4 text-left font-semibold text-gold">Mounted</th>
                <th className="py-2 pr-4 text-left font-semibold text-gold">Elite</th>
                <th className="py-2 text-left font-semibold text-gold">Hero</th>
              </tr>
            </thead>
            <tbody>
              {faction.composition.map((row) => (
                <tr key={row.size} className="border-b border-border/50">
                  <td className="py-2 pr-4 text-foreground/80">{row.size}</td>
                  <td className="py-2 pr-4 text-foreground/60">{row.baseline}</td>
                  <td className="py-2 pr-4 text-foreground/60">{row.mounted}</td>
                  <td className="py-2 pr-4 text-foreground/60">{row.elite}</td>
                  <td className="py-2 text-foreground/60">{row.hero}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
