"use client";

import { useChat } from "@ai-sdk/react";
import { useRef, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Chat() {
  const { messages, sendMessage, status } = useChat();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
  }

  function askQuestion(q: string) {
    sendMessage({ text: q });
  }

  return (
    <div className="flex h-[calc(100vh-57px)] flex-col">
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-3xl space-y-4">
          {messages.length === 0 && (
            <div className="py-20 text-center">
              <h2 className="mb-2 text-2xl font-bold text-gold">
                Rules Assistant
              </h2>
              <p className="mb-6 text-muted">
                Ask me anything about the Azeroth at War rules.
              </p>
              <div className="mx-auto grid max-w-md gap-2">
                {[
                  "How does Armor Piercing work against Shields?",
                  "Can a model charge after Combat Withdrawal?",
                  "How does the Scourge Raise Dead mechanic work?",
                  "Explain the Initiative evasion system",
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => askQuestion(q)}
                    className="rounded border border-border bg-surface px-3 py-2 text-left text-sm text-muted transition-colors hover:border-gold/30 hover:text-foreground"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-lg px-4 py-3 ${
                  m.role === "user"
                    ? "bg-gold/10 text-foreground"
                    : "bg-surface text-foreground"
                }`}
              >
                {m.role === "user" ? (
                  <p className="text-sm">
                    {m.parts
                      ?.filter((p) => p.type === "text")
                      .map((p) => (p as { type: "text"; text: string }).text)
                      .join("") || ""}
                  </p>
                ) : (
                  <div className="prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {m.parts
                        ?.filter((p) => p.type === "text")
                        .map((p) => (p as { type: "text"; text: string }).text)
                        .join("") || ""}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && messages.length > 0 && messages[messages.length - 1]?.role === "user" && (
            <div className="flex justify-start">
              <div className="rounded-lg bg-surface px-4 py-3">
                <div className="flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gold/50 [animation-delay:0ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gold/50 [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gold/50 [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border bg-surface/50 px-4 py-4">
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-3xl gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about rules, keywords, combat, army building..."
            className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-gold focus:outline-none"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-gold-dim disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
