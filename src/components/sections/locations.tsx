import { ArrowLeftRight, ArrowRight, Building2, Check, Truck, Warehouse } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink, Meter, SectionHeading } from "@/components/ui";
import { GlassCard } from "@/components/ui/glass-card";
import { locations, purchaseOrders, suppliers, transfers } from "@/lib/data";
import { cn, naira, shortDate } from "@/lib/utils";

export function Locations() {
  return (
    <section id="locations" className="relative mx-auto w-full max-w-[1200px] px-5 py-24 sm:px-8 sm:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <Reveal>
          <p className="mono-label !text-azure-300/80">Multi-location</p>
          <h2 className="mt-4 text-[clamp(1.9rem,4vw,2.9rem)] font-semibold leading-[1.04] tracking-[-0.045em] text-bone">
            Every site.
            <br />
            One <span className="gradient-text">ledger</span>.
          </h2>
          <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-fog">
            Stores, a warehouse and an online dark store should not each keep their own
            truth. Stoq gives each location its own view and the chain a single stock
            position.
          </p>

          <ul className="mt-6 space-y-3">
            {[
              "Stock reported per location, not averaged.",
              "Transfers need confirmation at both ends.",
              "Capacity and fill-rate visible per site.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[13px] text-bone/80">
                <Check className="mt-0.5 size-4 shrink-0 text-lime-400" aria-hidden />
                {item}
              </li>
            ))}
          </ul>

          <ButtonLink href="/dashboard/locations" variant="secondary" className="mt-7">
            Open locations
            <ArrowRight className="size-3.5" aria-hidden />
          </ButtonLink>
        </Reveal>

        <Reveal delay={90}>
          <div className="grid gap-2 sm:grid-cols-2">
            {locations.map((location, index) => (
              <GlassCard
                key={location.id}
                className={cn(
                  "p-4",
                  index === 0 && "sm:col-span-2 sm:flex sm:items-center sm:justify-between sm:gap-6",
                )}
              >
                <div className="flex items-start gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-azure-500/20 bg-azure-500/10 text-azure-300">
                    {location.type.includes("warehouse") ? (
                      <Warehouse className="size-4" aria-hidden />
                    ) : (
                      <Building2 className="size-4" aria-hidden />
                    )}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[12px] font-semibold text-bone">{location.name}</p>
                    <p className="text-[9.5px] text-fog-faint">
                      {location.type} · {location.staff} staff
                    </p>
                  </div>
                </div>
                <div className={cn("mt-3", index === 0 && "sm:mt-0 sm:w-56 sm:shrink-0")}>
                  <div className="flex items-center justify-between text-[9px]">
                    <span className="text-fog-faint">capacity</span>
                    <span className="tnum text-bone">{location.capacity}%</span>
                  </div>
                  <Meter
                    value={location.capacity}
                    tone={location.capacity > 75 ? "amber" : "azure"}
                    className="mt-1.5"
                  />
                </div>
              </GlassCard>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal delay={60} className="mt-12">
        <div className="glass overflow-hidden rounded-2xl">
          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
            <div>
              <p className="text-[11.5px] font-semibold text-bone">Transfer board</p>
              <p className="mt-0.5 text-[9.5px] text-fog-faint">
                Movement between locations · last 48 hours
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-azure-500/20 bg-azure-500/10 px-2.5 py-1 text-[9.5px] font-semibold text-azure-300">
              <ArrowLeftRight className="size-3" aria-hidden />
              2 in transit
            </span>
          </div>

          <div className="hidden grid-cols-[0.6fr_1.4fr_0.5fr_0.6fr_0.7fr] gap-3 border-b border-white/[0.06] bg-white/[0.02] px-5 py-2.5 text-[8.5px] uppercase tracking-wide text-fog-faint md:grid">
            <span>Transfer</span>
            <span>Route</span>
            <span className="text-right">Units</span>
            <span>Created</span>
            <span className="text-right">Status</span>
          </div>
          {transfers.map((transfer) => (
            <div
              key={transfer.id}
              className="grid gap-2 border-b border-white/[0.045] px-5 py-3 last:border-0 md:grid-cols-[0.6fr_1.4fr_0.5fr_0.6fr_0.7fr] md:items-center"
            >
              <p className="font-mono text-[9.5px] text-bone">{transfer.id}</p>
              <p className="flex items-center gap-1.5 text-[10px] text-fog">
                {locations.find((location) => location.id === transfer.from)?.name}
                <ArrowRight className="size-2.5 text-azure-300" aria-hidden />
                {locations.find((location) => location.id === transfer.to)?.name}
              </p>
              <p className="text-[10px] tnum text-fog md:text-right">{transfer.units}</p>
              <p className="text-[9.5px] tnum text-fog-faint">{shortDate(transfer.created)}</p>
              <p className="text-[9.5px] font-semibold text-azure-300 md:text-right">
                {transfer.status === "in-transit"
                  ? "In transit"
                  : transfer.status === "received"
                    ? "Received"
                    : "Draft"}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ------------------------------------------------------- suppliers */}
      <div id="suppliers" className="mt-24 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <Reveal>
          <div className="grid gap-2 sm:grid-cols-2">
            {suppliers.slice(0, 4).map((supplier) => (
              <div key={supplier.id} className="glass rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <p className="text-[11.5px] font-semibold text-bone">{supplier.name}</p>
                  <span className="flex size-7 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-fog">
                    <Truck className="size-3.5" aria-hidden />
                  </span>
                </div>
                <p className="mt-0.5 text-[9px] text-fog-faint">
                  {supplier.skus} SKUs · {supplier.terms}
                </p>
                <div className="mt-3 flex items-center justify-between text-[9px]">
                  <span className="text-fog-faint">{supplier.leadTime}d lead time</span>
                  <span className="tnum text-lime-300">{supplier.reliability}% on time</span>
                </div>
                <div className="mt-1.5">
                  <Meter value={supplier.reliability} tone="azure" />
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={80}>
          <p className="mono-label !text-azure-300/80">Suppliers & purchasing</p>
          <h2 className="mt-4 text-[clamp(1.8rem,3.6vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-bone">
            Know the price
            <br />
            of <span className="gradient-text">waiting</span>.
          </h2>
          <p className="mt-4 max-w-sm text-[13.5px] leading-relaxed text-fog">
            Lead time, reliability and outstanding balance per supplier. When an order is
            late, you see the stock it is holding up before the shelf is empty.
          </p>

          <div className="mt-6 space-y-1.5">
            {purchaseOrders.slice(0, 3).map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-[10.5px] font-semibold text-bone">
                    {order.supplier}
                  </p>
                  <p className="font-mono text-[8.5px] text-fog-faint">
                    {order.id} · ETA {shortDate(order.eta)}
                  </p>
                </div>
                <span className="text-[10px] font-semibold tnum text-bone">
                  {naira(order.value)}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
