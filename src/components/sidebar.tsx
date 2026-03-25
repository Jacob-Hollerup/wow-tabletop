"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";

function useSections() {
  const t = useTranslations("sidebar");

  return [
    {
      category: t("coreRules"),
      items: [
        { slug: "core-rules", title: t("coreRules") },
        { slug: "refinement-notes", title: t("refinementNotes") },
      ],
    },
    {
      category: t("factionsCat"),
      items: [{ slug: "faction-overview", title: t("factionOverview") }],
    },
    {
      category: t("armyBooksAlliance"),
      items: [
        { slug: "army-book-humans", title: t("humans") },
        { slug: "army-book-dwarves", title: t("dwarves") },
        { slug: "army-book-night-elves", title: t("nightElves") },
      ],
    },
    {
      category: t("armyBooksHorde"),
      items: [
        { slug: "army-book-orcs", title: t("orcs") },
        { slug: "army-book-forsaken", title: t("forsaken") },
        { slug: "army-book-darkspear", title: t("darkspearTrolls") },
      ],
    },
    {
      category: t("armyBooksScourge"),
      items: [{ slug: "army-book-scourge", title: t("scourge") }],
    },
    {
      category: t("systems"),
      items: [
        { slug: "unit-customization", title: t("unitCustomization") },
        { slug: "fly-keyword", title: t("flyKeyword") },
      ],
    },
  ];
}

function SidebarNav() {
  const pathname = usePathname();
  const sections = useSections();

  return (
    <nav className="space-y-5">
      {sections.map((section) => (
        <div key={section.category}>
          <h3 className="font-display mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
            {section.category}
          </h3>
          <ul className="space-y-0.5">
            {section.items.map((item) => {
              const href =
                item.slug === "core-rules"
                  ? "/rules"
                  : `/rules/${item.slug}`;
              const isActive =
                pathname === href ||
                (item.slug === "core-rules" && pathname === "/rules");
              return (
                <li key={item.slug}>
                  <Link
                    href={href}
                    className={`relative block rounded-lg px-2 py-1 text-sm transition-colors ${
                      isActive
                        ? "bg-gold/10 text-gold"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 h-3 w-0.5 -translate-y-1/2 rounded-full bg-gold" />
                    )}
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

// Mobile/tablet dropdown version
function MobileSidebarDropdown() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const sections = useSections();
  const t = useTranslations("sidebar");

  // Find current page title
  const currentTitle = sections
    .flatMap((s) => s.items)
    .find((item) => {
      const href = item.slug === "core-rules" ? "/rules" : `/rules/${item.slug}`;
      return pathname === href || (item.slug === "core-rules" && pathname === "/rules");
    })?.title ?? t("navigate");

  return (
    <div className="mb-4 md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-xl border border-border bg-surface px-4 py-2.5 text-sm transition-colors hover:border-gold/30"
      >
        <span className="text-foreground">{currentTitle}</span>
        <svg
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`text-muted transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>
      {open && (
        <div className="mt-2 rounded-xl border border-border bg-surface p-3 animate-in">
          {sections.map((section) => (
            <div key={section.category} className="mb-2 last:mb-0">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted">
                {section.category}
              </p>
              {section.items.map((item) => {
                const href =
                  item.slug === "core-rules"
                    ? "/rules"
                    : `/rules/${item.slug}`;
                const isActive =
                  pathname === href ||
                  (item.slug === "core-rules" && pathname === "/rules");
                return (
                  <Link
                    key={item.slug}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-2 py-1.5 text-sm transition-colors ${
                      isActive
                        ? "bg-gold/10 text-gold"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar() {
  return (
    <>
      {/* Mobile/tablet: dropdown nav */}
      <MobileSidebarDropdown />

      {/* Desktop: fixed sidebar */}
      <aside className="hidden w-56 shrink-0 border-r border-border p-4 md:block">
        <div className="sticky top-20">
          <SidebarNav />
        </div>
      </aside>
    </>
  );
}
