import type { TodaysProgress } from '../data/types'
import { ProgressRing } from './ProgressRing'
import { BookIcon, ClockLargeIcon } from './icons'

export function TodaysProgressCard({ today }: { today: TodaysProgress }) {
  return (
    <section className="card">
      <div className="card__title">Today's Progress</div>

      <div className="today">
        <ProgressRing percent={today.dailyGoalPercent} label="Daily Goal" />

        <div className="today__side">
          <div className="today__metrics">
            <ClockLargeIcon size={34} color="#3F3B34" />
            <div className="today__metric-list">
              <div className="today__metric">
                Time Studied<span>{today.timeStudied}</span>
              </div>
              <div className="today__metric">
                Verses Studied<span>{today.versesStudied}</span>
              </div>
            </div>
          </div>

          <div className="today__note">{today.encouragement}</div>

          <button type="button" className="reset-btn btn-primary btn-primary--block">
            <BookIcon size={18} />
            Continue Study
          </button>
        </div>
      </div>
    </section>
  )
}
