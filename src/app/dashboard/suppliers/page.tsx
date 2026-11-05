import { Mail, Plus, Truck } from "lucide-react";
import { KpiCard } from "@/components/dashboard/kpi";
import { PageHeader, Panel } from "@/components/dashboard/page-parts";
import { Meter } from "@/components/ui";
import { products, purchaseOrders, suppliers } from "@/lib/data";
import { naira } from "@/lib/utils";

export default function SuppliersPage() {
  const outstanding = suppliers.reduce((sum, supplier) => sum + supplier.outstanding, 0);

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Supply"
        title="Suppliers"
        description="Lead times, reliability and balances. Orders are scored after delivery, so the next reorder point can budget for the wait."
        actions={
          <button
            type="button"
            className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-azure-500 px-3 text-[11.5px] font-bold text-white hover:bg-azure-400"
          >
            <Plus className="size-3.5" aria-hidden />
            Add supplier
          </button>
        }
      />

      <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-4">
        <KpiCard label="Suppliers" value={String(suppliers.length)} detail="active" tone="neutral" />
        <KpiCard label="Outstanding" value={naira(outstanding)} detail="across all terms" tone="amber" />
        <KpiCard label="On-time rate" value="93%" detail="last 90 days" tone="lime" />
        <KpiCard label="Average lead time" value="3.4d" detail="weighted by value" />
      </div>

      <div className="grid gap-2.5 md:grid-cols-2 xl:grid-cols-3">
        {suppliers.map((supplier) => {
          const skus = products.filter((product) => product.supplier === supplier.name).length;
          return (
            <section key={supplier.id} className="glass rounded-2xl p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2.5">
                  <span className="flex size-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-azure-300">
                    <Truck className="size-4" aria-hidden />
                  </span>
                  <div>
                    <h2 className="text-[12px] font-semibold text-bone">{supplier.name}</h2>
                    <a
                      href={`mailto:${supplier.contact}`}
                      className="mt-0.5 flex items-center gap-1 text-[9px] text-fog-faint hover:text-azure-300"
                    >
                      <Mail className="size-2.5" aria-hidden />
                      {supplier.contact}
                    </a>
                  </div>
                </div>
                <span className="rounded-full border border-white/10 px-1.5 py-0.5 text-[8.5px] text-fog-dim">
                  {supplier.terms}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-1.5">
                <div>
                  <p className="text-[8px] uppercase tracking-wide text-fog-faint">Lead</p>
                  <p className="text-[11px] font-bold tnum text-bone">{supplier.leadTime}d</p>
                </div>
                <div>
                  <p className="text-[8px] uppercase tracking-wide text-fog-faint">SKUs</p>
                  <p className="text-[11px] font-bold tnum text-bone">{supplier.skus}</p>
                </div>
                <div>
                  <p className="text-[8px] uppercase tracking-wide text-fog-faint">On time</p>
                  <p className="text-[11px] font-bold tnum text-lime-300">{supplier.reliability}%</p>
                </div>
              </div>

              <div className="mt-2">
                <Meter value={supplier.reliability} tone={supplier.reliability >= 93 ? "lime" : "amber"} />
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-2.5">
                <span className="text-[9px] text-fog-faint">{skus} SKUs supplied</span>
                <span className={`text-[10px] tnum ${supplier.outstanding ? "text-amber-soft" : "text-fog-dim"}`}>
                  {supplier.outstanding ? naira(supplier.outstanding) : "Settled"}
                </span>
              </div>
            </section>
          );
        })}
      </div>

      <Panel
        title="Recent purchase orders"
        subtitle="Latest terms and delivery windows"
        bodyClassName="overflow-x-auto"
      >
        <table className="w-full min-w-[560px] text-left">
          <thead>
            <tr className="border-b border-white/[0.06] text-[8.5px] uppercase tracking-[0.1em] text-fog-faint">
              <th className="px-4 py-2 font-semibold">Order</th>
              <th className="px-4 py-2 font-semibold">Supplier</th>
              <th className="px-4 py-2 text-right font-semibold">Units</th>
              <th className="px-4 py-2 text-right font-semibold">Value</th>
              <th className="px-4 py-2 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.045]">
            {purchaseOrders.map((order) => (
              <tr key={order.id} className="hover:bg-white/[0.02]">
                <td className="px-4 py-2.5 font-mono text-[9.5px] text-azure-300">{order.id}</td>
                <td className="px-4 py-2.5 text-[10.5px] text-bone">{order.supplier}</td>
                <td className="px-4 py-2.5 text-right text-[10px] tnum text-fog">{order.units}</td>
                <td className="px-4 py-2.5 text-right text-[10px] tnum text-fog">{naira(order.value)}</td>
                <td className="px-4 py-2.5 text-[9.5px] capitalize text-fog-dim">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}
