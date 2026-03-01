import type { UnitStats } from "@/lib/factions";

// --- Loadout (added to Unit type in factions/types.ts) ---

export interface Loadout {
  name: string;
  equipment: string[];
  statOverrides: Partial<UnitStats>;
}

// --- Builder state ---

export type BattleSize = "skirmish" | "standard" | "large";

export interface RosterUnit {
  id: string;
  unitName: string;
  loadout: string | null;
  heroSpec: string | null;
  heroLevel: number | null;
  sortOrder: number;
}

export interface BuilderState {
  armyListId: string;
  name: string;
  factionId: string;
  battleSize: BattleSize;
  notes: string;
  units: RosterUnit[];
  isDirty: boolean;
  isSaving: boolean;
  lastSavedAt: Date | null;
}

// --- Actions ---

export type BuilderAction =
  | { type: "SET_NAME"; name: string }
  | { type: "SET_BATTLE_SIZE"; size: BattleSize }
  | { type: "SET_NOTES"; notes: string }
  | { type: "ADD_UNIT"; unitName: string; isHero?: boolean }
  | { type: "REMOVE_UNIT"; unitId: string }
  | { type: "SET_LOADOUT"; unitId: string; loadout: string }
  | { type: "SET_HERO_SPEC"; unitId: string; spec: string }
  | { type: "SET_HERO_LEVEL"; unitId: string; level: number }
  | { type: "REORDER_UNITS"; unitIds: string[] }
  | { type: "SAVE_START" }
  | { type: "SAVE_SUCCESS"; savedAt: Date }
  | { type: "SAVE_ERROR" }
  | { type: "HYDRATE"; state: Partial<BuilderState> };

// --- Validation ---

export interface ValidationError {
  type: "error" | "warning";
  message: string;
  unitId?: string;
}

// --- DB row shapes (from Supabase) ---

export interface ArmyListRow {
  id: string;
  user_id: string;
  name: string;
  faction_id: string;
  battle_size: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ArmyListUnitRow {
  id: string;
  army_list_id: string;
  unit_name: string;
  loadout: string | null;
  hero_spec: string | null;
  hero_level: number | null;
  sort_order: number;
  created_at: string;
}

export interface ArmyListWithUnits extends ArmyListRow {
  army_list_units: ArmyListUnitRow[];
}

// --- Battle size config ---

export const BATTLE_SIZE_CONFIG: Record<BattleSize, { label: string; points: number }> = {
  skirmish: { label: "Skirmish", points: 500 },
  standard: { label: "Standard", points: 750 },
  large: { label: "Large", points: 1000 },
};
