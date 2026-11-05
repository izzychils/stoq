import { FileText, Plus, Sparkles, Truck } from "lucide-react";
import { KpiCard, StatusPill } from "@/components/dashboard/kpi";
import { PageHeader, Panel } from "@/components/dashboard/page-parts";
import { alerts, purchaseOrders, suppliers } from "@/lib/data";
import { naira, shortDate } from "@/lib/utils";

export default function PurchaseOrdersPage() {
  const open = purchaseOrders.filter(
    (order) => order.status === "sent" || order.status === "in-transit",
  );
  const openValue = open.reduce((sum, order) => sum + order.value, 0);

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Buying"
        title="Purchase orders"
        description="Draft, send and receive orders. Quantities follow the reorder point and supplier lead time, not last year's spreadsheet."
        actions={
          <button
            type="button"
            className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-azure-500 px-3 text-[11.5px] font-bold text-white hover:bg-azure-400"
          >
            <Plus className="size-3.5" aria-hidden />
            New purchase order
          </button>
        }
      />

      <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-4">
        <KpiCard label="Open orders" value={String(open.length)} detail="sent or in transit" />
        <KpiCard label="Open value" value={naira(openValue)} detail="committed spend" tone="amber" />
        <KpiCard label="In transit" value="1" detail="SunFarm · 8 Nov" tone="azure" icon={<Truck className="size-3.5" aria-hidden />} />
        <KpiCard label="Received" value="2" detail="this month" tone="lime" />
      </div>

      <Panel
        title="Orders"
        subtitle="5 most recent · demo data"
        action={
          <span className="inline-flex items-center gap-1 text-[9.5px] text-lime-300">
            <Sparkles className="size-3" aria-hidden />
            reorder points up to date
          </span>
        }
        bodyClassName="overflow-x-auto"
      >
        <table className="w-full min-w-[720px] text-left">
          <thead>
            <tr className="border-b border-white/[0.06] text-[8.5px] uppercase tracking-[0.1em] text-fog-faint">
              <th className="px-4 py-2 font-semibold">Order</th>
              <th className="px-4 py-2 font-semibold">Supplier</th>
              <th className="px-4 py-2 font-semibold">Destination</th>
              <th className="px-4 py-2 text-right font-semibold">Units</th>
              <th className="px-4 py-2 text-right font-semibold">Value</th>
              <th className="px-4 py-2 font-semibold">ETA</th>
              <th className="px-4 py-2 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.045]">
            {purchaseOrders.map((order) => (
              <tr key={order.id} className="hover:bg-white/[0.02]">
                <td className="px-4 py-2.5 font-mono text-[9.5px] text-azure-300">{order.id}</td>
                <td className="px-4 py-2.5 text-[10.5px] text-bone">
                  {order.supplier}
                  <span className="ml-1.5 text-[9px] text-fog-faint">{order.items} lines</span>
                </td>
                <td className="px-4 py-2.5 text-[10px] text-fog">{order.destination}</td>
                <td className="px-4 py-2.5 text-right text-[10px] tnum text-fog">{order.units}</td>
                <td className="px-4 py-2.5 text-right text-[10px] tnum text-bone">{naira(order.value)}</td>
                <td className="px-4 py-2.5 text-[9.5px] tnum text-fog-faint">{shortDate(order.eta)}</td>
                <td className="px-4 py-2.5">
                  <StatusPill status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>

      <div className="grid gap-2.5 lg:grid-cols-[1.2fr_1fr]">
        <Panel
          title="Suggested reorders"
          subtitle="Based on cover, velocity and lead time"
          bodyClassName="divide-y divide-white/[0.045]"
        >
          {alerts
            .filter((alert) => alert.suggestedQty > 0)
            .map((alert) => (
              <div key={alert.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-[10.5px] font-semibold text-bone">{alert.product}</p>
                  <p className="text-[9px] text-fog-faint">{alert.destination}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-azure-500/10 px-2 py-0.5 text-[9px] font-bold tnum text-azure-300">
                    +{alert.suggestedQty}
                  </span>
                  <button
                    type="button"
                    className="rounded-lg border border-white/10 px-2 py-1 text-[9px] text-fog hover:text-bone"
                  >
                    Draft
                  </button>
                </div>
              </div>
            ))}
        </Panel>

        <Panel
          title="Supplier terms"
          subtitle="Lead time and balance"
          action={<FileText className="size-3.5 text-fog-faint" aria-hidden />}
          bodyClassName="divide-y divide-white/[0.045]"
        >
          {suppliers.slice(0, 4).map((supplier) => (
            <div key={supplier.id} className="flex items-center justify-between px-4 py-2.5">
              <div>
                <p className="text-[10.5px] font-semibold text-bone">{supplier.name}</p>
                <p className="text-[9px] text-fog-faint">
                  {supplier.leadTime}d · {supplier.terms}
                </p>
              </div>
              <span className="text-[9.5px] tnum text-fog">
                {supplier.outstanding ? naira(supplier.outstanding) : "settled"}
              </span>
            </div>
          ))}
        </Panel>
      </div>
    </div>
  );
}
