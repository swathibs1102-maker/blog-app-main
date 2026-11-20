function Sidebar({ popularTags, topAuthors, activeTag, onTagSelect }) {
  return (
    <aside className="sidebar">
      <section className="side-card">
        <h2>Popular tags</h2>
        <div className="chips">
          {popularTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={
                tag === activeTag.toLowerCase() ? 'chip active' : 'chip'
              }
              onClick={() => onTagSelect(tag)}
            >
              #{tag}
            </button>
          ))}
        </div>
      </section>

      <section className="side-card">
        <h2>Top authors</h2>
        <ul className="authors">
          {topAuthors.map((a) => (
            <li key={a.name} className="author">
              <img className="avatar avatar-lg" src={a.image} alt="" />
              <div>
                <p className="author-name">{a.name}</p>
                <p className="post-date">
                  {a.posts} {a.posts === 1 ? 'post' : 'posts'}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  )
}

export default Sidebar
