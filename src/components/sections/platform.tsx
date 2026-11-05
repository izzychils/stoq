"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeftRight, Boxes, Search, ShoppingCart } from "lucide-react";
import { BrowserFrame } from "@/components/dashboard/console-preview";
import { StatusPill } from "@/components/dashboard/kpi";
import { Meter } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { locations, products, purchaseOrders, totalStock } from "@/lib/data";
import { cn, naira, number, shortDate } from "@/lib/utils";

const TABS = [
  {
    id: "inventory",
    label: "Inventory",
    icon: Boxes,
    title: "One number you can trust",
    copy: "Stock is counted per location, not in a single bucket. The chain total, the store total and the warehouse total are the same ledger, updated by every scan and sale.",
    points: ["SKU-level quantities per location", "Barcode intake and counts", "Low-stock and overstock flags"],
  },
  {
    id: "transfers",
    label: "Transfers",
    icon: ArrowLeftRight,
    title: "Move stock where it sells",
    copy: "Suggestions weigh cover days, weekend uplift and the receiving location's capacity. The sending location confirms, the receiving location signs for it.",
    points: ["Suggested transfers by demand", "In-transit tracking", "Receipt confirmation at both ends"],
  },
  {
    id: "orders",
    label: "Purchase orders",
    icon: ShoppingCart,
    title: "Buying that follows velocity",
    copy: "Reorder points recalculate from real sales, supplier lead times and promotions. A draft order is waiting before anyone reaches for a spreadsheet.",
    points: ["Auto-drafted purchase orders", "Supplier lead time and terms", "Landed cost and receipts"],
  },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function Platform() {
  const [active, setActive] = useState<TabId>("inventory");
  const tab = TABS.find((entry) => entry.id === active) ?? TABS[0];

  return (
    <section id="platform" className="relative mx-auto w-full max-w-[1200px] px-5 py-24 sm:px-8 sm:py-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-azure-500/60" />
          <span className="mono-label !text-azure-300/80">The workspace</span>
          <span className="h-px w-8 bg-azure-500/60" />
        </div>
        <h2 className="mt-5 text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.03] tracking-[-0.045em] text-bone">
          The whole operation,
          <br />
          <span className="gradient-text">on one screen</span>.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-fog">
          Retail, wholesale and warehouse stock are usually three systems and a phone
          call. Stoq puts them on one ledger with three useful views.
        </p>
      </Reveal>

      <Reveal delay={80} className="mt-10">
        <div
          role="tablist"
          aria-label="Workspace views"
          className="mx-auto flex w-fit items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] p-1 backdrop-blur"
        >
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              role="tab"
              aria-selected={active === id}
              onClick={() => setActive(id)}
              className={cn(
                "inline-flex min-h-9 items-center gap-2 rounded-full px-4 text-[12.5px] font-semibold transition-all",
                active === id
                  ? "bg-azure-500 text-white shadow-[0_8px_20px_-8px_rgba(91,140,255,0.9)]"
                  : "text-fog hover:text-bone",
              )}
            >
              <Icon className="size-3.5" aria-hidden />
              {label}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        <div className="lg:sticky lg:top-28">
          <Reveal key={`${active}-copy`}>
            <h3 className="text-[clamp(1.5rem,2.4vw,2rem)] font-semibold leading-tight tracking-[-0.035em] text-bone">
              {tab.title}
            </h3>
            <p className="mt-3 max-w-md text-[14px] leading-relaxed text-fog">{tab.copy}</p>
            <ul className="mt-6 space-y-2.5">
              {tab.points.map((point) => (
                <li key={point} className="flex items-center gap-2.5 text-[13px] text-bone/80">
                  <span className="flex size-5 items-center justify-center rounded-full border border-azure-500/25 bg-azure-500/10">
                    <span className="size-1.5 rounded-full bg-azure-400" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <a
              href="/dashboard"
              className="mt-7 inline-flex min-h-10 items-center gap-2 text-[13px] font-semibold text-azure-300 transition-colors hover:text-azure-200"
            >
              Explore this view in the demo
              <ArrowRight className="size-3.5" aria-hidden />
            </a>
          </Reveal>
        </div>

        <Reveal delay={80} key={`${active}-panel`}>
          <BrowserFrame url={`app.stoq.xyz/${active}`}>
            {active === "inventory" ? <InventoryPanel /> : null}
            {active === "transfers" ? <TransfersPanel /> : null}
            {active === "orders" ? <OrdersPanel /> : null}
          </BrowserFrame>
        </Reveal>
      </div>
    </section>
  );
}

function InventoryPanel() {
  return (
    <div className="bg-[#05070e] p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[9px] uppercase tracking-[0.14em] text-fog-faint">Inventory</p>
          <p className="mt-1 text-[13px] font-bold text-bone">All locations · 18 SKUs</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-[10px] text-fog-dim">
          <Search className="size-3" aria-hidden />
          Search SKUs
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { label: "Stock value", value: "₦48.2m" },
          { label: "Below reorder", value: "6 SKUs" },
          { label: "Fill rate", value: "94.2%" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
            <p className="text-[9px] uppercase tracking-wide text-fog-faint">{stat.label}</p>
            <p className="mt-1 text-[13px] font-bold tnum text-bone">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 overflow-hidden rounded-lg border border-white/[0.06]">
        <div className="grid grid-cols-[1.5fr_0.6fr_0.6fr_0.7fr] gap-2 border-b border-white/[0.06] bg-white/[0.02] px-3 py-2 text-[8.5px] uppercase tracking-wide text-fog-faint">
          <span>Product</span>
          <span className="text-right">Ikeja</span>
          <span className="text-right">Lekki</span>
          <span className="text-right">Status</span>
        </div>
        {products.slice(0, 6).map((product) => {
          const total = totalStock(product);
          return (
            <div
              key={product.id}
              className="grid grid-cols-[1.5fr_0.6fr_0.6fr_0.7fr] items-center gap-2 border-b border-white/[0.04] px-3 py-2.5 last:border-0"
            >
              <div className="min-w-0">
                <p className="truncate text-[11px] font-semibold text-bone">{product.name}</p>
                <p className="font-mono text-[8.5px] text-fog-faint">{product.sku}</p>
              </div>
              <p className="text-right text-[10px] tnum text-fog">{product.stock.ikeja}</p>
              <p className="text-right text-[10px] tnum text-fog">{product.stock.lekki}</p>
              <div className="flex justify-end">
                <StatusPill status={total <= product.reorderPoint ? "low" : "healthy"} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TransfersPanel() {
  return (
    <div className="bg-[#05070e] p-4 sm:p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[9px] uppercase tracking-[0.14em] text-fog-faint">Transfers</p>
          <p className="mt-1 text-[13px] font-bold text-bone">Weekend replenishment</p>
        </div>
        <span className="rounded-full bg-lime-400/10 px-2 py-0.5 text-[9px] font-bold text-lime-300">
          2 suggested
        </span>
      </div>

      <div className="mt-4 space-y-2">
        {[
          { from: "Ikeja Warehouse", to: "Lekki Store", item: "Bottled water 75 cl", units: 96, cover: "9.1 days", value: 235200 },
          { from: "Ikeja Warehouse", to: "Lekki Store", item: "Energy drink 250 ml", units: 48, cover: "2.1 days", value: 132000 },
        ].map((row) => (
          <div key={row.item} className="rounded-xl border border-azure-500/20 bg-azure-500/[0.05] p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[11px] font-semibold text-bone">{row.item}</p>
              <span className="text-[10px] font-bold tnum text-azure-300">+{row.units}</span>
            </div>
            <p className="mt-1 flex items-center gap-1.5 text-[9.5px] text-fog-dim">
              {row.from}
              <ArrowRight className="size-2.5 text-azure-300" aria-hidden />
              {row.to}
            </p>
            <div className="mt-2 flex items-center justify-between text-[9px] text-fog-faint">
              <span>{row.cover} cover at destination</span>
              <span>{naira(row.value)} at cost</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-lg border border-white/[0.06]">
        <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-3 py-2">
          <span className="text-[8.5px] uppercase tracking-wide text-fog-faint">In flight</span>
          <span className="text-[8.5px] text-fog-faint">ETA 2 days</span>
        </div>
        <div className="flex items-center justify-between px-3 py-2.5">
          <div>
            <p className="text-[10.5px] font-semibold text-bone">TR-4412 · 124 units</p>
            <p className="text-[9px] text-fog-faint">Ikeja → Lekki · raised 4 Nov</p>
          </div>
          <StatusPill status="in-transit" />
        </div>
      </div>

      <div className="mt-3 rounded-lg bg-lime-400/[0.06] px-3 py-2">
        <p className="text-[9.5px] text-lime-200">
          After both moves, Ikeja keeps 5.2 weeks of cover. Lekki reaches the weekend at
          4.8 days of cover instead of 2.4.
        </p>
      </div>
    </div>
  );
}

function OrdersPanel() {
  return (
    <div className="bg-[#05070e] p-4 sm:p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[9px] uppercase tracking-[0.14em] text-fog-faint">Purchase orders</p>
          <p className="mt-1 text-[13px] font-bold text-bone">Open orders · 3</p>
        </div>
        <span className="rounded-full border border-white/10 px-2 py-0.5 text-[9px] text-fog-faint">
          net 30 terms
        </span>
      </div>

      <div className="mt-3 space-y-1.5">
        {purchaseOrders.slice(0, 4).map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between gap-2 rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2.5"
          >
            <div className="min-w-0">
              <p className="truncate text-[10.5px] font-semibold text-bone">
                {order.supplier}
              </p>
              <p className="font-mono text-[8.5px] text-fog-faint">
                {order.id} · {order.items} lines · {number(order.units)} units
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold tnum text-bone">{naira(order.value)}</span>
              <StatusPill status={order.status} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {[
          { label: "On-time delivery", value: "93%", pct: 93 },
          { label: "Order accuracy", value: "97%", pct: 97 },
        ].map((metric) => (
          <div key={metric.label} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
            <p className="text-[8.5px] uppercase tracking-wide text-fog-faint">{metric.label}</p>
            <p className="mt-1 text-[13px] font-bold tnum text-bone">{metric.value}</p>
            <Meter value={metric.pct} tone="lime" className="mt-1.5" />
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between rounded-lg bg-azure-500/[0.07] px-3 py-2">
        <p className="text-[9.5px] text-azure-200">
          SunFarm order lands 8 Nov. 3 of 4 lines are already allocated to Ikeja.
        </p>
        <span className="text-[9px] font-bold text-azure-300">{shortDate("2026-11-08")}</span>
      </div>
    </div>
  );
}

export { locations };
