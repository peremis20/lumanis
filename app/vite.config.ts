import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Relative asset URLs so the build works from any path — root domain,
  // a GitHub Pages project subpath, or a file:// preview.
  base: './',
})
