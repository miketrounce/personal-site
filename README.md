# personal-site

Personal site for [miketrounce.com](https://miketrounce.com). A single page — plain HTML and CSS, no framework, no build step.

## Files

| File | Purpose |
|------|---------|
| `index.html` | The site. Career timeline, self-contained styles. |
| `styles.css` | Shared tokens — palette, type, base elements. |
| `404.html` | Fallback for any unmatched path. |

## Run locally

```bash
python3 -m http.server 4173
```

Then open [http://localhost:4173](http://localhost:4173).

## Deploy

GitHub Pages serves `main`. Push to `main` and the site rebuilds.
