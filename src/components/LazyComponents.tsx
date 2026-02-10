/**
 * Lazy Loading Components
 * Optimized dynamic imports for better performance
 */

import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'

// Product Catalog - loaded only when needed
export const LazyProductCatalog = dynamic(
  () => import('@/components/ProductCatalog'),
  { 
    ssr: false,
    loading: () => <ProductCatalogSkeleton />
  }
)

// Product Detail - loaded only when navigating to product page
export const LazyProductDetail = dynamic(
  () => import('@/components/ProductDetailActions').then(mod => ({ default: mod.ProductDetailActions })),
  { 
    ssr: false,
    loading: () => <ProductDetailSkeleton />
  }
)

// Blog components - loaded only when on blog pages
export const LazyBlogPost = dynamic(
  () => import('@/app/blog/[slug]/page'),
  { 
    ssr: true,
    loading: () => <BlogPostSkeleton />
  }
)

// Testimonials - loaded only when scrolled into view
export const LazyTestimonials = dynamic(
  () => import('@/app/testimonials/page'),
  { 
    ssr: false,
    loading: () => <TestimonialsSkeleton />
  }
)

// Custom Design - loaded only when needed
export const LazyCustomDesign = dynamic(
  () => import('@/components/CustomDesign'),
  { 
    ssr: false,
    loading: () => <CustomDesignSkeleton />
  }
)

// Google Maps - loaded only when needed (heavy component)
export const LazyGoogleMaps = dynamic(
  () => import('@/components/GoogleMaps'),
  { 
    ssr: false,
    loading: () => <MapSkeleton />
  }
)

// Skeleton Components
function ProductCatalogSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  )
}

function ProductDetailSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-96 w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-12 w-32" />
        <Skeleton className="h-12 w-32" />
      </div>
    </div>
  )
}

function BlogPostSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Skeleton className="h-64 w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  )
}

function TestimonialsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-3 p-6 border rounded-lg">
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      ))}
    </div>
  )
}

function CustomDesignSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-12 w-1/2" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  )
}

function MapSkeleton() {
  return (
    <div className="h-96 w-full rounded-lg bg-gray-200 animate-pulse flex items-center justify-center">
      <div className="text-center">
        <div className="h-12 w-12 mx-auto mb-2 rounded-full bg-gray-300 animate-pulse" />
        <div className="h-4 w-32 mx-auto rounded bg-gray-300 animate-pulse" />
      </div>
    </div>
  )
}
