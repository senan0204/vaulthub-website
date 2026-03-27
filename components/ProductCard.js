'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MessageCircle, ExternalLink, Play } from 'lucide-react'
import PaymentModal from './PaymentModal'
import { motion, AnimatePresence } from 'framer-motion'
import { getSettings } from '@/lib/actions'

export default function ProductCard({ product }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [whatsapp, setWhatsapp] = useState('919752691095')

  const isSold = product.status === 'sold'
  const hasMultipleImages = product.images && product.images.length > 1
  
  useEffect(() => {
    async function loadSettings() {
      const settings = await getSettings()
      if (settings && settings.whatsapp) {
        setWhatsapp(settings.whatsapp)
      }
    }
    loadSettings()
  }, [])

  useEffect(() => {
    if (!hasMultipleImages || isHovered || isSold) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [hasMultipleImages, isHovered, isSold, product.images?.length])

  const message = 'Hello, I want to buy:\nProduct: ' + product.title + '\nCategory: ' + (product.category || 'Game Accounts') + '\nGame: ' + product.game + '\nPrice: ' + product.price + '\nFrom VaultHub'
  const whatsappUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`bg-accent/50 border border-white/10 rounded-3xl overflow-hidden group hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 ${isSold ? 'opacity-75' : ''}`}
    >
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
          <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-bold text-white uppercase tracking-widest">
            {product.game}
          </div>
          {product.isHotDeal && !isSold && (
            <div className="bg-red-600/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-black text-white uppercase tracking-tighter w-fit animate-pulse">
              HOT DEAL
            </div>
          )}
          {isSold && (
            <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[10px] font-black text-white uppercase tracking-tighter w-fit">
              SOLD
            </div>
          )}
        </div>

        {product.video && (
          <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-md p-2 rounded-full border border-white/10 text-white z-10">
            <Play className="w-3 h-3 fill-current" />
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white group-hover:text-secondary transition-colors line-clamp-1">
            {product.title}
          </h3>
          <span className="text-2xl font-black text-primary">
            {product.price}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded border border-white/5">
            {product.category || 'Game Accounts'}
          </span>
        </div>

        <p className="text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="grid grid-cols-2 gap-3">
          <Link 
            href={`/product/${product.id}`}
            className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white py-3 rounded-2xl font-bold transition-all"
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
              className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/80 text-white py-3 rounded-2xl font-bold transition-all hover:scale-105"
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
