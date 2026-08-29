import { useEffect } from 'react'
import { useRoute } from './router'
import { prefetchBible } from './data/bible'
import { StoreProvider } from './store/store'
import { ToastProvider } from './components/Toast'
import { Sidebar } from './components/Sidebar'
import { Dashboard } from './screens/Dashboard'
import { MyPlan } from './screens/MyPlan'
import { Library } from './screens/Library'
import { Reader } from './screens/Reader'
import { StudyTools } from './screens/StudyTools'
import { Progress } from './screens/Progress'
import { Notes } from './screens/Notes'
import { Favorites } from './screens/Favorites'
import { Community } from './screens/Community'
import { Settings } from './screens/Settings'

function CurrentScreen() {
  const route = useRoute()

  switch (route.segments[0]) {
    case undefined:
      return <Dashboard />
    case 'plan':
      return <MyPlan />
    case 'library':
      return <Library />
    case 'read':
      return <Reader />
    case 'tools':
      return <StudyTools />
    case 'progress':
      return <Progress />
    case 'notes':
      return <Notes />
    case 'favorites':
      return <Favorites />
    case 'community':
      return <Community />
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
