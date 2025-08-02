"use client";

import { Product, productService } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState, useMemo, useCallback } from 'react';

const AutoImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);


  // Memoize current product untuk mencegah re-render
  const currentProduct = useMemo(() => products[currentIndex], [products, currentIndex]);

  // Callback untuk navigasi
  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex(prev => prev === 0 ? products.length - 1 : prev - 1);
  }, [products.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % products.length);
  }, [products.length]);

  // Auto slide dengan cleanup yang lebih baik
  useEffect(() => {
    if (!isPaused && products.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % products.length);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [products.length, isPaused]);

  // Fetch data dengan error handling yang lebih baik
  useEffect(() => {
    let isMounted = true;

    async function fetchProductData() {
      try {
        const [fetchedProducts] = await Promise.all([
          productService.getAllProducts(),
        ]);

        if (isMounted) {
          setProducts(fetchedProducts);
      
          setIsLoaded(true);
        }
      } catch (error) {
        console.error('Failed to fetch product data:', error);
        if (isMounted) {
          setIsLoaded(true);
        }
      }
    }

    fetchProductData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Loading state yang lebih ringan
  if (!isLoaded || products.length === 0) {
    return (
      <div className="relative w-full h-[50vh] md:h-[60vh] max-h-[600px] min-h-[300px] md:min-h-[400px]">
        <div className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="w-6 h-6 md:w-8 md:h-8 border-2 md:border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2 md:mb-4"></div>
            <span className="text-gray-600 text-sm md:text-base">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-[50vh] md:h-[60vh] max-h-[600px] min-h-[300px] md:min-h-[400px] overflow-hidden rounded-lg shadow-2xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Image Container */}
      <div className="relative w-full h-full">
        {products.map((image, index) => (
          <div
            key={`slide-${index}`}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === currentIndex
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-105'
              }`}
            style={{ 
              willChange: index === currentIndex ? 'opacity, transform' : 'auto',
              transform: index === currentIndex ? 'translateZ(0)' : undefined
            }}
          >
            <Image
              src={image.image_url}
              alt={image.title}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
              fill
              className="w-full h-full object-cover"
              loading={index <= 1 ? "eager" : "lazy"}
              priority={index === 0}
              quality={index === currentIndex ? 85 : 75}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyEkliVYyDoAAD8Cq9vBa2+eI/tHuIyTqdOp5jgWJpnrCKvwkJAVJM8r3lBmcTJnNvv+8CqsVZFHYzZQovR9Qs3uYUlUotZpF7VMMM0ijF9sctEuRYeYrlR2gEqCsZYgSQ3qvVUxVTdnqhFCKfGXNy/llkX/KMWWTVMzpNJ3ORhjqBAzSrQFTELBHaIDJqJDNKQDNKhADMzNNJJJJMzNKSTS"
            />

            {/* Overlay Gradient - Optimized for mobile */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent md:from-black/50 md:via-black/30"></div>
          </div>
        ))}

        {/* Content Overlay - Responsive design */}
        <div className="absolute inset-0 flex items-center justify-start p-4 md:p-8 lg:p-16">
          <div className="text-white max-w-xl md:max-w-2xl">
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-2 md:mb-4 leading-tight">
              {currentProduct?.title}
            </h1>
            <p className="text-sm md:text-lg lg:text-xl mb-4 md:mb-6 text-white/90 line-clamp-2 md:line-clamp-none">
              {currentProduct?.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <Link href={`/product/${currentProduct?.slug}`}>
                <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold transition-colors duration-200 text-sm md:text-base">
                  Cek Sekarang
                </button>
              </Link>
            
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons - Hidden on mobile untuk space */}
      <button
        onClick={goToPrevious}
        className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all z-10 group"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all z-10 group"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator - Optimized untuk mobile */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3">
        {products.map((_, index) => (
          <button
            key={`dot-${index}`}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-200 ${index === currentIndex
                ? 'bg-white scale-125 shadow-lg'
                : 'bg-white/50 hover:bg-white/80'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 md:h-1 bg-white/20">
        <div
          className="bg-white h-full transition-all duration-300 ease-out"
          style={{
            width: `${((currentIndex + 1) / products.length) * 100}%`
          }}
        />
      </div>

      {/* Pause Indicator - Hidden pada mobile */}
      {isPaused && (
        <div className="hidden md:block absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
          Paused
        </div>
      )}
    </div>
  );
};

export default AutoImageSlider;