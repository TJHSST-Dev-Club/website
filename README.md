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
```

### Scripts
- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run lint` - Run ESLint

## Officers section

The officers section is hidden for now. To bring it back:

1. Set `SHOW_OFFICERS = true` in `src/App.tsx`.
2. Fill in the `officers` array in `src/components/Officers.tsx` (name, role, photo filename).
3. Drop the photos in `public/officers/` (square images, ~400x400 work best). Everything in `public/` deploys with the site, so no separate image hosting is needed. Officers without a photo get their initials instead.

## Lectures section

The lectures section was removed from the page for now. The lecture data still lives in `lectures/`, and `scripts/fetch-lectures.mjs` is kept in case the section comes back — see git history for the old UI.
