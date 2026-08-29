import { useState } from 'react'
import { navigate } from '../router'
import { useStore } from '../store/store'
import {
  currentStreak,
  dailyMinutes,
  formatDay,
  formatMinutes,
  formatWhen,
  statsFor,
  weekDays,
} from '../store/derive'
import type { StatsPeriod } from '../store/types'
import { DayDetail } from '../components/DayDetail'
import { TopBar } from '../components/TopBar'
import { Screen } from '../components/Screen'

const PERIODS: Array<{ id: StatsPeriod; label: string }> = [
  { id: 'week', label: 'This Week' },
  { id: 'month', label: 'Last 30 days' },
  { id: 'all', label: 'All Time' },
]

export function Progress() {
  const { state } = useStore()
  const [period, setPeriod] = useState<StatsPeriod>('month')
  const [dayDetail, setDayDetail] = useState<Date | null>(null)

  const stats = statsFor(state, period)
  const streak = currentStreak(state)
  const series = dailyMinutes(state, 14)
  const peak = Math.max(state.settings.dailyGoalMinutes, ...series.map((d) => d.minutes))
  const week = weekDays(state)

  return (
    <Screen>
      <TopBar title="Progress" subtitle="What has actually happened, not what you meant to do." />

      <div className="sp-card">
        <div className="sp-toolbar">
          <div className="sp-tabs">
            {PERIODS.map((p) => (
              <button
                key={p.id}
                type="button"
                className={`sp-tab${period === p.id ? ' sp-tab--on' : ''}`}
                onClick={() => setPeriod(p.id)}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="sp-streak">
            🔥 {streak} day{streak === 1 ? '' : 's'} in a row
          </div>
        </div>

        <div className="sp-stat-row">
          {[
            { label: 'Chapters studied', value: String(stats.chapters) },
            { label: 'Time studied', value: formatMinutes(stats.minutes) },
            { label: 'Notes created', value: String(stats.notes) },
            { label: 'Highlights', value: String(stats.highlights) },
          ].map((s) => (
            <div key={s.label} className="sp-stat">
              <div className="sp-stat__value">{s.value}</div>
              <div className="sp-stat__label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="sp-card">
        <div className="sp-card__title">Last 14 days</div>
        <div className="sp-chart" role="img" aria-label="Minutes studied per day over the last fourteen days">
          {series.map((point) => {
            const height = peak ? Math.round((point.minutes / peak) * 100) : 0
            const met = point.minutes >= state.settings.dailyGoalMinutes
            return (
              <button
                key={point.date.toISOString()}
                type="button"
                className="sp-chart__col"
                aria-label={`${formatDay(point.date)}, ${formatMinutes(point.minutes)}`}
                onClick={() => setDayDetail(point.date)}
                title={`${formatDay(point.date)} · ${formatMinutes(point.minutes)}`}
              >
                <div className="sp-chart__bar-track">
                  <div
                    className={`sp-chart__bar${met ? ' sp-chart__bar--met' : ''}`}
                    style={{ height: `${Math.max(height, point.minutes ? 6 : 2)}%` }}
                  />
                </div>
                <div className="sp-chart__label">{formatDay(point.date)}</div>
              </button>
            )
          })}
        </div>
        <div className="sp-chart__legend">
          <span className="sp-legend-swatch sp-legend-swatch--met" /> Goal met
          <span className="sp-legend-swatch" /> Below {state.settings.dailyGoalMinutes} min
        </div>
      </div>

      <div className="sp-card">
        <div className="sp-card__title">This week</div>
        <div className="sp-week">
          {week.map((day) => (
            <button
              key={day.label}
              type="button"
              className={`sp-week__day sp-week__day--${day.state}`}
              onClick={() => setDayDetail(day.date)}
            >
              <div className="sp-week__label">{day.label}</div>
              <div className="sp-week__minutes">{day.minutes ? formatMinutes(day.minutes) : '—'}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="sp-card">
        <div className="sp-card__title">Activity</div>
        <div className="sp-stack">
          {state.activity.map((entry) => (
            <button
              key={entry.id}
              type="button"
              className="sp-activity"
              onClick={() => entry.href && navigate(entry.href)}
            >
              <span className={`sp-activity__dot sp-activity__dot--${entry.kind}`} />
              <span className="sp-activity__title">{entry.title}</span>
              <span className="sp-activity__time">{formatWhen(entry.at)}</span>
            </button>
          ))}
          {state.activity.length === 0 && <div className="sp-empty">Nothing logged yet.</div>}
        </div>
      </div>

      <div className="sp-card">
        <div className="sp-card__title">Reading sessions</div>
        <table className="sp-table">
          <thead>
            <tr>
              <th>When</th>
              <th>Passage</th>
              <th>Verses</th>
              <th>Minutes</th>
            </tr>
          </thead>
          <tbody>
            {state.sessions.map((session) => (
              <tr key={session.id}>
                <td>{formatWhen(session.at)}</td>
                <td>
                  {session.ref.book === 'Psalms' ? 'Psalm' : session.ref.book} {session.ref.chapter}
                </td>
                <td>{session.verses}</td>
                <td>{session.minutes}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {state.sessions.length === 0 && <div className="sp-empty">No sessions recorded yet.</div>}
      </div>
      {dayDetail && <DayDetail date={dayDetail} onClose={() => setDayDetail(null)} />}
    </Screen>
  )
}
