import ProductCard from "./ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { productData } from "@/lib/product-data";
import { normalizeSlug } from "@/lib/utils";

const ProductCatalog = () => {
  // Group products by category
  const productsByCategory = Object.entries(productData).reduce((acc, [slug, product]) => {
    const category = product.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(slug);
    return acc;
  }, {} as Record<string, string[]>);

  // Define category display names and order
  const categoryConfig = Object.keys(productsByCategory);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Katalog Produk Lengkap
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pilihan produk berkualitas tinggi untuk semua kebutuhan interior dan dekorasi Anda
          </p>
        </div>

        <Tabs defaultValue={normalizeSlug(categoryConfig[0])} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            {categoryConfig.map((category) => (
              <TabsTrigger 
                key={category} 
                value={normalizeSlug(category)} 
                className="text-sm lg:text-base"
              >
                {category === "SAND BLAST" ? "🔳 Sand Blast Series" : 
                 category === "KACA FILM" ? "🌐 Kaca Film Series" : 
                 "🧩 Stiker & Vinyl Series"}
              </TabsTrigger>
            ))}
          </TabsList>

          {categoryConfig.map((category) => {
            const gridClass = 
              category === "SAND BLAST" ? "grid md:grid-cols-2 lg:grid-cols-4 gap-6" :
              category === "KACA FILM" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" :
              "grid md:grid-cols-2 lg:grid-cols-3 gap-6";

            return (
              <TabsContent key={category} value={normalizeSlug(category)}>
                <div className={gridClass}>
                  {productsByCategory[category]?.map((slug) => (
                    <ProductCard key={slug} slug={slug} />
                  ))}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
};

export default ProductCatalog;