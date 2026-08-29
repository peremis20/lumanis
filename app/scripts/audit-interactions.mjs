/**
 * Clicks every element that presents itself as interactive, on every screen,
 * and reports any that change nothing — no route change, no DOM change, no
 * store change. One fresh page load per click so nothing interferes.
 */
// Run against `npm run preview`:  node scripts/audit-interactions.mjs
import pkg from 'playwright'
const { chromium } = pkg

const BASE = 'http://localhost:4173/'
const ROUTES = [
  '#/',
  '#/learning/courses',
  '#/learning/continue',
  '#/learning/progress',
  '#/library/bible',
  '#/library/tools',
  '#/library/tools/commentaries',
  '#/library/tools/maps',
  '#/library/tools/dictionary',
  '#/library/notes',
  '#/library/notes?tab=highlights',
  '#/favorites',
  '#/community',
  '#/settings',
  '#/read/Philippians/4?verse=4&day=peace-7',
]

const SELECTOR = [
  'button',
  '[role="button"]',
  '[role="link"]',
  '[style*="cursor: pointer"]',
  '.sp-book',
  '.sp-chapter',
  '.sp-plan-card',
  '.sp-activity',
  '.sp-revisit__item',
  '.sp-verse',
].join(', ')

const PER_ROUTE_CAP = 26

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
await page.clock.setFixedTime(new Date('2026-08-29T08:40:00'))

const errors = []
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`))
page.on('console', (m) => m.type() === 'error' && errors.push(`console: ${m.text()}`))

const signature = () =>
  page.evaluate(() => {
    const h = (s) => {
      let out = 0
      for (let i = 0; i < s.length; i++) out = (out * 31 + s.charCodeAt(i)) | 0
      return out
    }
    const classOf = (el) =>
      typeof el.className === 'string' ? el.className : (el.className?.baseVal ?? '')
    return {
      route: location.hash,
      // Full store, not a prefix: a like or a toggle can live deep in the JSON.
      store: h(localStorage.getItem('scripturepath:v1') ?? ''),
      text: h(document.body.innerText),
      // Tag + class of every node, so a selected/active state counts as change.
      dom: h([...document.querySelectorAll('*')].map((e) => e.tagName + classOf(e)).join('|')),
    }
  })

const changed = (a, b) =>
  a.route !== b.route || a.store !== b.store || a.text !== b.text || a.dom !== b.dom

async function load(route) {
  await page.goto(BASE + route, { waitUntil: 'load' })
  await page.waitForTimeout(route.includes('read') ? 1300 : 550)
}

let total = 0
const dead = []

for (const route of ROUTES) {
  await load(route)
  await page.evaluate(() => localStorage.clear())
  await load(route)

  const count = Math.min(await page.locator(SELECTOR).count(), PER_ROUTE_CAP)

  for (let i = 0; i < count; i++) {
    await load(route)
    // The count can differ between loads (lazy chapters, empty states), so
    // re-check rather than trusting the first pass.
    if (i >= (await page.locator(SELECTOR).count())) continue
    const el = page.locator(SELECTOR).nth(i)
    const label = (
      (await el.getAttribute('aria-label', { timeout: 2000 }).catch(() => null)) ||
      (await el.innerText({ timeout: 2000 }).catch(() => '')) ||
      (await el.getAttribute('class', { timeout: 2000 }).catch(() => null)) ||
      '?'
    )
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 42)

    const before = await signature()
    let how = 'click'
    try {
      await el.click({ timeout: 2500 })
    } catch {
      how = 'js'
      await el.evaluate((node) => node.click()).catch(() => {})
    }
    await page.waitForTimeout(420)
    const after = await signature()
    total++

    if (!changed(before, after)) dead.push(`${route}  →  "${label}" (${how})`)
  }
}

console.log(`clicked ${total} interactive elements across ${ROUTES.length} screens`)
console.log(dead.length ? `\nno effect (${dead.length}):\n  ` + dead.join('\n  ') : '\nevery one produced a change')
console.log('\nerrors:', errors.length ? errors.slice(0, 6) : 'none')
await browser.close()
