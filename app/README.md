# ScripturePath

A working Bible study app for people in a hard season, built from the Claude Design
handoff in this repo (`project/Dashboard.dc.html`).

```bash
npm install
npm run dev            # http://localhost:5173
npm run build          # typecheck + production build → dist/
npm run build:single   # one self-contained HTML file → ../standalone/scripturepath.html
```

## What works

Everything in the sidebar, and every control on every screen.

| Screen | What it does |
| --- | --- |
| **Dashboard** | Ring, streak dots, stats and activity are all computed from your real study log. Continue Study opens the next reading; Edit Goal, the period switch, View Plan, View All, the four tools and Explore Plans are live. |
| **My Plan** | Five plans, each with day-by-day readings and a reflection question. Tick days done, restart, switch plan, jump into any reading. |
| **Bible Library** | The complete King James Version — 66 books, 1,189 chapters — filterable by testament or name, chapter picker into the reader. |
| **Reader** | Real scripture text. Tap a verse to highlight, note, favourite or copy it. A session timer runs while you read; marking the day complete writes the session, advances the plan and moves every number on the dashboard. |
| **Study Tools** | Commentaries (searchable, jump to the passage), Bible Maps (interactive place plate), Dictionary (searchable terms). |
| **Progress** | Period stats, current streak, a 14-day minutes chart, this week's days, the full activity log and every reading session. |
| **Notes & Highlights** | Create, edit, delete and search notes; open any note or highlight at its verse; remove highlights. |
| **Favorites** | Saved verses with their text, copy, open, remove. |
| **Community** | Post, like, reply, delete your own posts. Local to the device. |
| **Settings** | Name, avatar, daily/weekly goals, change plan, export your data, reset everything. |
| **Top bar** | Search runs across all 31,102 verses plus your notes and the plans. Notifications open, mark read and dismiss. New Study opens the plan picker. |

State lives in `localStorage` under `scripturepath:v1` — notes, highlights, favourites,
sessions, plan progress, posts and settings. Nothing is uploaded anywhere.

## Scripture text

The King James Version, which is in the public domain, via the `es-kjv` package
(31,102 verses). It is imported dynamically, so it lands in its own chunk that only
downloads when a reader, library or search first needs it.

## Fidelity to the design

The dashboard is not a re-interpretation of the handoff — it is the design's own DOM.
Verified by rendering the original design markup and the running app side by side in
Chromium and diffing **all 279 elements** on tag, text, box size and every computed
style property: **zero differences**.

Keeping that true while the screen became functional meant a few deliberate choices:

- The seeded first-run data reproduces the design's numbers exactly — 75% of the daily
  goal, 25 minutes today, 4 of 7 days, 8 chapters, 3h 15m, 14 notes, 7 highlights, and a
  plan 60% complete whose next reading is Philippians 4:4–9. They are real records, not
  literals: the ring is `floor(25 ÷ 33 min)`, the 60% is 6 of 10 days ticked.
- Nothing gained a `cursor` or a wrapper element it did not have in the design. Panels
  (search results, notifications, the period menu) are positioned against a measured
  anchor and only exist in the DOM while open.
- The greeting is time-aware, so the fidelity check pins the browser clock to 08:40.

Reproduce it:

```bash
npm run build && npm run preview          # then, from the repo root:
node app/scripts/generate-standalone.mjs  # writes standalone/design-reference.html
```

## Layout of the code

```
app/
  src/
    App.tsx                 hash router + app shell
    router.ts               tiny hash router (works from any subpath)
    store/                  types, seed data, reducer + persistence, derived selectors
    data/                   KJV loader, study plans, commentary/places/dictionary
    components/             Sidebar, TopBar, Screen, Modal, Toast, ImageSlot
    screens/                Dashboard, MyPlan, Library, Reader, StudyTools,
                            Progress, Notes, Favorites, Community, Settings
    dashboard.css           the design's base rules + its style-hover rules
    styles/app.css          everything the other screens need, in the design's palette
  scripts/
    generate-dashboard.mjs  transpiles the design file → a pristine React transcription
    generate-standalone.mjs → standalone/design-reference.html (static, design-exact)
    build-single-file.mjs   → standalone/scripturepath.html (whole app, one file)
```

## Where it runs

- `dist/` — normal static build, deployed to the `gh-pages` branch.
- `standalone/scripturepath.html` — the entire app inlined into one file, no build step
  and no server needed; open it from disk.
- `standalone/design-reference.html` — the original design as static HTML, for comparison.
