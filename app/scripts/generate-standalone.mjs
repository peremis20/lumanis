/**
 * Builds standalone/index.html — the dashboard as one self-contained HTML file,
 * carrying the design's markup verbatim. No build step, no framework: drop it
 * on any static host.
 *
 * Transformations, all mechanical:
 *   {{ binding }}      -> the value DCLogic.renderVals() computed
 *   style-hover="…"    -> a generated .hv-N:hover rule
 *   <image-slot>       -> a div with the same inline style + the empty state
 *   onClick="{{ … }}"  -> a listener added by the inline script at the bottom
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const DESIGN = resolve(here, '../../project/Dashboard.dc.html')
const OUT_DIR = resolve(here, '../../standalone')
const OUT = resolve(OUT_DIR, 'index.html')

const src = readFileSync(DESIGN, 'utf8')
const open = /<x-dc(?:\s[^>]*)?>/.exec(src)
let body = src.slice(open.index + open[0].length, src.lastIndexOf('</x-dc>'))
body = body.slice(body.indexOf('</helmet>') + '</helmet>'.length).trim()

// The design's own prop defaults and renderVals() arithmetic.
const userName = 'Michael'
const dailyGoalPercent = 75
const pct = Math.max(0, Math.min(100, dailyGoalPercent))
const circumference = 2 * Math.PI * 76
const bindings = {
  userName,
  percentLabel: String(Math.round(pct)),
  ringDash: ((circumference * pct) / 100).toFixed(1) + ' ' + circumference.toFixed(1),
  heartFill: 'none',
}

const hoverRules = []

const html = body
  .replace(/\{\{\s*(\w+)\s*\}\}/g, (m, key) => (key in bindings ? bindings[key] : m))
  .replace(/\s*onClick="\{\{\s*toggleFavorite\s*\}\}"/g, ' data-favorite-toggle')
  .replace(/\s*style-hover="([^"]*)"/g, (_, rules) => {
    const cls = `hv-${hoverRules.length + 1}`
    hoverRules.push(`.${cls}:hover { ${rules.trim().replace(/;?$/, ';')} }`)
    return ` class="${cls}"`
  })
  .replace(/<image-slot([^>]*)><\/image-slot>/g, (_, attrs) => {
    const attr = (name) => new RegExp(`${name}="([^"]*)"`).exec(attrs)?.[1]
    const shape = attr('shape') ?? 'rounded'
    const radius =
      shape === 'circle' ? '50%' : shape === 'pill' ? '9999px' : `${attr('radius') ?? 12}px`
    const style = attr('style') ?? ''
    const caption = attr('placeholder') ?? 'Drop an image'
    return `<div class="image-slot" style="${style};border-radius:${radius}">
            <div class="image-slot__ring" style="border-radius:${radius}"></div>
            <div class="image-slot__empty">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5"></rect><circle cx="8.5" cy="10" r="1.6"></circle><path d="M4 17l4.5-4.5 3.5 3 3-2.5L20 17"></path></svg>
              <span>${caption}</span>
            </div>
          </div>`
  })

const helmetStyle = /<style>([\s\S]*?)<\/style>/.exec(src)[1].trim()

const page = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ScripturePath — Dashboard</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,500;8..60,600;8..60,700&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
${helmetStyle
  .split('\n')
  .map((l) => l.trim())
  .join('\n')}

${hoverRules.join('\n')}

.image-slot { position: relative; display: block; overflow: hidden; background: rgba(127,127,127,.08); container-type: size; }
.image-slot__ring { position: absolute; inset: 0; border: 1.5px dashed currentColor; opacity: .25; pointer-events: none; }
.image-slot__empty { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; padding: 12px; text-align: center; font: 500 13px/1.3 system-ui, -apple-system, sans-serif; opacity: .75; }
.image-slot__empty svg { opacity: .45; }
@container (max-width: 90px) { .image-slot__empty span { display: none; } }
@container (max-width: 48px) { .image-slot__empty svg { display: none; } }
</style>
</head>
<body>
${html}
<script>
  // The design's only interaction: the Verse of the Day heart fills when tapped.
  var heart = document.querySelector('[data-favorite-toggle]');
  if (heart) {
    heart.addEventListener('click', function () {
      var on = heart.getAttribute('fill') !== 'none';
      heart.setAttribute('fill', on ? 'none' : '#D97B2E');
    });
  }
</script>
</body>
</html>
`

mkdirSync(OUT_DIR, { recursive: true })
writeFileSync(OUT, page)
console.log(`standalone/index.html: ${page.length} bytes, ${hoverRules.length} hover rules`)
