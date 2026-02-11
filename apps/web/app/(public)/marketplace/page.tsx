"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  image: string;
  category: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function MarketplacePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        setIsLoading(true);
        setError("");
        const response = await fetch(`${API_URL}/products?limit=48`, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("failed_to_fetch_products");
        }

        const data = (await response.json()) as { items?: Product[] };
        setProducts(Array.isArray(data.items) ? data.items : []);
      } catch {
        setError("Impossible de charger les produits.");
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
    return () => controller.abort();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-semibold">Marketplace aliments frais</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Selection locale de legumes, viandes et produits frais du jour.
      </p>

      {isLoading ? <p className="mt-5 text-sm text-muted-foreground">Chargement...</p> : null}
      {error ? <p className="mt-5 text-sm text-red-600">{error}</p> : null}

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/marketplace/${product.id}`}
            className="rounded-2xl border p-2 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={360}
              height={260}
              className="h-44 w-full rounded-xl object-cover"
            />
            <div className="pt-3">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{product.category}</p>
              <h2 className="font-semibold">{product.name}</h2>
              {product.description ? (
                <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
              ) : null}
              <p className="mt-2 text-sm font-semibold">${product.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
