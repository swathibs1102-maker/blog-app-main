function TagFilter({ tags, activeTag, onTagSelect }) {
  return (
    <div className="tag-filter">
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          className={
            tag.toLowerCase() === activeTag.toLowerCase()
              ? 'tag-btn active'
              : 'tag-btn'
          }
          onClick={() => onTagSelect(tag)}
        >
          {tag === 'All' ? tag : tag.charAt(0).toUpperCase() + tag.slice(1)}
        </button>
      ))}
    </div>
  )
}

export default TagFilter
