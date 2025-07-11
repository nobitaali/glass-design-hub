"use client";

import { Button } from "@/components/ui/button";

interface QuoteRequestButtonProps {
  title: string;
}

const QuoteRequestButton = ({ title }: QuoteRequestButtonProps) => {
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
    <Button 
      size="sm" 
      onClick={handleQuoteRequest} 
      className="w-full bg-primary hover:bg-primary/90"
    >
      💼 Minta Penawaran
    </Button>
  );
};

export default QuoteRequestButton;