import Link from "next/link";
import { GRAND_FACTIONS } from "@/lib/factions";
import { getTranslations } from "next-intl/server";

export default async function FactionsPage() {
  const t = await getTranslations("factions");

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-12 animate-fade-in-up text-center">
        <h1 className="font-display mb-3 text-3xl font-bold text-gold sm:text-4xl">
          {t("chooseYourSide")}
        </h1>
        <p className="mx-auto max-w-xl text-muted">
          {t("description")}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {GRAND_FACTIONS.map((gf, i) => {
          const color = `var(${gf.colorVar})`;
          const accent = `var(${gf.accentVar})`;

          if (gf.comingSoon) {
            return (
              <div
                key={gf.id}
                className="coming-soon-card relative overflow-hidden rounded-xl border border-border p-6"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, color-mix(in srgb, ${color} 10%, #0f0f0f), #0f0f0f)`,
                  }}
                />
                <div className="relative">
                  <h2
                    className="font-display mb-2 text-xl font-bold"
                    style={{ color }}
                  >
                    {gf.name}
                  </h2>
                  <p className="mb-4 text-sm text-muted">{gf.description}</p>
                  <span
                    className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`,
                      color,
                    }}
                  >
                    {t("comingSoon")}
                  </span>
                </div>
              </div>
            );
          }

          return (
            <Link
              key={gf.id}
              href={`/factions/${gf.id}`}
              className="subfaction-card group relative overflow-hidden rounded-xl border p-6"
              style={{
                "--sf-color": color,
                borderColor: `color-mix(in srgb, ${color} 25%, transparent)`,
                animationDelay: `${i * 0.1}s`,
              } as React.CSSProperties}
            >
              {/* Background gradient */}
              <div
                className="absolute inset-0 transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg,
                    color-mix(in srgb, ${color} 20%, #0f0f0f) 0%,
                    #141414 55%,
                    color-mix(in srgb, ${accent} 8%, #0f0f0f) 100%
                  )`,
                }}
              />

              {/* Content */}
              <div className="relative">
                <h2
                  className="font-display mb-2 text-2xl font-bold"
                  style={{ color }}
                >
                  {gf.name}
                </h2>
                <p className="mb-4 text-sm leading-relaxed text-foreground/70">
                  {gf.description}
                </p>

                {/* Subfaction count */}
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: accent }}
                  >
                    {gf.subfactionIds.length}{" "}
                    {gf.subfactionIds.length === 1
                      ? t("subfaction")
                      : t("subfactions")}
                  </span>
                  <span className="text-xs text-muted opacity-0 transition-opacity group-hover:opacity-100">
                    {t("explore")}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
