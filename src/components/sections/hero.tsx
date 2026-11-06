import Link from "next/link";
import { ArrowRight, Barcode, Check, Play, Sparkles, TrendingUp } from "lucide-react";
import { ConsolePreview } from "@/components/dashboard/console-preview";
import { Reveal } from "@/components/motion/reveal";

const CUSTOMERS = [
  "Mara Mart",
  "Shelf & Stone",
  "Brightway Stores",
  "Kola Wholesale",
  "Aisle & Co.",
  "Delta Distribution",
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-10 sm:pt-16">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="aurora left-[8%] top-[-14rem] h-[32rem] w-[46rem] bg-azure-500/[0.18]" />
        <div
          className="aurora right-[-8rem] top-[6rem] h-[22rem] w-[22rem] bg-lime-400/[0.1]"
          style={{ animationDelay: "-9s" }}
        />
        <div className="absolute left-1/2 top-[28rem] h-[24rem] w-[62rem] -translate-x-1/2 rounded-[50%] bg-azure-500/[0.09] blur-[120px]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1 pl-1 pr-3 backdrop-blur">
              <span className="flex items-center gap-1.5 rounded-full bg-lime-400/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-lime-300">
                <Sparkles className="size-3" aria-hidden />
                New
              </span>
              <span className="text-[12px] text-fog">8-week demand forecasting, per location</span>
              <ArrowRight className="size-3 text-fog-faint" aria-hidden />
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-7 text-[clamp(2.6rem,6.4vw,4.9rem)] font-semibold leading-[0.97] tracking-[-0.055em] text-bone">
              Stock that answers
              <br />
              <span className="gradient-text">before you ask</span>.
            </h1>
          </Reveal>

          <Reveal delay={150}>
            <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-fog sm:text-[16.5px]">
              Stoq is the inventory operating system for retailers, wholesalers and
              warehouses. Every SKU across every location, a forecast you can act on, and
              reorders drafted before the shelf empties.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-azure-500 px-6 text-[14px] font-bold text-white shadow-[0_20px_50px_-16px_rgba(91,140,255,0.85)] transition-colors hover:bg-azure-400 sm:w-auto"
              >
                Open the demo workspace
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
              <a
                href="/platform"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-6 text-[14px] font-semibold text-bone backdrop-blur transition-colors hover:border-white/25 hover:bg-white/[0.07] sm:w-auto"
              >
                <Play className="size-3.5 fill-current" aria-hidden />
                Take the tour
              </a>
            </div>
          </Reveal>

          <Reveal delay={280}>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11.5px] text-fog-dim">
              {["14-day trial, no card", "Barcode-ready", "Offline queue included"].map((item) => (
                <li key={item} className="inline-flex items-center gap-1.5">
                  <Check className="size-3 text-lime-400" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={120} className="relative mt-14 sm:mt-16">
          <div aria-hidden className="absolute inset-x-10 -top-8 h-24 rounded-[50%] bg-azure-500/25 blur-3xl" />
          <div className="relative rounded-[22px] border border-white/[0.08] bg-white/[0.02] p-1.5 shadow-[0_80px_160px_-70px_rgba(0,0,0,1)] sm:p-2">
            <ConsolePreview />
          </div>

          <div className="absolute -left-2 top-[36%] hidden w-[15.5rem] animate-float lg:block">
            <div className="glass-strong rounded-xl p-3">
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-lg border border-azure-500/25 bg-azure-500/10 text-azure-300">
                  <TrendingUp className="size-3.5" aria-hidden />
                </span>
                <div>
                  <p className="text-[10.5px] font-bold text-bone">Forecast · bottled water</p>
                  <p className="text-[9px] text-fog-dim">438 units/wk · 94% confidence</p>
                </div>
              </div>
              <p className="mt-2 rounded-lg bg-black/30 px-2 py-1.5 text-[9.5px] leading-relaxed text-fog">
                Weekend uplift +18%. Order 480 by 19 Nov to protect the peak.
              </p>
            </div>
          </div>

          <div
            className="absolute -right-2 top-[56%] hidden w-[15rem] animate-float lg:block"
            style={{ animationDelay: "-3.4s" }}
          >
            <div className="glass-strong rounded-xl p-3">
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-lg border border-lime-400/25 bg-lime-400/10 text-lime-300">
                  <Barcode className="size-3.5" aria-hidden />
                </span>
                <p className="text-[10.5px] font-bold text-bone">Scanned at intake</p>
              </div>
              <p className="mt-2 font-mono text-[9.5px] text-fog">6001234500048</p>
              <p className="mt-1 text-[9px] text-lime-300/80">Bottled water · 240 units added</p>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="relative mt-20 border-y border-white/[0.06] bg-black/20 py-6">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-5 px-5 sm:px-8 lg:flex-row lg:gap-10">
          <p className="shrink-0 text-center text-[10.5px] uppercase tracking-[0.14em] text-fog-faint lg:text-left">
            Running stock for
            <br className="hidden lg:block" /> retail and distribution teams
          </p>
          <div className="relative flex w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-max animate-marquee items-center gap-10 pr-10">
              {[0, 1].map((pass) => (
                <div key={pass} className="flex items-center gap-10">
                  {CUSTOMERS.map((name) => (
                    <span
                      key={`${pass}-${name}`}
                      className="whitespace-nowrap text-[13px] font-semibold tracking-tight text-fog-dim/70"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
