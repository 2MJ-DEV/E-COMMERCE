"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type SellerProduct = {
  id: string;
  name: string;
  description: string | null;
  priceCents: number;
  category: "legume" | "viande";
  unit: "kg" | "piece" | "botte";
  stock: number;
  isActive: boolean;
  image: string | null;
  createdAt: string;
};

type SellerProductResponse = {
  items: SellerProduct[];
};

export function SellerProductManager() {
  const [products, setProducts] = useState<SellerProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState<"legume" | "viande">("legume");
  const [unit, setUnit] = useState<"kg" | "piece" | "botte">("kg");
  const [stock, setStock] = useState("0");
  const [imageUrl, setImageUrl] = useState("");

  const loadProducts = async () => {
    try {
      const token = window.localStorage.getItem("auth_token");
      if (!token) {
        setError("Connectez-vous en tant que fournisseur.");
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/seller/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = (await response.json()) as SellerProductResponse | { error?: string };
      if (!response.ok || !("items" in data)) {
        throw new Error(("error" in data && data.error) || "Impossible de charger vos produits.");
      }

      setProducts(data.items);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de chargement.");
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const token = window.localStorage.getItem("auth_token");
      if (!token) {
        throw new Error("Session invalide. Reconnectez-vous.");
      }

      const response = await fetch(`${API_URL}/seller/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim() || undefined,
          price: Number(price),
          category,
          unit,
          stock: Number(stock),
          imageUrl: imageUrl.trim() || undefined,
        }),
      });

      const data = (await response.json()) as { item?: SellerProduct; error?: string };
      if (!response.ok || !data.item) {
        throw new Error(data.error || "Creation du produit impossible.");
      }

      setProducts((prev) => [data.item as SellerProduct, ...prev]);
      setName("");
      setDescription("");
      setPrice("");
      setCategory("legume");
      setUnit("kg");
      setStock("0");
      setImageUrl("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de la creation.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Creer un produit marketplace</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-3 sm:grid-cols-2" onSubmit={handleSubmit}>
            <Input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Nom du produit"
              required
            />
            <Input
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              placeholder="Prix (ex: 12.5)"
              type="number"
              min="0.01"
              step="0.01"
              required
            />
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value as "legume" | "viande")}
              className="h-9 rounded-md border px-3 text-sm"
            >
              <option value="legume">Legume</option>
              <option value="viande">Viande</option>
            </select>
            <select
              value={unit}
              onChange={(event) => setUnit(event.target.value as "kg" | "piece" | "botte")}
              className="h-9 rounded-md border px-3 text-sm"
            >
              <option value="kg">KG</option>
              <option value="piece">PIECE</option>
              <option value="botte">BOTTE</option>
            </select>
            <Input
              value={stock}
              onChange={(event) => setStock(event.target.value)}
              placeholder="Stock"
              type="number"
              min="0"
              step="1"
              required
            />
            <Input
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              placeholder="URL image (optionnel)"
            />
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Description (optionnel)"
              className="sm:col-span-2 min-h-24 rounded-md border px-3 py-2 text-sm"
            />
            {error ? <p className="sm:col-span-2 text-sm text-red-600">{error}</p> : null}
            <div className="sm:col-span-2">
              <Button type="submit" disabled={submitting}>
                {submitting ? "Creation..." : "Creer le produit"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Mes produits</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {loading ? <p>Chargement...</p> : null}
          {!loading && products.length === 0 ? <p>Aucun produit cree pour le moment.</p> : null}
          {!loading
            ? products.map((item) => (
                <div key={item.id} className="rounded-lg border p-4">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-muted-foreground">
                    {item.category} | {item.unit} | stock {item.stock}
                  </p>
                  <p className="mt-1">
                    Prix: {(item.priceCents / 100).toLocaleString("fr-FR", { maximumFractionDigits: 2 })} $
                  </p>
                </div>
              ))
            : null}
        </CardContent>
      </Card>
    </div>
  );
}
