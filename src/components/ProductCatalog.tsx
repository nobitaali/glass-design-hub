
'use client'

import ProductCard from "./ProductCard"

const ProductCatalog = () => {
  const products = [
    {
      title: "Sandblast Polos",
      description: "Tampilan elegan & minimalis untuk privasi maksimal",
      features: [
        "Privasi 100% tanpa mengurangi cahaya",
        "Mudah dibersihkan & tahan lama",
        "Cocok untuk kamar mandi & ruang meeting"
      ],
      category: "Sandblast",
      gradient: "from-blue-500 to-purple-600",
      imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
      price: "Rp 85.000/m²"
    },
    {
      title: "Kaca Film Black",
      description: "Privasi maksimal dengan reduksi panas optimal",
      features: [
        "Reduksi panas hingga 85%",
        "Privasi one-way dari luar",
        "Anti UV & anti silau"
      ],
      category: "Kaca Film",
      gradient: "from-gray-800 to-black",
      imageUrl: "https://images.unsplash.com/photo-1574717834569-75b95db2c05e?w=400&h=300&fit=crop",
      price: "Rp 65.000/m²"
    },
    {
      title: "Stiker Vinyl Print",
      description: "Cetakan full color berkualitas tinggi",
      features: [
        "Custom design sesuai keinginan",
        "Warna tahan 5+ tahun outdoor",
        "Waterproof & scratch resistant"
      ],
      category: "Stiker Dekoratif",
      gradient: "from-green-500 to-teal-600",
      imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
      price: "Rp 55.000/m²"
    }
  ]

  return (
    <section id="produk" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Katalog Produk Terlengkap
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pilihan produk berkualitas tinggi dengan harga terjangkau untuk semua kebutuhan interior Anda
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductCatalog
