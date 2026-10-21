import assert from 'node:assert/strict'
import { test } from 'node:test'
import { assertUsable, parseContributionsPage } from './fetch-contributions.mjs'

const cell = (date, level, id) =>
  `<td tabindex="0" data-date="${date}" id="${id}" data-level="${level}" role="gridcell" class="ContributionCalendar-day">`
const tip = (id, text) => `<tool-tip for="${id}" popover="manual">${text}</tool-tip>`

const html = [
  cell('2026-01-04', 0, 'contribution-day-component-0-1'),
  tip('contribution-day-component-0-1', 'No contributions on January 4th.'),
  cell('2026-01-05', 2, 'contribution-day-component-0-2'),
  tip('contribution-day-component-0-2', '7 contributions on January 5th.'),
  cell('2026-01-06', 1, 'contribution-day-component-0-3'),
  tip('contribution-day-component-0-3', '1 contribution on January 6th.'),
].join('')

test('groups days into Sunday-started weeks', () => {
  const { weeks } = parseContributionsPage(html)
  assert.equal(weeks.length, 1)
  assert.equal(weeks[0].firstDay, '2026-01-04') // a Sunday
  assert.deepEqual(
    weeks[0].days.map((d) => d.date),
    ['2026-01-04', '2026-01-05', '2026-01-06'],
  )
})

test('reads counts and levels', () => {
  const { weeks, totalContributions } = parseContributionsPage(html)
  assert.deepEqual(
    weeks[0].days.map((d) => d.count),
    [0, 7, 1],
  )
  assert.deepEqual(
    weeks[0].days.map((d) => d.level),
    [0, 2, 1],
  )
  assert.equal(totalContributions, 8)
})

test('missing tool-tip counts as zero', () => {
  const { weeks } = parseContributionsPage(cell('2026-01-04', 0, 'x') + cell('2026-01-05', 0, 'y'))
  assert.equal(weeks[0].days[0].count, 0)
})

test('rejects empty or truncated calendars', () => {
  assert.throws(() => assertUsable({ weeks: [] }))
  assert.throws(() => assertUsable({ weeks: Array.from({ length: 53 }, () => ({ days: [] })) }))
})

test('accepts a full year', () => {
  const weeks = Array.from({ length: 53 }, () => ({ days: [{ count: 0 }] }))
  assert.doesNotThrow(() => assertUsable({ weeks }))
})
