"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface ProductDetailActionsProps {
  title: string;
  category: string;
  price: string;
  specifications: Record<string, string>;
}

export function ProductDetailActions({ 
  title, 
  category, 
  price, 
  specifications 
}: ProductDetailActionsProps) {
  const handleWhatsAppClick = () => {
    const phoneNumber = "6285156275565";
    const message = `📱 *KONSULTASI PRODUK DETAIL*

📦 *Produk:* ${title}
📋 *Kategori:* ${category}
💰 *Harga Mulai:* ${price}

🎯 *Keunggulan yang menarik:*
${Object.entries(specifications).map(([key, value]) => `• ${key}: ${value}`).join('\n')}

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

📦 *Produk:* ${title}
📊 *Spesifikasi Teknis:*
${Object.entries(specifications).map(([key, value]) => `• ${key}: ${value}`).join('\n')}

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
    <div className="flex flex-col gap-3">
      <Button onClick={handleWhatsAppClick} className="bg-green-500 hover:bg-green-600 w-full">
        <MessageCircle className="h-4 w-4 mr-2" />
        💬 Konsultasi Gratis
      </Button>
      <Button onClick={handleQuoteRequest} variant="outline" className="w-full">
        💼 Minta Penawaran Resmi
      </Button>
    </div>
  );
}