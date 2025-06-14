import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Interior Film Solutions</h3>
            <p className="text-sm opacity-90 mb-4 leading-relaxed">
              Spesialis kaca film, sandblast, dan stiker dekoratif dengan pengalaman bertahun-tahun. 
              Memberikan solusi interior terbaik untuk rumah, kantor, dan kendaraan.
            </p>
            <div className="flex space-x-3">
              <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <Facebook className="h-4 w-4" />
              </div>
              <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <Instagram className="h-4 w-4" />
              </div>
              <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <Youtube className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Produk Kami</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>• Sandblast Polos & Motif</li>
              <li>• Sandblast Cutting & Print</li>
              <li>• Kaca Film Black, Silver, Brown</li>
              <li>• Stiker Oneway & Wall Sticker</li>
              <li>• Stiker Vinyl Print & Cutting</li>
              <li>• Stiker Reflektor</li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Layanan</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>• Konsultasi Gratis</li>
              <li>• Desain Custom</li>
              <li>• Pemasangan Profesional</li>
              <li>• Garansi Resmi</li>
              <li>• After Sales Service</li>
              <li>• Maintenance & Perawatan</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Hubungi Kami</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>0812-3456-7890</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@interiorfilm.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Melayani Seluruh Indonesia</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>24/7 Available</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm opacity-90">
            © 2024 Interior Film Solutions. All rights reserved. | Trusted Interior Partner
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;