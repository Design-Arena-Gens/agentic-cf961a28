import * as React from "react";
import { cn } from "@/lib/utils";

export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "group rounded-2xl border border-slate-800/60 bg-slate-950/60 p-6 text-slate-100 shadow-xl shadow-slate-900/30 backdrop-blur-xl transition hover:border-cyan-400/40",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";

export const CardGlow = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "pointer-events-none absolute inset-0 rounded-2xl border border-cyan-400/0 opacity-0 blur-lg transition-all duration-300 group-hover:opacity-100 group-hover:border-cyan-400/40",
      className,
    )}
    {...props}
  />
);
