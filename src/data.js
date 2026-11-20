// All data lives here (no API yet).
// `tag` is the category label shown on the card, `tags` are lowercase
// tags used for filtering (tag buttons + popular tags in the sidebar).

export const featured = {
  emoji: '💻',
  title: "From zero to my first React app: a trainee's journey",
  summary:
    'How I went from static pages to a working app with state, APIs and routing.',
  author: 'Janani V',
  date: '11 Nov 2026',
  readTime: 5,
}

export const tags = ['All', 'React', 'Css', 'Java', 'Javascript', 'Career']

export const popularTags = ['react', 'javascript', 'html', 'css', 'beginners', 'github']

// emoji + background colour used for newly written posts, by category
export const tagStyles = {
  React: { emoji: '⚛️', bg: '#31599a' },
  CSS: { emoji: '🎨', bg: '#ea8508' },
  JavaScript: { emoji: '🟨', bg: '#b8b29b' },
  Career: { emoji: '🚀', bg: '#dcfce7' },
}

export const initialPosts = [
  {
    id: 1,
    emoji: '⚛️',
    bg: '#31599a',
    tag: 'React',
    tags: ['react', 'beginners'],
    title: 'Understanding React props in 5 minutes',
    summary: 'A simple guide to passing data between components.',
    content: '',
    author: 'Saru S',
    initials: 'AK',
    avatarColor: '#6175ac',
    date: '05 Nov 2026',
    likes: 111,
    liked: false,
  },
  {
    id: 2,
    emoji: '🎨',
    bg: '#ea8508',
    tag: 'CSS',
    tags: ['css'],
    title: 'CSS Grid vs Flexbox: when to use which',
    summary: 'Real layout examples to help you pick the right tool.',
    content: '',
    author: 'Bala V',
    initials: 'MS',
    avatarColor: '#725863',
    date: '10 feb 2026',
    likes: 88,
    liked: false,
  },
  {
    id: 3,
    emoji: '🟨',
    bg: '#b8b29b',
    tag: 'JavaScript',
    tags: ['javascript', 'beginners'],
    title: '5 JavaScript array methods you must know',
    summary: 'map, filter, reduce, find and some, explained with examples.',
    content: '',
    author: 'Karthika D',
    initials: 'VR',
    avatarColor: '#bd875d',
    date: '06 August 2026',
    likes: 100,
    liked: false,
  },
  {
    id: 4,
    emoji: '🚀',
    bg: '#dcfce7',
    tag: 'Career',
    tags: ['career', 'beginners'],
    title: 'My first month as a software trainee',
    summary: 'What I learned, what was hard, and what helped me most.',
    content: '',
    author: 'Dharun M',
    initials: 'DN',
    avatarColor: '#15803d',
    date: '09 August 2026',
    likes: 200,
    liked: false,
  },
  {
    id: 5,
    emoji: '🔢',
    bg: '#dbe8fd',
    tag: 'React',
    tags: ['react', 'beginners'],
    title: 'useState explained with a counter app',
    summary: 'Learn state by building the simplest React app.',
    content: '',
    author: 'Sathish N',
    initials: 'KS',
    avatarColor: '#1d4ed8',
    date: '13 September 2026',
    likes: 89,
    liked: false,
  },
  {
    id: 6,
    emoji: '📝',
    bg: '#dcfce7',
    tag: 'Career',
    tags: ['career'],
    title: 'How to write a good GitHub README',
    summary: 'Make your projects easy to understand for anyone.',
    content: '',
    author: 'Sathya D',
    initials: 'LP',
    avatarColor: '#15803d',
    date: '11 Nov 2026',
    likes: 80,
    liked: false,
  },
]

export const topAuthors = [
  { name: 'Dharun M', initials: 'DN', avatarColor: '#15803d', posts: 12 },
  { name: 'Karthika D', initials: 'VR', avatarColor: '#b45309', posts: 9 },
  { name: 'Saru S', initials: 'AK', avatarColor: '#1d4ed8', posts: 7 },
]