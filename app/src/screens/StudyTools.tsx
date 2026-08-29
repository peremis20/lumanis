import { useMemo, useState } from 'react'
import { navigate, readerHref, useRoute } from '../router'
import { COMMENTARIES, DICTIONARY, PLACES } from '../data/reference'
import { TopBar } from '../components/TopBar'
import { Screen } from '../components/Screen'

const TOOLS = [
  { id: 'library', label: 'Study Bible', href: '#/library/bible', detail: 'Read any book and chapter, highlight as you go.' },
  { id: 'commentaries', label: 'Commentaries', href: '#/library/tools/commentaries', detail: 'Short, plain notes on the passages these plans use.' },
  { id: 'maps', label: 'Bible Maps', href: '#/library/tools/maps', detail: 'Where the events happened, and why the place matters.' },
  { id: 'dictionary', label: 'Dictionary', href: '#/library/tools/dictionary', detail: 'Words the Bible uses differently than we do.' },
]

export function StudyTools() {
  const route = useRoute()
  const tool = route.segments[2]

  if (tool === 'commentaries') return <Commentaries />
  if (tool === 'maps') return <Maps />
  if (tool === 'dictionary') return <Dictionary />

  return (
    <Screen>
      <TopBar title="Study Tools" subtitle="Four ways in when the text feels closed." />
      <div className="sp-card">
        <div className="sp-tool-grid">
          {TOOLS.map((t) => (
            <button key={t.id} type="button" className="sp-tool" onClick={() => navigate(t.href)}>
              <div className="sp-tool__label">{t.label}</div>
              <div className="sp-tool__detail">{t.detail}</div>
              <span className="sp-tool__go">Open →</span>
            </button>
          ))}
        </div>
      </div>
    </Screen>
  )
}

function Commentaries() {
  const [query, setQuery] = useState('')
  const entries = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return COMMENTARIES
    return COMMENTARIES.filter(
      (c) =>
        c.heading.toLowerCase().includes(q) ||
        c.body.toLowerCase().includes(q) ||
        `${c.book} ${c.range}`.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <Screen>
      <TopBar title="Commentaries" subtitle="Notes on the passages these plans lean on." />
      <div className="sp-card">
        <div className="sp-toolbar">
          <button type="button" className="sp-btn sp-btn--ghost" onClick={() => navigate('#/library/tools')}>
            ← Study Tools
          </button>
          <input
            className="sp-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search commentary…"
            aria-label="Search commentary"
          />
        </div>
        <div className="sp-stack">
          {entries.map((entry) => (
            <article key={entry.id} className="sp-entry">
              <div className="sp-entry__head">
                <div>
                  <div className="sp-entry__title">{entry.heading}</div>
                  <div className="sp-entry__meta">
                    {entry.book} {entry.range}
                  </div>
                </div>
                <button
                  type="button"
                  className="sp-btn sp-btn--ghost"
                  onClick={() => navigate(readerHref(entry.book, entry.chapter))}
                >
                  Read passage
                </button>
              </div>
              <p>{entry.body}</p>
            </article>
          ))}
          {entries.length === 0 && <div className="sp-empty">Nothing matches “{query}”.</div>}
        </div>
      </div>
    </Screen>
  )
}

function Maps() {
  const [activeId, setActiveId] = useState(PLACES[0].id)
  const active = PLACES.find((p) => p.id === activeId) ?? PLACES[0]

  return (
    <Screen>
      <TopBar title="Bible Maps" subtitle="Twelve places, and what happened in them." />
      <div className="sp-card">
        <div className="sp-toolbar">
          <button type="button" className="sp-btn sp-btn--ghost" onClick={() => navigate('#/library/tools')}>
            ← Study Tools
          </button>
        </div>
        <div className="sp-maps">
          <div className="sp-map-plate" role="img" aria-label="Schematic map of biblical places">
            {PLACES.map((place) => (
              <button
                key={place.id}
                type="button"
                className={`sp-pin${place.id === activeId ? ' sp-pin--on' : ''}`}
                style={{ left: `${place.x}%`, top: `${place.y}%` }}
                onClick={() => setActiveId(place.id)}
                aria-label={place.name}
              >
                <span className="sp-pin__dot" />
                <span className="sp-pin__label">{place.name}</span>
              </button>
            ))}
          </div>
          <div className="sp-map-side">
            <div className="sp-entry__title">{active.name}</div>
            <div className="sp-entry__meta">
              {active.region} · {active.appears}
            </div>
            <p>{active.summary}</p>
            <div className="sp-place-list">
              {PLACES.map((place) => (
                <button
                  key={place.id}
                  type="button"
                  className={`sp-chip${place.id === activeId ? ' sp-chip--on' : ''}`}
                  onClick={() => setActiveId(place.id)}
                >
                  {place.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Screen>
  )
}

function Dictionary() {
  const [query, setQuery] = useState('')
  const terms = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return DICTIONARY
    return DICTIONARY.filter(
      (t) => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <Screen>
      <TopBar title="Dictionary" subtitle="Words the Bible uses differently than we do." />
      <div className="sp-card">
        <div className="sp-toolbar">
          <button type="button" className="sp-btn sp-btn--ghost" onClick={() => navigate('#/library/tools')}>
            ← Study Tools
          </button>
          <input
            className="sp-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Look up a word…"
            aria-label="Look up a word"
          />
        </div>
        <div className="sp-terms">
          {terms.map((term) => (
            <article key={term.id} className="sp-term">
              <div className="sp-term__head">
                <span className="sp-term__word">{term.term}</span>
                {term.pronunciation && <span className="sp-term__pron">{term.pronunciation}</span>}
              </div>
              <p>{term.definition}</p>
              <div className="sp-term__see">See {term.seeAlso}</div>
            </article>
          ))}
          {terms.length === 0 && <div className="sp-empty">No entry for “{query}”.</div>}
        </div>
      </div>
    </Screen>
  )
}
