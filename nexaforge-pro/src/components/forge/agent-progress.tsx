"use client";

import { Check, Loader2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { AgentTask, AgentKey } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface AgentProgressProps {
  tasks: AgentTask[];
  activeTask?: AgentKey | null;
}

export const AgentProgress = ({ tasks, activeTask }: AgentProgressProps) => (
  <div className="grid gap-4 md:grid-cols-2">
    {tasks.map((task) => {
      const isActive = task.id === activeTask;
      const outputText = formatTaskOutput(task.output);
      return (
        <motion.div
          key={task.id}
          layout
          className={cn(
            "relative overflow-hidden rounded-2xl border border-slate-800/70 bg-slate-950/60 p-4 backdrop-blur-xl",
            isActive && "border-cyan-400/50",
            task.status === "success" && "border-emerald-500/40",
          )}
        >
          <AnimatePresence>
            {isActive && (
              <motion.div
                className="absolute -top-8 right-0 h-16 w-16 rounded-full bg-cyan-500/30 blur-3xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              />
            )}
          </AnimatePresence>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-wide text-slate-400">
                {task.title}
              </p>
              <h4 className="text-lg font-semibold text-slate-100">
                {task.description}
              </h4>
            </div>
            <StatusPill status={task.status} />
          </div>
          {outputText && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-sm text-slate-300"
            >
              <pre className="max-h-48 overflow-y-auto whitespace-pre-wrap rounded-xl border border-slate-800/80 bg-slate-900/50 p-3 text-xs text-slate-200">
                {outputText}
              </pre>
            </motion.div>
          )}
          {task.error && (
            <p className="mt-3 text-sm text-rose-300">{task.error}</p>
          )}
        </motion.div>
      );
    })}
  </div>
);

const StatusPill = ({
  status,
}: {
  status: AgentTask["status"];
}) => {
  switch (status) {
    case "running":
      return (
        <div className="flex items-center gap-2 rounded-full border border-cyan-400/50 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-200">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          <span>Forging</span>
        </div>
      );
    case "success":
      return (
        <div className="flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
          <Check className="h-3.5 w-3.5" />
          <span>Complete</span>
        </div>
      );
    case "error":
      return (
        <div className="flex items-center gap-2 rounded-full border border-rose-500/60 bg-rose-500/10 px-3 py-1 text-xs font-medium text-rose-200">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Retry</span>
        </div>
      );
    default:
      return (
        <div className="rounded-full border border-slate-800/60 px-3 py-1 text-xs font-medium text-slate-500">
          Pending
        </div>
      );
  }
};

const formatTaskOutput = (output: AgentTask["output"]) => {
  if (output === null || output === undefined) return "";

  if (typeof output === "string") {
    return output;
  }

  if (typeof output === "object") {
    try {
      return JSON.stringify(output, null, 2);
    } catch (error) {
      console.warn("Unable to stringify agent output", error);
      return "";
    }
  }

  return String(output);
};
