import { useEffect } from 'react'
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

export default function App() {
  useEffect(prefetchBible, [])

  return (
    <StoreProvider>
      <ToastProvider>
        <div
          style={{ display: 'flex', minHeight: '100vh', fontFamily: "'DM Sans',sans-serif", color: '#22201C', background: '#FBFAF6' }}
        >
          <Sidebar />
          <CurrentScreen />
        </div>
      </ToastProvider>
    </StoreProvider>
  )
}
