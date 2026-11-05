import { ArrowLeftRight, Clock, PackageCheck } from "lucide-react";
import { KpiCard } from "@/components/dashboard/kpi";
import { PageHeader } from "@/components/dashboard/page-parts";
import { TransferBoard } from "@/features/transfers/components/transfer-board";
import { locations, transfers } from "@/lib/data";
import { naira } from "@/lib/utils";

export default function TransfersPage() {
  const inTransit = transfers.filter((transfer) => transfer.status === "in-transit");
  const draft = transfers.filter((transfer) => transfer.status === "draft");
  const units = transfers.reduce((sum, transfer) => sum + transfer.units, 0);

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Movement"
        title="Transfers"
        description="Move stock between stores and the warehouse. Each transfer needs an approval, and the receiving site confirms the count."
      />

      <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-4">
        <KpiCard label="In transit" value={String(inTransit.length)} detail="on the road" tone="azure" icon={<ArrowLeftRight className="size-3.5" aria-hidden />} />
        <KpiCard label="Awaiting approval" value={String(draft.length)} detail="draft transfers" tone="amber" icon={<Clock className="size-3.5" aria-hidden />} />
        <KpiCard label="Received this week" value="2" detail="both ends confirmed" tone="lime" icon={<PackageCheck className="size-3.5" aria-hidden />} />
        <KpiCard label="Units moved" value={String(units)} detail={`${transfers.length} transfers`} tone="neutral" />
      </div>

      <TransferBoard />

      <div className="grid gap-2.5 md:grid-cols-2">
        <div className="glass rounded-xl p-4">
          <p className="text-[11px] font-semibold text-bone">Suggested next moves</p>
          <div className="mt-2.5 space-y-2">
            {[
              { route: "Ikeja → Lekki", item: "Bottled water 75 cl · 96 units", note: "Lekki cover falls to 2.4 days" },
              { route: "Ikeja → Lekki", item: "Energy drink 250 ml · 48 units", note: "Velocity up 34% week on week" },
            ].map((suggestion) => (
              <div key={suggestion.item} className="rounded-lg border border-azure-500/20 bg-azure-500/[0.05] p-2.5">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-semibold text-bone">{suggestion.item}</p>
                  <span className="text-[8.5px] text-azure-300">{suggestion.route}</span>
                </div>
                <p className="mt-0.5 text-[9px] text-fog-faint">{suggestion.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-xl p-4">
          <p className="text-[11px] font-semibold text-bone">Location load</p>
          <p className="mt-0.5 text-[9px] text-fog-faint">Values at cost · demo data</p>
          <div className="mt-2.5 space-y-1.5">
            {locations.map((location) => (
              <div key={location.id} className="flex items-center justify-between text-[10px]">
                <span className="text-fog">{location.name}</span>
                <span className="tnum text-bone">{naira(location.capacity * 100000)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
