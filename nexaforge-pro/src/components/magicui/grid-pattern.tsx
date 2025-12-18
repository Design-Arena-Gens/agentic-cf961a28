import { cn } from "@/lib/utils";

export const GridPattern = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "pointer-events-none absolute inset-0 bg-[image:var(--magic-grid)] bg-[size:80px_80px] opacity-40",
      className,
    )}
  />
);
