'use client';

import { MapPin, Navigation, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const GoogleMaps = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "6285156275565";
    const message = "Halo! Saya ingin konsultasi mengenai layanan kaca film dan sandblast. Mohon informasi lokasi dan jadwal kunjungan.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleDirectionsClick = () => {
    window.open("https://g.co/kgs/Mv7L7nK", "_blank");
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8166!3d-6.200000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9b888!2sJakarta%2C%20Indonesia!5e0!3m2!1sen!2sid!4v1703123456789!5m2!1sen!2sid"
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
                  Kantor Pusat Jakarta
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
                      Jakarta Pusat, DKI Jakarta, Indonesia
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">🕒 Jam Operasional:</h4>
                    <div className="text-muted-foreground space-y-1">
                      <p>Senin - Jumat: 08:00 - 17:00 WIB</p>
                      <p>Sabtu: 08:00 - 15:00 WIB</p>
                      <p>Minggu: Konsultasi via WhatsApp</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">🚚 Area Pengiriman:</h4>
                    <div className="text-muted-foreground space-y-1">
                      <p>• Jakarta & Sekitarnya: Same Day Service</p>
                      <p>• Jabodetabek: 1-2 Hari Kerja</p>
                      <p>• Jawa: 2-3 Hari Kerja</p>
                      <p>• Luar Jawa: 3-7 Hari Kerja</p>
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