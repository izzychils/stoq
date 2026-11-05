import { Download, Store, ReceiptText, Wallet } from "lucide-react";
import { AreaChart, Bars } from "@/components/dashboard/charts";
import { KpiCard } from "@/components/dashboard/kpi";
import { PageHeader, Panel } from "@/components/dashboard/page-parts";
import {
  branchPerformance,
  locationName,
  monthlyRevenue,
  revenueSeries,
  salesOrders,
  topMovers,
} from "@/lib/data";
import { naira, number } from "@/lib/utils";

export default function SalesPage() {
  const total = salesOrders.reduce((sum, order) => sum + order.value, 0);
  const units = salesOrders.reduce((sum, order) => sum + order.units, 0);
  const wholesale = salesOrders
    .filter((order) => order.channel === "Wholesale")
    .reduce((sum, order) => sum + order.value, 0);

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Commerce"
        title="Sales"
        description="Walk-in, wholesale and online orders against the same stock. Every line reduces the location it was sold from."
        actions={
          <button
            type="button"
            className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-white/[0.09] bg-white/[0.03] px-3 text-[11.5px] font-semibold text-bone hover:border-white/20"
          >
            <Download className="size-3.5" aria-hidden />
            Export day
          </button>
        }
      />

      <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-4">
        <KpiCard label="Today" value={naira(total)} change={12.4} detail="8 orders shown" />
        <KpiCard label="Units sold" value={number(units)} detail="all channels" tone="neutral" />
        <KpiCard label="Wholesale share" value={`${Math.round((wholesale / total) * 100)}%`} detail={naira(wholesale)} tone="azure" icon={<Store className="size-3.5" aria-hidden />} />
        <KpiCard label="Avg. basket" value={naira(Math.round(total / salesOrders.length))} detail="per order" tone="lime" icon={<Wallet className="size-3.5" aria-hidden />} />
      </div>

      <div className="grid gap-2.5 xl:grid-cols-[1.4fr_1fr]">
        <Panel title="This week" subtitle="Revenue by day · all channels" bodyClassName="p-4">
          <AreaChart
            id="sales-week"
            data={revenueSeries.map((point) => ({ label: point.label, value: point.value }))}
            height={170}
          />
        </Panel>
        <Panel title="Monthly revenue" subtitle="Six months · ₦ millions" bodyClassName="p-4">
          <Bars
            data={monthlyRevenue.map((point) => ({ label: point.month, value: point.revenue }))}
            height={150}
          />
          <p className="mt-2 text-[9.5px] text-fog-faint">
            November is month-to-date. September was the strongest full month at ₦66.1m.
          </p>
        </Panel>
      </div>

      <Panel
        title="Recent orders"
        subtitle="Today · 5 November 2026"
        action={<ReceiptText className="size-3.5 text-fog-faint" aria-hidden />}
        bodyClassName="overflow-x-auto"
      >
        <table className="w-full min-w-[720px] text-left">
          <thead>
            <tr className="border-b border-white/[0.06] text-[8.5px] uppercase tracking-[0.1em] text-fog-faint">
              <th className="px-4 py-2 font-semibold">Order</th>
              <th className="px-4 py-2 font-semibold">Customer</th>
              <th className="px-4 py-2 font-semibold">Channel</th>
              <th className="px-4 py-2 font-semibold">Location</th>
              <th className="px-4 py-2 text-right font-semibold">Units</th>
              <th className="px-4 py-2 text-right font-semibold">Value</th>
              <th className="px-4 py-2 font-semibold">Payment</th>
              <th className="px-4 py-2 text-right font-semibold">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.045]">
            {salesOrders.map((order) => (
              <tr key={order.id} className="hover:bg-white/[0.02]">
                <td className="px-4 py-2.5 font-mono text-[9px] text-azure-300">{order.id}</td>
                <td className="px-4 py-2.5 text-[10.5px] text-bone">{order.customer}</td>
                <td className="px-4 py-2.5 text-[9.5px] text-fog">{order.channel}</td>
                <td className="px-4 py-2.5 text-[9.5px] text-fog">{locationName(order.location)}</td>
                <td className="px-4 py-2.5 text-right text-[10px] tnum text-fog">{order.units}</td>
                <td className="px-4 py-2.5 text-right text-[10px] tnum text-bone">{naira(order.value)}</td>
                <td className="px-4 py-2.5 text-[9.5px] text-fog">{order.payment}</td>
                <td className="px-4 py-2.5 text-right text-[9.5px] tnum text-fog-faint">{order.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>

      <div className="grid gap-2.5 md:grid-cols-2">
        <Panel title="Top products" subtitle="Units this week" bodyClassName="divide-y divide-white/[0.045]">
          {topMovers.map((mover) => (
            <div key={mover.name} className="flex items-center justify-between px-4 py-2.5">
              <span className="text-[10.5px] text-bone">{mover.name}</span>
              <span className="text-[10px] tnum text-fog">
                {mover.units} · {naira(mover.revenue)}
              </span>
            </div>
          ))}
        </Panel>
        <Panel title="By location" subtitle="Revenue today" bodyClassName="divide-y divide-white/[0.045]">
          {branchPerformance.map((branch) => (
            <div key={branch.location} className="flex items-center justify-between px-4 py-2.5">
              <span className="text-[10.5px] text-bone">{branch.location}</span>
              <span className="text-[10px] tnum text-fog">{naira(branch.revenue)}</span>
            </div>
          ))}
        </Panel>
      </div>
    </div>
  );
}
