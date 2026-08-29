/**
 * Folds `npm run build:single` output into one self-contained HTML file —
 * markup, CSS and JS inline — so the app can be dropped on any host that
 * serves a single page, with no asset paths to configure.
 *
 * Run after `vite build --config vite.single.config.ts`.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const DIST = resolve(here, '../dist-single')
const OUT_DIR = resolve(here, '../../standalone')
const OUT = resolve(OUT_DIR, 'scripturepath.html')

const assets = readdirSync(resolve(DIST, 'assets'))
const jsFile = assets.find((f) => f.endsWith('.js'))
const cssFile = assets.find((f) => f.endsWith('.css'))
if (!jsFile) throw new Error('no JS bundle in dist-single/assets')

const js = readFileSync(resolve(DIST, 'assets', jsFile), 'utf8')
const css = cssFile ? readFileSync(resolve(DIST, 'assets', cssFile), 'utf8') : ''
let html = readFileSync(resolve(DIST, 'index.html'), 'utf8')

html = html
  .replace(/<script[^>]*src="[^"]*"[^>]*><\/script>/g, '')
  .replace(/<link[^>]*rel="stylesheet"[^>]*href="\.\/assets[^"]*"[^>]*>/g, '')
  // Replacer functions, not replacement strings: bundled code is full of $&
  // and $` sequences that String.replace would otherwise expand.
  .replace('</head>', () => `<style>\n${css}\n</style>\n</head>`)
  .replace('</body>', () => `<script>\n${js.replace(/<\/script/gi, '<\\/script')}\n</script>\n</body>`)

mkdirSync(OUT_DIR, { recursive: true })
writeFileSync(OUT, html)
console.log(`standalone/scripturepath.html: ${(html.length / 1e6).toFixed(2)} MB (one file, no build step)`)
