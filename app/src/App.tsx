import { useEffect, useState } from 'react'
import { canonicalHref, redirect, useRoute } from './router'
import { prefetchBible } from './data/bible'
import { StoreProvider } from './store/store'
import { ToastProvider } from './components/Toast'
import { Sidebar } from './components/Sidebar'
import { Dashboard } from './screens/Dashboard'
import { Courses } from './screens/Courses'
import { ContinueLearning } from './screens/ContinueLearning'
import { Progress } from './screens/Progress'
import { Library } from './screens/Library'
import { Reader } from './screens/Reader'
import { StudyTools } from './screens/StudyTools'
import { Notes } from './screens/Notes'
import { Favorites } from './screens/Favorites'
import { Community } from './screens/Community'
import { Settings } from './screens/Settings'

function CurrentScreen() {
  const route = useRoute()
  const [section, page] = route.segments

  // Legacy hrefs (#/plan, #/notes, …) resolve to their new home.
  const canonical = canonicalHref(route)
  useEffect(() => {
    if (canonical) redirect(canonical)
  }, [canonical])
  if (canonical) return null

  switch (section) {
    case undefined:
      return <Dashboard />

    case 'learning':
      if (page === 'continue') return <ContinueLearning />
      if (page === 'progress') return <Progress />
      return <Courses />

    case 'library':
      if (page === 'tools') return <StudyTools />
      if (page === 'notes') return <Notes />
      return <Library />

    case 'read':
      return <Reader />
    case 'community':
      return <Community />
    case 'favorites':
      return <Favorites />
    case 'settings':
      return <Settings />
    default:
      return <Dashboard />
  }
}

/**
 * Below 1120px the design's fixed-width column cannot fit, so the sidebar
 * becomes a drawer and a compact bar carries the menu button.
 */
function Shell() {
  const route = useRoute()
  const [navOpen, setNavOpen] = useState(false)

  // Any navigation closes the drawer.
  useEffect(() => setNavOpen(false), [route.path])

  return (
    <>
      <div className="sp-mobile-bar">
        <button
          type="button"
          className="sp-burger"
          aria-label="Open the menu"
          aria-expanded={navOpen}
          onClick={() => setNavOpen(true)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22201C" strokeWidth="1.9" strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1E6B45" strokeWidth="1.7" strokeLinecap="round">
          <path d="M12 21c0-7 3-12 9-14-1 9-4 13-9 14z" fill="#2E8B57" stroke="none" />
          <path d="M12 21C7 19 3 14 3 6c5 1 8 5 9 9" fill="#1E6B45" stroke="none" />
        </svg>
        <span className="sp-mobile-bar__brand">ScripturePath</span>
      </div>

      <div
        className="sp-shell"
        style={{ display: 'flex', minHeight: '100vh', fontFamily: "'DM Sans',sans-serif", color: '#22201C', background: '#FBFAF6' }}
      >
        <Sidebar drawerOpen={navOpen} />
        <CurrentScreen />
      </div>

      {navOpen && <div className="sp-nav-scrim" onClick={() => setNavOpen(false)} />}
    </>
  )
}

export default function App() {
  useEffect(prefetchBible, [])

  return (
    <StoreProvider>
      <ToastProvider>
        <Shell />
      </ToastProvider>
    </StoreProvider>
  )
}
