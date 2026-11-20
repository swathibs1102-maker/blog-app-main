import { useEffect, useState } from 'react'

async function fetchJson(url) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`)
  }
  return response.json()
}

function PostDetail({ postId, authors, onBack, onToggleLike }) {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [comments, setComments] = useState([])
  const [commentsLoading, setCommentsLoading] = useState(true)
  const [commentsError, setCommentsError] = useState('')

  useEffect(() => {
    let active = true
    setPost(null)
    setComments([])
    setCommentsLoading(true)
    setLoading(true)
    setError('')
    setCommentsError('')

    fetchJson(`https://dummyjson.com/posts/${postId}`)
      .then((data) => {
        if (!active) return
        const author = authors[data.userId]
        setPost({
          ...data,
          author: author
            ? `${author.firstName} ${author.lastName}`
            : 'Unknown author',
          authorPhoto: author?.image || '',
          likes: data.reactions?.likes || 0,
          liked: false,
        })
      })
      .catch((fetchError) => {
        if (active) setError(`Unable to load this post: ${fetchError.message}`)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    fetchJson(`https://dummyjson.com/posts/${postId}/comments`)
      .then((data) => {
        if (active) setComments(data.comments || [])
      })
      .catch((fetchError) => {
        if (active) {
          setCommentsError(`Unable to load comments: ${fetchError.message}`)
        }
      })
      .finally(() => {
        if (active) setCommentsLoading(false)
      })

    return () => {
      active = false
    }
  }, [postId, authors])

  function handleLike() {
    setPost((currentPost) => ({
      ...currentPost,
      liked: !currentPost.liked,
      likes: currentPost.liked
        ? currentPost.likes - 1
        : currentPost.likes + 1,
    }))
    onToggleLike(postId)
  }

  return (
    <article className="detail">
      <button type="button" className="back-btn" onClick={onBack}>
        ← Back
      </button>

      {loading && <p className="status-message">Loading post…</p>}
      {error && <p className="status-message error-message">{error}</p>}

      {post && (
        <>
          <div className="detail-image">📝</div>

          <div className="post-tags">
            {post.tags?.map((tag) => (
              <span className="post-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
          <h1 className="detail-title">{post.title}</h1>

          <div className="post-meta detail-meta">
            <div className="author">
              {post.authorPhoto ? (
                <img className="avatar" src={post.authorPhoto} alt="" />
              ) : (
                <span className="avatar">{post.author.slice(0, 2)}</span>
              )}
              <div>
                <p className="author-name">{post.author}</p>
                <p className="post-date">DummyJSON post</p>
              </div>
            </div>
            <button
              type="button"
              className="like-btn"
              onClick={handleLike}
              aria-label={post.liked ? 'Unlike' : 'Like'}
            >
              {post.liked ? '❤️' : '🤍'} {post.likes}
            </button>
          </div>

          <p className="detail-content">{post.body}</p>
          <section className="comments">
            <h2>Comments</h2>
            {commentsError && (
              <p className="status-message error-message">{commentsError}</p>
            )}
            {commentsLoading && (
              <p className="status-message">Loading comments…</p>
            )}
            {!commentsLoading && !commentsError && comments.length === 0 && (
              <p className="post-summary">No comments yet.</p>
            )}
            {comments.map((comment) => (
              <article className="comment" key={comment.id}>
                <p className="author-name">
                  {comment.user?.fullName || comment.user?.username || 'Reader'}
                </p>
                <p>{comment.body}</p>
              </article>
            ))}
          </section>
        </>
      )}
    </article>
  )
}

export default PostDetail
