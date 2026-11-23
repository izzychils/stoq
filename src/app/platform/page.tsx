import type { Metadata } from "next";
import {
  ArrowLeftRight,
  Barcode,
  Boxes,
  Building2,
  ClipboardCheck,
  Layers,
  ShoppingCart,
  Truck,
  Users,
} from "lucide-react";
import { Platform } from "@/components/sections/platform";
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
import { faqs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Platform: one inventory ledger for every location",
  description:
    "Stoq is the AI-powered inventory operating system for retail and distribution: live stock per location, AI demand forecasting, barcode intake, cycle counts, purchase orders and supplier scorecards in one ledger.",
  keywords: [
    "inventory operating system",
    "inventory management software",
    "stock control",
    "barcode inventory",
    "cycle counting",
    "multi-channel stock",
  ],
  alternates: { canonical: "/platform" },
  openGraph: {
    title: "Stoq platform: one inventory ledger for every location",
    description:
      "Live stock per location, transfers, barcode intake, counts and purchase orders on a single ledger.",
    url: "https://stoq.site/platform",
  },
};

export default function PlatformPage() {
  return (
    <MarketingPage>
      <PageHero
        eyebrow="The platform"
        title={
          <>
            One ledger for
            <br />
            <span className="gradient-text">every carton</span>.
          </>
        }
        description="Stoq replaces the spreadsheet, the notebook at the till and the WhatsApp chain of “do we have any left?”. Stock, movements and buying decisions all read from the same record, so the number on the dashboard is the number in the aisle."
        bullets={[
          "Stock per SKU, per location - never averaged",
          "AI-powered demand forecasting and reorder suggestions",
          "Barcode intake without typing at the bay",
          "Transfers confirmed at both ends",
          "Purchase orders drafted by AI from real velocity",
        ]}
      >
        <div className="glass-strong edge-light rounded-2xl p-5">
          <p className="mono-label !text-azure-300/80">Ledger snapshot</p>
          <div className="mt-4 space-y-2.5">
            {[
              { label: "SKUs tracked", value: "18", note: "across 4 locations" },
              { label: "Stock value at cost", value: "₦48.2m", note: "updated on every movement" },
              { label: "Below reorder point", value: "6", note: "orders already drafted" },
              { label: "Fill rate this week", value: "94.2%", note: "chain-wide" },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3"
              >
                <div>
                  <p className="text-[11.5px] font-semibold text-bone">{row.label}</p>
                  <p className="text-[9.5px] text-fog-faint">{row.note}</p>
                </div>
                <p className="text-[13px] font-bold tnum text-azure-300">{row.value}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 rounded-xl border border-lime-400/20 bg-lime-400/[0.06] px-3 py-2.5 text-[10.5px] leading-relaxed text-lime-100/90">
            Every row above is derived from the same movement history: intake, sales,
            transfers and signed-off counts.
          </p>
        </div>
      </PageHero>

      <Platform />

      <PageSection
        eyebrow="Modules"
        title={
          <>
            Everything the operation needs,
            <br className="hidden sm:block" /> nothing it{" "}
            <span className="gradient-text">does not</span>.
          </>
        }
        subtitle="Stoq is deliberately narrow: stock in, stock out, stock moved, stock bought. Each module writes to the same ledger, so none of them can disagree with another."
      >
        <FeatureCards
          columns={3}
          items={[
            {
              icon: <Boxes className="size-4" aria-hidden />,
              title: "Stock visibility",
              copy: "Quantity, cost and cover days per SKU per location. Chain totals are sums, not separate records that drift.",
            },
            {
              icon: <Barcode className="size-4" aria-hidden />,
              title: "Barcode intake",
              copy: "Scan cartons and cases at the loading bay. SKU, batch, expiry and landed cost are captured in one pass.",
            },
            {
              icon: <ArrowLeftRight className="size-4" aria-hidden />,
              title: "Transfers",
              copy: "Suggested by demand, approved by a human, confirmed by both the sending and receiving location.",
            },
            {
              icon: <ClipboardCheck className="size-4" aria-hidden />,
              title: "Cycle counts",
              copy: "Count an aisle instead of the whole warehouse. Variances need a sign-off before the ledger moves.",
            },
            {
              icon: <ShoppingCart className="size-4" aria-hidden />,
              title: "Purchase orders",
              copy: "Reorder points recalculate from sales, lead time and promotions. Drafts wait for approval, never auto-send.",
            },
            {
              icon: <Truck className="size-4" aria-hidden />,
              title: "Supplier operations",
              copy: "Lead time, reliability and outstanding balance per supplier, linked to the stock each order is holding up.",
            },
            {
              icon: <Layers className="size-4" aria-hidden />,
              title: "Wholesale and retail",
              copy: "Price lists per channel on one stock position, so a wholesale order cannot silently empty a retail shelf.",
            },
            {
              icon: <Users className="size-4" aria-hidden />,
              title: "Roles per site",
              copy: "Store managers see their shop. Buyers see cover and cost. Owners see margin and fill rate across the chain.",
            },
            {
              icon: <Building2 className="size-4" aria-hidden />,
              title: "Works on the floor",
              copy: "A browser app that runs on the phone in a pocket, with an offline queue for basements and back rooms.",
            },
          ]}
        />
      </PageSection>

      <PageSection
        eyebrow="Adoption"
        title={
          <>
            Live in a week,
            <br /> not a <span className="gradient-text">quarter</span>.
          </>
        }
        subtitle="There is no implementation team to book. Most chains start with one location, one CSV and a barcode scanner."
      >
        <NumberedSteps
          steps={[
            {
              step: "01",
              title: "Import the catalogue",
              copy: "Upload SKU, barcode, cost, price and opening stock per location. Preview before anything is committed.",
            },
            {
              step: "02",
              title: "Invite the sites",
              copy: "Owners, buyers, store managers and warehouse leads get scoped logins - no shared passwords.",
            },
            {
              step: "03",
              title: "Scan and count",
              copy: "Intake, sales and cycle counts start feeding the ledger from day one, including offline entries.",
            },
            {
              step: "04",
              title: "Turn on forecasting",
              copy: "After four weeks of history the model starts drafting transfers and purchase orders for approval.",
            },
          ]}
        />
        <StatRow
          stats={[
            { value: "7", label: "days to first count", note: "Typical time from CSV to a signed-off cycle count." },
            { value: "94%", label: "fill rate", note: "Median chain fill rate after two months of transfers." },
            { value: "0", label: "per-scan fees", note: "Scanning, counting and transfers are included in the plan." },
          ]}
        />
      </PageSection>

      <PageSection
        eyebrow="Questions"
        title="Platform questions, answered"
        subtitle="The three things operations leads ask before they show this to finance."
      >
        <FaqList items={faqs.slice(0, 4)} columns={2} />
      </PageSection>

      <Cta />
    </MarketingPage>
  );
}
