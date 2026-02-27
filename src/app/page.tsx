/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ALL_FACTIONS } from "@/lib/factions";

const allegiances = [
  {
    name: "Alliance",
    color: "text-alliance",
    border: "border-alliance/40",
    bg: "bg-alliance/5",
    glow: "shadow-alliance/20",
    description: "Honor. Discipline. Unity.",
  },
  {
    name: "Horde",
    color: "text-horde",
    border: "border-horde/40",
    bg: "bg-horde/5",
    glow: "shadow-horde/20",
    description: "Strength. Blood. Glory.",
  },
  {
    name: "Scourge",
    color: "text-scourge",
    border: "border-scourge/40",
    bg: "bg-scourge/5",
    glow: "shadow-scourge/20",
    description: "Death. Dominion. Eternity.",
  },
];

const features = [
  {
    title: "8 Factions",
    description: "From Stormwind's paladins to the Lich King's undead legions. Each with unique mechanics, units, and playstyles.",
    href: "/armies",
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "AI Rules Assistant",
    description: "Ask questions about any rule, keyword, or interaction. Get instant answers powered by AI.",
    href: null,
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    title: "Battle Scenarios",
    description: "9 deployment maps across 3 scenario types. Annihilation, Assassination, and Hold the Line.",
    href: "/scenarios",
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
];

export default async function Home() {
  const supabase = await createClient();
  let isLoggedIn = false;

  if (supabase) {
    const { data: { user } } = await supabase.auth.getUser();
    isLoggedIn = !!user;
  }

  return (
    <div className="min-h-screen">
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4">
        {/* Background layers */}
        <div className="hero-gradient absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.04),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(239,68,68,0.04),transparent_50%)]" />

        {/* Floating faction crests */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img src="/images/Human_Crest.webp" alt="" className="absolute left-[8%] top-[15%] h-20 w-20 opacity-[0.04] animate-float" />
          <img src="/images/Orc_Crest.webp" alt="" className="absolute right-[10%] top-[20%] h-24 w-24 opacity-[0.04] animate-float animate-delay-300" />
          <img src="/images/scourge.webp" alt="" className="absolute left-[15%] bottom-[20%] h-16 w-16 opacity-[0.04] animate-float animate-delay-500" />
          <img src="/images/night_elves.webp" alt="" className="absolute right-[12%] bottom-[25%] h-18 w-18 opacity-[0.04] animate-float animate-delay-200" />
          <img src="/images/Dwarf_Crest.webp" alt="" className="absolute left-[40%] top-[8%] h-14 w-14 opacity-[0.03] animate-float animate-delay-400" />
          <img src="/images/Forsaken_Crest.webp" alt="" className="absolute right-[35%] bottom-[12%] h-14 w-14 opacity-[0.03] animate-float animate-delay-100" />
        </div>

        {/* Decorative line */}
        <div className="mb-8 flex items-center gap-3 animate-fade-in">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/40" />
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold/60">
            Tabletop Miniatures Wargame
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/40" />
        </div>

        {/* Title */}
        <h1 className="font-display text-glow mb-4 text-center text-6xl font-bold tracking-tight text-foreground sm:text-7xl md:text-8xl lg:text-9xl animate-fade-in-up">
          Azeroth<br />
          <span className="text-gold">at War</span>
        </h1>

        {/* Subtitle */}
        <p className="mb-4 max-w-xl text-center text-lg text-muted sm:text-xl animate-fade-in-up animate-delay-100">
          3 allegiances. 8 factions. One battlefield.
        </p>
        <p className="mb-10 max-w-md text-center text-sm text-muted/70 animate-fade-in-up animate-delay-200">
          A tactical miniatures game set in the World of Warcraft universe.
          Build your army, master your faction, and dominate the table.
        </p>

        {/* CTA */}
        <div className="flex items-center gap-4 animate-fade-in-up animate-delay-300">
          {isLoggedIn ? (
            <>
              <Link
                href="/rules"
                className="rounded-lg bg-gold px-8 py-3 text-sm font-bold text-black transition-all hover:bg-gold-dim hover:shadow-lg hover:shadow-gold/20"
              >
                Enter Rulebook
              </Link>
              <Link
                href="/armies"
                className="rounded-lg border border-border px-8 py-3 text-sm font-semibold text-foreground transition-all hover:border-gold/40 hover:text-gold"
              >
                Browse Armies
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg bg-gold px-8 py-3 text-sm font-bold text-black transition-all hover:bg-gold-dim hover:shadow-lg hover:shadow-gold/20"
              >
                Get Started
              </Link>
              <Link
                href="/login"
                className="rounded-lg border border-border px-8 py-3 text-sm font-semibold text-foreground transition-all hover:border-gold/40 hover:text-gold"
              >
                Sign In
              </Link>
            </>
          )}
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 flex flex-col items-center gap-2 animate-fade-in animate-delay-600">
          <span className="text-xs text-muted/50">Scroll to explore</span>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted/30 animate-bounce">
            <path d="M5 8l5 5 5-5" />
          </svg>
        </div>
      </section>

      {/* ─── ALLEGIANCE BANNERS ───────────────────────────────── */}
      <section className="relative border-t border-border/50 bg-surface/30 px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display mb-2 text-center text-3xl font-bold text-foreground sm:text-4xl animate-fade-in-up">
            Choose Your Allegiance
          </h2>
          <p className="mb-12 text-center text-sm text-muted animate-fade-in-up animate-delay-100">
            Every faction fights differently. Every choice matters.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {allegiances.map((a, i) => {
              const factions = ALL_FACTIONS.filter(
                (f) => f.allegiance === a.name
              );
              return (
                <div
                  key={a.name}
                  className={`card-hover group rounded-xl border ${a.border} ${a.bg} p-6 animate-fade-in-up`}
                  style={{ animationDelay: `${(i + 1) * 0.1}s` }}
                >
                  <h3
                    className={`font-display mb-1 text-2xl font-bold ${a.color}`}
                  >
                    {a.name}
                  </h3>
                  <p className="mb-4 text-xs font-medium tracking-wide text-muted">
                    {a.description}
                  </p>

                  <div className="space-y-2">
                    {factions.map((f) => (
                      <Link
                        key={f.id}
                        href={isLoggedIn ? `/armies/${f.id}` : "/login"}
                        className="flex items-center gap-3 rounded-lg border border-transparent px-3 py-2 transition-all hover:border-border hover:bg-background/50"
                      >
                        <img
                          src={f.icon}
                          alt={f.name}
                          width={28}
                          height={28}
                          className="shrink-0 opacity-70 transition-opacity group-hover:opacity-100"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-foreground">
                            {f.name}
                          </p>
                          <p className="truncate text-xs text-muted">
                            {f.mechanic.name}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─────────────────────────────────────────── */}
      <section className="border-t border-border/50 px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display mb-2 text-center text-3xl font-bold text-foreground sm:text-4xl">
            Everything You Need to Play
          </h2>
          <p className="mb-12 text-center text-sm text-muted">
            Rules, army lists, deployment maps, and an AI that knows it all.
          </p>

          <div className="grid gap-6 sm:grid-cols-2">
            {features.map((f, i) => {
              const content = (
                <>
                  <div className="mb-3 inline-flex rounded-xl border border-gold/20 bg-gold/5 p-2.5 text-gold">
                    {f.icon}
                  </div>
                  <h3 className="font-display mb-1 text-lg font-bold text-foreground">
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">{f.description}</p>
                </>
              );

              const cls = `card-hover rounded-xl border border-border bg-surface/50 p-6 animate-fade-in-up block`;

              return f.href ? (
                <Link
                  key={f.title}
                  href={isLoggedIn ? f.href : "/login"}
                  className={cls}
                  style={{ animationDelay: `${(i + 1) * 0.1}s` }}
                >
                  {content}
                </Link>
              ) : (
                <div
                  key={f.title}
                  className={cls}
                  style={{ animationDelay: `${(i + 1) * 0.1}s` }}
                >
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── BATTLE MAPS PREVIEW ──────────────────────────────── */}
      <section className="border-t border-border/50 bg-surface/30 px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display mb-2 text-center text-3xl font-bold text-foreground sm:text-4xl">
            Plan Your Assault
          </h2>
          <p className="mb-12 text-center text-sm text-muted">
            9 deployment maps across 3 scenario types.
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            {["Annihilation", "Assassination", "Hold the Line"].map((scenario, i) => {
              const slug = scenario.toLowerCase().replace(/ /g, "-");
              const file = slug === "hold-the-line" ? `hold-the-line-1.svg` : `${slug}-1.svg`;
              return (
                <div
                  key={scenario}
                  className="card-hover group overflow-hidden rounded-xl border border-border bg-background"
                >
                  <div className="relative aspect-square overflow-hidden bg-surface/50 p-4">
                    <img
                      src={`/maps/scenarios/${file}`}
                      alt={scenario}
                      className="h-full w-full object-contain opacity-60 transition-opacity group-hover:opacity-90"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-sm font-bold text-foreground">
                      {scenario}
                    </h3>
                    <p className="text-xs text-muted">3 deployment variants</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ───────────────────────────────────────── */}
      <section className="border-t border-border/50 px-4 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-glow mb-4 text-4xl font-bold text-foreground sm:text-5xl">
            Ready for <span className="text-gold">War</span>?
          </h2>
          <p className="mb-8 text-muted">
            Dive into the rules, pick your faction, and build your army.
          </p>
          <Link
            href={isLoggedIn ? "/rules" : "/login"}
            className="inline-block rounded-lg bg-gold px-10 py-3.5 text-sm font-bold text-black transition-all hover:bg-gold-dim hover:shadow-lg hover:shadow-gold/20"
          >
            {isLoggedIn ? "Open Rulebook" : "Get Started Free"}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 px-4 py-8 text-center text-xs text-muted/50">
        Azeroth at War is a fan-made tabletop game. World of Warcraft is a trademark of Blizzard Entertainment.
      </footer>
    </div>
  );
}
