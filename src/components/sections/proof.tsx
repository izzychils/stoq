import { ArrowRight, Check, Quote, Star } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui";
import { testimonials } from "@/lib/data";

const WORKFLOW = [
  {
    step: "01",
    title: "Bring the stock in",
    copy: "Import a CSV or scan products at the loading bay. Opening quantities are captured per location, not lumped together.",
  },
  {
    step: "02",
    title: "Sell and count",
    copy: "Sales, transfers and cycle counts all hit the same ledger. Variances need a sign-off before quantities move.",
  },
  {
    step: "03",
    title: "Let the model look ahead",
    copy: "Stoq learns the rhythm of each SKU, then drafts the transfer or purchase order that keeps cover where it belongs.",
  },
  {
    step: "04",
    title: "Approve and receive",
    copy: "A human approves. The sending site confirms, the receiving site signs for it, and the paper trail closes itself.",
  },
];

export function Workflow() {
  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-5 py-24 sm:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              From loading bay
              <br className="hidden sm:block" /> to <span className="gradient-text">ledger</span>.
            </>
          }
          subtitle="One workflow for the physical reality of stock — cartons, counts and confirmations — and the numbers leadership needs on Monday."
        />
      </Reveal>

      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {WORKFLOW.map((item, index) => (
          <Reveal key={item.step} delay={index * 70}>
            <div className="group relative h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-colors hover:border-azure-500/20 hover:bg-white/[0.035]">
              <span className="font-mono text-[10px] tracking-[0.2em] text-azure-300/70">
                {item.step}
              </span>
              <h3 className="mt-3 text-[14px] font-semibold text-bone">{item.title}</h3>
              <p className="mt-2 text-[12.5px] leading-relaxed text-fog-dim">{item.copy}</p>
              {index < WORKFLOW.length - 1 ? (
                <ArrowRight
                  className="absolute -right-2.5 top-6 hidden size-4 text-fog-faint/40 lg:block"
                  aria-hidden
                />
              ) : null}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section id="customers" className="relative border-y border-white/[0.06] bg-[#050810]">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-24 sm:px-8">
        <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="mono-label !text-azure-300/80">Operators</p>
            <h2 className="mt-4 max-w-md text-[clamp(1.8rem,3.6vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-bone">
              Fewer stock-outs.
              <br />
              <span className="gradient-text">Fewer surprise orders.</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 text-[12px] text-fog-dim">
            <span className="flex gap-0.5 text-lime-400">
              {[0, 1, 2, 3, 4].map((star) => (
                <Star key={star} className="size-3.5 fill-current" aria-hidden />
              ))}
            </span>
            4.9 / 5 from 180 operations teams
          </div>
        </Reveal>

        <div className="mt-10 grid gap-3 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 80}>
              <figure className="glass flex h-full flex-col rounded-2xl p-5">
                <Quote className="size-4 text-azure-400/60" aria-hidden />
                <blockquote className="mt-3 flex-1 text-[13px] leading-relaxed text-bone/85">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-white/[0.06] pt-4">
                  <span className="flex size-8 items-center justify-center rounded-full bg-azure-500/12 text-[10px] font-bold text-azure-300">
                    {testimonial.initials}
                  </span>
                  <span>
                    <span className="block text-[11.5px] font-semibold text-bone">
                      {testimonial.name}
                    </span>
                    <span className="block text-[9.5px] text-fog-faint">{testimonial.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={60} className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 border-t border-white/[0.06] pt-7 text-[11px] text-fog-faint">
          {[
            "No per-scan fees",
            "CSV & Excel import",
            "Works on the phone in your pocket",
            "Offline queue included",
          ].map((item) => (
            <span key={item} className="inline-flex items-center gap-1.5">
              <Check className="size-3 text-lime-400/80" aria-hidden />
              {item}
            </span>
          ))}
          <Link href="/dashboard" className="inline-flex items-center gap-1 text-azure-300 hover:text-azure-200">
            See it with your own SKUs
            <ArrowRight className="size-3" aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
