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
  abilities: HeroAbility[];   // Lv.1 spec + Lv.2 spec abilities
  ultimate: HeroAbility;      // Lv.3 once-per-battle
}

export interface HeroClassData {
  className: string;
  classAbility: HeroAbility;  // once per game (shared)
  globals: HeroAbility[];     // Lv.1 global + Lv.2 global (shared)
  specs: HeroSpec[];           // spec options (typically 2-3)
}

export interface Loadout {
  name: string;
  equipment: string[];
  statOverrides: Partial<UnitStats>;
}

export interface Unit {
  name: string;
  subfaction: string;
  tier: string;
  archetype: string;
  keywords: string[];
  description: string;
  equipment: string[];
  loadouts?: Loadout[];
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
