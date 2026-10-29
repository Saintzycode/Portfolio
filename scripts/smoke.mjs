// Renders the app to HTML so template/runtime errors fail the build instead of
// the browser. Run with: npm run smoke
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import App from '../src/App'

const render = (path) =>
  renderToString(createElement(MemoryRouter, { initialEntries: [path] }, createElement(App)))

const home = render('/')
for (const expected of [
  'Things I&#x27;ve built',
  'Certifications and badges',
  'Activity on GitHub',
  'contributions in the last year',
  'fixed inset-0 -z-10',
  `${import.meta.env.BASE_URL}badges/opswat-icip-badge.png`,
]) {
  if (!home.includes(expected)) {
    console.error(home.slice(0, 500))
    throw new Error(`Missing "${expected}" in rendered output`)
  }
}

const detail = render('/projects/studyflow')
for (const expected of ['StudyFlow', 'Highlights', 'All projects', 'Previous', 'Next']) {
  if (!detail.includes(expected)) throw new Error(`Missing "${expected}" on the project page`)
}

const budgetko = render('/projects/budgetko')
for (const expected of ['budgetko-1.jpg', 'budgetko-2.jpg', 'budgetko-3.jpg']) {
  if (!budgetko.includes(expected)) throw new Error(`Missing "${expected}" on the BudgetKo page`)
}

if (render('/projects/does-not-exist').includes('StudyFlow')) {
  throw new Error('Unknown project slug should not render a project')
}

console.log(`Smoke OK — home ${home.length} chars, detail ${detail.length} chars`)
