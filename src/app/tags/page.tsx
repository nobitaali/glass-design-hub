import { productService } from "@/lib/supabase";
import { keywordsToTags } from "@/lib/utils";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Semua Tag Produk - Interior Solutions Indonesia",
  description: "Lihat semua tag produk yang tersedia untuk memudahkan pencarian produk yang Anda butuhkan."
};

// Fungsi untuk mendapatkan semua tag yang valid dari Supabase
async function getAllValidTags(): Promise<Set<string>> {
  const products = await productService.getAllProducts();
  const allTags = new Set<string>();
  
  products.forEach(product => {
    const urlTags = keywordsToTags(product.seo_keywords || []);
    urlTags.forEach(tag => allTags.add(tag));
  });
  
  return allTags;
}

export default async function TagsPage() {
  const validTags = Array.from(await getAllValidTags()).sort();
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          Semua Tag Produk
        </h1>
        
        <p className="text-muted-foreground mb-8">
          Klik pada tag untuk melihat semua produk yang terkait dengan tag tersebut.
        </p>
        
        <div className="flex flex-wrap gap-3">
          {validTags.map(tag => (
            <Badge key={tag} variant="secondary" className="hover:bg-primary/10">
              <Link href={`/tag/${tag}`} className="hover:text-primary">
                #{tag}
              </Link>
            </Badge>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}