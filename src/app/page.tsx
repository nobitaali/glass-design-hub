import Header from "@/components/Header";
import HeroOptimized from "@/components/HeroOptimized";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ProductCatalog from "@/components/ProductCatalog";
import CustomDesign from "@/components/CustomDesign";
import GoogleMaps from "@/components/GoogleMaps";
import { productService } from "@/lib/supabase-optimized";
 
// ISR: Revalidate every 5 minutes for optimal performance
export const revalidate = 300;

// Static metadata for home page
export const metadata = {
  title: "Kaca Film & Sandblast Jogja | Jaya Sticker Custom",
  description: "Spesialis kaca film, sandblast & stiker dekoratif Yogyakarta. Pemasangan profesional seluruh Indonesia. Garansi resmi, harga terjangkau!",
};
 
export default async function Home() {
  // Fetch products for hero slider with error handling
  let products = [];
  try {
    const fetchedProducts = await productService.getAllProducts();
    products = fetchedProducts.slice(0, 5); // Limit to 5 for performance
  } catch (error) {
    console.error('Failed to fetch products for hero:', error);
    // Continue with empty products array - UI will handle gracefully
  }
 
  return (
    <div className="min-h-screen bg-background">
      {/* Critical above-the-fold content */}
      <Header />
      <HeroOptimized />
      
      {/* Product Catalog */}
      <ProductCatalog />
      
      {/* Custom Design Section */}
      <CustomDesign />
      
      {/* Google Maps */}
      <GoogleMaps />
      
      {/* Footer */}
      <Footer />
      
      {/* WhatsApp float - loads immediately but doesn't block */}
      <WhatsAppFloat />
    </div>
  );
}