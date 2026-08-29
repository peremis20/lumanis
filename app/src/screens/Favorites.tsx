import { navigate, readerHref } from '../router'
import { useStore } from '../store/store'
import { formatWhen } from '../store/derive'
import { formatVerse } from '../data/plans'
import { useBible } from '../data/useBible'
import { TopBar } from '../components/TopBar'
import { Screen } from '../components/Screen'
import { useToast } from '../components/Toast'

export function Favorites() {
  const { state, dispatch } = useStore()
  const bible = useBible()
  const toast = useToast()

  return (
    <Screen>
      <TopBar title="Favorites" subtitle="The verses you want to be able to find again quickly." />

      <div className="sp-card">
        <div className="sp-stack">
          {state.favorites.map((favorite) => {
            const text = favorite.text || bible?.verse(favorite.ref) || ''
            return (
              <article key={favorite.id} className="sp-entry">
                <div className="sp-entry__head">
                  <div>
                    <div className="sp-entry__title">{formatVerse(favorite.ref)}</div>
                    <div className="sp-entry__meta">Saved {formatWhen(favorite.createdAt)}</div>
                  </div>
                  <div className="sp-entry__actions">
                    <button
                      type="button"
                      className="sp-btn sp-btn--ghost"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(`“${text}” — ${formatVerse(favorite.ref)}`)
                          toast('Verse copied')
                        } catch {
                          toast('Copying is blocked in this browser')
                        }
                      }}
                    >
                      Copy
                    </button>
                    <button
                      type="button"
                      className="sp-btn sp-btn--ghost"
                      onClick={() =>
                        navigate(readerHref(favorite.ref.book, favorite.ref.chapter, { verse: favorite.ref.verse }))
                      }
                    >
                      Open
                    </button>
                    <button
                      type="button"
                      className="sp-btn sp-btn--danger"
                      onClick={() => {
                        dispatch({ type: 'favorite/toggle', ref: favorite.ref, text })
                        toast('Removed from favorites')
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <blockquote className="sp-quote">{text || 'Loading the verse…'}</blockquote>
              </article>
            )
          })}
          {state.favorites.length === 0 && (
            <div className="sp-empty">Nothing saved yet. Tap the heart on any verse while reading.</div>
          )}
        </div>
      </div>
    </Screen>
  )
}
