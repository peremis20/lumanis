import type { StudyPlan } from '../data/types'
import { ImageSlot } from './ImageSlot'
import { PlayIcon } from './icons'

export function ContinuePlanCard({ plan }: { plan: StudyPlan }) {
  return (
    <section className="card">
      <div className="card__head card__head--ruled">
        <div className="card__title">Continue Your Plan</div>
        <button type="button" className="reset-btn card__link">
          View Plan
        </button>
      </div>

      <div className="plan">
        <ImageSlot
          className="plan__cover"
          src={plan.coverUrl}
          alt=""
          placeholder="Plan cover"
          shape="rounded"
          radius={12}
        />

        <div className="plan__body">
          <div className="plan__title">{plan.title}</div>
          <div className="plan__meta">{plan.meta}</div>

          <div className="plan__progress">
            <div className="plan__bar">
              <div className="plan__bar-fill" style={{ width: `${plan.percentComplete}%` }} />
            </div>
            <div className="plan__pct">{plan.percentComplete}%</div>
          </div>

          <div className="plan__next">{plan.nextReading}</div>

          <div className="plan__cta">
            <button type="button" className="reset-btn btn-primary btn-primary--sm">
              Continue
              <PlayIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
