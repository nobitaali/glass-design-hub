import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";

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
              <a 
                href="https://www.facebook.com/interiorsolutions.id" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
                aria-label="Facebook Interior Solutions Indonesia"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a 
                href="https://www.instagram.com/interiorsolutions.id" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
                aria-label="Instagram Interior Solutions Indonesia"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a 
                href="https://www.youtube.com/c/InteriorSolutionsIndonesia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
                aria-label="YouTube Interior Solutions Indonesia"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a 
                href="https://www.linkedin.com/company/interior-solutions-indonesia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
                aria-label="LinkedIn Interior Solutions Indonesia"
              >
                <Linkedin className="h-4 w-4" />
              </a>
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
              <li>• Pemasangan Profesional Seluruh Indonesia</li>
              <li>• Garansi Resmi & Extended Warranty</li>
              <li>• After Sales Service 24/7</li>
              <li>• Maintenance & Perawatan Berkala</li>
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
                <span>jayastiker25@gmail.com</span>
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