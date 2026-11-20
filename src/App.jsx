import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import FeaturedPost from './components/FeaturedPost'
import TagFilter from './components/TagFilter'
import SearchBox from './components/SearchBox'
import PostGrid from './components/PostGrid'
import PostDetail from './components/PostDetail'
import WriteForm from './components/WriteForm'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import { featured } from './data'

function getAuthorName(user) {
  if (!user) return 'Unknown author'
  return (
    [user.firstName, user.lastName].filter(Boolean).join(' ') ||
    user.username ||
    'Unknown author'
  )
}

function normalizePost(post, authors) {
  const author = authors[post.userId]
  const authorName = getAuthorName(author)
  const initials = authorName
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)

  return {
    ...post,
    title: post.title || '',
    body: post.body || '',
    summary: (post.body || '').slice(0, 100),
    tags: Array.isArray(post.tags) ? post.tags : [],
    author: authorName,
    authorPhoto: author?.image || '',
    initials,
    // date: 'DummyJSON post',
    likes: post.reactions?.likes || 0,
    liked: false,
  }
}

async function fetchJson(url, options) {
  const response = await fetch(url, options)
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`)
  }
  return response.json()
}

function App() {
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [activeTag, setActiveTag] = useState('All')
  const [search, setSearch] = useState('')
  const [view, setView] = useState('home')
  const [selectedPostId, setSelectedPostId] = useState(null)

  useEffect(() => {
    let active = true

    Promise.all([
      fetchJson('https://dummyjson.com/posts?limit=12'),
      fetchJson(
        'https://dummyjson.com/users?limit=30&select=firstName,lastName,image',
      ),
    ])
      .then(async ([postData, userData]) => {
        if (!active) return
        const authors = Object.fromEntries(
          userData.users.map((user) => [user.id, user]),
        )
        const missingAuthorIds = [
          ...new Set(
            postData.posts
              .map((post) => post.userId)
              .filter((userId) => !authors[userId]),
          ),
        ]
        const additionalUsers = await Promise.all(
          missingAuthorIds.map((userId) =>
            fetchJson(
              `https://dummyjson.com/users/${userId}?select=firstName,lastName,image`,
            ),
          ),
        )
        if (!active) return
        additionalUsers.forEach((user) => {
          authors[user.id] = user
        })
        setUsers([...userData.users, ...additionalUsers])
        setPosts(postData.posts.map((post) => normalizePost(post, authors)))
      })
      .catch((error) => {
        if (active) setLoadError(`Unable to load posts: ${error.message}`)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  const tagList = useMemo(
    () => [
      'All',
      ...new Set(
        posts
          .flatMap((post) => post.tags)
          .filter(Boolean)
          .sort((a, b) => a.localeCompare(b)),
      ),
    ],
    [posts],
  )
  const popularTags = useMemo(() => tagList.slice(1), [tagList])

  const visiblePosts = posts.filter((post) => {
    const matchesTag =
      activeTag === 'All' ||
      post.tags.some((tag) => tag.toLowerCase() === activeTag.toLowerCase())
    const matchesSearch = post.title
      .toLowerCase()
      .includes(search.trim().toLowerCase())
    return matchesTag && matchesSearch
  })

  const authors = useMemo(
    () => Object.fromEntries(users.map((user) => [user.id, user])),
    [users],
  )
  const authorCounts = posts.reduce((counts, post) => {
    counts[post.userId] = (counts[post.userId] || 0) + 1
    return counts
  }, {})
  const topAuthors = Object.entries(authorCounts)
    .map(([userId, count]) => {
      const user = authors[userId]
      return user
        ? {
            name: getAuthorName(user),
            image: user.image,
            posts: count,
          }
        : null
    })
    .filter(Boolean)
    .sort((a, b) => b.posts - a.posts)
    .slice(0, 3)

  const emptyText = search.trim()
    ? 'No posts match your search'
    : 'No posts for this tag'

  function goTo(nextView) {
    setView(nextView)
    window.scrollTo(0, 0)
  }

  function handleNavigate(link) {
    if (link === 'Home') goTo('home')
    if (link === 'Write') goTo('write')
  }

  function handleToggleLike(id) {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    )
  }

  function handleReadMore(id) {
    setSelectedPostId(id)
    goTo('post')
  }

  async function handlePublish(form) {
    const publishedPost = await fetchJson('https://dummyjson.com/posts/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: form.title.trim(),
        body: form.content.trim(),
        userId: Number(form.userId),
        tags: form.tags,
      }),
    })
    const newPost = normalizePost(publishedPost, authors)

    setPosts((currentPosts) => [newPost, ...currentPosts])
    setActiveTag('All')
    setSearch('')
    goTo('home')
  }

  return (
    <>
      <Header
        blogName="DevDiary"
        links={['Home', 'Write', 'About']}
        view={view}
        onNavigate={handleNavigate}
      />

      <main className="container">
        {view === 'home' && (
          <>
            <FeaturedPost
              emoji={featured.emoji}
              title={featured.title}
              summary={featured.summary}
              author={featured.author}
              date={featured.date}
              readTime={featured.readTime}
            />

            {loading && <p className="status-message">Loading posts and authors…</p>}
            {loadError && <p className="status-message error-message">{loadError}</p>}

            {!loading && !loadError && (
              <>
                <div className="filter-bar">
                  <TagFilter
                    tags={tagList}
                    activeTag={activeTag}
                    onTagSelect={setActiveTag}
                  />
                  <SearchBox value={search} onChange={setSearch} />
                </div>

                <div className="layout">
                  <PostGrid
                    posts={visiblePosts}
                    emptyText={emptyText}
                    onToggleLike={handleToggleLike}
                    onReadMore={handleReadMore}
                  />
                  <Sidebar
                    popularTags={popularTags}
                    topAuthors={topAuthors}
                    activeTag={activeTag}
                    onTagSelect={setActiveTag}
                  />
                </div>
              </>
            )}
          </>
        )}

        {view === 'post' && (
          <PostDetail
            postId={selectedPostId}
            authors={authors}
            onBack={() => goTo('home')}
            onToggleLike={handleToggleLike}
          />
        )}

        {view === 'write' && (
          <WriteForm
            users={users}
            popularTags={popularTags}
            onPublish={handlePublish}
          />
        )}
      </main>

      <Footer text="© 2026 DevDiary. Written by trainees, for trainees." />
    </>
  )
}

export default App
