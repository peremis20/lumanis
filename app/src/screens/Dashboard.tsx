/**
 * Dashboard — the design's <main>, wired to real data.
 *
 * Every style object here is the one from project/Dashboard.dc.html. What
 * changed is where the numbers come from (the store, not literals) and that
 * each control now does the thing it advertises.
 */
import { useState } from 'react'
import { navigate, readerHref } from '../router'
import { useStore } from '../store/store'
import {
  dailyGoalPercent,
  daysCompletedThisWeek,
  formatMinutes,
  formatWhen,
  minutesToday,
  planState,
  statsFor,
  versesOn,
  weekDays,
} from '../store/derive'
import type { ActivityKind, StatsPeriod } from '../store/types'
import { formatRange, PLANS } from '../data/plans'
import { ImageSlot } from '../ImageSlot'
import { DayDetail } from '../components/DayDetail'
import { Modal } from '../components/Modal'
import { TopBar } from '../components/TopBar'
import { useToast } from '../components/Toast'

const PERIOD_LABEL: Record<StatsPeriod, string> = {
  week: 'This Week',
  month: 'This Month',
  all: 'All Time',
}

const CARD = {
  background: '#FFFFFF',
  border: '1px solid #ECE7DC',
  borderRadius: '16px',
  padding: '24px 26px 26px',
} as const

const CARD_TITLE = {
  fontFamily: "'Source Serif 4',serif",
  fontSize: '18px',
  fontWeight: '600',
  color: '#22201C',
} as const

const RULED_HEAD = {
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  paddingBottom: '20px',
  borderBottom: '1px solid #ECE7DC',
} as const

const TILE = {
  width: '44px',
  height: '44px',
  flex: 'none',
  borderRadius: '11px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
} as const

function greetingFor(date = new Date()): string {
  const hour = date.getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

const ACTIVITY_ICON: Record<ActivityKind, { tint: string; color: string; glyph: React.ReactNode }> = {
  read: {
    tint: '#EAF1EC',
    color: '#1E6B45',
    glyph: (
      <>
        <path d="M4 5h6a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H4z" />
        <path d="M20 5h-6a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h6z" />
      </>
    ),
  },
  highlight: {
    tint: '#FDF6E7',
    color: '#D9A22E',
    glyph: <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z" />,
  },
  note: {
    tint: '#EAEFF6',
    color: '#3D6491',
    glyph: (
      <>
        <rect x="4" y="3.5" width="16" height="17" rx="3" />
        <path d="M8 9h8M8 13h8M8 17h4" />
      </>
    ),
  },
  favorite: {
    tint: '#FDF6E7',
    color: '#D9A22E',
    glyph: <path d="M12 4l2.5 5.2 5.5.8-4 3.9 1 5.6-5-2.9-5 2.9 1-5.6-4-3.9 5.5-.8z" />,
  },
  plan: {
    tint: '#EAF1EC',
    color: '#1E6B45',
    glyph: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M3 10h18M8 3v4M16 3v4" />
      </>
    ),
  },
  community: {
    tint: '#EAEFF6',
    color: '#3D6491',
    glyph: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5" />
        <path d="M16 6.5a2.8 2.8 0 0 1 0 5.4M17 14.5c2.4.6 4 2.3 4 4.5" />
      </>
    ),
  },
}

const TOOLS = [
  {
    label: 'Study Bible',
    href: '#/library/bible',
    color: '#1E6B45',
    glyph: (
      <>
        <path d="M4 5h6a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H4z" />
        <path d="M20 5h-6a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h6z" />
      </>
    ),
  },
  {
    label: 'Commentaries',
    href: '#/library/tools/commentaries',
    color: '#D9A22E',
    glyph: (
      <>
        <path d="M6 4h9l3 3v13H6z" />
        <path d="M9 9h6M9 13h6M9 17h3" />
      </>
    ),
  },
  {
    label: 'Bible Maps',
    href: '#/library/tools/maps',
    color: '#3D6491',
    glyph: (
      <>
        <path d="M12 21s6.5-6.2 6.5-11a6.5 6.5 0 1 0-13 0C5.5 14.8 12 21 12 21z" />
        <circle cx="12" cy="10" r="2.3" />
      </>
    ),
  },
  {
    label: 'Dictionary',
    href: '#/library/tools/dictionary',
    color: '#E8862E',
    glyph: (
      <>
        <path d="M6 3.5h8l4 4v13H6z" />
        <path d="M9.5 11.5h5M9.5 15h3" />
      </>
    ),
  },
]

export function Dashboard() {
  const { state, dispatch } = useStore()
  const toast = useToast()

  const [period, setPeriod] = useState<StatsPeriod>('month')
  const [periodOpen, setPeriodOpen] = useState(false)
  const [periodAnchor, setPeriodAnchor] = useState<DOMRect | null>(null)
  const [goalOpen, setGoalOpen] = useState(false)
  const [plansOpen, setPlansOpen] = useState(false)
  const [weeklyGoalDraft, setWeeklyGoalDraft] = useState(state.settings.weeklyGoalDays)
  const [dailyGoalDraft, setDailyGoalDraft] = useState(state.settings.dailyGoalMinutes)
  const [dayDetail, setDayDetail] = useState<Date | null>(null)

  const percent = dailyGoalPercent(state)
  const circumference = 2 * Math.PI * 76
  const ringDash = `${((circumference * percent) / 100).toFixed(1)} ${circumference.toFixed(1)}`

  const week = weekDays(state)
  const doneThisWeek = daysCompletedThisWeek(state)
  const plan = planState(state)
  const stats = statsFor(state, period)
  const recent = state.activity.slice(0, 3)

  const nextHref = plan.nextDay
    ? readerHref(plan.nextDay.book, plan.nextDay.chapter, { verse: plan.nextDay.from, day: plan.nextDay.id })
    : '#/learning/courses'

  const encouragement =
    percent >= 100
      ? "Goal met today. Rest — you don't have to earn tomorrow."
      : "Keep it up! You're building something that lasts."

  const weeklyMessage =
    doneThisWeek >= state.settings.weeklyGoalDays
      ? 'Weekly goal reached. 🔥 Anything more is a gift.'
      : doneThisWeek > 0
        ? "You're on fire! 🔥 Keep showing up."
        : 'A new week. One reading is enough to start.'

  return (
    <main
      className="sp-main"
      style={{ flex: '1', minWidth: '1120px', padding: '34px 44px 44px', display: 'flex', flexDirection: 'column', gap: '26px' }}
    >
      <TopBar
        title={`${greetingFor()}, ${state.settings.userName} 👋`}
        subtitle="Keep seeking. Keep growing. God is with you."
      />

      <div className="sp-dash-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Today's Progress */}
        <section style={CARD}>
          <div style={CARD_TITLE}>Today's Progress</div>
          <div className="sp-today-row" style={{ display: 'flex', alignItems: 'center', gap: '26px', marginTop: '20px' }}>
            <div style={{ position: 'relative', width: '172px', height: '172px', flex: 'none' }}>
              <svg width="172" height="172" viewBox="0 0 172 172" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="86" cy="86" r="76" fill="none" stroke="#EDEAE1" strokeWidth="15" />
                <circle cx="86" cy="86" r="76" fill="none" stroke="#16452F" strokeWidth="15" strokeLinecap="round" strokeDasharray={ringDash} />
              </svg>
              <div style={{ position: 'absolute', inset: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontFamily: "'Source Serif 4',serif", fontSize: '38px', fontWeight: '600', color: '#16452F', lineHeight: '1' }}>
                  {percent}
                  <span style={{ fontSize: '20px' }}>%</span>
                </div>
                <div style={{ fontSize: '12.5px', color: '#8B8579', marginTop: '6px' }}>Daily Goal</div>
              </div>
            </div>
            <div className="sp-today-side" style={{ flex: '1', minWidth: '0', borderLeft: '1px solid #ECE7DC', paddingLeft: '26px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#3F3B34" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7.5V12l3 2" />
                </svg>
                <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#3F3B34' }}>
                    Time Studied<span style={{ fontWeight: '700', color: '#22201C' }}>{formatMinutes(minutesToday(state))}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#3F3B34' }}>
                    Verses Studied<span style={{ fontWeight: '700', color: '#22201C' }}>{versesOn(state, new Date())}</span>
                  </div>
                </div>
              </div>
              <div style={{ borderTop: '1px solid #ECE7DC', paddingTop: '16px', fontSize: '14px', lineHeight: '1.55', color: '#3F3B34', textWrap: 'pretty' }}>
                {encouragement}
              </div>
              <div
                className="hv-12 sp-cta-block"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && navigate(nextHref)}
                onClick={() => navigate(nextHref)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', height: '50px', background: '#16452F', color: '#FFFFFF', borderRadius: '11px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h6a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H4z" />
                  <path d="M20 5h-6a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h6z" />
                </svg>
                Continue Study
              </div>
            </div>
          </div>
        </section>

        {/* Weekly Progress */}
        <section style={CARD}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <div style={CARD_TITLE}>Weekly Progress</div>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#D97B2E' }}>{doneThisWeek} of 7 days</div>
          </div>
          <div style={{ marginTop: '10px', fontSize: '14px', color: '#6E6A62' }}>{weeklyMessage}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '8px', marginTop: '26px' }}>
            {week.map((day) => (
              <div
                key={day.label}
                role="button"
                tabIndex={0}
                aria-label={`${day.label}, ${formatMinutes(day.minutes)} studied`}
                onKeyDown={(e) => e.key === 'Enter' && setDayDetail(day.date)}
                onClick={() => setDayDetail(day.date)}
                title={`${day.label}: ${formatMinutes(day.minutes)}`}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '11px', cursor: 'pointer' }}
              >
                {day.state === 'done' ? (
                  <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#E8862E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12.5l4.5 4.5L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div
                    style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#FFFFFF', border: `1.8px solid ${day.state === 'today' ? '#DAD5C9' : '#EAE5DA'}` }}
                  />
                )}
                <div style={{ fontSize: '12.5px', color: day.future ? '#8B8579' : '#3F3B34' }}>{day.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '26px', padding: '16px 20px', background: '#FDF3E7', borderRadius: '12px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E8862E" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="12" cy="12" r="8.5" />
              <circle cx="12" cy="12" r="3.5" />
              <path d="M12 12l7-7" />
            </svg>
            <div style={{ flex: '1' }}>
              <div style={{ fontSize: '14.5px', fontWeight: '600', color: '#22201C' }}>Weekly Goal</div>
              <div style={{ fontSize: '13px', color: '#6E6A62', marginTop: '2px' }}>{state.settings.weeklyGoalDays} days per week</div>
            </div>
            <div
              className="hv-11"
              role="button"
              tabIndex={0}
              onClick={() => {
                setWeeklyGoalDraft(state.settings.weeklyGoalDays)
                setDailyGoalDraft(state.settings.dailyGoalMinutes)
                setGoalOpen(true)
              }}
              style={{ fontSize: '14px', fontWeight: '500', color: '#3F3B34', cursor: 'pointer' }}
            >
              Edit Goal
            </div>
          </div>
        </section>

        {/* Continue Your Plan */}
        <section style={CARD}>
          <div style={RULED_HEAD}>
            <div style={CARD_TITLE}>Continue Your Plan</div>
            <div onClick={() => navigate('#/learning/courses')} style={{ fontSize: '14px', fontWeight: '500', color: '#D97B2E', cursor: 'pointer' }}>
              View Plan
            </div>
          </div>
          <div style={{ display: 'flex', gap: '22px', marginTop: '22px' }}>
            <ImageSlot
              id="plan-cover"
              shape="rounded"
              radius="12"
              placeholder="Plan cover"
              ariaLabel={`Open ${plan.plan.title}`}
              onClick={() => navigate('#/learning/courses')}
              style={{ width: '94px', height: '140px', flex: 'none' }}
            />
            <div style={{ flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontFamily: "'Source Serif 4',serif", fontSize: '20px', fontWeight: '600', color: '#22201C' }}>{plan.plan.title}</div>
              <div style={{ fontSize: '14px', color: '#6E6A62', marginTop: '5px' }}>
                {plan.plan.book} · {plan.plan.level}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '22px' }}>
                <div style={{ flex: '1', height: '8px', borderRadius: '99px', background: '#EDEAE1', overflow: 'hidden' }}>
                  <div style={{ width: `${plan.percent}%`, height: '100%', borderRadius: '99px', background: '#16452F' }} />
                </div>
                <div style={{ fontSize: '13.5px', fontWeight: '600', color: '#3F3B34' }}>{`${plan.percent}%`}</div>
              </div>
              <div style={{ fontSize: '13.5px', color: '#3F3B34', marginTop: '14px' }}>
                {plan.nextDay
                  ? `Next: ${formatRange(plan.nextDay.book, plan.nextDay.chapter, plan.nextDay.from, plan.nextDay.to)}`
                  : 'Plan complete — every day finished.'}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto', paddingTop: '18px' }}>
                <div
                  className="hv-10"
                  onClick={() => navigate(nextHref)}
                  style={{ display: 'flex', alignItems: 'center', gap: '9px', height: '44px', padding: '0 22px', background: '#16452F', color: '#FFFFFF', borderRadius: '10px', fontSize: '14.5px', fontWeight: '600', cursor: 'pointer' }}
                >
                  {plan.nextDay ? 'Continue' : 'Review'}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 4l12 8-12 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Your Stats */}
        <section style={CARD}>
          <div style={RULED_HEAD}>
            <div style={CARD_TITLE}>Your Stats</div>
            <div
              onClick={(e) => {
                setPeriodAnchor(e.currentTarget.getBoundingClientRect())
                setPeriodOpen((v) => !v)
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '14px', fontWeight: '500', color: '#3F3B34', cursor: 'pointer' }}
            >
              {PERIOD_LABEL[period]}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8B8579" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9.5l6 6 6-6" />
              </svg>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '22px' }}>
            {[
              { value: String(stats.chapters), label: 'Chapters Studied', tint: '#EAF1EC', color: '#1E6B45', href: '#/learning/progress', glyph: ACTIVITY_ICON.read.glyph },
              { value: formatMinutes(stats.minutes), label: 'Time Studied', tint: '#FDF1E4', color: '#E8862E', href: '#/learning/progress', linejoin: false, glyph: (<><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>) },
              { value: String(stats.notes), label: 'Notes Created', tint: '#FDF6E7', color: '#D9A22E', href: '#/library/notes', glyph: ACTIVITY_ICON.highlight.glyph },
              { value: String(stats.highlights), label: 'Highlights', tint: '#FDF6E7', color: '#D9A22E', href: '#/library/notes?tab=highlights', glyph: ACTIVITY_ICON.favorite.glyph },
            ].map((stat) => (
              <div
                key={stat.label}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && navigate(stat.href)}
                onClick={() => navigate(stat.href)}
                style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '18px', border: '1px solid #EFEBE2', borderRadius: '12px', cursor: 'pointer' }}
              >
                <div style={{ ...TILE, background: stat.tint }}>
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={stat.color}
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin={'linejoin' in stat && !stat.linejoin ? undefined : 'round'}
                  >
                    {stat.glyph}
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: "'Source Serif 4',serif", fontSize: '24px', fontWeight: '600', color: '#22201C', lineHeight: '1.1' }}>{stat.value}</div>
                  <div style={{ fontSize: '13px', color: '#6E6A62', marginTop: '4px' }}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section style={{ ...CARD, padding: '24px 26px 12px' }}>
          <div style={RULED_HEAD}>
            <div style={CARD_TITLE}>Recent Activity</div>
            <div onClick={() => navigate('#/learning/progress')} style={{ fontSize: '14px', fontWeight: '500', color: '#D97B2E', cursor: 'pointer' }}>
              View All
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {recent.map((entry, index) => {
              const icon = ACTIVITY_ICON[entry.kind]
              return (
                <div
                  key={entry.id}
                  onClick={() => entry.href && navigate(entry.href)}
                  style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '18px 0', borderBottom: index === recent.length - 1 ? undefined : '1px solid #F2EFE7', cursor: 'pointer' }}
                >
                  <div style={{ ...TILE, background: icon.tint }}>
                    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={icon.color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      {icon.glyph}
                    </svg>
                  </div>
                  <div style={{ flex: '1', minWidth: '0' }}>
                    <div style={{ fontSize: '14.5px', fontWeight: '600', color: '#22201C' }}>{entry.title}</div>
                    <div style={{ fontSize: '13px', color: '#8B8579', marginTop: '4px' }}>{formatWhen(entry.at)}</div>
                  </div>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A09A8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.5 6l6 6-6 6" />
                  </svg>
                </div>
              )
            })}
          </div>
        </section>

        {/* Tools + banner */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <section style={CARD}>
            <div style={{ ...CARD_TITLE, paddingBottom: '20px', borderBottom: '1px solid #ECE7DC' }}>Tools Quick Access</div>
            <div className="sp-quick-tools" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px', marginTop: '22px' }}>
              {TOOLS.map((tool) => (
                <div
                  key={tool.label}
                  className="hv-13"
                  onClick={() => navigate(tool.href)}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '20px 8px', border: '1px solid #EFEBE2', borderRadius: '12px', cursor: 'pointer' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={tool.color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    {tool.glyph}
                  </svg>
                  <div style={{ fontSize: '13px', fontWeight: '500', color: '#3F3B34', textAlign: 'center' }}>{tool.label}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="sp-rooted" style={{ display: 'flex', alignItems: 'center', gap: '24px', background: '#123A28', borderRadius: '16px', padding: '26px 30px' }}>
            <ImageSlot id="plant" shape="rounded" radius="10" placeholder="Illustration" style={{ width: '104px', height: '104px', flex: 'none' }} />
            <div style={{ flex: '1', minWidth: '0' }}>
              <div style={{ fontFamily: "'Source Serif 4',serif", fontSize: '20px', fontWeight: '600', color: '#FFFFFF' }}>Stay rooted in the Word</div>
              <div style={{ fontSize: '14px', lineHeight: '1.55', color: '#C8D8CD', marginTop: '8px', textWrap: 'pretty' }}>
                The more time you spend in God's Word, the more it transforms your life.
              </div>
            </div>
            <div
              className="hv-17"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setPlansOpen(true)}
              onClick={() => setPlansOpen(true)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '46px', padding: '0 22px', border: '1.5px solid rgba(255,255,255,0.35)', borderRadius: '10px', color: '#FFFFFF', fontSize: '14.5px', fontWeight: '600', cursor: 'pointer', flex: 'none' }}
            >
              Explore Plans
            </div>
          </section>
        </div>
      </div>

      {periodOpen && periodAnchor && (
        <>
          <div className="sp-scrim-transparent" onClick={() => setPeriodOpen(false)} />
          <div className="sp-menu" style={{ top: periodAnchor.bottom + 8, left: periodAnchor.right - 150 }}>
            {(Object.keys(PERIOD_LABEL) as StatsPeriod[]).map((key) => (
              <button
                key={key}
                type="button"
                className={`sp-menu__item${key === period ? ' sp-menu__item--on' : ''}`}
                onClick={() => {
                  setPeriod(key)
                  setPeriodOpen(false)
                }}
              >
                {PERIOD_LABEL[key]}
              </button>
            ))}
          </div>
        </>
      )}

      {dayDetail && <DayDetail date={dayDetail} onClose={() => setDayDetail(null)} />}

      {goalOpen && (
        <Modal title="Edit your goals" subtitle="Small and repeatable beats ambitious and abandoned." onClose={() => setGoalOpen(false)} width={460}>
          <label className="sp-field">
            <span>Daily goal</span>
            <div className="sp-field__row">
              <input
                type="range"
                min={5}
                max={90}
                step={5}
                value={dailyGoalDraft}
                onChange={(e) => setDailyGoalDraft(Number(e.target.value))}
              />
              <strong>{dailyGoalDraft} min</strong>
            </div>
          </label>
          <label className="sp-field">
            <span>Days per week</span>
            <div className="sp-field__row">
              <input
                type="range"
                min={1}
                max={7}
                value={weeklyGoalDraft}
                onChange={(e) => setWeeklyGoalDraft(Number(e.target.value))}
              />
              <strong>{weeklyGoalDraft} days</strong>
            </div>
          </label>
          <div className="sp-actions">
            <button type="button" className="sp-btn sp-btn--ghost" onClick={() => setGoalOpen(false)}>
              Cancel
            </button>
            <button
              type="button"
              className="sp-btn"
              onClick={() => {
                dispatch({
                  type: 'settings/update',
                  patch: { dailyGoalMinutes: dailyGoalDraft, weeklyGoalDays: weeklyGoalDraft },
                })
                setGoalOpen(false)
                toast('Goals updated')
              }}
            >
              Save goals
            </button>
          </div>
        </Modal>
      )}

      {plansOpen && (
        <Modal title="Explore plans" subtitle="Every plan is short, guided, and written for a hard season." onClose={() => setPlansOpen(false)} width={620}>
          <div className="sp-plan-grid">
            {PLANS.map((p) => (
              <button
                key={p.id}
                type="button"
                className={`sp-plan-card${p.id === state.activePlanId ? ' sp-plan-card--active' : ''}`}
                onClick={() => {
                  dispatch({ type: 'plan/activate', planId: p.id })
                  setPlansOpen(false)
                  toast(`You are enrolled in ${p.title}`)
                  navigate('#/learning/courses')
                }}
              >
                <div className="sp-plan-card__title">{p.title}</div>
                <div className="sp-plan-card__meta">
                  {p.book} · {p.level} · {p.days.length} days
                </div>
                <div className="sp-plan-card__for">{p.forWhom}</div>
                <div className="sp-plan-card__summary">{p.summary}</div>
                {p.id === state.activePlanId && <div className="sp-plan-card__badge">Current course</div>}
              </button>
            ))}
          </div>
        </Modal>
      )}
    </main>
  )
}
