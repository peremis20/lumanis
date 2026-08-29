/**
 * Mock content, copied from the design. Every string and number the dashboard
 * shows lives here so the UI layer stays presentational.
 */
import type { DashboardData } from './types'

export const dashboardData: DashboardData = {
  user: { name: 'Michael' },
  greeting: 'Good morning',
  greetingSubtitle: 'Keep seeking. Keep growing. God is with you.',

  activeNavId: 'dashboard',
  nav: [
    { id: 'dashboard', label: 'Dashboard', icon: 'home' },
    { id: 'plan', label: 'My Plan', icon: 'calendar' },
    { id: 'library', label: 'Bible Library', icon: 'book-nav' },
    { id: 'tools', label: 'Study Tools', icon: 'pencil' },
    { id: 'progress', label: 'Progress', icon: 'trend' },
    { id: 'notes', label: 'Notes & Highlights', icon: 'pencil' },
    { id: 'favorites', label: 'Favorites', icon: 'star' },
    { id: 'community', label: 'Community', icon: 'community' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ],

  verseOfTheDay: {
    text: 'Your word is a lamp to my feet and a light to my path.',
    reference: 'Psalm 119:105',
  },

  today: {
    dailyGoalPercent: 75,
    timeStudied: '25 min',
    versesStudied: 12,
    encouragement: "Keep it up! You're building something that lasts.",
  },

  weekly: {
    daysCompleted: 4,
    daysInWeek: 7,
    message: "You're on fire! 🔥 Keep showing up.",
    days: [
      { label: 'Mon', state: 'done' },
      { label: 'Tue', state: 'done' },
      { label: 'Wed', state: 'done' },
      { label: 'Thu', state: 'done' },
      { label: 'Fri', state: 'today' },
      { label: 'Sat', state: 'upcoming' },
      { label: 'Sun', state: 'upcoming' },
    ],
    goalTitle: 'Weekly Goal',
    goalDetail: '5 days per week',
  },

  plan: {
    title: 'Peace for Anxious Hearts',
    meta: 'Philippians · Guided, Level 2',
    percentComplete: 60,
    nextReading: 'Next: Philippians 4:4–9',
  },

  statsPeriod: 'This Month',
  stats: [
    { id: 'chapters', value: '8', label: 'Chapters Studied', icon: 'book', tone: 'green' },
    { id: 'time', value: '3h 15m', label: 'Time Studied', icon: 'clock', tone: 'orange' },
    { id: 'notes', value: '14', label: 'Notes Created', icon: 'pencil', tone: 'amber' },
    { id: 'highlights', value: '7', label: 'Highlights', icon: 'star', tone: 'amber' },
  ],

  activity: [
    {
      id: 'read',
      title: 'Read Philippians 4:1–7',
      time: 'Today, 8:30 AM',
      icon: 'book',
      tone: 'green',
    },
    {
      id: 'highlight',
      title: 'Highlighted Philippians 4:6',
      time: 'Today, 8:15 AM',
      icon: 'pencil',
      tone: 'amber',
    },
    {
      id: 'note',
      title: 'Added a note on Philippians 4:6',
      time: 'Yesterday, 10:45 PM',
      icon: 'note',
      tone: 'blue',
    },
  ],

  tools: [
    { id: 'study-bible', label: 'Study Bible', icon: 'book', tone: 'green' },
    { id: 'commentaries', label: 'Commentaries', icon: 'commentary', tone: 'amber' },
    { id: 'maps', label: 'Bible Maps', icon: 'map-pin', tone: 'blue' },
    { id: 'dictionary', label: 'Dictionary', icon: 'dictionary', tone: 'orange' },
  ],

  banner: {
    title: 'Stay rooted in the Word',
    body: "The more time you spend in God's Word, the more it transforms your life.",
    ctaLabel: 'Explore Plans',
  },
}
