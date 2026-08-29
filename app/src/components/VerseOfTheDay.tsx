import { useState } from 'react'
import type { Verse } from '../data/types'
import { HeartIcon, ShareIcon, SunIcon } from './icons'

export function VerseOfTheDay({ verse }: { verse: Verse }) {
  const [favorite, setFavorite] = useState(false)

  return (
    <div className="verse">
      <div className="verse__head">
        <div className="verse__title">Verse of the Day</div>
        <SunIcon size={18} color="#E89B3C" />
      </div>
      <div className="verse__text">{verse.text}</div>
      <div className="verse__ref">{verse.reference}</div>
      <div className="verse__actions">
        <button
          type="button"
          className="reset-btn icon-btn"
          aria-pressed={favorite}
          aria-label="Favorite this verse"
          onClick={() => setFavorite((f) => !f)}
        >
          <HeartIcon size={19} color="#D97B2E" filled={favorite} />
        </button>
        <button type="button" className="reset-btn icon-btn" aria-label="Share this verse">
          <ShareIcon size={19} color="#5C7566" />
        </button>
      </div>
    </div>
  )
}
