import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Minus } from "lucide-react";
import { Faq, Pricing } from "@/components/sections/pricing";
import { Cta } from "@/components/sections/cta";
import { MarketingPage, PageHero, PageSection } from "@/components/marketing/page-shell";
import { GlassCard } from "@/components/ui/glass-card";

export const metadata: Metadata = {
  title: "Pricing — pay for the operation you run",
  description:
    "Stoq pricing: ₦20,000/month for one store, ₦56,000/month for up to ten locations with forecasting, transfers and the stock assistant, and a scoped Network plan for warehouses and distributors. 14-day trial, no card.",
  keywords: [
    "inventory software pricing",
    "stock management cost",
    "inventory software Nigeria",
    "multi-location inventory pricing",
  ],
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Stoq pricing",
    description:
      "One store, a chain of ten, or a whole network — priced by operation, not by scan.",
    url: "https://stoq.xyz/pricing",
  },
};

const COMPARISON = [
  { feature: "Locations", store: "1", chain: "Up to 10", network: "Unlimited" },
  { feature: "Users", store: "5", chain: "Unlimited", network: "Unlimited" },
  { feature: "SKUs", store: "2,000", chain: "Unlimited", network: "Unlimited" },
  { feature: "Barcode intake & counts", store: true, chain: true, network: true },
  { feature: "Low-stock alerts", store: true, chain: true, network: true },
  { feature: "Custom roles & approvals", store: false, chain: true, network: true },
  { feature: "Inter-location transfers", store: false, chain: true, network: true },
  { feature: "8-week demand forecasting", store: false, chain: true, network: true },
  { feature: "Automated reorder drafts", store: false, chain: true, network: true },
  { feature: "Supplier & purchase orders", store: false, chain: true, network: true },
  { feature: "Stock assistant", store: false, chain: true, network: true },
  { feature: "SSO & audit trail", store: false, chain: false, network: true },
  { feature: "API & ERP integration", store: false, chain: false, network: true },
  { feature: "99.9% uptime SLA", store: false, chain: false, network: true },
];

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className="text-[11.5px] tnum text-bone">{value}</span>;
  }
  return value ? (
    <Check className="size-4 text-lime-400" aria-label="Included" />
  ) : (
    <Minus className="size-4 text-fog-faint/50" aria-label="Not included" />
  );
}

export default function PricingPage() {
  return (
    <MarketingPage>
      <PageHero
        eyebrow="Pricing"
        tone="lime"
        title={
          <>
            Pay for the operation
            <br /> you <span className="gradient-text">actually run</span>.
          </>
        }
        description="No per-scan charges, no per-seat surprises on the floor, no implementation fee. Start with one store and add locations, transfers and forecasting when the business needs them — not when a contract says so."
        bullets={[
          "14-day trial with no card",
          "Scanning and counting included",
          "Annual billing saves 17%",
          "All prices in naira, excluding VAT",
        ]}
      >
        <GlassCard intensity="strong" hairline className="p-5">
          <p className="mono-label !text-azure-300/80">What the plans share</p>
          <ul className="mt-4 space-y-2.5">
            {[
              "The same ledger and the same stock engine",
              "Barcode intake, cycle counts and CSV import",
              "Offline queue and phone camera scanning",
              "Named users, not shared logins",
              "Export your data whenever you want it",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[12px] text-bone/85">
                <Check className="mt-0.5 size-3.5 shrink-0 text-lime-400" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-5 rounded-xl border border-white/[0.07] bg-black/25 px-3.5 py-3">
            <p className="text-[10.5px] leading-relaxed text-fog-dim">
              Forecasting needs history. If your data is thin, Stoq tells you when a plan&apos;s
              features will actually be useful instead of selling them early.
            </p>
          </div>
        </GlassCard>
      </PageHero>

      <Pricing />

      <PageSection
        eyebrow="Compare"
        title="What is in each plan"
        subtitle="Everything is in naira. Network is scoped with our team because warehouses and distributors usually need integration work."
      >
        <div className="mt-10 overflow-x-auto rounded-2xl border border-white/[0.07] bg-white/[0.02]">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-white/[0.07] text-[9px] uppercase tracking-[0.1em] text-fog-faint">
                <th className="px-5 py-3 font-medium">Feature</th>
                <th className="px-5 py-3 font-medium">Store</th>
                <th className="px-5 py-3 font-medium text-azure-300">Chain</th>
                <th className="px-5 py-3 font-medium">Network</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr key={row.feature} className="border-b border-white/[0.045] last:border-0">
                  <td className="px-5 py-3 text-[11.5px] text-fog">{row.feature}</td>
                  <td className="px-5 py-3">
                    <Cell value={row.store} />
                  </td>
                  <td className="bg-azure-500/[0.04] px-5 py-3">
                    <Cell value={row.chain} />
                  </td>
                  <td className="px-5 py-3">
                    <Cell value={row.network} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[10.5px] text-fog-faint">
          Need a plan for two stores, or pricing per extra location? Ask and we will quote it
          rather than forcing you into a tier.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/dashboard"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-azure-500 px-5 text-[13px] font-bold text-white transition-colors hover:bg-azure-400"
          >
            Try the demo first
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
          <Link
            href="/sign-up"
            className="inline-flex min-h-11 items-center rounded-full border border-white/12 bg-white/[0.04] px-5 text-[13px] font-semibold text-bone transition-colors hover:border-white/25"
          >
            Start the 14-day trial
          </Link>
        </div>
      </PageSection>

      <Faq />

      <Cta />
    </MarketingPage>
  );
}
