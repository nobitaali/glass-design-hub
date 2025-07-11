
'use client'

import { MessageCircle } from "lucide-react"

const WhatsAppFloat = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "6285156275565"
    const message = "👋 Halo Interior Solutions Indonesia!\n\nSaya tertarik dengan layanan kaca film dan sandblast. Mohon info lebih lanjut.\n\nTerima kasih!"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleWhatsAppClick}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-pulse"
        aria-label="Chat WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  )
}

export default WhatsAppFloat
