import React from 'react'
import { useSearch } from '../context/SearchContext'
import productsData from '../data/products.json'

// FilterPanel: Flipkart-style left sidebar with collapsible sections for
// Categories, Price range, and District. Uses SearchContext to update filters.
export default function FilterPanel({ categories = [] }) {
  const {
    selectedCats,
    setSelectedCats,
    selectedDistricts,
    setSelectedDistricts,
    priceRange,
    setPriceRange,
  } = useSearch()

  // derive district list from data
  const districts = Array.from(new Set(productsData.map((p) => p.districtName))).sort()

  const toggleCat = (cat) => {
    if (selectedCats.includes(cat)) setSelectedCats(selectedCats.filter((c) => c !== cat))
    else setSelectedCats([...selectedCats, cat])
  }

  const toggleDistrict = (d) => {
    if (selectedDistricts.includes(d)) setSelectedDistricts(selectedDistricts.filter((x) => x !== d))
    else setSelectedDistricts([...selectedDistricts, d])
  }

  return (
    <aside className="filter-panel sidebar">
      <div className="filter-section">
        <div className="filter-summary">Categories</div>
        <div className="filter-list vertical">
          {categories.map((cat) => (
            <label key={cat} className="filter-item stacked">
              <input type="checkbox" checked={selectedCats.includes(cat)} onChange={() => toggleCat(cat)} />
              <span>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-summary">District</div>
        <div className="filter-list vertical">
          {districts.map((d) => (
            <label key={d} className="filter-item stacked">
              <input type="checkbox" checked={selectedDistricts.includes(d)} onChange={() => toggleDistrict(d)} />
              <span>{d}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  )
}
