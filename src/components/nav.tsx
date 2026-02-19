"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

const links = [
  { href: "/rules", label: "Rules" },
  { href: "/armies", label: "Armies" },
  { href: "/reference", label: "Quick Ref" },
  { href: "/ask", label: "Ask AI" },
];

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
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
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/rules" className="text-lg font-bold text-gold">
          Azeroth at War
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded px-3 py-1.5 text-sm transition-colors ${
                pathname.startsWith(link.href)
                  ? "bg-gold/10 text-gold"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={handleSignOut}
            className="ml-4 rounded px-3 py-1.5 text-sm text-muted hover:text-foreground"
          >
            Sign Out
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-muted"
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
        <div className="border-t border-border px-4 pb-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block py-2 text-sm ${
                pathname.startsWith(link.href)
                  ? "text-gold"
                  : "text-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={handleSignOut}
            className="block py-2 text-sm text-muted"
          >
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
}
