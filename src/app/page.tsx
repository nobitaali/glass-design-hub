import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Header from "@/components/Header";
import HeroOptimized from "@/components/HeroOptimized";

// Critical components loaded immediately
// Non-critical components loaded dynamically
const ProductCatalog = dynamic(() => import("@/components/ProductCatalog"), {
  loading: () => (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="animate-pulse text-gray-500">Loading products...</div>
    </div>
  ),
  ssr: false
});

const CustomDesign = dynamic(() => import("@/components/CustomDesign"), {
  loading: () => (
    <div className="min-h-[300px] flex items-center justify-center">
      <div className="animate-pulse text-gray-500">Loading custom design...</div>
    </div>
  ),
  ssr: false
});

const GoogleMaps = dynamic(() => import("@/components/GoogleMaps"), {
  loading: () => (
    <div className="min-h-[400px] flex items-center justify-center bg-gray-100 rounded-lg">
      <div className="animate-pulse text-gray-500">Loading map...</div>
    </div>
  ),
  ssr: false
});

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => (
    <div className="min-h-[200px] bg-gray-900 flex items-center justify-center">
      <div className="animate-pulse text-gray-400">Loading footer...</div>
    </div>
  ),
  ssr: false
});

const WhatsAppFloat = dynamic(() => import("@/components/WhatsAppFloat"), {
  ssr: false
});

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Critical above-the-fold content */}
      <Header />
      <HeroOptimized />
      
      {/* Non-critical content with optimized loading */}
      <Suspense fallback={
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="animate-pulse text-gray-500">Loading content...</div>
        </div>
      }>
        <ProductCatalog />
      </Suspense>
      
      <Suspense fallback={
        <div className="min-h-[300px] flex items-center justify-center">
          <div className="animate-pulse text-gray-500">Loading design section...</div>
        </div>
      }>
        <CustomDesign />
      </Suspense>
      
      <Suspense fallback={
        <div className="min-h-[400px] flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="animate-pulse text-gray-500">Loading map...</div>
        </div>
      }>
        <GoogleMaps />
      </Suspense>
      
      <Suspense fallback={
        <div className="min-h-[200px] bg-gray-900 flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Loading footer...</div>
        </div>
      }>
        <Footer />
      </Suspense>
      
      {/* WhatsApp float - no loading state needed */}
      <WhatsAppFloat />
    </div>
  );
}