import React from 'react'
import ProductCard from './ProductCard'

// ProductGrid: renders a responsive grid of product cards
export default function ProductGrid({ products }) {
  return (
    <div className="product-grid">
      {products.map((p) => (
        <div key={p.slug} className="product-grid-item">
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  )
}
