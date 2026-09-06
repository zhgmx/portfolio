My personal portfolio, built with SvelteKit. It lives at [zhgmx.com](https://zhgmx.com).

Projects and writing are markdown files in `src/content/`. A new file in `src/content/projects/` or `src/content/writing/` shows up on the site automatically.

```sh
bun install
bun run dev
```

The site is deployed as a SvelteKit application on [Cloudflare Workers](https://developers.cloudflare.com/workers/).

```sh
bunx wrangler login
bun run deploy
```

[Cuelume](https://cuelume.dev/) is used for clean interaction sounds. [Phosphor](https://phosphoricons.com/) is used for icons.

Social previews are generated from `src/lib/server/social-card.ts` using Satori and resvg. The `/og/[...path].png` route prerenders a 1200 × 630 PNG for the homepage and every project and writing entry on each build. Titles come directly from the content metadata; new entries need no separate image or configuration. Archivo is bundled locally with its OFL license, so builds do not fetch fonts. Search, OG, and Twitter metadata share `src/lib/Seo.svelte`.
