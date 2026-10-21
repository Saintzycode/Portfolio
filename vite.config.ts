import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { fileURLToPath } from 'node:url'

const base = process.env.BASE_PATH || '/'

/**
 * GitHub Pages has no SPA rewrite, so a deep link like /projects/foo would 404
 * before the app loads. 404.html stashes the requested URL and bounces to the
 * app root, which restores it (see src/main.tsx).
 */
function spaFallback(): Plugin {
  return {
    name: 'spa-fallback',
    apply: 'build',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: '404.html',
        source: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Loading…</title>
    <script>
      sessionStorage.setItem('redirect', location.href)
      location.replace(${JSON.stringify(base)})
    </script>
  </head>
  <body></body>
</html>
`,
      })
    },
  }
}

export default defineConfig({
  // Set BASE_PATH=/your-repo/ when deploying to a GitHub Pages project site.
  base,
  plugins: [react(), tailwindcss(), spaFallback()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    watch: { ignored: ['**/.smoke/**', '**/dist/**'] },
  },
})
