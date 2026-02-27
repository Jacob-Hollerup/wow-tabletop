"use client";

/* eslint-disable @next/next/no-img-element */
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!supabase) {
      setError("Authentication is not configured");
      return;
    }
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
        setLoading(false);
      } else {
        setError("");
        setIsSignUp(false);
        setLoading(false);
        alert("Check your email for a confirmation link!");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
        setLoading(false);
      } else {
        router.push("/rules");
        router.refresh();
      }
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      {/* Background atmosphere */}
      <div className="hero-gradient absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(59,130,246,0.04),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(239,68,68,0.04),transparent_50%)]" />

      {/* Floating crests */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img src="/images/Human_Crest.webp" alt="" className="absolute left-[10%] top-[20%] h-32 w-32 opacity-[0.03] animate-float" />
        <img src="/images/Orc_Crest.webp" alt="" className="absolute right-[10%] top-[15%] h-36 w-36 opacity-[0.03] animate-float animate-delay-300" />
        <img src="/images/scourge.webp" alt="" className="absolute left-[20%] bottom-[15%] h-28 w-28 opacity-[0.03] animate-float animate-delay-500" />
        <img src="/images/night_elves.webp" alt="" className="absolute right-[15%] bottom-[20%] h-28 w-28 opacity-[0.03] animate-float animate-delay-200" />
      </div>

      {/* Login card */}
      <div className="relative z-10 w-full max-w-sm animate-fade-in-up">
        {/* Decorative line */}
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-gold/40" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold/50">
            Tabletop Wargame
          </span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-gold/40" />
        </div>

        <div className="rounded-xl border border-border bg-surface/80 p-8 shadow-2xl shadow-black/50 backdrop-blur-sm">
          <h1 className="font-display text-glow mb-1 text-center text-3xl font-bold text-gold">
            Azeroth at War
          </h1>
          <p className="mb-8 text-center text-sm text-muted">
            {isSignUp
              ? "Create an account to join the fight"
              : "Sign in to access the rulebook"}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:border-gold/60 focus:outline-none focus:ring-1 focus:ring-gold/20 transition-colors"
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                placeholder="Password"
                required
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:border-gold/60 focus:outline-none focus:ring-1 focus:ring-gold/20 transition-colors"
              />
            </div>
            {error && (
              <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-gold px-4 py-2.5 font-semibold text-black transition-all hover:bg-gold-dim hover:shadow-lg hover:shadow-gold/20 disabled:opacity-50"
            >
              {loading
                ? isSignUp
                  ? "Creating account..."
                  : "Signing in..."
                : isSignUp
                  ? "Sign Up"
                  : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError("");
              }}
              className="text-gold transition-colors hover:text-gold-dim hover:underline"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-muted/40">
          3 allegiances. 8 factions. One battlefield.
        </p>
      </div>
    </div>
  );
}
