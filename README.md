# WINGS MEOWWWW Dashboard

Built with TanStack Start + Vite. Ready to deploy on Vercel.

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel, click **New Project** and import the repo.
3. Keep the defaults — Vercel auto-detects Vite:
   - Build command: `vite build` (or `npm run build`)
   - Output: handled by `@tanstack/start-adapter-vercel` (already configured in `vite.config.ts`)
   - Install command: `npm install` (or `bun install`)
4. Click **Deploy**. No env vars are required.

That's it — the included `vercel.json` and adapter handle SSR routing automatically.

## Local dev

```bash
npm install
npm run dev
```