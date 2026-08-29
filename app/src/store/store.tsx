import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react'
import { getPlan, formatRange, formatVerse } from '../data/plans'
import { dayKey, STORAGE_KEY, seedState, uid } from './seed'
import type { Activity, ChapterRef, Settings, State, VerseRef } from './types'

export type Action =
  | { type: 'settings/update'; patch: Partial<Settings> }
  | { type: 'verseOfDay/toggleFavorite' }
  | { type: 'note/add'; ref: VerseRef | null; body: string }
  | { type: 'note/update'; id: string; body: string }
  | { type: 'note/delete'; id: string }
  | { type: 'highlight/toggle'; ref: VerseRef; text: string }
  | { type: 'favorite/toggle'; ref: VerseRef; text: string }
  | { type: 'reading/complete'; ref: ChapterRef; verses: number; minutes: number; planDayId?: string; label: string }
  | { type: 'plan/activate'; planId: string }
  | { type: 'plan/toggleDay'; planId: string; dayId: string }
  | { type: 'plan/restart'; planId: string }
  | { type: 'post/add'; body: string }
  | { type: 'post/toggleLike'; id: string }
  | { type: 'post/reply'; id: string; body: string }
  | { type: 'post/delete'; id: string }
  | { type: 'notifications/readAll' }
  | { type: 'notification/dismiss'; id: string }
  | { type: 'data/reset' }
  | { type: 'data/import'; state: State }

function sameVerse(a: VerseRef, b: VerseRef): boolean {
  return a.book === b.book && a.chapter === b.chapter && a.verse === b.verse
}

function logActivity(state: State, entry: Omit<Activity, 'id' | 'at'>): Activity[] {
  return [{ id: uid('act'), at: new Date().toISOString(), ...entry }, ...state.activity].slice(0, 200)
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'settings/update':
      return { ...state, settings: { ...state.settings, ...action.patch } }

    case 'verseOfDay/toggleFavorite':
      return { ...state, verseOfDayFavorite: !state.verseOfDayFavorite }

    case 'note/add': {
      const now = new Date().toISOString()
      const note = { id: uid('note'), ref: action.ref, body: action.body, createdAt: now, updatedAt: now }
      return {
        ...state,
        notes: [note, ...state.notes],
        activity: logActivity(state, {
          kind: 'note',
          title: action.ref ? `Added a note on ${formatVerse(action.ref)}` : 'Added a note',
          href: '#/library/notes',
        }),
      }
    }

    case 'note/update':
      return {
        ...state,
        notes: state.notes.map((n) =>
          n.id === action.id ? { ...n, body: action.body, updatedAt: new Date().toISOString() } : n,
        ),
      }

    case 'note/delete':
      return { ...state, notes: state.notes.filter((n) => n.id !== action.id) }

    case 'highlight/toggle': {
      const existing = state.highlights.find((h) => sameVerse(h.ref, action.ref))
      if (existing) {
        return { ...state, highlights: state.highlights.filter((h) => h.id !== existing.id) }
      }
      return {
        ...state,
        highlights: [
          { id: uid('highlight'), ref: action.ref, text: action.text, createdAt: new Date().toISOString() },
          ...state.highlights,
        ],
        activity: logActivity(state, {
          kind: 'highlight',
          title: `Highlighted ${formatVerse(action.ref)}`,
          href: `#/read/${action.ref.book}/${action.ref.chapter}?verse=${action.ref.verse}`,
        }),
      }
    }

    case 'favorite/toggle': {
      const existing = state.favorites.find((f) => sameVerse(f.ref, action.ref))
      if (existing) {
        return { ...state, favorites: state.favorites.filter((f) => f.id !== existing.id) }
      }
      return {
        ...state,
        favorites: [
          { id: uid('fav'), ref: action.ref, text: action.text, createdAt: new Date().toISOString() },
          ...state.favorites,
        ],
        activity: logActivity(state, {
          kind: 'favorite',
          title: `Saved ${formatVerse(action.ref)} to favorites`,
          href: '#/favorites',
        }),
      }
    }

    case 'reading/complete': {
      const session = {
        id: uid('session'),
        at: new Date().toISOString(),
        minutes: action.minutes,
        verses: action.verses,
        ref: action.ref,
        planDayId: action.planDayId,
      }
      const progress = state.planProgress[state.activePlanId]
      const planProgress =
        action.planDayId && progress && !progress.completedDays.includes(action.planDayId)
          ? {
              ...state.planProgress,
              [state.activePlanId]: {
                ...progress,
                completedDays: [...progress.completedDays, action.planDayId],
              },
            }
          : state.planProgress
      return {
        ...state,
        sessions: [session, ...state.sessions],
        planProgress,
        activity: logActivity(state, {
          kind: 'read',
          title: `Read ${action.label}`,
          href: `#/read/${action.ref.book}/${action.ref.chapter}`,
        }),
      }
    }

    case 'plan/activate': {
      const existing = state.planProgress[action.planId]
      return {
        ...state,
        activePlanId: action.planId,
        planProgress: existing
          ? state.planProgress
          : {
              ...state.planProgress,
              [action.planId]: {
                planId: action.planId,
                startedAt: new Date().toISOString(),
                completedDays: [],
              },
            },
        activity: logActivity(state, {
          kind: 'plan',
          title: `Started ${getPlan(action.planId).title}`,
          href: '#/learning/courses',
        }),
      }
    }

    case 'plan/toggleDay': {
      const progress = state.planProgress[action.planId] ?? {
        planId: action.planId,
        startedAt: new Date().toISOString(),
        completedDays: [],
      }
      const done = progress.completedDays.includes(action.dayId)
      const completedDays = done
        ? progress.completedDays.filter((d) => d !== action.dayId)
        : [...progress.completedDays, action.dayId]
      const plan = getPlan(action.planId)
      const day = plan.days.find((d) => d.id === action.dayId)
      return {
        ...state,
        planProgress: { ...state.planProgress, [action.planId]: { ...progress, completedDays } },
        activity:
          done || !day
            ? state.activity
            : logActivity(state, {
                kind: 'plan',
                title: `Completed day ${plan.days.indexOf(day) + 1} — ${day.title}`,
                href: '#/learning/courses',
              }),
      }
    }

    case 'plan/restart': {
      const progress = state.planProgress[action.planId]
      if (!progress) return state
      return {
        ...state,
        planProgress: {
          ...state.planProgress,
          [action.planId]: { ...progress, completedDays: [], startedAt: new Date().toISOString() },
        },
      }
    }

    case 'post/add': {
      const post = {
        id: uid('post'),
        author: state.settings.userName,
        body: action.body,
        at: new Date().toISOString(),
        likes: 0,
        likedByMe: false,
        replies: [],
      }
      return {
        ...state,
        posts: [post, ...state.posts],
        activity: logActivity(state, { kind: 'community', title: 'Shared a post in Community', href: '#/community' }),
      }
    }

    case 'post/toggleLike':
      return {
        ...state,
        posts: state.posts.map((p) =>
          p.id === action.id
            ? { ...p, likedByMe: !p.likedByMe, likes: p.likes + (p.likedByMe ? -1 : 1) }
            : p,
        ),
      }

    case 'post/reply':
      return {
        ...state,
        posts: state.posts.map((p) =>
          p.id === action.id
            ? {
                ...p,
                replies: [
                  ...p.replies,
                  { id: uid('reply'), author: state.settings.userName, body: action.body, at: new Date().toISOString() },
                ],
              }
            : p,
        ),
      }

    case 'post/delete':
      return { ...state, posts: state.posts.filter((p) => p.id !== action.id) }

    case 'notifications/readAll':
      return { ...state, notifications: state.notifications.map((n) => ({ ...n, read: true })) }

    case 'notification/dismiss':
      return { ...state, notifications: state.notifications.filter((n) => n.id !== action.id) }

    case 'data/reset':
      return seedState()

    case 'data/import':
      return action.state
  }
}

const DAY_MS = 86_400_000

function shiftDate(iso: string, days: number): string {
  return new Date(new Date(iso).getTime() + days * DAY_MS).toISOString()
}

/**
 * Roll the first-run demo content forward to today.
 *
 * Seeded records are dated relative to the day the app was first opened. Left
 * alone they fall out of "this week" as time passes, which empties the weekly
 * dots, the ring and the streak — the dashboard looks broken through no fault
 * of the person using it. Anything they created themselves carries no `seeded`
 * flag and is never moved.
 */
function rollSeedForward(state: State, days: number): State {
  const move = <T extends { seeded?: boolean }>(rows: T[], keys: Array<keyof T>): T[] =>
    rows.map((row) => {
      if (!row.seeded) return row
      const next = { ...row }
      for (const key of keys) {
        const value = next[key]
        if (typeof value === 'string') next[key] = shiftDate(value, days) as T[keyof T]
      }
      return next
    })

  return {
    ...state,
    seedDay: dayKey(),
    sessions: move(state.sessions, ['at']),
    notes: move(state.notes, ['createdAt', 'updatedAt']),
    highlights: move(state.highlights, ['createdAt']),
    favorites: move(state.favorites, ['createdAt']),
    activity: move(state.activity, ['at']),
    notifications: move(state.notifications, ['at']),
    posts: move(state.posts, ['at']).map((post) =>
      post.seeded
        ? { ...post, replies: post.replies.map((r) => ({ ...r, at: shiftDate(r.at, days) })) }
        : post,
    ),
  }
}

function load(): State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return seedState()

    const parsed = JSON.parse(raw) as Partial<State>
    const fresh = seedState()
    // Merge over a fresh seed so a stored state from an older build stays usable.
    const state: State = { ...fresh, ...parsed, settings: { ...fresh.settings, ...parsed.settings } }

    const anchored = parsed.seedDay ?? fresh.seedDay
    const drift = Math.round(
      (new Date(`${fresh.seedDay}T00:00:00`).getTime() - new Date(`${anchored}T00:00:00`).getTime()) / DAY_MS,
    )
    return drift > 0 ? rollSeedForward(state, drift) : state
  } catch {
    return seedState()
  }
}

type Store = { state: State; dispatch: (action: Action) => void }

const StoreContext = createContext<Store | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // Storage full or blocked (private window) — the app still works in-session.
    }
  }, [state])

  const value = useMemo(() => ({ state, dispatch }), [state])
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): Store {
  const store = useContext(StoreContext)
  if (!store) throw new Error('useStore must be used inside <StoreProvider>')
  return store
}

/** Label for a plan day, e.g. "Philippians 4:4–9". */
export function planDayLabel(planId: string, dayId: string): string {
  const day = getPlan(planId).days.find((d) => d.id === dayId)
  return day ? formatRange(day.book, day.chapter, day.from, day.to) : ''
}
