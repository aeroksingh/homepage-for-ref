import React, { useState, useRef, useEffect } from 'react'
import { useCart } from '../context/CartContext'

// SimilarProduct: displays a product with its own qty selector and Add to Cart button
// Used in ProductDetail's similar products list
export default function SimilarProduct({ product }) {
  const { addToCart } = useCart()
  const [qty, setQty] = useState(1)

  const increase = () => setQty((q) => q + 1)
  const decrease = () => setQty((q) => Math.max(1, q - 1))

  return (
    <div className="similar-card">
      <div className="similar-media ratio-4-3">
        <img src={product.productImage} alt={product.productName} />
      </div>
      <div className="similar-body">
        <div className="similar-title">{product.productName}</div>
        <div className="similar-district">{product.districtName}</div>
        <div className="similar-price">₹ {product.price}</div>
        <div className="similar-controls">
          <div className="qty-selector">
            <button className="qty-btn" onClick={decrease}>−</button>
            <div className="qty-value">{qty}</div>
            <button className="qty-btn" onClick={increase}>+</button>
          </div>
          <button className="btn btn-primary" onClick={() => addToCart(product, qty)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
