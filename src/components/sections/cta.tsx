import Link from "next/link";
import { ArrowRight, ScanBarcode, Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

export function Cta() {
  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-5 pb-4 pt-24 sm:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-[26px] border border-white/[0.09] bg-[linear-gradient(155deg,rgba(91,140,255,0.15),rgba(6,9,17,0.8)_55%,rgba(211,243,107,0.06))] px-6 py-14 text-center shadow-[0_60px_140px_-60px_rgba(91,140,255,0.55)] sm:px-12 sm:py-16">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="grid-tile absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
            <div className="barcode absolute bottom-0 left-0 right-0 h-10 text-white/[0.04]" />
            <div className="aurora left-[12%] top-[-10rem] h-64 w-96 bg-azure-500/25" />
            <div
              className="aurora bottom-[-10rem] right-[8%] h-64 w-80 bg-lime-400/10"
              style={{ animationDelay: "-11s" }}
            />
          </div>

          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.05] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-bone/80">
              <Sparkles className="size-3 text-lime-300" aria-hidden />
              14 days · no card
            </span>

            <h2 className="mx-auto mt-6 max-w-2xl text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-bone">
              Know what you have.
              <br />
              <span className="gradient-text">Before the shelf tells you.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-md text-[13.5px] leading-relaxed text-fog">
              Put four locations, eighteen SKUs and eight weeks of forecast in front of
              your team. The demo is already loaded.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-lime-400 px-6 text-[14px] font-bold text-ink-950 shadow-[0_20px_50px_-18px_rgba(211,243,107,0.7)] transition-colors hover:bg-lime-300 sm:w-auto"
              >
                Open the demo workspace
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
              <Link
                href="/sign-up"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/14 bg-white/[0.05] px-6 text-[14px] font-semibold text-bone transition-colors hover:bg-white/[0.09] sm:w-auto"
              >
                Create an account
              </Link>
            </div>

            <p className="mt-5 inline-flex items-center gap-1.5 text-[10.5px] text-fog-faint">
              <ScanBarcode className="size-3.5" aria-hidden />
              Barcode scanners and phone cameras supported
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
