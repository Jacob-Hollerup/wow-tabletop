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
  console.log("[chat] POST request received");

  try {
    const supabase = await createClient();
    if (!supabase) {
      console.error("[chat] Supabase client is null");
      return new Response(JSON.stringify({ error: "Auth service unavailable" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError) {
      console.error("[chat] Auth error:", authError.message);
    }
    if (!user) {
      console.error("[chat] No user found");
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    console.log("[chat] User authenticated:", user.id);

    const body = await req.json();
    const { messages } = body;
    console.log("[chat] Messages count:", messages?.length ?? 0);

    // Use the latest user message to find relevant rule chunks via full-text search
    const lastUserMsg = [...messages].reverse().find((m: { role: string }) => m.role === "user");
    const query = lastUserMsg?.content ?? "";
    console.log("[chat] Query:", typeof query === "string" ? query.slice(0, 100) : "non-string");

    let rules = "";
    try {
      rules = await getRelevantRules(typeof query === "string" ? query : JSON.stringify(query));
      console.log("[chat] Rules context length:", rules.length, "chars");
    } catch (searchErr) {
      console.error("[chat] Rules search failed:", searchErr);
      // Continue without rules context rather than failing
    }

    console.log("[chat] Calling Anthropic...");
    const result = streamText({
      model: anthropic("claude-sonnet-4-6"),
      system: SYSTEM_PREAMBLE + rules,
      messages,
    });

    return result.toUIMessageStreamResponse();
  } catch (err) {
    console.error("[chat] Unexpected error:", err);
    return new Response(JSON.stringify({ error: "Internal server error", details: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
