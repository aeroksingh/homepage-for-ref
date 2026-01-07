import React from 'react'
import ProductCard from './ProductCard'

// DistrictSection displays a heading for the district and a single ProductCard
// Used on the homepage to emphasize one product per district (OPOD concept)
export default function DistrictSection({ district, product }) {
  return (
    <section className="district-section">
      <h2 className="district-heading">{district}</h2>
      <div className="district-card-wrap">
        <ProductCard product={product} />
      </div>
    </section>
  )
}
