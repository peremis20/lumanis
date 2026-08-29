# ScripturePath — Dashboard

React implementation of `project/Dashboard.dc.html` from the Claude Design handoff
bundle in this repo.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build
npm run typecheck
```

## How it maps to the design

| Design file | Here |
| --- | --- |
| Inline styles on `<div>`s | Class names in `src/styles/global.css`, values transcribed 1:1 |
| Palette repeated as hex literals | CSS custom properties on `:root` |
| Inline `<svg>` glyphs | `src/components/icons.tsx` (same paths, viewBox, caps/joins) |
| `{{ userName }}`, `{{ ringDash }}` etc. | Props fed from `src/data/mock.ts` |
| `style-hover="…"` attributes | `:hover` rules on the matching class |
| `<image-slot>` custom element | `src/components/ImageSlot.tsx` |
| `data-props` tweaks (name, daily goal %) | Fields on `dashboardData` |

## Structure

```
src/
  App.tsx                     page composition (sidebar + 2-column card grid)
  data/types.ts               types for everything the dashboard renders
  data/mock.ts                the design's copy and numbers — swap for an API
  styles/global.css           tokens + all component styles
  components/
    Sidebar.tsx               brand, nav, verse card, profile row
    VerseOfTheDay.tsx         holds the only stateful bit: the favourite heart
    Header.tsx                greeting, search, notifications, New Study
    TodaysProgressCard.tsx    ring + metrics + Continue Study
    ProgressRing.tsx          172px donut gauge (r=76, 15px stroke)
    WeeklyProgressCard.tsx    7-day streak row + weekly goal strip
    ContinuePlanCard.tsx      plan cover, progress bar, next reading
    StatsCard.tsx             4 stat tiles
    RecentActivityCard.tsx    activity list
    ToolsCard.tsx             4 quick-access tools
    RootedBanner.tsx          dark green promo banner
    Icon.tsx                  icon-key dispatcher + tinted tile
    icons.tsx                 the SVG set
    ImageSlot.tsx             image placeholder
```

## Notes

- **Images.** The design's three `<image-slot>`s (avatar, plan cover, banner
  illustration) shipped empty, so `ImageSlot` draws the same dashed empty state.
  Set `user.avatarUrl`, `plan.coverUrl` and `banner.artUrl` in `mock.ts` to fill them.
- **Fixed-width layout.** The main column keeps the design's `min-width: 1120px`,
  so narrow viewports scroll rather than squeeze — this was an explicit fix in the
  design chat, not an oversight.
- **Interactivity.** Only what the design actually did: the Verse of the Day heart
  toggles. Nav items, search and buttons are rendered as real `<button>`s (focusable,
  labelled) but have no handlers yet.
- **Fonts.** Source Serif 4 + DM Sans load from Google Fonts in `index.html`, matching
  the design's `<helmet>`.
