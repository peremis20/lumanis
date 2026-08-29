/** Hash routing — no dependency, and it survives being served from any subpath. */
import { useEffect, useState } from 'react'

export type Route = {
  /** Path segments after the "#/", e.g. ['read', 'Philippians', '4']. */
  segments: string[]
  path: string
  query: URLSearchParams
}

/**
 * Routes from the flat sidebar, kept working after the nav was grouped into
 * My Learning and Library. Old links, saved activity entries and stored
 * notifications all still land in the right place.
 */
type Alias = { from: string; to: string; exact?: boolean }

const ALIASES: Alias[] = [
  { from: '/plan', to: '/learning/courses' },
  { from: '/progress', to: '/learning/progress' },
  { from: '/notes', to: '/library/notes' },
  { from: '/tools', to: '/library/tools' },
  // Exact only: '/library/bible' and friends are already canonical.
  { from: '/library', to: '/library/bible', exact: true },
]

function parse(): Route {
  const raw = window.location.hash.replace(/^#/, '') || '/'
  const [pathname, search = ''] = raw.split('?')
  const segments = pathname.split('/').filter(Boolean).map(decodeURIComponent)
  return { segments, path: '/' + segments.join('/'), query: new URLSearchParams(search) }
}

/** The canonical href for a legacy path, or null when the route is current. */
export function canonicalHref(route: Route): string | null {
  for (const { from, to, exact } of ALIASES) {
    const hit = exact ? route.path === from : route.path === from || route.path.startsWith(from + '/')
    if (!hit) continue
    const rest = route.path.slice(from.length)
    const search = route.query.toString()
    return `#${to}${rest}${search ? `?${search}` : ''}`
  }
  return null
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(parse)

  useEffect(() => {
    const onChange = () => setRoute(parse())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}

export function navigate(href: string): void {
  const next = href.startsWith('#') ? href : `#${href}`
  if (window.location.hash === next) return
  window.location.hash = next
  window.scrollTo({ top: 0 })
}

/** Replace the current entry — used when redirecting a legacy route. */
export function redirect(href: string): void {
  const next = href.startsWith('#') ? href : `#${href}`
  window.location.replace(
    window.location.pathname + window.location.search + next,
  )
}

export function readerHref(book: string, chapter: number, options: { verse?: number; day?: string } = {}): string {
  const params = new URLSearchParams()
  if (options.verse) params.set('verse', String(options.verse))
  if (options.day) params.set('day', options.day)
  const query = params.toString()
  return `#/read/${encodeURIComponent(book)}/${chapter}${query ? `?${query}` : ''}`
}
