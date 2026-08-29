/** Everything the screens display is computed from state here — no stored totals. */
import { getPlan, type Plan, type PlanDay } from '../data/plans'
import type { State, StatsPeriod, VerseRef } from './types'

const DAY_MS = 86_400_000

export function startOfDay(date: Date | string): Date {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

export function isSameDay(a: Date | string, b: Date | string): boolean {
  return startOfDay(a).getTime() === startOfDay(b).getTime()
}

/** Monday-based start of the week containing `date`. */
export function startOfWeek(date = new Date()): Date {
  const d = startOfDay(date)
  const weekday = (d.getDay() + 6) % 7
  d.setDate(d.getDate() - weekday)
  return d
}

export function minutesOn(state: State, date: Date): number {
  return state.sessions
    .filter((s) => isSameDay(s.at, date))
    .reduce((total, s) => total + s.minutes, 0)
}

export function versesOn(state: State, date: Date): number {
  return state.sessions
    .filter((s) => isSameDay(s.at, date))
    .reduce((total, s) => total + s.verses, 0)
}

export function minutesToday(state: State): number {
  return minutesOn(state, new Date())
}

/** Floored so the ring never claims progress that has not happened. */
export function dailyGoalPercent(state: State): number {
  const goal = Math.max(1, state.settings.dailyGoalMinutes)
  return Math.max(0, Math.min(100, Math.floor((minutesToday(state) / goal) * 100)))
}

export type DayState = 'done' | 'today' | 'upcoming'

export type WeekDay = { label: string; date: Date; state: DayState; minutes: number; future: boolean }

const LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function weekDays(state: State): WeekDay[] {
  const start = startOfWeek()
  const today = startOfDay(new Date())
  return LABELS.map((label, i) => {
    const date = new Date(start.getTime() + i * DAY_MS)
    const minutes = minutesOn(state, date)
    const isToday = date.getTime() === today.getTime()
    const met = minutes >= state.settings.dailyGoalMinutes
    return {
      label,
      date,
      minutes,
      future: date.getTime() > today.getTime(),
      state: met ? 'done' : isToday ? 'today' : 'upcoming',
    }
  })
}

export function daysCompletedThisWeek(state: State): number {
  return weekDays(state).filter((d) => d.state === 'done').length
}

/** Consecutive days meeting the goal, counting back from today (or yesterday). */
export function currentStreak(state: State): number {
  const goal = state.settings.dailyGoalMinutes
  let streak = 0
  const cursor = startOfDay(new Date())
  if (minutesOn(state, cursor) < goal) cursor.setDate(cursor.getDate() - 1)
  for (;;) {
    if (minutesOn(state, cursor) < goal) break
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

export function periodStart(period: StatsPeriod): Date {
  if (period === 'week') return startOfWeek()
  if (period === 'month') return new Date(startOfDay(new Date()).getTime() - 29 * DAY_MS)
  return new Date(0)
}

export type Stats = { chapters: number; minutes: number; notes: number; highlights: number }

export function statsFor(state: State, period: StatsPeriod): Stats {
  const since = periodStart(period).getTime()
  const inRange = (iso: string) => new Date(iso).getTime() >= since
  const chapters = new Set(
    state.sessions.filter((s) => inRange(s.at)).map((s) => `${s.ref.book} ${s.ref.chapter}`),
  )
  return {
    chapters: chapters.size,
    minutes: state.sessions.filter((s) => inRange(s.at)).reduce((t, s) => t + s.minutes, 0),
    notes: state.notes.filter((n) => inRange(n.createdAt)).length,
    highlights: state.highlights.filter((h) => inRange(h.createdAt)).length,
  }
}

/** Minutes per day for the last `days` days, oldest first — used by the chart. */
export function dailyMinutes(state: State, days: number): Array<{ date: Date; minutes: number }> {
  const today = startOfDay(new Date())
  return Array.from({ length: days }, (_, i) => {
    const date = new Date(today.getTime() - (days - 1 - i) * DAY_MS)
    return { date, minutes: minutesOn(state, date) }
  })
}

export type PlanState = {
  plan: Plan
  completed: number
  total: number
  percent: number
  nextDay: PlanDay | null
  completedIds: string[]
}

export function planState(state: State, planId = state.activePlanId): PlanState {
  const plan = getPlan(planId)
  const completedIds = state.planProgress[planId]?.completedDays ?? []
  const completed = plan.days.filter((d) => completedIds.includes(d.id)).length
  return {
    plan,
    completed,
    total: plan.days.length,
    percent: Math.floor((completed / plan.days.length) * 100),
    nextDay: plan.days.find((d) => !completedIds.includes(d.id)) ?? null,
    completedIds,
  }
}

export function isHighlighted(state: State, ref: VerseRef): boolean {
  return state.highlights.some(
    (h) => h.ref.book === ref.book && h.ref.chapter === ref.chapter && h.ref.verse === ref.verse,
  )
}

export function isFavorite(state: State, ref: VerseRef): boolean {
  return state.favorites.some(
    (f) => f.ref.book === ref.book && f.ref.chapter === ref.chapter && f.ref.verse === ref.verse,
  )
}

export function notesFor(state: State, ref: VerseRef) {
  return state.notes.filter(
    (n) => n.ref && n.ref.book === ref.book && n.ref.chapter === ref.chapter && n.ref.verse === ref.verse,
  )
}

export function unreadCount(state: State): number {
  return state.notifications.filter((n) => !n.read).length
}

// ---------------------------------------------------------------- formatting

/** 195 -> "3h 15m", 45 -> "45 min". */
export function formatMinutes(total: number): string {
  if (total < 60) return `${total} min`
  const hours = Math.floor(total / 60)
  const minutes = total % 60
  return minutes ? `${hours}h ${minutes}m` : `${hours}h`
}

const TIME: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: '2-digit' }

export function formatWhen(iso: string): string {
  const date = new Date(iso)
  const time = date.toLocaleTimeString([], TIME)
  const today = startOfDay(new Date())
  const day = startOfDay(date)
  const diff = Math.round((today.getTime() - day.getTime()) / DAY_MS)
  if (diff === 0) return `Today, ${time}`
  if (diff === 1) return `Yesterday, ${time}`
  if (diff < 7) return `${date.toLocaleDateString([], { weekday: 'long' })}, ${time}`
  return `${date.toLocaleDateString([], { month: 'short', day: 'numeric' })}, ${time}`
}

export function formatDay(date: Date): string {
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
}
