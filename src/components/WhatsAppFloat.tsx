'use client';

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
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            className="h-6 w-6"
          >
            <path 
              fill="#FFFFFF" 
              d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.814 9.814 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.233 8.233 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.32a8.188 8.188 0 0 1-1.26-4.38c.02-4.54 3.7-8.23 8.25-8.23zM8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.21.88 2.38 1 2.54.12.15 1.69 2.67 4.16 3.66.58.24 1.04.38 1.39.48.58.19 1.11.16 1.53.1.47-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.22-.16-.47-.28-.25-.12-1.47-.72-1.69-.81-.22-.09-.43-.07-.66.2-.22.25-.87.86-1.06 1.07-.19.21-.38.24-.63.12-.47-.25-1.04-.52-1.69-1.07-.62-.56-1.05-1.25-1.24-1.5-.19-.25-.02-.38.2-.51.22-.12.62-.47.75-.66.12-.19.07-.38-.04-.66-.1-.28-.66-1.56-.87-2.15-.22-.58-.43-.48-.66-.48z"
            />
          </svg>
          
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
