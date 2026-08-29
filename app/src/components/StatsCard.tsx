import type { Stat } from '../data/types'
import { IconTile } from './Icon'
import { ChevronDownIcon } from './icons'

export function StatsCard({ stats, period }: { stats: Stat[]; period: string }) {
  return (
    <section className="card">
      <div className="card__head card__head--ruled">
        <div className="card__title">Your Stats</div>
        <button type="button" className="reset-btn stats__filter">
          {period}
          <ChevronDownIcon size={15} color="#8B8579" strokeWidth={2} />
        </button>
      </div>

      <div className="stats__grid">
        {stats.map((stat) => (
          <div className="stat" key={stat.id}>
            <IconTile icon={stat.icon} tone={stat.tone} />
            <div>
              <div className="stat__value">{stat.value}</div>
              <div className="stat__label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
