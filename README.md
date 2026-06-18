# llms.aoe.top

Static LLM knowledge base for the websites listed in `api.aoe.top/server/utils/friendly.ts`.

The generated site follows the AI visibility pattern from Tw93's GEO article:

- `robots.txt` separates search/retrieval crawlers from training-only crawlers.
- `llms.txt` gives a concise Markdown overview.
- `llms-full.txt` gives a compact full index; complete captured text remains in per-page Markdown and `/api/content.json`.
- `/sites/*.md` and `/pages/**/*.md` provide stable Markdown routes.
- `/api/*.json` exposes structured data for tools.
- `sitemap.xml` lists the high-quality crawl endpoints and excludes failed or empty-text page captures.

## Build

```bash
npm run build
```

Run the quality gate after generating `public/`:

```bash
npm run check
```

The check command fails on broken local artifacts and prints warnings for source-site issues that must be fixed in the upstream sites, such as empty captures or missing source `/llms.txt` endpoints.

Useful environment variables:

```bash
FRIENDLY_TS_PATH=/path/to/api.aoe.top/server/utils/friendly.ts npm run build
SITE_URL=https://llms.aoe.top MAX_PAGES_PER_SITE=1500 npm run build
FORCE_CRAWL=1 npm run build
```

## Preview

```bash
npm run dev
```

Open `http://localhost:4173`.
