"use client";

import { Product, productService } from '@/lib/supabase';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const AutoImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);




  // Auto slide dengan interval yang lebih reasonable (5 detik)
  useEffect(() => {
    setIsLoaded(true);

    if (!isPaused) {
      const timer = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % products.length);
      }, 5000); // 5 detik lebih baik untuk UX

      return () => clearInterval(timer);
    }
  }, [products.length, isPaused]);

  // Preload images untuk performance yang lebih baik
  useEffect(() => {
    async function fetchProductData() {
      try {
        const [fetchedProducts, fetchedCategories] = await Promise.all([
          productService.getAllProducts(),
          productService.getAllCategories()
        ]);

        setProducts(fetchedProducts);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Failed to fetch product data:', error);
      } finally {
        setIsLoaded(true); // Fixed: should be false when done loading
      }
    }

    fetchProductData();
  }, []);


  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(prev => prev === 0 ? products.length - 1 : prev - 1);
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % products.length);
  };

  if (!isLoaded) {
    return (
      <div className="relative w-full h-[60vh] max-h-[600px] min-h-[400px]">
        <div className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <span className="text-gray-600">Loading Hero Slider...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-[60vh] max-h-[600px] min-h-[400px] overflow-hidden rounded-lg shadow-2xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Image Container */}
      <div className="relative w-full h-full">
        {products.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === currentIndex
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-105'
              }`}
          >
            <Image
              src={image.image_url}
              alt={image.title}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"></div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center justify-start p-8 md:p-16">
              <div className="text-white max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                  {image.title}
                </h1>
                <p className="text-lg md:text-xl mb-6 text-white/90">
                  {image.description}
                </p>
                <div className="flex space-x-4">
                  <Link href={`/product/${image.slug}`}>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105">
                     {image.slug}
                    </button>
                  </Link>
              
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all z-10 group"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all z-10 group"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentIndex
                ? 'bg-white scale-125 shadow-lg'
                : 'bg-white/50 hover:bg-white/80'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div
          className="bg-white h-full transition-all duration-300 ease-out"
          style={{
            width: `${((currentIndex + 1) / products.length) * 100}%`
          }}
        />
      </div>

      {/* Pause Indicator */}
      {isPaused && (
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
          Paused
        </div>
      )}
    </div>
  );
};


export default AutoImageSlider