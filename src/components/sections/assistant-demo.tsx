"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, Check, MessageSquare, ScanLine, Sparkles, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { assistantAnswers, assistantPrompts } from "@/lib/data";
import { cn } from "@/lib/utils";

type Message = {
  id: number;
  role: "user" | "assistant";
  body?: string[];
  meta?: string;
};

const OPENING: Message = {
  id: 0,
  role: "assistant",
  body: [
    "I can see 18 SKUs across four locations, plus the last 26 weeks of sales. Ask about cover, a forecast, a transfer or an order — I will show the numbers behind the answer.",
  ],
  meta: "Stoq assistant · read-only access to live stock",
};

export function AssistantDemo() {
  const [messages, setMessages] = useState<Message[]>([OPENING]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const node = threadRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages, thinking]);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  const ask = (value: string) => {
    const question = value.trim();
    if (!question || thinking) return;

    setInput("");
    setMessages((current) => [
      ...current,
      { id: current.length, role: "user", body: [question] },
    ]);
    setThinking(true);

    timerRef.current = setTimeout(() => {
      const answer =
        assistantAnswers[question] ?? {
          body: [
            "I could not find that in stock, sales or the forecast model.",
            "Try naming a SKU, a location or a time window. For anything outside inventory, I will hand you to the operations lead instead of inventing an answer.",
          ],
          meta: "No matching record · not answered",
        };

      setMessages((current) => [
        ...current,
        {
          id: current.length,
          role: "assistant",
          body: answer.body,
          meta: answer.meta,
        },
      ]);
      setThinking(false);
    }, 950);
  };

  return (
    <section id="assistant" className="relative border-y border-white/[0.06] bg-[#050810]">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="aurora left-[10%] top-[-8rem] h-[24rem] w-[28rem] bg-azure-500/[0.14]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1200px] gap-12 px-5 py-24 sm:px-8 sm:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-azure-300/80">
            <Sparkles className="size-3.5" aria-hidden />
            The stock assistant
          </div>
          <h2 className="mt-5 text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.03] tracking-[-0.045em] text-bone">
            Ask your inventory
            <br />
            a <span className="gradient-text">question</span>.
          </h2>
          <p className="mt-5 max-w-md text-[14px] leading-relaxed text-fog">
            No report builder, no pivot table. Ask what is low, what sold this week, or
            what to transfer to Lekki. The assistant answers from your live stock and shows
            the record it used.
          </p>

          <div className="mt-7 grid gap-2 sm:grid-cols-2">
            {[
              { icon: MessageSquare, label: "Plain language", note: "No query syntax" },
              { icon: TrendingUp, label: "Forecast-aware", note: "Uses the demand model" },
              { icon: ScanLine, label: "Record-level", note: "Cites SKU and location" },
              { icon: Check, label: "Approval-first", note: "Drafts, never sends" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
              >
                <item.icon className="mt-0.5 size-3.5 shrink-0 text-azure-300" aria-hidden />
                <div>
                  <p className="text-[11.5px] font-semibold text-bone">{item.label}</p>
                  <p className="text-[10px] text-fog-faint">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-900/95 shadow-[0_50px_120px_-50px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-3 border-b border-white/[0.07] px-4 py-3">
              <span className="flex size-8 items-center justify-center rounded-lg bg-[linear-gradient(145deg,#5b8cff,#2b52c4)]">
                <Sparkles className="size-4 text-white" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-[12px] font-semibold text-bone">Stoq assistant</p>
                <p className="flex items-center gap-1.5 text-[9.5px] text-lime-300/80">
                  <span className="size-1.5 rounded-full bg-lime-400" />
                  Connected to 4 locations
                </p>
              </div>
              <span className="ml-auto rounded-full border border-white/10 px-2 py-0.5 text-[8.5px] uppercase tracking-wide text-fog-faint">
                demo
              </span>
            </div>

            <div
              ref={threadRef}
              className="max-h-[25rem] min-h-[22rem] space-y-3 overflow-y-auto px-4 py-4"
              aria-live="polite"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[92%] rounded-2xl px-3.5 py-2.5 text-[11.5px] leading-relaxed",
                      message.role === "user"
                        ? "rounded-br-md bg-azure-500 text-white"
                        : "rounded-bl-md border border-white/[0.07] bg-white/[0.03] text-bone/90",
                    )}
                  >
                    {message.body?.map((paragraph, index) => (
                      <p key={index} className={cn(index > 0 && "mt-2")}>
                        {paragraph}
                      </p>
                    ))}
                    {message.role === "assistant" && message.meta ? (
                      <p className="mt-2 flex items-start gap-1 text-[8.5px] leading-snug text-fog-faint">
                        <Check className="mt-0.5 size-2.5 shrink-0" aria-hidden />
                        {message.meta}
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}

              {thinking ? (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-white/[0.07] bg-white/[0.03] px-3.5 py-3">
                    {[0, 1, 2].map((dot) => (
                      <span
                        key={dot}
                        className="typing-dot size-1.5 rounded-full bg-fog"
                        style={{ animationDelay: `${dot * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="border-t border-white/[0.07] px-3.5 py-3">
              <div className="flex flex-wrap gap-1.5">
                {assistantPrompts.slice(0, 3).map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => ask(prompt)}
                    disabled={thinking}
                    className="rounded-full border border-white/[0.09] bg-white/[0.03] px-2.5 py-1 text-[9.5px] text-fog transition-colors hover:border-azure-500/30 hover:text-azure-300 disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <form
                className="mt-2.5 flex items-center gap-2 rounded-xl border border-white/[0.08] bg-black/25 py-1.5 pl-3 pr-1.5"
                onSubmit={(event) => {
                  event.preventDefault();
                  ask(input);
                }}
              >
                <label htmlFor="stoq-assistant" className="sr-only">
                  Ask the stock assistant
                </label>
                <input
                  id="stoq-assistant"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about stock, cover, transfers or orders…"
                  className="min-w-0 flex-1 bg-transparent text-[11.5px] text-bone placeholder:text-fog-faint focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Send question"
                  disabled={thinking || !input.trim()}
                  className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-lime-400 text-ink-950 disabled:opacity-40"
                >
                  <ArrowUp className="size-3.5" aria-hidden />
                </button>
              </form>
              <p className="mt-2 text-center text-[8.5px] text-fog-faint">
                Demonstration only. Nothing is ordered, transferred or changed.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
