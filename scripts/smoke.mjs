// Renders the app to HTML so template/runtime errors fail the build instead of
// the browser. Run with: npm run smoke
import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import App from '../src/App.vue'

const html = await renderToString(createSSRApp(App))

for (const expected of ['Projects', 'Badges &amp; Certifications', 'Contributions', 'contributions in the last year']) {
  if (!html.includes(expected)) throw new Error(`Missing "${expected}" in rendered output`)
}

console.log(`Smoke OK — rendered ${html.length} characters`)
