import { useMemo, useState } from 'react'
import { navigate, readerHref, useRoute } from '../router'
import { useStore } from '../store/store'
import { formatWhen } from '../store/derive'
import { formatVerse } from '../data/plans'
import { useBible } from '../data/useBible'
import { TopBar } from '../components/TopBar'
import { Screen } from '../components/Screen'
import { useToast } from '../components/Toast'

type Tab = 'notes' | 'highlights'

export function Notes() {
  const route = useRoute()
  const { state, dispatch } = useStore()
  const bible = useBible()
  const toast = useToast()

  const [tab, setTab] = useState<Tab>(route.query.get('tab') === 'highlights' ? 'highlights' : 'notes')
  const [query, setQuery] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState('')
  const [newNote, setNewNote] = useState('')

  const notes = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return state.notes
    return state.notes.filter(
      (n) => n.body.toLowerCase().includes(q) || (n.ref ? formatVerse(n.ref).toLowerCase().includes(q) : false),
    )
  }, [state.notes, query])

  const highlights = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return state.highlights
    return state.highlights.filter((h) => formatVerse(h.ref).toLowerCase().includes(q))
  }, [state.highlights, query])

  return (
    <Screen>
      <TopBar title="Notes & Highlights" subtitle="Everything you have marked, in one place." />

      <div className="sp-card">
        <div className="sp-toolbar">
          <div className="sp-tabs">
            <button type="button" className={`sp-tab${tab === 'notes' ? ' sp-tab--on' : ''}`} onClick={() => setTab('notes')}>
              Notes ({state.notes.length})
            </button>
            <button
              type="button"
              className={`sp-tab${tab === 'highlights' ? ' sp-tab--on' : ''}`}
              onClick={() => setTab('highlights')}
            >
              Highlights ({state.highlights.length})
            </button>
          </div>
          <input
            className="sp-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search…"
            aria-label="Search notes and highlights"
          />
        </div>

        {tab === 'notes' && (
          <>
            <div className="sp-composer">
              <textarea
                rows={3}
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Write a note — it does not have to be about a specific verse."
              />
              <button
                type="button"
                className="sp-btn"
                disabled={!newNote.trim()}
                onClick={() => {
                  dispatch({ type: 'note/add', ref: null, body: newNote.trim() })
                  setNewNote('')
                  toast('Note saved')
                }}
              >
                Save note
              </button>
            </div>

            <div className="sp-stack">
              {notes.map((note) => (
                <article key={note.id} className="sp-entry">
                  <div className="sp-entry__head">
                    <div>
                      <div className="sp-entry__title">{note.ref ? formatVerse(note.ref) : 'General note'}</div>
                      <div className="sp-entry__meta">{formatWhen(note.updatedAt)}</div>
                    </div>
                    <div className="sp-entry__actions">
                      {note.ref && (
                        <button
                          type="button"
                          className="sp-btn sp-btn--ghost"
                          onClick={() => navigate(readerHref(note.ref!.book, note.ref!.chapter, { verse: note.ref!.verse }))}
                        >
                          Open
                        </button>
                      )}
                      {editingId === note.id ? (
                        <button
                          type="button"
                          className="sp-btn"
                          onClick={() => {
                            dispatch({ type: 'note/update', id: note.id, body: draft })
                            setEditingId(null)
                            toast('Note updated')
                          }}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="sp-btn sp-btn--ghost"
                          onClick={() => {
                            setEditingId(note.id)
                            setDraft(note.body)
                          }}
                        >
                          Edit
                        </button>
                      )}
                      <button
                        type="button"
                        className="sp-btn sp-btn--danger"
                        onClick={() => {
                          dispatch({ type: 'note/delete', id: note.id })
                          toast('Note deleted')
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  {editingId === note.id ? (
                    <textarea className="sp-textarea" rows={3} value={draft} onChange={(e) => setDraft(e.target.value)} />
                  ) : (
                    <p>{note.body}</p>
                  )}
                </article>
              ))}
              {notes.length === 0 && <div className="sp-empty">No notes yet. Tap any verse while reading to add one.</div>}
            </div>
          </>
        )}

        {tab === 'highlights' && (
          <div className="sp-stack">
            {highlights.map((highlight) => {
              const text = highlight.text || bible?.verse(highlight.ref) || ''
              return (
                <article key={highlight.id} className="sp-entry sp-entry--highlight">
                  <div className="sp-entry__head">
                    <div>
                      <div className="sp-entry__title">{formatVerse(highlight.ref)}</div>
                      <div className="sp-entry__meta">{formatWhen(highlight.createdAt)}</div>
                    </div>
                    <div className="sp-entry__actions">
                      <button
                        type="button"
                        className="sp-btn sp-btn--ghost"
                        onClick={() =>
                          navigate(readerHref(highlight.ref.book, highlight.ref.chapter, { verse: highlight.ref.verse }))
                        }
                      >
                        Open
                      </button>
                      <button
                        type="button"
                        className="sp-btn sp-btn--danger"
                        onClick={() => {
                          dispatch({ type: 'highlight/toggle', ref: highlight.ref, text })
                          toast('Highlight removed')
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <p>{text || 'Loading the verse…'}</p>
                </article>
              )
            })}
            {highlights.length === 0 && <div className="sp-empty">Nothing highlighted yet.</div>}
          </div>
        )}
      </div>
    </Screen>
  )
}
