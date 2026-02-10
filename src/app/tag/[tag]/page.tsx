import { notFound } from "next/navigation";
import { productService } from "@/lib/supabase";
import { keywordsToTags } from "@/lib/utils";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";

interface TagPageProps {
  params: {
    tag: string;
  };
}

// Deskripsi unik untuk setiap tag
const tagDescriptions: Record<string, { title: string; description: string; content: string }> = {
  "kaca-film": {
    title: "Kaca Film Premium | Perlindungan UV & Anti Panas",
    description: "Koleksi kaca film berkualitas tinggi untuk kaca mobil, rumah, dan kantor. Tersedia berbagai jenis kaca film dengan perlindungan UV maksimal.",
    content: "Kaca film kami menggunakan teknologi terkini untuk memberikan perlindungan maksimal terhadap sinar UV berbahaya sekaligus mengurangi panas masuk ke dalam ruangan. Tersedia berbagai pilihan tingkat kegelapan dan jenis kaca film sesuai kebutuhan Anda, mulai dari kaca film mobil, kaca film rumah, hingga kaca film kantor. Semua produk kaca film kami dilengkapi garansi resmi dan dipasang oleh teknisi berpengalaman."
  },
  "sandblast": {
    title: "Stiker Sandblast Motif Es Buram | Privasi & Dekorasi Kaca",
    description: "Stiker sandblast motif es buram untuk privasi dan dekorasi kaca. Tersedia berbagai motif sandblast modern dan elegan.",
    content: "Stiker sandblast kami adalah solusi ideal untuk memberikan efek es buram pada kaca dengan berbagai motif menarik. Cocok untuk kantor, rumah, atau ruang komersial yang membutuhkan privasi tanpa mengorbankan estetika. Tersedia motif sandblast minimalis, geometris, floral, dan custom design sesuai kebutuhan Anda. Material sandblast berkualitas tinggi yang tahan lama dan mudah dibersihkan."
  },
  "stiker-dekoratif": {
    title: "Stiker Dekoratif Kaca | Motif Modern & Elegan",
    description: "Koleksi stiker dekoratif kaca dengan berbagai motif modern dan elegan untuk mempercantik interior Anda.",
    content: "Transformasi tampilan kaca Anda dengan stiker dekoratif berkualitas tinggi. Tersedia berbagai pilihan motif dari minimalis hingga artistik yang dapat disesuaikan dengan tema interior ruangan. Stiker dekoratif kami mudah dipasang, tahan lama, dan dapat di-custom sesuai keinginan. Cocok untuk kaca pintu, jendela, partisi kantor, atau elemen dekoratif lainnya."
  },
  "cutting-sticker": {
    title: "Jasa Cutting Stiker Oracal | Desain Custom & Presisi Tinggi",
    description: "Layanan cutting sticker oracal dengan desain custom dan hasil presisi tinggi. Cocok untuk branding, dekorasi, dan promosi.",
    content: "Layanan cutting sticker kami menggunakan material oracal premium dengan mesin cutting presisi tinggi. Kami menerima pembuatan cutting sticker untuk berbagai kebutuhan: branding kendaraan, dekorasi kaca, signage promosi, stiker dinding, dan custom design sesuai keinginan Anda. Hasil cutting rapi, detail, dan tahan lama dengan pilihan warna lengkap."
  },
  "one-way-vision": {
    title: "Stiker One Way Vision | Privasi dari Dalam, Promosi dari Luar",
    description: "Stiker one way vision untuk privasi kaca sekaligus media promosi. Terlihat solid dari luar, transparan dari dalam.",
    content: "Stiker one way vision adalah solusi cerdas untuk kaca gedung, kantor, atau kendaraan yang membutuhkan privasi sekaligus media promosi. Dari luar terlihat sebagai gambar atau branding solid, namun dari dalam tetap dapat melihat keluar dengan jelas. Material berkualitas tinggi dengan perforasi presisi yang tidak mengganggu visibilitas dan tahan terhadap cuaca."
  },
  "reflektor": {
    title: "Stiker Reflektor | Safety & Signage yang Terlihat Jelas",
    description: "Stiker reflektor untuk safety signage dan marking yang terlihat jelas dalam kondisi gelap.",
    content: "Stiker reflektor kami adalah solusi safety signage yang efektif dengan daya pantul cahaya tinggi. Cocok untuk marking lantai, rambu keselamatan, marking kendaraan, dan berbagai kebutuhan safety lainnya. Material reflektor berkualitas tinggi yang tahan lama dan memenuhi standar safety. Tersedia berbagai warna dan ukuran sesuai kebutuhan."
  }
};

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tagInfo = tagDescriptions[params.tag];
  
  return {
    title: tagInfo?.title || `Produk dengan tag ${params.tag} - Jaya Sticker Custom`,
    description: tagInfo?.description || `Lihat semua produk yang berkaitan dengan ${params.tag}`,
    keywords: [params.tag, "jaya sticker", "kaca film jogja", "sandblast jogja"],
    openGraph: {
      title: tagInfo?.title || `Produk dengan tag ${params.tag}`,
      description: tagInfo?.description || `Lihat semua produk yang berkaitan dengan ${params.tag}`,
      type: "website",
      locale: "id_ID",
      siteName: "Jaya Sticker Custom",
    },
    alternates: {
      canonical: `/tag/${params.tag}`,
    },
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

  const tagInfo = tagDescriptions[params.tag];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section dengan konten unik */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {tagInfo?.title || `Produk dengan tag #${params.tag}`}
          </h1>
          
          <p className="text-lg text-muted-foreground mb-6">
            {tagInfo?.description || `Lihat semua produk yang berkaitan dengan ${params.tag}`}
          </p>
          
          {tagInfo?.content && (
            <div className="prose prose-lg max-w-none mb-8 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg">
              <p className="text-muted-foreground leading-relaxed">
                {tagInfo.content}
              </p>
            </div>
          )}
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="font-medium">{filteredProducts.length}</span> produk tersedia
            </span>
            <span>•</span>
            <span>Melayani pengiriman seluruh Indonesia</span>
            <span>•</span>
            <span>Garansi resmi</span>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA Section */}
        {filteredProducts.length > 0 && (
          <div className="mt-16 text-center p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Butuh Bantuan Memilih?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Konsultasikan kebutuhan Anda dengan tim ahli kami. Kami siap membantu Anda menemukan solusi kaca film dan stiker terbaik sesuai kebutuhan dan budget.
            </p>
            <div className="flex justify-center gap-4">
              <a 
                href="https://wa.me/6285156275565" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Chat WhatsApp
              </a>
              <a 
                href="tel:+6285156275565"
                className="inline-flex items-center gap-2 border border-input px-6 py-3 rounded-lg hover:bg-accent transition-colors font-medium"
              >
                Hubungi Kami
              </a>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}