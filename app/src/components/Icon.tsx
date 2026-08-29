import type { ComponentType } from 'react'
import type { IconKey, Tone } from '../data/types'
import {
  BookIcon,
  BookNavIcon,
  CalendarIcon,
  ClockIcon,
  CommentaryIcon,
  CommunityIcon,
  DictionaryIcon,
  HomeIcon,
  MapPinIcon,
  NoteIcon,
  PencilIcon,
  SettingsIcon,
  StarIcon,
  TrendIcon,
  type IconProps,
} from './icons'

const ICONS: Record<IconKey, ComponentType<IconProps>> = {
  home: HomeIcon,
  calendar: CalendarIcon,
  'book-nav': BookNavIcon,
  book: BookIcon,
  pencil: PencilIcon,
  trend: TrendIcon,
  star: StarIcon,
  community: CommunityIcon,
  settings: SettingsIcon,
  clock: ClockIcon,
  note: NoteIcon,
  commentary: CommentaryIcon,
  'map-pin': MapPinIcon,
  dictionary: DictionaryIcon,
}

/** Icon colour that goes with each tinted tile background. */
export const TONE_COLOR: Record<Tone, string> = {
  green: '#1E6B45',
  orange: '#E8862E',
  amber: '#D9A22E',
  blue: '#3D6491',
}

export function Icon({ name, ...props }: { name: IconKey } & IconProps) {
  const Glyph = ICONS[name]
  return <Glyph {...props} />
}

/** 44px tinted square that holds a tone-coloured icon. */
export function IconTile({ icon, tone }: { icon: IconKey; tone: Tone }) {
  return (
    <div className={`tile tile--${tone}`}>
      <Icon name={icon} size={21} color={TONE_COLOR[tone]} />
    </div>
  )
}
