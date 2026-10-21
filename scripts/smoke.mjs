// Renders the app to HTML so template/runtime errors fail the build instead of
// the browser. Run with: npm run smoke
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import App from '../src/App'

const html = renderToString(createElement(App))

for (const expected of [
  'Things I&#x27;ve built',
  'Certifications earned',
  'Activity on GitHub',
  'contributions in the last year',
  'data-slot="sonar-grid"',
]) {
  if (!html.includes(expected)) {
    console.error(html.slice(0, 500))
    throw new Error(`Missing "${expected}" in rendered output`)
  }
}

console.log(`Smoke OK — rendered ${html.length} characters`)
