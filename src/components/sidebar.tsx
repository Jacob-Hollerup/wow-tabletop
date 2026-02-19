"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarSection {
  category: string;
  items: { slug: string; title: string }[];
}

const sections: SidebarSection[] = [
  {
    category: "Core Rules",
    items: [
      { slug: "core-rules", title: "Core Rules" },
      { slug: "refinement-notes", title: "Refinement Notes" },
    ],
  },
  {
    category: "Factions",
    items: [{ slug: "faction-overview", title: "Faction Overview" }],
  },
  {
    category: "Army Books — Alliance",
    items: [
      { slug: "army-book-humans", title: "Humans" },
      { slug: "army-book-dwarves", title: "Dwarves" },
      { slug: "army-book-night-elves", title: "Night Elves" },
    ],
  },
  {
    category: "Army Books — Horde",
    items: [
      { slug: "army-book-orcs", title: "Orcs" },

      { slug: "army-book-forsaken", title: "Forsaken" },
      { slug: "army-book-darkspear", title: "Darkspear Trolls" },
    ],
  },
  {
    category: "Army Books — Scourge",
    items: [
      { slug: "army-book-scourge", title: "Scourge" },
    ],
  },
  {
    category: "Systems",
    items: [
      { slug: "unit-customization", title: "Unit Customization" },
      { slug: "fly-keyword", title: "Fly Keyword" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 border-r border-border p-4 hidden lg:block">
      <nav className="sticky top-20 space-y-5">
        {sections.map((section) => (
          <div key={section.category}>
            <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
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
                      className={`block rounded px-2 py-1 text-sm transition-colors ${
                        isActive
                          ? "bg-gold/10 text-gold"
                          : "text-muted hover:text-foreground"
                      }`}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
