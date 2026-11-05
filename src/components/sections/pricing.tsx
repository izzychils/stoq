"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui";
import { faqs, pricing } from "@/lib/data";
import { cn, naira } from "@/lib/utils";

export function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="relative mx-auto w-full max-w-[1200px] px-5 py-24 sm:px-8 sm:py-28">
      <div className="flex flex-col items-center text-center">
        <Reveal>
          <Badge tone="lime">
            <Sparkles className="size-3" aria-hidden />
            Pricing
          </Badge>
          <h2 className="mt-5 text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.03] tracking-[-0.045em] text-bone">
            Pay for the operation
            <br />
            you <span className="gradient-text">actually run</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[14px] leading-relaxed text-fog">
            Start with one store. Add locations, transfers and forecasting when the
            business needs them. No per-scan charges.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-7">
          <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1">
            <button
              type="button"
              onClick={() => setAnnual(false)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-[11.5px] font-semibold transition-colors",
                !annual ? "bg-white/10 text-bone" : "text-fog-dim hover:text-bone",
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11.5px] font-semibold transition-colors",
                annual ? "bg-lime-400 text-ink-950" : "text-fog-dim hover:text-bone",
              )}
            >
              Annual
              <span
                className={cn(
                  "rounded-full px-1.5 py-px text-[8.5px] font-bold",
                  annual ? "bg-ink-950/15 text-ink-950" : "bg-lime-400/15 text-lime-300",
                )}
              >
                −17%
              </span>
            </button>
          </div>
        </Reveal>
      </div>

      <div className="mt-10 grid gap-3 lg:grid-cols-3">
        {pricing.map((plan, index) => (
          <Reveal key={plan.name} delay={index * 70}>
            <div
              className={cn(
                "relative flex h-full flex-col rounded-2xl p-5 transition-colors",
                plan.featured
                  ? "border border-azure-500/35 bg-[linear-gradient(165deg,rgba(91,140,255,0.14),rgba(6,9,17,0.7))] shadow-[0_40px_100px_-50px_rgba(91,140,255,0.7)]"
                  : "border border-white/[0.07] bg-white/[0.02] hover:border-white/15",
              )}
            >
              {plan.featured ? (
                <span className="absolute -top-2.5 left-5 rounded-full bg-azure-500 px-2.5 py-0.5 text-[8.5px] font-bold uppercase tracking-[0.08em] text-white">
                  Most chosen
                </span>
              ) : null}

              <p className="text-[13px] font-semibold text-bone">{plan.name}</p>
              <p className="mt-1 min-h-[2.6rem] text-[10.5px] leading-relaxed text-fog-dim">
                {plan.description}
              </p>

              <div className="mt-5 flex items-end gap-1.5">
                {plan.price === 0 ? (
                  <span className="text-[32px] font-bold leading-none tracking-tight text-bone">
                    Custom
                  </span>
                ) : (
                  <>
                    <span className="text-[32px] font-bold leading-none tracking-tight tnum text-bone">
                      {naira(annual ? plan.annual : plan.price)}
                    </span>
                    <span className="pb-0.5 text-[11px] text-fog-faint">/month</span>
                  </>
                )}
              </div>
              {plan.price > 0 ? (
                <p className="mt-1 text-[9.5px] text-fog-faint">
                  {annual ? "billed annually · 2 months free" : "billed monthly · cancel anytime"}
                </p>
              ) : (
                <p className="mt-1 text-[9.5px] text-fog-faint">scoped to your network</p>
              )}

              <ul className="mt-5 flex-1 space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-[11.5px] text-bone/80">
                    <Check
                      className={cn(
                        "mt-0.5 size-3.5 shrink-0",
                        plan.featured ? "text-lime-400" : "text-azure-400/80",
                      )}
                      aria-hidden
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.featured ? "/sign-up" : "/dashboard"}
                className={cn(
                  "mt-6 inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full text-[12px] font-bold transition-colors",
                  plan.featured
                    ? "bg-azure-500 text-white hover:bg-azure-400"
                    : "border border-white/12 bg-white/[0.04] text-bone hover:border-white/25",
                )}
              >
                {plan.cta}
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={40} className="mt-4 text-center text-[10px] text-fog-faint">
        All prices in naira, excluding VAT. Demo workspace has no billing attached.
      </Reveal>
    </section>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="faq" className="relative border-t border-white/[0.06] bg-[#050810]">
      <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-5 py-24 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <p className="mono-label !text-azure-300/80">Questions</p>
          <h2 className="mt-4 text-[clamp(1.8rem,3.4vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-bone">
            The things buying
            <br />
            teams <span className="gradient-text">ask first</span>.
          </h2>
          <p className="mt-4 max-w-xs text-[12.5px] leading-relaxed text-fog-dim">
            Still unsure? The demo workspace is populated with a real-looking chain, so
            you can break it before you buy it.
          </p>
          <Link
            href="/dashboard"
            className="mt-6 inline-flex min-h-10 items-center gap-2 text-[12.5px] font-semibold text-azure-300 hover:text-azure-200"
          >
            Open the workspace
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </Reveal>

        <Reveal delay={80}>
          <div className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
            {faqs.map((faq, index) => {
              const isOpen = open === index;
              return (
                <div key={faq.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between gap-4 py-4 text-left"
                  >
                    <span
                      className={cn(
                        "text-[13px] font-semibold transition-colors",
                        isOpen ? "text-bone" : "text-bone/80",
                      )}
                    >
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={cn(
                        "mt-0.5 size-4 shrink-0 text-fog-faint transition-transform",
                        isOpen && "rotate-180 text-azure-300",
                      )}
                      aria-hidden
                    />
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-300",
                      isOpen ? "grid-rows-[1fr] pb-4 opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <p className="overflow-hidden pr-8 text-[12.5px] leading-relaxed text-fog">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
