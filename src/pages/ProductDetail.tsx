import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MessageCircle, Check, Star, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const ProductDetail = () => {
  const { productId } = useParams();
  
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
    }
    // Add more products as needed
  };

  const product = productData[productId || ""] || productData["sandblast-polos"];

  // SEO Meta Tags untuk setiap produk
  useEffect(() => {
    document.title = `${product.title} - ${product.price} | Interior Solutions Indonesia`;
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', `${product.description}. ${product.longDescription} Harga ${product.price}. Pemasangan profesional seluruh Indonesia.`);
    }

    // Schema markup untuk produk
    const schema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.title,
      "description": product.longDescription,
      "image": product.imageUrl,
      "category": product.category,
      "brand": {
        "@type": "Brand",
        "name": "Interior Solutions Indonesia"
      },
      "offers": {
        "@type": "Offer",
        "price": product.price.replace(/[^\d]/g, ''),
        "priceCurrency": "IDR",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "Interior Solutions Indonesia"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "45"
      }
    };

    const existingScript = document.getElementById('product-schema');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = 'product-schema';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('product-schema');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [product]);

  // Canonical URL
  useEffect(() => {
    const canonical = document.querySelector('link[rel="canonical"]') ||
                     document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', `https://14ed50bb-4d5d-4d96-9b7e-3900a484f421.lovableproject.com/product/${productId}`);
    if (!document.querySelector('link[rel="canonical"]')) {
      document.head.appendChild(canonical);
    }
  }, [productId]);

  const handleWhatsAppClick = () => {
    const phoneNumber = "6285156275565";
    const message = `📱 *KONSULTASI PRODUK DETAIL*

📦 *Produk:* ${product.title}
📋 *Kategori:* ${product.category}
💰 *Harga Mulai:* ${product.price}

🎯 *Keunggulan yang menarik:*
${product.features.map(feature => `• ${feature}`).join('\n')}

📝 *Informasi yang saya butuhkan:*
• Penjelasan detail produk
• Contoh hasil pemasangan
• Proses kerja dan timeline
• Biaya pemasangan untuk lokasi saya
• Promo atau diskon yang tersedia
• Garansi dan after sales service

📍 *Detail Project Saya:*
• Lokasi: _[mohon isi]_
• Luas area: _[mohon isi m²]_
• Jenis bangunan: _[rumah/kantor/toko]_
• Budget range: _[mohon isi]_
• Target selesai: _[mohon isi]_

Mohon konsultasi lengkap untuk produk ini. Siap untuk survey/meeting. Terima kasih! 🙏`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleQuoteRequest = () => {
    const phoneNumber = "6285156275565";
    const message = `💼 *REQUEST PENAWARAN RESMI*

📦 *Produk:* ${product.title}
📊 *Spesifikasi Teknis:*
${Object.entries(product.specifications).map(([key, value]) => `• ${key}: ${value}`).join('\n')}

📐 *Detail Project:*
• Lokasi pemasangan: _[mohon isi lengkap]_
• Luas total area (m²): _[mohon isi]_
• Jumlah panel/bagian: _[mohon isi]_
• Jenis aplikasi: _[mobil/gedung/rumah/dll]_
• Deadline project: _[mohon isi]_

💰 *Request Penawaran:*
• Harga material per m²
• Biaya pemasangan
• Biaya survey lokasi
• Total estimasi project
• Metode pembayaran
• Garansi yang diberikan

🚀 *Permintaan Khusus:*
• Bisa kirim sample produk?
• Jadwal survey yang tersedia?
• Portfolio project serupa?
• Referensi customer sebelumnya?

Mohon penawaran resmi dan lengkap untuk project ini. Terima kasih! 📋`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
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

            <div className="flex flex-col gap-3">
              <Button onClick={handleWhatsAppClick} className="bg-green-500 hover:bg-green-600 w-full">
                <MessageCircle className="h-4 w-4 mr-2" />
                💬 Konsultasi Gratis
              </Button>
              <Button onClick={handleQuoteRequest} variant="outline" className="w-full">
                💼 Minta Penawaran Resmi
              </Button>
            </div>

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
};

export default ProductDetail;