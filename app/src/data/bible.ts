/**
 * Bible text: the complete King James Version (public domain), 31,102 verses.
 *
 * The dataset is ~4.6 MB, so it is imported dynamically — Vite gives it its own
 * chunk that only downloads when a reader, library or search first needs it.
 */
import type { VerseRef } from '../store/types'

const OLD_TESTAMENT = new Set([
  'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth',
  '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra',
  'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon',
  'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos',
  'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah',
  'Malachi',
])

export type BookMeta = {
  name: string
  testament: 'old' | 'new'
  chapters: number
}

export type SearchHit = { ref: VerseRef; text: string }

export type Bible = {
  books: BookMeta[]
  book(name: string): BookMeta | undefined
  chapter(book: string, chapter: number): string[]
  verse(ref: VerseRef): string | undefined
  search(query: string, limit?: number): SearchHit[]
}

type Store = Map<string, string[][]>

let cache: Promise<Bible> | null = null

/** KJV brackets words supplied by the translators; drop them for readability. */
function clean(text: string): string {
  return text.replace(/[[\]]/g, '')
}

function build(verses: Record<string, string>): Bible {
  const store: Store = new Map()
  const order: string[] = []
  const flat: Array<{ book: string; chapter: number; verse: number; text: string }> = []

  for (const key of Object.keys(verses)) {
    const match = /^(.+) (\d+):(\d+)$/.exec(key)
    if (!match) continue
    const [, book, chapterRaw, verseRaw] = match
    const chapter = Number(chapterRaw)
    const verse = Number(verseRaw)
    const text = clean(verses[key])

    let chapters = store.get(book)
    if (!chapters) {
      chapters = []
      store.set(book, chapters)
      order.push(book)
    }
    let list = chapters[chapter - 1]
    if (!list) {
      list = []
      chapters[chapter - 1] = list
    }
    list[verse - 1] = text
    flat.push({ book, chapter, verse, text })
  }

  const books: BookMeta[] = order.map((name) => ({
    name,
    testament: OLD_TESTAMENT.has(name) ? 'old' : 'new',
    chapters: store.get(name)?.length ?? 0,
  }))

  let lowered: string[] | null = null

  return {
    books,
    book: (name) => books.find((b) => b.name === name),
    chapter: (book, chapter) => store.get(book)?.[chapter - 1] ?? [],
    verse: (ref) => store.get(ref.book)?.[ref.chapter - 1]?.[ref.verse - 1],
    search(query, limit = 60) {
      const q = query.trim().toLowerCase()
      if (q.length < 2) return []
      lowered ??= flat.map((entry) => entry.text.toLowerCase())
      const hits: SearchHit[] = []
      for (let i = 0; i < flat.length && hits.length < limit; i++) {
        if (!lowered[i].includes(q)) continue
        const e = flat[i]
        hits.push({ ref: { book: e.book, chapter: e.chapter, verse: e.verse }, text: e.text })
      }
      return hits
    },
  }
}

export function loadBible(): Promise<Bible> {
  cache ??= import('es-kjv').then((mod) => build(mod.verses as Record<string, string>))
  return cache
}

/** Warm the chunk once the first screen is painted, so opening a reading is instant. */
export function prefetchBible(): void {
  const start = () => void loadBible()
  const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => void }).requestIdleCallback
  if (idle) idle(start)
  else window.setTimeout(start, 1200)
}
