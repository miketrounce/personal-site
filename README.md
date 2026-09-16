# personal-site

Personal site for [miketrounce.com](https://miketrounce.com). Built with
[Astro](https://astro.build) — static output, no server runtime.

## Why it's organized this way

This structure follows Astro's conventions rather than a layout chosen from
scratch, so a few terms are worth explaining:

- **File-based routing** — a file's path under `src/pages/` becomes its URL
  automatically. `src/pages/projects.astro` becomes `/projects/`. There's no
  separate routing config to maintain.
- **Components** (`src/components/`) — reusable chunks of markup + styles,
  imported into pages. `Nav` is imported wherever navigation appears, instead
  of being pasted into every page file.
- **Scoped styles** — CSS written inside a `.astro` file only applies to that
  file's markup, not the whole site. Anything meant to be shared (colors,
  type, base elements) lives in `src/styles/global.css` instead.
- **`public/`** — files here are copied to the build output untouched (no
  processing), unlike everything in `src/`, which Astro builds and optimizes.

In short: content and structure live in `src/`, get built by Astro, and land
in `dist/`. Anything that should skip that pipeline goes in `public/`.

## Structure

| Path | Purpose |
|------|---------|
| `src/pages/` | File-based routes: `/`, `/projects/`, `/technologies/`, `/modus-operandi/`, and the 404 fallback. |
| `src/layouts/Layout.astro` | Shared HTML shell — head, nav, page wrapper. |
| `src/components/` | `Nav`, `Timeline`, `LabeledList` — reusable, scoped-style components. |
| `src/data/` | Timeline and project content as typed data, mapped into components. |
| `src/styles/global.css` | Shared tokens — palette, type, base elements. |
| `public/favicon.svg` | Static asset copied as-is to the build output. |

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
