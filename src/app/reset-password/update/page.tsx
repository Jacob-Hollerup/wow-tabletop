"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const supabase = createClient();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const t = useTranslations("auth");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!supabase) {
      setError(t("authNotConfigured"));
      return;
    }
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirm = formData.get("confirm") as string;

    if (password !== confirm) {
      setError(t("passwordsDoNotMatch"));
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError(t("passwordTooShort"));
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/rules");
      router.refresh();
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div className="hero-gradient absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(59,130,246,0.04),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(239,68,68,0.04),transparent_50%)]" />

      <div className="relative z-10 w-full max-w-sm animate-fade-in-up">
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-gold/40" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold/50">
            {t("newPassword")}
          </span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-gold/40" />
        </div>

        <div className="rounded-xl border border-border bg-surface/80 p-8 shadow-2xl shadow-black/50 backdrop-blur-sm">
          <h1 className="font-display text-glow mb-1 text-center text-3xl font-bold text-gold">
            {t("setNewPassword")}
          </h1>
          <p className="mb-8 text-center text-sm text-muted">
            {t("enterNewPassword")}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <input
                name="password"
                type="password"
                placeholder={t("newPasswordPlaceholder")}
                required
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:border-gold/60 focus:outline-none focus:ring-1 focus:ring-gold/20 transition-colors"
              />
            </div>
            <div>
              <input
                name="confirm"
                type="password"
                placeholder={t("confirmPassword")}
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
              {loading ? t("updating") : t("updatePassword")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
