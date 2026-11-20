import PostCard from './PostCard'

function PostGrid({ posts, emptyText, onToggleLike, onReadMore }) {
  if (posts.length === 0) {
    return <p className="empty">{emptyText}</p>
  }

  return (
    <div className="post-grid">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onToggleLike={onToggleLike}
          onReadMore={onReadMore}
        />
      ))}
    </div>
  )
}

export default PostGrid
