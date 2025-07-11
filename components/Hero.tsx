
'use client'

import { Button } from "@/components/ui/button"
import { MessageCircle, Shield, Truck, Star } from "lucide-react"

const Hero = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "6285156275565"
    const message = "👋 Halo Interior Solutions Indonesia!\n\nSaya tertarik dengan layanan kaca film dan sandblast. Mohon info lebih lanjut mengenai:\n\n• Harga dan katalog produk\n• Survey lokasi gratis\n• Promo yang sedang berlangsung\n• Timeline pengerjaan\n\nTerima kasih!"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-secondary/20 overflow-hidden">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Kaca Film & Sandblast
                <span className="text-primary block">Berkualitas Premium</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                Spesialis pemasangan kaca film, sandblast, dan stiker dekoratif untuk rumah, kantor, dan kendaraan.
                Melayani seluruh Indonesia dengan garansi resmi.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={handleWhatsAppClick} className="bg-green-500 hover:bg-green-600">
                <MessageCircle className="h-5 w-5 mr-2" />
                Konsultasi Gratis
              </Button>
              <Button size="lg" variant="outline">
                Lihat Katalog
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t">
              <div className="text-center">
                <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Garansi Resmi</p>
              </div>
              <div className="text-center">
                <Star className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Rating 4.8/5</p>
              </div>
              <div className="text-center">
                <Truck className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Kirim Nasional</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop" 
                alt="Kaca Film Premium"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-2xl font-bold">127+ Proyek Selesai</p>
                <p className="text-sm opacity-90">Kepuasan Pelanggan Terjamin</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
