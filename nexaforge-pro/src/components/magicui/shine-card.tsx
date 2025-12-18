"use client";

import * as React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

type ShineCardProps = React.HTMLAttributes<HTMLDivElement>;

export const ShineCard = React.forwardRef<HTMLDivElement, ShineCardProps>(
  ({ className, children, ...props }, ref) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
      const bounds = event.currentTarget.getBoundingClientRect();
      mouseX.set(event.clientX - bounds.left);
      mouseY.set(event.clientY - bounds.top);
    };

    const maskImage = useMotionTemplate`
      radial-gradient(160px at ${mouseX}px ${mouseY}px,
      rgba(255,255,255,0.4), transparent)
    `;

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-3xl border border-slate-800/50 bg-slate-950/60 p-6 shadow-2xl shadow-slate-950/50 backdrop-blur-2xl transition",
          className,
        )}
        onMouseMove={handleMouseMove}
        {...props}
      >
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{ maskImage, WebkitMaskImage: maskImage }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-transparent to-transparent" />
        </motion.div>
        {children}
      </div>
    );
  },
);
ShineCard.displayName = "ShineCard";
