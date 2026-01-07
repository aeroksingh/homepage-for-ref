import React, { useRef, useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import CartDrawer from './CartDrawer'
import SearchBar from './SearchBar'
import { useSearch } from '../context/SearchContext'
import productsData from '../data/products.json'

// Flipkart-style sticky navbar: brand (left), large search (center), actions (right)
export default function Navbar() {
  const { totalItems, toggleCart, openLogin } = useCart()
  const { query, setQuery, selectedCats, setSelectedCats, selectedDistricts, setSelectedDistricts } = useSearch()
  const [moreOpen, setMoreOpen] = useState(false)
  const moreRef = useRef()
  const [filterOpen, setFilterOpen] = useState(false)
  const filterRef = useRef()

  useEffect(() => {
    function onDoc(e) {
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false)
      if (filterRef.current && !filterRef.current.contains(e.target)) setFilterOpen(false)
    }
    document.addEventListener('click', onDoc)
    return () => document.removeEventListener('click', onDoc)
  }, [])

  const toggleCategory = (cat) => {
    if (selectedCats.includes(cat)) setSelectedCats(selectedCats.filter((c) => c !== cat))
    else setSelectedCats([...selectedCats, cat])
  }

  const toggleDistrict = (d) => {
    if (selectedDistricts.includes(d)) setSelectedDistricts(selectedDistricts.filter((x) => x !== d))
    else setSelectedDistricts([...selectedDistricts, d])
  }

  return (
    <header className="navbar nav-blue">
      <div className="nav-inner">
        <div className="nav-left" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="brand">OPOD MP</div>
        </div>

        <div className="nav-search">
          <SearchBar query={query} onSearch={setQuery} />
        </div>

        <div className="nav-actions">
          <button className="btn btn-outline nav-login" onClick={openLogin}>
            Login
          </button>
          <div className="filter-wrap" ref={filterRef} style={{ position: 'relative' }}>
            <button className="btn" onClick={() => setFilterOpen((s) => !s)} aria-expanded={filterOpen}>
              Filter ▾
            </button>
            {filterOpen && (
              <div className="filter-menu" role="menu" onClick={(e) => e.stopPropagation()}>
                <div className="filter-section">
                  <div className="filter-section-title">Categories</div>
                  <div className="filter-list vertical">
                    {Array.from(new Set(productsData.map((p) => p.category))).map((cat) => (
                      <label key={cat} className="filter-item stacked">
                        <input
                          type="checkbox"
                          checked={selectedCats.includes(cat)}
                          onChange={() => toggleCategory(cat)}
                        />
                        <span>{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="filter-section" style={{marginTop:10}}>
                  <div className="filter-section-title">Districts</div>
                  <div className="filter-list vertical">
                    {Array.from(new Set(productsData.map((p) => p.districtName))).sort().map((d) => (
                      <label key={d} className="filter-item stacked">
                        <input type="checkbox" checked={selectedDistricts.includes(d)} onChange={() => toggleDistrict(d)} />
                        <span>{d}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <button className="btn cart-btn" onClick={toggleCart} aria-label="Open cart">
            <span className="cart-ico">🛒</span>
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </button>

          <div className="more-wrap" ref={moreRef} style={{ position: 'relative' }}>
            <button className="btn" onClick={() => setMoreOpen((s) => !s)} aria-expanded={moreOpen}>
              More ▾
            </button>
            {moreOpen && (
              <div className="more-menu" role="menu">
                <a className="more-item" href="#">About OPOD</a>
                <a className="more-item" href="#">Help</a>
                <a className="more-item" href="#">Contact</a>
                <a className="more-item" href="#">Policies</a>
              </div>
            )}
          </div>
        </div>
      </div>
      <CartDrawer />
    </header>
  )
}
