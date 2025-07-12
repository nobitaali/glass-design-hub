'use client';

import { useState, useEffect, useMemo } from 'react';
import { productService, Product } from "@/lib/supabase";
import { normalizeSlug } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

const PAGE_SIZE = 12;

export default function ProductCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

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
        setIsLoading(false); // Fixed: should be false when done loading
      }
    }

    fetchProductData();
  }, []);

  const productsByCategory = useMemo(() => {
    return products.reduce((acc, product) => {
      const category = product.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {} as Record<string, Product[]>);
  }, [products]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return products.slice(startIndex, startIndex + PAGE_SIZE);
  }, [products, currentPage]);

  if (isLoading) {
    return (
      <section className="py-16 bg-background" id="produk">
        <div className="container mx-auto px-4">
          {/* Header Skeleton */}
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-80 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          
          {/* Tabs Skeleton */}
          <div className="mb-8">
            <div className="grid grid-cols-4 gap-2 p-1 bg-muted rounded-md">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-10 rounded-sm" />
              ))}
            </div>
          </div>
          
          {/* Products Grid Skeleton */}
          <ProductListSkeleton />
        </div>
      </section>
    );
  }

  return (
    <section 
      className="py-16 bg-background" 
      id="produk"
      aria-labelledby="product-catalog-title"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 
            id="product-catalog-title" 
            className="text-3xl lg:text-4xl font-bold text-foreground mb-4"
          >
            Katalog Produk Lengkap
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pilihan produk berkualitas tinggi untuk semua kebutuhan interior dan dekorasi Anda
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full " aria-label="Product Categories">
        <TabsList
  className="flex flex-wrap h-full justify-center items-center gap-2 p-4 mb-4 mx-auto max-w-full sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%]"
>

    <TabsTrigger
      key="ALL"
      value="all"
      className="text-sm px-4 py-2 lg:text-base"
    >
      Semua Produk
    </TabsTrigger>
    {categories.map((category) => (
      <TabsTrigger
        key={category}
        value={normalizeSlug(category)}
        className="text-sm px-4 py-2 lg:text-base"
      >
        {category}
      </TabsTrigger>
    ))}
  </TabsList>

  <TabsContent key="ALL" value="all" className="critical-render">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {paginatedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
    {products.length > PAGE_SIZE && (
      <div className="flex justify-center mt-8">
        <button 
          onClick={() => setCurrentPage(prev => prev + 1)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          disabled={currentPage * PAGE_SIZE >= products.length}
        >
          {currentPage * PAGE_SIZE >= products.length ? 'No More Products' : 'Load More'}
        </button>
      </div>
    )}
  </TabsContent>

  {categories.map((category) => {
    const categoryProducts = productsByCategory[category] || [];
    return (
      <TabsContent
        key={category}
        value={normalizeSlug(category)}
        className="critical-render"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryProducts.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {categoryProducts.length > 6 && (
          <div className="text-center mt-8">
            <p className="text-muted-foreground">
              Menampilkan 6 dari {categoryProducts.length} produk dalam kategori {category}
            </p>
          </div>
        )}
      </TabsContent>
    );
  })}
</Tabs>


      </div>
    </section>
  );
}

// Enhanced Loading Spinner with better animation
function LoadingSpinner() {
  return (
    <div className="flex space-x-1" role="status" aria-label="Loading">
      <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
    </div>
  );
}

// Enhanced Product List Skeleton with responsive grid
function ProductListSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(12)].map((_, i) => (
        <SkeletonCard key={i} index={i} />
      ))}
    </div>
  );
}

// Enhanced Skeleton Card with better visual hierarchy
function SkeletonCard({ index }: { index: number }) {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image skeleton with aspect ratio */}
      <div className="relative aspect-[4/3] bg-muted">
        <Skeleton className="w-full h-full" />
        {/* Optional: Add a subtle shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse" />
      </div>
      
      {/* Content skeleton */}
      <div className="p-4 space-y-4">
        {/* Category badge skeleton */}
        <Skeleton className="h-4 w-16 rounded-full" />
        
        {/* Title skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        
        {/* Description skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
          <Skeleton className="h-3 w-2/3" />
        </div>
        
        {/* Price and button skeleton */}
        <div className="flex items-center justify-between pt-4">
          <div className="space-y-1">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-9 w-24 rounded-md" />
        </div>
      </div>
    </div>
  );
}

// Additional skeleton components for different states
export function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Image gallery skeleton */}
        <div className="space-y-4">
          <Skeleton className="w-full aspect-square rounded-lg" />
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-md" />
            ))}
          </div>
        </div>
        
        {/* Product info skeleton */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
          </div>
          
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Empty state component
export function EmptyProductState() {
  return (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            Tidak ada produk ditemukan
          </h3>
          <p className="text-muted-foreground">
            Belum ada produk dalam kategori ini. Silakan coba kategori lain atau kembali lagi nanti.
          </p>
        </div>
      </div>
    </div>
  );
}