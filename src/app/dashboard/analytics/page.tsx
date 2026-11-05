import { Download, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { Bars, Donut } from "@/components/dashboard/charts";
import { KpiCard } from "@/components/dashboard/kpi";
import { PageHeader, Panel } from "@/components/dashboard/page-parts";
import { Meter } from "@/components/ui";
import {
  branchPerformance,
  categoryMix,
  monthlyRevenue,
  slowMovers,
  topMovers,
} from "@/lib/data";
import { naira } from "@/lib/utils";

export default function AnalyticsPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Insight"
        title="Analytics"
        description="Margin, movement and loss, by product and location. The numbers the Monday meeting actually needs."
        actions={
          <button
            type="button"
            className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-white/[0.09] bg-white/[0.03] px-3 text-[11.5px] font-semibold text-bone hover:border-white/20"
          >
            <Download className="size-3.5" aria-hidden />
            Export report
          </button>
        }
      />

      <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-4">
        <KpiCard label="Revenue (MTD)" value="₦20.9m" change={9.8} detail="vs October pace" icon={<Wallet className="size-3.5" aria-hidden />} />
        <KpiCard label="Gross margin" value="26.4%" change={1.2} detail="blended" tone="lime" icon={<TrendingUp className="size-3.5" aria-hidden />} />
        <KpiCard label="Shrinkage" value="0.8%" change={-0.3} detail="of stock value" tone="amber" icon={<TrendingDown className="size-3.5" aria-hidden />} />
        <KpiCard label="Dead stock" value="₦1.2m" detail="13+ weeks cover" tone="rose" />
      </div>

      <div className="grid gap-2.5 xl:grid-cols-[1.4fr_1fr]">
        <Panel title="Revenue trend" subtitle="Six months · ₦ millions" bodyClassName="p-4">
          <Bars
            data={monthlyRevenue.map((point) => ({ label: point.month, value: point.revenue }))}
            height={190}
          />
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              { label: "Best month", value: "September", note: "₦66.1m" },
              { label: "Orders", value: "4,890", note: "October" },
              { label: "Growth", value: "+19.4%", note: "Jun → Oct" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
                <p className="text-[8.5px] uppercase tracking-wide text-fog-faint">{stat.label}</p>
                <p className="mt-1 text-[11px] font-bold text-bone">{stat.value}</p>
                <p className="text-[9px] text-fog-faint">{stat.note}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Stock value by category" subtitle="At cost" bodyClassName="p-4">
          <Donut segments={categoryMix} size={112} thickness={11} centerValue="18" centerLabel="SKUs" />
          <p className="mt-3 border-t border-white/[0.06] pt-2.5 text-[9px] leading-relaxed text-fog-faint">
            Groceries carry the highest value and the fastest turn. Beverages are the most
            volatile week to week.
          </p>
        </Panel>
      </div>

      <div className="grid gap-2.5 lg:grid-cols-3">
        <Panel title="Fast movers" subtitle="Units this week" bodyClassName="divide-y divide-white/[0.045]">
          {topMovers.map((mover) => (
            <div key={mover.name} className="px-4 py-2.5">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-[10.5px] text-bone">{mover.name}</p>
                <p className="text-[10px] font-semibold tnum text-bone">{mover.units}</p>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-[9px] text-fog-faint">{naira(mover.revenue)}</span>
                <span className={`text-[9px] tnum ${mover.change >= 0 ? "text-lime-300" : "text-rose-soft"}`}>
                  {mover.change > 0 ? "+" : ""}
                  {mover.change}%
                </span>
              </div>
            </div>
          ))}
        </Panel>

        <Panel title="Slow movers" subtitle="Cover above target" bodyClassName="divide-y divide-white/[0.045]">
          {slowMovers.map((mover) => (
            <div key={mover.name} className="px-4 py-2.5">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-[10.5px] text-bone">{mover.name}</p>
                <span className="text-[9px] text-amber-soft">{mover.cover}w</span>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-[9px] text-fog-faint">{mover.units} units/wk</span>
                <span className="text-[9px] text-fog-dim">{mover.note}</span>
              </div>
            </div>
          ))}
        </Panel>

        <Panel title="Fill rate by location" subtitle="Today" bodyClassName="space-y-3 p-4">
          {branchPerformance.map((branch) => (
            <div key={branch.location}>
              <div className="flex items-center justify-between text-[10px]">
                <span className="truncate text-fog">{branch.location}</span>
                <span className={`tnum ${branch.fill >= 94 ? "text-lime-300" : "text-amber-soft"}`}>
                  {branch.fill}%
                </span>
              </div>
              <Meter value={branch.fill} tone={branch.fill >= 94 ? "lime" : "amber"} className="mt-1" />
            </div>
          ))}
          <p className="border-t border-white/[0.06] pt-2 text-[9px] leading-relaxed text-fog-faint">
            Online fulfilment is the constraint at 88%. Sugar and diapers are the missing
            lines.
          </p>
        </Panel>
      </div>

      <Panel title="Margin watch" subtitle="Contribution by category" bodyClassName="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left">
          <thead>
            <tr className="border-b border-white/[0.06] text-[8.5px] uppercase tracking-[0.1em] text-fog-faint">
              <th className="px-4 py-2 font-semibold">Category</th>
              <th className="px-4 py-2 text-right font-semibold">Stock value</th>
              <th className="px-4 py-2 text-right font-semibold">Revenue / wk</th>
              <th className="px-4 py-2 text-right font-semibold">Margin</th>
              <th className="px-4 py-2 font-semibold">Turn</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.045]">
            {[
              { category: "Groceries", value: "₦16.4m", revenue: "₦8.9m", margin: "24.1%", turn: "Fast" },
              { category: "Beverages", value: "₦11.6m", revenue: "₦6.2m", margin: "31.8%", turn: "Fast" },
              { category: "Home care", value: "₦8.7m", revenue: "₦3.1m", margin: "28.4%", turn: "Steady" },
              { category: "Grains", value: "₦7.6m", revenue: "₦1.8m", margin: "18.2%", turn: "Slow" },
              { category: "Personal care", value: "₦3.9m", revenue: "₦1.4m", margin: "26.9%", turn: "Steady" },
              { category: "Snacks", value: "₦1.9m", revenue: "₦0.6m", margin: "33.5%", turn: "Fast" },
            ].map((row) => (
              <tr key={row.category} className="hover:bg-white/[0.02]">
                <td className="px-4 py-2.5 text-[10.5px] text-bone">{row.category}</td>
                <td className="px-4 py-2.5 text-right text-[10px] tnum text-fog">{row.value}</td>
                <td className="px-4 py-2.5 text-right text-[10px] tnum text-fog">{row.revenue}</td>
                <td className="px-4 py-2.5 text-right text-[10px] tnum text-lime-300">{row.margin}</td>
                <td className="px-4 py-2.5 text-[9.5px] text-fog-dim">{row.turn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}
