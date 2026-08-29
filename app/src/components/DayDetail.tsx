/**
 * What happened on one day: the sessions logged, what was read, and the way
 * back into that passage. Opened from the weekly dots on the dashboard and
 * from the week grid and chart on Progress.
 */
import { navigate, readerHref } from '../router'
import { useStore } from '../store/store'
import { formatMinutes, isSameDay, planState, sessionsOn, startOfDay } from '../store/derive'
import { formatRange } from '../data/plans'
import { Modal } from './Modal'

function titleFor(date: Date): string {
  const today = startOfDay(new Date())
  const day = startOfDay(date)
  const diff = Math.round((today.getTime() - day.getTime()) / 86_400_000)
  const label = date.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })
  if (diff === 0) return `Today — ${label}`
  if (diff === 1) return `Yesterday — ${label}`
  return label
}

export function DayDetail({ date, onClose }: { date: Date; onClose: () => void }) {
  const { state } = useStore()

  const sessions = sessionsOn(state, date)
  const minutes = sessions.reduce((t, s) => t + s.minutes, 0)
  const verses = sessions.reduce((t, s) => t + s.verses, 0)
  const goal = state.settings.dailyGoalMinutes
  const met = minutes >= goal
  const isToday = isSameDay(date, new Date())
  const future = startOfDay(date).getTime() > startOfDay(new Date()).getTime()

  const notes = state.notes.filter((n) => isSameDay(n.createdAt, date))
  const highlights = state.highlights.filter((h) => isSameDay(h.createdAt, date))

  const plan = planState(state)
  const next = plan.nextDay

  const go = (href: string) => {
    onClose()
    navigate(href)
  }

  return (
    <Modal
      title={titleFor(date)}
      subtitle={
        future
          ? 'Still ahead of you.'
          : met
            ? `Goal met — ${formatMinutes(minutes)} of ${goal} min`
            : `${formatMinutes(minutes)} of the ${goal} min goal`
      }
      onClose={onClose}
      width={460}
    >
      {!future && (
        <div className="sp-daystats">
          <div>
            <div className="sp-daystats__value">{formatMinutes(minutes)}</div>
            <div className="sp-daystats__label">Studied</div>
          </div>
          <div>
            <div className="sp-daystats__value">{verses}</div>
            <div className="sp-daystats__label">Verses</div>
          </div>
          <div>
            <div className="sp-daystats__value">{notes.length}</div>
            <div className="sp-daystats__label">Notes</div>
          </div>
          <div>
            <div className="sp-daystats__value">{highlights.length}</div>
            <div className="sp-daystats__label">Highlights</div>
          </div>
        </div>
      )}

      {sessions.length > 0 && (
        <>
          <div className="sp-daylist__label">What you read</div>
          <div className="sp-daylist">
            {sessions.map((session) => (
              <button
                key={session.id}
                type="button"
                className="sp-daylist__row"
                onClick={() => go(readerHref(session.ref.book, session.ref.chapter))}
              >
                <span className="sp-daylist__ref">
                  {session.ref.book === 'Psalms' ? 'Psalm' : session.ref.book} {session.ref.chapter}
                </span>
                <span className="sp-daylist__meta">
                  {formatMinutes(session.minutes)} · {session.verses} verses
                </span>
              </button>
            ))}
          </div>
        </>
      )}

      {sessions.length === 0 && !future && (
        <p className="sp-hint">
          Nothing logged this day. That is allowed — the streak is a prompt, not a verdict.
        </p>
      )}

      {future && <p className="sp-hint">Nothing to show yet. Today is the only day you can act on.</p>}

      <div className="sp-actions sp-actions--start">
        {isToday && next && (
          <button
            type="button"
            className="sp-btn"
            onClick={() => go(readerHref(next.book, next.chapter, { verse: next.from, day: next.id }))}
          >
            {minutes > 0 ? 'Keep going' : 'Start today’s reading'}
          </button>
        )}
        {!isToday && !future && (
          <button type="button" className="sp-btn sp-btn--ghost" onClick={() => go('#/learning/progress')}>
            See all progress
          </button>
        )}
        {next && !isToday && !future && (
          <button
            type="button"
            className="sp-btn"
            onClick={() => go(readerHref(next.book, next.chapter, { verse: next.from, day: next.id }))}
          >
            Read {formatRange(next.book, next.chapter, next.from, next.to)}
          </button>
        )}
      </div>
    </Modal>
  )
}
