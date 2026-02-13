"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Package,
    MessageSquare,
    FileText,
    LogOut,
    ArrowRight,
    TrendingUp,
    Users,
    Star
} from "lucide-react";
import Link from "next/link";

interface Stats {
    products: number;
    testimonials: number;
    blogPosts: number;
}

export default function AdminLandingPage() {
    const [user, setUser] = useState<any>(null);
    const [stats, setStats] = useState<Stats>({
        products: 0,
        testimonials: 0,
        blogPosts: 0,
    });
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkAuth();
        loadStats();
    }, []);

    const checkAuth = async () => {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            router.push("/admin/login");
            return;
        }

        // Check admin role
        const { data: profile } = await supabase
            .from('admin_users')
            .select('*')
            .eq('user_id', user.id)
            .single();

        if (!profile) {
            router.push("/admin/login");
            return;
        }

        setUser(user);
    };

    const loadStats = async () => {
        try {
            const supabase = createClient();

            // Get products count
            const { count: productsCount } = await supabase
                .from('products')
                .select('*', { count: 'exact', head: true });

            // Get testimonials count
            const { count: testimonialsCount } = await supabase
                .from('testimonials')
                .select('*', { count: 'exact', head: true });

            // Get blog posts count
            const { count: blogPostsCount } = await supabase
                .from('blog_posts')
                .select('*', { count: 'exact', head: true });

            setStats({
                products: productsCount || 0,
                testimonials: testimonialsCount || 0,
                blogPosts: blogPostsCount || 0,
            });
        } catch (error) {
            console.error("Error loading stats:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/admin/login");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p>Memuat dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header */}
            <header className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/" className="text-xl font-bold text-primary">
                                Jaya Sticker Indonesia
                            </Link>
                            <Badge variant="secondary">Admin Panel</Badge>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground">
                                Welcome, {user?.email}
                            </span>
                            <Button variant="outline" size="sm" onClick={handleLogout}>
                                <LogOut className="h-4 w-4 mr-2" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-12">
                {/* Welcome Section */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Admin Dashboard
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Kelola semua konten website Anda dari satu tempat
                    </p>
                </div>

                {/* Quick Stats */}
                <div className="grid gap-6 md:grid-cols-3 mb-12">
                    <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Produk</CardTitle>
                            <Package className="h-5 w-5 opacity-80" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{stats.products}</div>
                            <p className="text-xs opacity-80 mt-1">
                                Produk aktif di katalog
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Testimoni</CardTitle>
                            <Star className="h-5 w-5 opacity-80" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{stats.testimonials}</div>
                            <p className="text-xs opacity-80 mt-1">
                                Testimoni pelanggan
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Artikel</CardTitle>
                            <FileText className="h-5 w-5 opacity-80" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{stats.blogPosts}</div>
                            <p className="text-xs opacity-80 mt-1">
                                Artikel blog
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Navigation Cards */}
                <div className="grid gap-6 md:grid-cols-3">
                    {/* Products Management */}
                    <Link href="/admin/products">
                        <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-500 bg-white/80 backdrop-blur-sm h-full">
                            <CardHeader>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-500 transition-colors">
                                        <Package className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                                </div>
                                <CardTitle className="text-2xl">Kelola Produk</CardTitle>
                                <CardDescription className="text-base">
                                    Tambah, edit, dan hapus produk di katalog
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                        <span>Manajemen produk lengkap</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                        <span>Upload gambar produk</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                        <span>Kategori dan harga</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    {/* Testimonials Management */}
                    <Link href="/admin/testimonials">
                        <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-purple-500 bg-white/80 backdrop-blur-sm h-full">
                            <CardHeader>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-500 transition-colors">
                                        <MessageSquare className="h-8 w-8 text-purple-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                                </div>
                                <CardTitle className="text-2xl">Kelola Testimoni</CardTitle>
                                <CardDescription className="text-base">
                                    Kelola testimoni dan review pelanggan
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                                        <span>Tambah testimoni baru</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                                        <span>Verifikasi dan publish</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                                        <span>Rating dan featured</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    {/* Blog Management */}
                    <Link href="/admin/dashboard">
                        <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-green-500 bg-white/80 backdrop-blur-sm h-full">
                            <CardHeader>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-500 transition-colors">
                                        <FileText className="h-8 w-8 text-green-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                                </div>
                                <CardTitle className="text-2xl">Kelola Blog</CardTitle>
                                <CardDescription className="text-base">
                                    Buat dan kelola artikel blog
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                        <span>Tulis artikel baru</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                        <span>Draft dan publish</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                        <span>SEO optimization</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>

                {/* Quick Links */}
                <div className="mt-12 p-6 bg-white/80 backdrop-blur-sm rounded-lg border">
                    <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                    <div className="flex flex-wrap gap-3">
                        <Link href="/admin/products/new">
                            <Button variant="outline" size="sm">
                                <Package className="h-4 w-4 mr-2" />
                                Tambah Produk Baru
                            </Button>
                        </Link>
                        <Link href="/admin/testimonials/new">
                            <Button variant="outline" size="sm">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Tambah Testimoni Baru
                            </Button>
                        </Link>
                        <Link href="/admin/blog/new">
                            <Button variant="outline" size="sm">
                                <FileText className="h-4 w-4 mr-2" />
                                Tulis Artikel Baru
                            </Button>
                        </Link>
                        <Link href="/" target="_blank">
                            <Button variant="outline" size="sm">
                                <TrendingUp className="h-4 w-4 mr-2" />
                                Lihat Website
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
