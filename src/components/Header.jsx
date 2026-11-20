function Header({ blogName, links, view, onNavigate }) {
  // "Home" stays highlighted on the post detail view too
  function isActive(link) {
    if (link === 'Write') return view === 'write'
    if (link === 'Home') return view === 'home' || view === 'post'
    return false
  }

  return (
    <header className="header">
      <button
        type="button"
        className="logo"
        onClick={() => onNavigate('Home')}
      >
        Dev<span>Diary</span>
      </button>
      <nav className="nav">
        {links.map((link) => (
          <button
            key={link}
            type="button"
            className={isActive(link) ? 'nav-link active' : 'nav-link'}
            onClick={() => onNavigate(link)}
          >
            {link}
          </button>
        ))}
      </nav>
    </header>
  )
}

export default Header
