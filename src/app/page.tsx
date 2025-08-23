import Header from "@/components/Header";
import HeroOptimized from "@/components/HeroOptimized";
import MobileHero from "@/components/MobileHero";
import { 
  LazyProductCatalog, 
  LazyCustomDesign, 
  LazyGoogleMaps, 
  LazyFooter, 
  LazyWhatsAppFloat,
  CriticalSection,
  LazySection
} from "@/components/LazyComponents";
import { productService } from "@/lib/supabase-optimized";

export default async function Home() {
  // Fetch products for hero slider
  let products = [];
  try {
    const fetchedProducts = await productService.getAllProducts();
    products = fetchedProducts.slice(0, 5); // Limit to 5 for performance
  } catch (error) {
    console.error('Failed to fetch products for hero:', error);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Critical above-the-fold content */}
      <CriticalSection>
        <Header />
        <HeroOptimized />
      </CriticalSection>
      
      {/* Non-critical content with optimized lazy loading */}
      <LazySection 
        fallback={
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="animate-pulse text-gray-500">Loading products...</div>
          </div>
        }
      >
        <LazyProductCatalog />
      </LazySection>
      
      <LazySection 
        fallback={
          <div className="min-h-[300px] flex items-center justify-center">
            <div className="animate-pulse text-gray-500">Loading design section...</div>
          </div>
        }
      >
        <LazyCustomDesign />
      </LazySection>
      
      <LazySection 
        fallback={
          <div className="min-h-[400px] flex items-center justify-center bg-gray-100 rounded-lg">
            <div className="animate-pulse text-gray-500">Loading map...</div>
          </div>
        }
      >
        <LazyGoogleMaps />
      </LazySection>
      
      <LazySection 
        fallback={
          <div className="min-h-[200px] bg-gray-900 flex items-center justify-center">
            <div className="animate-pulse text-gray-400">Loading footer...</div>
          </div>
        }
      >
        <LazyFooter />
      </LazySection>
      
      {/* WhatsApp float - loads immediately but doesn't block */}
      <LazyWhatsAppFloat />
    </div>
  );
}