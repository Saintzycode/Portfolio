# Portfolio

React 19 + TypeScript + Tailwind CSS v4 (shadcn) portfolio with a projects grid,
certification badges and a GitHub-style contribution graph.

## Commands

```bash
npm install
npm run dev        # dev server
npm run contrib    # refresh src/data/contributions.json from GitHub
npm run typecheck  # tsc -b
npm run test       # contribution parser tests
npm run smoke      # renders the app to HTML to catch runtime errors
npm run build      # typecheck + production build to dist/
```

## Content

| What | Where |
| --- | --- |
| Name, role, links | `src/data/profile.ts` |
| Projects (list + case study copy) | `src/data/projects.ts` |
| Badges / certifications | `src/data/badges.ts` + images in `public/badges/` |
| Contribution data | `src/data/contributions.json` (generated) |

## Routes

| Route | Page |
| --- | --- |
| `/` | Hero, projects, badges, contributions |
| `/projects/:slug` | Project case study (`src/views/ProjectDetail.tsx`) |
| anything else | 404 page |

Deep links need a server rewrite. On GitHub Pages the build emits a `404.html`
that bounces to the app and restores the URL — on Vercel/Netlify add a rewrite
to `index.html` instead.

## shadcn

`components.json` is the shadcn config (aliases `@/components`, `@/components/ui`,
`@/lib`, `@/lib/utils`). Theme tokens live in `src/style.css` — the site is
dark-only, so `:root` holds the violet palette and every added shadcn component
inherits it.

```bash
npx shadcn@latest add button   # or any other component
```

`src/components/ui/sonar-grid.tsx` is the interactive hero field (canvas dot
grid that answers taps with expanding rings). It reads `--primary` from the
theme, so it stays violet without hard-coding a colour.

## Contributions

`npm run contrib` writes `src/data/contributions.json`:

- With `GITHUB_TOKEN` set (see `.env.example`) it uses the GraphQL API.
- Without a token it reads the public contributions page — levels and per-day
  counts, which is all the graph needs.

The JSON is committed so the site builds even when GitHub is unreachable.

## Deploy

GitHub Pages via `.github/workflows/deploy.yml`: it refreshes the contributions
and builds on every push to `main`. Add `GITHUB_TOKEN` and `GITHUB_USERNAME` as
repository secrets and set `BASE_PATH=/<repo-name>/` in the workflow for a
project site (user/organisation sites need no base path).
