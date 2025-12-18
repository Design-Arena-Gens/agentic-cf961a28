"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const ForgeHero = () => {
  return (
    <div className="relative overflow-hidden rounded-[32px] border border-slate-800/60 bg-slate-950/70 p-10 shadow-[0_40px_120px_-60px_rgba(56,189,248,0.45)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col gap-6"
      >
        <Badge className="w-fit bg-cyan-500/20 text-cyan-100">
          NexaForge Pro — Agentic Builder
        </Badge>
        <h1 className="text-4xl font-bold leading-tight text-slate-50 md:text-6xl">
          Launch production-ready sites
          <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            with autonomous AI specialists
          </span>
        </h1>
        <p className="max-w-2xl text-lg text-slate-300">
          Architect, copy, visuals, and integrations orchestrated in minutes.
          NexaForge Pro chains GPT-4o, DALL·E 3, Supabase, and Stripe to ship
          experiences your revenue team can deploy instantly.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button size="lg">
            Start Forging
          </Button>
          <Button variant="secondary" size="lg">
            Watch Workflow
          </Button>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="pointer-events-none absolute -right-10 bottom-0 hidden h-64 w-64 rounded-full bg-cyan-500/30 blur-3xl md:block"
      />
      <motion.div
        className="mt-10 grid gap-4 md:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {metricCards.map((metric) => (
          <motion.div
            key={metric.label}
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-5 text-slate-300"
          >
            <p className="text-sm uppercase tracking-wider text-cyan-200/70">
              {metric.label}
            </p>
            <p className="mt-2 text-3xl font-semibold text-slate-50">
              {metric.value}
            </p>
            <p className="mt-1 text-sm text-slate-400">{metric.caption}</p>
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        className="pointer-events-none absolute -bottom-8 left-0 hidden w-full justify-center md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center gap-3 rounded-full border border-slate-800/60 bg-slate-950/80 px-5 py-2 text-sm text-slate-400">
          <Sparkles className="h-4 w-4 text-cyan-300" />
          Multi-agent autonomy orchestrated by the Forge Engine
        </div>
      </motion.div>
    </div>
  );
};

const metricCards = [
  {
    label: "Agent Collaboration",
    value: "4 specialists",
    caption: "Architect · Copywriter · Visual · Integration",
  },
  {
    label: "Time to Launch",
    value: "< 6 minutes",
    caption: "From prompt to deployable Next.js experience",
  },
  {
    label: "Deploy Targets",
    value: "Vercel & Supabase",
    caption: "Out-of-the-box edge deployments and storage",
  },
];
