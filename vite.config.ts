import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  // Set BASE_PATH=/your-repo/ when deploying to a GitHub Pages project site.
  base: process.env.BASE_PATH || '/',
  plugins: [vue(), tailwindcss()],
})
