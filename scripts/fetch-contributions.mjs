// Refreshes src/data/contributions.json from GitHub.
//
// GraphQL API when GITHUB_TOKEN is set (exact counts, includes private repos),
// otherwise the public contributions page (levels + counts, no token needed).
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const out = resolve(root, 'src/data/contributions.json')
const login = process.env.GITHUB_USERNAME || 'Saintzycode'

const GRAPHQL = `query ($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          firstDay
          contributionDays { date contributionCount level }
        }
      }
    }
  }
}`

export function parseContributionsPage(html) {
  const counts = new Map()
  for (const [, id, text] of html.matchAll(/<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
    counts.set(id, parseInt(text, 10) || 0)
  }

  const byWeek = new Map()
  for (const [tag] of html.matchAll(/<td\b[^>]*class="[^"]*ContributionCalendar-day[^"]*"[^>]*>/g)) {
    const date = /data-date="([^"]+)"/.exec(tag)?.[1]
    const level = /data-level="(\d)"/.exec(tag)?.[1]
    const id = /id="([^"]+)"/.exec(tag)?.[1]
    if (!date || !level) continue
    // GitHub weeks start on Sunday.
    const start = new Date(`${date}T00:00:00Z`)
    start.setUTCDate(start.getUTCDate() - start.getUTCDay())
    const key = start.toISOString().slice(0, 10)
    if (!byWeek.has(key)) byWeek.set(key, [])
    byWeek.get(key).push({ date, count: counts.get(id) ?? 0, level: Number(level) })
  }

  const weeks = [...byWeek.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([firstDay, days]) => ({ firstDay, days: days.sort((a, b) => a.date.localeCompare(b.date)) }))

  return {
    source: 'page',
    totalContributions: weeks.flatMap((w) => w.days).reduce((sum, d) => sum + d.count, 0),
    weeks,
  }
}

async function viaGraphql() {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ query: GRAPHQL, variables: { login } }),
  })
  if (!res.ok) throw new Error(`GraphQL returned ${res.status}`)
  const json = await res.json()
  if (json.errors) throw new Error(json.errors.map((e) => e.message).join('; '))
  const cal = json.data.user.contributionsCollection.contributionCalendar
  return {
    source: 'graphql',
    totalContributions: cal.totalContributions,
    weeks: cal.weeks.map((w) => ({
      firstDay: w.firstDay,
      days: w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount, level: d.level })),
    })),
  }
}

async function viaPage() {
  const res = await fetch(`https://github.com/users/${login}/contributions`, {
    headers: { 'user-agent': 'Mozilla/5.0' },
  })
  if (!res.ok) throw new Error(`GitHub returned ${res.status}`)
  return parseContributionsPage(await res.text())
}

export function assertUsable({ weeks }) {
  if (weeks.length < 50 || !weeks.some((week) => week.days.length > 0)) {
    throw new Error(`unusable contribution data (${weeks.length} weeks)`)
  }
}

async function main() {
  let data
  try {
    data = process.env.GITHUB_TOKEN
      ? await viaGraphql().catch((err) => {
          console.warn(`GraphQL failed (${err.message}); falling back to the public page.`)
          return viaPage()
        })
      : await viaPage()
    assertUsable(data)
  } catch (err) {
    console.warn(`Contribution refresh failed (${err.message}); keeping the committed JSON.`)
    return
  }

  const payload = { login, generatedAt: new Date().toISOString(), ...data }
  await mkdir(dirname(out), { recursive: true })
  await writeFile(out, JSON.stringify(payload, null, 2) + '\n')
  console.log(
    `Wrote ${payload.weeks.length} weeks (${payload.totalContributions} contributions) from ${payload.source} to src/data/contributions.json`,
  )
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) await main()
