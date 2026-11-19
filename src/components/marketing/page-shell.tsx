import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Reveal } from "@/components/motion/reveal";
import { Badge, Section, SectionHeading } from "@/components/ui";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

export function MarketingPage({ children }: { children: ReactNode }) {
  return (
    <div className="ambient">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  bullets,
  tone = "azure",
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  bullets?: string[];
  tone?: "azure" | "lime";
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-4 pt-14 sm:pt-20">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="aurora left-[6%] top-[-16rem] h-[30rem] w-[42rem] bg-azure-500/[0.16]" />
        <div className="aurora right-[-6rem] top-[2rem] h-[20rem] w-[20rem] bg-lime-400/[0.08]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1200px] gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <Reveal>
          <Badge tone={tone}>
            <span className="size-1.5 rounded-full bg-current" aria-hidden />
            {eyebrow}
          </Badge>
          <h1 className="mt-5 text-[clamp(2.1rem,5vw,3.6rem)] font-semibold leading-[1] tracking-[-0.05em] text-bone">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-fog">{description}</p>

          {bullets?.length ? (
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2 text-[12.5px] text-bone/80">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-lime-400" aria-hidden />
                  {bullet}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
            <Link
              href="/dashboard"
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-azure-500 px-5 text-[13.5px] font-bold text-white shadow-[0_16px_40px_-16px_rgba(91,140,255,0.8)] transition-colors hover:bg-azure-400"
            >
              Open the demo workspace
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-5 text-[13.5px] font-semibold text-bone transition-colors hover:border-white/25 hover:bg-white/[0.07]"
            >
              See pricing
            </Link>
          </div>
        </Reveal>

        <Reveal delay={90}>{children}</Reveal>
      </div>
    </section>
  );
}

export function PageSection({
  eyebrow,
  title,
  subtitle,
  children,
  className,
  center = false,
}: {
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  className?: string;
  center?: boolean;
}) {
  return (
    <Section className={cn("py-16 sm:py-20", className)}>
      {title ? (
        <Reveal className={cn(center && "mx-auto max-w-2xl text-center")}>
          <SectionHeading
            eyebrow={eyebrow ?? "Stoq"}
            title={title}
            subtitle={subtitle}
            align={center ? "center" : "left"}
          />
        </Reveal>
      ) : null}
      {children}
    </Section>
  );
}

export function FeatureCards({
  items,
  columns = 3,
}: {
  items: { icon: ReactNode; title: string; copy: string }[];
  columns?: 2 | 3 | 4;
}) {
  return (
    <div
      className={cn(
        "mt-10 grid gap-3",
        columns === 2 && "sm:grid-cols-2",
        columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "sm:grid-cols-2 lg:grid-cols-4",
      )}
    >
      {items.map((item, index) => (
        <Reveal key={item.title} delay={index * 50}>
          <GlassCard className="h-full p-5">
            <span className="flex size-9 items-center justify-center rounded-xl border border-azure-500/25 bg-azure-500/10 text-azure-300">
              {item.icon}
            </span>
            <h3 className="mt-4 text-[14.5px] font-semibold text-bone">{item.title}</h3>
            <p className="mt-2 text-[12.5px] leading-relaxed text-fog-dim">{item.copy}</p>
          </GlassCard>
        </Reveal>
      ))}
    </div>
  );
}

export function NumberedSteps({
  steps,
}: {
  steps: { step: string; title: string; copy: string }[];
}) {
  return (
    <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((item, index) => (
        <Reveal key={item.step} delay={index * 60} as="li">
          <div className="h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
            <span className="font-mono text-[10px] tracking-[0.2em] text-azure-300/70">
              {item.step}
            </span>
            <h3 className="mt-3 text-[14px] font-semibold text-bone">{item.title}</h3>
            <p className="mt-2 text-[12.5px] leading-relaxed text-fog-dim">{item.copy}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

export function StatRow({
  stats,
}: {
  stats: { value: string; label: string; note: string }[];
}) {
  return (
    <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.04] sm:grid-cols-3">
      {stats.map((stat, index) => (
        <Reveal key={stat.label} delay={index * 60} className="bg-[#060910] p-6">
          <p className="text-[clamp(1.9rem,3.6vw,2.6rem)] font-semibold leading-none tracking-[-0.05em] text-bone">
            {stat.value}
            <span className="text-lime-400">.</span>
          </p>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-lime-300/90">
            {stat.label}
          </p>
          <p className="mt-1.5 text-[12px] leading-relaxed text-fog-dim">{stat.note}</p>
        </Reveal>
      ))}
    </div>
  );
}

export function FaqList({
  items,
  columns = 1,
}: {
  items: { q: string; a: string }[];
  columns?: 1 | 2;
}) {
  return (
    <div
      className={cn(
        "mt-10 grid gap-x-10 gap-y-0",
        columns === 2 && "md:grid-cols-2",
      )}
    >
      {items.map((item, index) => (
        <Reveal key={item.q} delay={(index % 4) * 40}>
          <div className="border-t border-white/[0.07] py-5">
            <h3 className="text-[13.5px] font-semibold text-bone">{item.q}</h3>
            <p className="mt-2 text-[12.5px] leading-relaxed text-fog">{item.a}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
