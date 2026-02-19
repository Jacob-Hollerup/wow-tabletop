# Azeroth at War — Rules Site Plan

## Goal

A Next.js site that displays the Azeroth at War tabletop rulebook, army books, and unit data behind a login. Includes an AI rules assistant powered by Vercel AI SDK.

---

## Content Overview

The game has **9 markdown files** covering:

| Category | Files | What's Inside |
|---|---|---|
| **Core Rules** | `azeroth-at-war-core-rules.md`, `azeroth-at-war-v1.1.md` | Full rulebook — combat, mana, morale, movement, army building, scenarios, quick reference |
| **Design Notes** | `azeroth-at-war-refinement-notes.md` | 32 design decisions, balance notes, rule change rationale |
| **Factions** | `faction-overview.md` | 8 factions across 3 allegiances (Alliance, Horde, Scourge) with playstyle ratings |
| **Army Books** | `army-book-alliance.md`, `army-book-horde.md`, `army-book-scourge.md` | Unit rosters, heroes, tiers, keywords, allowed equipment, composition guidelines |
| **Systems** | `unit-customization-system.md` | Equipment lists (per faction), Hero Builder (Race → Class → Spec → Level), all class ability tables |
| **Addenda** | `fly-keyword-draft.md` | Fly keyword rules draft |

### Key Data Structures in the Content

**Units** have: Name, Subfaction, Tier (Baseline/Mounted/Elite/Hero), Archetype, Keywords, Allowed Equipment, Description.

**Equipment** has: Name, Tag (SW/HW/LW/SH/RW/HA/MA/LA), Range (if ranged), Notes with stat modifiers.

**Heroes** are built with: Race (base stats + racial ability) → Class (equipment + abilities) → Spec (1-2 bonus abilities) → Level (1-3, determines total abilities).

**Factions** have: Theme, Playstyle, Faction Mechanic, Unit Archetypes table, Strengths/Weaknesses, Star Ratings (Offense/Defense/Magic/Speed).

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Auth:** NextAuth.js v5 (credentials provider — username/password)
- **AI:** Vercel AI SDK (`ai` + `@ai-sdk/anthropic`) — Claude as rules assistant
- **Markdown rendering:** `react-markdown` + `remark-gfm` (tables, strikethrough)
- **Styling:** Tailwind CSS + `@tailwindcss/typography`
- **Deployment:** Vercel (or self-host)

---

## Site Structure

```
/                           → Redirect to /rules or /login
/login                      → Login page
/rules                      → Rules homepage (core rules v1.1)
/rules/[slug]               → Individual rule document
/armies                     → Army overview — all 3 allegiances, 8 factions at a glance
/armies/[faction]           → Faction page — identity, units, equipment, composition
/armies/[faction]/[unit]    → Individual unit card page (deep link)
/hero-builder               → Hero builder reference — Race/Class/Spec/Level tables
/reference                  → Quick reference — combat, keywords, wound chart, modifiers
/ask                        → AI Rules Assistant chat
```

---

## Pages — Detail

### `/login`
- Simple form: username + password
- Single shared credentials from env vars
- On success → redirect to `/rules`

### `/rules` — Core Rules
- Renders the **v1.1 core rulebook** as the main rules page
- Sidebar navigation with section anchors (Table of Contents links)
- Additional rules docs accessible from sidebar:
  - Core Rules v1.1 (default)
  - Refinement Notes (for design discussion)
  - Fly Keyword Draft

### `/armies` — Army Overview
- Three columns/sections: **Alliance**, **Horde**, **Scourge**
- Each faction shows: name, theme one-liner, star ratings (Offense/Defense/Magic/Speed)
- Faction mechanic preview
- Click through to full faction page

### `/armies/[faction]` — Faction Page
This is the key page for displaying armies + units nicely:

- **Faction Header** — Name, allegiance badge, theme, playstyle description
- **Faction Mechanic** — highlighted box with the special rule
- **Strengths / Weaknesses** — visual callout
- **Unit Roster** — grouped by tier with unit cards:

#### Unit Card Component
Each unit displayed as a styled card:
```
┌─────────────────────────────────┐
│ [Tier Badge]     [Subfaction]   │
│ UNIT NAME                       │
│ Archetype: Melee Assassin       │
│                                 │
│ Keywords: Disengage, Decisive   │
│           Blow [2]              │
│                                 │
│ Description text...             │
│                                 │
│ Allowed Equipment:              │
│ [Axe] [Dagger] [Leather]       │
└─────────────────────────────────┘
```

- Cards are grouped under **Heroes**, **Baseline**, **Mounted**, **Elite** headers
- Each card is clickable → expands or links to full detail
- **Composition Guidelines** table at bottom
- **Roster Summary** table

### `/armies/[faction]/[unit]` — Unit Detail (optional, could be modal/expand)
- Full unit info with equipment details
- Equipment stat modifiers explained inline
- Related keywords with rules explanations (pulled from core rules)
- Link back to faction page

### `/hero-builder` — Hero Builder Reference
- **Race tables** — Alliance races, Horde races, Scourge (fixed)
- **Class tables** — each class with Global/Spec abilities at each level
- **Race → Class availability matrix**
- **Equipment lists** per faction (weapons + armor with tags/ranges)
- Interactive: filter by allegiance, then see available race/class combos

### `/reference` — Quick Reference
- Pulled from Section 12 of the core rules
- Styled as a compact, scannable reference card
- Sections: Round Sequence, Activation Options, Combat Sequence, Wound Chart, Initiative, Keywords, Mana, Blast, Terrain, Morale
- Designed to be kept open on a phone during play

### `/ask` — AI Rules Assistant
- Chat interface powered by Vercel AI SDK
- Users type rules questions, get answers grounded in the rulebook
- See "AI Rules Assistant" section below for details

---

## AI Rules Assistant (`/ask`)

### Purpose
Players can ask natural language questions about the rules and get accurate answers. Examples:
- "Can a model charge after Combat Withdrawal?"
- "How does Armor Piercing work against a model with a Shield?"
- "I have an Orc Grunt with Berserker at 2 wounds — what bonuses does it get?"
- "Help me build a 750pt Horde army"
- "What happens when a summoner dies?"

### Implementation

**Stack:** Vercel AI SDK (`ai` package) + `@ai-sdk/anthropic` (Claude)

**Architecture:**
```
Client (React chat UI)
  → POST /api/chat
    → AI SDK streamText()
      → System prompt with ALL rules content embedded
      → Claude responds with grounded answers
```

**System Prompt Strategy:**
- Embed all 9 markdown files as context in the system prompt
- Rules content is ~30k tokens total — fits well within Claude's context
- System prompt instructs the model to:
  - Only answer based on the provided rules
  - Cite section numbers when possible
  - Clarify when something is ambiguous or undefined in the rules
  - Help with army building math (points, composition limits)
  - Explain keyword interactions

**API Route:** `src/app/api/chat/route.ts`
```typescript
import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';

// Load all markdown content at build time
const rulesContext = loadAllRulesContent();

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: anthropic('claude-sonnet-4-5-20241022'),
    system: `You are a rules assistant for "Azeroth at War", a tabletop miniatures game.
Answer questions accurately based ONLY on the following rules documents.
Cite section numbers where applicable. If something isn't covered by the rules, say so.

${rulesContext}`,
    messages,
  });

  return result.toDataStreamResponse();
}
```

**Chat UI:** Simple chat component using `useChat` hook from `ai/react`.

**Cost note:** Uses Claude Sonnet for cost efficiency on a per-query basis. Each message sends the full rules context (~30k tokens input). For a small group of players this is very affordable.

---

## Auth Approach

Simple credentials-based login via NextAuth.js v5:

```env
# .env.local
AUTH_SECRET=<random-secret>
ADMIN_USER=<username>
ADMIN_PASS=<password>
ANTHROPIC_API_KEY=<api-key>
```

- No database needed
- Single user / shared credentials (all your playgroup uses the same login)
- Session stored in JWT cookie
- Middleware protects all routes except `/login`

---

## Project Structure

```
wow-tabletop-site/
├── content/                        # All markdown files
│   ├── azeroth-at-war-core-rules.md
│   ├── azeroth-at-war-v1.1.md
│   ├── azeroth-at-war-refinement-notes.md
│   ├── faction-overview.md
│   ├── army-book-alliance.md
│   ├── army-book-horde.md
│   ├── army-book-scourge.md
│   ├── unit-customization-system.md
│   └── fly-keyword-draft.md
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout, nav, auth provider
│   │   ├── page.tsx                # Redirect to /rules or /login
│   │   ├── login/
│   │   │   └── page.tsx            # Login form
│   │   ├── rules/
│   │   │   ├── layout.tsx          # Rules sidebar layout
│   │   │   ├── page.tsx            # Core rules v1.1 (default)
│   │   │   └── [slug]/
│   │   │       └── page.tsx        # Other rule documents
│   │   ├── armies/
│   │   │   ├── page.tsx            # Faction overview grid
│   │   │   └── [faction]/
│   │   │       └── page.tsx        # Faction detail + unit cards
│   │   ├── hero-builder/
│   │   │   └── page.tsx            # Hero builder reference
│   │   ├── reference/
│   │   │   └── page.tsx            # Quick reference card
│   │   ├── ask/
│   │   │   └── page.tsx            # AI chat UI
│   │   └── api/
│   │       └── chat/
│   │           └── route.ts        # AI SDK chat endpoint
│   ├── components/
│   │   ├── nav.tsx                 # Top nav bar
│   │   ├── sidebar.tsx             # Rules sidebar
│   │   ├── unit-card.tsx           # Unit card component
│   │   ├── faction-header.tsx      # Faction identity banner
│   │   ├── keyword-badge.tsx       # Keyword pill with tooltip
│   │   ├── stat-bar.tsx            # Star rating bars
│   │   ├── equipment-tag.tsx       # Equipment tag pill
│   │   ├── markdown-renderer.tsx   # Styled markdown component
│   │   └── chat.tsx                # Chat UI component
│   ├── lib/
│   │   ├── auth.ts                 # NextAuth config
│   │   ├── content.ts              # Load & parse markdown files
│   │   └── factions.ts             # Faction/unit data helpers
│   └── middleware.ts               # Protect all routes except /login
├── .env.local
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## Implementation Steps

### Phase 1 — Foundation
1. Scaffold Next.js app with TypeScript + Tailwind
2. Install deps: `next-auth`, `react-markdown`, `remark-gfm`, `@tailwindcss/typography`, `ai`, `@ai-sdk/anthropic`
3. Copy all 9 markdown files into `content/`
4. Auth setup — NextAuth v5 credentials provider + middleware
5. Login page

### Phase 2 — Rules Pages
6. Markdown loader utility (read files, extract headings for nav)
7. Rules layout with sidebar (section anchors from ToC)
8. Rules page — renders v1.1 as default
9. Rules/[slug] — other rule documents
10. Quick Reference page — styled compact view

### Phase 3 — Army & Unit Display
11. Faction data layer — parse army books into structured data (or keep as markdown with nice rendering)
12. Armies overview page — faction grid with star ratings
13. Faction detail page — unit cards grouped by tier
14. Unit card component — tier badge, keywords, equipment, description
15. Hero builder reference page — race/class/spec tables
16. Equipment reference — faction equipment tables

### Phase 4 — AI Rules Assistant
17. API route with Vercel AI SDK + Claude
18. Chat UI component with `useChat`
19. System prompt with all rules embedded
20. Chat page at `/ask`

### Phase 5 — Polish
21. Mobile responsive pass (players read at table on phones)
22. Nav bar with links to all sections
23. Keyword tooltips (hover/tap on a keyword → shows the rule)
24. Deploy to Vercel

---

## What Else You Should Consider

### For v1 (build now)

- **Keyword Glossary with Tooltips** — Keywords like "Berserker", "Momentum [X]", "Fly" appear everywhere. When displayed in unit cards, they should be interactive — tap/hover shows the full rule. This avoids users jumping back to the core rules constantly.

- **Wound Chart Calculator** — A tiny widget on the reference page: input ATK STR vs TGH, shows the wound roll needed. Players reference this every single combat.

- **Search** — Even a basic Ctrl+K search across all rules content. Players mid-game need to find "Opportunity Attack" or "Scatter" fast.

### For v2 (future)

- **Army Builder Tool** — Select faction, pick units, choose equipment, total up points, validate composition limits. This is the killer feature for tabletop games. Needs structured unit data (points costs TBD in your docs).

- **Dice Roller / Combat Simulator** — Roll ATK dice, compute hits, wounds, saves. Useful for online play or quick resolution.

- **Print-Friendly Unit Cards** — Generate clean printable cards for each unit with all stats, keywords, equipment, and abilities. Players bring these to the table.

- **Scenario / Map Viewer** — When you create set maps, display them visually with terrain placement.

- **Version Diffing** — You have v1.0 and v1.1. A diff view showing what changed between versions would help playtesters track rule evolution.

- **Multiple User Accounts** — If your playgroup grows, individual logins so you can track who's seen what, or restrict design notes to certain users.

---

## Design Notes

- **Dark theme** — WoW aesthetic, dark background, gold/amber accents. Faction colors for army pages (Alliance blue/gold, Horde red/black, Scourge ice-blue/grey).
- **Mobile-first** — Players will read this on phones at the game table. Unit cards, reference, and AI chat must be usable one-handed.
- **Fast navigation** — Sticky top nav, collapsible sidebar, anchor links within long documents.
- **No editing** — Read-only display. You edit the markdown files locally and redeploy.
- **Content as markdown** — The army/unit pages can be rendered directly from markdown with good styling rather than requiring structured data extraction. Keep it simple for v1.
