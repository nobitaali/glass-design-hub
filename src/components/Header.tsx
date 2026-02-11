import { Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";

// Server Component - no interactivity needed
export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className=" mx-auto px-9 justify-between flex flex-col " >
        {/* Top Contact Bar */}
        <div className="flex flex-wrap items-center justify-between py-2 text-sm border-b border-primary-foreground/20">
          <div className="flex items-center space-x-2 md:space-x-4">
            <a
              href="tel:0851-5627-5565"
              className="flex items-center space-x-1 hover:text-primary-foreground/80 transition-colors"
            >
              <Phone className="h-3 w-3 md:h-4 md:w-4" aria-hidden="true" />
              <span className="hidden sm:inline">0851-5627-5565</span>
              <span className="sm:hidden">Call</span>
            </a>
            <a
              href="mailto:jayastiker25@gmail.com"
              className="flex items-center space-x-1 hover:text-primary-foreground/80 transition-colors"
            >
              <Mail className="h-3 w-3 md:h-4 md:w-4" aria-hidden="true" />
              <span className="hidden sm:inline">jayastiker25@gmail.com</span>
              <span className="sm:hidden">Email</span>
            </a>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="h-3 w-3 md:h-4 md:w-4" aria-hidden="true" />
            <span className="hidden md:inline">Melayani Seluruh Indonesia</span>
            <span className="md:hidden">Indonesia</span>
          </div>
        </div>

        {/* Main Header */}
        <div className="py-4 items-center">
          <div className="flex items-center justify-between">
            <div className="">
              <h2 className="text-lg md:text-2xl font-bold">Interior Film Solutions</h2>
              <p className="text-xs md:text-sm opacity-90">Spesialis Kaca Film, Sandblast & Stiker Dekoratif</p>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex space-x-6" aria-label="Main navigation">
              <Link href="/" className="hover:text-primary-foreground/80 transition-colors">Beranda</Link>
              <Link href="/#produk" className="hover:text-primary-foreground/80 transition-colors">Produk</Link>
              <Link href="/testimonials" className="hover:text-primary-foreground/80 transition-colors">Testimoni</Link>
              <Link href="/#layanan" className="hover:text-primary-foreground/80 transition-colors">Layanan</Link>
              <Link href="/blog" className="hover:text-primary-foreground/80 transition-colors">Blog</Link>
              <Link href="/lokasi" className="hover:text-primary-foreground/80 transition-colors">Lokasi</Link>
            </nav>

            <div className="text-right ml-3">
              <p className="text-sm font-medium">Konsultasi Gratis</p>
              <p className="text-lg font-bold">24/7 Available</p>
            </div>
          </div>

          {/* Mobile Navigation */}
          <nav className="md:hidden mt-4 pt-4 border-t border-primary-foreground/20" aria-label="Mobile navigation">
            <div className="flex flex-wrap gap-4 text-sm">
              <Link href="/" className="hover:text-primary-foreground/80 transition-colors">Beranda</Link>
              <Link href="/#produk" className="hover:text-primary-foreground/80 transition-colors">Produk</Link>
              <Link href="/testimonials" className="hover:text-primary-foreground/80 transition-colors">Testimoni</Link>
              <Link href="/#layanan" className="hover:text-primary-foreground/80 transition-colors">Layanan</Link>
              <Link href="/blog" className="hover:text-primary-foreground/80 transition-colors">Blog</Link>
              <Link href="/lokasi" className="hover:text-primary-foreground/80 transition-colors">Lokasi</Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}