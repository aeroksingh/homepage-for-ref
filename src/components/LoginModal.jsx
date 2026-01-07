import React from 'react'
import { useCart } from '../context/CartContext'

// LoginModal displays centered login prompt when user tries to buy
export default function LoginModal() {
  const { showLogin: isShown, hideLogin } = useCart()

  if (!isShown) return null

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content">
        <button className="modal-close" onClick={hideLogin} aria-label="Close">×</button>
        <h2>Please login to continue</h2>
        <p>You need to sign in before completing your purchase.</p>
        <div className="modal-actions">
          <a className="btn btn-primary" href="https://example.com/login" target="_blank" rel="noreferrer">
            Login
          </a>
        </div>
      </div>
    </div>
  )
}
