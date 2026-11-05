import {
  ArrowLeftRight,
  Bell,
  Boxes,
  LayoutDashboard,
  Plus,
  ScanLine,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { LogoMark } from "@/components/brand/logo";
import { AreaChart, Donut } from "@/components/dashboard/charts";
import { KpiCard, StatusPill } from "@/components/dashboard/kpi";
import { categoryMix, locations, products, revenueSeries } from "@/lib/data";
import { cn, naira } from "@/lib/utils";

const NAV = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: Boxes, label: "Inventory" },
  { icon: ArrowLeftRight, label: "Transfers", badge: "2" },
  { icon: TrendingUp, label: "Forecast" },
  { icon: Sparkles, label: "Assistant" },
];

export function BrowserFrame({
  children,
  url = "app.stoq.xyz/dashboard",
  className,
}: {
  children: React.ReactNode;
  url?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-ink-900/90 shadow-[0_60px_140px_-60px_rgba(0,0,0,1)]",
        className,
      )}
    >
      <div className="flex h-9 items-center gap-2 border-b border-white/[0.07] bg-black/30 px-3.5">
        <span className="size-2 rounded-full bg-[#ff5f57]" />
        <span className="size-2 rounded-full bg-[#febc2e]" />
        <span className="size-2 rounded-full bg-[#28c840]" />
        <span className="mx-auto hidden max-w-[18rem] flex-1 truncate rounded-full bg-black/40 px-3 py-1 text-center text-[10px] text-white/40 sm:block">
          {url}
        </span>
      </div>
      {children}
    </div>
  );
}

export function ConsolePreview() {
  const lowStock = products
    .map((product) => ({
      product,
      total: Object.values(product.stock).reduce((sum, value) => sum + value, 0),
    }))
    .sort((a, b) => a.total / a.product.reorderPoint - b.total / b.product.reorderPoint)
    .slice(0, 3);

  return (
    <BrowserFrame>
      <div className="flex min-h-[30rem] bg-[#05070e]">
        <aside className="hidden w-[176px] shrink-0 flex-col border-r border-white/[0.06] bg-black/20 p-3 lg:flex">
          <div className="flex items-center gap-2 px-1.5 py-1">
            <LogoMark className="size-6 rounded-md" />
            <span className="text-[12px] font-bold tracking-tight">stoq</span>
            <span className="ml-auto rounded border border-white/10 px-1 py-0.5 text-[8px] uppercase tracking-wide text-fog-faint">
              demo
            </span>
          </div>

          <div className="mt-4 space-y-0.5">
            {NAV.map(({ icon: Icon, label, active, badge }) => (
              <div
                key={label}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11px]",
                  active ? "bg-azure-500/12 text-azure-200" : "text-fog-dim",
                )}
              >
                <Icon className="size-3.5" aria-hidden />
                <span className="font-medium">{label}</span>
                {badge ? (
                  <span className="ml-auto rounded-full bg-azure-500/15 px-1.5 py-px text-[8.5px] font-bold text-azure-300">
                    {badge}
                  </span>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-2.5">
            <p className="text-[8.5px] uppercase tracking-[0.12em] text-fog-faint">Location</p>
            <p className="mt-1 flex items-center gap-1.5 text-[10.5px] font-semibold text-bone">
              <span className="size-1.5 rounded-full bg-lime-400" />
              All locations
            </p>
            <p className="mt-0.5 text-[9.5px] text-fog-faint">4 active · 1 warehouse</p>
          </div>

          <div className="mt-auto flex items-center gap-2 rounded-lg px-1.5 py-1.5">
            <span className="flex size-6 items-center justify-center rounded-full bg-azure-500/15 text-[9px] font-bold text-azure-300">
              KA
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[10px] font-semibold">Kola Adebayo</span>
              <span className="block truncate text-[9px] text-fog-faint">Operations lead</span>
            </span>
          </div>
        </aside>

        <div className="min-w-0 flex-1 p-3.5 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[9px] uppercase tracking-[0.14em] text-fog-faint">
                Thursday, 5 November 2026
              </p>
              <h3 className="mt-0.5 text-[15px] font-bold tracking-tight">Stock overview</h3>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="hidden items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-2 py-1.5 text-[9.5px] text-fog-dim sm:flex">
                <Search className="size-3" aria-hidden />
                Search 18 SKUs
                <kbd className="ml-1 rounded border border-white/10 px-1 text-[8px] text-fog-faint">⌘K</kbd>
              </span>
              <span className="flex size-7 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03]">
                <Bell className="size-3.5 text-fog-dim" aria-hidden />
              </span>
              <span className="flex items-center gap-1 rounded-lg bg-lime-400 px-2 py-1.5 text-[9.5px] font-bold text-ink-950">
                <ScanLine className="size-3" aria-hidden />
                Scan
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2.5 xl:grid-cols-4">
            <KpiCard label="Revenue today" value="₦2.84m" detail="+12.4% vs avg" change={12.4} />
            <KpiCard label="Stock value" value="₦48.2m" detail="4 locations" tone="neutral" />
            <KpiCard label="Below reorder" value="6 SKUs" detail="2 stock-outs" tone="amber" />
            <KpiCard label="Fill rate" value="94.2%" detail="chain-wide" tone="lime" />
          </div>

          <div className="mt-2.5 grid gap-2.5 xl:grid-cols-[1.35fr_1fr]">
            <div className="glass-quiet rounded-xl p-3.5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.12em] text-fog-faint">
                    Revenue · last 7 days
                  </p>
                  <p className="mt-1 text-lg font-bold tracking-tight tnum">₦20.9m</p>
                </div>
                <span className="rounded-full bg-lime-400/10 px-2 py-0.5 text-[9px] font-bold text-lime-300">
                  +9.8%
                </span>
              </div>
              <AreaChart
                id="stoq-console-revenue"
                data={revenueSeries.map((point) => ({ label: point.label, value: point.value }))}
                height={106}
                className="mt-2"
              />
            </div>

            <div className="glass-quiet rounded-xl p-3.5">
              <div className="flex items-center justify-between">
                <p className="text-[9px] uppercase tracking-[0.12em] text-fog-faint">
                  Stock by location
                </p>
                <span className="text-[9px] text-azure-300">all</span>
              </div>
              <ul className="mt-2 space-y-1.5">
                {locations.map((location, index) => {
                  const pct = [82, 64, 71, 46][index];
                  return (
                    <li key={location.id}>
                      <div className="flex items-center justify-between text-[9.5px]">
                        <span className="truncate text-fog">{location.name}</span>
                        <span className="tnum text-bone">{pct}%</span>
                      </div>
                      <span className="mt-1 block h-1 overflow-hidden rounded-full bg-white/[0.07]">
                        <span
                          className={cn(
                            "block h-full rounded-full",
                            index === 0 ? "bg-azure-500" : index === 3 ? "bg-lime-400" : "bg-azure-400/60",
                          )}
                          style={{ width: `${pct}%` }}
                        />
                      </span>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-2 flex items-center justify-between rounded-lg bg-azure-500/[0.07] px-2 py-1.5">
                <span className="flex items-center gap-1.5 text-[9px] text-azure-200">
                  <Sparkles className="size-2.5" aria-hidden />
                  2 transfers suggested
                </span>
                <span className="text-[9px] font-bold tnum text-azure-300">₦318k</span>
              </div>
            </div>
          </div>

          <div className="mt-2.5 grid gap-2.5 xl:grid-cols-[1.35fr_1fr]">
            <div className="glass-quiet rounded-xl p-3.5">
              <div className="flex items-center justify-between">
                <p className="text-[9px] uppercase tracking-[0.12em] text-fog-faint">
                  Reorder queue
                </p>
                <span className="flex items-center gap-1 text-[9px] text-lime-300">
                  <Plus className="size-2.5" aria-hidden />
                  auto-suggested
                </span>
              </div>
              <div className="mt-2 space-y-1.5">
                {lowStock.map(({ product, total }) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between gap-2 rounded-lg border border-white/[0.05] bg-white/[0.02] px-2 py-1.5"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-[10px] font-semibold text-bone">
                        {product.name}
                      </span>
                      <span className="block text-[8.5px] text-fog-faint">
                        {total} units · {product.velocity}/wk
                      </span>
                    </span>
                    <StatusPill status={total === 0 ? "out" : "low"} />
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-quiet rounded-xl p-3.5">
              <p className="text-[9px] uppercase tracking-[0.12em] text-fog-faint">
                Category mix
              </p>
              <div className="mt-2">
                <Donut segments={categoryMix} size={86} thickness={9} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

/** A compact product row for the platform tab panels. */
export function ProductRow({
  name,
  sku,
  units,
  value,
}: {
  name: string;
  sku: string;
  units: number;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/[0.05] px-3 py-2.5 last:border-0">
      <div className="min-w-0">
        <p className="truncate text-[11.5px] font-semibold text-bone">{name}</p>
        <p className="font-mono text-[9px] text-fog-faint">{sku}</p>
      </div>
      <div className="text-right">
        <p className="text-[11px] font-bold tnum text-bone">{units}</p>
        <p className="text-[9px] text-fog-faint">{value}</p>
      </div>
    </div>
  );
}

export { naira };
