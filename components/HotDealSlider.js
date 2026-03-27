'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Flame, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { getSlides } from '@/lib/actions'

export default function HotDealSlider() {
  const [slides, setSlides] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    async function loadSlides() {
      const data = await getSlides()
      setSlides(data)
    }
    loadSlides()
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
    const timer = setInterval(nextSlide, 5000)
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
      className="container mx-auto px-4 py-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative w-full h-[350px] md:h-[450px] rounded-[2rem] overflow-hidden bg-accent/20 border border-white/10 shadow-2xl group">
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
              <Link href={currentSlide.linkedProductId ? `/product/${currentSlide.linkedProductId}` : '#'}>
                <Image
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  priority
                />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent md:from-black/80 md:via-black/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                <div className="absolute inset-0 flex items-center justify-start p-8 md:p-16">
                  <div className="max-w-2xl">
                    <motion.div 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="inline-flex items-center gap-2 bg-red-600 px-4 py-1.5 rounded-full text-[10px] font-black text-white uppercase tracking-widest mb-6 shadow-lg shadow-red-600/20"
                    >
                      <Flame className="w-3.5 h-3.5 fill-current" /> HOT DEAL
                    </motion.div>
                    
                    <motion.h2 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter leading-none"
                    >
                      {currentSlide.title}
                    </motion.h2>

                    <motion.p 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-lg md:text-xl font-medium text-gray-300 mb-8 max-w-lg leading-relaxed"
                    >
                      {currentSlide.subtitle}
                    </motion.p>

                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center gap-4"
                    >
                      <span className="bg-white text-black px-8 py-3.5 rounded-xl font-black text-sm flex items-center gap-2 group/btn transition-all hover:gap-4 shadow-xl shadow-white/10">
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
