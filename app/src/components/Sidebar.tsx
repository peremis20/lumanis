/**
 * Sidebar — the design's <aside>, style for style, with every row wired.
 *
 * The nav rows in the design are nine repetitions of one style object with a
 * different glyph, so they are built from a list here; the active row keeps the
 * design's own treatment (dark ground, currentColor glyph at 1.8 stroke).
 */
import type { ReactNode } from 'react'
import { navigate, useRoute } from '../router'
import { useStore } from '../store/store'
import { ImageSlot } from '../ImageSlot'
import { useToast } from './Toast'

const VERSE_OF_DAY = {
  text: 'Your word is a lamp to my feet and a light to my path.',
  reference: 'Psalm 119:105',
  book: 'Psalms',
  chapter: 119,
  verse: 105,
}

type NavItem = { label: string; href: string; match: string; glyph: ReactNode }

const NAV: NavItem[] = [
  {
    label: 'Dashboard',
    href: '#/',
    match: '/',
    glyph: (
      <>
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V20h14V9.5" />
      </>
    ),
  },
  {
    label: 'My Plan',
    href: '#/plan',
    match: '/plan',
    glyph: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M3 10h18M8 3v4M16 3v4" />
      </>
    ),
  },
  {
    label: 'Bible Library',
    href: '#/library',
    match: '/library',
    glyph: (
      <>
        <path d="M4 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4z" />
        <path d="M20 4h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6z" />
      </>
    ),
  },
  {
    label: 'Study Tools',
    href: '#/tools',
    match: '/tools',
    glyph: <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z" />,
  },
  {
    label: 'Progress',
    href: '#/progress',
    match: '/progress',
    glyph: (
      <>
        <path d="M3 17l6-6 4 3 8-8" />
        <path d="M16 6h5v5" />
      </>
    ),
  },
  {
    label: 'Notes & Highlights',
    href: '#/notes',
    match: '/notes',
    glyph: <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z" />,
  },
  {
    label: 'Favorites',
    href: '#/favorites',
    match: '/favorites',
    glyph: <path d="M12 4l2.5 5.2 5.5.8-4 3.9 1 5.6-5-2.9-5 2.9 1-5.6-4-3.9 5.5-.8z" />,
  },
  {
    label: 'Community',
    href: '#/community',
    match: '/community',
    glyph: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5" />
        <path d="M16 6.5a2.8 2.8 0 0 1 0 5.4M17 14.5c2.4.6 4 2.3 4 4.5" />
      </>
    ),
  },
  {
    label: 'Settings',
    href: '#/settings',
    match: '/settings',
    glyph: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v2.5M12 18.5V21M4.2 7.5l2.2 1.3M17.6 15.2l2.2 1.3M4.2 16.5l2.2-1.3M17.6 8.8l2.2-1.3" />
      </>
    ),
  },
]

const ROW = {
  display: 'flex',
  alignItems: 'center',
  gap: '13px',
  padding: '13px 16px',
  borderRadius: '11px',
  fontSize: '14.5px',
  fontWeight: '500',
  cursor: 'pointer',
} as const

export function Sidebar() {
  const route = useRoute()
  const { state, dispatch } = useStore()
  const toast = useToast()

  const active = (item: NavItem) =>
    item.match === '/' ? route.path === '/' : route.path.startsWith(item.match)

  const shareVerse = async () => {
    const text = `“${VERSE_OF_DAY.text}” — ${VERSE_OF_DAY.reference}`
    try {
      await navigator.clipboard.writeText(text)
      toast('Verse copied to your clipboard')
    } catch {
      toast('Copying is blocked in this browser')
    }
  }

  return (
    <aside
      style={{ width: '258px', flex: 'none', background: '#FFFFFF', borderRight: '1px solid #ECE7DC', display: 'flex', flexDirection: 'column', padding: '26px 20px 18px', gap: '26px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '11px', paddingLeft: '6px' }}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#1E6B45" strokeWidth="1.7" strokeLinecap="round">
          <path d="M12 21c0-7 3-12 9-14-1 9-4 13-9 14z" fill="#2E8B57" stroke="none" />
          <path d="M12 21C7 19 3 14 3 6c5 1 8 5 9 9" fill="#1E6B45" stroke="none" />
          <path d="M12 21v-8" />
        </svg>
        <div>
          <div style={{ fontFamily: "'Source Serif 4',serif", fontSize: '20px', fontWeight: '700', color: '#16452F', letterSpacing: '-0.2px' }}>
            ScripturePath
          </div>
          <div style={{ fontSize: '11px', color: '#8B8579', marginTop: '1px' }}>Study. Grow. Live.</div>
        </div>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {NAV.map((item) => {
          const on = active(item)
          return (
            <div
              key={item.label}
              role="link"
              tabIndex={0}
              aria-current={on ? 'page' : undefined}
              className={on ? undefined : 'sp-nav-row'}
              onKeyDown={(e) => e.key === 'Enter' && navigate(item.href)}
              onClick={() => navigate(item.href)}
              style={on ? { ...ROW, background: '#16452F', color: '#FFFFFF' } : { ...ROW, color: '#3F3B34' }}
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke={on ? 'currentColor' : '#5C7566'}
                strokeWidth={on ? '1.8' : '1.7'}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {item.glyph}
              </svg>
              {item.label}
            </div>
          )
        })}
      </nav>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div style={{ border: '1px solid #ECE7DC', borderRadius: '14px', padding: '17px 18px 15px', background: '#FFFDF9' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ fontFamily: "'Source Serif 4',serif", fontSize: '15.5px', fontWeight: '600', color: '#22201C' }}>
              Verse of the Day
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E89B3C" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2.5v2M12 19.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M6 18l1.4-1.4M16.6 7.4 18 6" />
            </svg>
          </div>
          <div style={{ fontSize: '14px', lineHeight: '1.55', color: '#3F3B34', textWrap: 'pretty' }}>
            {VERSE_OF_DAY.text}
          </div>
          <div style={{ fontSize: '12.5px', color: '#8B8579', marginTop: '11px' }}>{VERSE_OF_DAY.reference}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0', justifyContent: 'space-between', marginTop: '16px' }}>
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              stroke="#D97B2E"
              strokeWidth="1.8"
              strokeLinecap="round"
              role="button"
              aria-label="Favorite the verse of the day"
              onClick={() => {
                dispatch({ type: 'verseOfDay/toggleFavorite' })
                dispatch({
                  type: 'favorite/toggle',
                  ref: { book: VERSE_OF_DAY.book, chapter: VERSE_OF_DAY.chapter, verse: VERSE_OF_DAY.verse },
                  text: VERSE_OF_DAY.text,
                })
                toast(state.verseOfDayFavorite ? 'Removed from favorites' : 'Saved to favorites')
              }}
              style={{ cursor: 'pointer' }}
              fill={state.verseOfDayFavorite ? '#D97B2E' : 'none'}
            >
              <path d="M12 20s-7-4.4-7-9.2A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7 2.8C19 15.6 12 20 12 20z" />
            </svg>
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#5C7566"
              strokeWidth="1.8"
              strokeLinecap="round"
              role="button"
              aria-label="Copy the verse of the day"
              onClick={shareVerse}
              style={{ cursor: 'pointer' }}
            >
              <circle cx="18" cy="5.5" r="2.5" />
              <circle cx="6" cy="12" r="2.5" />
              <circle cx="18" cy="18.5" r="2.5" />
              <path d="M8.3 10.8 15.7 6.8M8.3 13.2l7.4 4" />
            </svg>
          </div>
        </div>

        <div
          onClick={() => navigate('#/settings')}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '16px', borderTop: '1px solid #ECE7DC', cursor: 'pointer' }}
        >
          <div style={{ width: '42px', height: '42px', flex: 'none', borderRadius: '50%', overflow: 'hidden', background: '#EEEAE0' }}>
            <ImageSlot
              id="avatar"
              shape="circle"
              placeholder="Avatar"
              src={state.settings.avatarUrl || undefined}
              alt={state.settings.userName}
              style={{ width: '42px', height: '42px' }}
            />
          </div>
          <div style={{ flex: '1' }}>
            <div style={{ fontSize: '14.5px', fontWeight: '600', color: '#22201C' }}>{state.settings.userName}</div>
            <div style={{ fontSize: '12.5px', color: '#8B8579' }}>Edit Profile</div>
          </div>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#8B8579" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9.5l6 6 6-6" />
          </svg>
        </div>
      </div>
    </aside>
  )
}
