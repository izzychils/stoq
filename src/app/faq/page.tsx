import type { Metadata } from "next";
import { Cta } from "@/components/sections/cta";
import { FaqList, MarketingPage, PageHero, PageSection } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Questions about Stoq inventory software",
  description:
    "Answers about Stoq: how forecasting works with your sales history, how multi-location stock and transfers behave, barcode hardware, CSV import, offline mode, data ownership, pricing and the trial.",
  keywords: [
    "Stoq FAQ",
    "inventory software questions",
    "barcode scanner requirements",
    "inventory data import",
    "inventory software trial",
  ],
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Stoq FAQ",
    description: "Forecasting, multi-location stock, hardware, data and pricing questions.",
    url: "https://stoq.site/faq",
  },
};

const GROUPS = [
  {
    title: "Getting started",
    items: [
      {
        q: "How long does setup take?",
        a: "Most teams are scanning within a day: import a CSV of products and opening stock, invite the locations, and start counting. Forecasting needs four weeks of sales history before it drafts its first order, and the app says so plainly until then.",
      },
      {
        q: "Can I import my existing product list?",
        a: "Upload a CSV or Excel file. Stoq maps SKU, barcode, name, cost, price and opening stock per location, then shows a preview before anything is committed. Bad rows are listed with the reason rather than silently dropped.",
      },
      {
        q: "Do I need new hardware?",
        a: "No. Any USB or Bluetooth barcode scanner that behaves like a keyboard works, and a phone camera can scan EAN and QR codes for intake and counts. Stoq is a browser app, so no install on the shop computers.",
      },
      {
        q: "Is there a trial?",
        a: "Fourteen days with no card. The demo workspace is also permanently populated with a four-location chain, so you can evaluate the screens before importing anything of your own.",
      },
      {
        q: "What happens to my data if I leave?",
        a: "You can export products, stock, movements and purchase orders as CSV at any time, including during the trial. Your data is yours; there is no export fee or waiting period.",
      },
    ],
  },
  {
    title: "Stock and locations",
    items: [
      {
        q: "Can I manage stock across stores and a warehouse?",
        a: "Yes. Every SKU carries a quantity per location. Transfers move stock between locations while preserving cost, supplier and batch references, and the receiving location has to confirm before the ledger changes.",
      },
      {
        q: "How do transfers work?",
        a: "Stoq suggests a transfer when one location has surplus cover and another is short. The sending site confirms what was picked, the receiving site confirms what arrived, and the ledger moves once - with both names on the record.",
      },
      {
        q: "Does it handle wholesale and retail pricing?",
        a: "Products can carry price lists per channel. Wholesale orders, retail walk-ins and online fulfilment are all recorded against the same stock, with the channel visible in every report.",
      },
      {
        q: "What about stock counts?",
        a: "Count by aisle or by category instead of shutting the store. A count is a draft until it is signed off; variances show the expected quantity, the counted quantity and the value of the difference.",
      },
      {
        q: "Can staff see only their own location?",
        a: "Yes. Roles scope what a user can read and change. A store manager sees their shop, the area lead sees their group, and the owner sees the chain.",
      },
    ],
  },
  {
    title: "Forecasting and reordering",
    items: [
      {
        q: "How does Stoq forecast demand?",
        a: "It models each SKU per location from at least 12 weeks of sales history, adjusted for day-of-week seasonality, promotions and trends. Forecasts run eight weeks ahead and are shown with a confidence band, and every suggestion explains the inputs it used.",
      },
      {
        q: "Why per location and not a chain total?",
        a: "Because the average hides the problem. A chain can look fine while one store runs out on Saturday. Each location has its own velocity, weekday pattern and capacity, and Stoq forecasts each separately.",
      },
      {
        q: "When is a reorder point recalculated?",
        a: "Weekly by default and immediately after a large movement - a promotion, a bulk wholesale sale, or a stock-out that truncated demand.",
      },
      {
        q: "Will it place orders automatically?",
        a: "It drafts them. A named user approves, edits or rejects each one, and that decision is logged with the order. Automatic sending is off by default.",
      },
      {
        q: "How accurate is it?",
        a: "For top-selling SKUs with 26 weeks of history, median accuracy in the demo chain is around 94%. Confidence is shown per SKU, and it is deliberately lower for new products and erratic sellers rather than confidently wrong.",
      },
    ],
  },
  {
    title: "Reliability and security",
    items: [
      {
        q: "What happens when the connection drops?",
        a: "The web app keeps a local queue of counts and sales made offline and syncs them when the connection returns. Conflicts are surfaced for review rather than silently overwritten.",
      },
      {
        q: "Who can see my stock and sales data?",
        a: "Only the users you invite, scoped by role. Data is separated per workspace, and the assistant retrieves records only within the scope of the person asking.",
      },
      {
        q: "Is there an audit trail?",
        a: "Movements, approved orders, count sign-offs and transfer confirmations all keep the user and timestamp. The Network plan adds exportable audit logs and SSO.",
      },
      {
        q: "Do you integrate with my accounting package?",
        a: "The Network plan includes an API and ERP integration work. On other plans, stock, purchase and sales data export as CSV for your accountant.",
      },
    ],
  },
];

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: GROUPS.flatMap((group) =>
    group.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  ),
};

export default function FaqPage() {
  return (
    <MarketingPage>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />

      <PageHero
        eyebrow="Questions"
        title={
          <>
            Everything buying
            <br /> teams <span className="gradient-text">ask first</span>.
          </>
        }
        description="Straight answers about forecasting, multi-location stock, hardware, imports, offline work, data ownership and money. If something is missing, email hello@stoq.site and the answer gets added here."
        bullets={[
          "Setup, imports and hardware",
          "Stock, transfers and counts",
          "Forecasting and reordering",
          "Security, offline and pricing",
        ]}
      >
        <div className="glass-strong edge-light rounded-2xl p-5">
          <p className="mono-label !text-azure-300/80">Quick answers</p>
          <div className="mt-4 space-y-2.5">
            {[
              { q: "Do I need a card to try it?", a: "No. 14 days, no card." },
              { q: "How far ahead does it forecast?", a: "Eight weeks, per SKU, per location." },
              { q: "Does it need new hardware?", a: "No. Any keyboard-style scanner works." },
              { q: "Can it send orders alone?", a: "No. It drafts; a human approves." },
              { q: "Can I export my data?", a: "Yes, CSV, at any time." },
            ].map((row) => (
              <div
                key={row.q}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5"
              >
                <p className="text-[11px] font-semibold text-bone">{row.q}</p>
                <p className="mt-0.5 text-[10.5px] text-fog-dim">{row.a}</p>
              </div>
            ))}
          </div>
        </div>
      </PageHero>

      <PageSection
        eyebrow="Detailed answers"
        title="Grouped so you can find yours"
        subtitle="Four sections: getting started, stock and locations, forecasting, and reliability."
      >
        <div className="mt-10 space-y-12">
          {GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-azure-300/80">
                {group.title}
              </h3>
              <FaqList items={group.items} columns={2} />
            </div>
          ))}
        </div>
      </PageSection>

      <Cta />
    </MarketingPage>
  );
}
