import type { Metadata } from "next";
import {
  ArrowLeftRight,
  Boxes,
  Building2,
  Check,
  Store,
  Truck,
  Warehouse,
  X,
} from "lucide-react";
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

export const metadata: Metadata = {
  title: "Who Stoq is for: retailers, wholesalers, distributors and warehouses",
  description:
    "Stoq fits retail chains, wholesalers, distributors, warehouses, supermarkets and dark stores that move physical stock. Here is what each operation gets, and where Stoq is honestly not the right fit.",
  keywords: [
    "inventory software for retailers",
    "wholesale inventory software",
    "distributor stock control",
    "warehouse inventory management",
    "supermarket stock software",
  ],
  alternates: { canonical: "/audience" },
  openGraph: {
    title: "Who Stoq is for · Stoq",
    description:
      "Retail chains, wholesalers, distributors, warehouses and dark stores - and where Stoq is not the fit.",
    url: "https://stoq.xyz/audience",
  },
};

const SEGMENTS = [
  {
    icon: Store,
    title: "Retailers",
    range: "1 to 40 stores",
    copy: "The store is the unit that runs out. Stoq gives each shop its own stock, its own weekend pattern and a low-stock alert that arrives before the shelf is bare.",
    wins: ["Per-store reorder points", "Weekend and payday uplift", "Phone camera counts", "Staff scoped to their shop"],
  },
  {
    icon: Truck,
    title: "Wholesalers",
    range: "Bulk, price tiers, credit",
    copy: "A single wholesale order can empty a retail shelf in an afternoon. Stoq records channel and price list on every movement, so one order cannot quietly break another promise.",
    wins: ["Channel price lists", "Bulk order visibility", "Carton-level rounding", "Customer purchase history"],
  },
  {
    icon: ArrowLeftRight,
    title: "Distributors",
    range: "Many SKUs, many routes",
    copy: "Distributors usually have the stock data but not the confidence to allocate it. Stoq ranks what needs action and shows the transfer or purchase that protects the next delivery run.",
    wins: ["Multi-site allocation", "Supplier lead times", "Transfer route history", "Fill-rate per depot"],
  },
  {
    icon: Warehouse,
    title: "Warehouses",
    range: "Bins, batches, receipts",
    copy: "A warehouse is judged on accuracy, not vibes. Barcode intake, signed-off counts and receipt matching keep the ledger honest enough to trust for picking.",
    wins: ["Barcode intake", "Receipt matching", "Cycle counts by aisle", "Batch and cost references"],
  },
  {
    icon: Boxes,
    title: "Supermarkets",
    range: "High SKU, high velocity",
    copy: "Thousands of fast-moving lines with promo cycles. Stoq keeps the reorder arithmetic current per line and per aisle, which is the only way replenishment keeps up.",
    wins: ["Aisle-level counts", "Promo-aware forecasts", "Slow-mover review", "Naira value at cost"],
  },
  {
    icon: Building2,
    title: "Dark stores & fulfilment",
    range: "Picking under pressure",
    copy: "Online fulfilment punishes a stock error twice: once with a cancelled order and once with a customer who does not come back. Stoq keeps the picked quantity and the shelf quantity the same record.",
    wins: ["Online as its own location", "Pick-rate visibility", "Shared ledger with retail", "Buffer transfers"],
  },
];

export default function AudiencePage() {
  return (
    <MarketingPage>
      <PageHero
        eyebrow="Who it is for"
        tone="lime"
        title={
          <>
            If you count it,
            <br /> Stoq <span className="gradient-text">tracks it</span>.
          </>
        }
        description="Stoq is built for operations that move physical stock: a shop, a warehouse, a depot, a van. It is not a marketplace tool or a bookkeeping app - it is the ledger between the loading bay and the till."
        bullets={[
          "Retail chains and single stores",
          "Wholesalers and distributors",
          "Warehouses and dark stores",
          "Supermarkets and pharmacies",
        ]}
      >
        <GlassCard intensity="strong" hairline className="p-5">
          <p className="mono-label !text-azure-300/80">Fit check</p>
          <ul className="mt-4 space-y-2.5">
            {[
              "You know roughly what you have, not exactly",
              "Staff count stock on paper or in a group chat",
              "Someone is always chasing a supplier by phone",
              "Two locations disagree about the same SKU",
              "Buying happens on instinct and last month's sales",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[12px] text-bone/85">
                <Check className="mt-0.5 size-3.5 shrink-0 text-lime-400" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 rounded-xl border border-white/[0.07] bg-black/25 px-3.5 py-3 text-[10.5px] leading-relaxed text-fog-dim">
            If two or more of these are true, the demo workspace will feel familiar within a
            minute.
          </p>
        </GlassCard>
      </PageHero>

      <PageSection
        eyebrow="Segments"
        title={
          <>
            Six operations,
            <br /> one <span className="gradient-text">mechanism</span>.
          </>
        }
        subtitle="The screens are the same; the emphasis changes with the business. Here is what each segment tends to care about most."
      >
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SEGMENTS.map((segment) => (
            <div
              key={segment.title}
              className="group h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-colors hover:border-azure-500/25 hover:bg-white/[0.035]"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex size-9 items-center justify-center rounded-xl border border-azure-500/25 bg-azure-500/10 text-azure-300">
                  <segment.icon className="size-4" aria-hidden />
                </span>
                <span className="text-[9px] uppercase tracking-[0.1em] text-fog-faint">
                  {segment.range}
                </span>
              </div>
              <h3 className="mt-4 text-[14.5px] font-semibold text-bone">{segment.title}</h3>
              <p className="mt-2 text-[12px] leading-relaxed text-fog-dim">{segment.copy}</p>
              <ul className="mt-4 space-y-1.5 border-t border-white/[0.06] pt-3">
                {segment.wins.map((win) => (
                  <li key={win} className="flex items-center gap-2 text-[11px] text-fog">
                    <Check className="size-3 shrink-0 text-lime-400/80" aria-hidden />
                    {win}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <StatRow
          stats={[
            { value: "18", label: "SKUs in the demo", note: "Representative of a small chain's core range." },
            { value: "4", label: "location types", note: "Warehouse, two retail stores and online fulfilment." },
            { value: "8", label: "weeks of look-ahead", note: "Enough runway to order, land and move stock." },
          ]}
        />
      </PageSection>

      <PageSection
        eyebrow="Honesty"
        title={
          <>
            Where Stoq is
            <br /> <span className="gradient-text">not</span> the fit.
          </>
        }
        subtitle="A tool that claims to do everything does nothing well. These are the jobs we deliberately leave to something else."
      >
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {[
            {
              title: "Full accounting and payroll",
              copy: "Stoq records stock value and purchase commitments, not ledgers, VAT returns or salaries. Export to your accountant's system.",
            },
            {
              title: "Point-of-sale hardware",
              copy: "Stoq is the stock system, not the till. It records sales and can work alongside a POS, but it does not drive a receipt printer or cash drawer.",
            },
            {
              title: "E-commerce storefronts",
              copy: "There is no customer-facing shop here. Stoq keeps the stock promise behind a storefront honest.",
            },
            {
              title: "Manufacturing BOM planning",
              copy: "Bill-of-materials planning and production scheduling are a different problem. Stoq handles bought-in stock and distribution, not work orders.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5"
            >
              <span className="flex size-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-fog-dim">
                <X className="size-3.5" aria-hidden />
              </span>
              <h3 className="mt-3 text-[13.5px] font-semibold text-bone">{item.title}</h3>
              <p className="mt-1.5 text-[12px] leading-relaxed text-fog-dim">{item.copy}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection eyebrow="Questions" title="Fit questions">
        <FaqList
          columns={2}
          items={[
            {
              q: "I have one store with 400 SKUs. Is Stoq too big?",
              a: "No. The Store plan is built for exactly that: one location, up to 5 users, 2,000 SKUs, barcode intake and low-stock alerts, at ₦20,000 a month billed annually.",
            },
            {
              q: "Can I start with one location and add more?",
              a: "Yes. Locations, transfers and forecasting are added when you need them, and stock history carries over rather than restarting.",
            },
            {
              q: "Does it work for a pharmacy with expiry dates?",
              a: "Batch and expiry are captured on intake and visible on the product record, so near-expiry stock can be reviewed before it becomes a write-off.",
            },
            {
              q: "What if my team is not technical?",
              a: "The floor workflow is scan, confirm, done. There are no formulas to build or fields to configure before a count can be recorded.",
            },
          ]}
        />
      </PageSection>

      <Cta />
    </MarketingPage>
  );
}
