import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Single-file build: no code splitting, so scripts/build-single-file.mjs can
 * inline one bundle. The normal build (vite.config.ts) keeps the KJV text in a
 * lazy chunk instead.
 */
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist-single',
    assetsInlineLimit: 0,
    cssCodeSplit: false,
    // IIFE + inlined dynamic imports: one classic <script>, which also works
    // from file:// where module scripts are blocked.
    rollupOptions: { output: { format: 'iife', inlineDynamicImports: true } },
  },
})
