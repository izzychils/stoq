import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { Logo } from "@/components/brand/logo";

export default function NotFound() {
  return (
    <div className="ambient flex min-h-dvh flex-col">
      <header className="mx-auto flex h-20 w-full max-w-[1200px] items-center px-5 sm:px-8">
        <Link href="/" aria-label="Stoq home">
          <Logo />
        </Link>
      </header>

      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center px-5 pb-24 text-center">
        <span className="flex size-14 items-center justify-center rounded-2xl border border-azure-500/25 bg-azure-500/10 text-azure-300">
          <Compass className="size-6" aria-hidden />
        </span>
        <p className="mono-label mt-6 !text-azure-300/80">404 · lost in transit</p>
        <h1 className="mt-4 text-[clamp(2rem,6vw,3rem)] font-semibold leading-[1.02] tracking-[-0.05em] text-bone">
          That aisle does not exist.
        </h1>
        <p className="mt-4 max-w-sm text-[13.5px] leading-relaxed text-fog">
          The page you asked for is not in this warehouse. Head back to the stock overview
          or open the demo workspace.
        </p>
        <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-azure-500 px-5 text-[13px] font-bold text-white transition-colors hover:bg-azure-400"
          >
            <ArrowLeft className="size-3.5" aria-hidden />
            Back to the site
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-5 text-[13px] font-semibold text-bone transition-colors hover:bg-white/[0.07]"
          >
            Open workspace
          </Link>
        </div>
      </main>
    </div>
  );
}
