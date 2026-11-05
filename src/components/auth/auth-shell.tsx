import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import { Logo } from "@/components/brand/logo";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="ambient min-h-dvh">
      <div className="mx-auto grid min-h-dvh w-full max-w-[1100px] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col px-5 py-6 sm:px-10 sm:py-8">
          <div className="flex items-center justify-between">
            <Link href="/" aria-label="Stoq home">
              <Logo />
            </Link>
            <Link
              href="/"
              className="inline-flex min-h-8 items-center gap-1.5 text-[11px] font-semibold text-fog-dim transition-colors hover:text-bone"
            >
              <ArrowLeft className="size-3" aria-hidden />
              Back to site
            </Link>
          </div>

          <div className="flex flex-1 items-center py-10">
            <div className="w-full max-w-[380px]">
              <p className="mono-label !text-azure-300/80">Workspace access</p>
              <h1 className="mt-4 text-[clamp(1.7rem,3.4vw,2.2rem)] font-semibold leading-[1.06] tracking-[-0.04em] text-bone">
                {title}
              </h1>
              <p className="mt-3 text-[12.5px] leading-relaxed text-fog">{subtitle}</p>

              <div className="mt-7">{children}</div>

              <div className="mt-6">{footer}</div>

              <p className="mt-8 border-t border-white/[0.07] pt-4 text-[9.5px] leading-relaxed text-fog-faint">
                Demonstration site. Accounts are not created, credentials are not stored,
                and no inventory data is sent anywhere.
              </p>
            </div>
          </div>
        </div>

        <aside className="relative hidden overflow-hidden border-l border-white/[0.07] lg:block">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="aurora left-[-10%] top-[-10%] h-80 w-96 bg-azure-500/25" />
            <div
              className="aurora bottom-[-12%] right-[-6%] h-72 w-72 bg-lime-400/10"
              style={{ animationDelay: "-8s" }}
            />
            <div className="grid-tile absolute inset-0 opacity-25 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
          </div>

          <div className="relative flex h-full flex-col justify-center px-10 py-12">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.05] px-3 py-1 text-[9.5px] font-semibold uppercase tracking-[0.12em] text-bone/80">
              <Sparkles className="size-3 text-lime-300" aria-hidden />
              Inventory OS
            </span>

            <h2 className="mt-6 max-w-sm text-[clamp(1.7rem,2.8vw,2.4rem)] font-semibold leading-[1.04] tracking-[-0.045em] text-bone">
              Four locations.
              <br />
              One <span className="gradient-text">source of truth</span>.
            </h2>

            <ul className="mt-7 space-y-3">
              {[
                "Stock counted per location, never averaged",
                "Forecast that explains its own inputs",
                "Transfers confirmed at both ends",
                "A draft order ready before the shelf empties",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[12px] text-bone/80">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-lime-400" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 max-w-sm rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur">
              <p className="text-[11.5px] leading-relaxed text-bone/85">
                “The assistant is the first thing I open. ‘Which products are running low?’
                used to take an hour of counting. Now it is a sentence.”
              </p>
              <p className="mt-3 text-[9.5px] text-fog-faint">
                Tomiwa Salami · Founder, Brightway Stores
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
