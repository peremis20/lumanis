/** Shape of everything the dashboard renders. Swap the mock for an API later. */

export type IconKey =
  | 'home'
  | 'calendar'
  | 'book-nav'
  | 'book'
  | 'pencil'
  | 'trend'
  | 'star'
  | 'community'
  | 'settings'
  | 'clock'
  | 'note'
  | 'commentary'
  | 'map-pin'
  | 'dictionary'

/** Tinted icon tiles; each tone pairs a background with an icon colour. */
export type Tone = 'green' | 'orange' | 'amber' | 'blue'

export type NavItem = {
  id: string
  label: string
  icon: IconKey
}

export type User = {
  name: string
  avatarUrl?: string
}

export type Verse = {
  text: string
  reference: string
}

export type TodaysProgress = {
  dailyGoalPercent: number
  timeStudied: string
  versesStudied: number
  encouragement: string
}

export type DayState = 'done' | 'today' | 'upcoming'

export type WeekDay = {
  label: string
  state: DayState
}

export type WeeklyProgress = {
  daysCompleted: number
  daysInWeek: number
  message: string
  days: WeekDay[]
  goalTitle: string
  goalDetail: string
}

export type StudyPlan = {
  title: string
  meta: string
  percentComplete: number
  nextReading: string
  coverUrl?: string
}

export type Stat = {
  id: string
  value: string
  label: string
  icon: IconKey
  tone: Tone
}

export type ActivityEntry = {
  id: string
  title: string
  time: string
  icon: IconKey
  tone: Tone
}

export type Tool = {
  id: string
  label: string
  icon: IconKey
  tone: Tone
}

export type Banner = {
  title: string
  body: string
  ctaLabel: string
  artUrl?: string
}

export type DashboardData = {
  user: User
  greeting: string
  greetingSubtitle: string
  nav: NavItem[]
  activeNavId: string
  verseOfTheDay: Verse
  today: TodaysProgress
  weekly: WeeklyProgress
  plan: StudyPlan
  statsPeriod: string
  stats: Stat[]
  activity: ActivityEntry[]
  tools: Tool[]
  banner: Banner
}
