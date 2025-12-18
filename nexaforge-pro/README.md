# NexaForge Pro

NexaForge Pro is a production-ready, agentic AI website builder. Multi-specialist agents collaborate to generate sitemaps, copy, visuals, and integrations that can be deployed to Vercel in minutes.

## Stack
- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4, Shadcn-inspired UI primitives, MagicUI motion effects
- **Animations:** Framer Motion
- **Backend Services:** Supabase (Auth, Postgres, Storage)
- **AI Providers:** OpenAI GPT-4o (content + logic), DALL·E 3 (visuals)
- **Payments:** Stripe (Checkout + Subscriptions)

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env.local` and configure your credentials:
   ```bash
   cp .env.example .env.local
   ```
3. Run the dev server:
   ```bash
   npm run dev
   ```
4. Visit `http://localhost:3000` and submit a brief to see the agents in action.

## Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` – Supabase project keys
- `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_JWT_SECRET` – optional server-side operations
- `OPENAI_API_KEY` – GPT-4o & DALL·E calls
- `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` – billing automation
- `STRIPE_WEBHOOK_SECRET` – Stripe webhook verification
- `NEXT_PUBLIC_APP_URL` – base URL for integration webhooks
- `FORGE_DEFAULT_EMAIL`, `FORGE_DEFAULT_PLAN_ID` – automation defaults

## Supabase Schema (Suggested)
Create a `forge_runs` table to archive agent artifacts:
```sql
create table if not exists forge_runs (
  id uuid primary key default gen_random_uuid(),
  payload jsonb not null,
  result jsonb not null,
  created_by uuid references auth.users(id),
  created_at timestamp with time zone default timezone('utc', now())
);
```

## Deployment
```bash
npm run build
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-cf961a28
```
After deploying, verify with:
```bash
curl https://agentic-cf961a28.vercel.app
```

## License
MIT
