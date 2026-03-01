"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import type { Faction } from "@/lib/factions";
import {
  type BuilderState,
  type BuilderAction,
  type ValidationError,
  type RosterUnit,
  type BattleSize,
  builderReducer,
  createInitialState,
  validateArmy,
  computeTotalPoints,
  computeTierCounts,
  computeManaGeneration,
  BATTLE_SIZE_CONFIG,
} from "@/lib/builder";
import { saveArmyList } from "@/lib/builder/actions";

interface BuilderContextValue {
  state: BuilderState;
  dispatch: React.Dispatch<BuilderAction>;
  faction: Faction;
  totalPoints: number;
  pointsBudget: number;
  tierCounts: Record<string, number>;
  manaGeneration: number;
  errors: ValidationError[];
  hasErrors: boolean;
}

const BuilderContext = createContext<BuilderContextValue | null>(null);

export function useBuilder() {
  const ctx = useContext(BuilderContext);
  if (!ctx) throw new Error("useBuilder must be used within ArmyBuilderProvider");
  return ctx;
}

interface Props {
  children: React.ReactNode;
  faction: Faction;
  initialState: BuilderState;
}

export default function ArmyBuilderProvider({ children, faction, initialState }: Props) {
  const [state, dispatch] = useReducer(builderReducer, initialState);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-save on dirty state (2s debounce)
  useEffect(() => {
    if (!state.isDirty) return;

    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);

    saveTimerRef.current = setTimeout(async () => {
      dispatch({ type: "SAVE_START" });
      try {
        await saveArmyList(state.armyListId, {
          name: state.name,
          battle_size: state.battleSize,
          notes: state.notes,
          units: state.units,
        });
        dispatch({ type: "SAVE_SUCCESS", savedAt: new Date() });
      } catch {
        dispatch({ type: "SAVE_ERROR" });
      }
    }, 2000);

    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [state.isDirty, state.name, state.battleSize, state.notes, state.units, state.armyListId]);

  const totalPoints = useMemo(
    () => computeTotalPoints(state.units, faction),
    [state.units, faction],
  );

  const pointsBudget = BATTLE_SIZE_CONFIG[state.battleSize].points;

  const tierCounts = useMemo(
    () => computeTierCounts(state.units, faction),
    [state.units, faction],
  );

  const manaGeneration = useMemo(
    () => computeManaGeneration(state.units, faction, state.battleSize),
    [state.units, faction, state.battleSize],
  );

  const errors = useMemo(
    () => validateArmy(state, faction),
    [state, faction],
  );

  const hasErrors = errors.some((e) => e.type === "error");

  const value = useMemo<BuilderContextValue>(
    () => ({
      state,
      dispatch,
      faction,
      totalPoints,
      pointsBudget,
      tierCounts,
      manaGeneration,
      errors,
      hasErrors,
    }),
    [state, faction, totalPoints, pointsBudget, tierCounts, manaGeneration, errors, hasErrors],
  );

  return (
    <BuilderContext.Provider value={value}>
      {children}
    </BuilderContext.Provider>
  );
}
