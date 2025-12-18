"use client";

import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { motion } from "framer-motion";
import {
  INDUSTRY_OPTIONS,
  THEME_OPTIONS,
  type ForgeRequestPayload,
} from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ForgeFormProps {
  onSubmit: (payload: ForgeRequestPayload) => Promise<void>;
  loading: boolean;
}

type FormValues = ForgeRequestPayload;

const toneOptions: FormValues["tone"][] = [
  "Professional",
  "Conversational",
  "Playful",
  "Technical",
];

export const ForgeForm = ({ onSubmit, loading }: ForgeFormProps) => {
  const [customKeyword, setCustomKeyword] = useState("");
  const [customNeed, setCustomNeed] = useState("");

  const form = useForm<FormValues>({
    defaultValues: {
      projectName: "Lumen Analytics",
      industry: "SaaS",
      theme: "Futuristic",
      tone: "Professional",
      targetAudience: "Growth-stage revenue teams",
      primaryGoal: "Convert demo requests",
      keywords: ["AI analytics", "predictive insights"],
      brandVoice: "Bold, data-driven, visionary storytelling",
      needs: ["Dynamic dashboard", "Lead capture"],
      integrations: {
        stripe: true,
        calendar: true,
        contactForm: true,
      },
    },
  });

  const keywords =
    useWatch({ control: form.control, name: "keywords" }) ?? ([] as string[]);
  const needs =
    useWatch({ control: form.control, name: "needs" }) ?? ([] as string[]);
  const stripeEnabled =
    useWatch({ control: form.control, name: "integrations.stripe" }) ?? false;
  const calendarEnabled =
    useWatch({ control: form.control, name: "integrations.calendar" }) ?? false;
  const contactEnabled =
    useWatch({ control: form.control, name: "integrations.contactForm" }) ?? true;

  const submitForm = form.handleSubmit(async (values) => {
    await onSubmit({
      ...values,
      keywords: [...new Set(values.keywords)],
      needs: [...new Set(values.needs)],
    });
  });

  const addKeyword = () => {
    if (!customKeyword.trim()) return;
    const next = Array.from(new Set([...keywords, customKeyword.trim()]));
    form.setValue("keywords", next, { shouldDirty: true, shouldValidate: true });
    setCustomKeyword("");
  };

  const addNeed = () => {
    if (!customNeed.trim()) return;
    const next = Array.from(new Set([...needs, customNeed.trim()]));
    form.setValue("needs", next, { shouldDirty: true, shouldValidate: true });
    setCustomNeed("");
  };

  const removeKeyword = (keyword: string) => {
    form.setValue(
      "keywords",
      keywords.filter((item) => item !== keyword),
      { shouldDirty: true },
    );
  };

  const removeNeed = (need: string) => {
    form.setValue(
      "needs",
      needs.filter((item) => item !== need),
      { shouldDirty: true },
    );
  };

  return (
    <motion.form
      onSubmit={submitForm}
      className="relative grid gap-6 rounded-3xl border border-slate-800/60 bg-slate-950/70 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70">
          Forge Brief
        </p>
        <h3 className="mt-2 text-3xl font-semibold text-slate-50">
          Describe the experience you want to launch
        </h3>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Project Name">
          <Controller
            name="projectName"
            control={form.control}
            render={({ field }) => <Input {...field} />}
          />
        </Field>
        <Field label="Primary Goal">
          <Controller
            name="primaryGoal"
            control={form.control}
            render={({ field }) => <Input {...field} />}
          />
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Controller
          name="industry"
          control={form.control}
          render={({ field }) => (
            <SelectGroup
              label="Industry"
              options={INDUSTRY_OPTIONS}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name="theme"
          control={form.control}
          render={({ field }) => (
            <SelectGroup
              label="Theme"
              options={THEME_OPTIONS}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name="tone"
          control={form.control}
          render={({ field }) => (
            <SelectGroup
              label="Tone"
              options={toneOptions}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Target Audience">
          <Controller
            name="targetAudience"
            control={form.control}
            render={({ field }) => <Input {...field} />}
          />
        </Field>
        <Field label="Brand Voice">
          <Controller
            name="brandVoice"
            control={form.control}
            render={({ field }) => <Textarea {...field} rows={4} />}
          />
        </Field>
      </div>

      <div className="grid gap-3">
        <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Strategic Keywords
        </label>
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword) => (
            <button
              key={keyword}
              type="button"
              onClick={() => removeKeyword(keyword)}
              className="group relative"
            >
              <Badge variant="outline" className="group-hover:bg-rose-500/20 group-hover:text-rose-100">
                {keyword}
              </Badge>
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <Input
            placeholder="Add keyword"
            value={customKeyword}
            onChange={(event) => setCustomKeyword(event.target.value)}
          />
          <Button type="button" variant="secondary" onClick={addKeyword}>
            Add
          </Button>
        </div>
      </div>

      <div className="grid gap-3">
        <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Experience Requirements
        </label>
        <div className="flex flex-wrap gap-2">
          {needs.map((need) => (
            <button
              key={need}
              type="button"
              onClick={() => removeNeed(need)}
              className="group"
            >
              <Badge variant="outline" className="group-hover:bg-rose-500/20 group-hover:text-rose-100">
                {need}
              </Badge>
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <Input
            placeholder="Add requirement"
            value={customNeed}
            onChange={(event) => setCustomNeed(event.target.value)}
          />
          <Button type="button" variant="secondary" onClick={addNeed}>
            Add
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Controller
          name="integrations.stripe"
          control={form.control}
          render={({ field }) => (
            <ToggleChip
              label="Stripe Checkout"
              description="Auto-create products and prices"
              active={field.value}
              onToggle={() => field.onChange(!field.value)}
            />
          )}
        />
        <Controller
          name="integrations.calendar"
          control={form.control}
          render={({ field }) => (
            <ToggleChip
              label="Booking Calendar"
              description="Embed Cal or Calendly scheduling"
              active={field.value}
              onToggle={() => field.onChange(!field.value)}
            />
          )}
        />
        <Controller
          name="integrations.contactForm"
          control={form.control}
          render={({ field }) => (
            <ToggleChip
              label="Contact Form"
              description="Supabase storage + webhook wiring"
              active={field.value}
              onToggle={() => field.onChange(!field.value)}
            />
          )}
        />
      </div>

      <Button type="submit" size="lg" disabled={loading}>
        {loading ? "Forging Experience..." : "Forge Nexa Site"}
      </Button>

      <p className="text-xs text-slate-500">
        Stripe: {stripeEnabled ? "enabled" : "disabled"} · Calendar: {" "}
        {calendarEnabled ? "enabled" : "disabled"} · Contact Form: {" "}
        {contactEnabled ? "enabled" : "disabled"}
      </p>
    </motion.form>
  );
};

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="grid gap-3">
    <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
      {label}
    </label>
    {children}
  </div>
);

const SelectGroup = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}) => (
  <div className="grid gap-3">
    <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
      {label}
    </label>
    <div className="grid grid-cols-2 gap-2">
      {options.slice(0, 4).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={cn(
            "rounded-xl border border-slate-800/60 bg-slate-900/60 px-3 py-2 text-xs font-medium text-left text-slate-300 transition hover:border-cyan-400/50 hover:text-cyan-100",
            value === option &&
              "border-cyan-400/60 bg-cyan-500/10 text-cyan-100 shadow-lg",
          )}
        >
          {option}
        </button>
      ))}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="col-span-2 h-11 rounded-xl border border-slate-800/60 bg-slate-900/50 px-3 text-sm text-slate-100"
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-slate-950">
            {option}
          </option>
        ))}
      </select>
    </div>
  </div>
);

const ToggleChip = ({
  label,
  description,
  active,
  onToggle,
}: {
  label: string;
  description: string;
  active: boolean;
  onToggle: () => void;
}) => (
  <button
    type="button"
    onClick={onToggle}
    className={cn(
      "flex h-full flex-col justify-between rounded-2xl border border-slate-800/70 bg-slate-950/50 p-4 text-left transition hover:border-cyan-400/50",
      active && "border-emerald-400/50 bg-emerald-500/10",
    )}
  >
    <div>
      <p className="text-sm font-semibold text-slate-100">{label}</p>
      <p className="mt-1 text-xs text-slate-400">{description}</p>
    </div>
    <span
      className={cn(
        "mt-4 inline-flex w-fit rounded-full border px-3 py-1 text-xs font-medium",
        active
          ? "border-emerald-400/60 bg-emerald-500/20 text-emerald-200"
          : "border-slate-700/80 text-slate-400",
      )}
    >
      {active ? "Enabled" : "Disabled"}
    </span>
  </button>
);
