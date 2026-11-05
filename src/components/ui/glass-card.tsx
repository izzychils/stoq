import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function GlassCard({
  children,
  className,
  intensity = "default",
  hairline = false,
  glow = false,
}: {
  children: ReactNode;
  className?: string;
  intensity?: "default" | "strong" | "quiet";
  hairline?: boolean;
  glow?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative rounded-2xl",
        intensity === "strong" && "glass-strong",
        intensity === "default" && "glass",
        intensity === "quiet" && "glass-quiet",
        hairline && "edge-light",
        glow && "overflow-hidden",
        className,
      )}
    >
      {glow ? (
        <span
          aria-hidden
          className="pointer-events-none absolute -left-16 -top-20 size-56 rounded-full bg-azure-500/15 blur-3xl"
        />
      ) : null}
      {children}
    </div>
  );
}
