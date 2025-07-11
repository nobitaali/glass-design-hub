'use client';

import { MessageCircle } from "lucide-react";
import { useState } from "react";

const WhatsAppFloat = () => {
  const [isVisible, setIsVisible] = useState(true);
  
  const phoneNumber = "6285156275565";
  const message = `🏠 *KONSULTASI INTERIOR SOLUTIONS*

👋 Halo! Saya tertarik dengan layanan kaca film dan sandblast dari Interior Solutions Indonesia.

🔍 *Yang ingin saya ketahui:*
• Katalog produk terlengkap
• Harga dan promo terbaru
• Proses konsultasi gratis
• Jadwal survey lokasi
• Portfolio pekerjaan sebelumnya

📍 *Lokasi saya:* _[mohon isi kota/area]_
📏 *Perkiraan luas:* _[mohon isi]_
🏢 *Jenis bangunan:* _[rumah/kantor/toko/dll]_

Mohon informasi lengkapnya. Terima kasih! 🙏`;
  
  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {/* Pulse Animation */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
        
        {/* Main Button */}
        <button
          onClick={handleWhatsAppClick}
          className="relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
          aria-label="Chat WhatsApp"
        >
          <MessageCircle className="h-6 w-6" />
          
          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Chat WhatsApp
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
          </div>
        </button>
        
        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -right-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs transition-colors duration-200"
          aria-label="Close WhatsApp widget"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default WhatsAppFloat;