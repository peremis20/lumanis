import { useEffect, useState } from 'react'
import { loadBible, type Bible } from './bible'

/** Resolves once the KJV chunk has downloaded; null while it is in flight. */
export function useBible(): Bible | null {
  const [bible, setBible] = useState<Bible | null>(null)

  useEffect(() => {
    let live = true
    void loadBible().then((b) => {
      if (live) setBible(b)
    })
    return () => {
      live = false
    }
  }, [])

  return bible
}
