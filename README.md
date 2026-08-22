# TJ Dev Club Website
https://tjdev.club

## Development

This project uses [Bun](https://bun.sh/) as the package manager.

### Setup
```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Preview through the local Cloudflare Workers runtime
bun run preview:worker

# Build and deploy to tjdev.club on Cloudflare Workers
bun run deploy
```

### Scripts
- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run preview:worker` - Preview the production build with Wrangler
- `bun run deploy` - Build and deploy the site to Cloudflare Workers
- `bun run lint` - Run ESLint

## Cloudflare deployment

The production site is deployed as a Cloudflare Worker with static assets. The
Worker configuration lives in `wrangler.jsonc` and attaches the deployment to
the `tjdev.club/*` Worker route.

Before the first deploy, authenticate Wrangler with `bunx wrangler login` and
make sure the authenticated Cloudflare account contains the active
`tjdev.club` zone. The apex DNS record is managed separately in the
`TJHSST-Dev-Club/dns` repository and must remain proxied through Cloudflare for
the Worker route to receive traffic.

## Officers section

The officers section is hidden for now. To bring it back:

1. Set `SHOW_OFFICERS = true` in `src/App.tsx`.
2. Fill in the `officers` array in `src/components/Officers.tsx` (name, role, photo filename).
3. Drop the photos in `public/officers/` (square images, ~400x400 work best). Everything in `public/` deploys with the site, so no separate image hosting is needed. Officers without a photo get their initials instead.

## Lectures section

The lectures section was removed from the page for now. The lecture data still lives in `lectures/`, and `scripts/fetch-lectures.mjs` is kept in case the section comes back — see git history for the old UI.
