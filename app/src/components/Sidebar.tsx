import type { NavItem, User, Verse } from '../data/types'
import { Icon } from './Icon'
import { ImageSlot } from './ImageSlot'
import { ChevronDownIcon, LogoIcon } from './icons'
import { VerseOfTheDay } from './VerseOfTheDay'

type SidebarProps = {
  nav: NavItem[]
  activeNavId: string
  user: User
  verse: Verse
}

export function Sidebar({ nav, activeNavId, user, verse }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <LogoIcon />
        <div>
          <div className="brand__name">ScripturePath</div>
          <div className="brand__tagline">Study. Grow. Live.</div>
        </div>
      </div>

      <nav className="nav">
        {nav.map((item) => {
          const active = item.id === activeNavId
          return (
            <button
              key={item.id}
              type="button"
              className={`reset-btn nav__item${active ? ' nav__item--active' : ''}`}
              aria-current={active ? 'page' : undefined}
            >
              <Icon
                name={item.icon}
                size={19}
                color={active ? 'currentColor' : '#5C7566'}
                strokeWidth={active ? 1.8 : 1.7}
              />
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="sidebar__footer">
        <VerseOfTheDay verse={verse} />

        <button type="button" className="reset-btn profile">
          <div className="profile__avatar">
            <ImageSlot src={user.avatarUrl} alt="" placeholder="Avatar" shape="circle" />
          </div>
          <div className="profile__meta">
            <div className="profile__name">{user.name}</div>
            <div className="profile__edit">Edit Profile</div>
          </div>
          <ChevronDownIcon size={17} color="#8B8579" />
        </button>
      </div>
    </aside>
  )
}
