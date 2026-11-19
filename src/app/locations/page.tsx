import type { Metadata } from "next";
import { ArrowLeftRight, Building2, ClipboardCheck, Layers, MapPin, Store, Users, Warehouse } from "lucide-react";
import { Locations } from "@/components/sections/locations";
import { Cta } from "@/components/sections/cta";
import {
  FaqList,
  FeatureCards,
  MarketingPage,
  NumberedSteps,
  PageHero,
  PageSection,
  StatRow,
} from "@/components/marketing/page-shell";
import { Meter } from "@/components/ui";
import { GlassCard } from "@/components/ui/glass-card";
import { locations } from "@/lib/data";

export const metadata: Metadata = {
  title: "Multi-location inventory: every site, one ledger",
  description:
    "Stoq keeps stock per store and per warehouse, suggests transfers from surplus to demand, and requires confirmation at both ends. Capacity, fill rate and staff visible for every site.",
  keywords: [
    "multi-location inventory",
    "inter-store transfers",
    "warehouse stock software",
    "retail chain inventory",
    "stock transfers",
  ],
  alternates: { canonical: "/locations" },
  openGraph: {
    title: "Multi-location inventory · Stoq",
    description:
      "One ledger for stores, a warehouse and online fulfilment, with transfers confirmed at both ends.",
    url: "https://stoq.xyz/locations",
  },
};

export default function LocationsPage() {
  return (
    <MarketingPage>
      <PageHero
        eyebrow="Multi-location"
        title={
          <>
            Every site.
            <br />
            One <span className="gradient-text">ledger</span>.
          </>
        }
        description="A chain does not have one stock level, it has four - and they behave differently. Stoq gives each location its own quantity, capacity and pattern, then shows the transfer that puts stock where it will actually sell this weekend."
        bullets={[
          "Stock reported per location, never averaged",
          "Transfers suggested from surplus to demand",
          "Receipt confirmed by the receiving site",
          "Capacity and fill rate visible per site",
        ]}
      >
        <div className="grid gap-2 sm:grid-cols-2">
          {locations.map((location, index) => (
            <GlassCard
              key={location.id}
              className={index === 0 ? "p-4 sm:col-span-2" : "p-4"}
            >
              <div className="flex items-start justify-between gap-3">
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
                <span className="shrink-0 text-[10px] tnum text-fog-dim">
                  {location.capacity}% full
                </span>
              </div>
              <div className="mt-3">
                <Meter
                  value={location.capacity}
                  tone={location.capacity > 75 ? "amber" : "azure"}
                />
              </div>
              <p className="mt-2 flex items-center gap-1.5 text-[9px] text-fog-faint">
                <MapPin className="size-2.5" aria-hidden />
                {location.address} · managed by {location.manager}
              </p>
            </GlassCard>
          ))}
        </div>
      </PageHero>

      <Locations showSuppliers={false} />

      <PageSection
        eyebrow="Why it matters"
        title={
          <>
            The average is the
            <br /> <span className="gradient-text">lie</span>.
          </>
        }
        subtitle="Chain-wide, bottled water looks healthy. By location, Lekki covers the weekend in two days while Ikeja sits on nineteen weeks. The average hides both problems at once."
      >
        <FeatureCards
          columns={3}
          items={[
            {
              icon: <Layers className="size-4" aria-hidden />,
              title: "Location-level truth",
              copy: "Each store and warehouse holds its own quantities, reorder points and forecast. Chain totals are always sums of real locations.",
            },
            {
              icon: <ArrowLeftRight className="size-4" aria-hidden />,
              title: "Transfers that make sense",
              copy: "Suggestions weigh cover days at both ends, weekend uplift and capacity before proposing a move.",
            },
            {
              icon: <ClipboardCheck className="size-4" aria-hidden />,
              title: "Two-sided confirmation",
              copy: "The sending site confirms what left; the receiving site signs for what arrived. Under 24 hours to trace a discrepancy.",
            },
            {
              icon: <Store className="size-4" aria-hidden />,
              title: "Different rhythms",
              copy: "A mall store peaks on Saturday, a wholesale counter peaks on Monday. Both patterns are learned separately.",
            },
            {
              icon: <Users className="size-4" aria-hidden />,
              title: "Scoped access",
              copy: "A store manager sees their shop. The area lead sees four. The owner sees margin, cover and fill rate across the chain.",
            },
            {
              icon: <MapPin className="size-4" aria-hidden />,
              title: "Opening a new site",
              copy: "Clone an existing location's structure and thresholds, then adjust as its own sales arrive.",
            },
          ]}
        />
        <NumberedSteps
          steps={[
            {
              step: "01",
              title: "Flag the gap",
              copy: "Cover days fall below the location's threshold and the store is flagged before the shelf is empty.",
            },
            {
              step: "02",
              title: "Find the surplus",
              copy: "Stoq checks other locations for cover above their own needs - not just the warehouse.",
            },
            {
              step: "03",
              title: "Draft the transfer",
              copy: "A unit count, a route and a value at cost, with the cover position at both ends shown.",
            },
            {
              step: "04",
              title: "Confirm and reconcile",
              copy: "The sending site confirms the pick, the receiving site confirms the count, and the ledger moves once.",
            },
          ]}
        />
      </PageSection>

      <PageSection
        eyebrow="Operations"
        title="Counts that close, not counts that linger"
        subtitle="A stock count is only useful when the variance is signed off and the ledger is corrected the same day."
      >
        <StatRow
          stats={[
            { value: "4", label: "locations in the demo", note: "A warehouse, two stores and an online dark store." },
            { value: "96%", label: "fill rate after transfers", note: "Typical chain result after two months of suggested moves." },
            { value: "24h", label: "to trace a variance", note: "Transfers, counts and receipts all keep a named trail." },
          ]}
        />
      </PageSection>

      <PageSection eyebrow="Questions" title="Multi-location questions">
        <FaqList
          columns={2}
          items={[
            {
              q: "Can each location have its own prices?",
              a: "Yes. Price lists are assigned per channel or per location, while stock stays on one ledger.",
            },
            {
              q: "How are transfers valued?",
              a: "At cost, preserving supplier and batch references. The move does not create profit - it relocates inventory.",
            },
            {
              q: "Can a store receive without a warehouse?",
              a: "Yes. Locations can transfer between each other directly; the warehouse is not a required middle step.",
            },
            {
              q: "What if two sites count the same stock?",
              a: "Only signed-off counts move the ledger. A pending count is visible as a draft so two sites cannot quietly overwrite each other.",
            },
          ]}
        />
      </PageSection>

      <Cta />
    </MarketingPage>
  );
}
