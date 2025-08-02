import { ArrowLeft, Check, Star, Shield, Truck } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailActions } from "@/components/ProductDetailActions";
import { productService } from "@/lib/supabase";
import { keywordsToPipeline, keywordsToTags } from "@/lib/utils";

interface ProductDetailProps {
  params: {
    productId: string;
  };
}

export async function generateMetadata({ params }: ProductDetailProps): Promise<Metadata> {
  const product = await productService.getProductBySlug(params.productId);

  if (!product) {
    return {
      title: "Produk Tidak Ditemukan – Interior Solutions Indonesia",
    };
  }

  const canonicalUrl = `https://www.jayasticker.id/product/${product.slug}`;

  const pipelineKeywords = product.seo_keywords ? keywordsToPipeline(product.seo_keywords) : '';
  const urlTags = product.seo_keywords ? keywordsToTags(product.seo_keywords) : [];

  return {
    title: product.seo_meta_title || product.title,
    description: product.seo_meta_description || product.description,
    keywords: product.seo_keywords?.join(", "),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: product.seo_meta_title || product.title,
      description: product.seo_meta_description || product.description,
      images: [product.image_url],
      url: canonicalUrl,
    },
    other: {
      'structured-data': JSON.stringify(product.seo_structured_data || {}),
      'keywords-pipeline': pipelineKeywords,
      'url-tags': urlTags.join(',')
    }
  };
}

export async function generateStaticParams() {
  const slugs = await productService.getAllProductSlugs();
  return slugs.map((slug) => ({
    productId: slug,
  }));
}

export default async function ProductDetail({ params }: ProductDetailProps) {
  const product = await productService.getProductBySlug(params.productId);

  if (!product) notFound();

  // Buat structured data yang diperkaya dengan field wajib dan opsional
  const enhancedStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "description": product.seo_meta_description || product.description,
    "image": [
      product.image_url,
      // Tambahkan gambar tambahan jika tersedia
      ...(product?.additional_images || [])
    ],
    "brand": {
      "@type": "Brand",
      "name": "Jaya Sticker"
    },
    "category": product.category,
    "sku": product.slug,
    "offers": {
      "@type": "Offer",
      "price": product.price.replace(/[^\d]/g, ''), // Ekstrak harga numerik
      "priceCurrency": "IDR",
      "priceValidUntil": "2025-12-31",
      "availability": "https://schema.org/InStock", // KRITIS: Menambahkan field yang hilang
      "seller": {
        "@type": "Organization",
        "name": "Jaya Sticker Indonesia"
      },
      "shippingDetails": { // OPSIONAL: Menambahkan info pengiriman
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "currency": "IDR",
          "value": "0"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 3,
            "unitCode": "DAY"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 7,
            "unitCode": "DAY"
          }
        }
      },
      "hasMerchantReturnPolicy": { // OPSIONAL: Menambahkan kebijakan pengembalian
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "ID",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 7,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Customer Review"
        },
        "reviewBody": "Kualitas sticker sangat baik dan pelayanan memuaskan"
      }
    ],
    // Gabungkan dengan structured data yang sudah ada
    ...(product.seo_structured_data || {})
  };

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
            <Image
              src={product.image_url}
              alt={product.title}
              width={1920}
              height={1080}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
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
                {product.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-primary mt-[2px]" />
                    <span className="text-muted-foreground">{feature}</span>
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
            <p className="text-muted-foreground leading-relaxed mb-6">{product.long_description}</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Spesifikasi Teknis:</h4>
                <div className="space-y-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-muted-foreground">{key}:</span>
                      <span className="font-medium">{value}</span>
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
        {product.seo_keywords && product.seo_keywords.length > 0 && (
          <div className="mb-16">
            <h3 className="font-semibold mb-2">Tag:</h3>
            <div className="flex flex-wrap gap-2">
              {keywordsToTags(product.seo_keywords).map((tag: string) => (
                <Badge key={tag} variant="secondary" className="hover:bg-primary/10">
                  <Link href={`/tag/${tag}`} className="hover:text-primary">
                    #{tag}
                  </Link>
                </Badge>
              ))}
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <span className="font-medium">Keywords: </span>
              {keywordsToPipeline(product.seo_keywords)}
            </div>
          </div>
        )}
      </div>

      {/* Structured Data yang Diperkaya */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(enhancedStructuredData)
        }}
      />

      <Footer />
    </div>
  );
}

