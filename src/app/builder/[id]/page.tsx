import { notFound } from "next/navigation";
import { getArmyList } from "@/lib/builder/actions";
import { getFaction } from "@/lib/factions";
import type { BuilderState, RosterUnit, BattleSize } from "@/lib/builder";
import ArmyBuilderProvider from "@/components/builder/army-builder-provider";
import ArmyHeader from "@/components/builder/army-header";
import UnitCatalog from "@/components/builder/unit-catalog";
import RosterPanel from "@/components/builder/roster-panel";
import ValidationPanel from "@/components/builder/validation-panel";
import MobileUnitDrawer from "@/components/builder/mobile-unit-drawer";

export default async function BuilderEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const army = await getArmyList(id);
  if (!army) notFound();

  const faction = getFaction(army.faction_id);
  if (!faction) notFound();

  // Hydrate state from DB
  const units: RosterUnit[] = (army.army_list_units ?? [])
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((row) => ({
      id: row.id,
      unitName: row.unit_name,
      loadout: row.loadout,
      heroSpec: row.hero_spec,
      heroLevel: row.hero_level,
      sortOrder: row.sort_order,
    }));

  const initialState: BuilderState = {
    armyListId: army.id,
    name: army.name,
    factionId: army.faction_id,
    battleSize: (army.battle_size as BattleSize) || "standard",
    notes: army.notes ?? "",
    units,
    isDirty: false,
    isSaving: false,
    lastSavedAt: new Date(army.updated_at),
  };

  return (
    <ArmyBuilderProvider faction={faction} initialState={initialState}>
      <div className="mx-auto max-w-7xl px-4 py-6">
        <ArmyHeader />

        <div className="mt-6 flex flex-col gap-6 lg:flex-row">
          {/* Sidebar: Unit Catalog (desktop only) */}
          <div className="hidden w-full shrink-0 lg:block lg:w-72 xl:w-80">
            <UnitCatalog />
          </div>

          {/* Main: Roster + Validation */}
          <div className="min-w-0 flex-1 space-y-6">
            <RosterPanel />
            <ValidationPanel />
          </div>

          {/* Mobile: FAB + drawer */}
          <MobileUnitDrawer />
        </div>
      </div>
    </ArmyBuilderProvider>
  );
}
