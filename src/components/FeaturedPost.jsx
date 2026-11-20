function FeaturedPost({ emoji, title, summary, author, date, readTime }) {
  return (
    <section className="featured">
      <div className="featured-image">{emoji}</div>
      <div className="featured-body">
        <span className="featured-badge">Featured</span>
        <h1>{title}</h1>
        <p className="featured-summary">{summary}</p>
        <p className="featured-meta">
          By {author || 'DevDiary team'} · {date} · {readTime} min read
        </p>
      </div>
    </section>
  )
}

export default FeaturedPost
