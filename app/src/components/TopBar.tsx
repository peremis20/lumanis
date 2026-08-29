/**
 * The design's <header>, reused on every screen: greeting/title on the left,
 * search + notifications + New Study on the right. All three are live.
 *
 * Panels are positioned against the measured anchor rather than a wrapper, so
 * the header's DOM stays exactly as designed while nothing is open.
 */
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { navigate, readerHref } from '../router'
import { useStore } from '../store/store'
import { formatWhen, unreadCount } from '../store/derive'
import { formatVerse, PLANS } from '../data/plans'
import { useBible } from '../data/useBible'
import { Modal } from './Modal'
import { useToast } from './Toast'

type TopBarProps = {
  title: ReactNode
  subtitle: string
}

export function TopBar({ title, subtitle }: TopBarProps) {
  const { state, dispatch } = useStore()
  const bible = useBible()
  const toast = useToast()

  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [bellOpen, setBellOpen] = useState(false)
  const [planPickerOpen, setPlanPickerOpen] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const [anchor, setAnchor] = useState<DOMRect | null>(null)

  const unread = unreadCount(state)

  useEffect(() => {
    if (!searchOpen) return
    const close = () => setSearchOpen(false)
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [searchOpen])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (q.length < 2) return null
    return {
      verses: bible?.search(query, 8) ?? [],
      notes: state.notes.filter((n) => n.body.toLowerCase().includes(q)).slice(0, 4),
      plans: PLANS.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.forWhom.toLowerCase().includes(q) ||
          p.book.toLowerCase().includes(q),
      ).slice(0, 3),
      loading: !bible,
    }
  }, [query, bible, state.notes])

  const openSearch = () => {
    setAnchor(searchRef.current?.getBoundingClientRect() ?? null)
    setSearchOpen(true)
  }

  const go = (href: string) => {
    setSearchOpen(false)
    setBellOpen(false)
    setQuery('')
    navigate(href)
  }

  return (
    <>
      <header style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
        <div style={{ flex: '1', minWidth: '0' }}>
          <h1
            style={{ margin: '0', fontFamily: "'Source Serif 4',serif", fontSize: '31px', fontWeight: '600', letterSpacing: '-0.4px', color: '#16452F', whiteSpace: 'nowrap' }}
          >
            {title}
          </h1>
          <div style={{ marginTop: '8px', fontSize: '14.5px', color: '#6E6A62' }}>{subtitle}</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '4px' }}>
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '256px', height: '46px', padding: '0 16px', background: '#FFFFFF', border: '1px solid #ECE7DC', borderRadius: '11px' }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#8B8579" strokeWidth="1.9" strokeLinecap="round">
              <circle cx="11" cy="11" r="6.5" />
              <path d="M16 16l4.5 4.5" />
            </svg>
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                openSearch()
              }}
              onFocus={openSearch}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setSearchOpen(false)
                if (e.key === 'Enter' && results?.verses.length) {
                  const first = results.verses[0]
                  go(readerHref(first.ref.book, first.ref.chapter, { verse: first.ref.verse }))
                }
              }}
              placeholder="Search..."
              aria-label="Search scripture, notes and plans"
              style={{ flex: '1', border: 'none', outline: 'none', background: 'transparent', fontSize: '14px', color: '#22201C' }}
            />
          </div>

          <div
            role="button"
            tabIndex={0}
            aria-label="Notifications"
            aria-expanded={bellOpen}
            onKeyDown={(e) => e.key === 'Enter' && setBellOpen((v) => !v)}
            onClick={() => setBellOpen((v) => !v)}
            style={{ position: 'relative', cursor: 'pointer', padding: '4px' }}
          >
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#3F3B34" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 10a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 14 6 10z" />
              <path d="M10 19a2.2 2.2 0 0 0 4 0" />
            </svg>
            {unread > 0 && (
              <div style={{ position: 'absolute', top: '3px', right: '3px', width: '8px', height: '8px', borderRadius: '50%', background: '#E07A2F', border: '1.5px solid #FBFAF6' }} />
            )}
            {bellOpen && (
              <div className="sp-panel sp-panel--bell" onClick={(e) => e.stopPropagation()}>
                <div className="sp-panel__head">
                  <span>Notifications</span>
                  <button
                    type="button"
                    className="sp-link"
                    onClick={() => {
                      dispatch({ type: 'notifications/readAll' })
                      toast('All notifications marked read')
                    }}
                  >
                    Mark all read
                  </button>
                </div>
                {state.notifications.length === 0 && <div className="sp-panel__empty">You are all caught up.</div>}
                {state.notifications.map((n) => (
                  <div key={n.id} className={`sp-notif${n.read ? '' : ' sp-notif--unread'}`}>
                    <button type="button" className="sp-notif__body" onClick={() => n.href && go(n.href)}>
                      <div className="sp-notif__title">{n.title}</div>
                      <div className="sp-notif__detail">{n.detail}</div>
                      <div className="sp-notif__time">{formatWhen(n.at)}</div>
                    </button>
                    <button
                      type="button"
                      className="sp-icon-btn"
                      aria-label="Dismiss"
                      onClick={() => dispatch({ type: 'notification/dismiss', id: n.id })}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B8579" strokeWidth="2.2" strokeLinecap="round">
                        <path d="M6 6l12 12M18 6L6 18" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            className="hv-9"
            role="button"
            tabIndex={0}
            aria-label="Start a new study"
            onKeyDown={(e) => e.key === 'Enter' && setPlanPickerOpen(true)}
            onClick={() => setPlanPickerOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '9px', height: '46px', padding: '0 20px', background: '#16452F', color: '#FFFFFF', borderRadius: '11px', fontSize: '14.5px', fontWeight: '600', cursor: 'pointer' }}
          >
            New Study
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>
        </div>
      </header>

      {searchOpen && results && anchor && (
        <>
          <div className="sp-scrim-transparent" onClick={() => setSearchOpen(false)} />
          <div className="sp-panel sp-panel--search" style={{ top: anchor.bottom + 8, left: anchor.left - 120, width: 420 }}>
            {results.loading && <div className="sp-panel__empty">Loading scripture…</div>}
            {results.plans.length > 0 && (
              <div className="sp-panel__group">
                <div className="sp-panel__label">Study plans</div>
                {results.plans.map((p) => (
                  <button key={p.id} type="button" className="sp-result" onClick={() => go('#/plan?plan=' + p.id)}>
                    <span className="sp-result__title">{p.title}</span>
                    <span className="sp-result__meta">{p.forWhom}</span>
                  </button>
                ))}
              </div>
            )}
            {results.notes.length > 0 && (
              <div className="sp-panel__group">
                <div className="sp-panel__label">Your notes</div>
                {results.notes.map((n) => (
                  <button key={n.id} type="button" className="sp-result" onClick={() => go('#/notes')}>
                    <span className="sp-result__title">{n.ref ? formatVerse(n.ref) : 'Note'}</span>
                    <span className="sp-result__meta">{n.body.slice(0, 70)}</span>
                  </button>
                ))}
              </div>
            )}
            {results.verses.length > 0 && (
              <div className="sp-panel__group">
                <div className="sp-panel__label">Scripture</div>
                {results.verses.map((hit) => (
                  <button
                    key={`${hit.ref.book}${hit.ref.chapter}${hit.ref.verse}`}
                    type="button"
                    className="sp-result"
                    onClick={() => go(readerHref(hit.ref.book, hit.ref.chapter, { verse: hit.ref.verse }))}
                  >
                    <span className="sp-result__title">{formatVerse(hit.ref)}</span>
                    <span className="sp-result__meta">{hit.text.slice(0, 90)}</span>
                  </button>
                ))}
              </div>
            )}
            {!results.loading &&
              results.verses.length + results.notes.length + results.plans.length === 0 && (
                <div className="sp-panel__empty">Nothing found for “{query}”.</div>
              )}
          </div>
        </>
      )}

      {planPickerOpen && (
        <Modal
          title="Start a new study"
          subtitle="Pick the plan that fits where you actually are right now."
          onClose={() => setPlanPickerOpen(false)}
          width={620}
        >
          <div className="sp-plan-grid">
            {PLANS.map((plan) => {
              const active = plan.id === state.activePlanId
              return (
                <button
                  key={plan.id}
                  type="button"
                  className={`sp-plan-card${active ? ' sp-plan-card--active' : ''}`}
                  onClick={() => {
                    dispatch({ type: 'plan/activate', planId: plan.id })
                    setPlanPickerOpen(false)
                    toast(`${plan.title} is now your plan`)
                    navigate('#/plan')
                  }}
                >
                  <div className="sp-plan-card__title">{plan.title}</div>
                  <div className="sp-plan-card__meta">
                    {plan.book} · {plan.level} · {plan.days.length} days
                  </div>
                  <div className="sp-plan-card__for">{plan.forWhom}</div>
                  <div className="sp-plan-card__summary">{plan.summary}</div>
                  {active && <div className="sp-plan-card__badge">Current plan</div>}
                </button>
              )
            })}
          </div>
        </Modal>
      )}
    </>
  )
}
