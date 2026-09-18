# personal-site

Personal site for [miketrounce.com](https://miketrounce.com). Built with
[Astro](https://astro.build) — static output, no server runtime.

## Why it's organized this way

This structure follows Astro's conventions rather than a layout chosen from
scratch, so a few terms are worth explaining:

- **File-based routing** — a file's path under `src/pages/` becomes its URL
  automatically. `src/pages/about.astro` becomes `/about/`. There's no
  separate routing config to maintain.
- **Scoped styles** — CSS written inside a `.astro` file only applies to that
  file's markup, not the whole site. Anything meant to be shared (colors,
  type, base elements) lives in `src/styles/global.css`; shared per-template
  rules live in `src/styles/page-layouts.css` and `src/styles/story.css`.
- **`src/assets/`** — local images imported into pages and run through
  Astro's built-in image pipeline (resizing, format conversion, compression)
  at build time.
- **`public/`** — files here are copied to the build output untouched (no
  processing), unlike everything in `src/`, which Astro builds and optimizes.

In short: content and structure live in `src/`, get built by Astro, and land
in `dist/`. Anything that should skip that pipeline goes in `public/`.

## Structure

| Path | Purpose |
|------|---------|
| `src/pages/` | File-based routes: `/`, `/about`, `/how-i-work`, `/stories`, `/story-1`, `/story-2`, `/promoting-your-business`, `/website-options`, and the 404 fallback. |
| `src/layouts/Layout.astro` | Shared HTML shell — head, meta tags, fonts. |
| `src/assets/` | Local images, imported into pages via `astro:assets`. |
| `src/styles/global.css` | Shared tokens — palette, type, base elements. |
| `src/styles/page-layouts.css` | Shared shell for the simple content pages (`.options-page`, `.back-link`, `.content-section`, the "project list" pattern). |
| `src/styles/story.css` | Shared shell for the two story pages. |
| `public/favicon.svg`, `public/robots.txt` | Static assets copied as-is to the build output. |

## Type checking

```bash
npm run check
```

Runs `astro check` — type-checks `.astro` files and their frontmatter.

## Run locally

```bash
npm install
npm run dev
```

Then open [http://localhost:4321](http://localhost:4321).

## Build

```bash
npm run build
```

Outputs static files to `dist/`.

## Deploy

Cloudflare Pages, git-connected to this repo (project: `miketrounce-site`).
Merging to `main` triggers a build using `npm run build`, output directory `dist`.
