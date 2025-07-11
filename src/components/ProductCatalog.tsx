import ProductCard from "./ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductCatalog = () => {
  const sandblastProducts = [
    {
      title: "Sandblast Polos",
      description: "Tampilan elegan & minimalis untuk privasi maksimal",
      features: [
        "Tampilan elegan & minimalis",
        "Memberi privasi tanpa menghalangi cahaya",
        "Cocok untuk partisi, pintu, dan jendela kaca"
      ],
      category: "SAND BLAST",
      gradient: "bg-gradient-to-br from-gray-400 to-gray-600",
      imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&h=300&fit=crop",
      price: "Mulai Rp 85.000/m²"
    },
    {
      title: "Sandblast Motif",
      description: "Motif artistik pilihan untuk nilai estetika tinggi",
      features: [
        "Motif artistik pilihan",
        "Menambah nilai estetika ruang",
        "Ideal untuk kantor, showroom, dan rumah"
      ],
      category: "SAND BLAST",
      gradient: "bg-gradient-to-br from-blue-400 to-blue-600",
      imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=500&h=300&fit=crop",
      price: "Mulai Rp 125.000/m²"
    },
    {
      title: "Sandblast Cutting",
      description: "Motif custom sesuai desain dengan presisi tinggi",
      features: [
        "Motif custom sesuai desain",
        "Cocok untuk logo, tulisan, dan dekorasi",
        "Hasil presisi dengan detail tajam"
      ],
      category: "SAND BLAST",
      gradient: "bg-gradient-to-br from-green-400 to-green-600",
      imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500&h=300&fit=crop",
      price: "Mulai Rp 175.000/m²"
    },
    {
      title: "Sandblast Print",
      description: "Teknologi printing untuk efek visual menarik",
      features: [
        "Sandblast + teknologi printing",
        "Efek visual menarik dan eksklusif",
        "Pas untuk branding, signage, dan interior unik"
      ],
      category: "SAND BLAST",
      gradient: "bg-gradient-to-br from-purple-400 to-purple-600",
      imageUrl: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=500&h=300&fit=crop",
      price: "Mulai Rp 225.000/m²"
    }
  ];

  const kacaFilmProducts = [
    {
      title: "Kaca Film Black",
      description: "Privasi maksimal dengan reduksi panas optimal",
      features: [
        "Privasi maksimal dari luar",
        "Reduksi panas dan sinar UV",
        "Cocok untuk kendaraan, kantor, rumah"
      ],
      category: "KACA FILM",
      gradient: "bg-gradient-to-br from-gray-800 to-black",
      imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&h=300&fit=crop&sat=-100",
      price: "Mulai Rp 65.000/m²"
    },
    {
      title: "Kaca Film Silver",
      description: "Efek reflektif elegan dengan teknologi canggih",
      features: [
        "Efek reflektif elegan",
        "Menolak panas hingga 80%",
        "Memberikan kesan modern dan bersih"
      ],
      category: "KACA FILM",
      gradient: "bg-gradient-to-br from-gray-300 to-gray-500",
      imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=500&h=300&fit=crop&sat=-50",
      price: "Mulai Rp 75.000/m²"
    },
    {
      title: "Kaca Film Brown",
      description: "Nuansa hangat & nyaman untuk ruangan",
      features: [
        "Nuansa hangat & nyaman",
        "Cocok untuk rumah & tempat usaha",
        "Mengurangi silau & menjaga suhu ruangan"
      ],
      category: "KACA FILM",
      gradient: "bg-gradient-to-br from-amber-600 to-brown-700",
      imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500&h=300&fit=crop&sepia=100",
      price: "Mulai Rp 70.000/m²"
    }
  ];

  const stikerProducts = [
    {
      title: "Stiker Oneway",
      description: "One Way Vision untuk branding dan privasi",
      features: [
        "Tampilan dari luar tertutup, dari dalam tetap terlihat",
        "Ideal untuk branding kendaraan & kaca toko",
        "Tahan cuaca & mudah dipasang"
      ],
      category: "STIKER & VINYL",
      gradient: "bg-gradient-to-br from-indigo-400 to-indigo-600",
      imageUrl: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=500&h=300&fit=crop&hue=240",
      price: "Mulai Rp 45.000/m²"
    },
    {
      title: "Stiker Tembok",
      description: "Wall sticker untuk dekorasi dinding",
      features: [
        "Mudah dipasang & dilepas",
        "Tidak merusak cat dinding",
        "Cocok untuk dekorasi rumah, café, kantor"
      ],
      category: "STIKER & VINYL",
      gradient: "bg-gradient-to-br from-pink-400 to-pink-600",
      imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=500&h=300&fit=crop&hue=320",
      price: "Mulai Rp 25.000/m²"
    },
    {
      title: "Stiker Kaca",
      description: "Dekorasi kaca jendela dan pintu",
      features: [
        "Menambah dekorasi pada kaca jendela/pintu",
        "Banyak pilihan warna & motif",
        "Tahan lama dan mudah dirawat"
      ],
      category: "STIKER & VINYL",
      gradient: "bg-gradient-to-br from-cyan-400 to-cyan-600",
      imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&h=300&fit=crop&hue=180",
      price: "Mulai Rp 35.000/m²"
    },
    {
      title: "Stiker Vinyl Print",
      description: "Cetakan full color berkualitas tinggi",
      features: [
        "Cetakan full color berkualitas tinggi",
        "Cocok untuk promosi, branding, & display",
        "Tahan air dan sinar matahari"
      ],
      category: "STIKER & VINYL",
      gradient: "bg-gradient-to-br from-orange-400 to-orange-600",
      imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500&h=300&fit=crop&hue=30",
      price: "Mulai Rp 55.000/m²"
    },
    {
      title: "Stiker Vinyl Cutting",
      description: "Potongan presisi sesuai desain",
      features: [
        "Potongan sesuai design/logo",
        "Tampilan bersih dan profesional",
        "Cocok untuk kendaraan, kaca toko, pintu"
      ],
      category: "STIKER & VINYL",
      gradient: "bg-gradient-to-br from-teal-400 to-teal-600",
      imageUrl: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=500&h=300&fit=crop&hue=160",
      price: "Mulai Rp 65.000/m²"
    },
    {
      title: "Stiker Reflektor",
      description: "Keselamatan dengan teknologi reflektif",
      features: [
        "Memantulkan cahaya di malam hari",
        "Cocok untuk keselamatan, rambu, dan branding kendaraan",
        "Tersedia dalam berbagai warna cerah"
      ],
      category: "STIKER & VINYL",
      gradient: "bg-gradient-to-br from-yellow-400 to-yellow-600",
      imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=500&h=300&fit=crop&hue=60",
      price: "Mulai Rp 85.000/m²"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Katalog Produk Lengkap
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pilihan produk berkualitas tinggi untuk semua kebutuhan interior dan dekorasi Anda
          </p>
        </div>

        <Tabs defaultValue="sandblast" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="sandblast" className="text-sm lg:text-base">
              🔳 Sand Blast Series
            </TabsTrigger>
            <TabsTrigger value="kacafilm" className="text-sm lg:text-base">
              🌐 Kaca Film Series
            </TabsTrigger>
            <TabsTrigger value="stiker" className="text-sm lg:text-base">
              🧩 Stiker & Vinyl Series
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sandblast">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sandblastProducts.map((product, index) => (
                <ProductCard key={index} {...product} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="kacafilm">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {kacaFilmProducts.map((product, index) => (
                <ProductCard key={index} {...product} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stiker">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stikerProducts.map((product, index) => (
                <ProductCard key={index} {...product} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ProductCatalog;