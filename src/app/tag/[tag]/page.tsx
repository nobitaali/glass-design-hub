import { notFound } from "next/navigation";
import { productService } from "@/lib/supabase";
import { keywordsToTags } from "@/lib/utils";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface TagPageProps {
  params: {
    tag: string;
  };
}

export async function generateMetadata({ params }: TagPageProps) {
  return {
    title: `Produk dengan tag ${params.tag} - Interior Solutions Indonesia`,
    description: `Lihat semua produk yang berkaitan dengan ${params.tag}`,
  };
}

// Generate static params untuk pre-rendering
export async function generateStaticParams() {
  const products = await productService.getAllProducts();
  const allTags = new Set<string>();
  
  products.forEach(product => {
    const urlTags = keywordsToTags(product.seo_keywords || []);
    urlTags.forEach(tag => allTags.add(tag));
  });

  return Array.from(allTags).map(tag => ({
    tag: tag
  }));
}

export default async function TagPage({ params }: TagPageProps) {
  // Ambil semua produk
  const products = await productService.getAllProducts();
  
  // Filter produk berdasarkan tag
  const filteredProducts = products.filter(product => {
    const urlTags = keywordsToTags(product.seo_keywords || []);
    return urlTags.includes(params.tag);
  });

  if (filteredProducts.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          Produk dengan tag #{params.tag}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}