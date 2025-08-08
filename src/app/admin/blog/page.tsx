"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";
import { blogService, BlogPost } from "@/lib/supabase";
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
  Calendar,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

export default function BlogManagementPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [categories, setCategories] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    loadData();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [posts, searchTerm, statusFilter, categoryFilter]);

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
      const [allPosts, blogCategories] = await Promise.all([
        blogService.getAllPostsAdmin(),
        blogService.getAllCategories()
      ]);

      setPosts(allPosts);
      setCategories(blogCategories.map(cat => cat.name));
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterPosts = () => {
    let filtered = posts;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      if (statusFilter === "published") {
        filtered = filtered.filter(post => post.published);
      } else if (statusFilter === "draft") {
        filtered = filtered.filter(post => !post.published);
      } else if (statusFilter === "featured") {
        filtered = filtered.filter(post => post.featured);
      }
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(post => post.category === categoryFilter);
    }

    setFilteredPosts(filtered);
  };

  const handleDeletePost = async (postId: string, postTitle: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus artikel "${postTitle}"?`)) {
      return;
    }

    try {
      await blogService.deletePost(postId);
      loadData(); // Reload data
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Gagal menghapus artikel");
    }
  };

  const togglePublishStatus = async (post: BlogPost) => {
    try {
      await blogService.updatePost(post.id, {
        published: !post.published,
        published_at: !post.published ? new Date().toISOString() : post.published_at
      });
      loadData(); // Reload data
    } catch (error) {
      console.error("Error updating post status:", error);
      alert("Gagal mengubah status artikel");
    }
  };

  const toggleFeaturedStatus = async (post: BlogPost) => {
    try {
      await blogService.updatePost(post.id, {
        featured: !post.featured
      });
      loadData(); // Reload data
    } catch (error) {
      console.error("Error updating featured status:", error);
      alert("Gagal mengubah status featured");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Memuat artikel...</p>
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
              <h1 className="text-xl font-bold">Kelola Artikel Blog</h1>
            </div>
            <Link href="/admin/blog/new">
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Buat Artikel Baru
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
                  placeholder="Cari artikel..."
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
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="text-sm text-muted-foreground flex items-center">
                Menampilkan {filteredPosts.length} dari {posts.length} artikel
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Posts List */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Artikel</CardTitle>
            <CardDescription>
              Kelola semua artikel blog Anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredPosts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Tidak ada artikel yang ditemukan</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium line-clamp-1 flex-1">{post.title}</h3>
                        <div className="flex gap-2">
                          <Badge 
                            variant={post.published ? "default" : "secondary"}
                            className="cursor-pointer"
                            onClick={() => togglePublishStatus(post)}
                          >
                            {post.published ? "Published" : "Draft"}
                          </Badge>
                          {post.featured && (
                            <Badge 
                              variant="outline"
                              className="cursor-pointer"
                              onClick={() => toggleFeaturedStatus(post)}
                            >
                              Featured
                            </Badge>
                          )}
                          <Badge variant="outline">{post.category}</Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDistanceToNow(new Date(post.created_at), { 
                            addSuffix: true,
                            locale: id 
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {post.views} views
                        </span>
                        <span>By {post.author}</span>
                        <span>{post.read_time} menit baca</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Link href={`/blog/${post.slug}`} target="_blank">
                        <Button variant="ghost" size="sm" title="Lihat artikel">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/admin/blog/edit/${post.id}`}>
                        <Button variant="ghost" size="sm" title="Edit artikel">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePost(post.id, post.title)}
                        className="text-destructive hover:text-destructive"
                        title="Hapus artikel"
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