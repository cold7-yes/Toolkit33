# Cold Three Three — Automation Studio Site

Marketing site for an n8n / automation freelance practice serving CPG founders and small operations teams. Built with Next.js 16, Tailwind v4, and Sanity (CMS).

## Stack

- **Next.js 16** — App Router, Server Components, ISR with tag revalidation
- **Tailwind CSS v4** — design tokens via `@theme`
- **Sanity CMS v5** — content managed at `/studio` (embedded)
- **Vercel** — deployment + env vars

## Local development

```bash
npm install
cp .env.example .env.local   # then fill in real values
npm run dev
```

Then open http://localhost:3000. The CMS lives at http://localhost:3000/studio.

## How content updates flow

1. Edit a project in Sanity Studio (`/studio`)
2. Sanity calls `POST /api/revalidate?secret=…` (configured as a webhook)
3. The route handler calls `revalidateTag("projects", { expire: 0 })`
4. The next visit to the homepage rebuilds the showcase from fresh data

No full Vercel redeploy is required for content changes.

## First-time setup

See [`SETUP.md`](./SETUP.md) for the step-by-step walkthrough (creating a Sanity account, setting Vercel env vars, configuring the webhook).
