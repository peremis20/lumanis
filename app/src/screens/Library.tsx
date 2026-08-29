import { useMemo, useState } from 'react'
import { navigate, readerHref } from '../router'
import { useBible } from '../data/useBible'
import { TopBar } from '../components/TopBar'
import { Screen } from '../components/Screen'

type Filter = 'all' | 'old' | 'new'

export function Library() {
  const bible = useBible()
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')
  const [openBook, setOpenBook] = useState<string | null>(null)

  const books = useMemo(() => {
    if (!bible) return []
    const q = query.trim().toLowerCase()
    return bible.books.filter(
      (b) => (filter === 'all' || b.testament === filter) && (!q || b.name.toLowerCase().includes(q)),
    )
  }, [bible, filter, query])

  const selected = openBook && bible ? bible.book(openBook) : undefined

  return (
    <Screen>
      <TopBar title="Bible Library" subtitle="The whole King James Version — 66 books, 1,189 chapters." />

      <div className="sp-card">
        <div className="sp-toolbar">
          <div className="sp-tabs">
            {(['all', 'old', 'new'] as Filter[]).map((key) => (
              <button
                key={key}
                type="button"
                className={`sp-tab${filter === key ? ' sp-tab--on' : ''}`}
                onClick={() => setFilter(key)}
              >
                {key === 'all' ? 'All books' : key === 'old' ? 'Old Testament' : 'New Testament'}
              </button>
            ))}
          </div>
          <input
            className="sp-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find a book…"
            aria-label="Filter books"
          />
        </div>

        {!bible && <div className="sp-empty">Loading the library…</div>}

        <div className="sp-book-grid">
          {books.map((book) => (
            <button
              key={book.name}
              type="button"
              className={`sp-book${openBook === book.name ? ' sp-book--on' : ''}`}
              onClick={() => setOpenBook(openBook === book.name ? null : book.name)}
            >
              <span className="sp-book__name">{book.name}</span>
              <span className="sp-book__chapters">{book.chapters} ch</span>
            </button>
          ))}
        </div>
        {bible && books.length === 0 && <div className="sp-empty">No book matches “{query}”.</div>}
      </div>

      {selected && (
        <div className="sp-card">
          <div className="sp-card__title">{selected.name} — choose a chapter</div>
          <div className="sp-chapter-grid">
            {Array.from({ length: selected.chapters }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                className="sp-chapter"
                onClick={() => navigate(readerHref(selected.name, n))}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      )}
    </Screen>
  )
}
