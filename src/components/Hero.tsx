
'use client'

import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, CheckCircle } from "lucide-react"

const Hero = () => {
  const handleWhatsAppContact = () => {
    const phoneNumber = "6285156275565"
    const message = "🏠 *KONSULTASI GRATIS INTERIOR FILM*\n\nHalo! Saya tertarik dengan layanan kaca film dan sandblast untuk:\n\n📍 Lokasi: _[mohon isi]_\n🏢 Jenis bangunan: _[rumah/kantor/toko]_\n📐 Perkiraan luas: _[mohon isi m²]_\n\n💡 Kebutuhan saya:\n• Privasi kaca ✓\n• Reduksi panas ✓\n• Dekorasi interior ✓\n\nMohon info produk terbaik dan penawaran khusus. Terima kasih! 🙏"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section className="relative bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Spesialis <span className="text-accent">Kaca Film</span> & <span className="text-accent">Sandblast</span> Terbaik
              </h1>
              <p className="text-xl text-primary-foreground/90 leading-relaxed">
                Solusi privasi & dekorasi interior profesional untuk rumah, kantor, dan kendaraan Anda. Pemasangan di seluruh Indonesia dengan garansi resmi.
              </p>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "🛡️ Anti UV & Reduksi Panas",
                "🔒 Privasi Maksimal",
                "⚡ Pemasangan 1 Hari",
                "✅ Garansi Resmi 2 Tahun"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={handleWhatsAppContact}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 text-lg"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Konsultasi Gratis
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-4 text-lg"
                asChild
              >
                <a href="tel:+6285156275565">
                  <Phone className="h-5 w-5 mr-2" />
                  Hubungi Langsung
                </a>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-primary-foreground/20">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-accent">500+</span>
                <span className="text-sm">Project Selesai</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-accent">4.9⭐</span>
                <span className="text-sm">Rating Customer</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-accent">24/7</span>
                <span className="text-sm">Layanan Support</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop"
                alt="Kaca Film dan Sandblast Berkualitas Tinggi"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-lg font-semibold">Kualitas Premium</p>
                <p className="text-sm opacity-90">Hasil Profesional Terjamin</p>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground rounded-full p-4 shadow-lg">
              <span className="text-sm font-bold">FREE Survey!</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
