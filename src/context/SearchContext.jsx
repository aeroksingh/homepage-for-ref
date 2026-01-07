import React, { createContext, useContext, useState } from 'react'

const SearchContext = createContext(null)

export function SearchProvider({ children }) {
  const [query, setQuery] = useState('')
  const [selectedCats, setSelectedCats] = useState([])
  const [selectedDistricts, setSelectedDistricts] = useState([])
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [sortOption, setSortOption] = useState('popularity')

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        selectedCats,
        setSelectedCats,
        selectedDistricts,
        setSelectedDistricts,
        priceRange,
        setPriceRange,
        sortOption,
        setSortOption,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const ctx = useContext(SearchContext)
  if (!ctx) throw new Error('useSearch must be used within SearchProvider')
  return ctx
}
