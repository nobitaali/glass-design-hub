"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Testimonial, createTestimonial, updateTestimonial, uploadTestimonialImage } from "@/lib/supabase-testimonials";
import { validateTestimonial } from "@/lib/testimonial-utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Upload, X, Star, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface TestimonialFormProps {
    testimonial?: Testimonial;
    mode: "create" | "edit";
}

export default function TestimonialForm({ testimonial, mode }: TestimonialFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    const [formData, setFormData] = useState({
        customer_name: testimonial?.customer_name || "",
        customer_title: testimonial?.customer_title || "",
        customer_location: testimonial?.customer_location || "",
        rating: testimonial?.rating || 5,
        testimonial_text: testimonial?.testimonial_text || "",
        project_type: testimonial?.project_type || "",
        keywords: testimonial?.keywords || [],
        featured: testimonial?.featured || false,
        verified: testimonial?.verified || false,
        published: testimonial?.published || true,
        display_order: testimonial?.display_order || 0,
    });

    const [imageUrl, setImageUrl] = useState(testimonial?.image_url || "");
    const [avatarUrl, setAvatarUrl] = useState(testimonial?.avatar_url || "");
    const [keywordInput, setKeywordInput] = useState("");

    const imageInputRef = useRef<HTMLInputElement>(null);
    const avatarInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleImageUpload = async (file: File, type: 'project' | 'avatar') => {
        setLoading(true);
        try {
            const url = await uploadTestimonialImage(file, type);
            if (url) {
                if (type === 'project') {
                    setImageUrl(url);
                } else {
                    setAvatarUrl(url);
                }
            } else {
                alert("Gagal upload gambar");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Gagal upload gambar");
        } finally {
            setLoading(false);
        }
    };

    const handleAddKeyword = () => {
        if (keywordInput.trim() && !formData.keywords.includes(keywordInput.trim())) {
            setFormData(prev => ({
                ...prev,
                keywords: [...prev.keywords, keywordInput.trim()]
            }));
            setKeywordInput("");
        }
    };

    const handleRemoveKeyword = (keyword: string) => {
        setFormData(prev => ({
            ...prev,
            keywords: prev.keywords.filter(k => k !== keyword)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate
        const validation = validateTestimonial(formData);
        if (!validation.valid) {
            setErrors(validation.errors);
            return;
        }

        setLoading(true);
        setErrors([]);

        try {
            const testimonialData = {
                ...formData,
                image_url: imageUrl || null,
                avatar_url: avatarUrl || null,
            };

            let result;
            if (mode === "create") {
                result = await createTestimonial(testimonialData);
            } else {
                result = await updateTestimonial(testimonial!.id, testimonialData);
            }

            if (result) {
                router.push("/admin/testimonials");
            } else {
                alert(`Gagal ${mode === "create" ? "membuat" : "mengupdate"} testimoni`);
            }
        } catch (error) {
            console.error("Error saving testimonial:", error);
            alert("Terjadi kesalahan saat menyimpan");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/admin/testimonials">
                                <Button variant="ghost" size="sm">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Kembali
                                </Button>
                            </Link>
                            <h1 className="text-xl font-bold">
                                {mode === "create" ? "Tambah Testimoni Baru" : "Edit Testimoni"}
                            </h1>
                        </div>
                        <Button onClick={handleSubmit} disabled={loading}>
                            <Save className="h-4 w-4 mr-2" />
                            {loading ? "Menyimpan..." : "Simpan"}
                        </Button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Errors */}
                {errors.length > 0 && (
                    <Card className="mb-6 border-destructive">
                        <CardContent className="pt-6">
                            <div className="text-destructive">
                                <strong>Terjadi kesalahan:</strong>
                                <ul className="list-disc list-inside mt-2">
                                    {errors.map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Customer Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Pelanggan</CardTitle>
                            <CardDescription>Data pelanggan yang memberikan testimoni</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="customer_name">Nama Pelanggan *</Label>
                                <Input
                                    id="customer_name"
                                    value={formData.customer_name}
                                    onChange={(e) => handleInputChange("customer_name", e.target.value)}
                                    placeholder="Contoh: Budi Santoso"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="customer_title">Jabatan/Keterangan</Label>
                                <Input
                                    id="customer_title"
                                    value={formData.customer_title}
                                    onChange={(e) => handleInputChange("customer_title", e.target.value)}
                                    placeholder="Contoh: Pemilik Rumah"
                                />
                            </div>

                            <div>
                                <Label htmlFor="customer_location">Lokasi</Label>
                                <Input
                                    id="customer_location"
                                    value={formData.customer_location}
                                    onChange={(e) => handleInputChange("customer_location", e.target.value)}
                                    placeholder="Contoh: Bantul, Yogyakarta"
                                />
                            </div>

                            {/* Avatar Upload */}
                            <div>
                                <Label>Foto Pelanggan (Optional)</Label>
                                <div className="mt-2">
                                    {avatarUrl ? (
                                        <div className="relative inline-block">
                                            <img src={avatarUrl} alt="Avatar" className="w-24 h-24 rounded-full object-cover border-2" />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                                                onClick={() => setAvatarUrl("")}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <div>
                                            <input
                                                ref={avatarInputRef}
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) handleImageUpload(file, 'avatar');
                                                }}
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => avatarInputRef.current?.click()}
                                            >
                                                <Upload className="h-4 w-4 mr-2" />
                                                Upload Foto
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Testimonial Content */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Isi Testimoni</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="rating">Rating *</Label>
                                <div className="flex items-center gap-2 mt-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => handleInputChange("rating", star)}
                                            className="focus:outline-none"
                                        >
                                            <Star
                                                className={`h-8 w-8 ${star <= formData.rating
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "text-gray-300"
                                                    }`}
                                            />
                                        </button>
                                    ))}
                                    <span className="ml-2 text-sm text-muted-foreground">
                                        {formData.rating}/5
                                    </span>
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="testimonial_text">Testimoni *</Label>
                                <Textarea
                                    id="testimonial_text"
                                    value={formData.testimonial_text}
                                    onChange={(e) => handleInputChange("testimonial_text", e.target.value)}
                                    placeholder="Tulis testimoni pelanggan di sini..."
                                    rows={6}
                                    required
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    {formData.testimonial_text.length} karakter (minimal 10)
                                </p>
                            </div>

                            <div>
                                <Label htmlFor="project_type">Jenis Proyek</Label>
                                <Select
                                    value={formData.project_type}
                                    onValueChange={(value) => handleInputChange("project_type", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih jenis proyek" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Kaca Film">Kaca Film</SelectItem>
                                        <SelectItem value="Sandblast">Sandblast</SelectItem>
                                        <SelectItem value="Cutting Sticker">Cutting Sticker</SelectItem>
                                        <SelectItem value="Stiker Oneway">Stiker Oneway</SelectItem>
                                        <SelectItem value="Stiker Dekoratif">Stiker Dekoratif</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Project Image Upload */}
                            <div>
                                <Label>Foto Hasil Pekerjaan</Label>
                                <div className="mt-2">
                                    {imageUrl ? (
                                        <div className="relative inline-block">
                                            <img src={imageUrl} alt="Project" className="w-full max-w-md h-48 object-cover rounded-lg border-2" />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                className="absolute top-2 right-2"
                                                onClick={() => setImageUrl("")}
                                            >
                                                <X className="h-4 w-4 mr-1" />
                                                Hapus
                                            </Button>
                                        </div>
                                    ) : (
                                        <div>
                                            <input
                                                ref={imageInputRef}
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) handleImageUpload(file, 'project');
                                                }}
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => imageInputRef.current?.click()}
                                            >
                                                <Upload className="h-4 w-4 mr-2" />
                                                Upload Foto Hasil
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* SEO & Keywords */}
                    <Card>
                        <CardHeader>
                            <CardTitle>SEO & Keywords</CardTitle>
                            <CardDescription>Keywords untuk optimasi pencarian</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="keywords">Keywords</Label>
                                <div className="flex gap-2 mt-2">
                                    <Input
                                        id="keywords"
                                        value={keywordInput}
                                        onChange={(e) => setKeywordInput(e.target.value)}
                                        placeholder="Tambah keyword..."
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleAddKeyword();
                                            }
                                        }}
                                    />
                                    <Button type="button" onClick={handleAddKeyword}>
                                        Tambah
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {formData.keywords.map((keyword, index) => (
                                        <Badge key={index} variant="secondary">
                                            {keyword}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveKeyword(keyword)}
                                                className="ml-2 hover:text-destructive"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Pengaturan</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="published">Published</Label>
                                    <p className="text-sm text-muted-foreground">Tampilkan di halaman publik</p>
                                </div>
                                <Switch
                                    id="published"
                                    checked={formData.published}
                                    onCheckedChange={(checked) => handleInputChange("published", checked)}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="featured">Featured</Label>
                                    <p className="text-sm text-muted-foreground">Tampilkan di homepage</p>
                                </div>
                                <Switch
                                    id="featured"
                                    checked={formData.featured}
                                    onCheckedChange={(checked) => handleInputChange("featured", checked)}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="verified">Verified</Label>
                                    <p className="text-sm text-muted-foreground">Testimoni terverifikasi</p>
                                </div>
                                <Switch
                                    id="verified"
                                    checked={formData.verified}
                                    onCheckedChange={(checked) => handleInputChange("verified", checked)}
                                />
                            </div>

                            <div>
                                <Label htmlFor="display_order">Urutan Tampilan</Label>
                                <Input
                                    id="display_order"
                                    type="number"
                                    value={formData.display_order}
                                    onChange={(e) => handleInputChange("display_order", parseInt(e.target.value) || 0)}
                                    placeholder="0"
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    Semakin kecil angka, semakin di atas urutan tampilan
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Submit Buttons */}
                    <div className="flex gap-4">
                        <Button type="submit" disabled={loading} className="flex-1">
                            <Save className="h-4 w-4 mr-2" />
                            {loading ? "Menyimpan..." : mode === "create" ? "Buat Testimoni" : "Update Testimoni"}
                        </Button>
                        <Link href="/admin/testimonials" className="flex-1">
                            <Button type="button" variant="outline" className="w-full">
                                Batal
                            </Button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
