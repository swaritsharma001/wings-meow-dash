# WINGS MEOWWWW Dashboard

Built with TanStack Start + Vite, targeting Cloudflare Workers.

## Easiest deploy: Lovable

Click **Publish** in the Lovable editor. Your app goes live at
`https://<your-project>.lovable.app` with zero config.

## Deploy to Cloudflare Workers

```bash
npm install
npm run build
npx wrangler deploy
```

Config lives in `wrangler.jsonc`.

## Note on Vercel

This template is wired for Cloudflare Workers (see `src/server.ts` and
`wrangler.jsonc`). Deploying to Vercel would require swapping in the TanStack
Start Vercel adapter, which isn't currently available — use Lovable Publish
or Cloudflare instead.

## Local dev

```bash
npm install
npm run dev
```