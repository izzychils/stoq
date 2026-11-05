import {
  ArrowRight,
  ArrowLeftRight,
  Barcode,
  Boxes,
  Building2,
  ClipboardCheck,
  Layers,
  RefreshCw,
  ScanBarcode,
  Sparkles,
  Store,
  Truck,
  Warehouse,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { IconTile, SectionHeading } from "@/components/ui";

const NUMBERS = [
  { value: "4", label: "locations, one ledger", note: "Stores, warehouse and online fulfilment side by side." },
  { value: "8", label: "week forecast", note: "Per SKU, per location, with a confidence band." },
  { value: "<20s", label: "to draft an order", note: "From low-stock flag to purchase order." },
];

const FEATURES = [
  {
    icon: Boxes,
    title: "Live stock, per location",
    copy: "Every SKU carries a quantity for each store and warehouse. The chain total is the sum, never a separate record.",
    span: "lg:col-span-2",
  },
  {
    icon: ScanBarcode,
    title: "Barcode intake",
    copy: "Scan a carton, capture SKU, batch and cost. No typing at the loading bay.",
  },
  {
    icon: ArrowLeftRight,
    title: "Transfers with a paper trail",
    copy: "Move stock between locations; both ends confirm the count.",
  },
  {
    icon: RefreshCw,
    title: "Reorder points that learn",
    copy: "Thresholds follow sales velocity, promotions and supplier lead time.",
  },
  {
    icon: Truck,
    title: "Supplier operations",
    copy: "Lead times, terms, outstanding balances and delivery scorecards.",
  },
  {
    icon: ClipboardCheck,
    title: "Stock counts without the panic",
    copy: "Cycle counts by aisle, with variance signed off before the ledger moves.",
  },
  {
    icon: Building2,
    title: "Roles for every site",
    copy: "Store manager, warehouse lead, buyer and owner each see their scope.",
  },
  {
    icon: Layers,
    title: "Wholesale and retail in one",
    copy: "Price lists per channel, one stock position, one margin picture.",
  },
];

const AUDIENCE = [
  { icon: Store, label: "Retailers", note: "Single store to national chain" },
  { icon: Truck, label: "Wholesalers", note: "Bulk orders and price tiers" },
  { icon: ArrowLeftRight, label: "Distributors", note: "Multi-site, high SKU count" },
  { icon: Warehouse, label: "Warehouses", note: "Locations, bins and transfers" },
  { icon: Boxes, label: "Supermarkets", note: "Aisle-level replenishment" },
  { icon: Building2, label: "Fulfilment", note: "Dark stores and online picking" },
];

export function Capabilities() {
  return (
    <>
      <section className="relative border-y border-white/[0.06] bg-black/20">
        <div className="mx-auto grid w-full max-w-[1200px] gap-px px-5 sm:px-8 md:grid-cols-3">
          {NUMBERS.map((item, index) => (
            <Reveal key={item.label} delay={index * 70} className="py-10 md:px-8 md:py-12">
              <p className="text-[clamp(2.4rem,5vw,3.6rem)] font-semibold leading-none tracking-[-0.06em] text-bone">
                {item.value}
                <span className="text-lime-400">.</span>
              </p>
              <p className="mt-3 text-[12.5px] font-semibold uppercase tracking-[0.1em] text-lime-300/90">
                {item.label}
              </p>
              <p className="mt-2 max-w-[17rem] text-[12.5px] leading-relaxed text-fog-dim">
                {item.note}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="features" className="relative mx-auto w-full max-w-[1200px] px-5 py-24 sm:px-8 sm:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Capabilities"
            title={
              <>
                Built for the messy middle
                <br className="hidden sm:block" /> of <span className="gradient-text">real stock</span>
              </>
            }
            subtitle="Not a catalogue with a quantity field. A working system for teams who move cartons, count shelves and chase suppliers every day."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <Reveal key={feature.title} delay={(index % 4) * 50} className={feature.span ?? ""}>
              <GlassCard
                className="group h-full p-5 transition-colors duration-300 hover:border-azure-500/25 hover:bg-white/[0.05]"
                glow={feature.title === "Live stock, per location"}
              >
                <IconTile tone={feature.title === "Live stock, per location" ? "azure" : "neutral"}>
                  <feature.icon className="size-4" aria-hidden />
                </IconTile>
                <h3 className="mt-4 text-[15px] font-semibold tracking-tight text-bone">
                  {feature.title}
                </h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-fog-dim">{feature.copy}</p>

                {feature.title === "Live stock, per location" ? (
                  <div className="mt-5 grid grid-cols-4 gap-1.5">
                    {["Ikeja", "Yaba", "Lekki", "Online"].map((location, locationIndex) => (
                      <div
                        key={location}
                        className="rounded-lg border border-white/[0.06] bg-black/25 p-2"
                      >
                        <p className="truncate text-[8.5px] uppercase tracking-wide text-fog-faint">
                          {location}
                        </p>
                        <p className="mt-1 text-[12px] font-bold tnum text-bone">
                          {[412, 128, 96, 64][locationIndex]}
                        </p>
                        <span className="mt-1.5 block h-1 rounded-full bg-white/[0.07]">
                          <span
                            className={`block h-full rounded-full ${
                              locationIndex === 0 ? "bg-azure-500" : locationIndex === 3 ? "bg-lime-400" : "bg-azure-400/60"
                            }`}
                            style={{ width: `${[100, 42, 34, 26][locationIndex]}%` }}
                          />
                        </span>
                        <p className="mt-1 text-[8px] text-fog-faint">bottled water</p>
                      </div>
                    ))}
                  </div>
                ) : null}

                {feature.title === "Barcode intake" ? (
                  <div className="mt-5 rounded-lg border border-white/[0.06] bg-black/25 p-2.5">
                    <p className="font-mono text-[9px] text-fog-dim">6001234500048</p>
                    <div className="mt-1.5 h-5 w-full text-fog-faint barcode" />
                    <p className="mt-1.5 text-[9px] text-lime-300/80">Bottled water · 240 units</p>
                  </div>
                ) : null}

                {feature.title === "Reorder points that learn" ? (
                  <div className="mt-5 space-y-1">
                    {[
                      { label: "This week", value: 412 },
                      { label: "Next week", value: 438 },
                      { label: "Peak", value: 512 },
                    ].map((row, rowIndex) => (
                      <div key={row.label} className="flex items-center gap-2 text-[9px]">
                        <span className="w-14 shrink-0 text-fog-faint">{row.label}</span>
                        <span className="h-1 flex-1 rounded-full bg-white/[0.07]">
                          <span
                            className="block h-full rounded-full bg-[linear-gradient(90deg,#5b8cff,#d3f36b)]"
                            style={{ width: `${(row.value / 512) * 100}%` }}
                          />
                        </span>
                        <span className="w-6 text-right tnum text-fog">{row.value}</span>
                      </div>
                    ))}
                  </div>
                ) : null}
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={40} className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-[12px] text-fog-dim">
            <Sparkles className="size-4 text-azure-400" aria-hidden />
            Every capability is live on the 14-day trial.
          </p>
          <a
            href="/dashboard"
            className="inline-flex min-h-10 items-center gap-2 text-[13px] font-semibold text-azure-300 hover:text-azure-200"
          >
            Walk through the workspace
            <ArrowRight className="size-3.5" aria-hidden />
          </a>
        </Reveal>
      </section>

      <section id="audience" className="relative border-y border-white/[0.06] bg-[#050810]">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-8">
          <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="mono-label !text-azure-300/80">Who it is for</p>
              <h2 className="mt-4 max-w-md text-[clamp(1.8rem,3.4vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-bone">
                If you count it,
                <br />
                <span className="gradient-text">Stoq tracks it</span>.
              </h2>
            </div>
            <p className="max-w-xs text-[12.5px] leading-relaxed text-fog-dim">
              From a single store with 400 SKUs to a distributor with a warehouse and four
              delivery vans.
            </p>
          </Reveal>

          <div className="mt-9 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {AUDIENCE.map((item, index) => (
              <Reveal key={item.label} delay={index * 40}>
                <div className="group h-full rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 transition-colors hover:border-azure-500/25 hover:bg-azure-500/[0.05]">
                  <item.icon className="size-4 text-azure-300/80" aria-hidden />
                  <p className="mt-2.5 text-[11.5px] font-semibold text-bone">{item.label}</p>
                  <p className="mt-0.5 text-[9.5px] leading-snug text-fog-faint">{item.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
