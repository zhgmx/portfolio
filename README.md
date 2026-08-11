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
