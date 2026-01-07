import React, { createContext, useContext, useReducer } from 'react'

// CartContext manages cart state across the app.
// State shape: { items: [{product, quantity}], isOpen: bool, showLogin: bool }

const CartContext = createContext()

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity } = action.payload
      const existing = state.items.find((it) => it.product.slug === product.slug)
      let items
      if (existing) {
        // If item exists, increase its quantity
        items = state.items.map((it) =>
          it.product.slug === product.slug
            ? { ...it, quantity: it.quantity + quantity }
            : it
        )
      } else {
        items = [...state.items, { product, quantity }]
      }
      return { ...state, items }
    }
    case 'REMOVE_ITEM': {
      const slug = action.payload
      return { ...state, items: state.items.filter((it) => it.product.slug !== slug) }
    }
    case 'UPDATE_QUANTITY': {
      const { slug, quantity } = action.payload
      // enforce minimum 1
      const qty = Math.max(1, quantity)
      return {
        ...state,
        items: state.items.map((it) =>
          it.product.slug === slug ? { ...it, quantity: qty } : it
        ),
      }
    }
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }
    case 'OPEN_CART':
      return { ...state, isOpen: true }
    case 'CLOSE_CART':
      return { ...state, isOpen: false }
      case 'SHOW_LOGIN':
        return { ...state, showLogin: true }
      case 'HIDE_LOGIN':
        return { ...state, showLogin: false }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    default:
      return state
  }
}

const initialState = { items: [], isOpen: false, showLogin: false }

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Add product to cart with quantity
  const addToCart = (product, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } })
    dispatch({ type: 'OPEN_CART' })
  }

  const removeFromCart = (slug) => dispatch({ type: 'REMOVE_ITEM', payload: slug })

  const updateQuantity = (slug, quantity) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { slug, quantity } })

  const toggleCart = () => dispatch({ type: 'TOGGLE_CART' })
  const openCart = () => dispatch({ type: 'OPEN_CART' })
  const closeCart = () => dispatch({ type: 'CLOSE_CART' })

  // openLogin: function to show the login modal
  const openLogin = () => dispatch({ type: 'SHOW_LOGIN' })
  const hideLogin = () => dispatch({ type: 'HIDE_LOGIN' })

  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  const totalItems = state.items.reduce((s, it) => s + it.quantity, 0)
  const totalUnique = state.items.length
  const totalCost = state.items.reduce((s, it) => s + it.quantity * (it.product.price || 0), 0)

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        // boolean indicating whether login modal is visible
        showLogin: state.showLogin,
        // function to open the login modal
        openLogin,
        // other cart operations
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleCart,
        openCart,
        closeCart,
        hideLogin,
        clearCart,
        totalItems,
        totalUnique,
        totalCost,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
