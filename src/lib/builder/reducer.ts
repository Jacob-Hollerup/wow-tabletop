import type { BuilderState, BuilderAction, RosterUnit } from "./types";

export function builderReducer(state: BuilderState, action: BuilderAction): BuilderState {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.name, isDirty: true };

    case "SET_BATTLE_SIZE":
      return { ...state, battleSize: action.size, isDirty: true };

    case "SET_NOTES":
      return { ...state, notes: action.notes, isDirty: true };

    case "ADD_UNIT": {
      const newUnit: RosterUnit = {
        id: crypto.randomUUID(),
        unitName: action.unitName,
        loadout: null,
        heroSpec: null,
        heroLevel: action.isHero ? 1 : null,
        sortOrder: state.units.length,
      };
      return { ...state, units: [...state.units, newUnit], isDirty: true };
    }

    case "REMOVE_UNIT":
      return {
        ...state,
        units: state.units.filter((u) => u.id !== action.unitId),
        isDirty: true,
      };

    case "SET_LOADOUT":
      return {
        ...state,
        units: state.units.map((u) =>
          u.id === action.unitId ? { ...u, loadout: action.loadout } : u,
        ),
        isDirty: true,
      };

    case "SET_HERO_SPEC":
      return {
        ...state,
        units: state.units.map((u) =>
          u.id === action.unitId ? { ...u, heroSpec: action.spec } : u,
        ),
        isDirty: true,
      };

    case "SET_HERO_LEVEL":
      return {
        ...state,
        units: state.units.map((u) =>
          u.id === action.unitId ? { ...u, heroLevel: action.level } : u,
        ),
        isDirty: true,
      };

    case "REORDER_UNITS": {
      const ordered = action.unitIds
        .map((id, i) => {
          const unit = state.units.find((u) => u.id === id);
          return unit ? { ...unit, sortOrder: i } : null;
        })
        .filter((u): u is RosterUnit => u !== null);
      return { ...state, units: ordered, isDirty: true };
    }

    case "SAVE_START":
      return { ...state, isSaving: true };

    case "SAVE_SUCCESS":
      return { ...state, isSaving: false, isDirty: false, lastSavedAt: action.savedAt };

    case "SAVE_ERROR":
      return { ...state, isSaving: false };

    case "HYDRATE":
      return { ...state, ...action.state, isDirty: false };

    default:
      return state;
  }
}

export function createInitialState(
  armyListId: string,
  factionId: string,
): BuilderState {
  return {
    armyListId,
    name: "Untitled Army",
    factionId,
    battleSize: "standard",
    notes: "",
    units: [],
    isDirty: false,
    isSaving: false,
    lastSavedAt: null,
  };
}
