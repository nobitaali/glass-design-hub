"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";
import { Testimonial, getAllTestimonials, deleteTestimonial } from "@/lib/supabase-testimonials";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    PlusCircle,
    Edit,
    Trash2,
    Eye,
    Search,
    Filter,
    Star,
    ArrowLeft,
    CheckCircle,
    XCircle
} from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

export default function TestimonialsManagementPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [filteredTestimonials, setFilteredTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [ratingFilter, setRatingFilter] = useState("all");
    const router = useRouter();

    useEffect(() => {
        checkAuth();
        loadData();
    }, []);

    useEffect(() => {
        filterTestimonials();
    }, [testimonials, searchTerm, statusFilter, ratingFilter]);

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
            // Get all testimonials (admin view, including unpublished)
            const supabase = createClient();
            const { data, error } = await supabase
                .from('testimonials')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setTestimonials(data || []);
        } catch (error) {
            console.error("Error loading testimonials:", error);
        } finally {
            setLoading(false);
        }
    };

    const filterTestimonials = () => {
        let filtered = testimonials;

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(testimonial =>
                testimonial.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                testimonial.testimonial_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                testimonial.customer_location?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Status filter
        if (statusFilter !== "all") {
            if (statusFilter === "published") {
                filtered = filtered.filter(t => t.published);
            } else if (statusFilter === "draft") {
                filtered = filtered.filter(t => !t.published);
            } else if (statusFilter === "featured") {
                filtered = filtered.filter(t => t.featured);
            } else if (statusFilter === "verified") {
                filtered = filtered.filter(t => t.verified);
            }
        }

        // Rating filter
        if (ratingFilter !== "all") {
            const rating = parseInt(ratingFilter);
            filtered = filtered.filter(t => t.rating === rating);
        }

        setFilteredTestimonials(filtered);
    };

    const handleDelete = async (id: string, customerName: string) => {
        if (!confirm(`Apakah Anda yakin ingin menghapus testimoni dari "${customerName}"?`)) {
            return;
        }

        const success = await deleteTestimonial(id);
        if (success) {
            loadData(); // Reload data
        } else {
            alert("Gagal menghapus testimoni");
        }
    };

    const togglePublishStatus = async (testimonial: Testimonial) => {
        try {
            const supabase = createClient();
            await supabase
                .from('testimonials')
                .update({ published: !testimonial.published })
                .eq('id', testimonial.id);
            loadData();
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Gagal mengubah status");
        }
    };

    const toggleFeaturedStatus = async (testimonial: Testimonial) => {
        try {
            const supabase = createClient();
            await supabase
                .from('testimonials')
                .update({ featured: !testimonial.featured })
                .eq('id', testimonial.id);
            loadData();
        } catch (error) {
            console.error("Error updating featured status:", error);
            alert("Gagal mengubah status featured");
        }
    };

    const toggleVerifiedStatus = async (testimonial: Testimonial) => {
        try {
            const supabase = createClient();
            await supabase
                .from('testimonials')
                .update({ verified: !testimonial.verified })
                .eq('id', testimonial.id);
            loadData();
        } catch (error) {
            console.error("Error updating verified status:", error);
            alert("Gagal mengubah status verified");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p>Memuat testimoni...</p>
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
                            <h1 className="text-xl font-bold">Kelola Testimoni</h1>
                        </div>
                        <Link href="/admin/testimonials/new">
                            <Button>
                                <PlusCircle className="h-4 w-4 mr-2" />
                                Tambah Testimoni Baru
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
                        <div className="grid gap-4 md:grid-cols-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Cari testimoni..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>

                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Status</SelectItem>
                                    <SelectItem value="published">Published</SelectItem>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="featured">Featured</SelectItem>
                                    <SelectItem value="verified">Verified</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={ratingFilter} onValueChange={setRatingFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Rating" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Rating</SelectItem>
                                    <SelectItem value="5">5 Bintang</SelectItem>
                                    <SelectItem value="4">4 Bintang</SelectItem>
                                    <SelectItem value="3">3 Bintang</SelectItem>
                                    <SelectItem value="2">2 Bintang</SelectItem>
                                    <SelectItem value="1">1 Bintang</SelectItem>
                                </SelectContent>
                            </Select>

                            <div className="text-sm text-muted-foreground flex items-center">
                                Menampilkan {filteredTestimonials.length} dari {testimonials.length} testimoni
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Testimonials List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Testimoni</CardTitle>
                        <CardDescription>
                            Kelola semua testimoni pelanggan
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {filteredTestimonials.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-muted-foreground">Tidak ada testimoni yang ditemukan</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredTestimonials.map((testimonial) => (
                                    <div
                                        key={testimonial.id}
                                        className="flex items-start justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3 className="font-medium">{testimonial.customer_name}</h3>
                                                <div className="flex gap-2 flex-wrap">
                                                    <Badge
                                                        variant={testimonial.published ? "default" : "secondary"}
                                                        className="cursor-pointer"
                                                        onClick={() => togglePublishStatus(testimonial)}
                                                    >
                                                        {testimonial.published ? "Published" : "Draft"}
                                                    </Badge>
                                                    {testimonial.featured && (
                                                        <Badge
                                                            variant="outline"
                                                            className="cursor-pointer"
                                                            onClick={() => toggleFeaturedStatus(testimonial)}
                                                        >
                                                            Featured
                                                        </Badge>
                                                    )}
                                                    {testimonial.verified && (
                                                        <Badge
                                                            variant="outline"
                                                            className="cursor-pointer bg-blue-50 text-blue-600 border-blue-200"
                                                            onClick={() => toggleVerifiedStatus(testimonial)}
                                                        >
                                                            <CheckCircle className="h-3 w-3 mr-1" />
                                                            Verified
                                                        </Badge>
                                                    )}
                                                    {testimonial.project_type && (
                                                        <Badge variant="outline">{testimonial.project_type}</Badge>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                                                "{testimonial.testimonial_text}"
                                            </p>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                    {testimonial.rating}/5
                                                </span>
                                                {testimonial.customer_location && (
                                                    <span>📍 {testimonial.customer_location}</span>
                                                )}
                                                <span className="flex items-center gap-1">
                                                    <Eye className="h-3 w-3" />
                                                    {testimonial.views} views
                                                </span>
                                                <span>
                                                    {formatDistanceToNow(new Date(testimonial.created_at), {
                                                        addSuffix: true,
                                                        locale: id
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 ml-4">
                                            <Link href={`/admin/testimonials/edit/${testimonial.id}`}>
                                                <Button variant="ghost" size="sm" title="Edit testimoni">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(testimonial.id, testimonial.customer_name)}
                                                className="text-destructive hover:text-destructive"
                                                title="Hapus testimoni"
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
