import type { VerseRef } from '../store/types'

export type PlanDay = {
  id: string
  title: string
  book: string
  chapter: number
  from: number
  to: number
  prompt: string
}

export type Plan = {
  id: string
  title: string
  book: string
  level: string
  summary: string
  /** Who this plan is for — the app is aimed at people in a hard season. */
  forWhom: string
  days: PlanDay[]
}

function day(
  id: string,
  title: string,
  book: string,
  chapter: number,
  from: number,
  to: number,
  prompt: string,
): PlanDay {
  return { id, title, book, chapter, from, to, prompt }
}

export const PLANS: Plan[] = [
  {
    id: 'peace',
    title: 'Peace for Anxious Hearts',
    book: 'Philippians',
    level: 'Guided, Level 2',
    summary:
      'Ten days in Philippians for the nights your mind will not slow down. Short readings, one question each.',
    forWhom: 'For anxiety, worry and racing thoughts',
    days: [
      day('peace-1', 'Someone is praying for you', 'Philippians', 1, 3, 11, 'Who has stood by you in this season? Thank God for them by name.'),
      day('peace-2', 'God is not finished', 'Philippians', 1, 12, 20, 'Where do you most need to believe that this chapter is not the last one?'),
      day('peace-3', 'A mind like his', 'Philippians', 2, 1, 11, 'What would change today if you stopped competing with anyone?'),
      day('peace-4', 'Working it out', 'Philippians', 2, 12, 18, 'Name one small, ordinary obedience you can manage this week.'),
      day('peace-5', 'Everything else is loss', 'Philippians', 3, 1, 11, 'What are you holding that you would struggle to lay down?'),
      day('peace-6', 'Forgetting what is behind', 'Philippians', 3, 12, 21, 'What memory keeps pulling you backwards? Say it plainly to God.'),
      day('peace-7', 'Anxious for nothing', 'Philippians', 4, 4, 9, 'Write the worry down. Then write the request underneath it.'),
      day('peace-8', 'Learning contentment', 'Philippians', 4, 10, 14, 'Where have you been waiting for circumstances to change before you can rest?'),
      day('peace-9', 'He will supply', 'Philippians', 4, 15, 23, 'What need feels too small or too large to bring to God?'),
      day('peace-10', 'Carrying it forward', 'Philippians', 4, 1, 9, 'Read it once more. What one line do you want to take into next week?'),
    ],
  },
  {
    id: 'weary',
    title: 'Rest for the Weary',
    book: 'Matthew',
    level: 'Gentle, Level 1',
    summary: 'Seven short readings for exhaustion — the kind sleep does not fix.',
    forWhom: 'For burnout and bone-tiredness',
    days: [
      day('weary-1', 'Come to me', 'Matthew', 11, 25, 30, 'What are you carrying that was never yours to carry?'),
      day('weary-2', 'Do not worry', 'Matthew', 6, 25, 34, 'Which tomorrow are you living in today?'),
      day('weary-3', 'He knows the need', 'Matthew', 6, 5, 15, 'Pray the short prayer slowly, one line at a time.'),
      day('weary-4', 'The storm and the boat', 'Matthew', 8, 23, 27, 'What would it mean to sleep through this storm?'),
      day('weary-5', 'Enough for the crowd', 'Matthew', 14, 13, 21, 'Offer God the little you actually have today.'),
      day('weary-6', 'Walking on water', 'Matthew', 14, 22, 33, 'Where are you looking at the wind instead of him?'),
      day('weary-7', 'With you always', 'Matthew', 28, 16, 20, 'Say it out loud: I am not doing this alone.'),
    ],
  },
  {
    id: 'dark',
    title: "When You Can't Feel God",
    book: 'Psalms',
    level: 'Honest, Level 2',
    summary: 'Eight psalms that say the hard thing out loud. No pretending required.',
    forWhom: 'For doubt, silence and spiritual numbness',
    days: [
      day('dark-1', 'How long?', 'Psalms', 13, 1, 6, 'Ask the question you have been afraid to ask.'),
      day('dark-2', 'My God, why?', 'Psalms', 22, 1, 11, 'Notice that this prayer is in the Bible. Nothing you feel is out of bounds.'),
      day('dark-3', 'The shepherd', 'Psalms', 23, 1, 6, 'Which line do you not believe today? Start there.'),
      day('dark-4', 'Out of the depths', 'Psalms', 130, 1, 8, 'What are you waiting for more than a watchman waits for morning?'),
      day('dark-5', 'Search me', 'Psalms', 139, 1, 12, 'Where have you assumed God cannot reach?'),
      day('dark-6', 'Near the brokenhearted', 'Psalms', 34, 15, 22, 'Name the break. He is nearer to it than you think.'),
      day('dark-7', 'Why so downcast', 'Psalms', 42, 1, 11, 'Preach to yourself instead of listening to yourself.'),
      day('dark-8', 'A lamp to my feet', 'Psalms', 119, 105, 112, 'Enough light for the next step is still light.'),
    ],
  },
  {
    id: 'again',
    title: 'Starting Over',
    book: 'John',
    level: 'Guided, Level 1',
    summary: 'Nine readings in John for anyone who thinks they have used up their chances.',
    forWhom: 'For shame, regret and second starts',
    days: [
      day('again-1', 'The light came', 'John', 1, 1, 14, 'What part of your life have you kept in the dark?'),
      day('again-2', 'Born again', 'John', 3, 1, 17, 'Read verse 17 twice. He did not come to condemn you.'),
      day('again-3', 'The woman at the well', 'John', 4, 5, 26, 'He knew everything and stayed anyway.'),
      day('again-4', 'Do you want to get well?', 'John', 5, 1, 15, 'Answer the question honestly.'),
      day('again-5', 'Neither do I condemn you', 'John', 8, 1, 11, 'Whose accusation are you still carrying?'),
      day('again-6', 'The good shepherd', 'John', 10, 7, 18, 'You are not a burden to him. You are the reason he came.'),
      day('again-7', 'Lazarus, come out', 'John', 11, 32, 44, 'What in you feels four days dead?'),
      day('again-8', 'Peace I leave with you', 'John', 14, 25, 31, 'His peace is given, not earned.'),
      day('again-9', 'Do you love me?', 'John', 21, 15, 19, 'Three questions for three denials. Restoration is his idea.'),
    ],
  },
  {
    id: 'hope',
    title: 'Hope in the Waiting',
    book: 'Isaiah',
    level: 'Guided, Level 3',
    summary: 'Eight readings for the long middle, when nothing has changed yet.',
    forWhom: 'For unanswered prayer and long seasons',
    days: [
      day('hope-1', 'Comfort my people', 'Isaiah', 40, 1, 11, 'What comfort would you actually receive today?'),
      day('hope-2', 'They shall renew their strength', 'Isaiah', 40, 21, 31, 'Waiting is not wasted. What are you waiting for?'),
      day('hope-3', 'Fear not, I am with you', 'Isaiah', 41, 8, 13, 'Read verse 10 as if your name were in it.'),
      day('hope-4', 'A bruised reed', 'Isaiah', 42, 1, 9, 'He does not break what is already bending.'),
      day('hope-5', 'When you pass through the waters', 'Isaiah', 43, 1, 7, 'Not if you pass through. When.'),
      day('hope-6', 'A new thing', 'Isaiah', 43, 14, 21, 'What new thing would you not dare hope for?'),
      day('hope-7', 'He was wounded', 'Isaiah', 53, 1, 12, 'He is not distant from suffering. He knows it.'),
      day('hope-8', 'Come, everyone who thirsts', 'Isaiah', 55, 1, 13, 'What are you spending yourself on that does not satisfy?'),
    ],
  },
]

export function getPlan(id: string): Plan {
  return PLANS.find((p) => p.id === id) ?? PLANS[0]
}

export function planDayRef(d: PlanDay): VerseRef {
  return { book: d.book, chapter: d.chapter, verse: d.from }
}

/** "Philippians 4:4–9" — en dash, and Psalms reads as Psalm in a reference. */
export function formatRange(book: string, chapter: number, from: number, to: number): string {
  const name = book === 'Psalms' ? 'Psalm' : book
  return `${name} ${chapter}:${from}${to > from ? `–${to}` : ''}`
}

export function formatVerse(ref: { book: string; chapter: number; verse: number }): string {
  const name = ref.book === 'Psalms' ? 'Psalm' : ref.book
  return `${name} ${ref.chapter}:${ref.verse}`
}
