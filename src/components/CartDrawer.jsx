import React from 'react'
import { useCart } from '../context/CartContext'
import CartItem from './CartItem'
import CartSummary from './CartSummary'

// CartDrawer: slide-in cart panel. Shows current cart items and Buy Now flow.
export default function CartDrawer() {
  const { items, isOpen, toggleCart, totalItems, openLogin } = useCart()

  return (
    <div className={`cart-drawer ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
      <div className="cart-drawer-panel">
        <div className="cart-header">
          <h3>My Cart</h3>
          <div className="cart-count">{totalItems} items</div>
          <button className="close-btn" onClick={toggleCart} aria-label="Close cart">×</button>
        </div>

        <div className="cart-list">
          {items.length === 0 && <div className="empty">Your cart is empty</div>}
          {items.map((it) => (
            <CartItem key={it.product.slug} item={it} />
          ))}
        </div>

        <div className="cart-footer">
          <CartSummary />
          <div style={{marginTop:12}}>
            <button className="btn btn-primary" onClick={openLogin} disabled={items.length === 0}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
