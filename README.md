# Portfolio

Vue 3 + TypeScript + Tailwind CSS portfolio with a projects grid, certification
badges and a GitHub-style contribution graph.

## Commands

```bash
npm install
npm run dev        # dev server
npm run contrib    # refresh src/data/contributions.json from GitHub
npm run typecheck  # vue-tsc
npm run test       # contribution parser tests
npm run smoke      # renders the app to HTML to catch runtime errors
npm run build      # typecheck + production build to dist/
```

## Content

| What | Where |
| --- | --- |
| Name, role, links | `src/data/profile.ts` |
| Projects | `src/data/projects.ts` |
| Badges / certifications | `src/data/badges.ts` + images in `public/badges/` |
| Contribution data | `src/data/contributions.json` (generated) |

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
