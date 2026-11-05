import { ArrowRight, Check, CloudSun, LineChart, RefreshCw, Sparkles, TrendingUp } from "lucide-react";
import { ForecastChart } from "@/components/dashboard/charts";
import { Reveal } from "@/components/motion/reveal";
import { Badge, ButtonLink, IconTile, SectionHeading, Meter } from "@/components/ui";
import { GlassCard } from "@/components/ui/glass-card";
import { forecastProducts, forecastSeries } from "@/lib/data";
import { cn, naira } from "@/lib/utils";

export function Forecast() {
  return (
    <section id="forecast" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="aurora right-[6%] top-[10%] h-[24rem] w-[30rem] bg-lime-400/[0.06]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1200px] gap-12 px-5 py-24 sm:px-8 sm:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <Reveal>
          <Badge tone="lime">
            <TrendingUp className="size-3" aria-hidden />
            Demand forecasting
          </Badge>
          <h2 className="mt-5 text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.03] tracking-[-0.045em] text-bone">
            Buy for the next
            <br />
            eight <span className="gradient-text">weeks</span>, not the last one.
          </h2>
          <p className="mt-5 max-w-md text-[14px] leading-relaxed text-fog">
            A stock system can tell you what happened. Stoq forecasts what is about to —
            per SKU, per location, with the weekend uplift and the promo bump already
            priced in.
          </p>

          <ul className="mt-7 space-y-3">
            {[
              "Uses at least 12 weeks of your own sales history.",
              "Separate forecast and cover for each location.",
              "Every suggestion explains its inputs and confidence.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[13px] text-bone/80">
                <Check className="mt-0.5 size-4 shrink-0 text-lime-400" aria-hidden />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-2">
            {[
              { icon: CloudSun, label: "Seasonality" },
              { icon: Sparkles, label: "Promotions" },
              { icon: LineChart, label: "Trend" },
              { icon: RefreshCw, label: "Lead time" },
            ].map((chip) => (
              <span
                key={chip.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[10.5px] text-fog"
              >
                <chip.icon className="size-3 text-azure-300/80" aria-hidden />
                {chip.label}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={90}>
          <GlassCard intensity="strong" hairline className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-[0.14em] text-fog-faint">
                  Bottled water · 75 cl
                </p>
                <p className="mt-1 text-[14px] font-semibold text-bone">
                  Units per week · forecast vs actual
                </p>
              </div>
              <span className="rounded-full bg-lime-400/10 px-2 py-0.5 text-[9px] font-bold text-lime-300">
                94% confidence
              </span>
            </div>

            <ForecastChart id="landing-forecast" data={forecastSeries} height={196} />

            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { label: "Next week", value: "438", note: "+6.3%" },
                { label: "Peak (W8)", value: "512", note: "holiday" },
                { label: "Reorder by", value: "19 Nov", note: "480 units" },
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
                Weekend demand is 1.8× weekday and the pre-holiday peak starts in week 6.
                A 480-unit order placed this week lands with 9 days of buffer.
              </p>
            </div>
          </GlassCard>
        </Reveal>
      </div>

      <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Forecast board"
            title={
              <>
                Six SKUs. <span className="gradient-text">Six decisions.</span>
              </>
            }
            subtitle="The buying board, ranked by what needs action rather than alphabetically."
          />
        </Reveal>

        <Reveal delay={60} className="mt-8">
          <div className="glass overflow-hidden rounded-2xl">
            <div className="hidden grid-cols-[1.6fr_0.7fr_0.7fr_0.8fr_0.7fr] gap-3 border-b border-white/[0.06] px-5 py-3 text-[9px] uppercase tracking-[0.1em] text-fog-faint sm:grid">
              <span>Product</span>
              <span className="text-right">Now / wk</span>
              <span className="text-right">Forecast</span>
              <span>Confidence</span>
              <span className="text-right">Cover</span>
            </div>
            {forecastProducts.map((product) => (
              <div
                key={product.name}
                className="grid grid-cols-2 gap-3 border-b border-white/[0.045] px-5 py-3 last:border-0 sm:grid-cols-[1.6fr_0.7fr_0.7fr_0.8fr_0.7fr] sm:items-center"
              >
                <div className="col-span-2 min-w-0 sm:col-span-1">
                  <p className="truncate text-[11.5px] font-semibold text-bone">{product.name}</p>
                  <p className="text-[9.5px] text-fog-faint">
                    {product.category} · {product.note}
                  </p>
                </div>
                <p className="text-right text-[10.5px] tnum text-fog">{product.velocity}</p>
                <p className="text-right text-[10.5px] font-semibold tnum text-lime-300">
                  {product.forecast}
                </p>
                <div className="hidden items-center gap-2 sm:flex">
                  <Meter value={product.confidence} tone="azure" className="max-w-[64px]" />
                  <span className="text-[9.5px] tnum text-fog-dim">{product.confidence}%</span>
                </div>
                <p
                  className={cn(
                    "text-right text-[10.5px] tnum",
                    product.cover < 60 ? "text-amber-soft" : "text-fog",
                  )}
                >
                  {product.cover}d
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Reorder() {
  return (
    <section id="reorder" className="relative border-y border-white/[0.06] bg-[#050810]">
      <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-5 py-24 sm:px-8 sm:py-28 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <Reveal className="order-2 lg:order-1">
          <GlassCard intensity="strong" hairline className="overflow-hidden p-0">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-3.5">
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

            <div className="divide-y divide-white/[0.045]">
              {[
                { name: "Washing detergent 1 kg", units: 480, cost: 1416000, cover: 2.9 },
                { name: "Instant noodles carton", units: 360, cost: 2736000, cover: 3.1 },
                { name: "Baby diapers M", units: 240, cost: 1776000, cover: 1.8 },
                { name: "Energy drink 250 ml", units: 480, cost: 1320000, cover: 4.2 },
              ].map((row) => (
                <div key={row.name} className="flex items-center justify-between gap-3 px-5 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-[11.5px] font-semibold text-bone">{row.name}</p>
                    <p className="text-[9.5px] text-fog-faint">{row.cover} weeks of cover</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] font-bold tnum text-azure-300">+{row.units}</p>
                    <p className="text-[9px] tnum text-fog-faint">{naira(row.cost)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-white/[0.07] bg-black/25 px-5 py-3.5">
              <div>
                <p className="text-[9px] uppercase tracking-wide text-fog-faint">Order total</p>
                <p className="text-[16px] font-bold tnum text-bone">₦7.25m</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-lime-400 px-3 py-2 text-[10.5px] font-bold text-ink-950">
                Approve draft
                <ArrowRight className="size-3" aria-hidden />
              </span>
            </div>
          </GlassCard>
        </Reveal>

        <Reveal delay={80} className="order-1 lg:order-2">
          <p className="mono-label !text-azure-300/80">Automated restocking</p>
          <h2 className="mt-4 text-[clamp(1.9rem,4vw,2.9rem)] font-semibold leading-[1.04] tracking-[-0.045em] text-bone">
            The order is
            <br />
            already <span className="gradient-text">drafted</span>.
          </h2>
          <p className="mt-4 max-w-md text-[14px] leading-relaxed text-fog">
            Stoq watches velocity, cover days and supplier lead time. When a SKU drops
            below its reorder point, the quantity is calculated and the draft is waiting —
            with the reasoning shown, and nothing sent until a human approves.
          </p>

          <div className="mt-7 grid gap-2 sm:grid-cols-2">
            {[
              { title: "Reorder points", note: "Recalculated on every sale" },
              { title: "Lead-time buffer", note: "Extra cover for slow suppliers" },
              { title: "Bulk rounding", note: "Order in cartons, not singles" },
              { title: "Approval trail", note: "Who approved, when, at what price" },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                <p className="text-[11px] font-semibold text-bone">{item.title}</p>
                <p className="mt-0.5 text-[9.5px] text-fog-faint">{item.note}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
