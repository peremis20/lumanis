export type VerseRef = { book: string; chapter: number; verse: number }
export type ChapterRef = { book: string; chapter: number }

export type Highlight = {
  id: string
  ref: VerseRef
  text: string
  createdAt: string
  /** First-run demo content; kept in step with today's date (see seed.ts). */
  seeded?: boolean
}

export type Note = {
  id: string
  ref: VerseRef | null
  body: string
  createdAt: string
  updatedAt: string
  seeded?: boolean
}

export type Favorite = {
  id: string
  ref: VerseRef
  text: string
  createdAt: string
  seeded?: boolean
}

/** One finished reading. Minutes and verse counts feed every progress number. */
export type Session = {
  id: string
  at: string
  minutes: number
  verses: number
  ref: ChapterRef
  planDayId?: string
  seeded?: boolean
}

export type ActivityKind = 'read' | 'highlight' | 'note' | 'favorite' | 'plan' | 'community'

export type Activity = {
  id: string
  kind: ActivityKind
  title: string
  at: string
  /** Hash route this entry opens when clicked. */
  href?: string
  seeded?: boolean
}

export type PlanProgress = {
  planId: string
  startedAt: string
  completedDays: string[]
}

export type Reply = { id: string; author: string; body: string; at: string }

export type Post = {
  id: string
  author: string
  body: string
  at: string
  likes: number
  likedByMe: boolean
  replies: Reply[]
  seeded?: boolean
}

export type Notification = {
  id: string
  title: string
  detail: string
  at: string
  href?: string
  read: boolean
  seeded?: boolean
}

export type Settings = {
  userName: string
  avatarUrl: string
  dailyGoalMinutes: number
  weeklyGoalDays: number
}

export type State = {
  /** Local date (YYYY-MM-DD) the demo content is anchored to. */
  seedDay: string
  settings: Settings
  activePlanId: string
  planProgress: Record<string, PlanProgress>
  notes: Note[]
  highlights: Highlight[]
  favorites: Favorite[]
  sessions: Session[]
  activity: Activity[]
  posts: Post[]
  notifications: Notification[]
  /** Verse of the Day favouriting is keyed separately — it is not a passage read. */
  verseOfDayFavorite: boolean
}

export type StatsPeriod = 'week' | 'month' | 'all'
