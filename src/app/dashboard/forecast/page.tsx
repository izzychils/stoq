import Link from "next/link";
import { ArrowRight, CalendarClock, Sparkles, TrendingUp } from "lucide-react";
import { ForecastChart } from "@/components/dashboard/charts";
import { KpiCard } from "@/components/dashboard/kpi";
import { PageHeader, Panel } from "@/components/dashboard/page-parts";
import { Meter } from "@/components/ui";
import { forecastProducts, forecastSeries, products } from "@/lib/data";
import { naira } from "@/lib/utils";

export default function ForecastPage() {
  const shortCover = forecastProducts.filter((item) => item.cover < 60);

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Intelligence"
        title="Demand forecast"
        description="Eight weeks out, per SKU and location. Built from this chain's sales history, weekday rhythm and supplier lead time."
        actions={
          <button
            type="button"
            className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-azure-500 px-3 text-[11.5px] font-bold text-white hover:bg-azure-400"
          >
            <Sparkles className="size-3.5" aria-hidden />
            Draft reorder plan
          </button>
        }
      />

      <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-4">
        <KpiCard label="Model confidence" value="94%" detail="bottled water" tone="lime" icon={<TrendingUp className="size-3.5" aria-hidden />} />
        <KpiCard label="SKUs rising" value="9" detail="velocity week on week" tone="azure" />
        <KpiCard label="SKUs declining" value="3" detail="cover above target" tone="amber" />
        <KpiCard label="Next reorder" value="19 Nov" detail="480 units · water" tone="neutral" icon={<CalendarClock className="size-3.5" aria-hidden />} />
      </div>

      <div className="grid gap-2.5 xl:grid-cols-[1.5fr_1fr]">
        <Panel
          title="Bottled water · 75 cl"
          subtitle="Units per week · actual vs forecast"
          action={<span className="rounded-full bg-lime-400/10 px-2 py-0.5 text-[9px] font-bold text-lime-300">94% confidence</span>}
          bodyClassName="p-4"
        >
          <ForecastChart id="dashboard-forecast" data={forecastSeries} height={220} />
          <p className="mt-2 text-[9.5px] leading-relaxed text-fog-faint">
            Week 6 onwards is projected. Weekend demand runs 1.8× weekday and the holiday
            peak begins in week 6 — order before 19 November to keep nine days of buffer.
          </p>
        </Panel>

        <Panel title="Reorder suggestions" subtitle="Sorted by urgency" bodyClassName="divide-y divide-white/[0.045]">
          {shortCover.map((item) => (
            <div key={item.name} className="px-4 py-2.5">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-[10.5px] font-semibold text-bone">{item.name}</p>
                <span className="text-[9px] tnum text-amber-soft">{item.cover}d cover</span>
              </div>
              <div className="mt-1.5 flex items-center justify-between gap-2">
                <Meter value={item.confidence} tone="azure" className="max-w-[120px]" />
                <Link
                  href="/dashboard/purchase-orders"
                  className="inline-flex items-center gap-1 text-[9px] font-semibold text-azure-300"
                >
                  Draft PO
                  <ArrowRight className="size-2.5" aria-hidden />
                </Link>
              </div>
            </div>
          ))}
          <div className="px-4 py-3">
            <p className="text-[9px] leading-relaxed text-fog-faint">
              {products.length} SKUs modelled · minimum 12 weeks of history required per
              location. Rounded to carton sizes on draft.
            </p>
          </div>
        </Panel>
      </div>

      <Panel title="Forecast board" subtitle="All modelled SKUs · next 8 weeks" bodyClassName="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left">
          <thead>
            <tr className="border-b border-white/[0.06] text-[8.5px] uppercase tracking-[0.1em] text-fog-faint">
              <th className="px-4 py-2 font-semibold">Product</th>
              <th className="px-4 py-2 text-right font-semibold">Now / wk</th>
              <th className="px-4 py-2 text-right font-semibold">Forecast / wk</th>
              <th className="px-4 py-2 font-semibold">Confidence</th>
              <th className="px-4 py-2 text-right font-semibold">Cover</th>
              <th className="px-4 py-2 font-semibold">Signal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.045]">
            {forecastProducts.map((item) => {
              const cost = products.find((product) => product.name.startsWith(item.name.split(" ").slice(0, 2).join(" ")))?.cost ?? 0;
              return (
                <tr key={item.name} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-2.5">
                    <p className="text-[10.5px] font-semibold text-bone">{item.name}</p>
                    <p className="text-[9px] text-fog-faint">{item.category}</p>
                  </td>
                  <td className="px-4 py-2.5 text-right text-[10px] tnum text-fog">{item.velocity}</td>
                  <td className="px-4 py-2.5 text-right text-[10.5px] font-semibold tnum text-lime-300">
                    {item.forecast}
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <Meter value={item.confidence} tone="azure" className="max-w-[70px]" />
                      <span className="text-[9px] tnum text-fog-faint">{item.confidence}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-right text-[10px] tnum text-fog">{item.cover}d</td>
                  <td className="px-4 py-2.5 text-[9.5px] text-fog">{item.note}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Panel>

      <p className="text-[10px] leading-relaxed text-fog-faint">
        Demo model · sample chain of 18 SKUs. Values are illustrative and would be recalculated
        nightly against the workspace&apos;s own sales history ({naira(48200000)} stock value
        modelled).
      </p>
    </div>
  );
}
