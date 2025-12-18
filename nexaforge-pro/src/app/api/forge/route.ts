import { NextResponse } from "next/server";
import { z } from "zod";
import { runForgePipeline } from "@/lib/agents";
import type { ForgeRequestPayload } from "@/lib/utils";

const payloadSchema = z.object({
  projectName: z.string().min(2),
  industry: z.string(),
  theme: z.string(),
  tone: z.enum(["Professional", "Conversational", "Playful", "Technical"]),
  targetAudience: z.string(),
  primaryGoal: z.string(),
  keywords: z.array(z.string()).default([]),
  brandVoice: z.string(),
  needs: z.array(z.string()).default([]),
  integrations: z.object({
    stripe: z.boolean().default(false),
    calendar: z.boolean().default(false),
    contactForm: z.boolean().default(true),
  }),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const payload = payloadSchema.parse(json) as ForgeRequestPayload;

    const result = await runForgePipeline(payload);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Forge pipeline failed", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unexpected error encountered",
      },
      { status: 400 },
    );
  }
}
