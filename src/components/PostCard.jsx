function PostCard({ post, onToggleLike, onReadMore }) {
  const preview =
    post.body.length > 100 ? `${post.body.slice(0, 100)}…` : post.body

  return (
    <article className="post-card">
      <div className="post-image">📝</div>
      <div className="post-body">
        <div className="post-tags">
          {post.tags.map((tag) => (
            <span className="post-tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <h3>{post.title}</h3>
        <p className="post-summary">{preview}</p>
        <div className="post-meta">
          <div className="author">
            {post.authorPhoto ? (
              <img className="avatar" src={post.authorPhoto} alt="" />
            ) : (
              <span className="avatar">{post.initials}</span>
            )}
            <div>
              <p className="author-name">{post.author}</p>
              <p className="post-date">{post.date}</p>
            </div>
          </div>
          <button
            type="button"
            className="like-btn"
            onClick={() => onToggleLike(post.id)}
            aria-label={post.liked ? 'Unlike' : 'Like'}
          >
            {post.liked ? '❤️' : '🤍'} {post.likes}
          </button>
        </div>
        <button
          type="button"
          className="read-more"
          onClick={() => onReadMore(post.id)}
        >
          Read more →
        </button>
      </div>
    </article>
  )
}

export default PostCard
