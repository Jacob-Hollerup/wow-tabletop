/* eslint-disable @next/next/no-img-element */
import { getTranslations } from "next-intl/server";

export default async function ScenariosPage() {
  const t = await getTranslations("scenarios");

  const scenarios = [
    {
      name: t("annihilation"),
      description: t("annihilationDesc"),
      size: t("anyBattleSize"),
      objective: t("destroyMostPoints"),
      maps: [
        { file: "annihilation-1.svg", label: t("variant1"), note: t("opposingCorners") },
        { file: "annihilation-2.svg", label: t("variant2"), note: t("longEdges") },
        { file: "annihilation-3.svg", label: t("variant3"), note: t("diagonalSplit") },
      ],
    },
    {
      name: t("assassination"),
      description: t("assassinationDesc"),
      size: t("requiresHeroes"),
      objective: t("eliminateHero"),
      maps: [
        { file: "assassination-1.svg", label: t("variant1"), note: t("centralCorridor") },
        { file: "assassination-2.svg", label: t("variant2"), note: t("flankingZones") },
        { file: "assassination-3.svg", label: t("variant3"), note: t("wedgeDeployment") },
      ],
    },
    {
      name: t("holdTheLine"),
      description: t("holdTheLineDesc"),
      size: t("bestAt1000"),
      objective: t("controlObjectives"),
      maps: [
        { file: "hold-the-line-1.svg", label: t("variant1"), note: t("threeObjectives") },
        { file: "hold-the-line-2.svg", label: t("variant2"), note: t("fiveObjectives") },
        { file: "hold-the-line-3.svg", label: t("variant3"), note: t("offsetObjectives") },
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8 animate-fade-in-up">
        <h1 className="font-display mb-2 text-3xl font-bold text-gold sm:text-4xl">
          {t("title")}
        </h1>
        <p className="text-muted">
          {t("description")}
        </p>
      </div>

      <div className="space-y-12">
        {scenarios.map((scenario, si) => (
          <section
            key={scenario.name}
            className="animate-fade-in-up"
            style={{ animationDelay: `${si * 0.1}s` }}
          >
            <div className="mb-4">
              <h2 className="font-display text-2xl font-bold text-foreground">
                {scenario.name}
              </h2>
              <p className="mt-1 text-sm text-muted">{scenario.description}</p>
              <div className="mt-2 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 text-xs text-foreground/60">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold">
                    <path d="M7 1v12M1 7h12" />
                  </svg>
                  {scenario.size}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-foreground/60">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold">
                    <circle cx="7" cy="7" r="5" />
                    <path d="M7 4v3l2 2" />
                  </svg>
                  {scenario.objective}
                </span>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {scenario.maps.map((map) => (
                <div
                  key={map.file}
                  className="card-hover group overflow-hidden rounded-xl border border-border bg-surface"
                >
                  <div className="relative aspect-square overflow-hidden bg-background p-3">
                    <img
                      src={`/maps/scenarios/${map.file}`}
                      alt={`${scenario.name} ${map.label}`}
                      className="h-full w-full object-contain opacity-70 transition-all group-hover:opacity-100 group-hover:scale-105"
                    />
                  </div>
                  <div className="border-t border-border px-4 py-3">
                    <p className="text-sm font-semibold text-foreground">
                      {map.label}
                    </p>
                    <p className="text-xs text-muted">{map.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
