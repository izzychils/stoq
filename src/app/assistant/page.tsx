import type { Metadata } from "next";
import { Bot, Database, Lock, MessageSquare, Search, Sparkles } from "lucide-react";
import { AssistantDemo } from "@/components/sections/assistant-demo";
import { Cta } from "@/components/sections/cta";
import {
  FaqList,
  FeatureCards,
  MarketingPage,
  PageHero,
  PageSection,
  StatRow,
} from "@/components/marketing/page-shell";
import { GlassCard } from "@/components/ui/glass-card";
import { assistantPrompts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Stock assistant: ask your inventory in plain language",
  description:
    "Ask Stoq questions like “which products are running low?” or “what should I transfer to Lekki?” and get an answer built from your ledger, with the records and model version it used.",
  keywords: [
    "AI inventory assistant",
    "stock chatbot",
    "natural language inventory",
    "inventory questions",
    "reorder assistant",
  ],
  alternates: { canonical: "/assistant" },
  openGraph: {
    title: "Stock assistant · Stoq",
    description:
      "Ask your inventory anything in plain language and get an answer grounded in your own records.",
    url: "https://stoq.xyz/assistant",
  },
};

export default function AssistantPage() {
  return (
    <MarketingPage>
      <PageHero
        eyebrow="Stock assistant"
        title={
          <>
            Ask the aisle
            <br />a <span className="gradient-text">question</span>.
          </>
        }
        description="“Which products are running low?” should not take an hour of counting or a favour from whoever owns the spreadsheet. The Stoq assistant answers from your ledger, in a sentence, and shows the records behind the number."
        bullets={[
          "Plain-language questions, no query builder",
          "Answers grounded in your own movements",
          "Every answer names its source and model version",
          "Suggests the next action, not just the number",
        ]}
      >
        <GlassCard intensity="strong" hairline className="p-4">
          <div className="flex items-center gap-2 border-b border-white/[0.07] pb-3">
            <span className="flex size-7 items-center justify-center rounded-lg border border-azure-500/25 bg-azure-500/10 text-azure-300">
              <Sparkles className="size-3.5" aria-hidden />
            </span>
            <p className="text-[12px] font-semibold text-bone">Stoq assistant</p>
            <span className="ml-auto text-[9px] text-fog-faint">scanned 18 SKUs × 4 locations</span>
          </div>

          <div className="mt-3 space-y-2">
            <div className="flex justify-end">
              <p className="max-w-[85%] rounded-2xl rounded-tr-none bg-azure-500/15 px-3 py-2 text-[10.5px] text-azure-100">
                {assistantPrompts[0]}
              </p>
            </div>
            <div className="flex justify-start">
              <div className="max-w-[92%] rounded-2xl rounded-tl-none border border-white/[0.07] bg-white/[0.04] px-3 py-2.5">
                <p className="text-[10.5px] leading-relaxed text-bone/85">
                  Six products need attention across three locations. Detergent is at 2.9 weeks
                  of cover and Yaba has 0.7. Noodles are effectively out at Yaba.
                </p>
                <p className="mt-2 text-[9px] text-fog-faint">
                  I can consolidate detergent, noodles and diapers into one purchase order, or
                  raise a transfer from Ikeja first.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/[0.07] bg-black/25 px-3 py-2.5">
            <MessageSquare className="size-3.5 text-fog-faint" aria-hidden />
            <span className="text-[10.5px] text-fog-faint">
              Ask about cover, transfers, suppliers or forecasts…
            </span>
            <span className="ml-auto text-[9px] text-azure-300">demo</span>
          </div>
        </GlassCard>
      </PageHero>

      <PageSection
        eyebrow="How it answers"
        title={
          <>
            Grounded, not
            <br /> <span className="gradient-text">invented</span>.
          </>
        }
        subtitle="The assistant is not a general chatbot pointed at your business. It reads the same ledger every other screen reads, and it says when the data does not support an answer."
      >
        <FeatureCards
          columns={3}
          items={[
            {
              icon: <Database className="size-4" aria-hidden />,
              title: "Reads the ledger",
              copy: "Quantities, movements, suppliers and forecasts come from the records in your workspace - not from the model's memory.",
            },
            {
              icon: <Search className="size-4" aria-hidden />,
              title: "Scoped to your role",
              copy: "A store manager gets their store's numbers. Nothing outside their location is retrievable, ever.",
            },
            {
              icon: <Bot className="size-4" aria-hidden />,
              title: "Says what it used",
              copy: "Each answer carries the scope, the recency of the data and, for forecasts, the model version behind it.",
            },
            {
              icon: <Lock className="size-4" aria-hidden />,
              title: "No invented records",
              copy: "If a SKU has no history, the assistant says so instead of producing a confident number.",
            },
            {
              icon: <Sparkles className="size-4" aria-hidden />,
              title: "Proposes the action",
              copy: "Answers end with a concrete next step: draft an order, raise a transfer, review a slow mover.",
            },
            {
              icon: <MessageSquare className="size-4" aria-hidden />,
              title: "Follow-ups keep context",
              copy: "“Why?” works. So does “only Lekki” and “what about next week?” without restating the question.",
            },
          ]}
        />
      </PageSection>

      <AssistantDemo />

      <PageSection
        eyebrow="Uses"
        title="Questions it already answers well"
        subtitle="Everyday questions from the floor, the buying desk and the owner's Sunday review."
      >
        <div className="mt-8 grid gap-2 sm:grid-cols-2">
          {[
            "Which products are running low, and at which location?",
            "How much stock did we sell this week, by channel?",
            "Forecast bottled water for the next eight weeks.",
            "What should I transfer to Lekki for the weekend?",
            "Which supplier is delaying the most stock?",
            "What is my stock value at cost right now?",
            "Which SKUs have more than ten weeks of cover?",
            "Did last week's forecast beat the actuals?",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3 text-[12px] text-bone/80"
            >
              <Search className="size-3.5 shrink-0 text-azure-300/70" aria-hidden />
              {item}
            </div>
          ))}
        </div>
        <StatRow
          stats={[
            { value: "18", label: "SKUs scanned", note: "Every answer considers all products and locations in scope." },
            { value: "<2s", label: "typical answer", note: "Plain language in, plain language out, with sources." },
            { value: "0", label: "invented records", note: "No history means no number - the assistant says so." },
          ]}
        />
      </PageSection>

      <PageSection eyebrow="Questions" title="Assistant questions">
        <FaqList
          columns={2}
          items={[
            {
              q: "Is the assistant included in every plan?",
              a: "It is included from the Chain plan, which is the first plan with forecasting and multi-location transfers. Store plans get alerts and reports.",
            },
            {
              q: "Can it change stock on its own?",
              a: "No. It can draft a purchase order or a transfer, but a human approves any movement. Read-only by default is deliberate.",
            },
            {
              q: "Where does the data go?",
              a: "Answers are generated server-side from your own records. Your stock data is not used to train a public model, and role scoping is enforced before retrieval.",
            },
            {
              q: "Does it work offline?",
              a: "The assistant needs a connection. The rest of the workspace keeps queueing scans and counts offline and syncs when you are back.",
            },
          ]}
        />
      </PageSection>

      <Cta />
    </MarketingPage>
  );
}
