import { ForgeHero } from "@/components/forge/forge-hero";
import { ForgeWorkspace } from "@/components/forge/forge-workspace";
import { AuroraBackground } from "@/components/magicui/aurora-background";
import { GridPattern } from "@/components/magicui/grid-pattern";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0">
        <GridPattern className="opacity-20" />
        <AuroraBackground />
      </div>
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-16 px-6 py-16 md:px-12">
        <header className="pt-4">
          <ForgeHero />
        </header>
        <section>
          <ForgeWorkspace />
        </section>
        <footer className="pb-12 text-center text-xs text-slate-500">
          Powered by GPT-4o, DALL·E 3, Supabase, and Stripe — orchestrated by NexaForge Pro.
        </footer>
      </div>
    </main>
  );
}
