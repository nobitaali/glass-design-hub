'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function BlogPostError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Blog post error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
          <Link href="/blog" className="text-muted-foreground hover:text-primary">
            Blog
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground">Error</span>
        </div>

        {/* Error Content */}
        <div className="text-center space-y-6 py-12">
          {/* Error Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-10 h-10 text-destructive" />
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              Gagal Memuat Artikel
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Maaf, kami mengalami masalah saat memuat artikel ini. 
              Artikel mungkin telah dihapus atau terjadi kesalahan sistem.
            </p>
          </div>

          {/* Error Details (Development Only) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="p-4 bg-muted rounded-lg text-left max-w-md mx-auto">
              <p className="text-sm font-mono text-destructive mb-2">
                Error: {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-muted-foreground">
                  Digest: {error.digest}
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              onClick={reset}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Coba Lagi
            </Button>
            <Link href="/blog">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Blog
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Halaman Utama
              </Button>
            </Link>
          </div>

          {/* Help Text */}
          <p className="text-sm text-muted-foreground">
            Masalah berlanjut? Hubungi kami di{' '}
            <a 
              href="https://wa.me/6285156275565" 
              className="text-primary hover:underline"
            >
              WhatsApp
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
