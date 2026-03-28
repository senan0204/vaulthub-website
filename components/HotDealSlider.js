'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Flame, ArrowRight, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { db } from '@/lib/firebase'
import { collection, onSnapshot, query, orderBy, doc } from 'firebase/firestore'

export default function HotDealSlider() {
  const [slides, setSlides] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    // Real-time listener for products (to find Hot Deals)
    const productsQuery = query(collection(db, 'products'), orderBy('id', 'desc'))
    const unsubscribeProducts = onSnapshot(productsQuery, (productsSnapshot) => {
      const productsData = productsSnapshot.docs.map(doc => ({
        ...doc.data(),
        firebaseId: doc.id
      }))

      // Real-time listener for custom slides
      const slidesQuery = query(collection(db, 'slides'), orderBy('createdAt', 'asc'))
      const unsubscribeSlides = onSnapshot(slidesQuery, (slidesSnapshot) => {
        const slidesData = slidesSnapshot.docs.map(doc => ({
          ...doc.data(),
          firebaseId: doc.id
        }))
        
        const productById = new Map(productsData.map((p) => [p.id, p]))

        // Filter products marked as Hot Deal
        const hotDealProducts = productsData
          .filter(p => p.isHotDeal && p.status !== 'sold' && p.images && p.images[0])
          .map(p => ({
            id: p.id,
            image: p.images[0],
            title: p.title,
            subtitle: p.description,
            buttonText: 'BUY NOW',
            linkedProductId: p.id,
            isPremium: !!p.isPremium
          }))

        const curatedSlides = (slidesData || [])
          .map((s) => {
            const linked = s.linkedProductId ? productById.get(s.linkedProductId) : null
            const image = s.image || linked?.images?.[0]
            if (!image) return null
            return {
              ...s,
              image,
              isPremium: !!linked?.isPremium
            }
          })
          .filter(Boolean)

        setSlides([...hotDealProducts, ...curatedSlides])
      })

      return () => unsubscribeSlides()
    })

    return () => unsubscribeProducts()
  }, [])

  const nextSlide = useCallback(() => {
    if (slides.length <= 1) return
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const prevSlide = useCallback(() => {
    if (slides.length <= 1) return
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  useEffect(() => {
    if (slides.length <= 1 || isPaused) return
    const timer = setInterval(nextSlide, 6000)
    return () => clearInterval(timer)
  }, [nextSlide, slides.length, isPaused])

  if (slides.length === 0) return null

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.95
    })
  }

  const currentSlide = slides[currentIndex]

  return (
    <section 
      className="container mx-auto px-4 py-4 md:py-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={`relative w-full h-[300px] md:h-[450px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border shadow-2xl group transition-all duration-500 ${
        currentSlide.isPremium || currentSlide.isCustomCheat 
        ? 'border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.15)] bg-gradient-to-br from-yellow-500/10 to-accent/50' 
        : 'bg-accent/20 border-white/10'
      }`}>
        {(currentSlide.isPremium || currentSlide.isCustomCheat) && (
          <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/5 to-transparent pointer-events-none" />
        )}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 },
              scale: { duration: 0.4 }
            }}
            className="absolute inset-0"
          >
            <div className="relative w-full h-full cursor-pointer">
              <Link href={currentSlide.isCustomCheat ? '/custom-cheat' : (currentSlide.linkedProductId ? `/product/${currentSlide.linkedProductId}` : '#')}>
                <Image
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
                {/* Dark Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent md:from-black/80 md:via-black/20 ${
                  (currentSlide.isPremium || currentSlide.isCustomCheat) ? 'mix-blend-multiply opacity-80' : ''
                }`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                <div className="absolute inset-0 flex items-center justify-start p-8 md:p-16">
                  <div className="max-w-2xl">
                    <motion.div 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black text-white uppercase tracking-widest mb-6 shadow-lg ${
                        currentSlide.isCustomCheat 
                        ? 'bg-yellow-500 text-black shadow-yellow-500/20' 
                        : 'bg-red-600 shadow-red-600/20'
                      }`}
                    >
                      {currentSlide.isCustomCheat ? <Zap className="w-3.5 h-3.5 fill-current" /> : <Flame className="w-3.5 h-3.5 fill-current" />}
                      {currentSlide.isCustomCheat ? 'EXCLUSIVE' : 'HOT DEAL'}
                    </motion.div>

                    {currentSlide.isPremium && !currentSlide.isCustomCheat && (
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.05 }}
                        className="inline-flex items-center gap-2 bg-yellow-500 backdrop-blur-md px-4 py-1.5 rounded-full border border-yellow-400 text-[10px] font-black text-black uppercase tracking-widest mb-6 shadow-lg shadow-yellow-500/20"
                      >
                        PREMIUM
                      </motion.div>
                    )}
                    
                    <motion.h2 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className={`text-4xl md:text-6xl font-black mb-4 tracking-tighter leading-none ${
                        (currentSlide.isPremium || currentSlide.isCustomCheat) ? 'text-yellow-500' : 'text-white'
                      }`}
                    >
                      {currentSlide.title}
                    </motion.h2>

                    <motion.p 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-lg md:text-xl font-medium text-gray-300 mb-8 max-w-lg leading-relaxed line-clamp-2"
                    >
                      {currentSlide.subtitle}
                    </motion.p>

                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center gap-4"
                    >
                      <span className={`px-8 py-3.5 rounded-xl font-black text-sm flex items-center gap-2 group/btn transition-all hover:gap-4 shadow-xl ${
                        (currentSlide.isPremium || currentSlide.isCustomCheat)
                        ? 'bg-yellow-500 text-black shadow-yellow-500/20'
                        : 'bg-white text-black shadow-white/10'
                      }`}>
                        {currentSlide.buttonText || 'GET DEAL'} <ArrowRight className="w-4 h-4" />
                      </span>
                    </motion.div>
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        {slides.length > 1 && (
          <>
            <button
              onClick={(e) => { e.preventDefault(); prevSlide(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-primary border border-white/10 flex items-center justify-center"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => { e.preventDefault(); nextSlide(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-primary border border-white/10 flex items-center justify-center"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.preventDefault(); setCurrentIndex(idx); }}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-white/30'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
