import { ArrowLeft, MessageCircle, Check, Star, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { normalizeSlug } from "@/lib/utils";
import { ProductDetailActions } from "@/components/ProductDetailActions";

interface ProductDetailProps {
  params: {
    productId: string;
  };
}

const productData: { [key: string]: any } = {
  "sandblast-polos": {
    title: "Sandblast Polos",
    description: "Tampilan elegan & minimalis untuk privasi maksimal",
    longDescription: "Sandblast polos memberikan solusi privasi yang elegan tanpa mengurangi pencahayaan alami. Cocok untuk berbagai aplikasi interior dan eksterior dengan hasil finishing yang halus dan profesional.",
    features: [
      "Tampilan elegan & minimalis",
      "Memberi privasi tanpa menghalangi cahaya",
      "Cocok untuk partisi, pintu, dan jendela kaca",
      "Tahan lama dan mudah perawatan",
      "Hasil finishing halus dan merata"
    ],
    category: "SAND BLAST",
    imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
    price: "Mulai Rp 85.000/m²",
    specifications: {
      "Ketebalan": "0.5-1mm",
      "Transparansi": "30-50%",
      "Aplikasi": "Interior & Eksterior",
      "Garansi": "2 Tahun"
    }
  },
  "sandblast-motif": {
    title: "Sandblast Motif",
    description: "Motif artistik pilihan untuk nilai estetika tinggi",
    longDescription: "Sandblast motif menggabungkan fungsi privasi dengan keindahan artistik. Berbagai pilihan motif tersedia untuk memberikan sentuhan dekoratif yang elegan pada kaca Anda, cocok untuk kantor, showroom, dan rumah modern.",
    features: [
      "Motif artistik pilihan",
      "Menambah nilai estetika ruang",
      "Ideal untuk kantor, showroom, dan rumah",
      "Berbagai pilihan desain tersedia",
      "Kombinasi fungsi dan keindahan"
    ],
    category: "SAND BLAST",
    imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
    price: "Mulai Rp 125.000/m²",
    specifications: {
      "Ketebalan": "0.5-1mm",
      "Transparansi": "40-60%",
      "Aplikasi": "Interior & Eksterior",
      "Garansi": "2 Tahun"
    }
  },
  "sandblast-cutting": {
    title: "Sandblast Cutting",
    description: "Motif custom sesuai desain dengan presisi tinggi",
    longDescription: "Sandblast cutting menggunakan teknologi pemotongan presisi untuk menciptakan motif custom sesuai desain Anda. Ideal untuk logo perusahaan, tulisan, dan dekorasi khusus dengan hasil yang tajam dan profesional.",
    features: [
      "Motif custom sesuai desain",
      "Cocok untuk logo, tulisan, dan dekorasi",
      "Hasil presisi dengan detail tajam",
      "Teknologi cutting modern",
      "Personalisasi sesuai kebutuhan"
    ],
    category: "SAND BLAST",
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800&h=600&fit=crop",
    price: "Mulai Rp 175.000/m²",
    specifications: {
      "Ketebalan": "0.5-1mm",
      "Transparansi": "Custom",
      "Aplikasi": "Interior & Eksterior",
      "Garansi": "2 Tahun"
    }
  },
  "sandblast-print": {
    title: "Sandblast Print",
    description: "Teknologi printing untuk efek visual menarik",
    longDescription: "Sandblast print menggabungkan teknik sandblast tradisional dengan teknologi printing modern untuk menciptakan efek visual yang unik dan menarik. Sempurna untuk branding, signage, dan interior yang membutuhkan tampilan eksklusif.",
    features: [
      "Sandblast + teknologi printing",
      "Efek visual menarik dan eksklusif",
      "Pas untuk branding, signage, dan interior unik",
      "Kombinasi teknik tradisional dan modern",
      "Hasil berkualitas tinggi"
    ],
    category: "SAND BLAST",
    imageUrl: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=800&h=600&fit=crop",
    price: "Mulai Rp 225.000/m²",
    specifications: {
      "Ketebalan": "0.5-1mm",
      "Transparansi": "Custom",
      "Aplikasi": "Interior & Eksterior",
      "Garansi": "2 Tahun"
    }
  },
  "kaca-film-black": {
    title: "Kaca Film Black",
    description: "Privasi maksimal dengan reduksi panas optimal",
    longDescription: "Kaca film hitam premium dengan teknologi canggih untuk memberikan privasi maksimal sekaligus mengurangi panas dan sinar UV berbahaya. Ideal untuk kendaraan, gedung perkantoran, dan rumah tinggal.",
    features: [
      "Privasi maksimal dari luar",
      "Reduksi panas dan sinar UV hingga 99%",
      "Cocok untuk kendaraan, kantor, rumah",
      "Anti gores dan tahan lama",
      "Pemasangan mudah tanpa gelembung"
    ],
    category: "KACA FILM",
    imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop&sat=-100",
    price: "Mulai Rp 65.000/m²",
    specifications: {
      "VLT": "5-20%",
      "UV Rejection": "99%",
      "Heat Rejection": "60-80%",
      "Garansi": "5 Tahun"
    }
  },
  "kaca-film-silver": {
    title: "Kaca Film Silver",
    description: "Efek reflektif elegan dengan teknologi canggih",
    longDescription: "Kaca film silver memberikan efek reflektif yang elegan sambil menolak panas hingga 80%. Teknologi canggih yang digunakan memberikan kesan modern dan bersih, cocok untuk bangunan komersial dan residensial.",
    features: [
      "Efek reflektif elegan",
      "Menolak panas hingga 80%",
      "Memberikan kesan modern dan bersih",
      "Teknologi canggih",
      "Cocok untuk berbagai aplikasi"
    ],
    category: "KACA FILM",
    imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop&sat=-50",
    price: "Mulai Rp 75.000/m²",
    specifications: {
      "VLT": "15-35%",
      "UV Rejection": "99%",
      "Heat Rejection": "70-80%",
      "Garansi": "5 Tahun"
    }
  },
  "kaca-film-brown": {
    title: "Kaca Film Brown",
    description: "Nuansa hangat & nyaman untuk ruangan",
    longDescription: "Kaca film brown memberikan nuansa hangat dan nyaman untuk ruangan Anda. Cocok untuk rumah dan tempat usaha yang ingin menciptakan atmosfer yang lebih personal sambil mengurangi silau dan menjaga suhu ruangan.",
    features: [
      "Nuansa hangat & nyaman",
      "Cocok untuk rumah & tempat usaha",
      "Mengurangi silau & menjaga suhu ruangan",
      "Atmosfer personal",
      "Kualitas premium"
    ],
    category: "KACA FILM",
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800&h=600&fit=crop&sepia=100",
    price: "Mulai Rp 70.000/m²",
    specifications: {
      "VLT": "20-40%",
      "UV Rejection": "99%",
      "Heat Rejection": "60-70%",
      "Garansi": "5 Tahun"
    }
  },
  "stiker-oneway": {
    title: "Stiker Oneway",
    description: "One Way Vision untuk branding dan privasi",
    longDescription: "Stiker oneway menggunakan teknologi One Way Vision yang memungkinkan tampilan dari luar tertutup namun dari dalam tetap terlihat. Ideal untuk branding kendaraan dan kaca toko dengan daya tahan cuaca yang excellent.",
    features: [
      "Tampilan dari luar tertutup, dari dalam tetap terlihat",
      "Ideal untuk branding kendaraan & kaca toko",
      "Tahan cuaca & mudah dipasang",
      "Teknologi One Way Vision",
      "Kualitas premium"
    ],
    category: "STIKER & VINYL",
    imageUrl: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=800&h=600&fit=crop&hue=240",
    price: "Mulai Rp 45.000/m²",
    specifications: {
      "Material": "Vinyl Premium",
      "Ketahanan": "5-7 Tahun",
      "Aplikasi": "Outdoor & Indoor",
      "Garansi": "2 Tahun"
    }
  },
  "stiker-tembok": {
    title: "Stiker Tembok",
    description: "Wall sticker untuk dekorasi dinding",
    longDescription: "Stiker tembok atau wall sticker memberikan solusi dekorasi dinding yang mudah dan fleksibel. Mudah dipasang dan dilepas tanpa merusak cat dinding, cocok untuk dekorasi rumah, café, dan kantor.",
    features: [
      "Mudah dipasang & dilepas",
      "Tidak merusak cat dinding",
      "Cocok untuk dekorasi rumah, café, kantor",
      "Berbagai pilihan desain",
      "Ramah lingkungan"
    ],
    category: "STIKER & VINYL",
    imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop&hue=320",
    price: "Mulai Rp 25.000/m²",
    specifications: {
      "Material": "Vinyl Removable",
      "Ketahanan": "3-5 Tahun",
      "Aplikasi": "Indoor",
      "Garansi": "1 Tahun"
    }
  },
  "stiker-kaca": {
    title: "Stiker Kaca",
    description: "Dekorasi kaca jendela dan pintu",
    longDescription: "Stiker kaca memberikan sentuhan dekoratif pada kaca jendela dan pintu Anda. Dengan banyak pilihan warna dan motif, stiker ini tahan lama dan mudah dirawat untuk berbagai kebutuhan dekorasi.",
    features: [
      "Menambah dekorasi pada kaca jendela/pintu",
      "Banyak pilihan warna & motif",
      "Tahan lama dan mudah dirawat",
      "Pemasangan profesional",
      "Hasil rapi dan berkualitas"
    ],
    category: "STIKER & VINYL",
    imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop&hue=180",
    price: "Mulai Rp 35.000/m²",
    specifications: {
      "Material": "Vinyl Glass",
      "Ketahanan": "5-7 Tahun",
      "Aplikasi": "Indoor & Outdoor",
      "Garansi": "2 Tahun"
    }
  },
  "stiker-vinyl-print": {
    title: "Stiker Vinyl Print",
    description: "Cetakan full color berkualitas tinggi",
    longDescription: "Stiker vinyl print menggunakan teknologi cetak full color berkualitas tinggi untuk menghasilkan gambar yang tajam dan warna yang vibrant. Cocok untuk promosi, branding, dan display dengan ketahanan terhadap air dan sinar matahari.",
    features: [
      "Cetakan full color berkualitas tinggi",
      "Cocok untuk promosi, branding, & display",
      "Tahan air dan sinar matahari",
      "Warna vibrant dan tajam",
      "Teknologi printing modern"
    ],
    category: "STIKER & VINYL",
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800&h=600&fit=crop&hue=30",
    price: "Mulai Rp 55.000/m²",
    specifications: {
      "Material": "Vinyl Print Premium",
      "Ketahanan": "5-7 Tahun",
      "Aplikasi": "Outdoor & Indoor",
      "Garansi": "3 Tahun"
    }
  },
  "stiker-vinyl-cutting": {
    title: "Stiker Vinyl Cutting",
    description: "Potongan presisi sesuai desain",
    longDescription: "Stiker vinyl cutting menggunakan teknologi pemotongan presisi untuk menghasilkan bentuk sesuai design atau logo Anda. Tampilan bersih dan profesional membuatnya cocok untuk kendaraan, kaca toko, dan pintu.",
    features: [
      "Potongan sesuai design/logo",
      "Tampilan bersih dan profesional",
      "Cocok untuk kendaraan, kaca toko, pintu",
      "Teknologi cutting presisi",
      "Custom sesuai kebutuhan"
    ],
    category: "STIKER & VINYL",
    imageUrl: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=800&h=600&fit=crop&hue=160",
    price: "Mulai Rp 65.000/m²",
    specifications: {
      "Material": "Vinyl Cutting Premium",
      "Ketahanan": "5-7 Tahun",
      "Aplikasi": "Outdoor & Indoor",
      "Garansi": "3 Tahun"
    }
  },
  "stiker-reflektor": {
    title: "Stiker Reflektor",
    description: "Keselamatan dengan teknologi reflektif",
    longDescription: "Stiker reflektor menggunakan teknologi reflektif yang memantulkan cahaya di malam hari untuk keselamatan. Cocok untuk rambu-rambu, branding kendaraan, dan aplikasi keselamatan lainnya dengan berbagai pilihan warna cerah.",
    features: [
      "Memantulkan cahaya di malam hari",
      "Cocok untuk keselamatan, rambu, dan branding kendaraan",
      "Tersedia dalam berbagai warna cerah",
      "Teknologi reflektif canggih",
      "Standar keselamatan internasional"
    ],
    category: "STIKER & VINYL",
    imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop&hue=60",
    price: "Mulai Rp 85.000/m²",
    specifications: {
      "Material": "Vinyl Reflective",
      "Ketahanan": "7-10 Tahun",
      "Aplikasi": "Outdoor & Indoor",
      "Garansi": "3 Tahun"
    }
  }
};

export async function generateMetadata({ params }: ProductDetailProps): Promise<Metadata> {
  const product = productData[params.productId];
  
  if (!product) {
    return {
      title: "Produk Tidak Ditemukan - Interior Solutions Indonesia",
    };
  }

  return {
    title: `${product.title} - ${product.price} | Interior Solutions Indonesia`,
    description: `${product.description}. ${product.longDescription} Harga ${product.price}. Pemasangan profesional seluruh Indonesia.`,
    openGraph: {
      title: `${product.title} - Interior Solutions Indonesia`,
      description: product.longDescription,
      images: [product.imageUrl],
    },
  };
}

export default function ProductDetail({ params }: ProductDetailProps) {
  console.log(`ProductDetail: Received product ID: "${params.productId}"`);
  
  // Log all product titles and their normalized slugs for debugging
  const productSlugs = Object.entries(productData).map(([key, value]) => ({
    title: value.title,
    normalizedSlug: normalizeSlug(value.title)
  }));
  console.log('ProductDetail: Product Slugs:', JSON.stringify(productSlugs, null, 2));

  // Find the product by matching the normalized slug
  const product = Object.values(productData).find(
    (prod) => normalizeSlug(prod.title) === params.productId
  );

  if (!product) {
    console.error(`ProductDetail: No product found for ID "${params.productId}"`);
    console.error(`ProductDetail: Attempted to match against: ${productSlugs.map(p => p.normalizedSlug).join(', ')}`);
    notFound();
  }

  // Removed client-side event handlers

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali ke Katalog
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="relative">
            <img 
              src={product.imageUrl} 
              alt={product.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
              {product.category}
            </Badge>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{product.title}</h1>
              <p className="text-lg text-muted-foreground mb-4">{product.description}</p>
              <div className="text-2xl font-bold text-primary mb-4">{product.price}</div>
              <p className="text-sm text-muted-foreground">
                🚚 Melayani seluruh Indonesia | 📞 Konsultasi gratis | ⭐ Rating 4.8/5 dari 127+ customer
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Keunggulan Produk:</h3>
              {product.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <ProductDetailActions
              title={product.title}
              category={product.category}
              price={product.price}
              specifications={product.specifications}
            />

            {/* Service Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Garansi Resmi</p>
              </div>
              <div className="text-center">
                <Star className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Kualitas Terbaik</p>
              </div>
              <div className="text-center">
                <Truck className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Kirim Seluruh Indonesia</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Deskripsi Lengkap</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {product.longDescription}
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Spesifikasi Teknis:</h4>
                <div className="space-y-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-muted-foreground">{key}:</span>
                      <span className="font-medium">{value as string}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Area Pengiriman:</h4>
                <p className="text-muted-foreground">
                  Kami melayani pengiriman ke seluruh Indonesia dengan jaringan distributor terpercaya. 
                  Waktu pengiriman 1-7 hari kerja tergantung lokasi.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
}