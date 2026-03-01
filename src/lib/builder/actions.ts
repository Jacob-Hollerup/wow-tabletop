"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { BattleSize, RosterUnit, ArmyListRow, ArmyListWithUnits } from "./types";

export async function createArmyList(factionId: string): Promise<string> {
  const supabase = await createClient();
  if (!supabase) throw new Error("Not authenticated");

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const factionNames: Record<string, string> = {
    humans: "Humans", dwarves: "Dwarves", "night-elves": "Night Elves",
    orcs: "Orcs", darkspear: "Darkspear", tauren: "Tauren",
    forsaken: "Forsaken", scourge: "Scourge",
  };

  const { data, error } = await supabase
    .from("army_lists")
    .insert({
      user_id: user.id,
      faction_id: factionId,
      name: `New ${factionNames[factionId] ?? factionId} Army`,
      battle_size: "standard",
    })
    .select("id")
    .single();

  if (error) throw error;
  return data.id;
}

export async function getArmyList(id: string): Promise<ArmyListWithUnits | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("army_lists")
    .select("*, army_list_units(*)")
    .eq("id", id)
    .single();

  if (error) return null;
  return data as ArmyListWithUnits;
}

export async function getUserArmyLists(): Promise<ArmyListRow[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("army_lists")
    .select("*")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  if (error) return [];
  return (data ?? []) as ArmyListRow[];
}

export async function saveArmyList(
  id: string,
  updates: {
    name?: string;
    battle_size?: BattleSize;
    notes?: string;
    units?: RosterUnit[];
  },
): Promise<void> {
  const supabase = await createClient();
  if (!supabase) throw new Error("Not authenticated");

  // Update army list metadata
  const meta: Record<string, unknown> = {};
  if (updates.name !== undefined) meta.name = updates.name;
  if (updates.battle_size !== undefined) meta.battle_size = updates.battle_size;
  if (updates.notes !== undefined) meta.notes = updates.notes;

  if (Object.keys(meta).length > 0) {
    const { error } = await supabase.from("army_lists").update(meta).eq("id", id);
    if (error) throw error;
  }

  // Sync units: delete all, re-insert
  if (updates.units) {
    const { error: delError } = await supabase
      .from("army_list_units")
      .delete()
      .eq("army_list_id", id);
    if (delError) throw delError;

    if (updates.units.length > 0) {
      const rows = updates.units.map((u, i) => ({
        army_list_id: id,
        unit_name: u.unitName,
        loadout: u.loadout,
        hero_spec: u.heroSpec,
        hero_level: u.heroLevel,
        sort_order: i,
      }));
      const { error: insError } = await supabase.from("army_list_units").insert(rows);
      if (insError) throw insError;
    }
  }
}

export async function deleteArmyList(id: string): Promise<void> {
  const supabase = await createClient();
  if (!supabase) throw new Error("Not authenticated");

  const { error } = await supabase.from("army_lists").delete().eq("id", id);
  if (error) throw error;
  redirect("/builder");
}
