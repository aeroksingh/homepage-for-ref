import React, { useMemo, useState } from 'react'
import productsData from '../data/products.json'
import ProductGrid from '../components/ProductGrid'
import SortBar from '../components/SortBar'
import { useSearch } from '../context/SearchContext'

// Home page: uses SearchContext for query, selected categories/districts, price range and sort.
// Filtering and sorting logic is implemented below (case-insensitive search + multi-filters).
export default function Home() {
  const featuredSlugs = [
    'chanderi-saree',
    'maheshwari-saree',
    'stone-craft',
    'gond-painting',
    'wooden-handicrafts',
    'brass-art',
  ]

  const categories = ['Handmade', 'Printed', 'Metal Craft', 'Wooden Craft', 'Textile', 'Painting']

  const { query, selectedCats, selectedDistricts, priceRange, sortOption } = useSearch()
  const [showAll, setShowAll] = useState(false)

  // Search + filter logic:
  // - Case-insensitive search matches productName, districtName or category
  // - Category and District arrays are multi-select filters
  // - Price range filters between min and max
  const filtered = useMemo(() => {
    const q = (query || '').trim().toLowerCase()

    return productsData.filter((p) => {
      const matchesQuery =
        q === '' ||
        p.productName.toLowerCase().includes(q) ||
        p.districtName.toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q)

      const matchesCategory = selectedCats.length === 0 || (p.category && selectedCats.includes(p.category))
      const matchesDistrict = selectedDistricts.length === 0 || selectedDistricts.includes(p.districtName)
      const matchesPrice = p.price >= (priceRange?.[0] || 0) && p.price <= (priceRange?.[1] || Infinity)

      return matchesQuery && matchesCategory && matchesDistrict && matchesPrice
    })
  }, [query, selectedCats, selectedDistricts, priceRange])

  // Sorting logic: simple local sorts
  const sorted = useMemo(() => {
    const list = [...filtered]
    if (sortOption === 'price-asc') return list.sort((a, b) => a.price - b.price)
    if (sortOption === 'price-desc') return list.sort((a, b) => b.price - a.price)
    if (sortOption === 'newest') return list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
    // popularity or default: keep original order
    return list
  }, [filtered, sortOption])

  const featured = productsData.filter((p) => featuredSlugs.includes(p.slug))

  return (
    <div className="home-container container">
      <section className="intro">
        <h1>One Product One District — Madhya Pradesh</h1>
        <p className="subtitle">Discover a signature craft from every district.</p>
      </section>
      <SortBar />

      <section className="products-section">
        {!showAll ? (
          <>
            <ProductGrid products={featured.filter((p) => sorted.some((f) => f.slug === p.slug))} />
            <div className="show-more-wrap">
              <button className="btn btn-primary" onClick={() => setShowAll(true)}>
                Show More
              </button>
            </div>
          </>
        ) : (
          <ProductGrid products={sorted} />
        )}
      </section>
    </div>
  )
}
