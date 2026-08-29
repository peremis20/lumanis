import type { ActivityEntry } from '../data/types'
import { IconTile } from './Icon'
import { ChevronRightIcon } from './icons'

export function RecentActivityCard({ activity }: { activity: ActivityEntry[] }) {
  return (
    <section className="card card--list">
      <div className="card__head card__head--ruled">
        <div className="card__title">Recent Activity</div>
        <button type="button" className="reset-btn card__link">
          View All
        </button>
      </div>

      <div className="activity">
        {activity.map((entry) => (
          <button type="button" className="reset-btn activity__item" key={entry.id}>
            <IconTile icon={entry.icon} tone={entry.tone} />
            <div className="activity__text">
              <div className="activity__title">{entry.title}</div>
              <div className="activity__time">{entry.time}</div>
            </div>
            <ChevronRightIcon size={18} color="#A09A8E" />
          </button>
        ))}
      </div>
    </section>
  )
}
