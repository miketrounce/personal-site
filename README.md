# personal-site

Personal site for [miketrounce.com](https://miketrounce.com). Built with
[Astro](https://astro.build) — static output, no server runtime.

## Structure

| Path | Purpose |
|------|---------|
| `src/pages/` | File-based routes: `/`, `/projects/`, `/contact/`, and the 404 fallback. |
| `src/layouts/Layout.astro` | Shared HTML shell — head, nav, page wrapper. |
| `src/components/` | `Nav`, `Timeline`, `ProjectCard` — reusable, scoped-style components. |
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
