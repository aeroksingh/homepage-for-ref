import React from 'react'

// SearchBar: calls `onSearch` with current query (case-insensitive search)
// Rendered in navbar as a large input with an icon.
export default function SearchBar({ query, onSearch }) {
  return (
    <div className="search-bar nav-search-bar">
      <span className="search-icon">🔍</span>
      <input
        type="search"
        placeholder="Search for products, districts, crafts…"
        value={query}
        onChange={(e) => onSearch(e.target.value)}
        aria-label="Search products, districts, crafts"
      />
    </div>
  )
}
