import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Palette, Ruler, Truck, Headphones } from "lucide-react";

const CustomDesign = () => {
  const services = [
    {
      icon: Palette,
      title: "Desain Custom",
      description: "Tim desainer berpengalaman siap mewujudkan ide kreatif Anda"
    },
    {
      icon: Ruler,
      title: "Ukuran Sesuai Kebutuhan",
      description: "Pemotongan presisi sesuai dengan ukuran dan spesifikasi yang diinginkan"
    },
    {
      icon: Truck,
      title: "Pemasangan Profesional",
      description: "Tim teknisi berpengalaman untuk hasil pemasangan yang sempurna"
    },
    {
      icon: Headphones,
      title: "Konsultasi 24/7",
      description: "Layanan konsultasi gratis kapan saja untuk membantu pilihan terbaik"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            📦 Kustomisasi Desain Tersedia
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Kami menerima pemesanan desain khusus, potong sesuai ukuran, hingga pemasangan di lokasi. 
            <strong className="text-primary">Pengiriman ke seluruh Indonesia dengan garansi kualitas terbaik.</strong>
            Wujudkan visi interior impian Anda bersama tim profesional kami.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-card rounded-2xl p-8 lg:p-12 text-center border shadow-sm">
          <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
            Siap Memulai Proyek Anda?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Konsultasikan kebutuhan interior Anda dengan tim ahli kami. 
            Dapatkan penawaran terbaik dan solusi yang tepat untuk ruang impian Anda.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="min-w-[200px]">
              Konsultasi Gratis Sekarang
            </Button>
            <Button variant="outline" size="lg" className="min-w-[200px]">
              Request Penawaran
            </Button>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              📞 Hubungi kami: 0851-5627-5565 | 📧 jayastiker25@gmail.com
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomDesign;