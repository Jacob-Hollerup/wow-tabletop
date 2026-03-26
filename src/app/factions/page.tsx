/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { GRAND_FACTIONS, getSubfactions } from "@/lib/factions";
import { getTranslations } from "next-intl/server";

export default async function FactionsPage() {
  const t = await getTranslations("factions");

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-12 animate-fade-in-up text-center">
        <h1 className="font-display mb-3 text-3xl font-bold text-gold sm:text-4xl">
          {t("chooseYourSide")}
        </h1>
        <p className="mx-auto max-w-xl text-muted">
          {t("description")}
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {GRAND_FACTIONS.map((gf, i) => {
          const color = `var(${gf.colorVar})`;
          const subfactions = gf.comingSoon ? [] : getSubfactions(gf.id);

          if (gf.comingSoon) {
            return (
              <div
                key={gf.id}
                className="rounded-xl border border-border bg-surface p-6 opacity-50"
              >
                <div className="flex items-center gap-3">
                  <h2
                    className="font-display text-xl font-bold"
                    style={{ color }}
                  >
                    {gf.name}
                  </h2>
                  <span className="rounded-full border border-border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
                    {t("comingSoon")}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted">{gf.description}</p>
              </div>
            );
          }

          return (
            <div
              key={gf.id}
              className="group rounded-xl border border-border bg-surface animate-fade-in-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="flex flex-col md:flex-row">
                {/* Left: Grand faction info */}
                <div
                  className="border-b border-border p-6 md:w-2/5 md:border-b-0 md:border-r"
                  style={{ borderLeftColor: color, borderLeftWidth: "3px" }}
                >
                  <Link href={`/factions/${gf.id}`}>
                    <h2
                      className="font-display mb-2 text-2xl font-bold transition-opacity hover:opacity-80"
                      style={{ color }}
                    >
                      {gf.name}
                    </h2>
                  </Link>
                  <p className="text-sm leading-relaxed text-muted">
                    {gf.description}
                  </p>
                  <p className="mt-3 text-xs text-muted">
                    {subfactions.length}{" "}
                    {subfactions.length === 1
                      ? t("subfaction")
                      : t("subfactions")}
                  </p>
                </div>

                {/* Right: Subfaction list */}
                <div className="flex-1 p-2">
                  {subfactions.map((sf) => (
                    <Link
                      key={sf.id}
                      href={`/factions/${gf.id}/${sf.id}`}
                      className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-surface-hover"
                    >
                      <img
                        src={sf.crest}
                        alt=""
                        width={32}
                        height={32}
                        className="mt-0.5 shrink-0 rounded object-contain"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold text-foreground">
                          {sf.name}
                        </h3>
                        <p className="mt-0.5 text-xs text-muted line-clamp-1">
                          {sf.theme}
                        </p>
                        <span className="mt-1 inline-block text-[10px] font-medium uppercase tracking-wider text-muted">
                          {sf.mechanic.name}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
