"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

const links = [
  { href: "/rules", label: "Rules" },
  { href: "/factions", label: "Factions" },
  { href: "/builder", label: "Builder" },
  { href: "/scenarios", label: "Maps" },
  { href: "/reference", label: "Quick Ref" },
];

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!user) return null;

  async function handleSignOut() {
    await supabase?.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="text-gold transition-transform group-hover:scale-110"
          >
            <path
              d="M14.5 3L12 7l-2.5-4M12 7v10M8 13l4 4 4-4M7 21h10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-display text-lg font-bold text-gold">
            Azeroth at War
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-0.5 md:flex">
          {links.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  isActive
                    ? "text-gold"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-gold" />
                )}
              </Link>
            );
          })}
          <div className="ml-3 h-4 w-px bg-border" />
          <button
            onClick={handleSignOut}
            className="ml-3 rounded-lg px-3 py-1.5 text-sm text-muted transition-colors hover:text-foreground"
          >
            Sign Out
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="text-muted md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border px-4 pb-4 md:hidden animate-in">
          {links.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 py-2.5 text-sm ${
                  isActive ? "text-gold" : "text-muted"
                }`}
              >
                {isActive && <span className="h-1.5 w-1.5 rounded-full bg-gold" />}
                {link.label}
              </Link>
            );
          })}
          <button
            onClick={handleSignOut}
            className="block py-2.5 text-sm text-muted"
          >
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
}
