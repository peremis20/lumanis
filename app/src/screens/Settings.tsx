import { useState } from 'react'
import { useStore } from '../store/store'
import { PLANS } from '../data/plans'
import { TopBar } from '../components/TopBar'
import { Screen } from '../components/Screen'
import { useToast } from '../components/Toast'

export function Settings() {
  const { state, dispatch } = useStore()
  const toast = useToast()

  const [name, setName] = useState(state.settings.userName)
  const [avatar, setAvatar] = useState(state.settings.avatarUrl)
  const [daily, setDaily] = useState(state.settings.dailyGoalMinutes)
  const [weekly, setWeekly] = useState(state.settings.weeklyGoalDays)
  const [confirmReset, setConfirmReset] = useState(false)

  const dirty =
    name !== state.settings.userName ||
    avatar !== state.settings.avatarUrl ||
    daily !== state.settings.dailyGoalMinutes ||
    weekly !== state.settings.weeklyGoalDays

  /**
   * Save the study data as a file. When the page runs inside a host that
   * mediates downloads (the claude.ai artifact viewer), go through it — a
   * plain <a download> is inert there. Otherwise use the normal blob link,
   * and fall back to the clipboard if neither is available.
   */
  const exportData = async () => {
    const json = JSON.stringify(state, null, 2)
    const filename = 'scripturepath-data.json'

    const host = (window as Window & { claude?: { use(name: string): Promise<unknown> } }).claude
    if (host?.use) {
      const downloads = (await host.use('downloads')) as
        | { save(request: { filename: string; data: string }): Promise<unknown> }
        | null
      if (downloads) {
        try {
          await downloads.save({ filename, data: json })
          toast('Your data has been saved')
        } catch {
          toast('The download was not completed')
        }
        return
      }
    }

    try {
      const url = URL.createObjectURL(new Blob([json], { type: 'application/json' }))
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      link.click()
      URL.revokeObjectURL(url)
      toast('Your data has been downloaded')
    } catch {
      await navigator.clipboard.writeText(json)
      toast('Your data was copied to the clipboard')
    }
  }

  return (
    <Screen>
      <TopBar title="Settings" subtitle="Your name, your goals, your data." />

      <div className="sp-card">
        <div className="sp-card__title">Profile</div>
        <label className="sp-field">
          <span>Name</span>
          <input className="sp-input" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="sp-field">
          <span>Avatar image URL</span>
          <input
            className="sp-input"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            placeholder="https://…"
          />
        </label>
      </div>

      <div className="sp-card">
        <div className="sp-card__title">Goals</div>
        <label className="sp-field">
          <span>Daily goal</span>
          <div className="sp-field__row">
            <input type="range" min={5} max={90} step={1} value={daily} onChange={(e) => setDaily(Number(e.target.value))} />
            <strong>{daily} min</strong>
          </div>
        </label>
        <label className="sp-field">
          <span>Days per week</span>
          <div className="sp-field__row">
            <input type="range" min={1} max={7} value={weekly} onChange={(e) => setWeekly(Number(e.target.value))} />
            <strong>{weekly} days</strong>
          </div>
        </label>
        <div className="sp-actions">
          <button
            type="button"
            className="sp-btn"
            disabled={!dirty}
            onClick={() => {
              dispatch({
                type: 'settings/update',
                patch: { userName: name.trim() || 'Friend', avatarUrl: avatar.trim(), dailyGoalMinutes: daily, weeklyGoalDays: weekly },
              })
              toast('Settings saved')
            }}
          >
            Save changes
          </button>
        </div>
      </div>

      <div className="sp-card">
        <div className="sp-card__title">Current course</div>
        <div className="sp-plan-grid">
          {PLANS.map((plan) => (
            <button
              key={plan.id}
              type="button"
              className={`sp-plan-card${plan.id === state.activePlanId ? ' sp-plan-card--active' : ''}`}
              onClick={() => {
                dispatch({ type: 'plan/activate', planId: plan.id })
                toast(`You are enrolled in ${plan.title}`)
              }}
            >
              <div className="sp-plan-card__title">{plan.title}</div>
              <div className="sp-plan-card__meta">
                {plan.book} · {plan.days.length} days
              </div>
              <div className="sp-plan-card__for">{plan.forWhom}</div>
              {plan.id === state.activePlanId && <div className="sp-plan-card__badge">Current course</div>}
            </button>
          ))}
        </div>
      </div>

      <div className="sp-card">
        <div className="sp-card__title">Your data</div>
        <p className="sp-hint">
          Everything — notes, highlights, favourites, sessions — is stored in this browser only. Nothing is uploaded.
        </p>
        <div className="sp-actions sp-actions--start">
          <button type="button" className="sp-btn sp-btn--ghost" onClick={exportData}>
            Export as JSON
          </button>
          {confirmReset ? (
            <>
              <button
                type="button"
                className="sp-btn sp-btn--danger"
                onClick={() => {
                  dispatch({ type: 'data/reset' })
                  setConfirmReset(false)
                  toast('Everything has been reset')
                }}
              >
                Yes, erase everything
              </button>
              <button type="button" className="sp-btn sp-btn--ghost" onClick={() => setConfirmReset(false)}>
                Cancel
              </button>
            </>
          ) : (
            <button type="button" className="sp-btn sp-btn--ghost" onClick={() => setConfirmReset(true)}>
              Reset all data
            </button>
          )}
        </div>
      </div>

      <div className="sp-card">
        <div className="sp-card__title">About</div>
        <p className="sp-hint">
          Scripture text is the King James Version, which is in the public domain. ScripturePath keeps your study on your
          own device.
        </p>
      </div>
    </Screen>
  )
}
