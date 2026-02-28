export interface UnitStats {
  MOV: number;
  ATK: number;
  SKL: number;
  STR: number;
  TGH: number;
  DEF: number;
  INI: number;
  WND: number;
  PTS: number;
}

export interface HeroAbility {
  name: string;
  cost: string;
  type: string;
  description: string;
}

export interface HeroSpec {
  name: string;
  abilities: HeroAbility[];   // Lv.1 spec + Lv.2 spec (2 abilities)
  ultimate: HeroAbility;      // Lv.3 once-per-battle
}

export interface HeroClassData {
  className: string;
  classAbility: HeroAbility;  // once per game (shared)
  globals: HeroAbility[];     // Lv.1 global + Lv.2 global (shared, 2 abilities)
  specs: HeroSpec[];           // exactly 2 spec options
}

export interface Unit {
  name: string;
  subfaction: string;
  tier: string;
  archetype: string;
  keywords: string[];
  description: string;
  equipment: string[];
  dualSlot?: string;
  stats: UnitStats;
  heroData?: HeroClassData;
}

export interface Faction {
  id: string;
  name: string;
  allegiance: "Alliance" | "Horde" | "Scourge";
  icon: string;
  crest?: string;      // webp crest for large displays (undefined = fall back to svgIcon)
  svgIcon: string;     // SVG icon for small inline use (always present)
  colorKey: string;    // CSS variable fragment, e.g. "humans" → var(--faction-humans)
  theme: string;
  playstyle: string;
  mechanic: { name: string; description: string };
  strengths: string;
  weaknesses: string;
  ratings: { offense: number; defense: number; magic: number; speed: number };
  units: Unit[];
  composition: { size: string; baseline: string; mounted: string; elite: string; hero: string }[];
  specialRules?: string[];
}

/* ─── ALLIANCE ─────────────────────────────────────────────── */

const HUMANS: Faction = {
  id: "humans",
  name: "Humans of Stormwind",
  allegiance: "Alliance",
  icon: "/images/Human_Crest.webp",
  crest: "/images/Human_Crest.webp",
  svgIcon: "/icons/factions/humans.svg",
  colorKey: "humans",
  theme: "Disciplined, versatile, faith-powered. The backbone of the Alliance.",
  playstyle: "Balanced and adaptable. Strong defensive line with heavy armor infantry, supported by paladins (Taunt/healing) and priests (buffs). Solid ranged with crossbowmen. Good cavalry for flanking. No glaring weakness but no extreme specialty — they win through discipline and flexibility.",
  mechanic: {
    name: "Devotion Auras",
    description: "Buff abilities cast by Human models cost 1 less Mana (minimum 1).",
  },
  strengths: "High DEF across the board, efficient buffs, versatile roster",
  weaknesses: "Low INI (heavy armor everywhere), no Regeneration or Berserker, predictable",
  ratings: { offense: 3, defense: 4, magic: 3, speed: 3 },
  units: [
    {
      name: "Paladin",
      subfaction: "Human",
      tier: "Hero",
      archetype: "Tank / DPS",
      keywords: ["Magical"],
      description: "The quintessential Alliance Hero — faith, plate, and a blessed blade. Racial: Versatility (may use 2 abilities per activation, second costs +1 Mana). Protection Paladins are unkillable walls. Retribution Paladins channel the Light into devastating melee strikes.",
      equipment: ["Runesword", "Plate Armor", "Shield (Protection only)"],
      stats: { MOV: 5, ATK: 4, SKL: 3, STR: 5, TGH: 5, DEF: 4, INI: 3, WND: 5, PTS: 140 },
      heroData: {
        className: "Paladin",
        classAbility: { name: "Lay on Hands", cost: "Once per game", type: "Instant", description: "Fully heal one friendly model within 2\"" },
        globals: [
          { name: "Holy Light", cost: "2 Mana", type: "Instant", description: "Restore 2 WND to a friendly model within 6\"" },
        ],
        specs: [
          {
            name: "Protection",
            abilities: [
              { name: "Shield of the Righteous", cost: "1 Mana", type: "Reaction", description: "Negate 1 incoming wound to this model" },
              { name: "Inspiring Presence", cost: "Passive", type: "Buff", description: "Friendly models within 6\" gain +1 Morale" },
              { name: "Taunt", cost: "Passive", type: "Buff", description: "Gain the Taunt keyword permanently" },
            ],
            ultimate: { name: "Divine Shield", cost: "Once per battle", type: "Buff", description: "Immune to all damage until end of round" },
          },
          {
            name: "Retribution",
            abilities: [
              { name: "Judgment", cost: "2 Mana", type: "Spell Shoot", description: "Range 12\", STR 5. Target suffers -1 DEF until end of round" },
              { name: "Seal Stance", cost: "Free Action", type: "Buff", description: "Choose a seal: Command (+1 ATK), Protection (+1 DEF), or Light (Heal 1 WND at start of activation)" },
              { name: "Crusader Strike", cost: "1 Mana", type: "Instant", description: "Next melee attack this activation gains +2 ATK dice" },
            ],
            ultimate: { name: "Avenging Wrath", cost: "Once per battle", type: "Buff", description: "Gain +2 ATK dice and +1 STR until end of round. All abilities cost 0 Mana this round" },
          },
        ],
      },
    },
    {
      name: "Archmage",
      subfaction: "Human",
      tier: "Hero",
      archetype: "Caster / Damage",
      keywords: ["Magical"],
      description: "Master of the arcane arts. Glass cannon — devastating spell damage but fragile. Racial: Versatility (may use 2 abilities per activation, second costs +1 Mana). Three schools: Frost controls, Arcane sustains, Fire explodes.",
      equipment: ["Staff", "Robes/None"],
      stats: { MOV: 5, ATK: 2, SKL: 3, STR: 3, TGH: 3, DEF: 6, INI: 4, WND: 3, PTS: 115 },
      heroData: {
        className: "Mage",
        classAbility: { name: "Evocation", cost: "Once per game", type: "Instant", description: "Immediately gain 4 Mana" },
        globals: [
          { name: "Fireball", cost: "2 Mana", type: "Spell Shoot", description: "Ranged attack, STR 5, Range 18\"" },
          { name: "Arcane Intellect", cost: "2 Mana", type: "Buff", description: "Target Magical model generates +1 Mana next turn (1 Mana with Devotion Auras)" },
        ],
        specs: [
          {
            name: "Frost",
            abilities: [
              { name: "Frostbolt", cost: "2 Mana", type: "Spell Shoot", description: "STR 4, Range 18\". Target suffers -2 MOV until end of round" },
              { name: "Ice Barrier", cost: "2 Mana", type: "Buff", description: "Self: absorb next 2 wounds" },
            ],
            ultimate: { name: "Blizzard", cost: "Once per battle — 3 Mana", type: "Blast", description: "Large Blast 5\", STR 4, Range 18\". All hit targets cannot move next activation" },
          },
          {
            name: "Arcane",
            abilities: [
              { name: "Arcane Missiles", cost: "2 Mana", type: "Spell Shoot", description: "3 separate STR 4 attacks against one target, Range 18\"" },
              { name: "Brilliance Aura", cost: "3 Mana", type: "Buff", description: "Army generates +1 base Mana this round (2 Mana with Devotion Auras)" },
            ],
            ultimate: { name: "Arcane Power", cost: "Once per battle", type: "Buff", description: "Next 3 Spell Shoot abilities this round deal double damage" },
          },
          {
            name: "Fire",
            abilities: [
              { name: "Ignite", cost: "Passive", type: "Buff", description: "When Fireball kills a model, one enemy within 2\" of the killed model suffers a STR 4 hit" },
              { name: "Combustion", cost: "2 Mana", type: "Buff", description: "All Spell Shoot abilities this round gain +2 STR (1 Mana with Devotion Auras)" },
            ],
            ultimate: { name: "Pyroblast", cost: "Once per battle — 3 Mana", type: "Spell Shoot", description: "Ranged attack, STR 8, Range 18\", AP 2" },
          },
        ],
      },
    },
    {
      name: "Footman",
      subfaction: "Human",
      tier: "Baseline",
      archetype: "Core Infantry",
      keywords: ["Shield Wall"],
      description: "The Alliance backbone. Plate armor and discipline make them the toughest baseline unit. Shield Wall: when 2+ Footmen within 2\", Shield Footmen reroll one failed DEF save of 1.",
      equipment: ["Sword+Shield / Halberd", "Plate Armor"],
      stats: { MOV: 5, ATK: 2, SKL: 4, STR: 4, TGH: 5, DEF: 4, INI: 3, WND: 2, PTS: 35 },
    },
    {
      name: "Crossbowman",
      subfaction: "Human",
      tier: "Baseline",
      archetype: "Core Ranged",
      keywords: [],
      description: "Stormwind's ranged infantry. Reliable and disciplined. Standard 24\" range crossbows provide solid fire support. Not flashy, but cheap and effective in numbers.",
      equipment: ["Crossbow", "Sword", "Mail"],
      stats: { MOV: 5, ATK: 2, SKL: 4, STR: 4, TGH: 3, DEF: 5, INI: 3, WND: 2, PTS: 25 },
    },
    {
      name: "Knight",
      subfaction: "Human",
      tier: "Mounted",
      archetype: "Heavy Cavalry",
      keywords: ["Momentum [1]"],
      description: "Classic armored charge. High DEF, solid damage on impact. The hammer to the Footman's anvil.",
      equipment: ["Sword+Shield / Halberd", "Plate Armor"],
      stats: { MOV: 8, ATK: 4, SKL: 4, STR: 4, TGH: 5, DEF: 4, INI: 3, WND: 2, PTS: 60 },
    },
    {
      name: "Priest",
      subfaction: "Human",
      tier: "Elite",
      archetype: "Support / Buffer",
      keywords: ["Magical"],
      description: "Battlefield healer and support. Heal keeps models alive, Inner Fire buffs ATK, Smite provides ranged damage. Resurrection is the ultimate comeback ability.",
      equipment: ["Staff", "Robes/None"],
      stats: { MOV: 5, ATK: 2, SKL: 4, STR: 3, TGH: 3, DEF: 6, INI: 3, WND: 3, PTS: 60 },
    },
    {
      name: "Sorceress",
      subfaction: "Human",
      tier: "Elite",
      archetype: "Caster / Control",
      keywords: ["Magical"],
      description: "Kirin Tor-trained battle mage. SKL 3+ and battlefield control through slows (Frostbolt) and crowd control (Polymorph, Invisibility).",
      equipment: ["Staff", "Robes/None"],
      stats: { MOV: 5, ATK: 2, SKL: 3, STR: 3, TGH: 3, DEF: 6, INI: 4, WND: 3, PTS: 60 },
    },
    {
      name: "Champion",
      subfaction: "Human",
      tier: "Elite",
      archetype: "Melee Leader",
      keywords: [],
      description: "Veteran sub-commander. Masterwork Greatsword (AP 2) cuts through heavy armor. For Lordaeron! gives charging friendlies within 6\" +1 ATK. Inspiring Presence grants +1 Morale.",
      equipment: ["Masterwork Greatsword", "Plate Armor"],
      stats: { MOV: 5, ATK: 3, SKL: 3, STR: 5, TGH: 5, DEF: 4, INI: 2, WND: 3, PTS: 70 },
    },
  ],
  composition: [
    { size: "Skirmish (500 pts)", baseline: "3-6", mounted: "0-2", elite: "0-2", hero: "1" },
    { size: "Standard (750 pts)", baseline: "4-8", mounted: "0-3", elite: "1-3", hero: "1-2" },
    { size: "Large (1000+ pts)", baseline: "5-10", mounted: "1-4", elite: "2-5", hero: "2-3" },
  ],
};

const DWARVES: Faction = {
  id: "dwarves",
  name: "Dwarves of Ironforge",
  allegiance: "Alliance",
  crest: "/images/Dwarf_Crest.webp",
  svgIcon: "/icons/factions/dwarves.svg",
  colorKey: "dwarves",
  icon: "/images/Dwarf_Crest.webp",
  theme: "Stubborn, heavily armed, ranged firepower and aerial prowess.",
  playstyle: "Ranged-dominant with the best guns in the game. Extremely tough and stubborn (high Morale bonuses). Slow-moving but devastating at range. Close combat is functional but not their strength — they want to shoot you to pieces before you reach them.",
  mechanic: {
    name: "Stoneborn Resolve",
    description: "Dwarven models add +1 to Morale tests (stacks with Command Aura). Dwarves almost never break.",
  },
  strengths: "Hardest-hitting ranged weapons, longest range, highest Morale, tough infantry, gryphon air support",
  weaknesses: "Slowest faction, limited magic, few Magical units for Mana/Dispel",
  ratings: { offense: 3, defense: 4, magic: 2, speed: 2 },
  units: [
    {
      name: "Mountain King",
      subfaction: "Dwarf",
      tier: "Hero",
      archetype: "Melee Bruiser",
      keywords: [],
      description: "Ancient warrior-lord of the deep halls. Racial: Stoneform (once per game, remove all debuffs and +1 DEF until end of round). Storm Bolt stuns priority targets, Thunder Clap disrupts formations, Avatar transforms him into stone.",
      equipment: ["Dwarven Hammer", "Greatsword", "Halberd", "Shield", "Plate Armor", "Mail"],
      stats: { MOV: 5, ATK: 4, SKL: 3, STR: 5, TGH: 5, DEF: 3, INI: 3, WND: 5, PTS: 145 },
      heroData: {
        className: "Mountain King",
        classAbility: { name: "Battle Cry", cost: "Once per game", type: "Buff", description: "All friendly models within 6\" gain +1 ATK die until end of round" },
        globals: [
          { name: "Heroic Strike", cost: "1 Mana", type: "Instant", description: "Next melee attack this activation deals +2 bonus damage" },
          { name: "Battle Shout", cost: "2 Mana", type: "Buff", description: "Friendlies within 6\" gain +1 ATK until end of round" },
        ],
        specs: [
          {
            name: "Mountain King",
            abilities: [
              { name: "Storm Bolt", cost: "2 Mana", type: "Spell Shoot", description: "Range 12\", STR 5. If target wounded, cannot move or attack next activation (stunned)" },
              { name: "Thunder Clap", cost: "2 Mana", type: "Instant", description: "All enemies within 3\" suffer STR 4 hit and -1 ATK until end of round" },
            ],
            ultimate: { name: "Avatar", cost: "Once per battle", type: "Buff", description: "Gain +2 TGH, +1 ATK die, and immunity to debuffs until end of round" },
          },
          {
            name: "Protection",
            abilities: [
              { name: "Shield Wall", cost: "1 Mana", type: "Reaction", description: "+2 DEF until end of round. Requires Shield" },
              { name: "Taunt", cost: "Passive", type: "Buff", description: "Gain Taunt keyword permanently" },
            ],
            ultimate: { name: "Last Stand", cost: "Once per battle", type: "Instant", description: "Restore to full WND and gain +2 DEF until end of round" },
          },
        ],
      },
    },
    {
      name: "Dwarf Ranger",
      subfaction: "Dwarf",
      tier: "Baseline",
      archetype: "Core Ranged",
      keywords: ["Decisive Blow [1]"],
      description: "Sturdy ranged specialists with the hardest-hitting ranged weapons in the game. RSTR 5 wounds on 3+ against most infantry. 30\" base range keeps them shooting before anyone else.",
      equipment: ["Rifle", "Crossbow", "Stormhammer", "Dwarven Hammer", "Mail", "Leather"],
      stats: { MOV: 4, ATK: 2, SKL: 4, STR: 3, TGH: 4, DEF: 5, INI: 3, WND: 3, PTS: 50 },
    },
    {
      name: "Ironforge Guard",
      subfaction: "Dwarf",
      tier: "Baseline",
      archetype: "Core Infantry",
      keywords: [],
      description: "The shield wall of Ironforge. Heavily armored Dwarf infantry who hold the line while Rangers shoot over their heads. Slower than Footmen but just as tough, with Dwarven stubbornness keeping them planted.",
      equipment: ["Dwarven Hammer", "Shield", "Plate Armor", "Mail"],
      stats: { MOV: 4, ATK: 2, SKL: 4, STR: 4, TGH: 5, DEF: 4, INI: 2, WND: 3, PTS: 45 },
    },
    {
      name: "Thane",
      subfaction: "Dwarf",
      tier: "Elite",
      archetype: "Heavy Infantry",
      keywords: ["Decisive Blow [2]"],
      description: "Veteran Dwarf lord. Heavy weapon, heavy armor, devastating strikes. High WND. Slow but extremely dangerous.",
      equipment: ["Dwarven Hammer", "Greatsword", "Halberd", "Shield", "Plate Armor", "Mail"],
      stats: { MOV: 4, ATK: 3, SKL: 3, STR: 5, TGH: 5, DEF: 3, INI: 2, WND: 4, PTS: 85 },
    },
    {
      name: "Gryphon Rider",
      subfaction: "Dwarf",
      tier: "Elite",
      archetype: "Flying Shock Cavalry",
      keywords: ["Fly", "Momentum [1]"],
      description: "Dwarf on a gryphon. Flying charge plus throwing hammer ranged. Counts against both Mounted and Elite limits.",
      equipment: ["Dwarven Hammer", "Stormhammer", "Mail"],
      stats: { MOV: 10, ATK: 3, SKL: 3, STR: 4, TGH: 4, DEF: 4, INI: 3, WND: 3, PTS: 95 },
      dualSlot: "Mounted + Elite",
    },
  ],
  composition: [
    { size: "Skirmish (500 pts)", baseline: "3-5", mounted: "0-2", elite: "0-2", hero: "1" },
    { size: "Standard (750 pts)", baseline: "4-7", mounted: "0-3", elite: "1-3", hero: "1-2" },
    { size: "Large (1000+ pts)", baseline: "5-9", mounted: "1-4", elite: "2-5", hero: "2-3" },
  ],
};

const NIGHT_ELVES: Faction = {
  id: "night-elves",
  name: "Night Elves",
  allegiance: "Alliance",
  crest: "/images/night_elves_crest.webp",
  svgIcon: "/icons/factions/night-elves.svg",
  colorKey: "night-elves",
  icon: "/images/night_elves.webp",
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

/* ─── HORDE ─────────────────────────────────────────────────── */

const ORCS: Faction = {
  id: "orcs",
  name: "Orcs of Orgrimmar",
  allegiance: "Horde",
  crest: "/images/Orc_Crest.webp",
  svgIcon: "/icons/factions/orcs.svg",
  colorKey: "orcs",
  icon: "/images/Orc_Crest.webp",
  theme: "Savage, honorable, shamanic. Brute force meets elemental magic.",
  playstyle: "Fast and brutal. Highest base MOV of any infantry faction (MOV 6 on Warriors) and high STR/ATK across the board. Berserker and Momentum on many units. Close the gap, crash in, overwhelm with raw aggression.",
  mechanic: {
    name: "Blood Fury",
    description: "Once per game, during the Mana Phase, all Orc models gain +1 ATK die and +1 MOV this round.",
  },
  strengths: "Highest raw ATK/STR, fastest infantry, Momentum on core units, Berserker everywhere, devastating charge game, good elemental magic",
  weaknesses: "Medium armor at best, below-average DEF, short-range shooting, easy to hit (low INI)",
  ratings: { offense: 5, defense: 2, magic: 3, speed: 4 },
  units: [
    {
      name: "Far Seer",
      subfaction: "Orc",
      tier: "Hero",
      archetype: "Caster / Shaman",
      keywords: ["Magical"],
      description: "The Horde's premier shaman. Three paths: Elemental rains destruction, Enhancement charges into melee with lightning weapons, Restoration keeps the warband fighting. Racial: Blood Rage (+1 ATK die permanently when below 50% WND).",
      equipment: ["Staff", "Storm Hammer", "Lightning Axes", "Leather"],
      stats: { MOV: 5, ATK: 2, SKL: 3, STR: 3, TGH: 3, DEF: 6, INI: 4, WND: 3, PTS: 115 },
      heroData: {
        className: "Shaman",
        classAbility: { name: "Reincarnation", cost: "Once per game", type: "Instant", description: "When destroyed, return at start of next Morale Phase with half WND (rounded up) at same position" },
        globals: [
          { name: "Lightning Bolt", cost: "2 Mana", type: "Spell Shoot", description: "Ranged attack, STR 5, Range 18\"" },
          { name: "Far Sight", cost: "1 Mana", type: "Instant", description: "Target point within 24\". All Stealth models within 6\" are revealed until end of round" },
        ],
        specs: [
          {
            name: "Elemental",
            abilities: [
              { name: "Chain Lightning", cost: "3 Mana", type: "Spell Shoot", description: "STR 5, Range 18\". Bounces to 1 enemy within 4\" at STR 4" },
              { name: "Earth Shock", cost: "2 Mana", type: "Instant", description: "Target within 8\" cannot use abilities on its next activation" },
            ],
            ultimate: { name: "Earthquake", cost: "Once per battle — 3 Mana", type: "Blast", description: "Large Blast 5\", STR 4, Range 18\". Hit targets cannot move and suffer -1 ATK next round" },
          },
          {
            name: "Enhancement",
            abilities: [
              { name: "Stormstrike", cost: "2 Mana", type: "Instant", description: "Next melee attack gains +2 ATK dice and +1 STR" },
              { name: "Windfury Weapon", cost: "2 Mana", type: "Buff", description: "On natural 6s to hit in melee, that hit deals +1 DMG. Lasts until end of round" },
            ],
            ultimate: { name: "Lava Lash", cost: "Once per battle — 2 Mana", type: "Instant", description: "Next melee attack gains +2 STR and deals elemental damage" },
          },
          {
            name: "Restoration",
            abilities: [
              { name: "Healing Wave", cost: "2 Mana", type: "Instant", description: "Restore 3 WND to a friendly model within 6\"" },
              { name: "Spirit Link", cost: "2 Mana", type: "Buff", description: "2 friendly models within 6\" share damage equally (round up) until end of round" },
            ],
            ultimate: { name: "Ancestral Guidance", cost: "Once per battle", type: "Instant", description: "All friendly models within 6\" heal 3 WND and gain +1 to hit until end of round" },
          },
        ],
      },
    },
    {
      name: "Warchief",
      subfaction: "Orc",
      tier: "Hero",
      archetype: "Melee Leader",
      keywords: ["Berserker"],
      description: "Frontline command Hero who leads from the front. Warchief spec buffs the army and commands the charge. Blademaster spec turns him into a personal killing machine. Racial: Blood Rage (+1 ATK die permanently when below 50% WND).",
      equipment: ["Bloodforged Greataxe", "Spirit Blade", "Plate Armor"],
      stats: { MOV: 5, ATK: 4, SKL: 3, STR: 6, TGH: 5, DEF: 4, INI: 3, WND: 5, PTS: 140 },
      heroData: {
        className: "Warchief",
        classAbility: { name: "Blood Fury", cost: "Once per game", type: "Buff", description: "All Horde models gain +1 ATK die this round" },
        globals: [
          { name: "Battle Shout", cost: "2 Mana", type: "Buff", description: "Friendly models within 6\" without Momentum gain Momentum [1] until end of round" },
          { name: "Commanding Presence", cost: "Passive", type: "Buff", description: "Friendly models within 6\" may reroll failed Morale tests" },
        ],
        specs: [
          {
            name: "Warchief",
            abilities: [
              { name: "War Cry", cost: "2 Mana", type: "Buff", description: "All friendly within 8\" gain +1 ATK die and +1 Morale until end of round" },
              { name: "Shockwave", cost: "2 Mana", type: "Instant", description: "All enemies in 2\"-wide, 6\"-long line take STR 5 hit and cannot move next activation" },
            ],
            ultimate: { name: "For the Horde!", cost: "Once per battle", type: "Buff", description: "All friendly Horde models gain Morale immunity and may Rush + Charge in same activation until end of round" },
          },
          {
            name: "Blademaster",
            abilities: [
              { name: "Heroic Strike", cost: "1 Mana", type: "Instant", description: "Next melee attack this activation deals +2 bonus damage" },
              { name: "Wind Walk", cost: "2 Mana", type: "Buff", description: "Gain Stealth and +2 MOV until this Hero attacks. Next melee attack from Stealth auto-hits" },
            ],
            ultimate: { name: "Bladestorm", cost: "Once per battle", type: "Instant", description: "Attack ALL enemy models within 2\" with full ATK dice against each" },
          },
        ],
      },
    },
    {
      name: "Orc Warrior",
      subfaction: "Orc",
      tier: "Baseline",
      archetype: "Core Infantry",
      keywords: ["Berserker", "Momentum [1]"],
      description: "The Horde backbone — fast, aggressive, dangerous. MOV 6 makes them the fastest baseline infantry in the game. Momentum [1] on the charge, Berserker when wounded. Three loadouts: Axe+Shield (DEF 4+), Dual Axes (4 ATK), Greataxe (DMG 2).",
      equipment: ["Axe+Shield / Dual Axes / Greataxe", "Chain/Hide"],
      stats: { MOV: 6, ATK: 3, SKL: 4, STR: 4, TGH: 4, DEF: 5, INI: 3, WND: 3, PTS: 45 },
    },
    {
      name: "Wolf Rider",
      subfaction: "Orc",
      tier: "Mounted",
      archetype: "Fast Cavalry",
      keywords: ["Momentum [1]", "Berserker"],
      description: "Among the fastest cavalry in the game. Berserker on a wolf — screaming Orc that gets angrier as it bleeds. The premier flanker.",
      equipment: ["Axe+Shield / Throwing Spear", "Leather", "Shield"],
      stats: { MOV: 10, ATK: 3, SKL: 4, STR: 4, TGH: 4, DEF: 6, INI: 4, WND: 3, PTS: 60 },
    },
    {
      name: "Orc Shaman",
      subfaction: "Orc",
      tier: "Elite",
      archetype: "Caster / Support",
      keywords: ["Magical"],
      description: "Battlefield caster. Lightning Bolt (STR 5, 18\") and Earth Shield (+1 DEF, absorb 2 wounds). Provides Magical keyword for Mana generation and Dispel access. Can take Shield for DEF 4+.",
      equipment: ["Staff", "Shield", "Chain/Hide"],
      stats: { MOV: 5, ATK: 2, SKL: 4, STR: 3, TGH: 4, DEF: 5, INI: 3, WND: 3, PTS: 65 },
    },
    {
      name: "Kor'kron Elite",
      subfaction: "Orc",
      tier: "Elite",
      archetype: "Heavy Infantry",
      keywords: ["Cleave"],
      description: "The Warchief's personal guard. SKL 3+ means they rarely miss. TGH 5 and DEF 4+ makes them the toughest Orc infantry. Masterwork weapons (AP 2) cut through armor. Two loadouts: War Axes (dual, AP 2) or Masterwork Greataxe (AP 2, DMG 2).",
      equipment: ["War Axes / Masterwork Greataxe", "Plate Armor"],
      stats: { MOV: 5, ATK: 4, SKL: 3, STR: 5, TGH: 5, DEF: 4, INI: 3, WND: 4, PTS: 85 },
    },
    {
      name: "Wind Rider",
      subfaction: "Orc",
      tier: "Elite",
      archetype: "Flying Shock",
      keywords: ["Fly", "Momentum [1]"],
      description: "Orc on a wyvern. Flying charge plus envenomed spear ranged (8\"). Wyvern Sting: ranged wound applies -1 ATK until end of round. Counts against both Mounted and Elite limits.",
      equipment: ["Axe", "Envenomed Spear", "Chain/Hide"],
      stats: { MOV: 10, ATK: 3, SKL: 4, STR: 4, TGH: 4, DEF: 5, INI: 3, WND: 3, PTS: 70 },
      dualSlot: "Mounted + Elite",
    },
  ],
  composition: [
    { size: "Skirmish (500 pts)", baseline: "3-5", mounted: "0-2", elite: "0-2", hero: "1" },
    { size: "Standard (750 pts)", baseline: "4-7", mounted: "0-3", elite: "1-3", hero: "1-2" },
    { size: "Large (1000+ pts)", baseline: "5-9", mounted: "1-4", elite: "2-5", hero: "2-3" },
  ],
};

const DARKSPEAR: Faction = {
  id: "darkspear",
  name: "Darkspear Trolls",
  allegiance: "Horde",
  crest: "/images/Troll_Crest.webp",
  svgIcon: "/icons/factions/darkspear-trolls.svg",
  colorKey: "darkspear",
  icon: "/images/Troll_Crest.webp",
  theme: "Voodoo, regeneration, berserker fury, primal savagery.",
  playstyle: "Regeneration and Berserker everywhere. Trolls get tougher to kill as the fight goes on — they heal, get angry, hit harder. Powerful voodoo magic provides hexes, wards, and healing. The longer the battle lasts, the more they dominate.",
  mechanic: {
    name: "Voodoo Shuffle",
    description: "Darkspear models that pass a Morale test gain +1 ATK die until their next activation. Surviving fear makes them fight harder.",
  },
  strengths: "Regeneration makes them incredibly hard to kill over time, Berserker + Voodoo Shuffle means escalating damage, strong voodoo magic, good mobility",
  weaknesses: "Light armor across the board (low DEF), vulnerable to burst damage before Regeneration kicks in, no heavy armor or shields, Armor Piercing devastating",
  ratings: { offense: 3, defense: 3, magic: 4, speed: 4 },
  units: [
    {
      name: "Shadow Hunter",
      subfaction: "Troll",
      tier: "Hero",
      archetype: "Caster / Support",
      keywords: ["Magical"],
      description: "The Horde's voodoo master. Hex shuts down key targets, Healing Wave sustains, wards provide persistent board control. Racial: Regeneration [1] (recover 1 WND at start of activation).",
      equipment: ["Dagger", "Throwing Axe", "Longbow", "Leather"],
      stats: { MOV: 6, ATK: 2, SKL: 3, STR: 4, TGH: 3, DEF: 6, INI: 4, WND: 4, PTS: 130 },
      heroData: {
        className: "Shadow Hunter",
        classAbility: { name: "Big Bad Voodoo", cost: "Once per game", type: "Buff", description: "All friendly models within 4\" become immune to damage until end of round" },
        globals: [
          { name: "Hex", cost: "2 Mana", type: "Debuff", description: "Target enemy within 12\" cannot attack for 1 activation" },
          { name: "Healing Wave", cost: "2 Mana", type: "Instant", description: "Restore 2 WND to a friendly model within 8\"" },
        ],
        specs: [
          {
            name: "Voodoo",
            abilities: [
              { name: "Serpent Ward", cost: "2 Mana", type: "Summon", description: "Place ward within 6\". Makes ranged attack (STR 3, Range 12\") each round. Lasts 2 rounds" },
              { name: "Healing Ward", cost: "2 Mana", type: "Summon", description: "Place ward within 6\". Heals 1 WND to nearest friendly within 4\" each round. Lasts 2 rounds" },
            ],
            ultimate: { name: "Voodoo Frenzy", cost: "Once per battle", type: "Buff", description: "All friendly within 6\" gain +1 ATK and Regeneration [1] until end of round" },
          },
          {
            name: "Shadow",
            abilities: [
              { name: "Shadow Strike", cost: "2 Mana", type: "Spell Shoot", description: "Range 18\", STR 5. Target suffers -2 MOV until end of round" },
              { name: "Curse of Weakness", cost: "1 Mana", type: "Debuff", description: "Target enemy within 12\" suffers -1 ATK until end of round" },
            ],
            ultimate: { name: "Curse of Doom", cost: "Once per battle — 2 Mana", type: "Debuff", description: "Debuff on enemy within 12\". After 2 rounds, target takes D6 wounds with no save" },
          },
        ],
      },
    },
    {
      name: "Troll Berserker",
      subfaction: "Troll",
      tier: "Baseline",
      archetype: "Aggressive Infantry",
      keywords: ["Berserker", "Regeneration [1]"],
      description: "Heals every turn and gets angrier as it bleeds. Light armor (DEF 6+) but Regeneration [1] effectively adds 1 wound per round. Higher INI than Orcs makes them evasive in melee.",
      equipment: ["Axe", "Dagger", "Leather"],
      stats: { MOV: 6, ATK: 2, SKL: 4, STR: 4, TGH: 3, DEF: 6, INI: 4, WND: 3, PTS: 40 },
    },
    {
      name: "Headhunter",
      subfaction: "Troll",
      tier: "Baseline",
      archetype: "Ranged Skirmisher",
      keywords: ["Berserker"],
      description: "Troll throwing axe specialists. Only 12\" range but RSTR 4 hits hard at close quarters. MOV 6 lets them close to throwing range fast.",
      equipment: ["Throwing Axe", "Dagger", "Leather"],
      stats: { MOV: 6, ATK: 2, SKL: 4, STR: 3, TGH: 3, DEF: 6, INI: 4, WND: 3, PTS: 35 },
    },
    {
      name: "Raptor Rider",
      subfaction: "Troll",
      tier: "Mounted",
      archetype: "Fast Cavalry",
      keywords: ["Berserker", "Regeneration [1]"],
      description: "Troll warriors on swift raptors. Faster than Wolf Riders but less armored. Regeneration keeps them in the fight while Berserker makes them increasingly dangerous.",
      equipment: ["Axe", "Throwing Axe", "Dagger", "Leather"],
      stats: { MOV: 9, ATK: 3, SKL: 4, STR: 4, TGH: 3, DEF: 6, INI: 4, WND: 3, PTS: 55 },
    },
    {
      name: "Witch Doctor",
      subfaction: "Troll",
      tier: "Elite",
      archetype: "Caster / Support",
      keywords: ["Magical"],
      description: "Ward summons (sentry, healing, stasis), voodoo debuffs. Fragile but high utility. Provides Magical keyword for Mana generation.",
      equipment: ["Staff", "Dagger", "Leather"],
      stats: { MOV: 5, ATK: 1, SKL: 4, STR: 3, TGH: 3, DEF: 6, INI: 3, WND: 3, PTS: 55 },
    },
  ],
  composition: [
    { size: "Skirmish (500 pts)", baseline: "3-5", mounted: "0-2", elite: "0-2", hero: "1" },
    { size: "Standard (750 pts)", baseline: "4-7", mounted: "0-3", elite: "1-3", hero: "1-2" },
    { size: "Large (1000+ pts)", baseline: "5-9", mounted: "1-4", elite: "2-5", hero: "2-3" },
  ],
};

const TAUREN: Faction = {
  id: "tauren",
  name: "Tauren of Thunder Bluff",
  allegiance: "Horde",
  icon: "/icons/factions/tauren.svg",
  svgIcon: "/icons/factions/tauren.svg",
  colorKey: "tauren",
  theme: "Mighty, spiritual, nature-guardians. Walking walls of muscle.",
  playstyle: "Elite-heavy, low model count. Every Tauren is big, tough, and hits hard. Highest base TGH and WND in the game. Cleave keyword sweeps through clusters. They don't have many models, but each one is a serious threat.",
  mechanic: {
    name: "War Stomp",
    description: "Once per round, one Tauren model may declare War Stomp during its activation. All enemies within 2\" suffer -1 to hit on their next activation. Free, no Mana cost.",
  },
  strengths: "Toughest models in the game, Cleave everywhere, War Stomp disruption, excellent tanks, totem buffs",
  weaknesses: "Very low model count (expensive), slow, no flying, limited ranged options, vulnerable to being outnumbered",
  ratings: { offense: 4, defense: 5, magic: 3, speed: 2 },
  units: [
    {
      name: "Elder Shaman",
      subfaction: "Tauren",
      tier: "Hero",
      archetype: "Caster / Tank",
      keywords: ["Magical", "Summon [3]"],
      description: "Earth magic incarnate. The toughest caster in the game — Tauren stats mean this Hero can take hits while channeling. Racial: War Stomp (once per round, all enemies within 2\" suffer -1 to hit, free).",
      equipment: ["Staff", "Mace", "Shield", "Chain/Hide"],
      stats: { MOV: 5, ATK: 2, SKL: 3, STR: 4, TGH: 5, DEF: 5, INI: 2, WND: 5, PTS: 130 },
      heroData: {
        className: "Elder Shaman",
        classAbility: { name: "Reincarnation", cost: "Once per game", type: "Instant", description: "When destroyed, return at start of next Morale Phase with half WND (rounded up) at same position" },
        globals: [
          { name: "Lightning Bolt", cost: "2 Mana", type: "Spell Shoot", description: "Ranged attack, STR 5, Range 18\"" },
          { name: "Healing Wave", cost: "2 Mana", type: "Instant", description: "Restore 2 WND to a friendly model within 8\"" },
        ],
        specs: [
          {
            name: "Elemental",
            abilities: [
              { name: "Chain Lightning", cost: "3 Mana", type: "Spell Shoot", description: "STR 5, Range 18\". Bounces to 1 enemy within 4\" at STR 4" },
              { name: "Earth Shock", cost: "2 Mana", type: "Instant", description: "Target within 8\" cannot use abilities on its next activation" },
            ],
            ultimate: { name: "Earthquake", cost: "Once per battle — 3 Mana", type: "Blast", description: "Large Blast 5\", STR 4, Range 18\". Hit targets cannot move and suffer -1 ATK next round" },
          },
          {
            name: "Restoration",
            abilities: [
              { name: "Riptide", cost: "2 Mana", type: "Instant", description: "Heal 1 WND + grant Regeneration [1] until end of round" },
              { name: "Spirit Link", cost: "2 Mana", type: "Buff", description: "2 friendly models within 6\" share damage equally (round up) until end of round" },
            ],
            ultimate: { name: "Ancestral Spirit", cost: "Once per battle — 3 Mana", type: "Instant", description: "All friendly models within 6\" heal 3 WND" },
          },
        ],
      },
    },
    {
      name: "Brave",
      subfaction: "Tauren",
      tier: "Baseline",
      archetype: "Core Infantry",
      keywords: ["Cleave"],
      description: "Even Tauren Baseline troops are enormous — higher TGH and WND than most factions' Elites. Cleave lets massive weapons sweep through multiple enemies. Slow and predictable, but incredibly hard to bring down.",
      equipment: ["War Totem", "Greataxe", "Mace", "Shield", "Chain/Hide"],
      stats: { MOV: 5, ATK: 2, SKL: 4, STR: 5, TGH: 5, DEF: 5, INI: 2, WND: 4, PTS: 55 },
    },
    {
      name: "Tauren Warrior",
      subfaction: "Tauren",
      tier: "Elite",
      archetype: "Heavy Infantry",
      keywords: ["Cleave"],
      description: "Massive, tough, devastating. Higher TGH and WND than anything else in the Horde roster. Cleave sweeps through enemies. Slow but hits like a truck. The anvil around which battles are won.",
      equipment: ["War Totem", "Greataxe", "Mace", "Shield", "Chain/Hide", "Heavy Mail"],
      stats: { MOV: 5, ATK: 3, SKL: 4, STR: 5, TGH: 6, DEF: 4, INI: 2, WND: 4, PTS: 85 },
    },
    {
      name: "Sunwalker",
      subfaction: "Tauren",
      tier: "Elite",
      archetype: "Tank / Support",
      keywords: ["Taunt", "Magical"],
      description: "Tauren paladins — followers of An'she, the sun. Combine Tauren toughness with holy healing and Taunt. The living shield of Thunder Bluff. Even harder to kill than a standard Tauren Warrior thanks to self-healing.",
      equipment: ["Mace", "Shield", "Heavy Mail", "Chain/Hide"],
      stats: { MOV: 5, ATK: 2, SKL: 4, STR: 5, TGH: 5, DEF: 4, INI: 2, WND: 4, PTS: 75 },
    },
  ],
  composition: [
    { size: "Skirmish (500 pts)", baseline: "2-4", mounted: "0", elite: "0-2", hero: "1" },
    { size: "Standard (750 pts)", baseline: "3-5", mounted: "0", elite: "1-3", hero: "1-2" },
    { size: "Large (1000+ pts)", baseline: "4-7", mounted: "0", elite: "2-4", hero: "2-3" },
  ],
};

const FORSAKEN: Faction = {
  id: "forsaken",
  name: "Forsaken of Undercity",
  allegiance: "Horde",
  icon: "/images/Forsaken_Crest.webp",
  crest: "/images/Forsaken_Crest.webp",
  svgIcon: "/icons/factions/forsaken.svg",
  colorKey: "forsaken",
  theme: "Chemical warfare, poison, and plague. Free-willed undead who weaponize alchemy and biological agents against the living.",
  playstyle: "Debuff and attrition through Poison (damage over time) and Plague (stat degradation). Apply both to a target and the Poison wound ignores DEF saves. Blight tokens deny ground. Dark Rangers snipe from Stealth. Dread Riders spread Plague on the charge.",
  mechanic: {
    name: "Blight",
    description: "Forsaken models with the Plague keyword can place a Blight token within 3\" when they activate (free, once per activation). Enemy models on Blight suffer 1 wound (DEF save). Persists 2 rounds.",
  },
  strengths: "Two interlocking status effects (Poison + Plague synergy), Blight area denial, Stealth assassins, best ranged accuracy (SKL 2+), Undead ignore Morale",
  weaknesses: "Low raw damage (rely on debuffs first), Undead can't be healed at all, split Morale mechanics (Living Apothecaries test Morale), moderate base stats",
  ratings: { offense: 2, defense: 3, magic: 4, speed: 3 },
  specialRules: [
    "Poison: 1 wound at start of victim's next activation (DEF save). If also Plagued, ignores DEF saves.",
    "Plague: -1 TGH until end of round. Does not stack beyond -1.",
    "Blight: Plague keyword models place tokens when activated. Enemies on Blight suffer 1 wound (DEF save). Persists 2 rounds.",
  ],
  units: [
    {
      name: "Dark Lady",
      subfaction: "Forsaken",
      tier: "Hero",
      archetype: "Ranged / Commander",
      keywords: ["Magical", "Undead", "Stealth", "Decisive Blow [2]"],
      description: "Supreme commander. Black Arrow applies Poison + -1 DEF on ranged hits. Charm dominates enemy models. Racial: Undying Will (Undead — immune to Morale and Taunt, cannot be healed).",
      equipment: ["Longbow", "Dagger", "Leather"],
      stats: { MOV: 6, ATK: 3, SKL: 2, STR: 5, TGH: 3, DEF: 5, INI: 6, WND: 4, PTS: 130 },
      heroData: {
        className: "Dark Ranger",
        classAbility: { name: "Charm", cost: "Once per game", type: "Instant", description: "Target enemy non-Hero within 8\" switches sides for 1 round, then destroyed" },
        globals: [
          { name: "Black Arrow", cost: "2 Mana", type: "Buff", description: "Self. Ranged attacks apply Poison (on wound, no unsaved wound required). Poisoned targets also suffer -1 DEF" },
          { name: "Hunter's Mark", cost: "1 Mana", type: "Debuff", description: "Enemy within 18\" suffers -1 DEF. All friendly Forsaken gain +1 to hit vs marked target" },
        ],
        specs: [
          {
            name: "Dark Ranger",
            abilities: [
              { name: "Silence", cost: "2 Mana", type: "Debuff", description: "Enemy within 12\" cannot use abilities until end of round" },
              { name: "Dark Pursuit", cost: "1 Mana", type: "Buff", description: "Gain Stealth and Disengage until this Hero attacks" },
            ],
            ultimate: { name: "Withering Volley", cost: "Once per battle — 3 Mana", type: "Blast", description: "Small Blast 3\", STR 5, Range 24\". All hit become permanently Plagued (does not expire)" },
          },
          {
            name: "Banshee",
            abilities: [
              { name: "Life Drain", cost: "2 Mana", type: "Spell Shoot", description: "Range 12\", STR 4. Heals WND equal to wounds dealt (bypasses Undead restriction)" },
              { name: "Wail of the Banshee", cost: "2 Mana", type: "Instant", description: "All enemies within 4\" take Morale test at -2. Undead/Mechanical immune" },
            ],
            ultimate: { name: "Possession", cost: "Once per battle — 3 Mana", type: "Instant", description: "Enemy non-Hero within 6\" permanently switches sides" },
          },
        ],
      },
    },
    {
      name: "Grand Apothecary",
      subfaction: "Forsaken",
      tier: "Hero",
      archetype: "Plague Caster / Debuff",
      keywords: ["Magical", "Plague"],
      description: "Supreme alchemist. Master of chemical warfare — Plague Bombs, mass debuffs, Blight detonation. New Plague permanently applies both Plagued AND Poisoned. Living — tests Morale, can be healed.",
      equipment: ["Plague Staff", "Robes/None"],
      stats: { MOV: 5, ATK: 2, SKL: 4, STR: 3, TGH: 3, DEF: 5, INI: 3, WND: 3, PTS: 115 },
      heroData: {
        className: "Apothecary",
        classAbility: { name: "New Plague", cost: "Once per game", type: "Blast", description: "Large Blast 5\", Range 12\". All enemies hit become Plagued AND Poisoned permanently (neither expires). No save" },
        globals: [
          { name: "Plague Bomb", cost: "2 Mana", type: "Blast", description: "Small Blast 3\", Range 12\", STR 3. All hit become Plagued. Creates Blight token at impact" },
          { name: "Miasma", cost: "1 Mana", type: "Debuff", description: "All enemies within 3\" suffer -1 to hit rolls until end of round" },
        ],
        specs: [
          {
            name: "Plague Doctor",
            abilities: [
              { name: "Toxic Injection", cost: "1 Mana", type: "Buff", description: "Friendly model within 6\" gains Poison on melee attacks this round" },
              { name: "Adaptive Toxin", cost: "2 Mana", type: "Debuff", description: "Enemy within 12\" suffers -1 TGH. If already Poisoned or Plagued, also -1 ATK" },
            ],
            ultimate: { name: "Perfected Strain", cost: "Once per battle — 3 Mana", type: "Debuff", description: "Enemy within 12\" becomes permanently Plagued and Poisoned. Also -1 ATK, -1 DEF for the rest of the game. No save" },
          },
          {
            name: "Blightcaller",
            abilities: [
              { name: "Blight Spray", cost: "1 Mana", type: "Spell Shoot", description: "Range 8\", STR 3. Target becomes Plagued. Creates Blight token at target's position" },
              { name: "Creeping Death", cost: "2 Mana", type: "Instant", description: "All Blight tokens detonate — enemies within 2\" suffer 1 wound (DEF save) and become Plagued. Tokens not removed" },
            ],
            ultimate: { name: "Wrathgate", cost: "Once per battle — 4 Mana", type: "Blast", description: "Large Blast 5\", Range 18\", STR 5. All hit become Plagued. Creates Blight across blast area. Friendlies also affected" },
          },
        ],
      },
    },
    {
      name: "Deathguard",
      subfaction: "Forsaken",
      tier: "Baseline",
      archetype: "Core Infantry",
      keywords: ["Undead"],
      description: "Rank-and-file soldiers of Undercity. Undead: never break, never heal. 3 loadouts: Sword+Shield (DEF 4+), Dual Blades (4 ATK), Greatsword (AP 1, DMG 2, INI -1). Any loadout can upgrade to Poisoned Blades (+5 pts).",
      equipment: ["Sword+Shield / Dual Blades / Greatsword", "Mail"],
      stats: { MOV: 5, ATK: 3, SKL: 4, STR: 3, TGH: 3, DEF: 5, INI: 3, WND: 2, PTS: 35 },
    },
    {
      name: "Dread Rider",
      subfaction: "Forsaken",
      tier: "Mounted",
      archetype: "Pursuit Cavalry",
      keywords: ["Undead", "Fear"],
      description: "Undead knights on skeletal warhorses. Dread Charge applies Plagued and forces Morale test. Blighted Lance grants Momentum [1] and AP 1 on charge.",
      equipment: ["Sword", "Blighted Lance", "Shield", "Mail"],
      stats: { MOV: 8, ATK: 3, SKL: 4, STR: 4, TGH: 4, DEF: 5, INI: 3, WND: 3, PTS: 65 },
    },
    {
      name: "Dark Ranger",
      subfaction: "Forsaken",
      tier: "Elite",
      archetype: "Elite Ranged / Sniper",
      keywords: ["Undead", "Stealth", "Decisive Blow [1]", "Precision Shot"],
      description: "SKL 2+ — the most accurate ranged unit in the game. Stealth keeps them hidden beyond 12\". Precision Shot picks targets out of melee. Decisive Blow [1] punishes on natural 6s.",
      equipment: ["Longbow", "Dagger", "Leather"],
      stats: { MOV: 6, ATK: 3, SKL: 2, STR: 4, TGH: 3, DEF: 6, INI: 5, WND: 2, PTS: 75 },
    },
    {
      name: "Deathstalker",
      subfaction: "Forsaken",
      tier: "Elite",
      archetype: "Melee Assassin",
      keywords: ["Undead", "Stealth", "Disengage"],
      description: "Stealth in, poisoned blades strike, Disengage out. Poison deals 1 wound at start of victim's next activation. If target is also Plagued, Poison ignores DEF saves.",
      equipment: ["Poisoned Daggers", "Leather"],
      stats: { MOV: 6, ATK: 3, SKL: 3, STR: 3, TGH: 3, DEF: 6, INI: 6, WND: 2, PTS: 70 },
    },
    {
      name: "Abomination",
      subfaction: "Forsaken",
      tier: "Elite",
      archetype: "Heavy Tank / Control",
      keywords: ["Undead", "Cleave", "Fear"],
      description: "Stitched corpse monstrosity. Meat Hook drags enemies into base contact (3+ on D6). Plague Burst on death applies Plagued + 1 wound to nearby non-Undead.",
      equipment: ["Cleaver", "Plate Armor"],
      stats: { MOV: 4, ATK: 3, SKL: 4, STR: 5, TGH: 5, DEF: 4, INI: 1, WND: 5, PTS: 90 },
    },
    {
      name: "Apothecary",
      subfaction: "Forsaken",
      tier: "Elite",
      archetype: "Plague & Poison Support",
      keywords: ["Magical", "Plague"],
      description: "Swiss-army support: hurls Plague Vials (applies Plagued on wound), deploys Blight tokens, and buffs allies with Poison via Toxin Application. Living — tests Morale but can be healed.",
      equipment: ["Plague Staff", "Plague Vial", "Leather"],
      stats: { MOV: 5, ATK: 2, SKL: 4, STR: 3, TGH: 3, DEF: 6, INI: 3, WND: 2, PTS: 55 },
    },
  ],
  composition: [
    { size: "Skirmish (500 pts)", baseline: "3-6", mounted: "0-1", elite: "0-2", hero: "1" },
    { size: "Standard (750 pts)", baseline: "4-8", mounted: "0-2", elite: "1-4", hero: "1-2" },
    { size: "Large (1000+ pts)", baseline: "5-10", mounted: "0-3", elite: "2-5", hero: "2" },
  ],
};

/* ─── SCOURGE ──────────────────────────────────────────────── */

const SCOURGE: Faction = {
  id: "scourge",
  name: "Scourge",
  allegiance: "Scourge",
  icon: "/images/scourge.webp",
  crest: "/images/scourge_crest.webp",
  svgIcon: "/icons/factions/scourge.svg",
  colorKey: "scourge",
  theme: "Undeath incarnate. The Lich King's army of skeletons, ghouls, and necromancers. Relentless, inevitable, endless.",
  playstyle: "Swarm and attrition. Flood the board with cheap Undead that never test Morale. Necromancers raise fallen models as new Skeletons — the army grows as models die. The Scourge doesn't outfight you — it outlasts you.",
  mechanic: {
    name: "Raise Dead",
    description: "When any non-summoned model (friend or foe) is destroyed within 6\" of a surviving Scourge Magical model, spend 1 Mana to place a Skeleton Warrior at the destroyed model's position.",
  },
  strengths: "Entire army immune to Morale, endless summoning/raising, overwhelming activation advantage, Fear on elites, frost debuffs",
  weaknesses: "Cannot heal anything (Undead), individual models weak, no shields, dependent on Heroes/Magical units for Mana, if Necromancers die the engine stops",
  ratings: { offense: 3, defense: 2, magic: 5, speed: 3 },
  units: [
    {
      name: "Death Knight (Mounted)",
      subfaction: "Scourge",
      tier: "Hero",
      archetype: "Heavy Cavalry",
      keywords: ["Undead", "Magical", "Momentum [1]"],
      description: "The Lich King's champion on a deathcharger. Runesword-wielding warrior-caster. Death Coil heals Undead or damages living. Bodyguard: 2 Ghouls. Specs: Unholy or Frost.",
      equipment: ["Runesword", "Death Plate"],
      stats: { MOV: 8, ATK: 4, SKL: 3, STR: 5, TGH: 5, DEF: 4, INI: 3, WND: 7, PTS: 150 },
      heroData: {
        className: "Death Knight",
        classAbility: { name: "Dark Ritual", cost: "Once per game", type: "Instant", description: "Destroy one friendly model within 2\" to immediately gain 5 Mana" },
        globals: [
          { name: "Death Coil", cost: "2 Mana", type: "Spell Shoot", description: "Range 12\", AP 1. Heal a friendly Undead model 2 WND or deal 2 WND to a living model" },
        ],
        specs: [
          {
            name: "Unholy",
            abilities: [
              { name: "Unholy Frenzy", cost: "2 Mana", type: "Buff", description: "Target Undead within 12\" gains +2 ATK but takes 1 Wound at round end" },
              { name: "Necrotic Aura", cost: "Passive", type: "Debuff", description: "6\" Aura. All enemies within take 1 Wound at end of round. Models killed in zone: place Skeleton for 0 Mana" },
            ],
            ultimate: { name: "Army of the Dead", cost: "Once per game", type: "Summon", description: "Destroy all bodyguards. Place 2 Skeleton Warriors within 6\" for each one destroyed" },
          },
          {
            name: "Frost",
            abilities: [
              { name: "Icy Touch", cost: "2 Mana", type: "Spell Shoot", description: "Range 18\". Target cannot use Rush or Charge actions" },
              { name: "Remorseless Winter", cost: "Passive", type: "Debuff", description: "4\" Aura. Enemies suffer -2 INI" },
            ],
            ultimate: { name: "Cold Breath", cost: "Once per game — 4 Mana", type: "Blast", description: "5\" Blast, STR 4, AP 1. Targets failing STR roll are Frozen (Hold only). Sacrifice bodyguard for STR 7" },
          },
        ],
      },
    },
    {
      name: "Death Knight (On Foot)",
      subfaction: "Scourge",
      tier: "Hero",
      archetype: "Heavy Infantry",
      keywords: ["Undead", "Magical"],
      description: "The Lich King's champion on foot. Runesword or Runeblade, can take Shield. Death Coil heals Undead or damages living. Bodyguard: 2 Skeleton Warriors. Specs: Unholy or Frost.",
      equipment: ["Runesword", "Runeblade", "Shield", "Death Plate", "Bone/Chain"],
      stats: { MOV: 5, ATK: 4, SKL: 3, STR: 5, TGH: 5, DEF: 4, INI: 3, WND: 5, PTS: 130 },
      heroData: {
        className: "Death Knight",
        classAbility: { name: "Dark Ritual", cost: "Once per game", type: "Instant", description: "Destroy one friendly model within 2\" to immediately gain 5 Mana" },
        globals: [
          { name: "Death Coil", cost: "2 Mana", type: "Spell Shoot", description: "Range 12\", AP 1. Heal a friendly Undead model 2 WND or deal 2 WND to a living model" },
        ],
        specs: [
          {
            name: "Unholy",
            abilities: [
              { name: "Unholy Frenzy", cost: "2 Mana", type: "Buff", description: "Target Undead within 12\" gains +2 ATK but takes 1 Wound at round end" },
              { name: "Necrotic Aura", cost: "Passive", type: "Debuff", description: "6\" Aura. All enemies within take 1 Wound at end of round. Models killed in zone: place Skeleton for 0 Mana" },
            ],
            ultimate: { name: "Army of the Dead", cost: "Once per game", type: "Summon", description: "Destroy all bodyguards. Place 2 Skeleton Warriors within 6\" for each one destroyed" },
          },
          {
            name: "Frost",
            abilities: [
              { name: "Icy Touch", cost: "2 Mana", type: "Spell Shoot", description: "Range 18\". Target cannot use Rush or Charge actions" },
              { name: "Remorseless Winter", cost: "Passive", type: "Debuff", description: "4\" Aura. Enemies suffer -2 INI" },
            ],
            ultimate: { name: "Cold Breath", cost: "Once per game — 4 Mana", type: "Blast", description: "5\" Blast, STR 4, AP 1. Targets failing STR roll are Frozen (Hold only). Sacrifice bodyguard for STR 7" },
          },
        ],
      },
    },
    {
      name: "Lich",
      subfaction: "Scourge",
      tier: "Hero",
      archetype: "Pure Caster",
      keywords: ["Undead", "Magical"],
      description: "Master of frost magic and necromancy. Frost Nova locks down enemies. Phylactery: when destroyed, roll D6 — on 4+, return at 1 WND within 6\" of a friendly Undead. Bodyguard: 3 Acolytes. Specs: Frost or Necromancy.",
      equipment: ["Bone Staff", "Rags/None"],
      stats: { MOV: 5, ATK: 1, SKL: 3, STR: 2, TGH: 2, DEF: 6, INI: 3, WND: 4, PTS: 120 },
      heroData: {
        className: "Lich",
        classAbility: { name: "Dark Ritual", cost: "Once per game", type: "Instant", description: "Destroy one friendly model within 2\" to immediately gain 5 Mana" },
        globals: [
          { name: "Frost Nova", cost: "2 Mana", type: "Debuff", description: "All enemies within 3\" cannot move next activation" },
        ],
        specs: [
          {
            name: "Frost",
            abilities: [
              { name: "Frostbolt", cost: "2 Mana", type: "Spell Shoot", description: "Range 24\", STR 4, AP 1. Target suffers -2 MOV until end of round" },
              { name: "Frost Armor", cost: "2 Mana", type: "Buff", description: "Target friendly within 6\" gains +2 DEF; attackers in melee suffer -1 ATK until end of round" },
            ],
            ultimate: { name: "Blizzard", cost: "Once per game — 4 Mana", type: "Blast", description: "Large Blast, STR 4, AP 1. All targets cannot move and suffer -2 ATK next round" },
          },
          {
            name: "Necromancy",
            abilities: [
              { name: "Free Raise Dead", cost: "Passive", type: "Buff", description: "Raise Dead costs 0 Mana for models destroyed within 6\" of this Hero" },
              { name: "Corpse Explosion", cost: "2 Mana", type: "Instant", description: "Destroy friendly Undead within 4\". Small Blast, STR 5, AP 1 to all enemies within 3\"" },
            ],
            ultimate: { name: "Mass Raise Dead", cost: "Once per game", type: "Summon", description: "Destroy all bodyguards. Raise ALL destroyed models within 12\" as Skeleton Warriors at no Mana cost" },
          },
        ],
      },
    },
    {
      name: "Skeleton Warrior",
      subfaction: "Scourge",
      tier: "Baseline",
      archetype: "Swarm Melee",
      keywords: ["Undead"],
      description: "The cheapest model in the game. Individually fragile, but Raise Dead creates an endless tide. Immune to Morale — they never break, they just keep coming.",
      equipment: ["Sword", "Bone/Chain", "Shield"],
      stats: { MOV: 4, ATK: 2, SKL: 5, STR: 3, TGH: 2, DEF: 5, INI: 3, WND: 1, PTS: 10 },
    },
    {
      name: "Crypt Fiend",
      subfaction: "Scourge",
      tier: "Baseline",
      archetype: "Ranged / Melee Hybrid",
      keywords: ["Undead", "Spider Climb"],
      description: "Undead nerubians — giant spider-like creatures. Tougher and more versatile than Skeleton Archers. Venom Spit (18\") provides ranged support while Claws fight in melee. Spider Climb ignores terrain penalties. Web grounds a Fly model once per game.",
      equipment: ["Claws", "Venom Spit", "Chitin"],
      stats: { MOV: 6, ATK: 3, SKL: 4, STR: 4, TGH: 4, DEF: 5, INI: 3, WND: 2, PTS: 35 },
    },
    {
      name: "Ghoul",
      subfaction: "Scourge",
      tier: "Baseline",
      archetype: "Fast Aggressive Melee",
      keywords: ["Undead", "Berserker"],
      description: "Fastest Scourge infantry. High ATK and STR for a baseline unit. Berserker pushes wounded Ghouls to 4 ATK dice. Glass cannon — DEF 6+ and WND 2 means they don't survive return fire.",
      equipment: ["Claws", "Rags/None"],
      stats: { MOV: 7, ATK: 3, SKL: 4, STR: 4, TGH: 3, DEF: 6, INI: 4, WND: 2, PTS: 30 },
    },
    {
      name: "Acolyte",
      subfaction: "Scourge",
      tier: "Baseline",
      archetype: "Support / Mana Battery",
      keywords: ["Magical"],
      description: "Living cultists — not Undead. Test Morale normally and can be healed. Provide Magical keyword for Dispels and fuel Raise Dead. As Necromancer bodyguards, generate 1 Mana for every 2 alive.",
      equipment: ["Bone Staff", "Rags/None"],
      stats: { MOV: 5, ATK: 1, SKL: 5, STR: 2, TGH: 3, DEF: 6, INI: 3, WND: 2, PTS: 15 },
    },
    {
      name: "Death Knight (Elite)",
      subfaction: "Scourge",
      tier: "Elite",
      archetype: "Melee Leader",
      keywords: ["Undead", "Magical"],
      description: "Lesser death knights — fallen warriors raised by the Lich King's will. Choose one spec ability: Frost (Frost Strike: -2 MOV, -1 ATK), Unholy (Dark Command: +2 ATK to friendly Undead), or Blood (Death Strike: heal on melee wounds).",
      equipment: ["Rune Sword", "Death Plate"],
      stats: { MOV: 5, ATK: 3, SKL: 3, STR: 5, TGH: 5, DEF: 4, INI: 3, WND: 3, PTS: 75 },
    },
    {
      name: "Necromancer",
      subfaction: "Scourge",
      tier: "Elite",
      archetype: "Caster / Summoner",
      keywords: ["Magical"],
      description: "The Scourge's engine. Living cultist — not Undead. Killing Necromancers cripples the Scourge. Choose spec: Plague (Cripple, Cloud of Disease) or Shadow (Shadow Bolt). Acolyte bodyguards generate Mana.",
      equipment: ["Bone Staff", "Rags/None"],
      stats: { MOV: 5, ATK: 1, SKL: 4, STR: 2, TGH: 3, DEF: 6, INI: 3, WND: 3, PTS: 55 },
    },
    {
      name: "Abomination",
      subfaction: "Scourge",
      tier: "Elite",
      archetype: "Monster",
      keywords: ["Undead", "Cleave", "Fear"],
      description: "Hulking construct of stitched corpses. Slow and inaccurate (SKL 5+) but devastating on contact — STR 7 triggers Armor Piercing against most targets. Plague Burst: on death, all non-Undead within 3\" suffer 1 Wound (no DEF save).",
      equipment: ["Meat Hook", "Death Plate"],
      stats: { MOV: 4, ATK: 4, SKL: 5, STR: 7, TGH: 6, DEF: 4, INI: 1, WND: 7, PTS: 100 },
    },
  ],
  composition: [
    { size: "Skirmish (500 pts)", baseline: "4-6", mounted: "0-1", elite: "0-2", hero: "1" },
    { size: "Standard (750 pts)", baseline: "5-8", mounted: "0-2", elite: "1-3", hero: "1-2" },
    { size: "Large (1000+ pts)", baseline: "6-10", mounted: "1-3", elite: "2-4", hero: "2-3" },
  ],
  specialRules: [
    "Most Scourge models have the Undead keyword: Immune to Morale, cannot be healed, immune to Taunt.",
    "Necromancers and Acolytes are living cultists. They test Morale normally and are the Mana generators. Killing them cripples the Scourge.",
    "Hero Bodyguards: DK (Mounted) gets 2 Ghouls, DK (On Foot) gets 2 Skeletons, Lich gets 3 Acolytes, Necromancer gets 2 Acolytes.",
  ],
};

export const ALL_FACTIONS: Faction[] = [HUMANS, DWARVES, NIGHT_ELVES, ORCS, DARKSPEAR, TAUREN, FORSAKEN, SCOURGE];

export function getFaction(id: string): Faction | undefined {
  return ALL_FACTIONS.find((f) => f.id === id);
}

export function getUnitsByTier(units: Unit[]): Record<string, Unit[]> {
  const tiers: Record<string, Unit[]> = {};
  const order = ["Hero", "Baseline", "Mounted", "Elite"];
  for (const tier of order) {
    const filtered = units.filter((u) => u.tier === tier);
    if (filtered.length > 0) tiers[tier] = filtered;
  }
  return tiers;
}

export function getFactionCSSVars(colorKey: string): { primary: string; accent: string } {
  return {
    primary: `var(--faction-${colorKey})`,
    accent: `var(--faction-${colorKey}-accent)`,
  };
}
