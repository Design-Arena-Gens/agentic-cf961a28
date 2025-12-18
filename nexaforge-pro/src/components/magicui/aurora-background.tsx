"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps {
  className?: string;
}

const blobs = [
  {
    initial: { x: -40, y: 0 },
    animate: { x: 60, y: -20 },
    color: "from-cyan-500/40 via-blue-500/20 to-transparent",
  },
  {
    initial: { x: 40, y: -20 },
    animate: { x: -40, y: 20 },
    color: "from-purple-500/40 via-fuchsia-500/20 to-transparent",
  },
  {
    initial: { x: 0, y: 20 },
    animate: { x: 20, y: -40 },
    color: "from-emerald-500/30 via-cyan-500/10 to-transparent",
  },
];

export const AuroraBackground = ({ className }: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden blur-3xl",
        className,
      )}
    >
      {blobs.map((blob, index) => (
        <motion.div
          key={index}
          initial={blob.initial}
          animate={blob.animate}
          transition={{
            duration: 12 + index * 2,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className={cn(
            "absolute aspect-square w-[45%] rounded-full bg-gradient-to-br opacity-60",
            blob.color,
          )}
        />
      ))}
    </div>
  );
};
