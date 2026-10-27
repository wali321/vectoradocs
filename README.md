# Vectora

Research documentation for machine learning and language models. The site
publishes project context, model records, version-specific documentation, and
interactive architecture diagrams without inventing research facts.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Run `npm run lint`,
`npx tsc --noEmit`, and `npm run build` to validate changes.

## Site structure

- `/` is the project-wide overview.
- `/models` is the model directory.
- `/models/<model-slug>` is a model overview.
- `/models/<model-slug>/<version>` is an independently maintained version record.
- `/contact` links to the supplied project contact, `github.com/wali321`.

The global overview, model family page, and version pages are separate. The
model directory lists documented versions and links to each version page.
Vectora v1 is the only version currently published; do not copy its details or
diagrams into future version pages.

## Add model documentation

1. Add a typed entry to the `models` list in `lib/models.ts`. Set `latestVersion`
   only when the project identifies one.
2. Add `content/models/<model-slug>/index.mdx` for the model-family overview.
3. Add a `versions` entry only for each supplied version, and create its
   independent content at `content/models/<model-slug>/<version>.mdx`.
4. Add architecture or pipeline data to that version's `diagrams` array. Use
   the real component names, tensor dimensions, data types, and section links;
   omit unknown details so the interface marks them as not documented. Mermaid
   fenced blocks are rendered as version-scoped diagrams within MDX.
5. Add citations and evaluation values only when the source material is
   available. Older version content stays in place when a newer version is
   published.

Keep version-specific assets under `public/models/<model-slug>/<version>/` and
reference them from the corresponding version page using root-relative URLs
(for example, `/models/vectora/v1/figure.png`). This keeps asset URLs stable
when the page is deployed at a nested route.

MDX content is processed through Fumadocs MDX. Tables, GFM, syntax highlighting,
math, and callouts are supported. The project overview content lives in
`content/project/index.mdx`.

## Configuration

Set `SITE_URL` to the canonical deployment origin before publishing. Without
it, the sitemap omits absolute URLs and canonical metadata is not generated.
The contact link and author attribution are configured in `lib/project.ts`.

No database, backend, or contact form is configured.
