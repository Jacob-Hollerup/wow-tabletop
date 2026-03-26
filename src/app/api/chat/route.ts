import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { getRelevantRules } from "@/lib/rules-search";
import { createClient } from "@/lib/supabase/server";

const SYSTEM_PREAMBLE = `You are a rules assistant for "Azeroth at War", a tabletop miniatures war game.

Your job is to answer questions accurately based ONLY on the rules documents provided below.

Guidelines:
- Cite section numbers when possible (e.g., "See Section 7.2")
- If something is ambiguous or undefined in the rules, say so clearly
- Help with army building math (points, composition limits)
- Explain keyword interactions step by step
- When explaining combat, walk through the full sequence (hit → wound → save → damage)
- Be concise but thorough
- If a rule changed between v1.0 and v1.1, mention the v1.1 version as current

Here are the relevant rules documents:

`;

export async function POST(req: Request) {
  const supabase = await createClient();

  if (!supabase) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { messages } = await req.json();

  // Use the latest user message to find relevant rule chunks via vector search
  const lastUserMsg = [...messages].reverse().find((m: { role: string }) => m.role === "user");
  const query = lastUserMsg?.content ?? "";
  const rules = await getRelevantRules(typeof query === "string" ? query : JSON.stringify(query));

  const result = streamText({
    model: anthropic("claude-sonnet-4-6"),
    system: SYSTEM_PREAMBLE + rules,
    messages,
  });

  return result.toUIMessageStreamResponse();
}
