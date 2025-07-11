import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, MessageCircle, Eye } from "lucide-react";

interface ProductCardProps {
  title: string;
  description: string;
  features: string[];
  category: string;
  gradient: string;
  imageUrl: string;
  price?: string;
}

const ProductCard = ({ title, description, features, category, gradient, imageUrl, price }: ProductCardProps) => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "6285156275565";
    const message = `🛍️ *PERMINTAAN PENAWARAN PRODUK*

📦 *Produk:* ${title}
📋 *Kategori:* ${category}
💰 *Harga Katalog:* ${price}

📝 *Kebutuhan Saya:*
• Lokasi pemasangan: _[mohon isi]_
• Luas area (m²): _[mohon isi]_
• Jenis bangunan: _[rumah/kantor/toko/dll]_
• Target waktu: _[mohon isi]_

🔥 *Pertanyaan:*
1. Apakah ada diskon untuk pembelian dalam jumlah besar?
2. Berapa biaya pemasangan untuk lokasi saya?
3. Berapa lama garansi produk dan pemasangan?
4. Apakah bisa survey lokasi terlebih dahulu?

Mohon kirimkan penawaran terbaik untuk kebutuhan saya. Terima kasih! 🙏`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleQuoteRequest = () => {
    const phoneNumber = "6285156275565";
    const message = `💼 *REQUEST PENAWARAN KHUSUS*

📦 *Produk:* ${title}
💰 *Budget Range:* _[mohon isi]_

📐 *Detail Project:*
• Jenis project: _[komersial/residential]_
• Luas total: _[mohon isi m²]_
• Lokasi: _[kota/alamat]_
• Timeline: _[urgent/normal/flexible]_

🎯 *Kebutuhan Spesial:*
• Custom design: _[ya/tidak]_
• Pemasangan: _[ya/tidak]_
• After sales service: _[ya/tidak]_

Mohon penawaran terbaik untuk project ini. Siap untuk meeting/survey lokasi. Terima kasih! 🚀`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
          {category}
        </Badge>
        {price && (
          <div className="absolute bottom-3 left-3 text-white font-bold text-lg">
            {price}
          </div>
        )}
      </div>

      <CardHeader className="pb-4">
        <CardTitle className="text-xl group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-sm leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-2">
              <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Button size="sm" className="flex-1" variant="outline" asChild>
              <a href={`/product/${title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`}>
                <Eye className="h-4 w-4 mr-1" />
                Detail
              </a>
            </Button>
            <Button size="sm" onClick={handleWhatsAppClick} className="bg-green-500 hover:bg-green-600">
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>
          <Button size="sm" onClick={handleQuoteRequest} className="w-full bg-primary hover:bg-primary/90">
            💼 Minta Penawaran
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;