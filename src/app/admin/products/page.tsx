"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";
import { Product } from "@/lib/supabase-optimized";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    PlusCircle,
    Edit,
    Trash2,
    Search,
    Filter,
    ArrowLeft,
    Eye
} from "lucide-react";
import Link from "next/link";

export default function ProductsManagementPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const router = useRouter();

    useEffect(() => {
        checkAuth();
        loadData();
    }, []);

    useEffect(() => {
        filterProducts();
    }, [products, searchTerm, categoryFilter]);

    const checkAuth = async () => {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            router.push("/admin/login");
            return;
        }

        const { data: profile } = await supabase
            .from('admin_users')
            .select('*')
            .eq('user_id', user.id)
            .single();

        if (!profile) {
            router.push("/admin/login");
            return;
        }
    };

    const loadData = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/admin/products', {
                cache: 'no-store'
            });
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data);
            } else {
                console.error("Error loading products");
            }
        } catch (error) {
            console.error("Error loading products:", error);
        } finally {
            setLoading(false);
        }
    };

    const filterProducts = () => {
        let filtered = products;

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Category filter
        if (categoryFilter !== "all") {
            filtered = filtered.filter(product => product.category === categoryFilter);
        }

        setFilteredProducts(filtered);
    };

    const handleDeleteProduct = async (productId: string, productTitle: string) => {
        if (!confirm(`Apakah Anda yakin ingin menghapus produk "${productTitle}"?`)) {
            return;
        }

        try {
            const response = await fetch(`/api/admin/products/${productId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                loadData(); // Reload data
            } else {
                alert("Gagal menghapus produk");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Gagal menghapus produk");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p>Memuat produk...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/admin/dashboard">
                                <Button variant="ghost" size="sm">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Dashboard
                                </Button>
                            </Link>
                            <h1 className="text-xl font-bold">Kelola Produk</h1>
                        </div>
                        <Link href="/admin/products/new">
                            <Button>
                                <PlusCircle className="h-4 w-4 mr-2" />
                                Tambah Produk Baru
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Filters */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Filter className="h-5 w-5" />
                            Filter & Pencarian
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Cari produk..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>

                            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Kategori" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Kategori</SelectItem>
                                    <SelectItem value="SAND BLAST">SAND BLAST</SelectItem>
                                    <SelectItem value="KACA FILM">KACA FILM</SelectItem>
                                    <SelectItem value="STIKER & VINYL">STIKER & VINYL</SelectItem>
                                </SelectContent>
                            </Select>

                            <div className="text-sm text-muted-foreground flex items-center">
                                Menampilkan {filteredProducts.length} dari {products.length} produk
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Products List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Produk</CardTitle>
                        <CardDescription>
                            Kelola semua produk Anda
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-muted-foreground">Tidak ada produk yang ditemukan</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                                    >
                                        <div className="flex items-center gap-4 flex-1">
                                            <img
                                                src={product.image_url}
                                                alt={product.title}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="font-medium line-clamp-1">{product.title}</h3>
                                                    <Badge variant="outline">{product.category}</Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground line-clamp-2 mb-1">
                                                    {product.description}
                                                </p>
                                                <p className="text-sm font-medium text-primary">
                                                    {product.price}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 ml-4">
                                            <Link href={`/product/${product.slug}`} target="_blank">
                                                <Button variant="ghost" size="sm" title="Lihat produk">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Link href={`/admin/products/${product.id}/edit`}>
                                                <Button variant="ghost" size="sm" title="Edit produk">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDeleteProduct(product.id, product.title)}
                                                className="text-destructive hover:text-destructive"
                                                title="Hapus produk"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
