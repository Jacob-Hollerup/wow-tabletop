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
  theme: "Disciplined, versatile, faith-powered. The backbone of the Alliance.",
  playstyle: "Balanced and adaptable. Strong defensive line with heavy armor infantry, supported by paladins and priests. Solid ranged support and good cavalry for flanking. No glaring weakness but no extreme specialty — they win through discipline and flexibility.",
  mechanic: {
    name: "Devotion Auras",
    description: "Buff abilities cast by Human models cost 1 less Mana (minimum 1).",
  },
  strengths: "High DEF across the board, efficient buffs, Taunt paladins, versatile roster",
  weaknesses: "Low INI (heavy armor everywhere), no Regeneration or Berserker, predictable",
  ratings: { offense: 3, defense: 4, magic: 3, speed: 3 },
  units: [
    {
      name: "Paladin",
      subfaction: "Human",
      tier: "Hero",
      archetype: "Tank / Support",
      keywords: ["Taunt", "Magical"],
      description: "Classic Alliance tank. Taunt, healing, blessings. Tough, slow, inspiring.",
      equipment: [],
      stats: { MOV: 5, ATK: 3, SKL: 3, STR: 4, TGH: 5, DEF: 3, INI: 3, WND: 5, PTS: 150 },
      heroData: {
        className: "Paladin",
        classAbility: { name: "Lay on Hands", cost: "Once per game", type: "Instant", description: "Fully heal one friendly model within 2\"" },
        globals: [
          { name: "Holy Light", cost: "2 Mana", type: "Instant", description: "Heal friendly within 6\" for 2 WND" },
          { name: "Blessing of Might", cost: "2 Mana", type: "Buff", description: "Target friendly within 6\" gains +1 ATK" },
        ],
        specs: [
          {
            name: "Protection",
            abilities: [
              { name: "Shield of the Righteous", cost: "1 Mana", type: "Reaction", description: "Negate 1 wound against this model" },
              { name: "Taunt", cost: "Passive", type: "Buff", description: "Gain Taunt keyword" },
            ],
            ultimate: { name: "Divine Shield", cost: "Once per battle", type: "Buff", description: "Immune to all damage until end of round" },
          },
          {
            name: "Holy",
            abilities: [
              { name: "Holy Nova", cost: "2 Mana", type: "Spell Shoot", description: "Damage enemies within 3\", heal friendlies within 3\" for 1 WND" },
              { name: "Aura of Devotion", cost: "2 Mana", type: "Buff", description: "Friendlies within 6\" gain +1 DEF" },
            ],
            ultimate: { name: "Avenging Wrath", cost: "Once per battle", type: "Buff", description: "All abilities cost 0 Mana and +2 ATK dice until end of round" },
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
      description: "Arcane and frost magic. Blizzard, Brilliance Aura. High risk, high reward.",
      equipment: [],
      stats: { MOV: 5, ATK: 2, SKL: 3, STR: 3, TGH: 3, DEF: 5, INI: 4, WND: 4, PTS: 130 },
      heroData: {
        className: "Mage",
        classAbility: { name: "Evocation", cost: "Once per game", type: "Instant", description: "Immediately gain 4 Mana" },
        globals: [
          { name: "Fireball", cost: "2 Mana", type: "Spell Shoot", description: "Fire damage, high STR" },
          { name: "Arcane Intellect", cost: "2 Mana", type: "Buff", description: "Target Magical model generates +1 Mana next turn" },
        ],
        specs: [
          {
            name: "Frost",
            abilities: [
              { name: "Frostbolt", cost: "2 Mana", type: "Spell Shoot", description: "Frost damage + target suffers -2 MOV" },
              { name: "Ice Barrier", cost: "2 Mana", type: "Buff", description: "Self-buff: absorb next 2 wounds" },
            ],
            ultimate: { name: "Blizzard", cost: "Once per battle", type: "Blast", description: "Large Blast, frost damage + all targets cannot move next activation" },
          },
          {
            name: "Arcane",
            abilities: [
              { name: "Arcane Missiles", cost: "2 Mana", type: "Spell Shoot", description: "3 separate STR attacks against one target" },
              { name: "Brilliance Aura", cost: "2 Mana", type: "Buff", description: "Army generates +1 base Mana this round" },
            ],
            ultimate: { name: "Arcane Power", cost: "Once per battle", type: "Buff", description: "Next 3 Spell Shoot abilities deal double damage" },
          },
        ],
      },
    },
    {
      name: "Footman",
      subfaction: "Human",
      tier: "Baseline",
      archetype: "Core Infantry",
      keywords: ["Spell Block"],
      description: "The Alliance backbone. Tough, reliable, high DEF. Spell Block interrupts enemy casters in melee.",
      equipment: ["Sword", "Greatsword", "Halberd", "Shield", "Plate Armor", "Mail"],
      stats: { MOV: 5, ATK: 2, SKL: 4, STR: 3, TGH: 3, DEF: 3, INI: 2, WND: 2, PTS: 45 },
    },
    {
      name: "Knight",
      subfaction: "Human",
      tier: "Mounted",
      archetype: "Heavy Cavalry",
      keywords: ["Momentum [1]"],
      description: "Classic armored charge. High DEF, solid damage on impact.",
      equipment: ["Sword", "Halberd", "Shield", "Plate Armor", "Mail"],
      stats: { MOV: 8, ATK: 3, SKL: 4, STR: 4, TGH: 4, DEF: 3, INI: 3, WND: 3, PTS: 70 },
    },
    {
      name: "Novice Mage",
      subfaction: "Human",
      tier: "Elite",
      archetype: "Caster / Support",
      keywords: ["Magical"],
      description: "Apprentice spellcaster. Basic arcane damage and one cheap buff. Fragile but provides Magical keyword for Mana generation.",
      equipment: ["Staff", "Dagger", "Robes/None"],
      stats: { MOV: 5, ATK: 1, SKL: 4, STR: 3, TGH: 3, DEF: 6, INI: 3, WND: 2, PTS: 55 },
    },
  ],
  composition: [
    { size: "Skirmish (500 pts)", baseline: "3-5", mounted: "0-2", elite: "0-2", hero: "1" },
    { size: "Standard (750 pts)", baseline: "4-7", mounted: "0-3", elite: "1-3", hero: "1-2" },
    { size: "Large (1000+ pts)", baseline: "5-9", mounted: "1-4", elite: "2-5", hero: "2-3" },
  ],
};

const DWARVES: Faction = {
  id: "dwarves",
  name: "Dwarves of Ironforge",
  allegiance: "Alliance",
  icon: "/images/Dwarf_Crest.webp",
  theme: "Stubborn, heavily armed, ranged firepower and aerial prowess.",
  playstyle: "Ranged-dominant with the best guns in the game. Extremely tough and stubborn. Slow-moving but devastating at range. They want to shoot you to pieces before you reach them.",
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
      description: "Storm Bolt, Avatar, Thunder Clap. Frontline disruptor.",
      equipment: [],
      stats: { MOV: 5, ATK: 4, SKL: 3, STR: 5, TGH: 5, DEF: 3, INI: 3, WND: 5, PTS: 145 },
      heroData: {
        className: "Warrior",
        classAbility: { name: "Battle Cry", cost: "Once per game", type: "Buff", description: "All friendly models within 6\" gain +1 ATK die until end of round" },
        globals: [
          { name: "Heroic Strike", cost: "1 Mana", type: "Instant", description: "+2 damage on next melee attack" },
          { name: "Battle Shout", cost: "2 Mana", type: "Buff", description: "Friendlies within 6\" gain +1 ATK" },
        ],
        specs: [
          {
            name: "Arms",
            abilities: [
              { name: "Mortal Strike", cost: "Passive", type: "Debuff", description: "Melee attacks prevent target from healing" },
              { name: "Sweeping Strikes", cost: "Passive", type: "Buff", description: "Gain Cleave keyword" },
            ],
            ultimate: { name: "Bladestorm", cost: "Once per battle", type: "Instant", description: "Attack ALL enemies within 2\", full ATK dice against each" },
          },
          {
            name: "Protection",
            abilities: [
              { name: "Shield Wall", cost: "1 Mana", type: "Reaction", description: "+2 DEF until end of round" },
              { name: "Taunt", cost: "Passive", type: "Buff", description: "Gain Taunt keyword" },
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
      description: "Sturdy ranged specialists. Rifles, crossbows, or stormhammers — the best shots in the Alliance.",
      equipment: ["Rifle", "Crossbow", "Stormhammer", "Dwarven Hammer", "Mail", "Leather"],
      stats: { MOV: 4, ATK: 2, SKL: 3, STR: 3, TGH: 4, DEF: 4, INI: 2, WND: 2, PTS: 50 },
    },
    {
      name: "Gryphon Rider",
      subfaction: "Dwarf",
      tier: "Elite",
      archetype: "Flying Shock Cavalry",
      keywords: ["Fly", "Momentum [1]"],
      description: "Dwarf on a gryphon. Flying charge plus throwing hammer ranged.",
      equipment: ["Dwarven Hammer", "Stormhammer", "Mail"],
      stats: { MOV: 10, ATK: 3, SKL: 3, STR: 4, TGH: 4, DEF: 4, INI: 3, WND: 3, PTS: 95 },
      dualSlot: "Mounted + Elite",
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
      archetype: "Ranged / Caster",
      keywords: ["Magical"],
      description: "Moonfire, Trueshot Aura, owl scout. Mobile ranged Hero.",
      equipment: [],
      stats: { MOV: 7, ATK: 3, SKL: 3, STR: 4, TGH: 3, DEF: 4, INI: 5, WND: 4, PTS: 135 },
      heroData: {
        className: "Hunter",
        classAbility: { name: "Feign Death", cost: "Once per game", type: "Instant", description: "Remove from play, return next activation at full health" },
        globals: [
          { name: "Aimed Shot", cost: "2 Mana", type: "Spell Shoot", description: "+1 to hit, +1 STR ranged attack" },
          { name: "Hunter's Mark", cost: "1 Mana", type: "Debuff", description: "Target suffers -1 DEF until end of round" },
        ],
        specs: [
          {
            name: "Marksmanship",
            abilities: [
              { name: "Precision Shot", cost: "Passive", type: "Buff", description: "Gain Precision Shot keyword" },
              { name: "Steady Shot", cost: "2 Mana", type: "Spell Shoot", description: "+2 to hit ranged, cannot move this activation" },
            ],
            ultimate: { name: "Sniper Shot", cost: "Once per battle", type: "Spell Shoot", description: "Double range, auto-hit, Decisive Blow [3]" },
          },
          {
            name: "Beast Mastery",
            abilities: [
              { name: "Summon Pet", cost: "2 Mana", type: "Summon", description: "Summon beast companion (wolf, bear, or raptor by race)" },
              { name: "Kill Command", cost: "1 Mana", type: "Instant", description: "Summoned pet makes a bonus melee attack out of activation" },
            ],
            ultimate: { name: "Bestial Wrath", cost: "Once per battle", type: "Buff", description: "Summoned pet gains +3 ATK, Berserker, and Fear until end of round" },
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
      description: "Fast, stealthy, dual-role melee and ranged. High INI. Fragile.",
      equipment: ["Dagger", "Throwing Glaive", "Longbow", "Leather"],
      stats: { MOV: 7, ATK: 2, SKL: 4, STR: 3, TGH: 3, DEF: 5, INI: 4, WND: 1, PTS: 40 },
    },
    {
      name: "Druid of the Claw",
      subfaction: "Night Elf",
      tier: "Elite",
      archetype: "Shapeshifter",
      keywords: ["Magical"],
      description: "Choose form at start of each activation. Bear Form: Taunt, high TGH/WND, Regeneration [1]. Cat Form: Disengage, Stealth, Decisive Blow [2].",
      equipment: ["Dagger", "Leather"],
      stats: { MOV: 6, ATK: 3, SKL: 3, STR: 4, TGH: 4, DEF: 4, INI: 4, WND: 3, PTS: 80 },
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
  icon: "/images/Orc_Crest.webp",
  theme: "Savage, honorable, shamanic. Brute force meets elemental magic.",
  playstyle: "Fast and brutal. Highest base ATK/STR and fastest infantry. Berserker keyword on many units — Orcs get stronger as they take damage. Momentum on core units. Close the gap, crash in, overwhelm.",
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
      archetype: "Caster / Summoner",
      keywords: ["Magical", "Summon [3]"],
      description: "Chain Lightning, Feral Spirit (summon spirit wolves), Far Sight. Versatile caster who brings extra bodies.",
      equipment: [],
      stats: { MOV: 5, ATK: 2, SKL: 3, STR: 4, TGH: 4, DEF: 4, INI: 3, WND: 4, PTS: 140 },
      heroData: {
        className: "Shaman",
        classAbility: { name: "Reincarnation", cost: "Once per game", type: "Instant", description: "When destroyed, return next Morale Phase with half WND at same position" },
        globals: [
          { name: "Lightning Bolt", cost: "2 Mana", type: "Spell Shoot", description: "Nature damage" },
          { name: "Healing Wave", cost: "2 Mana", type: "Instant", description: "Restore 2 WND to friendly within 8\"" },
        ],
        specs: [
          {
            name: "Elemental",
            abilities: [
              { name: "Chain Lightning", cost: "3 Mana", type: "Spell Shoot", description: "Hits target, bounces to 1 enemy within 4\" at -1 STR" },
              { name: "Earth Shock", cost: "2 Mana", type: "Instant", description: "Target cannot use abilities next activation" },
            ],
            ultimate: { name: "Earthquake", cost: "Once per battle", type: "Blast", description: "All targets cannot move and suffer -1 ATK next round" },
          },
          {
            name: "Restoration",
            abilities: [
              { name: "Riptide", cost: "1 Mana", type: "Instant", description: "Heal 1 WND + grant Regeneration [1] until end of round" },
              { name: "Spirit Link", cost: "2 Mana", type: "Buff", description: "2 friendlies within 6\" share damage equally until end of round" },
            ],
            ultimate: { name: "Ancestral Spirit", cost: "Once per battle", type: "Instant", description: "All friendly models within 6\" heal 3 WND" },
          },
        ],
      },
    },
    {
      name: "Blademaster",
      subfaction: "Orc",
      tier: "Hero",
      archetype: "Melee Assassin",
      keywords: ["Disengage", "Decisive Blow [2]"],
      description: "Wind Walk, Critical Strike, Mirror Image. Glass cannon Hero — devastating damage but fragile.",
      equipment: [],
      stats: { MOV: 7, ATK: 4, SKL: 3, STR: 5, TGH: 3, DEF: 5, INI: 5, WND: 4, PTS: 145 },
      heroData: {
        className: "Warrior",
        classAbility: { name: "Battle Cry", cost: "Once per game", type: "Buff", description: "All friendly models within 6\" gain +1 ATK die until end of round" },
        globals: [
          { name: "Heroic Strike", cost: "1 Mana", type: "Instant", description: "+2 damage on next melee attack" },
          { name: "Battle Shout", cost: "2 Mana", type: "Buff", description: "Friendlies within 6\" gain +1 ATK" },
        ],
        specs: [
          {
            name: "Arms",
            abilities: [
              { name: "Mortal Strike", cost: "Passive", type: "Debuff", description: "Melee attacks prevent target from healing" },
              { name: "Sweeping Strikes", cost: "Passive", type: "Buff", description: "Gain Cleave keyword" },
            ],
            ultimate: { name: "Bladestorm", cost: "Once per battle", type: "Instant", description: "Attack ALL enemies within 2\", full ATK dice against each" },
          },
          {
            name: "Protection",
            abilities: [
              { name: "Shield Wall", cost: "1 Mana", type: "Reaction", description: "+2 DEF until end of round" },
              { name: "Taunt", cost: "Passive", type: "Buff", description: "Gain Taunt keyword" },
            ],
            ultimate: { name: "Last Stand", cost: "Once per battle", type: "Instant", description: "Restore to full WND and gain +2 DEF until end of round" },
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
      description: "War Cry, Shockwave. Frontline command Hero who leads from the front.",
      equipment: [],
      stats: { MOV: 5, ATK: 4, SKL: 3, STR: 6, TGH: 5, DEF: 4, INI: 3, WND: 6, PTS: 175 },
      heroData: {
        className: "Warrior",
        classAbility: { name: "Battle Cry", cost: "Once per game", type: "Buff", description: "All friendly models within 6\" gain +1 ATK die until end of round" },
        globals: [
          { name: "Heroic Strike", cost: "1 Mana", type: "Instant", description: "+2 damage on next melee attack" },
          { name: "Battle Shout", cost: "2 Mana", type: "Buff", description: "Friendlies within 6\" gain +1 ATK" },
        ],
        specs: [
          {
            name: "Arms",
            abilities: [
              { name: "Mortal Strike", cost: "Passive", type: "Debuff", description: "Melee attacks prevent target from healing" },
              { name: "Sweeping Strikes", cost: "Passive", type: "Buff", description: "Gain Cleave keyword" },
            ],
            ultimate: { name: "Bladestorm", cost: "Once per battle", type: "Instant", description: "Attack ALL enemies within 2\", full ATK dice against each" },
          },
          {
            name: "Protection",
            abilities: [
              { name: "Shield Wall", cost: "1 Mana", type: "Reaction", description: "+2 DEF until end of round" },
              { name: "Taunt", cost: "Passive", type: "Buff", description: "Gain Taunt keyword" },
            ],
            ultimate: { name: "Last Stand", cost: "Once per battle", type: "Instant", description: "Restore to full WND and gain +2 DEF until end of round" },
          },
        ],
      },
    },
    {
      name: "Orc Warrior",
      subfaction: "Orc",
      tier: "Baseline",
      archetype: "Core Infantry",
      keywords: ["Berserker"],
      description: "The Horde backbone. Gets dangerous when wounded.",
      equipment: ["Axe", "Greataxe", "Mace", "Shield", "Chain/Hide", "Leather"],
      stats: { MOV: 5, ATK: 3, SKL: 4, STR: 4, TGH: 3, DEF: 5, INI: 3, WND: 2, PTS: 40 },
    },
    {
      name: "Wolf Rider",
      subfaction: "Orc",
      tier: "Mounted",
      archetype: "Fast Cavalry",
      keywords: ["Momentum [1]", "Berserker"],
      description: "Fast, aggressive, Berserker on a wolf. Classic Horde flanker.",
      equipment: ["Axe", "Throwing Spear", "Shield", "Leather"],
      stats: { MOV: 10, ATK: 3, SKL: 4, STR: 4, TGH: 3, DEF: 5, INI: 4, WND: 2, PTS: 60 },
    },
    {
      name: "Orc Shaman",
      subfaction: "Orc",
      tier: "Elite",
      archetype: "Caster / Support",
      keywords: ["Magical"],
      description: "Battlefield caster. Lightning, totems, elemental buffs. Provides Magical keyword for Mana and Dispel.",
      equipment: ["Staff", "Mace", "Shield", "Chain/Hide", "Leather"],
      stats: { MOV: 5, ATK: 2, SKL: 4, STR: 3, TGH: 4, DEF: 5, INI: 3, WND: 3, PTS: 65 },
    },
    {
      name: "Wind Rider",
      subfaction: "Orc",
      tier: "Elite",
      archetype: "Flying Shock",
      keywords: ["Fly", "Momentum [1]"],
      description: "Orc on a wyvern. Flying charge plus envenomed spear ranged.",
      equipment: ["Throwing Spear", "Axe", "Chain/Hide"],
      stats: { MOV: 10, ATK: 3, SKL: 4, STR: 4, TGH: 4, DEF: 5, INI: 3, WND: 3, PTS: 90 },
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
      description: "Hex, Healing Wave, Big Bad Voodoo. The Horde's voodoo master.",
      equipment: [],
      stats: { MOV: 6, ATK: 2, SKL: 3, STR: 4, TGH: 3, DEF: 5, INI: 4, WND: 4, PTS: 130 },
      heroData: {
        className: "Shadow Hunter",
        classAbility: { name: "Big Bad Voodoo", cost: "Once per game", type: "Buff", description: "All friendly models within 4\" become immune to damage until end of round" },
        globals: [
          { name: "Hex", cost: "2 Mana", type: "Debuff", description: "Target cannot attack for 1 activation" },
          { name: "Healing Wave", cost: "2 Mana", type: "Instant", description: "Restore 2 WND to friendly within 8\"" },
        ],
        specs: [
          {
            name: "Voodoo",
            abilities: [
              { name: "Serpent Ward", cost: "2 Mana", type: "Summon", description: "Place a ward that makes a ranged attack each round" },
              { name: "Healing Ward", cost: "2 Mana", type: "Summon", description: "Place a ward that heals 1 WND to nearest friendly each round" },
            ],
            ultimate: { name: "Voodoo Frenzy", cost: "Once per battle", type: "Buff", description: "All friendly within 6\" gain +1 ATK and Regeneration [1]" },
          },
          {
            name: "Shadow",
            abilities: [
              { name: "Shadow Strike", cost: "2 Mana", type: "Spell Shoot", description: "High damage + target suffers -2 MOV" },
              { name: "Curse of Weakness", cost: "1 Mana", type: "Debuff", description: "Target suffers -1 ATK until end of round" },
            ],
            ultimate: { name: "Curse of Doom", cost: "Once per battle", type: "Debuff", description: "Debuff on target — after 2 rounds, takes D6 wounds, no save" },
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
      description: "Heals every turn and gets angrier as it bleeds. Light armor but incredibly hard to put down.",
      equipment: ["Axe", "Dagger", "Leather"],
      stats: { MOV: 6, ATK: 3, SKL: 4, STR: 3, TGH: 3, DEF: 5, INI: 3, WND: 2, PTS: 40 },
    },
    {
      name: "Headhunter",
      subfaction: "Troll",
      tier: "Baseline",
      archetype: "Ranged Skirmisher",
      keywords: ["Berserker"],
      description: "Troll throwing axe specialists. Short range but high Ranged STR.",
      equipment: ["Throwing Axe", "Dagger", "Leather"],
      stats: { MOV: 6, ATK: 2, SKL: 4, STR: 4, TGH: 3, DEF: 5, INI: 3, WND: 1, PTS: 35 },
    },
    {
      name: "Witch Doctor",
      subfaction: "Troll",
      tier: "Elite",
      archetype: "Caster / Support",
      keywords: ["Magical"],
      description: "Ward summons, voodoo debuffs. Fragile but high utility.",
      equipment: ["Staff", "Dagger", "Leather"],
      stats: { MOV: 5, ATK: 1, SKL: 4, STR: 3, TGH: 3, DEF: 6, INI: 3, WND: 2, PTS: 55 },
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
  theme: "Mighty, spiritual, nature-guardians. Walking walls of muscle.",
  playstyle: "Elite-heavy, low model count. Every Tauren is big, tough, and hits hard. Highest base TGH and WND in the game. Cleave keyword sweeps through clusters. They don't have many models, but each one is a serious threat.",
  mechanic: {
    name: "War Stomp",
    description: "Once per round, one Tauren model may declare War Stomp during its activation. All enemies within 2\" suffer -1 to hit on their next activation. Free, no Mana cost.",
  },
  strengths: "Toughest models in the game, Cleave everywhere, War Stomp disruption, excellent tanks, totem buffs",
  weaknesses: "Very low model count (expensive), slow, no flying, limited ranged options, vulnerable to being outnumbered",
  ratings: { offense: 4, defense: 5, magic: 3, speed: 2 },
  units: [],
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
  theme: "Cunning, vengeful, plague and shadow. The dead who chose to fight back.",
  playstyle: "Attrition and debuff-focused. Plague mechanics weaken enemies over time. Some models are Undead (immune to Morale, can't heal), others are living. Val'kyr is the only model that can heal Undead — a high-priority target.",
  mechanic: {
    name: "Blight",
    description: "Forsaken models with the Plague keyword can leave Blight tokens when they activate. Enemies that move through or end on Blight suffer 1 automatic wound (DEF save allowed). Blight persists for 2 rounds.",
  },
  strengths: "Debuffs that cripple enemy stats, Blight area denial, Stealth assassins, best ranged accuracy (SKL 2+), Undead ignore Morale",
  weaknesses: "Low raw damage (rely on debuffs first), Undead can't heal except by Val'kyr, split Morale mechanics, moderate stats",
  ratings: { offense: 2, defense: 3, magic: 4, speed: 3 },
  units: [
    {
      name: "Dark Lady",
      subfaction: "Forsaken",
      tier: "Hero",
      archetype: "Ranged / Commander",
      keywords: ["Magical", "Undead", "Stealth", "Decisive Blow [2]"],
      description: "The Forsaken's supreme commander. Black Arrow corrupts targets with Shadow Wound. Charm dominates enemy models. As Undead she never breaks — but can only be healed by Val'kyr.",
      equipment: ["Longbow", "Dagger", "Leather"],
      stats: { MOV: 6, ATK: 3, SKL: 2, STR: 4, TGH: 3, DEF: 5, INI: 6, WND: 4, PTS: 140 },
      heroData: {
        className: "Dark Ranger",
        classAbility: { name: "Charm", cost: "Once per game", type: "Instant", description: "Target enemy non-Hero within 8\" switches sides for 1 round, then destroyed" },
        globals: [
          { name: "Black Arrow", cost: "2 Mana", type: "Buff", description: "Self. Ranged attacks apply Shadow Wound: -1 DEF, can't heal/Regenerate until end of next round" },
          { name: "Hunter's Mark", cost: "1 Mana", type: "Debuff", description: "Enemy within 18\" suffers -1 DEF. All friendly Forsaken gain +1 to hit vs marked target" },
        ],
        specs: [
          {
            name: "Dark Ranger",
            abilities: [
              { name: "Silence", cost: "2 Mana", type: "Debuff", description: "Enemy within 12\" cannot use abilities until end of round" },
              { name: "Dark Pursuit", cost: "1 Mana", type: "Buff", description: "Gain Stealth and Disengage until this Hero attacks" },
            ],
            ultimate: { name: "Withering Volley", cost: "Once per battle — 3 Mana", type: "Blast", description: "Small Blast 3\", STR 5, Range 24\". All hit suffer -1 TGH for the rest of the game" },
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
      description: "Royal Apothecary Society's supreme alchemist. Plague bombs, mass debuffs, Blight network detonation. Living (not Undead) — tests Morale. New Plague permanently cripples enemy stats.",
      equipment: ["Staff", "Dagger", "Robes/None"],
      stats: { MOV: 5, ATK: 2, SKL: 4, STR: 3, TGH: 3, DEF: 5, INI: 3, WND: 3, PTS: 120 },
      heroData: {
        className: "Apothecary",
        classAbility: { name: "New Plague", cost: "Once per game", type: "Blast", description: "Large Blast 5\", Range 12\". All enemies hit suffer -1 TGH AND -1 ATK for the rest of the game. No save" },
        globals: [
          { name: "Plague Bomb", cost: "2 Mana", type: "Blast", description: "Small Blast 3\", Range 12\", STR 3. Creates Blight token at impact" },
          { name: "Miasma", cost: "1 Mana", type: "Debuff", description: "All enemies within 3\" suffer -1 to hit rolls until end of round" },
        ],
        specs: [
          {
            name: "Plague Doctor",
            abilities: [
              { name: "Toxic Injection", cost: "1 Mana", type: "Buff", description: "Friendly model within 6\" gains Poison on melee attacks this round" },
              { name: "Adaptive Toxin", cost: "2 Mana", type: "Debuff", description: "Enemy within 12\" suffers -1 TGH. If already Poisoned/Blighted, also -1 ATK" },
            ],
            ultimate: { name: "Perfected Strain", cost: "Once per battle — 3 Mana", type: "Debuff", description: "Enemy within 12\" suffers -2 TGH, -1 ATK, -1 DEF for the rest of the game. No save" },
          },
          {
            name: "Blightcaller",
            abilities: [
              { name: "Blight Spray", cost: "1 Mana", type: "Spell Shoot", description: "Range 8\", STR 3. Creates Blight token at target's position" },
              { name: "Creeping Death", cost: "2 Mana", type: "Instant", description: "All Blight tokens detonate — enemies within 2\" of any token suffer 1 wound (DEF save)" },
            ],
            ultimate: { name: "Wrathgate", cost: "Once per battle — 4 Mana", type: "Blast", description: "Large Blast 5\", Range 18\", STR 5. Creates Blight across blast area. Friendlies also affected" },
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
      description: "Rank-and-file soldiers of Undercity. Undead means they never break but never heal. Relentless and fearless.",
      equipment: ["Sword", "Axe", "Shield", "Mail", "Leather"],
      stats: { MOV: 5, ATK: 2, SKL: 4, STR: 3, TGH: 3, DEF: 5, INI: 3, WND: 2, PTS: 35 },
    },
    {
      name: "Plague Spreader",
      subfaction: "Forsaken",
      tier: "Baseline",
      archetype: "Debuff Ranged",
      keywords: ["Undead", "Plague"],
      description: "Short-range plague vials that degrade enemy TGH on hit. The only Baseline unit in the game that debuffs enemy stats.",
      equipment: ["Plague Vial", "Dagger", "Leather"],
      stats: { MOV: 5, ATK: 2, SKL: 4, STR: 3, TGH: 3, DEF: 6, INI: 3, WND: 2, PTS: 40 },
    },
    {
      name: "Dread Rider",
      subfaction: "Forsaken",
      tier: "Mounted",
      archetype: "Pursuit Cavalry",
      keywords: ["Undead", "Fear"],
      description: "Undead knights on skeletal warhorses. Relentless pursuers with Fear aura. Dread Charge forces Morale tests on impact.",
      equipment: ["Sword", "Lance", "Shield", "Mail"],
      stats: { MOV: 8, ATK: 3, SKL: 4, STR: 4, TGH: 4, DEF: 5, INI: 3, WND: 3, PTS: 65 },
    },
    {
      name: "Dark Ranger",
      subfaction: "Forsaken",
      tier: "Elite",
      archetype: "Stealth Sniper",
      keywords: ["Undead", "Stealth", "Decisive Blow [1]", "Precision Shot"],
      description: "SKL 2+ — the most accurate ranged unit in the game. Stealth keeps them hidden. Precision Shot picks targets out of melee.",
      equipment: ["Longbow", "Dagger", "Leather"],
      stats: { MOV: 6, ATK: 3, SKL: 2, STR: 3, TGH: 3, DEF: 6, INI: 5, WND: 2, PTS: 75 },
    },
    {
      name: "Deathstalker",
      subfaction: "Forsaken",
      tier: "Elite",
      archetype: "Poison Assassin",
      keywords: ["Undead", "Stealth", "Disengage"],
      description: "Forsaken rogues. Stealth in, poison blades strike, Disengage out. Unique Poison DoT — the only persistent melee damage in the game.",
      equipment: ["Dagger", "Dagger", "Leather"],
      stats: { MOV: 6, ATK: 3, SKL: 3, STR: 3, TGH: 3, DEF: 6, INI: 6, WND: 2, PTS: 70 },
    },
    {
      name: "Abomination",
      subfaction: "Forsaken",
      tier: "Elite",
      archetype: "Heavy Tank / Control",
      keywords: ["Undead", "Cleave", "Fear"],
      description: "Stitched corpse monstrosity. Massive HP, Meat Hook drags enemies into base contact — the only forced repositioning in the game.",
      equipment: ["Cleaver", "Meat Hook", "Plate Armor"],
      stats: { MOV: 4, ATK: 3, SKL: 4, STR: 5, TGH: 5, DEF: 4, INI: 1, WND: 5, PTS: 90 },
    },
    {
      name: "Apothecary",
      subfaction: "Forsaken",
      tier: "Elite",
      archetype: "Plague Support",
      keywords: ["Magical", "Plague"],
      description: "Royal Apothecary Society alchemists. Deploy Blight tokens for area denial. Living — tests Morale but can be healed.",
      equipment: ["Dagger", "Staff", "Leather"],
      stats: { MOV: 5, ATK: 2, SKL: 4, STR: 3, TGH: 3, DEF: 6, INI: 3, WND: 2, PTS: 55 },
    },
    {
      name: "Val'kyr",
      subfaction: "Forsaken",
      tier: "Elite",
      archetype: "Shadow Support Flyer",
      keywords: ["Undead", "Fly", "Magical"],
      description: "The only model in the game that can heal Undead via Shadow Mend. High-priority target — kill her and the Forsaken lose their lifeline.",
      equipment: [],
      stats: { MOV: 8, ATK: 2, SKL: 4, STR: 3, TGH: 3, DEF: 6, INI: 5, WND: 3, PTS: 85 },
    },
    {
      name: "Dread Guard",
      subfaction: "Forsaken",
      tier: "Elite",
      archetype: "Heavy Melee",
      keywords: ["Undead", "Fear"],
      description: "Elite Forsaken warriors in heavy mail. Tougher than any other Forsaken infantry, they anchor the line so Dark Rangers and Deathstalkers can work.",
      equipment: ["Sword", "Axe", "Greataxe", "Mace", "Shield", "Heavy Mail"],
      stats: { MOV: 5, ATK: 3, SKL: 3, STR: 4, TGH: 4, DEF: 4, INI: 3, WND: 3, PTS: 65 },
    },
  ],
  composition: [
    { size: "Skirmish (500 pts)", baseline: "3-5", mounted: "0-1", elite: "0-2", hero: "1" },
    { size: "Standard (750 pts)", baseline: "4-7", mounted: "0-2", elite: "1-4", hero: "1-2" },
    { size: "Large (1000+ pts)", baseline: "5-9", mounted: "0-3", elite: "2-5", hero: "2-3" },
  ],
};

/* ─── SCOURGE ──────────────────────────────────────────────── */

const SCOURGE: Faction = {
  id: "scourge",
  name: "Scourge",
  allegiance: "Scourge",
  icon: "/images/scourge.webp",
  theme: "Undeath incarnate. The Lich King's army of skeletons, ghouls, and necromancers. Relentless, inevitable, endless.",
  playstyle: "Swarm and attrition. Flood the board with cheap Undead that never test Morale. Necromancers raise fallen models as new Skeletons — the army grows as models die. The Scourge doesn't outfight you — it outlasts you.",
  mechanic: {
    name: "Raise Dead",
    description: "When any non-summoned model (friend or foe) is destroyed within 6\" of a surviving Scourge Magical model, spend 1 Mana to place a Skeleton Warrior at the destroyed model's position. Permanent. No limit per round.",
  },
  strengths: "Entire army immune to Morale, endless summoning/raising, overwhelming activation advantage, Fear on elites, frost debuffs",
  weaknesses: "Cannot heal anything (Undead), individual models weak, no shields, dependent on Heroes/Magical units for Mana, if Necromancers die the engine stops",
  ratings: { offense: 3, defense: 2, magic: 5, speed: 3 },
  units: [
    {
      name: "Death Knight",
      subfaction: "Scourge",
      tier: "Hero",
      archetype: "Melee / Caster",
      keywords: ["Undead", "Magical"],
      description: "The Lich King's champions. Runesword-wielding warrior-casters. Death Coil, Unholy Aura. Specs: Frost or Unholy.",
      equipment: [],
      stats: { MOV: 5, ATK: 4, SKL: 3, STR: 5, TGH: 5, DEF: 3, INI: 3, WND: 5, PTS: 160 },
      heroData: {
        className: "Death Knight",
        classAbility: { name: "Army of the Dead", cost: "Once per game", type: "Summon", description: "Summon 3 Skeleton Warriors within 6\" of this Hero" },
        globals: [
          { name: "Death Coil", cost: "2 Mana", type: "Spell Shoot", description: "Damage enemy OR heal friendly Undead 2 WND" },
          { name: "Unholy Aura", cost: "2 Mana", type: "Buff", description: "Friendlies within 6\" gain +1 MOV" },
        ],
        specs: [
          {
            name: "Frost",
            abilities: [
              { name: "Frost Strike", cost: "Passive", type: "Debuff", description: "Melee attacks apply -2 MOV to target" },
              { name: "Icy Touch", cost: "2 Mana", type: "Spell Shoot", description: "Frost damage, target suffers -1 ATK" },
            ],
            ultimate: { name: "Remorseless Winter", cost: "Once per battle", type: "Debuff", description: "Enemies within 3\" take 2 wounds and cannot move for 1 round" },
          },
          {
            name: "Unholy",
            abilities: [
              { name: "Animate Dead", cost: "0 Mana", type: "Summon", description: "Raise destroyed model as Skeleton, once per round" },
              { name: "Death Pact", cost: "1 Mana", type: "Instant", description: "Sacrifice friendly Undead within 2\" to restore this Hero to full WND" },
            ],
            ultimate: { name: "Apocalypse", cost: "Once per battle", type: "Instant", description: "All enemies within 4\" take D3 wounds, no save. Raise a Skeleton for each model killed" },
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
      description: "Master of frost magic and necromancy. Frost Nova, Dark Ritual. Fragile but the Scourge's most powerful spellcaster. Specs: Frost or Necromancy.",
      equipment: [],
      stats: { MOV: 5, ATK: 1, SKL: 3, STR: 3, TGH: 3, DEF: 5, INI: 3, WND: 4, PTS: 140 },
      heroData: {
        className: "Lich",
        classAbility: { name: "Dark Ritual", cost: "Once per game", type: "Instant", description: "Destroy one friendly model within 2\" and gain 5 Mana" },
        globals: [
          { name: "Frost Nova", cost: "2 Mana", type: "Debuff", description: "Enemies within 3\" cannot move next activation" },
          { name: "Frost Armor", cost: "2 Mana", type: "Buff", description: "Target gains +2 DEF, attackers suffer -1 ATK" },
        ],
        specs: [
          {
            name: "Frost",
            abilities: [
              { name: "Frostbolt", cost: "2 Mana", type: "Spell Shoot", description: "Frost damage + target suffers -2 MOV" },
              { name: "Ice Shard", cost: "3 Mana", type: "Spell Shoot", description: "High damage single target, Decisive Blow [2]" },
            ],
            ultimate: { name: "Blizzard", cost: "Once per battle", type: "Blast", description: "All targets cannot move and suffer -2 ATK next round" },
          },
          {
            name: "Necromancy",
            abilities: [
              { name: "Free Raise Dead", cost: "Passive", type: "Buff", description: "Raise Dead costs 0 Mana within 6\" of this Hero" },
              { name: "Corpse Explosion", cost: "2 Mana", type: "Instant", description: "Destroy friendly Undead within 4\", Small Blast damage to all enemies within 3\"" },
            ],
            ultimate: { name: "Mass Raise Dead", cost: "Once per battle", type: "Summon", description: "Raise ALL destroyed models within 12\" as Skeleton Warriors, no Mana cost" },
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
      description: "The cheapest model in the game. Weak individually, overwhelming in numbers. Also created by Raise Dead.",
      equipment: ["Runesword", "Bone Staff", "Shield", "Bone/Chain", "Rags/None"],
      stats: { MOV: 4, ATK: 2, SKL: 5, STR: 3, TGH: 3, DEF: 5, INI: 2, WND: 1, PTS: 25 },
    },
    {
      name: "Skeleton Archer",
      subfaction: "Scourge",
      tier: "Baseline",
      archetype: "Swarm Ranged",
      keywords: ["Undead"],
      description: "Basic ranged support. Inaccurate but provides volume of fire and board presence.",
      equipment: ["Bone Bow", "Rags/None"],
      stats: { MOV: 4, ATK: 2, SKL: 5, STR: 2, TGH: 3, DEF: 6, INI: 2, WND: 1, PTS: 25 },
    },
    {
      name: "Ghoul",
      subfaction: "Scourge",
      tier: "Baseline",
      archetype: "Fast Melee",
      keywords: ["Undead", "Berserker"],
      description: "Fast, vicious, expendable. Berserker makes wounded ghouls dangerous.",
      equipment: ["Claws", "Rags/None"],
      stats: { MOV: 7, ATK: 3, SKL: 4, STR: 3, TGH: 3, DEF: 6, INI: 4, WND: 1, PTS: 30 },
    },
    {
      name: "Acolyte",
      subfaction: "Scourge",
      tier: "Baseline",
      archetype: "Support / Mana Battery",
      keywords: ["Magical"],
      description: "Living cultist — not Undead. Tests Morale normally. Provides Magical keyword for Mana generation. Protect them.",
      equipment: ["Bone Staff", "Rags/None"],
      stats: { MOV: 5, ATK: 1, SKL: 5, STR: 2, TGH: 3, DEF: 6, INI: 2, WND: 1, PTS: 30 },
    },
    {
      name: "Death Knight (Mounted)",
      subfaction: "Scourge",
      tier: "Mounted",
      archetype: "Heavy Cavalry",
      keywords: ["Undead", "Momentum [1]"],
      description: "Death Knight on a skeletal steed. Elite-level stats in a Mounted slot.",
      equipment: ["Runesword", "Runeblade", "Shield", "Death Plate", "Bone/Chain"],
      stats: { MOV: 8, ATK: 4, SKL: 3, STR: 5, TGH: 5, DEF: 3, INI: 3, WND: 3, PTS: 90 },
    },
    {
      name: "Death Knight (On Foot)",
      subfaction: "Scourge",
      tier: "Elite",
      archetype: "Heavy Infantry",
      keywords: ["Undead"],
      description: "Dismounted Death Knight. Slower but tougher. A walking wall of runic plate.",
      equipment: ["Runesword", "Runeblade", "Shield", "Death Plate", "Bone/Chain"],
      stats: { MOV: 5, ATK: 3, SKL: 3, STR: 5, TGH: 5, DEF: 3, INI: 2, WND: 4, PTS: 75 },
    },
    {
      name: "Necromancer",
      subfaction: "Scourge",
      tier: "Elite",
      archetype: "Caster / Summoner",
      keywords: ["Magical", "Summon [4]"],
      description: "The Scourge's engine. Not Undead — living cultist. Killing Necromancers cripples the Scourge.",
      equipment: ["Bone Staff", "Rags/None"],
      stats: { MOV: 5, ATK: 1, SKL: 4, STR: 3, TGH: 3, DEF: 5, INI: 3, WND: 3, PTS: 70 },
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
    "Cheap Baseline units + Raise Dead means the Scourge often has more activations than the opponent.",
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
