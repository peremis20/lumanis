/**
 * Icon set transcribed 1:1 from the inline SVGs in Dashboard.dc.html.
 * Every path, viewBox and cap/join setting matches the design; size, colour
 * and stroke width stay overridable because the design reuses several of
 * these glyphs at different weights.
 */
import type { SVGProps } from 'react'

export type IconProps = {
  size?: number
  color?: string
  strokeWidth?: number
} & Omit<SVGProps<SVGSVGElement>, 'color'>

function svgProps({ size = 24, color = 'currentColor', strokeWidth = 1.7, ...rest }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    focusable: false,
    ...rest,
  }
}

export function LogoIcon({ size = 30 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1E6B45"
      strokeWidth={1.7}
      strokeLinecap="round"
      aria-hidden
      focusable={false}
    >
      <path d="M12 21c0-7 3-12 9-14-1 9-4 13-9 14z" fill="#2E8B57" stroke="none" />
      <path d="M12 21C7 19 3 14 3 6c5 1 8 5 9 9" fill="#1E6B45" stroke="none" />
      <path d="M12 21v-8" />
    </svg>
  )
}

export function HomeIcon(props: IconProps) {
  return (
    <svg {...svgProps({ strokeWidth: 1.8, ...props })}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20h14V9.5" />
    </svg>
  )
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  )
}

/** Open book, sidebar proportions (taller spine). */
export function BookNavIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      <path d="M4 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4z" />
      <path d="M20 4h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6z" />
    </svg>
  )
}

/** Open book, content proportions — used in buttons, stats and activity. */
export function BookIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      <path d="M4 5h6a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H4z" />
      <path d="M20 5h-6a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h6z" />
    </svg>
  )
}

export function PencilIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z" />
    </svg>
  )
}

export function TrendIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      <path d="M3 17l6-6 4 3 8-8" />
      <path d="M16 6h5v5" />
    </svg>
  )
}

export function StarIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      <path d="M12 4l2.5 5.2 5.5.8-4 3.9 1 5.6-5-2.9-5 2.9 1-5.6-4-3.9 5.5-.8z" />
    </svg>
  )
}

export function CommunityIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5" />
      <path d="M16 6.5a2.8 2.8 0 0 1 0 5.4M17 14.5c2.4.6 4 2.3 4 4.5" />
    </svg>
  )
}

export function SettingsIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2.5M12 18.5V21M4.2 7.5l2.2 1.3M17.6 15.2l2.2 1.3M4.2 16.5l2.2-1.3M17.6 8.8l2.2-1.3" />
    </svg>
  )
}

export function SunIcon(props: IconProps) {
  return (
    <svg {...svgProps({ strokeWidth: 1.8, strokeLinejoin: undefined, ...props })}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M6 18l1.4-1.4M16.6 7.4 18 6" />
    </svg>
  )
}

export function HeartIcon({ filled = false, ...props }: IconProps & { filled?: boolean }) {
  return (
    <svg {...svgProps({ strokeWidth: 1.8, ...props })} fill={filled ? '#D97B2E' : 'none'}>
      <path d="M12 20s-7-4.4-7-9.2A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7 2.8C19 15.6 12 20 12 20z" />
    </svg>
  )
}

export function ShareIcon(props: IconProps) {
  return (
    <svg {...svgProps({ strokeWidth: 1.8, ...props })}>
      <circle cx="18" cy="5.5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="18.5" r="2.5" />
      <path d="M8.3 10.8 15.7 6.8M8.3 13.2l7.4 4" />
    </svg>
  )
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...svgProps({ strokeWidth: 1.8, ...props })}>
      <path d="M6 9.5l6 6 6-6" />
    </svg>
  )
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg {...svgProps({ strokeWidth: 2, ...props })}>
      <path d="M9.5 6l6 6-6 6" />
    </svg>
  )
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...svgProps({ strokeWidth: 1.9, strokeLinejoin: undefined, ...props })}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </svg>
  )
}

export function BellIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      <path d="M6 10a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 14 6 10z" />
      <path d="M10 19a2.2 2.2 0 0 0 4 0" />
    </svg>
  )
}

export function PlusIcon(props: IconProps) {
  return (
    <svg {...svgProps({ strokeWidth: 2.2, strokeLinejoin: undefined, ...props })}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

/** Clock with the wide dial used beside "Time Studied" in Today's Progress. */
export function ClockLargeIcon(props: IconProps) {
  return (
    <svg {...svgProps({ strokeWidth: 1.5, strokeLinejoin: undefined, ...props })}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  )
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...svgProps({ strokeLinejoin: undefined, ...props })}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  )
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...svgProps({ strokeWidth: 2.6, ...props })}>
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  )
}

export function TargetIcon(props: IconProps) {
  return (
    <svg {...svgProps({ strokeWidth: 1.8, strokeLinejoin: undefined, ...props })}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 12l7-7" />
    </svg>
  )
}

export function PlayIcon({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden focusable={false}>
      <path d="M7 4l12 8-12 8z" />
    </svg>
  )
}

export function NoteIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      <rect x="4" y="3.5" width="16" height="17" rx="3" />
      <path d="M8 9h8M8 13h8M8 17h4" />
    </svg>
  )
}

export function CommentaryIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      <path d="M6 4h9l3 3v13H6z" />
      <path d="M9 9h6M9 13h6M9 17h3" />
    </svg>
  )
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      <path d="M12 21s6.5-6.2 6.5-11a6.5 6.5 0 1 0-13 0C5.5 14.8 12 21 12 21z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  )
}

export function DictionaryIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      <path d="M6 3.5h8l4 4v13H6z" />
      <path d="M9.5 11.5h5M9.5 15h3" />
    </svg>
  )
}

export function ImagePlaceholderIcon(props: IconProps) {
  return (
    <svg {...svgProps({ size: 20, strokeWidth: 1.6, ...props })}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <circle cx="8.5" cy="10" r="1.6" />
      <path d="M4 17l4.5-4.5 3.5 3 3-2.5L20 17" />
    </svg>
  )
}
