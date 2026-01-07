import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

// ProductCard shows product image and name in a Flipkart-like ecommerce card
// Product props: { productName, productImage, districtName, slug, price, tag }
// Clicking product name/image navigates to details; Add to Cart uses CartContext.
export default function ProductCard({ product }) {
  const { productName, productImage, districtName, slug, price, tag } = product
  const { addToCart } = useCart()

  return (
    <article className="card product-card">
      <Link to={`/product/${slug}`} className="card-media ratio-4-3">
        <img src={productImage} alt={productName} />
      </Link>

      <div className="card-body">
        <h3 className="product-name">
          <Link to={`/product/${slug}`} className="card-link">{productName}</Link>
        </h3>
        <p className="district-name">{districtName}</p>
        <div className="product-price">₹ {price}</div>

        {tag && <div className="product-tag">{tag}</div>}

        <div className="card-actions">
          <button className="btn btn-outline" onClick={() => addToCart(product, 1)}>
            Add to Cart
          </button>
          <Link to={`/product/${slug}`} className="btn btn-secondary" style={{marginLeft:8}}>
            View Details
          </Link>
        </div>
      </div>
    </article>
  )
}
