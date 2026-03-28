'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MessageCircle, ExternalLink, Play, Zap } from 'lucide-react'
import PaymentModal from './PaymentModal'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProductCard({ product }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [whatsapp, setWhatsapp] = useState('919752691095')

  const isSold = product.status === 'sold'
  const isPremium = product.isPremium
  const hasMultipleImages = product.images && product.images.length > 1

  // Format price: "8999 R.s/-" -> "₹8,999"
  const formatPrice = (priceStr) => {
    if (!priceStr) return "₹0"
    // Extract numbers only
    const numericPrice = priceStr.replace(/[^0-9]/g, '')
    if (!numericPrice) return priceStr // Fallback if no numbers found (e.g. "Negotiable")
    
    // Format with commas and currency symbol
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(numericPrice)
  }
  
  useEffect(() => {
    const controller = new AbortController()
    async function loadSettings() {
      try {
        const res = await fetch('/api/settings', { cache: 'no-store', signal: controller.signal })
        const data = await res.json()
        if (data && data.whatsapp) setWhatsapp(data.whatsapp)
      } catch (error) {
        if (error?.name !== 'AbortError') {
          console.error('Failed to load settings:', error)
        }
      }
    }
    loadSettings()
    return () => controller.abort()
  }, [])

  useEffect(() => {
    if (!hasMultipleImages || isHovered || isSold) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [hasMultipleImages, isHovered, isSold, product.images?.length])

  const message = `Hello, I want to buy:\nProduct: ${product.title}\nType: ${product.type || 'Account'}\nCategory: ${product.category || 'Game Accounts'}\nPrice: ${formatPrice(product.price)}\nFrom VaultHub`
  const whatsappUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative bg-accent/50 border overflow-hidden group transition-all duration-500 rounded-3xl ${
        isPremium 
        ? 'border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.15)] bg-gradient-to-br from-yellow-500/10 to-accent/50' 
        : 'border-white/10 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10'
      } ${isSold ? 'opacity-75' : ''}`}
    >
      {isPremium && (
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/5 to-transparent pointer-events-none" />
      )}

      <div className="relative h-64 overflow-hidden bg-accent/20">
        <AnimatePresence>
          {product.images && product.images.length > 0 ? (
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image 
                src={product.images[currentImageIndex]} 
                alt={`${product.title} - Image ${currentImageIndex + 1}`}
                fill 
                className={`object-cover transition-transform duration-500 group-hover:scale-105 ${isSold ? 'grayscale-[0.5]' : ''}`}
                priority={currentImageIndex === 0}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </motion.div>
          ) : (
            <div className="w-full h-full bg-accent flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
        </AnimatePresence>

        {/* Progress Indicators for Multiple Images */}
        {hasMultipleImages && !isSold && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 px-2 py-1 bg-black/20 backdrop-blur-sm rounded-full">
            {product.images.map((_, idx) => (
              <div 
                key={idx}
                className={`h-1 rounded-full transition-all duration-300 ${
                  idx === currentImageIndex ? 'w-4 bg-primary' : 'w-1 bg-white/30'
                }`}
              />
            ))}
          </div>
        )}
        
        {/* Badges Container */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          <div className={`backdrop-blur-md px-3 py-1 rounded-full border text-[10px] font-bold text-white uppercase tracking-widest ${
            isPremium ? 'bg-yellow-500/80 border-yellow-500/50' : 'bg-black/60 border-white/10'
          }`}>
            {product.category || 'Game Accounts'}
          </div>
          {product.isHotDeal && !isSold && (
            <div className="bg-red-600/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-black text-white uppercase tracking-tighter w-fit animate-pulse">
              HOT DEAL
            </div>
          )}
          {isPremium && (
            <div className="bg-yellow-500 backdrop-blur-md px-3 py-1 rounded-full border border-yellow-400 text-[10px] font-black text-black uppercase tracking-tighter w-fit shadow-lg shadow-yellow-500/20">
              PREMIUM
            </div>
          )}
          {isSold && (
            <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[10px] font-black text-white uppercase tracking-tighter w-fit">
              SOLD
            </div>
          )}
        </div>

        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          {product.video && (
            <div className="bg-primary/80 backdrop-blur-md p-2 rounded-full border border-white/10 text-white">
              <Play className="w-3 h-3 fill-current" />
            </div>
          )}
          {product.type === 'cheat' && (
            <div className="bg-secondary/80 backdrop-blur-md p-2 rounded-full border border-white/10 text-white">
              <Zap className="w-3 h-3 fill-current" />
            </div>
          )}
        </div>
      </div>

      <div className="p-6 relative z-10">
        <div className="flex justify-between items-start gap-4 mb-4">
          <h3 className={`text-lg font-bold transition-colors line-clamp-3 min-h-[4.5rem] leading-snug ${
            isPremium ? 'text-yellow-500 group-hover:text-yellow-400' : 'text-white group-hover:text-secondary'
          }`}>
            {product.title}
          </h3>
          <span className={`text-xl font-black tracking-tight whitespace-nowrap ${
            isPremium ? 'text-yellow-500' : 'text-primary'
          }`}>
            {formatPrice(product.price)}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${
            isPremium ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 'bg-white/5 text-gray-500 border-white/5'
          }`}>
            {product.type || 'Account'}
          </span>
        </div>

        <p className="text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="grid grid-cols-2 gap-3">
          <Link 
            href={`/product/${product.id}`}
            className={`flex items-center justify-center gap-2 py-3 rounded-2xl font-bold transition-all border ${
              isPremium 
              ? 'bg-yellow-500/5 hover:bg-yellow-500/10 text-yellow-500 border-yellow-500/20' 
              : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
            }`}
          >
            <ExternalLink className="w-4 h-4" /> Details
          </Link>
          {isSold ? (
            <button 
              disabled
              className="flex items-center justify-center gap-2 bg-white/5 text-gray-500 py-3 rounded-2xl font-bold cursor-not-allowed border border-white/5"
            >
              SOLD OUT
            </button>
          ) : (
            <button 
              onClick={() => setIsModalOpen(true)}
              className={`flex items-center justify-center gap-2 py-3 rounded-2xl font-bold transition-all hover:scale-105 shadow-lg ${
                isPremium 
                ? 'bg-yellow-500 hover:bg-yellow-400 text-black shadow-yellow-500/20' 
                : 'bg-primary hover:bg-primary/80 text-white shadow-primary/20'
              }`}
            >
              <MessageCircle className="w-4 h-4" /> Buy Now
            </button>
          )}
        </div>
      </div>
      <PaymentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={product} 
      />
    </div>
  )
}
