import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";

export const metadata: Metadata = {
  title: "Create account",
  description: "Start a Stoq workspace for your stores and warehouse.",
  robots: { index: false, follow: false },
};

export default function SignUpPage() {
  return (
    <AuthShell
      title="Put the whole chain on one ledger."
      subtitle="Start with a store, add the warehouse and forecasting later. No card, no per-scan fees."
      footer={
        <p className="text-[11.5px] text-fog-dim">
          Already have a workspace?{" "}
          <Link href="/sign-in" className="font-semibold text-azure-300 hover:text-azure-200">
            Sign in
          </Link>
        </p>
      }
    >
      <form className="space-y-3.5" action="/dashboard">
        <div className="grid grid-cols-2 gap-2.5">
          <label className="block">
            <span className="text-[9.5px] font-semibold uppercase tracking-[0.1em] text-fog-faint">
              First name
            </span>
            <input
              name="firstName"
              autoComplete="given-name"
              placeholder="Kola"
              className="mt-1.5 min-h-10 w-full rounded-lg border border-white/[0.09] bg-black/25 px-3 text-[12px] text-bone placeholder:text-fog-faint focus:border-azure-500/50 focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="text-[9.5px] font-semibold uppercase tracking-[0.1em] text-fog-faint">
              Last name
            </span>
            <input
              name="lastName"
              autoComplete="family-name"
              placeholder="Adebayo"
              className="mt-1.5 min-h-10 w-full rounded-lg border border-white/[0.09] bg-black/25 px-3 text-[12px] text-bone placeholder:text-fog-faint focus:border-azure-500/50 focus:outline-none"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-[9.5px] font-semibold uppercase tracking-[0.1em] text-fog-faint">
            Business email
          </span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@business.com"
            className="mt-1.5 min-h-10 w-full rounded-lg border border-white/[0.09] bg-black/25 px-3 text-[12px] text-bone placeholder:text-fog-faint focus:border-azure-500/50 focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="text-[9.5px] font-semibold uppercase tracking-[0.1em] text-fog-faint">
            Business name
          </span>
          <input
            name="business"
            autoComplete="organization"
            placeholder="Mara Mart"
            className="mt-1.5 min-h-10 w-full rounded-lg border border-white/[0.09] bg-black/25 px-3 text-[12px] text-bone placeholder:text-fog-faint focus:border-azure-500/50 focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="text-[9.5px] font-semibold uppercase tracking-[0.1em] text-fog-faint">
            Password
          </span>
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            placeholder="At least 10 characters"
            className="mt-1.5 min-h-10 w-full rounded-lg border border-white/[0.09] bg-black/25 px-3 text-[12px] text-bone placeholder:text-fog-faint focus:border-azure-500/50 focus:outline-none"
          />
        </label>

        <div className="grid grid-cols-2 gap-2">
          {["1 location", "Up to 10 locations"].map((scope, index) => (
            <button
              key={scope}
              type="button"
              className={`flex min-h-10 items-center justify-center gap-1.5 rounded-lg border text-[10.5px] font-semibold ${
                index === 0
                  ? "border-azure-500/40 bg-azure-500/10 text-azure-200"
                  : "border-white/[0.09] bg-white/[0.02] text-fog-dim"
              }`}
            >
              {index === 0 ? <Check className="size-3" aria-hidden /> : null}
              {scope}
            </button>
          ))}
        </div>

        <p className="flex items-start gap-2 text-[9.5px] leading-relaxed text-fog-faint">
          <input
            type="checkbox"
            required
            className="mt-0.5 size-3.5 shrink-0 rounded border-white/20 bg-black/30 accent-azure-500"
          />
          I agree to the terms and privacy policy. This is a demonstration and no account
          will be created.
        </p>

        <button
          type="submit"
          className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-lime-400 text-[12px] font-bold text-ink-950 transition-colors hover:bg-lime-300"
        >
          Create workspace
          <ArrowRight className="size-3.5" aria-hidden />
        </button>
      </form>

      <div className="mt-4 grid grid-cols-3 gap-1.5">
        {["14-day trial", "No card", "Cancel anytime"].map((item) => (
          <span
            key={item}
            className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-2 py-1.5 text-center text-[9px] text-fog-faint"
          >
            {item}
          </span>
        ))}
      </div>
    </AuthShell>
  );
}
