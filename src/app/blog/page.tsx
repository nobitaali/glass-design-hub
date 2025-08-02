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
          <div className=" h-[500px] bg-red-600 z-[9999]">
      <iframe
        src="https://api.crampas.ai/crampas-sdk/dist/iframe.html?key=f1769bc52fd941ace1fee8292b6c3fe8:4362678bd8a86505e6bc25282f7b7d4f7ee279d5d5e039c26207f3fdbc0be4ce9ea00138a48e97252b4213109bfd89bbc1315ab53718f6af0ffd0ba4556bc52b041943f3e2be1e64aacca4b6b9d9f788103d004a87b98af874a319de508e31bf2ec3fd7e9178256e4be21a14b0bebd0c2cac1983fcdbc87cab7f9046ea59d68ea708374c1d73b29ca86a794926dbcf8ebe4bf8dfe568de6122eec599de85892ec1ef9ed1afdcd69d6efebcd355e0a62fa18e26aab72783c11cf59062a0169c899e589e3c6e29708a11abc21a7805422a7bf809f1583e6a28aa5b0a2e86eb70be34c161dfc63ecea4a21be1d119e0cbb94eb29e694e35da845fad103cd24dee1fcd72d08f328a76e0587a5be18f48b579edf7ae32c3724fa227eb8215c11137d67e892896a284ba402699b01899e9a3f5efb4c6b9db2209613cac91974f7e2d34a88ad185b9fffa0d7a99f9ce7e98586f40f5fb821d7a136825eece63644a8058&fullscreen=true&logo=https://img.freepik.com/free-vector/set-chains-glyph_78370-1551.jpg?t=st=1726628180~exp=1726631780~hmac=8546acf923f28ace9a22c2702c6645b5f549036ed314f934dc1f8a855992eadd&w=1800&name=crampas%20ku
        "
        className="w-full h-full"

      ></iframe>
    </div>
      </main>
     

      <Footer />
    </div>
  );
}