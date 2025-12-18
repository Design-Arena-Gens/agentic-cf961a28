"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardGlow } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ForgeResponse } from "@/lib/utils";

interface ForgeOutputProps {
  result?: ForgeResponse | null;
}

export const ForgeOutput = ({ result }: ForgeOutputProps) => {
  if (!result) {
    return (
      <Card className="relative overflow-hidden">
        <CardGlow />
        <div className="relative grid gap-6">
          <Badge variant="outline" className="w-fit">
            Live Preview
          </Badge>
          <h3 className="text-2xl font-semibold text-slate-50">
            The Forge output renders here once your agents finish their pass.
          </h3>
          <p className="max-w-2xl text-slate-400">
            Expect a conversion-primed hero, content sections, structured data,
            and integration-ready wiring. Hit Forge to see the pipeline in
            action.
          </p>
          <div className="grid gap-3 text-sm text-slate-500">
            <p>• Architect → Sitemap + Section definition</p>
            <p>• Copywriter → SEO copy, meta, JSON-LD</p>
            <p>• Visual → Palette, hero prompt, image</p>
            <p>• Integration → Stripe, booking, contact flows</p>
          </div>
        </div>
      </Card>
    );
  }

  const { architect, copywriter, visual, integration } = result;

  return (
    <div className="grid gap-6">
      <SectionBlock title="Blueprint" description="Architect Agent output">
        <div className="flex flex-wrap gap-2">
          {architect.sitemap.map((item) => (
            <Badge key={item} variant="outline">
              {item}
            </Badge>
          ))}
        </div>
        <div className="mt-4 grid gap-3">
          {architect.sections.map((section) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-slate-800/60 bg-slate-950/50 p-4"
            >
              <p className="text-sm font-semibold text-slate-100">
                {section.title}
              </p>
              <p className="text-sm text-slate-400">{section.description}</p>
            </motion.div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock title="Narrative" description="Copywriter Agent">
        <div className="rounded-3xl border border-slate-800/70 bg-slate-950/40 p-6">
          <h2 className="text-4xl font-semibold text-slate-50">
            {copywriter.hero.headline}
          </h2>
          <p className="mt-3 text-lg text-slate-300">
            {copywriter.hero.subheading}
          </p>
          <Badge className="mt-6 w-fit bg-cyan-500/20 text-cyan-100">
            {copywriter.hero.cta}
          </Badge>
        </div>
        <div className="mt-6 grid gap-3">
          {copywriter.sections.map((section) => (
            <div
              key={section.id}
              className="rounded-2xl border border-slate-800/60 bg-slate-950/50 p-4"
            >
              <p className="text-lg font-semibold text-slate-100">
                {section.title}
              </p>
              <p className="text-sm text-slate-400">{section.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-3 rounded-2xl border border-slate-800/60 bg-slate-950/40 p-4 text-sm text-slate-400">
          <p>
            <span className="font-semibold text-slate-200">Meta Title:</span>{" "}
            {copywriter.meta.title}
          </p>
          <p>
            <span className="font-semibold text-slate-200">Meta Description:</span>{" "}
            {copywriter.meta.description}
          </p>
          <p>
            <span className="font-semibold text-slate-200">Keywords:</span>{" "}
            {copywriter.meta.keywords.join(", ")}
          </p>
        </div>
      </SectionBlock>

      <SectionBlock title="Visual System" description="Visual Agent">
        {visual.heroImageUrl && (
          <div className="relative overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-900">
            <Image
              src={visual.heroImageUrl}
              alt="Generated hero"
              width={1400}
              height={960}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div className="grid gap-4 md:grid-cols-5">
          {Object.entries(visual.palette).map(([key, value]) => (
            <div
              key={key}
              className="rounded-2xl border border-slate-800/40 bg-slate-950/70 p-4 text-center"
            >
              <div
                className="mx-auto h-12 w-12 rounded-full border border-slate-800/60 shadow-lg"
                style={{ backgroundColor: value }}
              />
              <p className="mt-3 text-xs uppercase tracking-wide text-slate-400">
                {key}
              </p>
              <p className="text-xs text-slate-300">{value}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-slate-300">{visual.designNotes}</p>
      </SectionBlock>

      <SectionBlock title="Integrations" description="Integration Agent">
        <div className="grid gap-4 md:grid-cols-3">
          <IntegrationCard label="Stripe Product" value={integration.stripeProductId ?? "—"} />
          <IntegrationCard label="Stripe Price" value={integration.stripePriceId ?? "—"} />
          <IntegrationCard
            label="Booking URL"
            value={integration.booking?.url ?? "—"}
          />
        </div>
        <div className="mt-4 rounded-2xl border border-slate-800/60 bg-slate-950/40 p-4">
          <p className="text-sm font-semibold text-slate-100">Contact Form</p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-400">
            {integration.contactForm.fields.map((field) => (
              <Badge key={field.label} variant="outline">
                {field.label} {field.required ? "*" : ""}
              </Badge>
            ))}
          </div>
        </div>
      </SectionBlock>
    </div>
  );
};

const SectionBlock = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <section className="relative overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-950/60 p-6 backdrop-blur-xl">
    <CardGlow />
    <div className="relative">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h4 className="text-xl font-semibold text-slate-50">{title}</h4>
          <p className="text-sm text-slate-400">{description}</p>
        </div>
        <Badge variant="outline">Agent Output</Badge>
      </div>
      <div className="mt-5 grid gap-4">{children}</div>
    </div>
  </section>
);

const IntegrationCard = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div className="rounded-2xl border border-slate-800/60 bg-slate-950/50 p-4 text-sm text-slate-300">
    <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
    <p className="mt-2 break-all text-slate-100">{value}</p>
  </div>
);
