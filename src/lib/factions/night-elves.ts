import type { Faction } from "./types";

export const NIGHT_ELVES: Faction = {
  id: "night-elves",
  name: "Kaldorei",
  grandFaction: "alliance",
  allegiance: "Alliance",
  crest: "/assets/alliance/night-elves/crest.webp",
  colorKey: "night-elves",
  icon: "/assets/alliance/night-elves/crest.webp",
  theme: "Ancient, stealthy, nature-bound. Guerrilla warfare and druidic shapeshifting.",
  playstyle: "Hit-and-run. High INI across the board, Stealth on many units, strong archery. Druids shapeshift for different roles. They control engagement — picking fights on their terms and using forests as home territory.",
  mechanic: {
    name: "Shadowmeld",
    description: "At the start of any round, Night Elf models that did not attack or use abilities last round may gain Stealth until they act.",
  },
  strengths: "Highest INI faction (hard to hit in melee), Stealth everywhere, excellent archers, shapeshifting versatility, forest terrain advantage",
  weaknesses: "Low DEF (light armor), fragile if caught in the open, few Heavy Armor or Shield models, weak against Armor Piercing",
  ratings: { offense: 3, defense: 2, magic: 4, speed: 4 },
  units: [
    {
      name: "Priestess of the Moon",
      subfaction: "Night Elf",
      tier: "Hero",
      archetype: "Ranged / Support",
      keywords: ["Magical"],
      description: "Elune's chosen champion. Mobile ranged Hero who empowers archers with Trueshot Aura and calls silver fire from the sky. Racial: Shadowmeld (if didn't attack last round, gain Stealth until she acts).",
      equipment: ["Dagger", "Longbow", "Leather"],
      stats: { MOV: 7, ATK: 3, SKL: 3, STR: 4, TGH: 3, DEF: 6, INI: 5, WND: 4, PTS: 135 },
      heroData: {
        className: "Priestess of the Moon",
        classAbility: { name: "Scout", cost: "Once per game", type: "Instant", description: "Target point within 24\". All Stealth models within 6\" are revealed until end of round" },
        globals: [
          { name: "Searing Arrows", cost: "1 Mana", type: "Buff", description: "This Hero's ranged attacks gain +2 STR until end of round" },
          { name: "Hunter's Mark", cost: "1 Mana", type: "Debuff", description: "Target enemy within 18\" suffers -1 DEF until end of round" },
        ],
        specs: [
          {
            name: "Sentinel",
            abilities: [
              { name: "Trueshot Aura", cost: "2 Mana", type: "Buff", description: "Friendly models within 6\" with ranged weapons gain +1 ranged STR until end of round" },
              { name: "Shadowstrike", cost: "2 Mana", type: "Spell Shoot", description: "Range 18\", STR 5. If in Stealth, this attack auto-hits" },
            ],
            ultimate: { name: "Starfall", cost: "Once per battle — 3 Mana", type: "Blast", description: "Large Blast 5\", STR 5, Range 24\". Only hits enemy models (no friendly fire)" },
          },
          {
            name: "Elune",
            abilities: [
              { name: "Moonfire", cost: "2 Mana", type: "Spell Shoot", description: "Ranged attack, STR 4, Range 18\"" },
              { name: "Starlight", cost: "2 Mana", type: "Buff", description: "Friendlies within 6\" gain +1 to hit with ranged attacks until end of round" },
            ],
            ultimate: { name: "Wrath of Elune", cost: "Once per battle", type: "Buff", description: "All friendly models within 6\" gain Decisive Blow [1] on ranged attacks until end of round" },
          },
        ],
      },
    },
    {
      name: "Keeper of the Grove",
      subfaction: "Night Elf",
      tier: "Hero",
      archetype: "Caster / Summoner",
      keywords: ["Magical", "Summon [3]"],
      description: "Ancient druid protector. Entangling Roots pins key targets, Force of Nature summons treant warriors. Racial: Shadowmeld (if didn't attack last round, gain Stealth until he acts).",
      equipment: ["Staff", "Dagger", "Leather", "Robes/None"],
      stats: { MOV: 5, ATK: 1, SKL: 3, STR: 3, TGH: 3, DEF: 6, INI: 4, WND: 4, PTS: 120 },
      heroData: {
        className: "Keeper of the Grove",
        classAbility: { name: "Innervate", cost: "Once per game", type: "Instant", description: "Target friendly Magical model within 6\" immediately gains 3 Mana" },
        globals: [
          { name: "Moonfire", cost: "2 Mana", type: "Spell Shoot", description: "Ranged attack, STR 4, Range 18\"" },
          { name: "Force of Nature", cost: "3 Mana", type: "Summon", description: "Summon 1 Treant within 6\". Lasts 3 rounds. MA, SW, 3 WND, Taunt" },
        ],
        specs: [
          {
            name: "Balance",
            abilities: [
              { name: "Entangling Roots", cost: "2 Mana", type: "Debuff", description: "Target enemy within 12\" cannot move until end of round" },
              { name: "Thorns Aura", cost: "2 Mana", type: "Buff", description: "Friendlies within 4\" deal 1 auto-wound (DEF save) to melee attackers until end of round" },
            ],
            ultimate: { name: "Wrath of Nature", cost: "Once per battle — 3 Mana", type: "Instant", description: "All enemies within 6\" are entangled and take STR 5 hit. Friendlies within 6\" heal 2 WND" },
          },
          {
            name: "Restoration",
            abilities: [
              { name: "Rejuvenation", cost: "2 Mana", type: "Buff", description: "Target friendly within 6\" gains Regeneration [1] until end of round" },
              { name: "Lifebloom", cost: "2 Mana", type: "Buff", description: "Target friendly within 6\" heals 1 WND at end of each activation until end of round" },
            ],
            ultimate: { name: "Tranquility", cost: "Once per battle — 3 Mana", type: "Instant", description: "All friendly models within 6\" heal 3 WND each" },
          },
        ],
      },
    },
    {
      name: "Sentinel",
      subfaction: "Night Elf",
      tier: "Baseline",
      archetype: "Skirmisher",
      keywords: ["Stealth"],
      description: "Fast, stealthy, nearly impossible to hit in melee (effective INI 7 with LA+LW). Dual-role melee and ranged. Fragile if caught — TGH 3 and DEF 6+ means every hit hurts.",
      equipment: ["Dagger", "Throwing Glaive", "Longbow", "Leather"],
      stats: { MOV: 6, ATK: 2, SKL: 4, STR: 3, TGH: 3, DEF: 6, INI: 5, WND: 2, PTS: 40 },
    },
    {
      name: "Archer",
      subfaction: "Night Elf",
      tier: "Baseline",
      archetype: "Core Ranged",
      keywords: [],
      description: "Kaldorei longbow specialists. SKL 3+ makes them the most accurate baseline ranged unit. Better range and accuracy than Sentinels, but without Stealth they rely on distance.",
      equipment: ["Longbow", "Dagger", "Leather"],
      stats: { MOV: 6, ATK: 2, SKL: 3, STR: 3, TGH: 3, DEF: 6, INI: 5, WND: 2, PTS: 30 },
    },
    {
      name: "Druid of the Claw",
      subfaction: "Night Elf",
      tier: "Elite",
      archetype: "Shapeshifter",
      keywords: ["Magical"],
      description: "Choose form at start of each activation. Bear Form: Taunt, high TGH/WND, Regeneration [1]. Cat Form: Disengage, Stealth, Decisive Blow [2]. Stats shown are caster form — forms override these.",
      equipment: ["Dagger", "Leather"],
      stats: { MOV: 6, ATK: 3, SKL: 3, STR: 4, TGH: 4, DEF: 6, INI: 4, WND: 3, PTS: 80 },
    },
  ],
  composition: [
    { size: "Skirmish (500 pts)", baseline: "3-5", mounted: "0-2", elite: "0-2", hero: "1" },
    { size: "Standard (750 pts)", baseline: "4-7", mounted: "0-3", elite: "1-3", hero: "1-2" },
    { size: "Large (1000+ pts)", baseline: "5-9", mounted: "1-4", elite: "2-5", hero: "2-3" },
  ],
};

