"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Product, productService } from "@/lib/supabase-optimized";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, X, Save, ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";

interface ProductFormProps {
    product?: Product;
    mode: "create" | "edit";
}

export default function ProductForm({ product, mode }: ProductFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    const [formData, setFormData] = useState({
        slug: product?.slug || "",
        title: product?.title || "",
        description: product?.description || "",
        long_description: product?.long_description || "",
        category: product?.category || "",
        price: product?.price || "",
        features: product?.features || [],
        specifications: product?.specifications || {},
        seo_meta_title: product?.seo_meta_title || "",
        seo_meta_description: product?.seo_meta_description || "",
        seo_keywords: product?.seo_keywords || [],
    });

    const [imageUrl, setImageUrl] = useState(product?.image_url || "");
    const [featureInput, setFeatureInput] = useState("");
    const [keywordInput, setKeywordInput] = useState("");
    const [specKey, setSpecKey] = useState("");
    const [specValue, setSpecValue] = useState("");

    const imageInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleImageUpload = async (file: File) => {
        setLoading(true);
        try {
            // Delete old image if exists
            if (imageUrl) {
                await productService.deleteProductImage(imageUrl);
            }

            const url = await productService.uploadProductImage(file, 'main');
            if (url) {
                setImageUrl(url);
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

    const handleRemoveImage = async () => {
        if (!imageUrl) return;

        if (!confirm('Apakah Anda yakin ingin menghapus gambar ini?')) {
            return;
        }

        setLoading(true);
        try {
            const success = await productService.deleteProductImage(imageUrl);
            if (success) {
                setImageUrl('');
            } else {
                alert("Gagal menghapus gambar");
            }
        } catch (error) {
            console.error("Error removing image:", error);
            alert("Gagal menghapus gambar");
        } finally {
            setLoading(false);
        }
    };

    const handleAddFeature = () => {
        if (featureInput.trim() && !formData.features.includes(featureInput.trim())) {
            setFormData(prev => ({
                ...prev,
                features: [...prev.features, featureInput.trim()]
            }));
            setFeatureInput("");
        }
    };

    const handleRemoveFeature = (feature: string) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter(f => f !== feature)
        }));
    };

    const handleAddKeyword = () => {
        if (keywordInput.trim() && !formData.seo_keywords.includes(keywordInput.trim())) {
            setFormData(prev => ({
                ...prev,
                seo_keywords: [...prev.seo_keywords, keywordInput.trim()]
            }));
            setKeywordInput("");
        }
    };

    const handleRemoveKeyword = (keyword: string) => {
        setFormData(prev => ({
            ...prev,
            seo_keywords: prev.seo_keywords.filter(k => k !== keyword)
        }));
    };

    const handleAddSpecification = () => {
        if (specKey.trim() && specValue.trim()) {
            setFormData(prev => ({
                ...prev,
                specifications: {
                    ...prev.specifications,
                    [specKey.trim()]: specValue.trim()
                }
            }));
            setSpecKey("");
            setSpecValue("");
        }
    };

    const handleRemoveSpecification = (key: string) => {
        setFormData(prev => {
            const newSpecs = { ...prev.specifications };
            delete newSpecs[key];
            return {
                ...prev,
                specifications: newSpecs
            };
        });
    };

    const validateForm = (): boolean => {
        const newErrors: string[] = [];

        if (!formData.title.trim()) newErrors.push("Judul produk harus diisi");
        if (!formData.slug.trim()) newErrors.push("Slug harus diisi");
        if (!formData.description.trim()) newErrors.push("Deskripsi harus diisi");
        if (!formData.category.trim()) newErrors.push("Kategori harus diisi");
        if (!formData.price.trim()) newErrors.push("Harga harus diisi");
        if (!imageUrl) newErrors.push("Gambar produk harus diupload");

        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setErrors([]);

        try {
            const productData = {
                ...formData,
                image_url: imageUrl,
                additional_images: [],
            };

            let response;
            if (mode === "create") {
                response = await fetch('/api/admin/products', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(productData),
                });
            } else {
                response = await fetch(`/api/admin/products/${product!.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(productData),
                });
            }

            if (response.ok) {
                router.refresh();
                router.push("/admin/products");
            } else {
                const error = await response.json();
                console.error('Error response:', error);
                alert(`Gagal ${mode === "create" ? "membuat" : "mengupdate"} produk: ${error.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error("Error saving product:", error);
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
                            <Link href="/admin/products">
                                <Button variant="ghost" size="sm">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Kembali
                                </Button>
                            </Link>
                            <h1 className="text-xl font-bold">
                                {mode === "create" ? "Tambah Produk Baru" : "Edit Produk"}
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
                    {/* Basic Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Dasar</CardTitle>
                            <CardDescription>Informasi utama produk</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="title">Judul Produk *</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => handleInputChange("title", e.target.value)}
                                    placeholder="Contoh: Sandblast Polos"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="slug">Slug *</Label>
                                <Input
                                    id="slug"
                                    value={formData.slug}
                                    onChange={(e) => handleInputChange("slug", e.target.value)}
                                    placeholder="Contoh: sandblast-polos"
                                    required
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    URL-friendly identifier (gunakan huruf kecil dan tanda hubung)
                                </p>
                            </div>

                            <div>
                                <Label htmlFor="category">Kategori *</Label>
                                <Select
                                    value={formData.category}
                                    onValueChange={(value) => handleInputChange("category", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih kategori" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="SAND BLAST">SAND BLAST</SelectItem>
                                        <SelectItem value="KACA FILM">KACA FILM</SelectItem>
                                        <SelectItem value="STIKER & VINYL">STIKER & VINYL</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="price">Harga *</Label>
                                <Input
                                    id="price"
                                    value={formData.price}
                                    onChange={(e) => handleInputChange("price", e.target.value)}
                                    placeholder="Contoh: Mulai Rp 85.000/m²"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="description">Deskripsi Singkat *</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => handleInputChange("description", e.target.value)}
                                    placeholder="Deskripsi singkat produk..."
                                    rows={3}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="long_description">Deskripsi Lengkap</Label>
                                <Textarea
                                    id="long_description"
                                    value={formData.long_description}
                                    onChange={(e) => handleInputChange("long_description", e.target.value)}
                                    placeholder="Deskripsi lengkap produk..."
                                    rows={6}
                                />
                            </div>

                            {/* Image Upload */}
                            <div>
                                <Label>Gambar Produk *</Label>
                                <div className="mt-2">
                                    {imageUrl ? (
                                        <div className="relative inline-block">
                                            <img src={imageUrl} alt="Product" className="w-full max-w-md h-48 object-cover rounded-lg border-2" />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                className="absolute top-2 right-2"
                                                onClick={handleRemoveImage}
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
                                                    if (file) handleImageUpload(file);
                                                }}
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => imageInputRef.current?.click()}
                                            >
                                                <Upload className="h-4 w-4 mr-2" />
                                                Upload Gambar
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Features */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Fitur Produk</CardTitle>
                            <CardDescription>Daftar fitur dan keunggulan produk</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="features">Tambah Fitur</Label>
                                <div className="flex gap-2 mt-2">
                                    <Input
                                        id="features"
                                        value={featureInput}
                                        onChange={(e) => setFeatureInput(e.target.value)}
                                        placeholder="Contoh: Tahan lama dan mudah perawatan"
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleAddFeature();
                                            }
                                        }}
                                    />
                                    <Button type="button" onClick={handleAddFeature}>
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {formData.features.map((feature, index) => (
                                        <Badge key={index} variant="secondary">
                                            {feature}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveFeature(feature)}
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

                    {/* Specifications */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Spesifikasi</CardTitle>
                            <CardDescription>Detail spesifikasi teknis produk</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label>Tambah Spesifikasi</Label>
                                <div className="flex gap-2 mt-2">
                                    <Input
                                        value={specKey}
                                        onChange={(e) => setSpecKey(e.target.value)}
                                        placeholder="Nama (contoh: Ketebalan)"
                                        className="flex-1"
                                    />
                                    <Input
                                        value={specValue}
                                        onChange={(e) => setSpecValue(e.target.value)}
                                        placeholder="Nilai (contoh: 0.5-1mm)"
                                        className="flex-1"
                                    />
                                    <Button type="button" onClick={handleAddSpecification}>
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="mt-3 space-y-2">
                                    {Object.entries(formData.specifications).map(([key, value]) => (
                                        <div key={key} className="flex items-center justify-between p-2 border rounded">
                                            <span className="text-sm">
                                                <strong>{key}:</strong> {value}
                                            </span>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleRemoveSpecification(key)}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* SEO */}
                    <Card>
                        <CardHeader>
                            <CardTitle>SEO</CardTitle>
                            <CardDescription>Optimasi untuk mesin pencari</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="seo_meta_title">Meta Title</Label>
                                <Input
                                    id="seo_meta_title"
                                    value={formData.seo_meta_title}
                                    onChange={(e) => handleInputChange("seo_meta_title", e.target.value)}
                                    placeholder="Judul untuk SEO"
                                />
                            </div>

                            <div>
                                <Label htmlFor="seo_meta_description">Meta Description</Label>
                                <Textarea
                                    id="seo_meta_description"
                                    value={formData.seo_meta_description}
                                    onChange={(e) => handleInputChange("seo_meta_description", e.target.value)}
                                    placeholder="Deskripsi untuk SEO"
                                    rows={3}
                                />
                            </div>

                            <div>
                                <Label htmlFor="keywords">SEO Keywords</Label>
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
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {formData.seo_keywords.map((keyword, index) => (
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

                    {/* Submit Buttons */}
                    <div className="flex gap-4">
                        <Button type="submit" disabled={loading} className="flex-1">
                            <Save className="h-4 w-4 mr-2" />
                            {loading ? "Menyimpan..." : mode === "create" ? "Buat Produk" : "Update Produk"}
                        </Button>
                        <Link href="/admin/products" className="flex-1">
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
