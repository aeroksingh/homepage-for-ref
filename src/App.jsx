import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import LoginModal from './components/LoginModal'
import { SearchProvider } from './context/SearchContext'

export default function App() {
  return (
    <SearchProvider>
      <div className="app-root">
        <Navbar />
        <LoginModal />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
          </Routes>
        </main>
      </div>
    </SearchProvider>
  )
}
