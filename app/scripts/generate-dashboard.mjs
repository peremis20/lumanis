/**
 * Transpiles the <x-dc> body of Dashboard.dc.html into a React component,
 * preserving the design's DOM structure and every inline style value verbatim.
 * The only transformations are the ones React's syntax forces:
 *   style="a:b"            -> style={{ a: 'b' }}
 *   stroke-width           -> strokeWidth (etc.)
 *   style-hover="a:b"      -> class hv-N + a generated `.hv-N:hover{a:b}` rule
 *   {{ expr }}             -> {expr}
 *   <image-slot>           -> <ImageSlot>
 */
import { parse } from 'node-html-parser'
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const DESIGN = resolve(here, '../../project/Dashboard.dc.html')
const OUT_TSX = resolve(here, '../src/Dashboard.tsx')
const OUT_CSS = resolve(here, '../src/dashboard.css')

const src = readFileSync(DESIGN, 'utf8')

const open = /<x-dc(?:\s[^>]*)?>/.exec(src)
const body = src.slice(open.index + open[0].length, src.lastIndexOf('</x-dc>'))
const root = parse(body, { lowerCaseTagName: false, comment: false })

// Attribute names React expects in camelCase (SVG + HTML presentation attrs).
const ATTR_MAP = {
  'stroke-width': 'strokeWidth',
  'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin',
  'stroke-dasharray': 'strokeDasharray',
  'stroke-dashoffset': 'strokeDashoffset',
  'fill-rule': 'fillRule',
  'clip-rule': 'clipRule',
  'stop-color': 'stopColor',
  class: 'className',
  for: 'htmlFor',
  viewbox: 'viewBox',
}

const VOID = new Set(['input', 'img', 'br', 'hr', 'meta', 'link'])

const hoverRules = []

function cssPropToJs(prop) {
  return prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
}

/** "a:b;c:d" -> object literal source, keeping values byte-identical. */
function styleToObject(value) {
  const entries = []
  for (const decl of value.split(';')) {
    const t = decl.trim()
    if (!t) continue
    const i = t.indexOf(':')
    const prop = t.slice(0, i).trim()
    const val = t.slice(i + 1).trim()
    const key = cssPropToJs(prop)
    const safeKey = /^[A-Za-z][A-Za-z0-9]*$/.test(key) ? key : JSON.stringify(key)
    entries.push(`${safeKey}: ${JSON.stringify(val)}`)
  }
  return `{ ${entries.join(', ')} }`
}

/** {{ expr }} in an attribute becomes a JSX expression container. */
function bindingExpr(value) {
  const m = /^\{\{\s*([^}]+?)\s*\}\}$/.exec(value.trim())
  return m ? m[1] : null
}

function renderAttrs(node, indent) {
  const out = []
  for (const [rawName, rawValue] of Object.entries(node.attributes)) {
    const name = rawName.toLowerCase()

    if (name === 'style-hover') {
      const cls = `hv-${hoverRules.length + 1}`
      hoverRules.push(`.${cls}:hover { ${rawValue.trim().replace(/;?$/, ';')} }`)
      out.push(`className="${cls}"`)
      continue
    }

    if (name === 'style') {
      out.push(`style={${styleToObject(rawValue)}}`)
      continue
    }

    const expr = bindingExpr(rawValue)
    const attr = ATTR_MAP[name] ?? rawName
    out.push(expr ? `${attr}={${expr}}` : `${attr}=${JSON.stringify(rawValue)}`)
  }
  if (!out.length) return ''
  const oneLine = ' ' + out.join(' ')
  if (oneLine.length < 110) return oneLine
  return '\n' + out.map((a) => indent + '  ' + a).join('\n') + '\n' + indent
}

/** Text nodes: escape stray braces, turn {{ x }} into {x}, keep entities. */
function renderText(text) {
  const OPEN = '\u0001'
  const CLOSE = '\u0002'
  return text
    .replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_, e) => OPEN + e + CLOSE)
    .replace(/[{}]/g, (ch) => "{'" + ch + "'}")
    .split(OPEN).join('{')
    .split(CLOSE).join('}')
}

function render(node, depth) {
  const indent = '  '.repeat(depth)

  if (node.nodeType === 3) {
    const raw = node.rawText
    if (!raw.trim()) return ''
    return indent + renderText(raw.trim()) + '\n'
  }

  const tag = node.rawTagName
  if (!tag) return ''

  const name = tag === 'image-slot' ? 'ImageSlot' : tag
  const attrs = renderAttrs(node, indent)
  const children = node.childNodes.map((c) => render(c, depth + 1)).join('')

  if (VOID.has(tag.toLowerCase()) || !children) {
    const tail = attrs.endsWith('\n' + indent) ? '/>' : ' />'
    return `${indent}<${name}${attrs}${tail}\n`
  }
  return `${indent}<${name}${attrs}>\n${children}${indent}</${name}>\n`
}

const markup = root.childNodes
  .filter((n) => n.rawTagName !== 'helmet')
  .map((n) => render(n, 3))
  .join('')
  .replace(/\n{2,}/g, '\n')

const component = `/**
 * Dashboard — generated from project/Dashboard.dc.html.
 *
 * The markup below is the design's own DOM, element for element, with its
 * inline style values untouched. Only React syntax forced any change:
 * hyphenated SVG attributes are camelCased, \`style\` strings became style
 * objects, the design's \`style-hover\` attributes became the :hover rules in
 * dashboard.css, and the {{ }} bindings read from the values computed below —
 * the same arithmetic the design's DCLogic.renderVals() performed.
 *
 * Regenerate with: node scripts/generate-dashboard.mjs
 */
import { useState } from 'react'
import { ImageSlot } from './ImageSlot'
import './dashboard.css'

export type DashboardProps = {
  /** design prop: text, default 'Michael' */
  userName?: string
  /** design prop: range 0–100, default 75 */
  dailyGoalPercent?: number
}

export function Dashboard({ userName = 'Michael', dailyGoalPercent = 75 }: DashboardProps) {
  const [favorite, setFavorite] = useState(false)

  const pct = Math.max(0, Math.min(100, dailyGoalPercent))
  const c = 2 * Math.PI * 76
  const percentLabel = Math.round(pct)
  const ringDash = ((c * pct) / 100).toFixed(1) + ' ' + c.toFixed(1)
  const heartFill = favorite ? '#D97B2E' : 'none'
  const toggleFavorite = () => setFavorite((f) => !f)

  return (
    <>
${markup}    </>
  )
}
`

writeFileSync(OUT_TSX, component)

// Splice the generated hover rules back into dashboard.css between its markers.
const START = '/* @generated:hover-start */'
const END = '/* @generated:hover-end */'
const css = readFileSync(OUT_CSS, 'utf8')
const before = css.slice(0, css.indexOf(START) + START.length)
const after = css.slice(css.indexOf(END))
writeFileSync(OUT_CSS, `${before}\n${hoverRules.join('\n')}\n${after}`)

console.log(`Dashboard.tsx: ${component.length} bytes, ${hoverRules.length} hover rules`)
