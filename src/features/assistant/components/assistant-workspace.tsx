"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, Boxes, Check, MapPin, Sparkles, TrendingUp } from "lucide-react";
import { assistantAnswers, assistantPrompts, locations, products, totalStock } from "@/lib/data";
import { cn, naira } from "@/lib/utils";

type Message = { id: number; role: "user" | "assistant"; body: string[]; meta?: string };

const OPENING: Message = {
  id: 0,
  role: "assistant",
  body: [
    "I am connected to the demo ledger: 18 SKUs across Ikeja Warehouse, Yaba Retail, Lekki Store and Online Fulfilment.",
    "Ask me about low stock, this week's sales, a forecast, or what to transfer before the weekend. I will show the record and the numbers behind the answer.",
  ],
  meta: "Read-only · demo data · 5 November 2026",
};

export function AssistantWorkspace() {
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
      const answer = assistantAnswers[question] ?? {
        body: [
          "I could not match that to a SKU, location or date window in the demo ledger.",
          "Try naming a product, a location, or a period — for example ‘Which products are running low?’ or ‘What did we sell this week?’.",
        ],
        meta: "No record found · not answered",
      };

      setMessages((current) => [
        ...current,
        { id: current.length, role: "assistant", body: answer.body, meta: answer.meta },
      ]);
      setThinking(false);
    }, 850);
  };

  const lowStock = products.filter((product) => {
    const total = totalStock(product);
    return total <= product.reorderPoint;
  });

  return (
    <div className="grid gap-2.5 xl:grid-cols-[1fr_300px]">
      <section className="glass flex min-h-[34rem] flex-col overflow-hidden rounded-2xl">
        <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3">
          <span className="flex size-8 items-center justify-center rounded-lg bg-[linear-gradient(145deg,#5b8cff,#2b52c4)]">
            <Sparkles className="size-4 text-white" aria-hidden />
          </span>
          <div>
            <p className="text-[12px] font-semibold text-bone">Stoq assistant</p>
            <p className="flex items-center gap-1.5 text-[9px] text-lime-300/80">
              <span className="size-1.5 rounded-full bg-lime-400" />
              18 SKUs · 4 locations · read-only
            </p>
          </div>
          <span className="ml-auto rounded-full border border-white/10 px-2 py-0.5 text-[8.5px] uppercase tracking-wide text-fog-faint">
            demo
          </span>
        </div>

        <div ref={threadRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
          {messages.map((message) => (
            <div key={message.id} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[86%] rounded-2xl px-3.5 py-2.5 text-[11.5px] leading-relaxed",
                  message.role === "user"
                    ? "rounded-br-md bg-azure-500 text-white"
                    : "rounded-bl-md border border-white/[0.07] bg-white/[0.03] text-bone/90",
                )}
              >
                {message.body.map((paragraph, index) => (
                  <p key={index} className={cn(index > 0 && "mt-2 whitespace-pre-line")}>
                    {paragraph}
                  </p>
                ))}
                {message.role === "assistant" && message.meta ? (
                  <p className="mt-2 flex items-start gap-1 border-t border-white/[0.06] pt-1.5 text-[8.5px] leading-snug text-fog-faint">
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

        <div className="border-t border-white/[0.06] px-3.5 py-3">
          <div className="flex flex-wrap gap-1.5">
            {assistantPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => ask(prompt)}
                disabled={thinking}
                className="min-h-7 rounded-full border border-white/[0.09] bg-white/[0.03] px-2.5 text-[9.5px] text-fog transition-colors hover:border-azure-500/30 hover:text-azure-300 disabled:opacity-50"
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
            <label htmlFor="workspace-assistant" className="sr-only">
              Ask the stock assistant
            </label>
            <input
              id="workspace-assistant"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about stock, cover, transfers or orders…"
              className="min-w-0 flex-1 bg-transparent text-[11.5px] text-bone placeholder:text-fog-faint focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Send question"
              disabled={thinking || !input.trim()}
              className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-lime-400 text-ink-950 disabled:opacity-40"
            >
              <ArrowUp className="size-4" aria-hidden />
            </button>
          </form>
          <p className="mt-2 text-center text-[8.5px] text-fog-faint">
            Demo only. The assistant reads stock and sales; it cannot change them.
          </p>
        </div>
      </section>

      <aside className="space-y-2.5">
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center gap-2">
            <Boxes className="size-3.5 text-azure-300" aria-hidden />
            <p className="text-[10.5px] font-semibold text-bone">Stock context</p>
          </div>
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-fog-faint">SKUs modelled</span>
              <span className="tnum text-bone">{products.length}</span>
            </div>
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-fog-faint">Below reorder</span>
              <span className="tnum text-amber-soft">{lowStock.length}</span>
            </div>
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-fog-faint">Stock value</span>
              <span className="tnum text-bone">
                {naira(products.reduce((sum, product) => sum + totalStock(product) * product.cost, 0))}
              </span>
            </div>
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-fog-faint">Sales history</span>
              <span className="tnum text-bone">26 weeks</span>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-4">
          <div className="flex items-center gap-2">
            <MapPin className="size-3.5 text-azure-300" aria-hidden />
            <p className="text-[10.5px] font-semibold text-bone">Locations in scope</p>
          </div>
          <ul className="mt-3 space-y-1.5">
            {locations.map((location) => (
              <li key={location.id} className="flex items-center justify-between text-[10px]">
                <span className="truncate text-fog">{location.name}</span>
                <span className="text-fog-faint">{location.capacity}%</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass rounded-2xl p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="size-3.5 text-lime-300" aria-hidden />
            <p className="text-[10.5px] font-semibold text-bone">Sample questions</p>
          </div>
          <ul className="mt-2.5 space-y-2 text-[10px] leading-snug text-fog-dim">
            <li>“Which products are running low?”</li>
            <li>“How much stock did we sell this week?”</li>
            <li>“Forecast bottled water for 8 weeks.”</li>
            <li>“What should I transfer to Lekki?”</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
