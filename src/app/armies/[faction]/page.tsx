import { redirect } from "next/navigation";
import { getFaction } from "@/lib/factions";

export default async function ArmiesFactionRedirect({
  params,
}: {
  params: Promise<{ faction: string }>;
}) {
  const { faction: factionId } = await params;
  const faction = getFaction(factionId);
  if (faction) {
    redirect(`/factions/${faction.grandFaction}/${faction.id}`);
  }
  redirect("/factions");
}
