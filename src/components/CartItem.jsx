import React from 'react'
import { useCart } from '../context/CartContext'

// CartItem displays a single cart row with quantity controls
// Props: item { product, quantity }
export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart()
  const { product, quantity } = item

  return (
    <div className="cart-item">
      <img className="cart-item-img" src={product.productImage} alt={product.productName} />
      <div className="cart-item-body">
        <div className="cart-item-title">{product.productName}</div>
        <div className="cart-item-district">{product.districtName}</div>
        <div className="cart-qty-controls">
          <button
            className="qty-btn"
            onClick={() => updateQuantity(product.slug, Math.max(1, quantity - 1))}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <div className="qty-value">{quantity}</div>
          <button
            className="qty-btn"
            onClick={() => updateQuantity(product.slug, quantity + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>
      <div className="cart-item-actions">
        <button className="btn btn-outline remove" onClick={() => removeFromCart(product.slug)}>
          Remove
        </button>
      </div>
    </div>
  )
}
