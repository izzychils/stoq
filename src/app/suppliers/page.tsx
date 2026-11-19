import type { Metadata } from "next";
import { BadgeCheck, FileText, Handshake, Mail, PackageSearch, Truck } from "lucide-react";
import { Cta } from "@/components/sections/cta";
import {
  FaqList,
  FeatureCards,
  MarketingPage,
  PageHero,
  PageSection,
  StatRow,
} from "@/components/marketing/page-shell";
import { Meter } from "@/components/ui";
import { GlassCard } from "@/components/ui/glass-card";
import { purchaseOrders, suppliers } from "@/lib/data";
import { naira, shortDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Supplier operations and purchase orders",
  description:
    "Lead time, reliability, outstanding balance and every open purchase order per supplier — with the stock each late delivery is holding up. Stop finding out a shipment slipped when the shelf is empty.",
  keywords: [
    "supplier management",
    "purchase order software",
    "lead time tracking",
    "procurement for retail",
    "supplier scorecard",
  ],
  alternates: { canonical: "/suppliers" },
  openGraph: {
    title: "Supplier operations · Stoq",
    description:
      "Lead time, reliability and open purchase orders per supplier, tied to the stock they hold up.",
    url: "https://stoq.xyz/suppliers",
  },
};

export default function SuppliersPage() {
  return (
    <MarketingPage>
      <PageHero
        eyebrow="Suppliers & purchasing"
        title={
          <>
            Know the price
            <br />
            of <span className="gradient-text">waiting</span>.
          </>
        }
        description="A late delivery is not a supplier problem, it is a stock-out in two weeks. Stoq keeps lead time, reliability, outstanding balance and open orders beside the products each supplier holds up, so a slipping shipment is visible while there is still time to act."
        bullets={[
          "Lead time and on-time score per supplier",
          "Open orders with ETA and destination",
          "Outstanding balance and payment terms",
          "What each late line is holding up",
        ]}
      >
        <GlassCard intensity="strong" hairline className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-[0.14em] text-fog-faint">Supplier scorecard</p>
              <p className="mt-1 text-[13px] font-semibold text-bone">Open orders · 3</p>
            </div>
            <span className="rounded-full border border-white/10 px-2 py-0.5 text-[9px] text-fog-faint">
              net 30 terms
            </span>
          </div>

          <div className="mt-4 space-y-2">
            {suppliers.slice(0, 4).map((supplier) => (
              <div
                key={supplier.id}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-[11.5px] font-semibold text-bone">{supplier.name}</p>
                  <span className="shrink-0 text-[10px] tnum text-lime-300">
                    {supplier.reliability}% on time
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-[9px] text-fog-faint">
                  <span>
                    {supplier.leadTime}d lead · {supplier.skus} SKUs · {supplier.terms}
                  </span>
                  <span className="tnum">{naira(supplier.outstanding)} owed</span>
                </div>
                <Meter
                  value={supplier.reliability}
                  tone={supplier.reliability >= 92 ? "lime" : "amber"}
                  className="mt-2"
                />
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-start gap-2 rounded-xl border border-amber/20 bg-amber/[0.06] px-3 py-2.5">
            <Truck className="mt-0.5 size-3.5 shrink-0 text-amber-soft" aria-hidden />
            <p className="text-[10px] leading-relaxed text-amber-soft/90">
              BrightHome is 5 days out. Detergent already sits at 2.9 weeks of cover, so this
              order needs a transfer from Ikeja rather than another delay.
            </p>
          </div>
        </GlassCard>
      </PageHero>

      <PageSection
        eyebrow="Purchasing"
        title={
          <>
            Every order, from draft
            <br className="hidden sm:block" /> to <span className="gradient-text">receipt</span>.
          </>
        }
        subtitle="A purchase order in Stoq is a living record: what was ordered, what arrived, what was short, and which location each line was allocated to."
      >
        <div className="mt-10 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02]">
          <div className="hidden grid-cols-[0.7fr_1.3fr_0.5fr_0.6fr_0.7fr_0.7fr] gap-3 border-b border-white/[0.07] px-5 py-3 text-[9px] uppercase tracking-[0.1em] text-fog-faint lg:grid">
            <span>Order</span>
            <span>Supplier</span>
            <span className="text-right">Units</span>
            <span className="text-right">Value</span>
            <span>ETA</span>
            <span className="text-right">Status</span>
          </div>
          {purchaseOrders.map((order) => (
            <div
              key={order.id}
              className="grid gap-1.5 border-b border-white/[0.045] px-5 py-3.5 last:border-0 lg:grid-cols-[0.7fr_1.3fr_0.5fr_0.6fr_0.7fr_0.7fr] lg:items-center"
            >
              <p className="font-mono text-[10px] text-bone">{order.id}</p>
              <div className="min-w-0">
                <p className="truncate text-[11.5px] font-semibold text-bone">{order.supplier}</p>
                <p className="text-[9.5px] text-fog-faint">
                  {order.items} lines · {order.destination}
                </p>
              </div>
              <p className="text-[10.5px] tnum text-fog lg:text-right">{order.units}</p>
              <p className="text-[10.5px] tnum text-bone lg:text-right">{naira(order.value)}</p>
              <p className="text-[10px] tnum text-fog-faint">{shortDate(order.eta)}</p>
              <p className="text-[9.5px] font-semibold capitalize text-azure-300 lg:text-right">
                {order.status.replace("-", " ")}
              </p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection
        eyebrow="Capabilities"
        title="Supplier intelligence, not a contact list"
        subtitle="The supplier record is only useful if it explains the stock it is affecting. Stoq links both directions."
      >
        <FeatureCards
          columns={3}
          items={[
            {
              icon: <Truck className="size-4" aria-hidden />,
              title: "Lead time, measured",
              copy: "The gap between order and receipt is tracked per supplier, so the buffer uses the real number.",
            },
            {
              icon: <BadgeCheck className="size-4" aria-hidden />,
              title: "Reliability score",
              copy: "On-time and in-full rates across recent orders, visible next to every purchase decision.",
            },
            {
              icon: <FileText className="size-4" aria-hidden />,
              title: "Terms and balances",
              copy: "Payment terms and outstanding balance per supplier, so a large order is placed with the cash picture in view.",
            },
            {
              icon: <PackageSearch className="size-4" aria-hidden />,
              title: "Short-delivery handling",
              copy: "Received counts are matched to the order. Shortages stay open against the supplier instead of vanishing into stock.",
            },
            {
              icon: <Handshake className="size-4" aria-hidden />,
              title: "Multi-supplier per SKU",
              copy: "Keep a second source per product, with its own price and lead time, for when the first cannot deliver.",
            },
            {
              icon: <Mail className="size-4" aria-hidden />,
              title: "Order documents",
              copy: "A printable purchase order and receipt per shipment, ready to send or file without retyping.",
            },
          ]}
        />
        <StatRow
          stats={[
            { value: "5", label: "suppliers in the demo", note: "Each with lead time, terms and a live reliability score." },
            { value: "93%", label: "on-time delivery", note: "Chain-wide, tracked from actual receipts rather than promises." },
            { value: "₦9.2m", label: "open commitments", note: "Outstanding supplier balance across open purchase orders." },
          ]}
        />
      </PageSection>

      <PageSection eyebrow="Questions" title="Purchasing questions">
        <FaqList
          columns={2}
          items={[
            {
              q: "Can I import purchase orders from another system?",
              a: "Open orders can be brought in as line items through CSV. Historical orders can be imported as closed records so supplier reliability starts from real history.",
            },
            {
              q: "Does Stoq handle partial deliveries?",
              a: "Yes. Each line can be received in parts. The order stays open with the remaining quantity, and the shortfall is visible against the supplier.",
            },
            {
              q: "Can different locations order separately?",
              a: "Yes. A purchase order names its destination location, and the receiving site confirms the quantities that actually arrived.",
            },
            {
              q: "Does it track landed cost?",
              a: "Each line carries cost, and receipts capture the final quantity and price, so cost per unit in the ledger is the cost you actually paid.",
            },
          ]}
        />
      </PageSection>

      <Cta />
    </MarketingPage>
  );
}
