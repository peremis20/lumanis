const SIZE = 172
const RADIUS = 76
const STROKE = 15
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

/** Donut gauge from the design: 172px box, 76px radius, drawn from 12 o'clock. */
export function ProgressRing({ percent, label }: { percent: number; label: string }) {
  const clamped = Math.max(0, Math.min(100, percent))
  const filled = (CIRCUMFERENCE * clamped) / 100

  return (
    <div className="ring">
      <svg
        className="ring__svg"
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-label={`${Math.round(clamped)}% of ${label.toLowerCase()} complete`}
      >
        <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" stroke="#EDEAE1" strokeWidth={STROKE} />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="#16452F"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={`${filled.toFixed(1)} ${CIRCUMFERENCE.toFixed(1)}`}
        />
      </svg>
      <div className="ring__center">
        <div className="ring__value">
          {Math.round(clamped)}
          <span className="ring__unit">%</span>
        </div>
        <div className="ring__label">{label}</div>
      </div>
    </div>
  )
}
