import React, { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import productsData from '../data/products.json'
import { useCart } from '../context/CartContext'
import SimilarProduct from '../components/SimilarProduct'

// ProductDetail page: enhanced with quantity selector and Add to Cart
export default function ProductDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const product = productsData.find((p) => p.slug === slug)
  const [qty, setQty] = useState(1)
  const [showCount, setShowCount] = useState(2) // start by showing 2 similar items

  // similar items: show products from the same district (excluding the main product)
  const similar = productsData.filter(
    (p) => p.districtName === product.districtName && p.slug !== slug
  )

  if (!product) {
    return (
      <div className="container">
        <h2>Product not found</h2>
        <button className="btn" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    )
  }

  const increase = () => setQty((q) => q + 1)
  const decrease = () => setQty((q) => Math.max(1, q - 1))

  const handleAddToCart = () => {
    // Add selected product and quantity to cart
    addToCart(product, qty)
  }

  // Reveal similar products one-by-one as the user scrolls down the page
  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        setShowCount((c) => Math.min(c + 1, similar.length))
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [similar.length])

  return (
    <div className="product-detail container">
      <button className="btn back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className="detail-grid enhanced">
        <div className="detail-media large">
          <div className="district-top">{product.districtName}</div>
          <img src={product.productImage} alt={product.productName} />
        </div>

        <div className="detail-info">
          <h1>{product.productName}</h1>
          <div className="product-price-main">₹ {product.price}</div>
          <div className="badge">One Product One District – Madhya Pradesh</div>
          <p className="description">{product.productDescription}</p>

          <div className="purchase-row">
            <div className="qty-selector">
              <button className="qty-btn" onClick={decrease} aria-label="Decrease">−</button>
              <div className="qty-value">{qty}</div>
              <button className="qty-btn" onClick={increase} aria-label="Increase">+</button>
            </div>

            <div className="purchase-actions">
              <button className="btn btn-primary" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="similar-section">
        <h2>Similar Products</h2>
        <p className="muted">Scroll to reveal more similar items</p>
        <div className="similar-list">
          {similar.slice(0, showCount).map((p) => (
            <div key={p.slug} className="similar-item">
              <SimilarProduct product={p} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
