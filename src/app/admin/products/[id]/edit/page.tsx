"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Product } from "@/lib/supabase-optimized";
import ProductForm from "@/components/admin/ProductForm";

export default function EditProductPage() {
    const params = useParams();
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProduct();
    }, [params.id]);

    const loadProduct = async () => {
        try {
            const id = params.id as string;
            const response = await fetch(`/api/admin/products/${id}`, {
                cache: 'no-store'
            });

            if (!response.ok) {
                alert("Produk tidak ditemukan");
                router.push("/admin/products");
                return;
            }

            const data = await response.json();
            setProduct(data);
        } catch (error) {
            console.error("Error loading product:", error);
            alert("Gagal memuat produk");
            router.push("/admin/products");
        } finally {
            setLoading(false);
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

    if (!product) {
        return null;
    }

    return <ProductForm product={product} mode="edit" />;
}
