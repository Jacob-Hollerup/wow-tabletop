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

export interface RetinueData {
  unitName: string;       // name of the retinue unit (e.g. "Footman", "Kor'kron Elite")
  min: number;            // minimum retinue count
  max: number;            // maximum retinue count
  specialRule?: string;   // faction-specific retinue rule (e.g. "Shatter Soul")
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
  isBaseUnit?: boolean;  // shared across all subfactions in the grand faction
  retinue?: RetinueData; // optional bodyguard/retinue attachment
}

export type GrandFactionId = "alliance" | "horde" | "scourge" | "burning-legion" | "void";

export interface GrandFaction {
  id: GrandFactionId;
  name: string;
  colorVar: string;        // CSS variable name, e.g. "--alliance"
  accentVar: string;       // e.g. "--alliance-accent"
  darkVar: string;         // e.g. "--alliance-dark"
  description: string;
  baseFactionId: string;   // subfaction that provides base battleline, e.g. "humans"
  mechanic?: { name: string; description: string };  // grand faction mechanic (inherited by all subfactions)
  crest?: string;          // path to grand faction crest image
  subfactionIds: string[];
  comingSoon?: boolean;
}

export interface Faction {
  id: string;
  name: string;
  grandFaction: GrandFactionId;
  allegiance: "Alliance" | "Horde" | "Scourge";  // kept for backwards compat
  icon: string;
  crest: string;
  colorKey: string;
  theme: string;
  playstyle: string;
  mechanic: { name: string; description: string };  // subfaction-specific mechanic
  strengths: string;
  weaknesses: string;
  ratings: { offense: number; defense: number; magic: number; speed: number };
  units: Unit[];
  composition: { size: string; baseline: string; mounted: string; elite: string; hero: string }[];
  specialRules?: string[];
  isBase?: boolean;  // true if this subfaction IS the grand faction base (e.g. humans for alliance)
  upcoming?: boolean;        // army book still in progress — show "Upcoming" badge
  upcomingHint?: string;     // short explanation shown on the card
}
