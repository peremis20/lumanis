/** Hash routing — no dependency, and it survives being served from any subpath. */
import { useEffect, useState } from 'react'

export type Route = {
  /** Path segments after the "#/", e.g. ['read', 'Philippians', '4']. */
  segments: string[]
  path: string
  query: URLSearchParams
}

function parse(): Route {
  const raw = window.location.hash.replace(/^#/, '') || '/'
  const [pathname, search = ''] = raw.split('?')
  const segments = pathname.split('/').filter(Boolean).map(decodeURIComponent)
  return { segments, path: '/' + segments.join('/'), query: new URLSearchParams(search) }
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

export function readerHref(book: string, chapter: number, options: { verse?: number; day?: string } = {}): string {
  const params = new URLSearchParams()
  if (options.verse) params.set('verse', String(options.verse))
  if (options.day) params.set('day', options.day)
  const query = params.toString()
  return `#/read/${encodeURIComponent(book)}/${chapter}${query ? `?${query}` : ''}`
}
