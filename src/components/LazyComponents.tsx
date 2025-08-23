"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Optimized loading components with better skeletons
const LoadingCard = () => (
  <div className="bg-card rounded-lg border border-border overflow-hidden shadow-sm">
    <div className="relative aspect-[4/3] bg-muted animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer" />
    </div>
    <div className="p-4 space-y-4">
      <div className="h-4 w-16 bg-muted rounded-full animate-pulse" />
      <div className="space-y-2">
        <div className="h-5 w-3/4 bg-muted rounded animate-pulse" />
        <div className="h-4 w-1/2 bg-muted rounded animate-pulse" />
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full bg-muted rounded animate-pulse" />
        <div className="h-3 w-4/5 bg-muted rounded animate-pulse" />
        <div className="h-3 w-2/3 bg-muted rounded animate-pulse" />
      </div>
      <div className="flex items-center justify-between pt-4">
        <div className="space-y-1">
          <div className="h-6 w-20 bg-muted rounded animate-pulse" />
          <div className="h-4 w-16 bg-muted rounded animate-pulse" />
        </div>
        <div className="h-9 w-24 bg-muted rounded-md animate-pulse" />
      </div>
    </div>
  </div>
);

const LoadingGrid = ({ count = 8 }: { count?: number }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <LoadingCard key={i} />
    ))}
  </div>
);

const LoadingSection = ({ height = "400px" }: { height?: string }) => (
  <div className={`flex items-center justify-center bg-gray-100 rounded-lg animate-pulse`} style={{ minHeight: height }}>
    <div className="text-center">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <div className="text-gray-500">Loading...</div>
    </div>
  </div>
);

// Lazy loaded components with optimized loading states
export const LazyProductCatalog = dynamic(() => import("@/components/ProductCatalog"), {
  loading: () => (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="h-10 w-80 bg-muted rounded mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-96 bg-muted rounded mx-auto animate-pulse" />
        </div>
        <div className="mb-8">
          <div className="grid grid-cols-4 gap-2 p-1 bg-muted rounded-md">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 bg-muted-foreground/10 rounded-sm animate-pulse" />
            ))}
          </div>
        </div>
        <LoadingGrid />
      </div>
    </section>
  ),
  ssr: false
});

export const LazyCustomDesign = dynamic(() => import("@/components/CustomDesign"), {
  loading: () => <LoadingSection height="300px" />,
  ssr: false
});

export const LazyGoogleMaps = dynamic(() => import("@/components/GoogleMaps"), {
  loading: () => <LoadingSection height="400px" />,
  ssr: false
});

export const LazyFooter = dynamic(() => import("@/components/Footer"), {
  loading: () => (
    <div className="min-h-[200px] bg-gray-900 flex items-center justify-center">
      <div className="animate-pulse text-gray-400">Loading footer...</div>
    </div>
  ),
  ssr: false
});

export const LazyWhatsAppFloat = dynamic(() => import("@/components/WhatsAppFloat"), {
  ssr: false
});

// Intersection Observer based lazy loading wrapper
export const LazySection = ({ 
  children, 
  fallback, 
  rootMargin = "50px" 
}: { 
  children: React.ReactNode; 
  fallback: React.ReactNode;
  rootMargin?: string;
}) => {
  return (
    <Suspense fallback={fallback}>
      <div data-lazy-section data-root-margin={rootMargin}>
        {children}
      </div>
    </Suspense>
  );
};

// Optimized component for critical above-the-fold content
export const CriticalSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <div data-critical-section>
      {children}
    </div>
  );
};