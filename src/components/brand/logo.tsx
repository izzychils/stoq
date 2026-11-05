import { cn } from "@/lib/utils";

/**
 * The Stoq mark: a stacked crate drawn as four offset bars, one of them lime.
 * It reads as inventory at 16px and still holds at 40px.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-white/15 bg-[#0b1220]",
        className,
      )}
    >
      <span className="absolute inset-0 bg-[linear-gradient(145deg,rgba(91,140,255,0.35),rgba(4,6,12,0.2))]" />
      <svg viewBox="0 0 24 24" className="relative size-[19px]" fill="none" aria-hidden>
        <rect x="4" y="4" width="7" height="7" rx="1.6" fill="#5b8cff" />
        <rect x="13" y="4" width="7" height="7" rx="1.6" fill="#d3f36b" />
        <rect x="4" y="13" width="7" height="7" rx="1.6" fill="#8aabff" opacity="0.65" />
        <rect x="13" y="13" width="7" height="7" rx="1.6" fill="#5b8cff" opacity="0.45" />
      </svg>
    </span>
  );
}

export function Logo({
  className,
  showText = true,
}: {
  className?: string;
  showText?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      {showText ? (
        <span className="flex min-w-0 flex-col leading-none">
          <span className="text-[18px] font-bold tracking-[-0.04em] text-bone">
            stoq<span className="text-lime-400">.</span>
          </span>
          <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.18em] text-fog-dim">
            Inventory OS
          </span>
        </span>
      ) : null}
    </span>
  );
}
