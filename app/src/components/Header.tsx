import { BellIcon, PlusIcon, SearchIcon } from './icons'

type HeaderProps = {
  greeting: string
  userName: string
  subtitle: string
}

export function Header({ greeting, userName, subtitle }: HeaderProps) {
  return (
    <header className="header">
      <div className="header__intro">
        <h1 className="header__greeting">
          {greeting}, {userName} 👋
        </h1>
        <div className="header__sub">{subtitle}</div>
      </div>

      <div className="header__actions">
        <div className="search">
          <SearchIcon size={17} color="#8B8579" />
          <input className="search__input" placeholder="Search..." aria-label="Search" />
        </div>

        <button type="button" className="reset-btn bell" aria-label="Notifications">
          <BellIcon size={21} color="#3F3B34" />
          <span className="bell__dot" />
        </button>

        <button type="button" className="reset-btn btn-primary">
          New Study
          <PlusIcon size={16} />
        </button>
      </div>
    </header>
  )
}
