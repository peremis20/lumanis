/**
 * Reader — the screen where studying actually happens.
 *
 * Selecting a verse opens the actions the rest of the app is built on:
 * highlight, note, favourite, copy. Time on the page is measured and written
 * to the session log when the reading is marked complete, which is what moves
 * the dashboard ring, the weekly dots and every stat.
 */
import { useEffect, useMemo, useRef, useState } from 'react'
import { navigate, readerHref, useRoute } from '../router'
import { useStore } from '../store/store'
import { isFavorite, isHighlighted, notesFor } from '../store/derive'
import { useBible } from '../data/useBible'
import { formatRange, formatVerse, getPlan } from '../data/plans'
import { COMMENTARIES } from '../data/reference'
import { TopBar } from '../components/TopBar'
import { useToast } from '../components/Toast'
import { Screen } from '../components/Screen'

export function Reader() {
  const route = useRoute()
  const bible = useBible()
  const { state, dispatch } = useStore()
  const toast = useToast()

  const book = route.segments[1] ?? 'Philippians'
  const chapter = Number(route.segments[2] ?? 1)
  const focusVerse = Number(route.query.get('verse') ?? 0)
  const dayId = route.query.get('day')

  const planDay = useMemo(() => {
    if (!dayId) return null
    for (const plan of [getPlan(state.activePlanId)]) {
      const day = plan.days.find((d) => d.id === dayId)
      if (day) return day
    }
    return null
  }, [dayId, state.activePlanId])

  const [selected, setSelected] = useState<number | null>(focusVerse || null)
  const [noteDraft, setNoteDraft] = useState('')
  const [reflection, setReflection] = useState('')
  const startedAt = useRef(Date.now())
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    startedAt.current = Date.now()
    setElapsed(0)
    setSelected(focusVerse || null)
    const timer = window.setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAt.current) / 1000))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [book, chapter, focusVerse])

  useEffect(() => {
    if (!focusVerse) return
    const el = document.getElementById(`verse-${focusVerse}`)
    el?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, [focusVerse, bible])

  const verses = bible?.chapter(book, chapter) ?? []
  const meta = bible?.book(book)
  const chapterNotes = state.notes.filter((n) => n.ref?.book === book && n.ref.chapter === chapter)
  const commentary = COMMENTARIES.filter((c) => c.book === book && c.chapter === chapter)

  const inRange = (verse: number) => (planDay ? verse >= planDay.from && verse <= planDay.to : true)

  const selectedRef = selected ? { book, chapter, verse: selected } : null
  const selectedText = selected ? (verses[selected - 1] ?? '') : ''

  const minutes = Math.max(1, Math.round(elapsed / 60))

  const complete = () => {
    const counted = planDay ? planDay.to - planDay.from + 1 : verses.length
    dispatch({
      type: 'reading/complete',
      ref: { book, chapter },
      verses: counted,
      minutes,
      planDayId: planDay?.id,
      label: planDay
        ? formatRange(planDay.book, planDay.chapter, planDay.from, planDay.to)
        : `${book === 'Psalms' ? 'Psalm' : book} ${chapter}`,
    })
    if (reflection.trim()) {
      dispatch({
        type: 'note/add',
        ref: { book, chapter, verse: planDay?.from ?? 1 },
        body: reflection.trim(),
      })
    }
    toast(`Logged ${minutes} min · ${counted} verses`)
    navigate(planDay ? '#/learning/courses' : '#/')
  }

  const title = `${book === 'Psalms' ? 'Psalm' : book} ${chapter}`

  return (
    <Screen>
      <TopBar
        title={planDay ? planDay.title : title}
        subtitle={
          planDay
            ? `${getPlan(state.activePlanId).title} · ${formatRange(planDay.book, planDay.chapter, planDay.from, planDay.to)}`
            : 'King James Version · public domain'
        }
      />

      <div className="sp-reader">
        <div className="sp-card sp-reader__text">
          <div className="sp-reader__bar">
            <button type="button" className="sp-btn sp-btn--ghost" onClick={() => navigate('#/library/bible')}>
              ← Library
            </button>
            <div className="sp-reader__nav">
              <button
                type="button"
                className="sp-btn sp-btn--ghost"
                disabled={chapter <= 1}
                onClick={() => navigate(readerHref(book, chapter - 1))}
              >
                Previous
              </button>
              <span className="sp-reader__count">
                Chapter {chapter}
                {meta ? ` of ${meta.chapters}` : ''}
              </span>
              <button
                type="button"
                className="sp-btn sp-btn--ghost"
                disabled={!meta || chapter >= meta.chapters}
                onClick={() => navigate(readerHref(book, chapter + 1))}
              >
                Next
              </button>
            </div>
          </div>

          {planDay && (
            <div className="sp-reader__prompt">
              <div className="sp-reader__prompt-label">Today’s question</div>
              <div>{planDay.prompt}</div>
            </div>
          )}

          {!bible && <div className="sp-empty">Loading the text…</div>}
          {bible && verses.length === 0 && (
            <div className="sp-empty">That chapter is not in this book. Try the library.</div>
          )}

          <div className="sp-verses">
            {verses.map((text, index) => {
              const verse = index + 1
              const ref = { book, chapter, verse }
              const on = selected === verse
              return (
                <p
                  key={verse}
                  id={`verse-${verse}`}
                  className={[
                    'sp-verse',
                    isHighlighted(state, ref) ? 'sp-verse--highlighted' : '',
                    on ? 'sp-verse--selected' : '',
                    planDay && !inRange(verse) ? 'sp-verse--dim' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => setSelected(on ? null : verse)}
                >
                  <span className="sp-verse__num">{verse}</span>
                  {text}
                  {notesFor(state, ref).length > 0 && <span className="sp-verse__flag" title="You have a note here" />}
                </p>
              )
            })}
          </div>
        </div>

        <aside className="sp-reader__side">
          <div className="sp-card">
            <div className="sp-card__title">This session</div>
            <div className="sp-session">
              <div className="sp-session__time">
                {String(Math.floor(elapsed / 60)).padStart(2, '0')}:{String(elapsed % 60).padStart(2, '0')}
              </div>
              <div className="sp-session__label">
                {planDay
                  ? `Reading ${formatRange(planDay.book, planDay.chapter, planDay.from, planDay.to)}`
                  : `Reading ${title}`}
              </div>
            </div>
            {planDay && (
              <label className="sp-field">
                <span>Reflection (saved as a note)</span>
                <textarea
                  rows={4}
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder="Write as much or as little as you want."
                />
              </label>
            )}
            <button type="button" className="sp-btn sp-btn--block" onClick={complete}>
              {planDay ? 'Mark day complete' : 'Mark chapter read'}
            </button>
            <p className="sp-hint">Logs {minutes} min toward today’s goal.</p>
          </div>

          <div className="sp-card">
            <div className="sp-card__title">{selectedRef ? formatVerse(selectedRef) : 'Verse actions'}</div>
            {!selectedRef && <div className="sp-empty sp-empty--small">Tap any verse to highlight, note or save it.</div>}
            {selectedRef && (
              <>
                <blockquote className="sp-quote">{selectedText}</blockquote>
                <div className="sp-action-row">
                  <button
                    type="button"
                    className={`sp-chip${isHighlighted(state, selectedRef) ? ' sp-chip--on' : ''}`}
                    onClick={() => dispatch({ type: 'highlight/toggle', ref: selectedRef, text: selectedText })}
                  >
                    {isHighlighted(state, selectedRef) ? 'Highlighted' : 'Highlight'}
                  </button>
                  <button
                    type="button"
                    className={`sp-chip${isFavorite(state, selectedRef) ? ' sp-chip--on' : ''}`}
                    onClick={() => dispatch({ type: 'favorite/toggle', ref: selectedRef, text: selectedText })}
                  >
                    {isFavorite(state, selectedRef) ? 'Favorited' : 'Favorite'}
                  </button>
                  <button
                    type="button"
                    className="sp-chip"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(`“${selectedText}” — ${formatVerse(selectedRef)}`)
                        toast('Verse copied')
                      } catch {
                        toast('Copying is blocked in this browser')
                      }
                    }}
                  >
                    Copy
                  </button>
                </div>
                <label className="sp-field">
                  <span>Add a note</span>
                  <textarea
                    rows={3}
                    value={noteDraft}
                    onChange={(e) => setNoteDraft(e.target.value)}
                    placeholder={`What is this saying to you?`}
                  />
                </label>
                <button
                  type="button"
                  className="sp-btn sp-btn--block"
                  disabled={!noteDraft.trim()}
                  onClick={() => {
                    dispatch({ type: 'note/add', ref: selectedRef, body: noteDraft.trim() })
                    setNoteDraft('')
                    toast('Note saved')
                  }}
                >
                  Save note
                </button>
              </>
            )}
          </div>

          {commentary.length > 0 && (
            <div className="sp-card">
              <div className="sp-card__title">Commentary</div>
              {commentary.map((entry) => (
                <div key={entry.id} className="sp-commentary">
                  <div className="sp-commentary__heading">{entry.heading}</div>
                  <div className="sp-commentary__range">{entry.book} {entry.range}</div>
                  <p>{entry.body}</p>
                </div>
              ))}
            </div>
          )}

          {chapterNotes.length > 0 && (
            <div className="sp-card">
              <div className="sp-card__title">Your notes here</div>
              {chapterNotes.map((note) => (
                <div key={note.id} className="sp-note-row">
                  <div className="sp-note-row__ref">{note.ref ? formatVerse(note.ref) : ''}</div>
                  <div className="sp-note-row__body">{note.body}</div>
                </div>
              ))}
            </div>
          )}
        </aside>
      </div>
    </Screen>
  )
}
