"use client"

import { useState, useEffect, useCallback, useRef } from 'react'
import { MobileOptimizedImage } from './MobileOptimizedImage'
import { ProductSummary } from '@/lib/supabase-optimized'
import Link from 'next/link'

interface MobileSliderProps {
  products: ProductSummary[]
}

export const MobileImageSlider = ({ products }: MobileSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && products.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % products.length)
      }, 4000) // Slower for mobile
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying, products.length])

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
    setIsAutoPlaying(false) // Pause auto-play on touch
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && currentIndex < products.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }

    // Resume auto-play after 3 seconds
    setTimeout(() => setIsAutoPlaying(true), 3000)
  }

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 3000)
  }, [])

  if (!products.length) {
    return (
      <div className="w-full h-64 md:h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">Loading...</span>
      </div>
    )
  }

  const currentProduct = products[currentIndex]

  return (
    <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg bg-gray-900">
      <div 
        className="flex transition-transform duration-300 ease-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {products.map((product, index) => (
          <div key={product.id} className="w-full h-full flex-shrink-0 relative">
            <MobileOptimizedImage
              src={product.image_url}
              alt={`${product.title} - Featured product showcase`}
              priority={index === 0}
              className="w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>
        ))}
      </div>
      
      {/* Content overlay - optimized for mobile */}
      <div className="absolute inset-0 flex items-end p-4 md:p-6">
        <div className="text-white w-full">
          <h2 className="text-lg md:text-2xl lg:text-3xl font-bold mb-2 leading-tight">
            {currentProduct?.title}
          </h2>
          <p className="text-sm md:text-base lg:text-lg mb-4 text-white/90 line-clamp-2">
            {currentProduct?.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Link 
              href={`/product/${currentProduct?.slug}`} 
              className="inline-block w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-colors duration-200 text-sm md:text-base text-center min-h-[44px] flex items-center justify-center"
              aria-label={`View details for ${currentProduct?.title}`}
            >
              Cek Sekarang
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile-friendly navigation dots */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {products.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center ${
              index === currentIndex ? 'bg-blue-100' : 'hover:bg-gray-100'
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}: ${products[index].title}`}
          >
            <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-200 ${
              index === currentIndex ? 'bg-blue-600 scale-125' : 'bg-white/60'
            }`} />
          </button>
        ))}
      </div>

      {/* Progress indicator for mobile */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/20 md:hidden">
        <div
          className="bg-blue-600 h-full transition-all duration-300 ease-out"
          style={{
            width: `${((currentIndex + 1) / products.length) * 100}%`
          }}
        />
      </div>
    </div>
  )
}