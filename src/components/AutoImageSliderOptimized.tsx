"use client";

import { ProductSummary, productService } from '@/lib/supabase-optimized';
import { MobileOptimizedImage } from '@/components/MobileOptimizedImage';
import Link from 'next/link';
import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';

// Optimized loading skeleton with fixed dimensions
const LoadingSkeleton = () => (
  <div className="relative w-full h-[50vh] md:h-[60vh] max-h-[600px] min-h-[300px] md:min-h-[400px]">
    <div className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <span className="text-gray-600 text-base">Loading...</span>
      </div>
    </div>
  </div>
);

const AutoImageSliderOptimized = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [imageLoadStates, setImageLoadStates] = useState<boolean[]>([]);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize current product untuk mencegah re-render
  const currentProduct = useMemo(() => products[currentIndex], [products, currentIndex]);

  // Optimized image preloading
  const preloadImages = useCallback((products: ProductSummary[]) => {
    const loadStates = new Array(products.length).fill(false);
    setImageLoadStates(loadStates);

    // Preload first 3 images immediately
    products.slice(0, 3).forEach((product, index) => {
      const img = new window.Image();
      img.onload = () => {
        setImageLoadStates(prev => {
          const newStates = [...prev];
          newStates[index] = true;
          return newStates;
        });
      };
      img.src = product.image_url;
    });

    // Lazy load remaining images
    setTimeout(() => {
      products.slice(3).forEach((product, index) => {
        const img = new window.Image();
        img.onload = () => {
          setImageLoadStates(prev => {
            const newStates = [...prev];
            newStates[index + 3] = true;
            return newStates;
          });
        };
        img.src = product.image_url;
      });
    }, 1000);
  }, []);

  // Callback untuk navigasi dengan performance optimization
  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex(prev => prev === 0 ? products.length - 1 : prev - 1);
  }, [products.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % products.length);
  }, [products.length]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true); // Pause auto-play on touch
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < products.length - 1) {
      goToNext();
    }
    if (isRightSwipe && currentIndex > 0) {
      goToPrevious();
    }

    // Resume auto-play after 3 seconds
    setTimeout(() => setIsPaused(false), 3000);
  };

  // Optimized auto slide with better cleanup
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (!isPaused && products.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % products.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [products.length, isPaused]);

  // Optimized data fetching with caching
  useEffect(() => {
    let isMounted = true;

    async function fetchProductData() {
      try {
        // Check if data is already cached
        const cachedData = sessionStorage.getItem('slider-products');
        if (cachedData) {
          const products = JSON.parse(cachedData);
          if (isMounted) {
            setProducts(products);
            preloadImages(products);
            setIsLoaded(true);
          }
          return;
        }

        const fetchedProducts = await productService.getAllProducts();
        
        if (isMounted && fetchedProducts.length > 0) {
          // Limit to first 5 products for better performance
          const limitedProducts = fetchedProducts.slice(0, 5);
          setProducts(limitedProducts);
          preloadImages(limitedProducts);
          
          // Cache the data
          sessionStorage.setItem('slider-products', JSON.stringify(limitedProducts));
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
  }, [preloadImages]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  if (!isLoaded || products.length === 0) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="relative h-[50vh] md:h-[60vh] max-h-[600px] min-h-[300px] md:min-h-[400px] flex flex-col gap-4">
      <div
        className="relative w-full h-[50vh] md:h-[60vh] max-h-[600px] min-h-[300px] md:min-h-[400px] overflow-hidden rounded-lg"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Image Container with optimized rendering */}
        <div className="relative w-full h-full">
          {products.map((product, index) => (
            <div
              key={`slide-${product.id}`}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                willChange: index === currentIndex ? 'opacity' : 'auto',
              }}
            >
              <MobileOptimizedImage
                src={product.image_url}
                alt={`${product.title} - Featured product showcase`}
                className="w-full h-full"
                priority={index === 0}
              />

              {/* Optimized overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"></div>
            </div>
          ))}

          {/* Content Overlay - Optimized for CLS */}
          <div className="absolute inset-0 flex items-center justify-start p-4 md:p-8 lg:p-16">
            <div className="text-white max-w-xl md:max-w-2xl">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4 leading-tight">
                {currentProduct?.title}
              </h2>
              <p className="text-sm md:text-lg lg:text-xl mb-4 md:mb-6 text-white/90 line-clamp-2 md:line-clamp-none">
                {currentProduct?.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 max-w-md">
                <Link 
                  href={`/product/${currentProduct?.slug}`} 
                  className="inline-block w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold transition-colors duration-200 text-sm md:text-base text-center min-h-[44px] flex items-center justify-center"
                  aria-label={`View details for ${currentProduct?.title}`}
                >
                  Cek Sekarang
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Optimized Navigation Buttons with better touch targets */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 md:p-4 rounded-full transition-all z-10 group min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label={`Previous slide - Go to ${products[(currentIndex - 1 + products.length) % products.length]?.title || 'previous product'}`}
        >
          <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 md:p-4 rounded-full transition-all z-10 group min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label={`Next slide - Go to ${products[(currentIndex + 1) % products.length]?.title || 'next product'}`}
        >
          <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Optimized Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
          <div
            className="bg-blue-600 h-full transition-all duration-300 ease-out"
            style={{
              width: `${((currentIndex + 1) / products.length) * 100}%`
            }}
          />
        </div>

        {/* Pause Indicator */}
        {isPaused && (
          <div className="hidden md:block absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
            Paused
          </div>
        )}
      </div>

      {/* Optimized Dots Indicator with better touch targets */}
      <div className="flex justify-center gap-1 z-10" role="tablist" aria-label="Slide navigation">
        {products.map((product, index) => (
          <button
            key={`dot-${index}`}
            onClick={() => goToSlide(index)}
            className={`p-2 rounded-full transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center ${
              index === currentIndex
                ? 'bg-blue-100'
                : 'hover:bg-gray-100'
            }`}
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`Go to slide ${index + 1}: ${product.title}`}
          >
            <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? 'bg-blue-600 scale-125'
                : 'bg-gray-400'
            }`} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default AutoImageSliderOptimized;