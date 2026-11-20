import { useEffect, useState } from 'react'

function WriteForm({ users, popularTags, onPublish }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [userId, setUserId] = useState('')
  const [error, setError] = useState('')
  const [isPublishing, setIsPublishing] = useState(false)

  useEffect(() => {
    setSelectedTags((currentTags) =>
      currentTags.filter((tag) => popularTags.includes(tag)),
    )
  }, [popularTags])

  useEffect(() => {
    if (users.length && !users.some((user) => String(user.id) === userId)) {
      setUserId(String(users[0].id))
    }
  }, [users, userId])

  async function handleSubmit(e) {
    e.preventDefault()

    if (
      title.trim() === '' ||
      content.trim() === '' ||
      !userId ||
      selectedTags.length === 0
    ) {
      setError('Title, content, author, and at least one tag are required.')
      return
    }

    setError('')
    setIsPublishing(true)
    try {
      await onPublish({ title, content, tags: selectedTags, userId })
    } catch (publishError) {
      setError(`Unable to publish post: ${publishError.message}`)
    } finally {
      setIsPublishing(false)
    }
  }

  return (
    <form className="write-form" onSubmit={handleSubmit}>
      <h1 className="detail-title">Write a post</h1>

      <label>
        Title
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give your post a title"
        />
      </label>

      <label>
        Content
        <textarea
          rows="8"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post here..."
        />
      </label>

      <div className="form-row">
        <fieldset className="tag-options" disabled={popularTags.length === 0}>
          <legend>Tags</legend>
          {popularTags.length === 0 ? (
            <p className="post-date">No popular tags available</p>
          ) : (
            popularTags.map((popularTag) => (
              <label className="tag-option" key={popularTag}>
                <input
                  type="checkbox"
                  value={popularTag}
                  checked={selectedTags.includes(popularTag)}
                  onChange={() =>
                    setSelectedTags((currentTags) =>
                      currentTags.includes(popularTag)
                        ? currentTags.filter((tag) => tag !== popularTag)
                        : [...currentTags, popularTag],
                    )
                  }
                />
                {popularTag.charAt(0).toUpperCase() + popularTag.slice(1)}
              </label>
            ))
          )}
        </fieldset>

        <label>
          Author
          <select
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            disabled={users.length === 0}
          >
            {users.length === 0 && <option value="">Loading authors…</option>}
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.firstName} {user.lastName}
              </option>
            ))}
          </select>
        </label>
      </div>

      {error && <p className="form-error">{error}</p>}

      <button
        type="submit"
        className="publish-btn"
        disabled={isPublishing || users.length === 0 || popularTags.length === 0}
      >
        {isPublishing ? 'Publishing…' : 'Publish'}
      </button>
    </form>
  )
}

export default WriteForm
