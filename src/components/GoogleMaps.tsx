'use client';

import { MapPin, Navigation, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const GoogleMaps = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "6285156275565";
    const message = "Halo! Saya ingin konsultasi mengenai layanan kaca film dan sandblast di Jl. Nakula No.82A, Sokowaten, Banguntapan. Mohon informasi detail lokasi dan jadwal kunjungan.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleDirectionsClick = () => {
    window.open("https://www.google.com/maps/place/Jaya+Sticker+%7C+Stiker+Kaca+%7C+Sandblast+%7C+Kaca+Film+Jogja+%7C+Stiker+Jogja/@-7.7943071,110.3962741,19z/data=!3m1!4b1!4m6!3m5!1s0x2dd9d14bfd5dc281:0xd4b275c361c90eec!8m2!3d-7.7943071!4d110.3969178!16s%2Fg%2F11g18fmhsr?entry=ttu&g_ep=EgoyMDI1MDczMC4wIKXMDSoASAFQAw%3D%3D", "_blank");
  };

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Lokasi & Area Layanan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Berkantor pusat di Jakarta dengan jangkauan layanan ke seluruh Indonesia
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Map Embed */}
          <div className="relative">
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
              <iframe
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.05982108534718!2d110.39689623235486!3d-7.794363146732116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd9d14bfd5dc281%3A0xd4b275c361c90eec!2sJaya%20Sticker%20%7C%20Stiker%20Kaca%20%7C%20Sandblast%20%7C%20Kaca%20Film%20Jogja%20%7C%20Stiker%20Jogja!5e0!3m2!1sid!2sid!4v1754159484114!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Interior Solutions Indonesia"
              />
            </div>
            <div className="absolute top-4 right-4">
              <Button
                onClick={handleDirectionsClick}
                size="sm"
                className="bg-primary/90 backdrop-blur-sm hover:bg-primary"
              >
                <Navigation className="h-4 w-4 mr-1" />
                Petunjuk Arah
              </Button>
            </div>
          </div>

          {/* Location Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Jaya Sticker Yogyakarta
                </CardTitle>
                <CardDescription>
                  Melayani konsultasi, survey, dan pemasangan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">📍 Alamat:</h4>
                    <p className="text-muted-foreground">
                      Jl. Nakula No.82A, RT.03/RW.15, Sokowaten, Banguntapan, Kec. Banguntapan, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55198
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">🕒 Jam Operasional:</h4>
                    <div className="text-muted-foreground space-y-1">
                      <p>Senin - Jumat: 09:00 - 18:00 WIB</p>
                      <p>Sabtu: 09:00 - 14:00 WIB</p>
                      <p>Minggu: Konsultasi via WhatsApp</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">🚚 Area Pengiriman:</h4>
                    <div className="text-muted-foreground space-y-1">
                      <p>• Yogyakarta & Sekitarnya: Same Day Service</p>
                      <p>• Solo & Semarang: 1-2 Hari Kerja</p>
                      <p>• Jawa Tengah: 2-3 Hari Kerja</p>
                      <p>• Luar Jawa Tengah: 3-7 Hari Kerja</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-4 border-t">
                  <Button onClick={handleWhatsAppClick} className="bg-green-500 hover:bg-green-600">
                    <Phone className="h-4 w-4 mr-2" />
                    Konsultasi Survey Lokasi
                  </Button>
                  <Button variant="outline" onClick={handleDirectionsClick}>
                    <MapPin className="h-4 w-4 mr-2" />
                    Lihat di Google Maps
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Coverage Areas */}
            <Card>
              <CardHeader>
                <CardTitle>Jangkauan Layanan Seluruh Indonesia</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2 text-primary">Pulau Jawa:</h4>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Jakarta & Sekitarnya</li>
                      <li>• Bandung & Sekitarnya</li>
                      <li>• Surabaya & Sekitarnya</li>
                      <li>• Yogyakarta & Solo</li>
                      <li>• Semarang & Sekitarnya</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-primary">Luar Jawa:</h4>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Medan & Sumatera</li>
                      <li>• Denpasar & Bali</li>
                      <li>• Makassar & Sulawesi</li>
                      <li>• Balikpapan & Kalimantan</li>
                      <li>• Dan kota besar lainnya</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleMaps;