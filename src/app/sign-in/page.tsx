import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to the Stoq demo workspace.",
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  return (
    <AuthShell
      title="Welcome back to the stock floor."
      subtitle="Sign in to see stock across every location, the forecast board and the reorder queue."
      footer={
        <p className="text-[11.5px] text-fog-dim">
          New to Stoq?{" "}
          <Link href="/sign-up" className="font-semibold text-azure-300 hover:text-azure-200">
            Create an account
          </Link>
        </p>
      }
    >
      <form className="space-y-3.5" action="/dashboard">
        <label className="block">
          <span className="text-[9.5px] font-semibold uppercase tracking-[0.1em] text-fog-faint">
            Work email
          </span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            defaultValue="ops@maramart.example"
            className="mt-1.5 min-h-10 w-full rounded-lg border border-white/[0.09] bg-black/25 px-3 text-[12px] text-bone focus:border-azure-500/50 focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="flex items-center justify-between text-[9.5px] font-semibold uppercase tracking-[0.1em] text-fog-faint">
            Password
            <span className="normal-case tracking-normal text-azure-300/80">Forgot?</span>
          </span>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            defaultValue="demo-workspace"
            className="mt-1.5 min-h-10 w-full rounded-lg border border-white/[0.09] bg-black/25 px-3 text-[12px] text-bone focus:border-azure-500/50 focus:outline-none"
          />
        </label>

        <div className="flex items-center justify-between text-[10.5px]">
          <label className="flex items-center gap-2 text-fog-dim">
            <input
              type="checkbox"
              defaultChecked
              className="size-3.5 rounded border-white/20 bg-black/30 accent-azure-500"
            />
            Keep me signed in
          </label>
          <span className="text-fog-faint">Demo credentials pre-filled</span>
        </div>

        <button
          type="submit"
          className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-azure-500 text-[12px] font-bold text-white transition-colors hover:bg-azure-400"
        >
          Sign in to workspace
          <ArrowRight className="size-3.5" aria-hidden />
        </button>
      </form>

      <div className="mt-4 flex items-center gap-3">
        <span className="h-px flex-1 bg-white/[0.07]" />
        <span className="text-[9px] uppercase tracking-[0.12em] text-fog-faint">or</span>
        <span className="h-px flex-1 bg-white/[0.07]" />
      </div>

      <Link
        href="/dashboard"
        className="mt-4 inline-flex min-h-10 w-full items-center justify-center rounded-lg border border-white/12 bg-white/[0.04] text-[12px] font-semibold text-bone transition-colors hover:bg-white/[0.07]"
      >
        Open the demo without signing in
      </Link>
    </AuthShell>
  );
}
