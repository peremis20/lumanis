import type { WeeklyProgress } from '../data/types'
import { CheckIcon, TargetIcon } from './icons'

export function WeeklyProgressCard({ weekly }: { weekly: WeeklyProgress }) {
  return (
    <section className="card">
      <div className="card__head">
        <div className="card__title">Weekly Progress</div>
        <div className="weekly__count">
          {weekly.daysCompleted} of {weekly.daysInWeek} days
        </div>
      </div>
      <div className="weekly__sub">{weekly.message}</div>

      <div className="weekly__days">
        {weekly.days.map((day) => (
          <div className="day" key={day.label}>
            <div className={`day__mark day__mark--${day.state}`}>
              {day.state === 'done' && <CheckIcon size={17} color="#FFFFFF" />}
            </div>
            <div className={`day__label${day.state === 'upcoming' ? ' day__label--muted' : ''}`}>
              {day.label}
            </div>
          </div>
        ))}
      </div>

      <div className="goal">
        <TargetIcon size={24} color="#E8862E" />
        <div className="goal__text">
          <div className="goal__title">{weekly.goalTitle}</div>
          <div className="goal__sub">{weekly.goalDetail}</div>
        </div>
        <button type="button" className="reset-btn goal__edit">
          Edit Goal
        </button>
      </div>
    </section>
  )
}
