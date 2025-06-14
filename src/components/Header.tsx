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
              <span>info@interiorfilm.com</span>
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
              <h1 className="text-2xl font-bold">Interior Film Solutions</h1>
              <p className="text-sm opacity-90">Spesialis Kaca Film, Sandblast & Stiker Dekoratif</p>
            </div>
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