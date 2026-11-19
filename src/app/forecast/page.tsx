import type { Metadata } from "next";
import {
  CalendarClock,
  CloudSun,
  Gauge,
  LineChart,
  RefreshCw,
  Sparkles,
  Store,
  TrendingUp,
  Warehouse,
} from "lucide-react";
import { ForecastChart } from "@/components/dashboard/charts";
import { Meter } from "@/components/ui";
import { GlassCard } from "@/components/ui/glass-card";
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
import { forecastSeries, locations } from "@/lib/data";
import { number } from "@/lib/utils";

export const metadata: Metadata = {
  title: "8-week demand forecasting, per location",
  description:
    "Stoq forecasts demand eight weeks ahead for every SKU at every location, using your own sales history, weekday patterns, promotions and supplier lead times — with a confidence band and the reasoning shown.",
  keywords: [
    "demand forecasting",
    "8 week forecast",
    "inventory forecasting",
    "per location forecast",
    "reorder planning",
    "stock planning software",
  ],
  alternates: { canonical: "/forecast" },
  openGraph: {
    title: "8-week demand forecasting, per location · Stoq",
    description:
      "Eight weeks of forecast for every SKU at every store and warehouse, with confidence and cover days.",
    url: "https://stoq.xyz/forecast",
  },
};

const LOCATION_FORECAST = [
  {
    location: "Ikeja Warehouse",
    type: "Central warehouse",
    now: 812,
    forecast: 878,
    change: 8.1,
    confidence: 94,
    cover: 19.4,
    note: "Holding stock, not selling it — its demand is transfer-driven.",
  },
  {
    location: "Yaba Retail",
    type: "Retail store",
    now: 268,
    forecast: 291,
    change: 8.6,
    confidence: 91,
    cover: 6.2,
    note: "Weekend uplift is strongest here: Saturday runs at 1.9× a Tuesday.",
  },
  {
    location: "Lekki Store",
    type: "Retail store",
    now: 241,
    forecast: 276,
    change: 14.5,
    confidence: 89,
    cover: 4.8,
    note: "Needs a transfer before Friday or the weekend sells out.",
  },
  {
    location: "Online Fulfilment",
    type: "Dark store",
    now: 132,
    forecast: 149,
    change: 12.9,
    confidence: 86,
    cover: 3.9,
    note: "Basket size is rising; so is the pick rate per order.",
  },
];

export default function ForecastPage() {
  return (
    <MarketingPage>
      <PageHero
        eyebrow="Demand forecasting"
        tone="lime"
        title={
          <>
            Eight weeks ahead,
            <br />
            <span className="gradient-text">per location</span>.
          </>
        }
        description="A stock system can tell you what happened last week. Stoq tells you what each store will sell next week, and the week after that — eight weeks out, per SKU, per location — so the order you place today is the right size when it lands."
        bullets={[
          "One forecast line per location, never a chain average",
          "Weekday, weekend, payday and promo patterns built in",
          "Confidence shown, with the inputs that shaped it",
          "Turns into a transfer or purchase order in one click",
        ]}
      >
        <GlassCard intensity="strong" hairline className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[9px] uppercase tracking-[0.14em] text-fog-faint">
                Bottled water · 75 cl · all locations
              </p>
              <p className="mt-1 text-[14px] font-semibold text-bone">Units per week, next 8 weeks</p>
            </div>
            <span className="shrink-0 rounded-full bg-lime-400/10 px-2 py-0.5 text-[9px] font-bold text-lime-300">
              94% confidence
            </span>
          </div>

          <ForecastChart id="forecast-page" data={forecastSeries} height={200} />

          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { label: "Next week", value: "438", note: "+6.3% WoW" },
              { label: "Peak · W8", value: "512", note: "pre-holiday" },
              { label: "Order by", value: "19 Nov", note: "480 units" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
                <p className="text-[8.5px] uppercase tracking-wide text-fog-faint">{stat.label}</p>
                <p className="mt-1 text-[13px] font-bold tnum text-bone">{stat.value}</p>
                <p className="text-[8.5px] text-lime-300/70">{stat.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-azure-500/20 bg-azure-500/[0.06] p-3">
            <Sparkles className="mt-0.5 size-3.5 shrink-0 text-azure-300" aria-hidden />
            <p className="text-[10px] leading-relaxed text-azure-200/90">
              The forecast reads 26 weeks of this chain&apos;s own sales, then adjusts for the
              weekend uplift (+18%), the two previous December peaks and a 2-day supplier
              lead time.
            </p>
          </div>
        </GlassCard>
      </PageHero>

      <PageSection
        eyebrow="Per location"
        title={
          <>
            The same SKU is four
            <br className="hidden sm:block" /> different <span className="gradient-text">problems</span>.
          </>
        }
        subtitle="A chain average hides the store that runs out on Saturday and the warehouse that is sitting on nineteen weeks of cover. Stoq forecasts each location separately, then shows you the move that fixes the gap."
      >
        <div className="mt-10 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02]">
          <div className="hidden grid-cols-[1.4fr_0.6fr_0.6fr_0.7fr_0.6fr] gap-3 border-b border-white/[0.07] px-5 py-3 text-[9px] uppercase tracking-[0.1em] text-fog-faint sm:grid">
            <span>Location</span>
            <span className="text-right">Now / wk</span>
            <span className="text-right">Forecast / wk</span>
            <span>Confidence</span>
            <span className="text-right">Cover</span>
          </div>
          {LOCATION_FORECAST.map((row) => (
            <div
              key={row.location}
              className="grid gap-2 border-b border-white/[0.045] px-5 py-4 last:border-0 sm:grid-cols-[1.4fr_0.6fr_0.6fr_0.7fr_0.6fr] sm:items-center"
            >
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 text-[12px] font-semibold text-bone">
                  {row.type.includes("warehouse") ? (
                    <Warehouse className="size-3.5 text-azure-300" aria-hidden />
                  ) : (
                    <Store className="size-3.5 text-azure-300" aria-hidden />
                  )}
                  {row.location}
                </p>
                <p className="mt-1 text-[10px] leading-relaxed text-fog-faint">{row.note}</p>
              </div>
              <p className="text-[11px] tnum text-fog sm:text-right">{number(row.now)}</p>
              <p className="text-[11px] font-semibold tnum text-lime-300 sm:text-right">
                {number(row.forecast)}
                <span className="ml-1 text-[9px] text-lime-300/70">+{row.change}%</span>
              </p>
              <div className="flex items-center gap-2">
                <Meter value={row.confidence} tone="azure" className="max-w-[70px]" />
                <span className="text-[9.5px] tnum text-fog-dim">{row.confidence}%</span>
              </div>
              <p className="text-[11px] tnum text-fog sm:text-right">{row.cover}w</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[10.5px] text-fog-faint">
          Illustrative demo data: {locations.length} locations, 18 SKUs, forecast model v3.
        </p>
      </PageSection>

      <PageSection
        eyebrow="How the model works"
        title={
          <>
            Not a magic number.
            <br /> A <span className="gradient-text">reading</span> you can argue with.
          </>
        }
        subtitle="Every forecast is assembled from inputs your team already understands. If a buying decision looks wrong, you can see which input caused it."
      >
        <FeatureCards
          columns={3}
          items={[
            {
              icon: <LineChart className="size-4" aria-hidden />,
              title: "Your own sales history",
              copy: "At least 12 weeks per SKU, 26 preferred. Stoq learns the rhythm of this chain rather than an industry average.",
            },
            {
              icon: <CalendarClock className="size-4" aria-hidden />,
              title: "Day-of-week pattern",
              copy: "Saturday is not Tuesday. Weekday, weekend and month-end effects are modelled separately for each location.",
            },
            {
              icon: <CloudSun className="size-4" aria-hidden />,
              title: "Seasonality",
              copy: "Detects the annual shape in the data — December peaks, rainy-season dips, school-term effects — and projects it forward.",
            },
            {
              icon: <Sparkles className="size-4" aria-hidden />,
              title: "Promotions and events",
              copy: "Flag a promo, a price change or a local event and the uplift is priced into the affected weeks, not guessed afterwards.",
            },
            {
              icon: <RefreshCw className="size-4" aria-hidden />,
              title: "Supplier lead time",
              copy: "The forecast is converted into an order date, not just a quantity: when it has to be placed to arrive on time.",
            },
            {
              icon: <Gauge className="size-4" aria-hidden />,
              title: "Confidence, not certainty",
              copy: "New SKUs and erratic sellers carry a wider band. A 62% forecast is labelled as one — you decide how much buffer to hold.",
            },
          ]}
        />
        <NumberedSteps
          steps={[
            {
              step: "01",
              title: "Collect",
              copy: "Sales, returns, transfers and signed-off counts are read from the ledger — no separate export.",
            },
            {
              step: "02",
              title: "Model",
              copy: "Trend, weekday shape, seasonality and promo flags are fitted per SKU per location, weekly.",
            },
            {
              step: "03",
              title: "Check",
              copy: "Last week's forecast is scored against what actually sold; the error rate is visible to the buying team.",
            },
            {
              step: "04",
              title: "Act",
              copy: "The forecast becomes cover days, a transfer suggestion or a purchase order draft with an order-by date.",
            },
          ]}
        />
      </PageSection>

      <PageSection
        eyebrow="Outcomes"
        title="What eight weeks of look-ahead changes"
        subtitle="Forecasting is only worth the effort if it moves a number the business already cares about."
      >
        <StatRow
          stats={[
            { value: "8", label: "weeks of cover", note: "Enough runway to order, land and redistribute before a peak." },
            { value: "94%", label: "median accuracy", note: "Top-selling SKUs with 26 weeks of history, backtested weekly." },
            { value: "−31%", label: "emergency buys", note: "Fewer premium-price top-up orders placed at the last minute." },
          ]}
        />
        <FeatureCards
          items={[
            {
              icon: <RefreshCw className="size-4" aria-hidden />,
              title: "Buy once, not twice",
              copy: "Order sizes follow the eight-week shape, so a store that peaks in week six is stocked for week six.",
            },
            {
              icon: <Warehouse className="size-4" aria-hidden />,
              title: "Transfer before you buy",
              copy: "The same forecast compares locations, so surplus at Ikeja is moved to Lekki before a new order is raised.",
            },
            {
              icon: <Sparkles className="size-4" aria-hidden />,
              title: "Explain the number",
              copy: "Every suggestion carries its inputs, so a buyer can accept, adjust or override with a reason on record.",
            },
          ]}
        />
      </PageSection>

      <PageSection
        eyebrow="Questions"
        title="Forecasting questions"
        subtitle="What buying teams ask before they trust the number."
      >
        <FaqList
          columns={2}
          items={[
            {
              q: "How much sales history does the forecast need?",
              a: "Twelve weeks is the minimum for a usable forecast. Twenty-six weeks or more gives a stable seasonal shape, and Stoq labels confidence lower while it is still learning a new SKU.",
            },
            {
              q: "Does the forecast change per location?",
              a: "Yes. Each location has its own velocity, weekday pattern and capacity. Stoq never averages a store with a warehouse: the warehouse is forecast on what it ships out, the store on what it sells over the counter.",
            },
            {
              q: "What happens with a new product?",
              a: "A new SKU starts from its category's behaviour and an explicit launch assumption, with wide confidence. As real sales arrive, the model shifts to the product's own history.",
            },
            {
              q: "Can I override a forecast?",
              a: "You can override the quantity on any order, and the reason is kept with the draft. Overrides also feed back into the model as a signal rather than being discarded.",
            },
            {
              q: "How often is it recalculated?",
              a: "Weekly by default, and immediately when a large movement lands: a promotion, a bulk wholesale sale or a stock-out that truncated demand.",
            },
            {
              q: "Do I need a data team?",
              a: "No. The model runs inside Stoq on your ledger. The buying team sees cover days, confidence and an order-by date, not a notebook.",
            },
          ]}
        />
      </PageSection>

      <Cta />
    </MarketingPage>
  );
}
