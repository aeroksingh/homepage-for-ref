import React from 'react'
import { useSearch } from '../context/SearchContext'

// SortBar: shows sort options and highlights active one
export default function SortBar() {
  const { sortOption, setSortOption } = useSearch()
  const opts = [
    { key: 'popularity', label: 'Popularity' },
    { key: 'price-asc', label: 'Price: Low to High' },
    { key: 'price-desc', label: 'Price: High to Low' },
    { key: 'newest', label: 'Newest First' },
  ]

  return (
    <div className="sort-bar">
      {opts.map((o) => (
        <button
          key={o.key}
          className={`sort-option ${sortOption === o.key ? 'active' : ''}`}
          onClick={() => setSortOption(o.key)}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
