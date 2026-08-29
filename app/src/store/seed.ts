/**
 * First-run content. The numbers are chosen so a fresh install reproduces the
 * handoff design exactly: 75% of the daily goal, 4 days this week, 8 chapters
 * and 3h 15m this month, 14 notes, 7 highlights, and a plan 60% complete whose
 * next reading is Philippians 4:4–9.
 */
import type { Activity, Highlight, Note, Notification, Post, Session, State } from './types'

export const STORAGE_KEY = 'scripturepath:v1'

let counter = 0
export function uid(prefix = 'id'): string {
  counter += 1
  return `${prefix}-${Date.now().toString(36)}-${counter.toString(36)}`
}

/** A date N days back, at the given local time. */
function daysAgo(days: number, hour = 9, minute = 0): string {
  const d = new Date()
  d.setDate(d.getDate() - days)
  d.setHours(hour, minute, 0, 0)
  return d.toISOString()
}

type SeedSession = [days: number, hour: number, minutes: number, book: string, chapter: number, verses: number]

// 25 minutes today against a 33-minute goal floors to 75% exactly, as designed,
// with today still in progress. The four preceding days clear the goal (the
// design's "4 of 7 days"), and the eight sessions total 195 minutes across
// eight distinct chapters — 3h 15m, 8 chapters.
const SESSIONS: SeedSession[] = [
  [0, 8, 25, 'Philippians', 4, 12],
  [1, 21, 35, 'Philippians', 3, 21],
  [2, 7, 33, 'Philippians', 2, 18],
  [3, 7, 33, 'Philippians', 1, 16],
  [4, 20, 33, 'Psalms', 23, 6],
  [8, 7, 12, 'Psalms', 42, 11],
  [11, 21, 12, 'Psalms', 130, 8],
  [15, 7, 12, 'John', 14, 14],
]

type SeedNote = [days: number, hour: number, book: string, chapter: number, verse: number, body: string]

const NOTES: SeedNote[] = [
  [0, 22, 'Philippians', 4, 6, 'Wrote the worry down first, then the request underneath. It got smaller on paper.'],
  [1, 22, 'Philippians', 4, 7, 'Peace that passes understanding — not peace that comes after I understand.'],
  [1, 8, 'Philippians', 3, 13, 'Forgetting what is behind is a decision I have to make again most mornings.'],
  [2, 20, 'Philippians', 2, 4, 'Look to the interests of others. Hard on the days I can barely carry my own.'],
  [3, 8, 'Philippians', 1, 6, 'He who began a good work will finish it. He is not done with me.'],
  [4, 21, 'Psalms', 23, 4, 'Through the valley. Not around it, not stopped in it.'],
  [4, 21, 'Psalms', 23, 6, 'Goodness and mercy follow me — even on the days I am not looking for them.'],
  [6, 9, 'Philippians', 1, 21, 'To live is Christ. Trying to work out what that means at 2am.'],
  [8, 8, 'Psalms', 42, 5, 'Why so downcast? First time I have seen someone in the Bible talk to himself like that.'],
  [8, 8, 'Psalms', 42, 11, 'Hope in God — future tense. I will yet praise him.'],
  [11, 21, 'Psalms', 130, 1, 'Out of the depths. That is exactly where I am praying from.'],
  [12, 20, 'Psalms', 130, 6, 'More than watchmen wait for morning. Waiting is not the same as being forgotten.'],
  [15, 8, 'John', 14, 27, 'Not as the world gives. The world gives peace with conditions attached.'],
  [18, 20, 'John', 14, 1, 'Let not your heart be troubled — said to people about to lose everything.'],
]

type SeedHighlight = [days: number, book: string, chapter: number, verse: number]

const HIGHLIGHTS: SeedHighlight[] = [
  [0, 'Philippians', 4, 6],
  [0, 'Philippians', 4, 7],
  [1, 'Philippians', 3, 14],
  [3, 'Philippians', 1, 6],
  [4, 'Psalms', 23, 4],
  [8, 'Psalms', 42, 11],
  [15, 'John', 14, 27],
]

export function seedState(): State {
  const sessions: Session[] = SESSIONS.map(([d, h, minutes, book, chapter, verses]) => ({
    id: uid('session'),
    at: daysAgo(d, h, 30),
    minutes,
    verses,
    ref: { book, chapter },
  }))

  const notes: Note[] = NOTES.map(([d, h, book, chapter, verse, body]) => {
    const at = daysAgo(d, h, 12)
    return { id: uid('note'), ref: { book, chapter, verse }, body, createdAt: at, updatedAt: at }
  })

  const highlights: Highlight[] = HIGHLIGHTS.map(([d, book, chapter, verse]) => ({
    id: uid('highlight'),
    ref: { book, chapter, verse },
    text: '',
    createdAt: daysAgo(d, 8, 15),
  }))

  // The three entries the design shows, then older ones behind "View All".
  const activity: Activity[] = [
    { id: uid('act'), kind: 'read', title: 'Read Philippians 4:1–7', at: daysAgo(0, 8, 30), href: '#/read/Philippians/4' },
    { id: uid('act'), kind: 'highlight', title: 'Highlighted Philippians 4:6', at: daysAgo(0, 8, 15), href: '#/read/Philippians/4?verse=6' },
    { id: uid('act'), kind: 'note', title: 'Added a note on Philippians 4:6', at: daysAgo(1, 22, 45), href: '#/library/notes' },
    { id: uid('act'), kind: 'plan', title: 'Completed day 6 — Forgetting what is behind', at: daysAgo(1, 21, 40), href: '#/learning/courses' },
    { id: uid('act'), kind: 'read', title: 'Read Philippians 3:12–21', at: daysAgo(1, 21, 10), href: '#/read/Philippians/3' },
    { id: uid('act'), kind: 'read', title: 'Read Philippians 2:1–11', at: daysAgo(2, 7, 30), href: '#/read/Philippians/2' },
    { id: uid('act'), kind: 'favorite', title: 'Saved Psalm 23:4 to favorites', at: daysAgo(4, 20, 55), href: '#/favorites' },
    { id: uid('act'), kind: 'read', title: 'Read Psalm 23', at: daysAgo(4, 20, 30), href: '#/read/Psalms/23' },
    { id: uid('act'), kind: 'note', title: 'Added a note on Psalm 42:11', at: daysAgo(8, 8, 20), href: '#/library/notes' },
  ]

  const posts: Post[] = [
    {
      id: uid('post'),
      author: 'Dana R.',
      body: 'Six months of praying about the same thing and nothing has moved. Reading Isaiah 40 today anyway. Anyone else in a long wait?',
      at: daysAgo(0, 7, 20),
      likes: 12,
      likedByMe: false,
      replies: [
        { id: uid('reply'), author: 'Marcus T.', body: 'Two years here. The waiting has changed me more than the answer probably will.', at: daysAgo(0, 8, 5) },
      ],
    },
    {
      id: uid('post'),
      author: 'Priya S.',
      body: 'Started "Peace for Anxious Hearts" after a rough week. Day 3 was the one that got me — you cannot compete and rest at the same time.',
      at: daysAgo(1, 19, 30),
      likes: 24,
      likedByMe: false,
      replies: [],
    },
    {
      id: uid('post'),
      author: 'Ellis W.',
      body: 'For anyone who cannot feel anything when they read: keep showing up. Mine came back slowly, and not on my schedule.',
      at: daysAgo(2, 12, 15),
      likes: 41,
      likedByMe: false,
      replies: [
        { id: uid('reply'), author: 'Joy A.', body: 'Needed this today. Thank you.', at: daysAgo(2, 14, 2) },
        { id: uid('reply'), author: 'Sam K.', body: 'Same. Numbness is not the end of the story.', at: daysAgo(2, 16, 40) },
      ],
    },
  ]

  const notifications: Notification[] = [
    {
      id: uid('note-n'),
      title: 'Today’s reading is waiting',
      detail: 'Day 7 of Peace for Anxious Hearts — Philippians 4:4–9.',
      at: daysAgo(0, 7, 0),
      href: '#/learning/courses',
      read: false,
    },
    {
      id: uid('note-n'),
      title: 'You are 8 minutes from your daily goal',
      detail: '25 of 33 minutes studied today.',
      at: daysAgo(0, 8, 45),
      href: '#/learning/progress',
      read: false,
    },
    {
      id: uid('note-n'),
      title: 'Dana R. replied in Community',
      detail: '“Two years here. The waiting has changed me more than the answer probably will.”',
      at: daysAgo(0, 8, 5),
      href: '#/community',
      read: true,
    },
  ]

  return {
    settings: { userName: 'Michael', avatarUrl: '', dailyGoalMinutes: 33, weeklyGoalDays: 5 },
    activePlanId: 'peace',
    planProgress: {
      peace: {
        planId: 'peace',
        startedAt: daysAgo(12, 8, 0),
        completedDays: ['peace-1', 'peace-2', 'peace-3', 'peace-4', 'peace-5', 'peace-6'],
      },
    },
    notes,
    highlights,
    favorites: [
      { id: uid('fav'), ref: { book: 'Psalms', chapter: 23, verse: 4 }, text: '', createdAt: daysAgo(4, 20, 55) },
      { id: uid('fav'), ref: { book: 'Philippians', chapter: 4, verse: 7 }, text: '', createdAt: daysAgo(1, 22, 10) },
      { id: uid('fav'), ref: { book: 'John', chapter: 14, verse: 27 }, text: '', createdAt: daysAgo(15, 8, 40) },
    ],
    sessions,
    activity,
    posts,
    notifications,
    verseOfDayFavorite: false,
  }
}
