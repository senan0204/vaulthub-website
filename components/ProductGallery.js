'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'

export default function ProductGallery({ images = [], video = '' }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showVideo, setShowVideo] = useState(false)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
    setShowVideo(false)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    setShowVideo(false)
  }

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null
  }

  const youtubeUrl = getYouTubeEmbedUrl(video)

  return (
    <div className="space-y-6">
      {/* Main Display */}
      <div className="relative aspect-square rounded-[2rem] overflow-hidden border border-white/10 bg-accent/20 group">
        {showVideo && video ? (
          youtubeUrl ? (
            <iframe
              src={`${youtubeUrl}?autoplay=1`}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <video
              src={video}
              controls
              autoPlay
              className="w-full h-full object-cover"
            />
          )
        ) : (
          <>
            <Image 
              src={images[currentIndex]} 
              alt={`Product image ${currentIndex + 1}`} 
              fill 
              className="object-cover transition-transform duration-700"
              priority
            />
            
            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-primary z-10"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-primary z-10"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </>
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrentIndex(idx)
              setShowVideo(false)
            }}
            className={`relative flex-shrink-0 w-24 aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
              currentIndex === idx && !showVideo ? 'border-primary scale-105' : 'border-white/5 opacity-50 hover:opacity-100'
            }`}
          >
            <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
          </button>
        ))}
        
        {video && (
          <button
            onClick={() => setShowVideo(true)}
            className={`relative flex-shrink-0 w-24 aspect-square rounded-2xl overflow-hidden border-2 transition-all bg-accent flex items-center justify-center ${
              showVideo ? 'border-primary scale-105' : 'border-white/5 opacity-50 hover:opacity-100'
            }`}
          >
            {images[0] ? (
               <Image src={images[0]} alt="Video thumbnail" fill className="object-cover opacity-30" />
            ) : null}
            <Play className="w-8 h-8 text-white relative z-10" />
          </button>
        )}
      </div>
    </div>
  )
}
