
'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Palette, Zap, Shield, MessageCircle } from "lucide-react"

const CustomDesign = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "6285156275565"
    const message = "🎨 *CUSTOM DESIGN REQUEST*\n\nHalo! Saya tertarik dengan layanan custom design:\n\n📐 Detail Project:\n• Jenis: _[kaca film/sandblast/stiker]_\n• Lokasi: _[mohon isi]_\n• Ukuran: _[mohon isi m²]_\n• Design: _[mohon jelaskan keinginan]_\n\n🎯 Kebutuhan Khusus:\n• Budget range: _[mohon isi]_\n• Timeline: _[mohon isi]_\n• Referensi design: _[ada/tidak]_\n\nMohon konsultasi untuk realisasi design impian saya! 🚀"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section id="layanan" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Layanan Custom Design
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Wujudkan impian interior Anda dengan layanan custom design profesional
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              {[
                {
                  icon: Palette,
                  title: "Design Konsultasi",
                  description: "Tim ahli kami siap membantu mewujudkan konsep design impian Anda"
                },
                {
                  icon: Zap,
                  title: "Hasil Cepat",
                  description: "Proses design hingga eksekusi hanya dalam 3-5 hari kerja"
                },
                {
                  icon: Shield,
                  title: "Garansi Kepuasan",
                  description: "Revisi gratis hingga Anda 100% puas dengan hasilnya"
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button 
              size="lg" 
              onClick={handleWhatsAppClick}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Konsultasi Design Gratis
            </Button>
          </div>

          <div className="relative">
            <Card className="bg-card border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Custom Design Package</CardTitle>
                <CardDescription className="text-center">
                  Paket lengkap untuk kebutuhan design khusus Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <span className="text-3xl font-bold text-primary">GRATIS</span>
                  <p className="text-sm text-muted-foreground">Konsultasi & Survey</p>
                </div>
                <ul className="space-y-2 text-sm">
                  {[
                    "✅ Survey lokasi gratis",
                    "✅ Konsultasi design 1-on-1",
                    "✅ 3D visualisasi mockup",
                    "✅ Material recommendation",
                    "✅ Timeline project detail",
                    "✅ Budget estimation akurat"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CustomDesign
