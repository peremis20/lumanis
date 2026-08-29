# ScripturePath — Dashboard

The dashboard from `project/Dashboard.dc.html` (Claude Design handoff), shipped two ways.
Both are generated from the design file itself, so the markup is the design's own.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build into dist/
npm run generate   # regenerate src/Dashboard.tsx from the design file
```

## The two outputs

| | What it is | Where |
| --- | --- | --- |
| React app | Vite + React + TS. `Dashboard.tsx` is transpiled from the design's DOM. | `app/` → `app/dist` |
| Standalone page | One self-contained HTML file, no build step, no framework. | `standalone/index.html` |

Regenerate either from the design:

```bash
node scripts/generate-dashboard.mjs   # -> src/Dashboard.tsx + hover rules in src/dashboard.css
node scripts/generate-standalone.mjs  # -> ../standalone/index.html
```

## What "the same code" means here

`Dashboard.tsx` is not a re-interpretation of the design — it is the design's markup,
element for element, with every inline style value byte-identical. The generators only
apply the changes the target syntax forces:

| Design | Output |
| --- | --- |
| `style="a:b"` | React style object / unchanged in the standalone page |
| `stroke-width` | `strokeWidth` (React only) |
| `style-hover="a:b"` | `.hv-N:hover { a:b }` — HTML has no inline hover |
| `{{ userName }}`, `{{ ringDash }}` … | values from the same arithmetic `DCLogic.renderVals()` ran |
| `<image-slot>` | `ImageSlot` / a div, drawing the same dashed empty state |

Verified by rendering the design markup and each output in Chromium and diffing all
279 elements — tag, text, box size and every computed style property. Zero differences.

## Notes

- **Images.** The design's three `<image-slot>`s (avatar, plan cover, banner illustration)
  shipped empty, so both outputs draw the dashed placeholder. Pass `src` to `ImageSlot`,
  or drop an `<img>` into the standalone page, when the real art exists.
- **Fixed-width layout.** The design sets `min-width: 1120px` on the content column, so
  narrow viewports scroll rather than squeeze. That was a deliberate fix in the design
  chat, and it is preserved.
- **Interactivity.** Exactly what the design did: the Verse of the Day heart toggles.
  Everything else is presentational, as designed.
- **Fonts.** Source Serif 4 + DM Sans from Google Fonts, matching the design's `<helmet>`.
