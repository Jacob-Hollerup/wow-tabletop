import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { allRulesContent } from "@/lib/content-data";
import { createClient } from "@/lib/supabase/server";

const systemPrompt = `You are a rules assistant for "Azeroth at War", a tabletop miniatures war game.

Your job is to answer questions accurately based ONLY on the rules documents provided below.

Guidelines:
- Cite section numbers when possible (e.g., "See Section 7.2")
- If something is ambiguous or undefined in the rules, say so clearly
- Help with army building math (points, composition limits)
- Explain keyword interactions step by step
- When explaining combat, walk through the full sequence (hit → wound → save → damage)
- Be concise but thorough
- If a rule changed between v1.0 and v1.1, mention the v1.1 version as current

Here are the complete rules documents:

${allRulesContent}`;

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

  const result = streamText({
    model: anthropic("claude-sonnet-4-5-20241022"),
    system: systemPrompt,
    messages,
  });

  return result.toTextStreamResponse();
}
