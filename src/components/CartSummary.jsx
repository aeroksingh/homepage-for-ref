import React from 'react'
import { useCart } from '../context/CartContext'

// CartSummary shows totals: total distinct items, total quantity, total price
export default function CartSummary() {
  const { totalUnique, totalItems, totalCost } = useCart()

  return (
    <div className="cart-summary">
      <div className="summary-row">Total Items: <strong>{totalUnique}</strong></div>
      <div className="summary-row">Total Quantity: <strong>{totalItems}</strong></div>
      <div className="summary-row">Total Price: <strong>₹ {totalCost}</strong></div>
    </div>
  )
}
