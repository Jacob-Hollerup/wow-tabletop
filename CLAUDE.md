# Azeroth at War — Agent Guide

This is a WoW-themed tabletop miniatures wargame with 8 sub-factions across 3 allegiances. All game design docs live in `content/`.

## How to find what you need

**Always start here.** Then read only the file(s) relevant to your task.

### Quick reference: which file to read

| If the task involves... | Read this file |
|---|---|
| **Overall faction identity, themes, playstyles** | `content/faction-overview.md` |
| **Core game rules** (stats, combat, phases, keywords) | `content/azeroth-at-war-v1.1.md` |
| **Hero building** (race/class/spec, equipment, abilities) | `content/unit-customization-system.md` |
| **Fly keyword** | `content/fly-keyword-draft.md` |
| **Design notes / open questions** | `content/azeroth-at-war-refinement-notes.md` |
| **Website / app plan** | `.claude/docs/SITE-PLAN.md` |

### Army Books — one per sub-faction

Each army book contains: faction mechanic, unit profiles (stats, keywords, equipment), roster summary, composition guidelines.

| Faction | Allegiance | File |
|---|---|---|
| Humans (Stormwind) | Alliance | `content/army-book-humans.md` |
| Dwarves (Ironforge/Wildhammer) | Alliance | `content/army-book-dwarves.md` |
| Night Elves (Kaldorei) | Alliance | `content/army-book-night-elves.md` |
| Orcs (Orgrimmar) | Horde | `content/army-book-orcs.md` |
| Darkspear Trolls | Horde | `content/army-book-darkspear.md` |
| Tauren (Thunder Bluff) | Horde | `content/army-book-tauren.md` |
| Forsaken (Undercity) | Horde | `content/army-book-forsaken.md` |
| Scourge (Lich King) | Scourge | `content/army-book-scourge.md` |

## Key design decisions (confirmed)

These are settled — don't propose changes unless asked:

- **Racial WND baselines:** Tauren 4, Orc/Dwarf/Troll 3, Human/Elf/Forsaken 2, Scourge skeleton 1
- **TGH = racial base + armor bonus** (only Heavy Armor adds +1)
- **DEF from armor:** LA 6+, MA 5+, HA 4+, Shield +1 DEF
- **Weapon DMG:** Light Weapon 1, Standard Weapon 1, Heavy Weapon 2
- **INI modifiers:** LA +1, HA -1, LW +1, HW -1
- **Orc loadout triangle:** Axe+Shield (DEF 4+), Dual Axes (+1 ATK), Greataxe (DMG 2)
- **Target roster:** 4-6 unit profiles per sub-faction; loadouts multiply variety
- **Faction overview = no unit names or stats** — that belongs in army books only
