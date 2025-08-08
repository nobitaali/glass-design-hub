"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";
import { blogService } from "@/lib/supabase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Upload,
  X,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import Link from "next/link";

export default function NewBlogPostPage() {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "",
    author_bio: "",
    category: "",
    tags: [] as string[],
    image_url: "",
    featured: false,
    published: false,
    read_time: 5,
    seo_meta_title: "",
    seo_meta_description: "",
    seo_keywords: [] as string[]
  });

  const [categories, setCategories] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [newKeyword, setNewKeyword] = useState("");
  const [loading, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    loadCategories();
  }, []);

  useEffect(() => {
    // Auto-generate slug from title
    if (formData.title && !formData.slug) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData(prev => ({ ...prev, slug }));
    }

    // Auto-generate SEO meta title if not set
    if (formData.title && !formData.seo_meta_title) {
      setFormData(prev => ({ 
        ...prev, 
        seo_meta_title: `${formData.title} - Glass Design Hub` 
      }));
    }
  }, [formData.title]);

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

    // Set default author
    setFormData(prev => ({ 
      ...prev, 
      author: profile.name || user.email?.split('@')[0] || 'Admin'
    }));
  };

  const loadCategories = async () => {
    try {
      const blogCategories = await blogService.getAllCategories();
      setCategories(blogCategories.map(cat => cat.name));
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError("");
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !formData.seo_keywords.includes(newKeyword.trim())) {
      setFormData(prev => ({
        ...prev,
        seo_keywords: [...prev.seo_keywords, newKeyword.trim()]
      }));
      setNewKeyword("");
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      seo_keywords: prev.seo_keywords.filter(keyword => keyword !== keywordToRemove)
    }));
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  const handleContentChange = (content: string) => {
    const readTime = calculateReadTime(content);
    setFormData(prev => ({ 
      ...prev, 
      content,
      read_time: readTime
    }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) return "Judul artikel harus diisi";
    if (!formData.slug.trim()) return "Slug artikel harus diisi";
    if (!formData.excerpt.trim()) return "Excerpt artikel harus diisi";
    if (!formData.content.trim()) return "Konten artikel harus diisi";
    if (!formData.author.trim()) return "Nama penulis harus diisi";
    if (!formData.category) return "Kategori harus dipilih";
    if (!formData.image_url.trim()) return "URL gambar harus diisi";
    if (formData.tags.length === 0) return "Minimal satu tag harus ditambahkan";
    return null;
  };

  const handleSave = async (publishNow = false) => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);
    setError("");

    try {
      const postData = {
        ...formData,
        published: publishNow,
        published_at: publishNow ? new Date().toISOString() : formData.published ? new Date().toISOString() : null
      };

      const result = await blogService.createPost(postData);
      
      if (result) {
        setSuccess(`Artikel berhasil ${publishNow ? 'dipublikasi' : 'disimpan sebagai draft'}!`);
        setTimeout(() => {
          router.push("/admin/blog");
        }, 2000);
      } else {
        setError("Gagal menyimpan artikel");
      }
    } catch (error) {
      console.error("Error saving post:", error);
      setError("Terjadi kesalahan saat menyimpan artikel");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/blog">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Kembali
                </Button>
              </Link>
              <h1 className="text-xl font-bold">Buat Artikel Baru</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => handleSave(false)}
                disabled={loading}
              >
                <Save className="h-4 w-4 mr-2" />
                Simpan Draft
              </Button>
              <Button
                onClick={() => handleSave(true)}
                disabled={loading}
              >
                <Eye className="h-4 w-4 mr-2" />
                Publikasi
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informasi Dasar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Judul Artikel *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Masukkan judul artikel"
                  />
                </div>

                <div>
                  <Label htmlFor="slug">Slug URL *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => handleInputChange("slug", e.target.value)}
                    placeholder="url-artikel-anda"
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt *</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => handleInputChange("excerpt", e.target.value)}
                    placeholder="Ringkasan singkat artikel (150-200 karakter)"
                    rows={3}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {formData.excerpt.length}/200 karakter
                  </p>
                </div>

                <div>
                  <Label htmlFor="content">Konten Artikel *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => handleContentChange(e.target.value)}
                    placeholder="Tulis konten artikel dalam format HTML..."
                    rows={15}
                    className="font-mono text-sm"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Estimasi waktu baca: {formData.read_time} menit
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* SEO Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan SEO</CardTitle>
                <CardDescription>
                  Optimasi artikel untuk mesin pencari
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="seo_title">Meta Title</Label>
                  <Input
                    id="seo_title"
                    value={formData.seo_meta_title}
                    onChange={(e) => handleInputChange("seo_meta_title", e.target.value)}
                    placeholder="Judul untuk SEO (maks 60 karakter)"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {formData.seo_meta_title.length}/60 karakter
                  </p>
                </div>

                <div>
                  <Label htmlFor="seo_description">Meta Description</Label>
                  <Textarea
                    id="seo_description"
                    value={formData.seo_meta_description}
                    onChange={(e) => handleInputChange("seo_meta_description", e.target.value)}
                    placeholder="Deskripsi untuk SEO (maks 160 karakter)"
                    rows={3}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {formData.seo_meta_description.length}/160 karakter
                  </p>
                </div>

                <div>
                  <Label>SEO Keywords</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newKeyword}
                      onChange={(e) => setNewKeyword(e.target.value)}
                      placeholder="Tambah keyword SEO"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                    />
                    <Button type="button" onClick={addKeyword} variant="outline">
                      Tambah
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.seo_keywords.map((keyword, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {keyword}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => removeKeyword(keyword)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Publikasi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="author">Penulis *</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => handleInputChange("author", e.target.value)}
                    placeholder="Nama penulis"
                  />
                </div>

                <div>
                  <Label htmlFor="author_bio">Bio Penulis</Label>
                  <Textarea
                    id="author_bio"
                    value={formData.author_bio}
                    onChange={(e) => handleInputChange("author_bio", e.target.value)}
                    placeholder="Bio singkat penulis"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="category">Kategori *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => handleInputChange("featured", checked)}
                  />
                  <Label htmlFor="featured">Artikel Unggulan</Label>
                </div>
              </CardContent>
            </Card>

            {/* Media */}
            <Card>
              <CardHeader>
                <CardTitle>Media</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="image_url">URL Gambar Utama *</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => handleInputChange("image_url", e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Ukuran optimal: 1200x630px
                  </p>
                </div>

                {formData.image_url && (
                  <div className="relative">
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags *</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Tambah tag"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} variant="outline">
                    Tambah
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      #{tag}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}