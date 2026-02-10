"use client"

import { useState, useEffect, useCallback } from 'react'
import { MobileOptimizedImage } from './MobileOptimizedImage'
import { ProductSummary } from '@/lib/supabase-optimized'

interface MobileSliderProps {
  products: ProductSummary[]
}

export const MobileImageSlider = ({ products }: MobileSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  // Auto-advance with pause on touch
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex < products.length - 1 ? prevIndex + 1 : 0
      )
    }, 5000) // 5 seconds per slide

    return () => clearInterval(interval)
  }, [products.length])

  // Touch handlers for mobile swipe
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }, [])

  const handleTouchEnd = useCallback(() => {
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
  }, [touchStart, touchEnd, currentIndex, products.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex < products.length - 1 ? prevIndex + 1 : 0
    )
  }, [products.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : products.length - 1
    )
  }, [products.length])

  if (!products || products.length === 0) {
    return (
      <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg bg-gray-200 animate-pulse" />
    )
  }

  return (
    <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg">
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
              alt={product.title}
              priority={index === 0}
              className="w-full h-full"
              fill={true}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h3 className="text-lg font-bold mb-2">{product.title}</h3>
              <p className="text-sm opacity-90 line-clamp-2">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation arrows - hidden on mobile, visible on desktop */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Mobile-friendly dots indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
