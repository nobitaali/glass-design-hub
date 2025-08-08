"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, User, Mail } from "lucide-react";
import Link from "next/link";

export default function AdminSetupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const supabase = createClient();
      
      // 1. Try to sign up the user first
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      let userId = null;

      if (signUpError) {
        // If user already exists, try to get existing user
        if (signUpError.message.includes('already registered') || signUpError.message.includes('already been registered')) {
          // Try to sign in to get user ID
          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (signInError) {
            setError(`User sudah ada tapi password salah: ${signInError.message}`);
            return;
          }

          if (!signInData.user) {
            setError("Gagal mendapatkan data user yang sudah ada");
            return;
          }

          userId = signInData.user.id;
          
          // Sign out immediately since we just want the user ID
          await supabase.auth.signOut();
        } else {
          setError(`Error creating user: ${signUpError.message}`);
          return;
        }
      } else {
        if (!signUpData.user) {
          setError("Failed to create user");
          return;
        }
        userId = signUpData.user.id;
      }

      // 2. Create admin record (use upsert to handle existing records)
      const { error: adminError } = await supabase
        .from('admin_users')
        .upsert([
          {
            user_id: userId,
            name: name,
            role: 'admin'
          }
        ], {
          onConflict: 'user_id'
        });

      if (adminError) {
        setError(`Error creating admin record: ${adminError.message}`);
        return;
      }

      setSuccess(`Admin user berhasil dibuat/diperbarui! User ID: ${userId}. Silakan login di /admin/login`);
      
      // Clear form
      setEmail("");
      setPassword("");
      setName("");

    } catch (err) {
      setError("Terjadi kesalahan saat membuat admin user.");
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
            <h1 className="text-2xl font-bold text-primary mb-2">Glass Design Hub</h1>
          </Link>
          <p className="text-muted-foreground">Admin Setup</p>
        </div>

        {/* Setup Card */}
        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
              <User className="h-5 w-5" />
              Setup Admin User
            </CardTitle>
            <CardDescription className="text-center">
              Buat user admin pertama untuk mengakses panel admin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSetup} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Nama Admin</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Nama lengkap admin"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@glassdesignhub.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password minimal 6 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Membuat Admin..." : "Buat Admin User"}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <Link
                href="/admin/login"
                className="text-sm text-primary hover:text-primary/80 transition-colors block"
              >
                Sudah punya akun admin? Login di sini
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
          <p>© 2024 Glass Design Hub. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}