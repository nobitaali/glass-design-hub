import { Phone, Mail, MapPin } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Top Contact Bar */}
        <div className="flex flex-wrap items-center justify-between py-2 text-sm border-b border-primary-foreground/20">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>0812-3456-7890</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail className="h-4 w-4" />
              <span>jayastiker25@gmail.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>Melayani Seluruh Indonesia</span>
          </div>
        </div>
        
        {/* Main Header */}
        <div className="py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Interior Film Solutions</h2>
              <p className="text-sm opacity-90">Spesialis Kaca Film, Sandblast & Stiker Dekoratif</p>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex space-x-6">
              <a href="/" className="hover:text-primary-foreground/80 transition-colors">Beranda</a>
              <a href="#produk" className="hover:text-primary-foreground/80 transition-colors">Produk</a>
              <a href="/testimoni" className="hover:text-primary-foreground/80 transition-colors">Testimoni</a>
              <a href="#layanan" className="hover:text-primary-foreground/80 transition-colors">Layanan</a>
            </nav>
            
            <div className="text-right">
              <p className="text-sm font-medium">Konsultasi Gratis</p>
              <p className="text-lg font-bold">24/7 Available</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;