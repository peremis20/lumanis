/**
 * Sidebar — six destinations, two of which open into sub-sections.
 *
 * The row styling is the handoff design's: same metrics, same active
 * treatment (dark ground, currentColor glyph at 1.8 stroke). Sub-rows are a
 * new, quieter tier that indents to the parent's label.
 */
import { useEffect, useState, type ReactNode } from 'react'
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

type NavChild = { label: string; href: string; match: string }

type NavItem = {
  id: string
  label: string
  href: string
  match: string
  glyph: ReactNode
  children?: NavChild[]
}

const NAV: NavItem[] = [
  {
    id: 'dashboard',
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
    id: 'learning',
    label: 'My Learning',
    href: '#/learning/courses',
    match: '/learning',
    glyph: (
      <>
        <path d="M12 7.5 3.5 4.5 12 1.5l8.5 3z" />
        <path d="M6 9.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3V9.5" />
        <path d="M20.5 4.5v6" />
      </>
    ),
    children: [
      { label: 'My Courses', href: '#/learning/courses', match: '/learning/courses' },
      { label: 'Continue Learning', href: '#/learning/continue', match: '/learning/continue' },
      { label: 'Progress', href: '#/learning/progress', match: '/learning/progress' },
    ],
  },
  {
    id: 'library',
    label: 'Library',
    href: '#/library/bible',
    match: '/library',
    glyph: (
      <>
        <path d="M4 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4z" />
        <path d="M20 4h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6z" />
      </>
    ),
    children: [
      { label: 'Bible', href: '#/library/bible', match: '/library/bible' },
      { label: 'Study Tools', href: '#/library/tools', match: '/library/tools' },
      { label: 'Notes & Highlights', href: '#/library/notes', match: '/library/notes' },
    ],
  },
  {
    id: 'community',
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
    id: 'favorites',
    label: 'Favorites',
    href: '#/favorites',
    match: '/favorites',
    glyph: <path d="M12 4l2.5 5.2 5.5.8-4 3.9 1 5.6-5-2.9-5 2.9 1-5.6-4-3.9 5.5-.8z" />,
  },
  {
    id: 'settings',
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

/** The design's nav row. */
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

/** Reading a chapter belongs to whichever section sent you there. */
function sectionForPath(path: string, query: URLSearchParams): string | null {
  if (path.startsWith('/read')) return query.get('day') ? '/learning' : '/library'
  const item = NAV.find((n) => (n.match === '/' ? path === '/' : path.startsWith(n.match)))
  return item?.match ?? null
}

export function Sidebar() {
  const route = useRoute()
  const { state, dispatch } = useStore()
  const toast = useToast()

  const section = sectionForPath(route.path, route.query)
  const [open, setOpen] = useState<string | null>(section)

  // Following a link into a section opens that section.
  useEffect(() => {
    if (section) setOpen(section)
  }, [section])

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

      <nav className="sp-nav" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {NAV.map((item) => {
          const on = section === item.match
          const expanded = item.children ? open === item.match : false
          return (
            <div key={item.id}>
              <div
                role="link"
                tabIndex={0}
                aria-current={on ? 'page' : undefined}
                aria-expanded={item.children ? expanded : undefined}
                className={on ? undefined : 'sp-nav-row'}
                onKeyDown={(e) => e.key === 'Enter' && navigate(item.href)}
                onClick={() => {
                  // Opens the section and goes to its first screen. Collapsing
                  // is the chevron's job, so a second click never hides the
                  // sub-nav you are currently using.
                  if (item.children) setOpen(item.match)
                  navigate(item.href)
                }}
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
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.children && (
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={on ? 'currentColor' : '#A09A8E'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    role="button"
                    aria-label={expanded ? `Collapse ${item.label}` : `Expand ${item.label}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      setOpen(expanded ? null : item.match)
                    }}
                    style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 140ms ease' }}
                  >
                    <path d="M6 9.5l6 6 6-6" />
                  </svg>
                )}
              </div>

              {item.children && expanded && (
                <div className="sp-subnav">
                  {item.children.map((child) => {
                    const childOn = route.path.startsWith(child.match)
                    return (
                      <div
                        key={child.href}
                        role="link"
                        tabIndex={0}
                        aria-current={childOn ? 'page' : undefined}
                        className={`sp-subnav__row${childOn ? ' sp-subnav__row--on' : ''}`}
                        onKeyDown={(e) => e.key === 'Enter' && navigate(child.href)}
                        onClick={() => navigate(child.href)}
                      >
                        {child.label}
                      </div>
                    )
                  })}
                </div>
              )}
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
          role="link"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && navigate('#/settings')}
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
