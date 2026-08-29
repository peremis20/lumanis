/**
 * Continue Learning — the one-click way back in.
 *
 * Shows the next reading of the active course as the primary action, then the
 * readings already finished and any other course left part-way through.
 */
import { navigate, readerHref } from '../router'
import { useStore } from '../store/store'
import { formatMinutes, formatWhen, planState } from '../store/derive'
import { formatRange, PLANS } from '../data/plans'
import { TopBar } from '../components/TopBar'
import { Screen } from '../components/Screen'

export function ContinueLearning() {
  const { state } = useStore()
  const active = planState(state)
  const lastSession = state.sessions[0]

  const others = PLANS.filter((p) => p.id !== state.activePlanId)
    .map((p) => planState(state, p.id))
    .filter((p) => p.completed > 0 && p.completed < p.total)

  const done = active.plan.days.filter((d) => active.completedIds.includes(d.id))

  return (
    <Screen>
      <TopBar title="Continue Learning" subtitle="Pick up exactly where you stopped." />

      <div className="sp-card sp-resume">
        <div className="sp-resume__body">
          <div className="sp-resume__eyebrow">{active.plan.title}</div>
          {active.nextDay ? (
            <>
              <div className="sp-resume__title">
                Day {active.completed + 1} — {active.nextDay.title}
              </div>
              <div className="sp-resume__ref">
                {formatRange(active.nextDay.book, active.nextDay.chapter, active.nextDay.from, active.nextDay.to)}
              </div>
              <p className="sp-resume__prompt">{active.nextDay.prompt}</p>
            </>
          ) : (
            <>
              <div className="sp-resume__title">Course complete</div>
              <p className="sp-resume__prompt">
                You finished every day of {active.plan.title}. Read it again, or start something new.
              </p>
            </>
          )}

          <div className="sp-progress-line">
            <div className="sp-progress-line__track">
              <div className="sp-progress-line__fill" style={{ width: `${active.percent}%` }} />
            </div>
            <span>
              {active.completed} of {active.total} days · {active.percent}%
            </span>
          </div>

          <div className="sp-actions sp-actions--start">
            {active.nextDay ? (
              <button
                type="button"
                className="sp-btn"
                onClick={() =>
                  navigate(
                    readerHref(active.nextDay!.book, active.nextDay!.chapter, {
                      verse: active.nextDay!.from,
                      day: active.nextDay!.id,
                    }),
                  )
                }
              >
                Start day {active.completed + 1}
              </button>
            ) : (
              <button type="button" className="sp-btn" onClick={() => navigate('#/learning/courses')}>
                Choose a new course
              </button>
            )}
            <button type="button" className="sp-btn sp-btn--ghost" onClick={() => navigate('#/learning/courses')}>
              View the whole course
            </button>
          </div>

          {lastSession && (
            <p className="sp-hint">
              Last session: {lastSession.ref.book === 'Psalms' ? 'Psalm' : lastSession.ref.book}{' '}
              {lastSession.ref.chapter} · {formatMinutes(lastSession.minutes)} · {formatWhen(lastSession.at)}
            </p>
          )}
        </div>
      </div>

      {done.length > 0 && (
        <div className="sp-card">
          <div className="sp-card__title">Revisit a reading</div>
          <div className="sp-revisit">
            {done
              .slice()
              .reverse()
              .map((day, index) => (
                <button
                  key={day.id}
                  type="button"
                  className="sp-revisit__item"
                  onClick={() => navigate(readerHref(day.book, day.chapter, { verse: day.from, day: day.id }))}
                >
                  <span className="sp-revisit__day">Day {done.length - index}</span>
                  <span className="sp-revisit__title">{day.title}</span>
                  <span className="sp-revisit__ref">{formatRange(day.book, day.chapter, day.from, day.to)}</span>
                </button>
              ))}
          </div>
        </div>
      )}

      {others.length > 0 && (
        <div className="sp-card">
          <div className="sp-card__title">Also in progress</div>
          <div className="sp-plan-grid">
            {others.map((course) => (
              <button
                key={course.plan.id}
                type="button"
                className="sp-plan-card"
                onClick={() => navigate(`#/learning/courses?plan=${course.plan.id}`)}
              >
                <div className="sp-plan-card__title">{course.plan.title}</div>
                <div className="sp-plan-card__meta">
                  {course.completed} of {course.total} days · {course.percent}%
                </div>
                <div className="sp-plan-card__for">{course.plan.forWhom}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </Screen>
  )
}
