import { ArrowLeft, Check, Star, Shield, Truck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { normalizeSlug } from "@/lib/utils";
import { ProductDetailActions } from "@/components/ProductDetailActions";
import { 
  productData, 
  getProductSEOMetadata, 
  getProductBySlug 
} from "@/lib/product-data";

interface ProductDetailProps {
  params: {
    productId: string;
  };
}

export async function generateMetadata({ params }: ProductDetailProps): Promise<Metadata> {
  const productSlug = normalizeSlug(params.productId);
  const seoMetadata = getProductSEOMetadata(productSlug);

  if (!seoMetadata)
    return {
      title: "Produk Tidak Ditemukan – Interior Solutions Indonesia",
    };

  return {
    title: seoMetadata.title,
    description: seoMetadata.description,
    keywords: seoMetadata.keywords,
    openGraph: {
      title: seoMetadata.title,
      description: seoMetadata.description,
      images: [productData[productSlug].imageUrl],
    },
  };
}

export default function ProductDetail({ params }: ProductDetailProps) {
  const productSlug = normalizeSlug(params.productId);
  const product = getProductBySlug(productSlug);

  if (!product) notFound();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" /> Kembali ke Katalog
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="relative">
            <img src={product.imageUrl} alt={product.title} className="w-full h-96 object-cover rounded-lg shadow-lg" />
            <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">{product.category}</Badge>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{product.title}</h1>
              <p className="text-lg text-muted-foreground mb-4">{product.description}</p>
              <div className="text-2xl font-bold text-primary mb-4">{product.price}</div>
              <p className="text-sm text-muted-foreground">🚚 Melayani seluruh Indonesia | 📞 Konsultasi gratis | ⭐ Rating 4.8/5 dari 127+ customer</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Keunggulan Produk:</h3>
              <ul className="space-y-2">
                {product.features.map((f: string) => (
                  <li key={f} className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-primary mt-[2px]" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Buttons */}
            <ProductDetailActions
              title={product.title}
              category={product.category}
              price={product.price}
              specifications={product.specifications}
            />

            {/* Service Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              {[{ Icon: Shield, label: "Garansi Resmi" }, { Icon: Star, label: "Kualitas Terbaik" }, { Icon: Truck, label: "Kirim Seluruh Indonesia" }].map((item) => (
                <div key={item.label} className="text-center">
                  <item.Icon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Deskripsi Lengkap</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed mb-6">{product.longDescription}</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Spesifikasi Teknis:</h4>
                <div className="space-y-2">
                  {Object.entries(product.specifications).map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span className="text-muted-foreground">{k}:</span>
                      <span className="font-medium">{v as string}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Area Pengiriman:</h4>
                <p className="text-muted-foreground">
                  Kami melayani pengiriman ke seluruh Indonesia dengan jaringan distributor terpercaya. Waktu pengiriman 1–7 hari kerja tergantung lokasi.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* TAG LIST */}
        {product.seo?.keywords && (
          <div className="mb-16">
            <h3 className="font-semibold mb-2">Tag:</h3>
            <div className="flex flex-wrap gap-2">
              {product.seo.keywords.map((tag: string) => (
                <Badge key={tag} variant="secondary">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
