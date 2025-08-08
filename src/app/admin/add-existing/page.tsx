"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, UserPlus, Mail } from "lucide-react";
import Link from "next/link";

export default function AddExistingUserPage() {
  const [email, setEmail] = useState("aisyahnobita@gmail.com");
  const [name, setName] = useState("Aisyah Admin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAddExisting = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const supabase = createClient();
      
      // 1. Get user by email from auth.users
      const { data: users, error: usersError } = await supabase
        .from('auth.users')
        .select('id, email')
        .eq('email', email)
        .single();

      if (usersError) {
        // Try alternative method using RPC or direct query
        setError(`User dengan email ${email} tidak ditemukan di database. Pastikan user sudah terdaftar.`);
        return;
      }

      if (!users) {
        setError(`User dengan email ${email} tidak ditemukan.`);
        return;
      }

      // 2. Add to admin_users table
      const { error: adminError } = await supabase
        .from('admin_users')
        .upsert([
          {
            user_id: users.id,
            name: name,
            role: 'admin'
          }
        ], {
          onConflict: 'user_id'
        });

      if (adminError) {
        setError(`Error menambahkan ke admin: ${adminError.message}`);
        return;
      }

      setSuccess(`User ${email} berhasil ditambahkan sebagai admin! User ID: ${users.id}`);
      
    } catch (err) {
      setError("Terjadi kesalahan saat menambahkan user sebagai admin.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDirectAdd = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Use API route to add existing user as admin (bypasses RLS)
      const response = await fetch('/api/admin/add-existing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: '18d27cf9-150a-4f56-98eb-9d21455724cf',
          name: 'Aisyah Admin'
        })
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Failed to add user as admin');
        return;
      }

      setSuccess(`User aisyahnobita@gmail.com berhasil ditambahkan sebagai admin!`);
      
    } catch (err) {
      setError("Terjadi kesalahan saat menambahkan admin.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-2xl font-bold text-primary mb-2">Jaya Sticker Indonesia</h1>
          </Link>
          <p className="text-muted-foreground">Tambah Admin Existing</p>
        </div>

        {/* Add Existing Card */}
        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
              <UserPlus className="h-5 w-5" />
              Tambah User Existing ke Admin
            </CardTitle>
            <CardDescription className="text-center">
              Tambahkan user yang sudah terdaftar sebagai admin
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-4">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            {/* Quick Fix Button */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-medium text-blue-900 mb-2">Quick Fix untuk aisyahnobita@gmail.com</h3>
              <p className="text-sm text-blue-700 mb-3">
                Langsung tambahkan user yang sudah diketahui sebagai admin
              </p>
              <Button
                onClick={handleDirectAdd}
                disabled={loading}
                className="w-full"
                variant="outline"
              >
                {loading ? "Menambahkan..." : "Tambah aisyahnobita@gmail.com sebagai Admin"}
              </Button>
            </div>

            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Atau manual</span>
              </div>
            </div>

            <form onSubmit={handleAddExisting} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Admin</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Nama lengkap admin"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email User yang Sudah Ada</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Menambahkan..." : "Tambah ke Admin"}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <Link
                href="/admin/setup"
                className="text-sm text-primary hover:text-primary/80 transition-colors block"
              >
                Buat user admin baru
              </Link>
              <Link
                href="/admin/login"
                className="text-sm text-primary hover:text-primary/80 transition-colors block"
              >
                Login ke admin panel
              </Link>
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-primary transition-colors block"
              >
                ← Kembali ke Website
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 Jaya Sticker Indonesia. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}