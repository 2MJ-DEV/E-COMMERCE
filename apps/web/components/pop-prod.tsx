"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useCart } from "@/components/cart/cart-provider";

type Product = {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  image: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const PopProd = () => {
  const router = useRouter();
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/products?limit=8`, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("failed_to_fetch_products");
        }

        const data = (await response.json()) as { items?: Product[] };
        setProducts(Array.isArray(data.items) ? data.items : []);
      } catch {
        setError("Impossible de charger les produits pour le moment.");
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
    return () => controller.abort();
  }, []);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    setJustAddedId(product.id);
    setTimeout(() => setJustAddedId(null), 1200);
  };

  return (
    <section>
      <div className="relative pt-24">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6">
          <h2 className="text-3xl font-sans">Populaires sur marketfresh store</h2>

          {isLoading ? <p className="text-sm text-muted-foreground">Chargement des produits...</p> : null}
          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <article
                key={product.id}
                role="button"
                tabIndex={0}
                onClick={() => router.push(`/marketplace/${product.id}`)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    router.push(`/marketplace/${product.id}`);
                  }
                }}
                className="cursor-pointer rounded-[20px] border p-2 shadow-md"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={360}
                  height={260}
                  className="h-44 w-full rounded-xl object-cover"
                />

                <div className="pt-3">
                  <h3 className="font-semibold">{product.name}</h3>
                  {product.description ? (
                    <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
                  ) : null}
                  <div className="mt-2 flex items-center gap-3">
                    <span className="font-semibold">${product.price.toFixed(2)}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="default"
                    className="mt-3 w-full"
                    disabled={isLoading || Boolean(error)}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleAddToCart(product);
                    }}
                  >
                    {justAddedId === product.id ? "Ajoute" : "Ajouter au panier"}
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopProd;
