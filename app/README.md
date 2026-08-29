# ScripturePath

A working Bible study app for people in a hard season, built from the Claude Design
handoff in this repo (`project/Dashboard.dc.html`).

```bash
npm install
npm run dev            # http://localhost:5173
npm run build          # typecheck + production build → dist/
npm run build:single   # one self-contained HTML file → ../standalone/scripturepath.html
```

## Navigation

Six destinations; two of them open into sub-sections.

```
Dashboard
My Learning ─ My Courses · Continue Learning · Progress
Library     ─ Bible · Study Tools · Notes & Highlights
Community
Favorites
Settings
```

A parent row opens its section and lands on its first screen; the chevron collapses it.
The section holding the current screen opens itself, and a chapter opened from a course
counts as My Learning while one opened from the Bible counts as Library. Routes from the
earlier flat nav (`#/plan`, `#/progress`, `#/notes`, `#/tools/…`, `#/library`) redirect to
their new homes, so old links and stored activity entries still work.

## What works

Every item in the sidebar, and every control on every screen.

| Screen | What it does |
| --- | --- |
| **Dashboard** | Ring, streak dots, stats and activity are all computed from your real study log. Continue Study opens the next reading; Edit Goal, the period switch, View Plan, View All, the four tools and Explore Plans are live. Clicking any weekday opens what happened that day — minutes, verses, notes, what you read — with a way back into the passage. |
| **My Learning › My Courses** | Five courses, each with day-by-day readings and a reflection question. Tick days done, restart, enrol in another, jump into any reading. |
| **My Learning › Continue Learning** | The next reading as one button, the course progress line, readings to revisit and any other course left part-way. |
| **My Learning › Progress** | Period stats, current streak, a 14-day minutes chart, this week's days, the full activity log and every reading session. |
| **Library › Bible** | The complete King James Version — 66 books, 1,189 chapters — filterable by testament or name, chapter picker into the reader. |
| **Library › Study Tools** | Commentaries (searchable, jump to the passage), Bible Maps (interactive place plate), Dictionary (searchable terms). |
| **Library › Notes & Highlights** | Create, edit, delete and search notes; open any note or highlight at its verse; remove highlights. |
| **Reader** | Real scripture text. Tap a verse to highlight, note, favourite or copy it. A session timer runs while you read; marking the day complete writes the session, advances the course and moves every number on the dashboard. |
| **Community** | Post, like, reply, delete your own posts. Local to the device. |
| **Favorites** | Saved verses with their text, copy, open, remove. |
| **Settings** | Name, avatar, daily/weekly goals, change course, export your data, reset everything. |
| **Top bar** | Search runs across all 31,102 verses plus your notes and the courses. Notifications open, mark read and dismiss. New Study opens the course picker. |

Every interactive element is covered by `audit.mjs`, which clicks all 364 of them across
15 screens and fails any that changes nothing. The only permitted no-ops are a nav item
for the screen you are already on, an already-selected tab or map pin, and a genuinely
disabled control (the reply button with an empty box, Next on a book's last chapter).

State lives in `localStorage` under `scripturepath:v1` — notes, highlights, favourites,
sessions, plan progress, posts and settings. Nothing is uploaded anywhere.

The first-run demo content is dated relative to the day the app is first opened, and is
rolled forward on later visits (`rollSeedForward` in `store/store.tsx`) so the weekly
dots, the ring and the streak keep meaning something instead of ageing out of the
current week. Records you create carry no `seeded` flag and are never moved.

## Screens narrower than 1120px

The handoff pins the content column at `min-width: 1120px`, which is right for the
desktop app and unusable on a phone or in a narrow panel. Below that width the sidebar
becomes a drawer behind a menu button and every fixed grid collapses to one column —
all of it inside one `@media (max-width: 1119px)` block, so the desktop rendering the
fidelity check measures is untouched.

## Scripture text

The King James Version, which is in the public domain, via the `es-kjv` package
(31,102 verses). It is imported dynamically, so it lands in its own chunk that only
downloads when a reader, library or search first needs it.

## Fidelity to the design

The dashboard is not a re-interpretation of the handoff — it is the design's own DOM.
Verified by rendering the original design markup and the running app side by side in
Chromium and diffing every element on tag, text, box size and every computed style
property. The dashboard's **209-element `<main>` column** matches on every one of them
except `cursor`, which differs on 59 nodes: the weekly day markers, the stat tiles, the
Verse of the Day text and the plan cover became clickable, and take the pointer cursor
the design already uses for everything interactive. Nothing else differs — same nodes,
same text, same boxes, same colours.

The sidebar is the one deliberate departure: the handoff drew nine flat rows, and the
product now groups them under My Learning and Library. Row metrics, colours and the
active treatment are still the design's, and the check is scoped to `<main>` for that
reason.

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
    screens/                Dashboard, Courses, ContinueLearning, Progress,
                            Library, Reader, StudyTools, Notes, Favorites,
                            Community, Settings
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
