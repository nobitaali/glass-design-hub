
'use client'

import { Phone, Mail, MapPin, Clock } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Interior Solutions Indonesia</h3>
            <p className="text-sm opacity-90">
              Spesialis kaca film, sandblast, dan stiker dekoratif terpercaya di Indonesia.
            </p>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm">24/7 Customer Support</span>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Layanan Kami</h4>
            <ul className="space-y-2 text-sm">
              <li>Kaca Film Mobil & Gedung</li>
              <li>Sandblast Custom</li>
              <li>Stiker Dekoratif</li>
              <li>One Way Vision</li>
              <li>Cutting Sticker</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Kontak</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+62 851-5627-5565</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@interiorfilm.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Jakarta Selatan, Indonesia</span>
              </div>
            </div>
          </div>

          {/* Coverage Area */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Area Layanan</h4>
            <ul className="space-y-1 text-sm">
              <li>Jakarta & Sekitarnya</li>
              <li>Bogor, Depok, Tangerang</li>
              <li>Bekasi, Bandung</li>
              <li>Surabaya, Medan</li>
              <li>Seluruh Indonesia</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2024 Interior Solutions Indonesia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
