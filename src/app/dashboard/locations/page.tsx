import Link from "next/link";
import { ArrowRight, ArrowLeftRight, Building2, MapPin, Warehouse } from "lucide-react";
import { Meter } from "@/components/ui";
import { KpiCard } from "@/components/dashboard/kpi";
import { PageHeader, Panel } from "@/components/dashboard/page-parts";
import {
  branchPerformance,
  locations,
  products,
  stockStatus,
  totalStock,
  transfers,
} from "@/lib/data";
import { naira, number, shortDate } from "@/lib/utils";

export default function LocationsPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Network"
        title="Locations"
        description="Stores, the warehouse and online fulfilment. Capacity, stock value and alerts are scoped to each site."
        actions={
          <button
            type="button"
            className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-white/[0.09] bg-white/[0.03] px-3 text-[11.5px] font-semibold text-bone hover:border-white/20"
          >
            <Building2 className="size-3.5" aria-hidden />
            Add location
          </button>
        }
      />

      <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-4">
        <KpiCard label="Locations" value="4" detail="3 retail · 1 warehouse" tone="neutral" />
        <KpiCard label="Capacity used" value="66%" detail="weighted average" tone="amber" />
        <KpiCard label="Staff" value="44" detail="across all sites" />
        <KpiCard label="In transit" value="2" detail="transfers today" tone="lime" />
      </div>

      <div className="grid gap-2.5 md:grid-cols-2">
        {locations.map((location) => {
          const value = products.reduce(
            (sum, product) => sum + product.stock[location.id] * product.cost,
            0,
          );
          const units = products.reduce((sum, product) => sum + product.stock[location.id], 0);
          const low = products.filter((product) => product.stock[location.id] === 0).length;

          return (
            <section key={location.id} className="glass rounded-2xl p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-azure-500/20 bg-azure-500/10 text-azure-300">
                    {location.type.includes("warehouse") ? (
                      <Warehouse className="size-4" aria-hidden />
                    ) : (
                      <Building2 className="size-4" aria-hidden />
                    )}
                  </span>
                  <div>
                    <h2 className="text-[13px] font-semibold text-bone">{location.name}</h2>
                    <p className="mt-0.5 flex items-center gap-1 text-[10px] text-fog-faint">
                      <MapPin className="size-2.5" aria-hidden />
                      {location.address}
                    </p>
                  </div>
                </div>
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[9px] text-fog-dim">
                  {location.type}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="rounded-lg border border-white/[0.06] bg-black/20 p-2.5">
                  <p className="text-[8.5px] uppercase tracking-wide text-fog-faint">Stock value</p>
                  <p className="mt-1 text-[11.5px] font-bold tnum text-bone">{naira(value)}</p>
                </div>
                <div className="rounded-lg border border-white/[0.06] bg-black/20 p-2.5">
                  <p className="text-[8.5px] uppercase tracking-wide text-fog-faint">Units</p>
                  <p className="mt-1 text-[11.5px] font-bold tnum text-bone">{number(units)}</p>
                </div>
                <div className="rounded-lg border border-white/[0.06] bg-black/20 p-2.5">
                  <p className="text-[8.5px] uppercase tracking-wide text-fog-faint">Out of stock</p>
                  <p className="mt-1 text-[11.5px] font-bold tnum text-rose-soft">{low}</p>
                </div>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between text-[9.5px]">
                  <span className="text-fog-faint">Capacity · {location.staff} staff</span>
                  <span className="tnum text-fog">{location.capacity}%</span>
                </div>
                <Meter
                  value={location.capacity}
                  tone={location.capacity > 75 ? "amber" : "azure"}
                  className="mt-1.5"
                />
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-2.5">
                <p className="text-[9.5px] text-fog-faint">Manager · {location.manager}</p>
                <Link
                  href="/dashboard/inventory"
                  className="inline-flex items-center gap-1 text-[9.5px] font-semibold text-azure-300 hover:text-azure-200"
                >
                  View stock
                  <ArrowRight className="size-2.5" aria-hidden />
                </Link>
              </div>
            </section>
          );
        })}
      </div>

      <div className="grid gap-2.5 xl:grid-cols-[1.2fr_1fr]">
        <Panel title="Network performance" subtitle="Today · scoped by site" bodyClassName="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left">
            <thead>
              <tr className="border-b border-white/[0.06] text-[8.5px] uppercase tracking-[0.1em] text-fog-faint">
                <th className="px-4 py-2 font-semibold">Location</th>
                <th className="px-4 py-2 text-right font-semibold">Revenue</th>
                <th className="px-4 py-2 text-right font-semibold">Orders</th>
                <th className="px-4 py-2 text-right font-semibold">Fill rate</th>
                <th className="px-4 py-2 text-right font-semibold">Alerts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.045]">
              {branchPerformance.map((branch) => (
                <tr key={branch.location} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-2.5 text-[11px] text-bone">{branch.location}</td>
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
          title="Recent movement"
          subtitle="Transfers between locations"
          action={
            <Link
              href="/dashboard/transfers"
              className="inline-flex items-center gap-1 text-[10px] font-semibold text-azure-300"
            >
              Board
              <ArrowLeftRight className="size-3" aria-hidden />
            </Link>
          }
          bodyClassName="divide-y divide-white/[0.045]"
        >
          {transfers.slice(0, 4).map((transfer) => (
            <div key={transfer.id} className="flex items-center justify-between gap-2 px-4 py-2.5">
              <div className="min-w-0">
                <p className="text-[10.5px] font-semibold text-bone">
                  {locations.find((location) => location.id === transfer.from)?.name}
                  <span className="mx-1 text-fog-faint">→</span>
                  {locations.find((location) => location.id === transfer.to)?.name}
                </p>
                <p className="text-[9px] text-fog-faint">
                  {transfer.units} units · {shortDate(transfer.created)}
                </p>
              </div>
              <span className="text-[9px] capitalize text-azure-300">{transfer.status}</span>
            </div>
          ))}
        </Panel>
      </div>
    </div>
  );
}
