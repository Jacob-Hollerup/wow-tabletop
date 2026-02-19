import Link from "next/link";
/* eslint-disable @next/next/no-img-element */
import { ALL_FACTIONS } from "@/lib/factions";
import StarRating from "@/components/star-rating";

const allegianceColors: Record<string, string> = {
  Alliance: "border-alliance/30 hover:border-alliance/60",
  Horde: "border-horde/30 hover:border-horde/60",
  Scourge: "border-scourge/30 hover:border-scourge/60",
};

const allegianceBadge: Record<string, string> = {
  Alliance: "bg-alliance/20 text-alliance",
  Horde: "bg-horde/20 text-horde",
  Scourge: "bg-scourge/20 text-scourge",
};

export default function ArmiesPage() {
  const groups: Record<string, typeof ALL_FACTIONS> = {
    Alliance: ALL_FACTIONS.filter((f) => f.allegiance === "Alliance"),
    Horde: ALL_FACTIONS.filter((f) => f.allegiance === "Horde"),
    Scourge: ALL_FACTIONS.filter((f) => f.allegiance === "Scourge"),
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold text-gold">Armies</h1>
      <p className="mb-8 text-muted">
        3 allegiances, 8 factions. Choose your side.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Object.entries(groups).map(([allegiance, factions]) => (
        <div key={allegiance}>
          <h2 className="mb-4 text-xl font-semibold text-foreground">
            {allegiance}
          </h2>
          <div className="flex flex-col gap-4">
            {factions.map((faction) => (
              <Link
                key={faction.id}
                href={`/armies/${faction.id}`}
                className={`block rounded-lg border bg-surface p-5 transition-colors ${
                  allegianceColors[allegiance]
                }`}
              >
                {/* Icon + Title */}
                <div className="mb-3 flex items-center gap-3">
                  <img
                    src={faction.icon}
                    alt={faction.name}
                    width={40}
                    height={40}
                    className="shrink-0 opacity-80"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-foreground">
                        {faction.name}
                      </h3>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                          allegianceBadge[allegiance]
                        }`}
                      >
                        {allegiance}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mb-3 text-sm leading-relaxed text-muted line-clamp-2">
                  {faction.theme}
                </p>

                <div className="mb-3 rounded border border-border bg-background p-2">
                  <p className="text-[10px] uppercase tracking-wider text-gold/70">
                    {faction.mechanic.name}
                  </p>
                  <p className="mt-0.5 text-xs text-foreground/70 line-clamp-2">
                    {faction.mechanic.description}
                  </p>
                </div>

                <div className="space-y-1">
                  <StarRating label="Offense" value={faction.ratings.offense} />
                  <StarRating label="Defense" value={faction.ratings.defense} />
                  <StarRating label="Magic" value={faction.ratings.magic} />
                  <StarRating label="Speed" value={faction.ratings.speed} />
                </div>

                <p className="mt-3 text-xs text-muted">
                  {faction.units.length} units
                </p>
              </Link>
            ))}
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}
