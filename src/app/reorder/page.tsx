import type { Metadata } from "next";
import {
  Calculator,
  Check,
  ClipboardCheck,
  Clock,
  FileCheck2,
  PackageCheck,
  RefreshCw,
  Truck,
} from "lucide-react";
import { Reorder } from "@/components/sections/forecast";
import { Cta } from "@/components/sections/cta";
import {
  FaqList,
  FeatureCards,
  MarketingPage,
  NumberedSteps,
  PageHero,
  PageSection,
  StatRow,
} from "@/components/marketing/page-shell";
import { GlassCard } from "@/components/ui/glass-card";
import { naira } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Automated restocking — reorder points that follow demand",
  description:
    "Stoq recalculates reorder points from real sales velocity, supplier lead time and forecasts, then drafts the purchase order in cartons with the reasoning and an order-by date. Nothing is sent without approval.",
  keywords: [
    "automated reordering",
    "reorder point",
    "safety stock",
    "purchase order automation",
    "inventory replenishment",
  ],
  alternates: { canonical: "/reorder" },
  openGraph: {
    title: "Automated restocking · Stoq",
    description:
      "Reorder points that follow real velocity, with draft purchase orders waiting for approval.",
    url: "https://stoq.xyz/reorder",
  },
};

export default function ReorderPage() {
  return (
    <MarketingPage>
      <PageHero
        eyebrow="Automated restocking"
        title={
          <>
            The order is already
            <br />
            <span className="gradient-text">drafted</span>.
          </>
        }
        description="Most restocking decisions are made twice: once when someone notices the shelf is thin, and again when they pay a premium to fix it. Stoq recalculates every reorder point on every sale, so the draft purchase order is waiting before anyone reaches for the phone."
        bullets={[
          "Reorder points refreshed with each sale",
          "Lead-time buffer on slow suppliers",
          "Quantities rounded to cartons, not singles",
          "Approval trail with who, when and at what price",
        ]}
      >
        <GlassCard intensity="strong" hairline className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-[0.14em] text-fog-faint">
                Suggested order · PO-2215
              </p>
              <p className="mt-1 text-[13px] font-semibold text-bone">Ikeja Warehouse</p>
            </div>
            <span className="rounded-full bg-amber/10 px-2 py-0.5 text-[9px] font-bold text-amber-soft">
              draft
            </span>
          </div>

          <div className="mt-4 divide-y divide-white/[0.05] rounded-xl border border-white/[0.06] bg-black/20">
            {[
              { name: "Washing detergent 1 kg", units: 480, cost: 1416000, cover: "2.9 weeks" },
              { name: "Instant noodles carton", units: 360, cost: 2736000, cover: "3.1 weeks" },
              { name: "Baby diapers M", units: 240, cost: 1776000, cover: "1.8 weeks" },
              { name: "Energy drink 250 ml", units: 480, cost: 1320000, cover: "4.2 weeks" },
            ].map((row) => (
              <div key={row.name} className="flex items-center justify-between gap-3 px-3.5 py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-[11px] font-semibold text-bone">{row.name}</p>
                  <p className="text-[9px] text-fog-faint">{row.cover} of cover left</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-bold tnum text-azure-300">+{row.units}</p>
                  <p className="text-[9px] tnum text-fog-faint">{naira(row.cost)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between rounded-xl bg-lime-400/[0.07] px-3 py-2.5">
            <p className="text-[10px] text-lime-100/90">
              Order-by 19 Nov · lands 23 Nov · 2-day lead time
            </p>
            <span className="text-[11px] font-bold tnum text-lime-300">₦7.25m</span>
          </div>
        </GlassCard>
      </PageHero>

      <PageSection
        eyebrow="The rule"
        title={
          <>
            Reorder point = demand
            <br className="hidden sm:block" /> during{" "}
            <span className="gradient-text">lead time + buffer</span>.
          </>
        }
        subtitle="The formula is old and boring. What changes is that Stoq feeds it live numbers instead of a threshold somebody set in 2023 and never revisited."
      >
        <div className="mt-10 grid gap-3 lg:grid-cols-3">
          {[
            {
              icon: <Calculator className="size-4" aria-hidden />,
              title: "Forecast demand",
              copy: "Expected units sold over the supplier's lead time, from the eight-week forecast — not last year's average.",
            },
            {
              icon: <Clock className="size-4" aria-hidden />,
              title: "Add lead-time cover",
              copy: "A slow supplier earns a larger buffer automatically. A reliable one does not carry dead stock on its behalf.",
            },
            {
              icon: <PackageCheck className="size-4" aria-hidden />,
              title: "Round to packs",
              copy: "Order in the unit the supplier actually ships: cartons, cases, pallets. No half-carton purchase orders.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
              <span className="flex size-9 items-center justify-center rounded-xl border border-azure-500/25 bg-azure-500/10 text-azure-300">
                {item.icon}
              </span>
              <h3 className="mt-4 text-[14px] font-semibold text-bone">{item.title}</h3>
              <p className="mt-2 text-[12.5px] leading-relaxed text-fog-dim">{item.copy}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-2xl border border-white/[0.06] bg-[#060910] p-5">
          <p className="mono-label !text-azure-300/80">Worked example</p>
          <p className="mt-3 font-mono text-[11.5px] leading-loose text-fog">
            bottled water 75 cl · 438 units/week · lead time 2 days
            <br />
            → 438 ÷ 7 × 2 = <span className="text-bone">125 units</span> during lead time
            <br />
            → weekend buffer 1.8× → <span className="text-bone">225 units</span> at reorder
            <br />
            → order in packs of 12 → draft <span className="text-lime-300">240 units</span>
          </p>
          <p className="mt-3 flex items-start gap-2 text-[11px] leading-relaxed text-fog-dim">
            <Check className="mt-0.5 size-3.5 shrink-0 text-lime-400" aria-hidden />
            The same arithmetic runs for every SKU at every location, after every movement —
            which is the part a human cannot do daily.
          </p>
        </div>
      </PageSection>

      <Reorder />

      <PageSection
        eyebrow="Control"
        title={
          <>
            Fast, but never
            <br /> <span className="gradient-text">automatic</span>.
          </>
        }
        subtitle="Drafting is automated. Sending is not. Every order passes a human, and the record of that decision stays attached to the stock it bought."
      >
        <FeatureCards
          columns={3}
          items={[
            {
              icon: <FileCheck2 className="size-4" aria-hidden />,
              title: "Approvals",
              copy: "Drafts wait for a buyer or owner. Approve, edit the quantity, or reject with a reason — all three are logged.",
            },
            {
              icon: <Truck className="size-4" aria-hidden />,
              title: "Lead-time tracking",
              copy: "Actual delivery dates are compared to the stated lead time, so a supplier's buffer adjusts to reality, not the contract.",
            },
            {
              icon: <RefreshCw className="size-4" aria-hidden />,
              title: "Promotion aware",
              copy: "A promo raises expected demand and the reorder point with it, before the promotion starts rather than after the shelf empties.",
            },
            {
              icon: <ClipboardCheck className="size-4" aria-hidden />,
              title: "Receipts close the loop",
              copy: "Received quantities are matched to the order. Short deliveries become the supplier's responsibility, not a stock surprise.",
            },
            {
              icon: <Calculator className="size-4" aria-hidden />,
              title: "Cost visibility",
              copy: "Draft totals show landed cost per line, so a large order is approved with the cash impact in front of the approver.",
            },
            {
              icon: <Check className="size-4" aria-hidden />,
              title: "Never reorder a dead SKU",
              copy: "Slow movers get a review flag instead of an order. Cover days above a threshold suppress the draft automatically.",
            },
          ]}
        />
        <StatRow
          stats={[
            { value: "<20s", label: "to a draft order", note: "From a low-stock flag to a reviewable purchase order." },
            { value: "−31%", label: "rush buys", note: "Emergency orders at premium prices, after lead-time buffers went live." },
            { value: "100%", label: "logged approvals", note: "Every order, quantity change and rejection keeps a named trail." },
          ]}
        />
      </PageSection>

      <PageSection eyebrow="Questions" title="Restocking questions">
        <FaqList
          columns={2}
          items={[
            {
              q: "Will Stoq send orders without me?",
              a: "No. Stoq drafts and schedules purchase orders; a named user approves them. Automatic sending can be discussed for a Network plan, but it is off by default.",
            },
            {
              q: "How is this different from a minimum-stock alert?",
              a: "A minimum is a fixed number. Stoq recalculates the point from current velocity, forecast, lead time and pack size, then proposes the quantity — not just a warning.",
            },
            {
              q: "Can I keep my existing reorder points?",
              a: "Yes. They can be imported as a starting floor, and Stoq will only raise them when demand justifies it.",
            },
            {
              q: "What about supplier price tiers?",
              a: "Line costs use the supplier's current price list and terms. If a bulk tier is cheaper than ordering twice, the draft shows the comparison.",
            },
          ]}
        />
      </PageSection>

      <Cta />
    </MarketingPage>
  );
}
