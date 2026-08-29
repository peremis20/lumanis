import { navigate, readerHref, useRoute } from '../router'
import { useStore } from '../store/store'
import { planState } from '../store/derive'
import { formatRange, getPlan, PLANS } from '../data/plans'
import { TopBar } from '../components/TopBar'
import { Screen } from '../components/Screen'
import { useToast } from '../components/Toast'

export function MyPlan() {
  const route = useRoute()
  const { state, dispatch } = useStore()
  const toast = useToast()

  const previewId = route.query.get('plan')
  const viewingId = previewId ?? state.activePlanId
  const view = planState(state, viewingId)
  const isActive = viewingId === state.activePlanId

  return (
    <Screen>
      <TopBar
        title={isActive ? 'My Plan' : view.plan.title}
        subtitle={
          isActive
            ? 'One reading at a time. Missing a day does not end the plan.'
            : `Preview · ${view.plan.days.length} days`
        }
      />

      <div className="sp-card">
        <div className="sp-plan-head">
          <div>
            <div className="sp-plan-head__title">{view.plan.title}</div>
            <div className="sp-plan-head__meta">
              {view.plan.book} · {view.plan.level} · {view.plan.forWhom}
            </div>
            <p className="sp-plan-head__summary">{view.plan.summary}</p>
          </div>
          <div className="sp-plan-head__actions">
            {!isActive && (
              <button
                type="button"
                className="sp-btn"
                onClick={() => {
                  dispatch({ type: 'plan/activate', planId: viewingId })
                  toast(`${view.plan.title} is now your plan`)
                  navigate('#/plan')
                }}
              >
                Make this my plan
              </button>
            )}
            {isActive && view.nextDay && (
              <button
                type="button"
                className="sp-btn"
                onClick={() =>
                  navigate(
                    readerHref(view.nextDay!.book, view.nextDay!.chapter, {
                      verse: view.nextDay!.from,
                      day: view.nextDay!.id,
                    }),
                  )
                }
              >
                Continue day {view.completed + 1}
              </button>
            )}
            {isActive && (
              <button
                type="button"
                className="sp-btn sp-btn--ghost"
                onClick={() => {
                  dispatch({ type: 'plan/restart', planId: viewingId })
                  toast('Plan restarted')
                }}
              >
                Restart
              </button>
            )}
          </div>
        </div>

        <div className="sp-progress-line">
          <div className="sp-progress-line__track">
            <div className="sp-progress-line__fill" style={{ width: `${view.percent}%` }} />
          </div>
          <span>
            {view.completed} of {view.total} days · {view.percent}%
          </span>
        </div>
      </div>

      <div className="sp-card">
        <div className="sp-card__title">Readings</div>
        <ol className="sp-days">
          {view.plan.days.map((day, index) => {
            const done = view.completedIds.includes(day.id)
            const isNext = view.nextDay?.id === day.id && isActive
            return (
              <li key={day.id} className={`sp-day${done ? ' sp-day--done' : ''}${isNext ? ' sp-day--next' : ''}`}>
                <button
                  type="button"
                  className="sp-day__check"
                  aria-pressed={done}
                  aria-label={done ? `Mark day ${index + 1} not done` : `Mark day ${index + 1} done`}
                  onClick={() => dispatch({ type: 'plan/toggleDay', planId: viewingId, dayId: day.id })}
                >
                  {done ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12.5l4.5 4.5L19 7" />
                    </svg>
                  ) : (
                    <span className="sp-day__index">{index + 1}</span>
                  )}
                </button>
                <div className="sp-day__body">
                  <div className="sp-day__title">{day.title}</div>
                  <div className="sp-day__ref">{formatRange(day.book, day.chapter, day.from, day.to)}</div>
                  <div className="sp-day__prompt">{day.prompt}</div>
                </div>
                <button
                  type="button"
                  className={`sp-btn${isNext ? '' : ' sp-btn--ghost'}`}
                  onClick={() => navigate(readerHref(day.book, day.chapter, { verse: day.from, day: day.id }))}
                >
                  {done ? 'Read again' : 'Read'}
                </button>
              </li>
            )
          })}
        </ol>
      </div>

      <div className="sp-card">
        <div className="sp-card__title">Other plans</div>
        <div className="sp-plan-grid">
          {PLANS.filter((p) => p.id !== viewingId).map((p) => {
            const progress = planState(state, p.id)
            return (
              <button key={p.id} type="button" className="sp-plan-card" onClick={() => navigate(`#/plan?plan=${p.id}`)}>
                <div className="sp-plan-card__title">{p.title}</div>
                <div className="sp-plan-card__meta">
                  {p.book} · {p.days.length} days
                </div>
                <div className="sp-plan-card__for">{p.forWhom}</div>
                <div className="sp-plan-card__summary">{p.summary}</div>
                {progress.completed > 0 && (
                  <div className="sp-plan-card__badge sp-plan-card__badge--quiet">
                    {progress.completed} of {progress.total} done
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </Screen>
  )
}

export function planTitle(planId: string): string {
  return getPlan(planId).title
}
