"use client";

import { useChat } from "@ai-sdk/react";
import { useRef, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const suggestedQuestions = [
  "How does Armor Piercing work against Shields?",
  "Can a model charge after Combat Withdrawal?",
  "How does the Scourge Raise Dead mechanic work?",
  "Explain the Initiative evasion system",
];

function getMessageText(m: { parts?: { type: string; text?: string }[] }): string {
  return (
    m.parts
      ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join("") || ""
  );
}

export default function ChatModal() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { messages, sendMessage, status } = useChat();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) return;

    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!user) return null;

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
    <>
      {/* Floating trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-black shadow-lg shadow-gold/20 transition-all hover:bg-gold-dim hover:scale-105 active:scale-95"
        aria-label={open ? "Close chat" : "Ask AI"}
      >
        {open ? (
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 6l10 10M6 16L16 6" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        )}
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-40 flex items-end justify-end p-3 sm:p-6">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />

          <div className="relative z-50 flex h-[min(600px,calc(100vh-6rem))] w-full max-w-md flex-col overflow-hidden rounded-xl border border-border bg-background shadow-2xl animate-in">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <h3 className="font-display text-sm font-semibold text-gold">
                  Rules Assistant
                </h3>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M3 3l8 8M3 11l8-8" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4">
              <div className="space-y-3">
                {messages.length === 0 && (
                  <div className="py-8 text-center">
                    <p className="mb-1 text-sm font-semibold text-gold">
                      Ask about rules & units
                    </p>
                    <p className="mb-4 text-xs text-muted">
                      I know all the Azeroth at War rules.
                    </p>
                    <div className="grid gap-1.5">
                      {suggestedQuestions.map((q) => (
                        <button
                          key={q}
                          onClick={() => askQuestion(q)}
                          className="rounded-lg border border-border bg-surface px-3 py-2 text-left text-xs text-muted transition-colors hover:border-gold/30 hover:text-foreground"
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
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-xl px-3 py-2 ${
                        m.role === "user"
                          ? "bg-gold/10 text-foreground"
                          : "bg-surface text-foreground"
                      }`}
                    >
                      {m.role === "user" ? (
                        <p className="text-sm">{getMessageText(m)}</p>
                      ) : (
                        <div className="prose prose-invert prose-sm max-w-none">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {getMessageText(m)}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isLoading &&
                  messages.length > 0 &&
                  messages[messages.length - 1]?.role === "user" && (
                    <div className="flex justify-start">
                      <div className="rounded-xl bg-surface px-3 py-2">
                        <div className="flex gap-1">
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold/50 [animation-delay:0ms]" />
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold/50 [animation-delay:150ms]" />
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold/50 [animation-delay:300ms]" />
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-border bg-surface/50 px-3 py-3">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about rules, units, combat..."
                  className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/60 transition-colors focus:border-gold/60 focus:outline-none focus:ring-1 focus:ring-gold/20"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-black transition-all hover:bg-gold-dim disabled:opacity-50"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
