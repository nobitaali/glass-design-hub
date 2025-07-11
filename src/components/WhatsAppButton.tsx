"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  title: string;
  category: string;
  price?: string;
}

const WhatsAppButton = ({ title, category, price }: WhatsAppButtonProps) => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "6285156275565";
    const message = `🛍️ *PERMINTAAN PENAWARAN PRODUK*

📦 *Produk:* ${title}
📋 *Kategori:* ${category}
💰 *Harga Katalog:* ${price || 'Tidak tersedia'}

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

  return (
    <Button 
      size="sm" 
      onClick={handleWhatsAppClick} 
      className="bg-green-500 hover:bg-green-600"
    >
      <MessageCircle className="h-4 w-4" />
    </Button>
  );
};

export default WhatsAppButton;