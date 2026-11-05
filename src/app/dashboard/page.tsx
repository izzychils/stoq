import Link from "next/link";
import {
  ArrowRight,
  ArrowLeftRight,
  Boxes,
  CircleDollarSign,
  ClipboardList,
  PackageSearch,
  ScanBarcode,
  Sparkles,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";
import { AreaChart, Donut } from "@/components/dashboard/charts";
import { KpiCard, StatusPill } from "@/components/dashboard/kpi";
import { PageHeader, Panel } from "@/components/dashboard/page-parts";
import {
  alerts,
  branchPerformance,
  categoryMix,
  forecastProducts,
  locations,
  products,
  revenueSeries,
  stockStatus,
  topMovers,
  totalStockValue,
  totalStock,
} from "@/lib/data";
import { compactNaira, naira, number } from "@/lib/utils";

export default function DashboardOverview() {
  const lowStock = products.filter((product) => {
    const status = stockStatus(product);
    return status === "low" || status === "critical" || status === "out";
  });
  const units = products.reduce((sum, product) => sum + totalStock(product), 0);

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Thursday · 5 November 2026"
        title="Stock overview"
        description="Chain-wide position across four locations, with the decisions that need a human today."
        actions={
          <>
            <Link
              href="/dashboard/inventory"
              className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-white/[0.09] bg-white/[0.03] px-3 text-[11.5px] font-semibold text-bone hover:border-white/20"
            >
              <ScanBarcode className="size-3.5" aria-hidden />
              Scan stock
            </Link>
            <Link
              href="/dashboard/transfers"
              className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-azure-500 px-3 text-[11.5px] font-bold text-white hover:bg-azure-400"
            >
              <ArrowLeftRight className="size-3.5" aria-hidden />
              New transfer
            </Link>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-4">
        <KpiCard
          label="Revenue this week"
          value="₦20.9m"
          change={9.8}
          detail="vs last week"
          icon={<CircleDollarSign className="size-3.5" aria-hidden />}
        />
        <KpiCard
          label="Stock value"
          value={compactNaira(totalStockValue)}
          detail={`${number(units)} units · 18 SKUs`}
          icon={<Boxes className="size-3.5" aria-hidden />}
          tone="neutral"
        />
        <KpiCard
          label="Below reorder"
          value={`${lowStock.length} SKUs`}
          detail="2 stock-outs"
          icon={<TriangleAlert className="size-3.5" aria-hidden />}
          tone="amber"
        />
        <KpiCard
          label="Fill rate"
          value="94.2%"
          change={3.1}
          detail="chain-wide"
          icon={<TrendingUp className="size-3.5" aria-hidden />}
          tone="lime"
        />
      </div>

      <div className="grid gap-2.5 xl:grid-cols-[1.5fr_1fr]">
        <Panel
          title="Revenue · last 7 days"
          subtitle="All channels · walk-in, wholesale and online"
          action={
            <span className="rounded-full bg-lime-400/10 px-2 py-1 text-[10px] font-bold text-lime-300">
              +9.8%
            </span>
          }
          bodyClassName="p-4"
        >
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <p className="text-[28px] font-bold leading-none tracking-tight tnum text-bone">
                ₦20.90m
              </p>
              <p className="mt-1.5 text-[10.5px] text-fog-faint">
                Saturday peak ₦4.21m · 1,420 orders
              </p>
            </div>
            <div className="flex gap-3 text-[9.5px]">
              <span className="inline-flex items-center gap-1.5 text-fog-dim">
                <span className="size-1.5 rounded-full bg-azure-500" />
                Revenue
              </span>
              <span className="inline-flex items-center gap-1.5 text-fog-dim">
                <span className="size-1.5 rounded-full bg-lime-400" />
                Target ₦22m
              </span>
            </div>
          </div>
          <AreaChart
            id="overview-revenue"
            data={revenueSeries.map((point) => ({ label: point.label, value: point.value }))}
            height={168}
            className="mt-4"
          />
        </Panel>

        <Panel title="Category mix" subtitle="Share of stock value" bodyClassName="p-4">
          <Donut
            segments={categoryMix}
            size={112}
            thickness={11}
            centerValue="₦48m"
            centerLabel="on hand"
          />
        </Panel>
      </div>

      <div className="grid gap-2.5 xl:grid-cols-[1.2fr_1fr_1fr]">
        <Panel
          title="Needs attention"
          subtitle={`${alerts.length} open signals`}
          action={
            <Link href="/dashboard/inventory" className="text-[10px] font-semibold text-azure-300">
              View all
            </Link>
          }
          bodyClassName="divide-y divide-white/[0.045]"
        >
          {alerts.slice(0, 4).map((alert) => (
            <div key={alert.id} className="flex items-start gap-2.5 px-4 py-2.5">
              <span
                className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg border ${
                  alert.severity === "high"
                    ? "border-rose/25 bg-rose/10 text-rose-soft"
                    : "border-amber/25 bg-amber/10 text-amber-soft"
                }`}
              >
                <PackageSearch className="size-3" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-[11px] font-semibold text-bone">{alert.product}</p>
                  <StatusPill status={alert.type === "out-of-stock" ? "out" : "low"} />
                </div>
                <p className="mt-0.5 text-[9.5px] leading-snug text-fog-faint">{alert.message}</p>
              </div>
            </div>
          ))}
        </Panel>

        <Panel
          title="Fast movers"
          subtitle="Units this week"
          action={<span className="text-[9.5px] text-fog-faint">7 days</span>}
          bodyClassName="divide-y divide-white/[0.045]"
        >
          {topMovers.slice(0, 4).map((mover) => (
            <div key={mover.name} className="flex items-center justify-between gap-2 px-4 py-2.5">
              <div className="min-w-0">
                <p className="truncate text-[11px] font-semibold text-bone">{mover.name}</p>
                <p className="text-[9px] text-fog-faint">{naira(mover.revenue)} revenue</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-bold tnum text-bone">{mover.units}</p>
                <p
                  className={`text-[9px] tnum ${mover.change >= 0 ? "text-lime-300" : "text-rose-soft"}`}
                >
                  {mover.change > 0 ? "+" : ""}
                  {mover.change}%
                </p>
              </div>
            </div>
          ))}
        </Panel>

        <Panel
          title="Forecast queue"
          subtitle="Next purchase decisions"
          action={<Sparkles className="size-3.5 text-azure-300" aria-hidden />}
          bodyClassName="divide-y divide-white/[0.045]"
        >
          {forecastProducts.slice(0, 4).map((item) => (
            <div key={item.name} className="flex items-center justify-between gap-2 px-4 py-2.5">
              <div className="min-w-0">
                <p className="truncate text-[11px] font-semibold text-bone">{item.name}</p>
                <p className="text-[9px] text-fog-faint">{item.note}</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-bold tnum text-lime-300">{item.forecast}</p>
                <p className="text-[9px] text-fog-faint">{item.confidence}% conf.</p>
              </div>
            </div>
          ))}
        </Panel>
      </div>

      <div className="grid gap-2.5 xl:grid-cols-[1.2fr_1fr]">
        <Panel
          title="Location performance"
          subtitle="Today · revenue, orders, fill rate"
          action={
            <Link
              href="/dashboard/locations"
              className="inline-flex items-center gap-1 text-[10px] font-semibold text-azure-300"
            >
              Locations
              <ArrowRight className="size-3" aria-hidden />
            </Link>
          }
          bodyClassName="overflow-x-auto"
        >
          <table className="w-full min-w-[520px] text-left">
            <thead>
              <tr className="border-b border-white/[0.06] text-[8.5px] uppercase tracking-[0.1em] text-fog-faint">
                <th className="px-4 py-2 font-semibold">Location</th>
                <th className="px-4 py-2 text-right font-semibold">Revenue</th>
                <th className="px-4 py-2 text-right font-semibold">Orders</th>
                <th className="px-4 py-2 text-right font-semibold">Fill</th>
                <th className="px-4 py-2 text-right font-semibold">Alerts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.045]">
              {branchPerformance.map((branch) => (
                <tr key={branch.location} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-2.5 text-[11px] font-medium text-bone">{branch.location}</td>
                  <td className="px-4 py-2.5 text-right text-[10.5px] tnum text-fog">
                    {naira(branch.revenue)}
                  </td>
                  <td className="px-4 py-2.5 text-right text-[10.5px] tnum text-fog">
                    {branch.orders}
                  </td>
                  <td className="px-4 py-2.5 text-right text-[10.5px] tnum">
                    <span className={branch.fill >= 94 ? "text-lime-300" : "text-amber-soft"}>
                      {branch.fill}%
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right text-[10.5px] tnum text-fog">
                    {branch.alerts}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel
          title="Location capacity"
          subtitle="Stock on hand vs storage"
          action={<ClipboardList className="size-3.5 text-fog-faint" aria-hidden />}
          bodyClassName="space-y-2.5 p-4"
        >
          {locations.map((location) => (
            <div key={location.id}>
              <div className="flex items-center justify-between text-[10.5px]">
                <span className="text-fog">{location.name}</span>
                <span className="tnum font-semibold text-bone">{location.capacity}%</span>
              </div>
              <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                <span
                  className={`block h-full rounded-full ${
                    location.capacity > 75 ? "bg-amber" : "bg-azure-500"
                  }`}
                  style={{ width: `${location.capacity}%` }}
                />
              </span>
              <p className="mt-1 text-[9px] text-fog-faint">
                {location.staff} staff · {location.manager}
              </p>
            </div>
          ))}
        </Panel>
      </div>
    </div>
  );
}
