import { dashboardData } from './data/mock'
import { ContinuePlanCard } from './components/ContinuePlanCard'
import { Header } from './components/Header'
import { RecentActivityCard } from './components/RecentActivityCard'
import { RootedBanner } from './components/RootedBanner'
import { Sidebar } from './components/Sidebar'
import { StatsCard } from './components/StatsCard'
import { TodaysProgressCard } from './components/TodaysProgressCard'
import { ToolsCard } from './components/ToolsCard'
import { WeeklyProgressCard } from './components/WeeklyProgressCard'

export default function App() {
  const data = dashboardData

  return (
    <div className="app">
      <Sidebar
        nav={data.nav}
        activeNavId={data.activeNavId}
        user={data.user}
        verse={data.verseOfTheDay}
      />

      <main className="main">
        <Header
          greeting={data.greeting}
          userName={data.user.name}
          subtitle={data.greetingSubtitle}
        />

        <div className="grid">
          <TodaysProgressCard today={data.today} />
          <WeeklyProgressCard weekly={data.weekly} />
          <ContinuePlanCard plan={data.plan} />
          <StatsCard stats={data.stats} period={data.statsPeriod} />
          <RecentActivityCard activity={data.activity} />

          <div className="side-stack">
            <ToolsCard tools={data.tools} />
            <RootedBanner banner={data.banner} />
          </div>
        </div>
      </main>
    </div>
  )
}
