"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Heart, Info, Leaf, Package, Snowflake, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-provider";

type ProductDetails = {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  category: string;
  image: string;
  images: string[];
  stock: number;
  unit: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const KG_PACKS = [1, 2, 3, 5];
const UNIT_PACKS = [1, 3, 6, 12];

export default function MarketplaceItemPage() {
  const params = useParams<{ slug: string }>();
  const { addItem } = useCart();

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const productId = typeof params.slug === "string" ? params.slug : "";

    async function loadDetails() {
      if (!productId) {
        setError("Produit introuvable.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/products/${productId}`, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("failed_to_fetch_product");
        }

        const data = (await response.json()) as ProductDetails;
        setProduct(data);
        setSelectedImage(data.images?.[0] || data.image);
      } catch {
        setError("Impossible de charger ce produit.");
      } finally {
        setIsLoading(false);
      }
    }

    loadDetails();
    return () => controller.abort();
  }, [params.slug]);

  const gallery = useMemo(() => {
    if (!product) return [];
    return product.images?.length ? product.images : [product.image];
  }, [product]);

  const quantityOptions = useMemo(() => {
    const unit = (product?.unit || "").toLowerCase();
    const base = unit === "kg" ? KG_PACKS : UNIT_PACKS;
    return base.filter((qty) => qty <= Math.max(product?.stock || 0, 1));
  }, [product]);

  const unitLabel = useMemo(() => {
    const unit = (product?.unit || "").toLowerCase();
    if (unit === "kg") return "kg";
    if (unit === "botte") return "botte";
    return "piece";
  }, [product]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      id: product.id,
      name: `${product.name} (${selectedQuantity} ${unitLabel})`,
      price: product.price,
      image: selectedImage || product.image,
      quantity: selectedQuantity,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  if (isLoading) {
    return <div className="mx-auto max-w-6xl px-6 py-14">Chargement du produit...</div>;
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-14">
        <p className="text-red-600">{error || "Produit introuvable."}</p>
        <Button asChild className="mt-4">
          <Link href="/marketplace">Retour a la boutique</Link>
        </Button>
      </div>
    );
  }

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-6 py-8 lg:grid-cols-[1.05fr_0.95fr]">
      <div>
        <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Accueil
          </Link>
          <span>/</span>
          <Link href="/marketplace" className="hover:text-foreground">
            Fiche produit
          </Link>
        </div>

        <div className="overflow-hidden rounded-3xl border bg-neutral-100">
          <Image
            src={selectedImage || product.image}
            alt={product.name}
            width={1200}
            height={1200}
            className="h-[530px] w-full object-cover"
          />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {gallery.map((img, index) => (
            <button
              key={`${img}-${index}`}
              type="button"
              onClick={() => setSelectedImage(img)}
              className={`overflow-hidden rounded-2xl border ${
                selectedImage === img ? "border-black" : "border-neutral-300"
              }`}
            >
              <Image src={img} alt={`${product.name} ${index + 1}`} width={300} height={180} className="h-28 w-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <aside>
        <div className="mb-2 inline-flex rounded-full border px-3 py-1 text-xs font-medium capitalize text-muted-foreground">
          {product.category}
        </div>
        <h1 className="text-4xl font-semibold">{product.name}</h1>
        <p className="mt-3 text-3xl font-semibold">${product.price.toFixed(2)}</p>

        <div className="mt-5 rounded-full border px-4 py-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <Info className="h-4 w-4" />
            Stock disponible: {product.stock} {unitLabel}
          </span>
        </div>

        <div className="mt-6">
          <p className="mb-3 text-sm font-medium">Choisir la quantite</p>
          <div className="grid grid-cols-4 gap-2">
            {quantityOptions.map((qty) => (
              <button
                key={qty}
                type="button"
                onClick={() => setSelectedQuantity(qty)}
                className={`rounded-full border px-4 py-3 text-sm ${
                  selectedQuantity === qty ? "bg-black text-white" : "bg-white"
                }`}
              >
                {qty} {unitLabel}
              </button>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Total estime: ${(product.price * selectedQuantity).toFixed(2)}
          </p>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <Button className="h-12 flex-1 rounded-full" onClick={handleAddToCart}>
            {justAdded ? "Ajoute au panier" : "Ajouter au panier"}
          </Button>
          <Button variant="outline" size="icon-lg" className="rounded-full">
            <Heart />
          </Button>
        </div>

        <div className="mt-6 rounded-2xl border p-5">
          <h2 className="mb-2 text-xl font-semibold">Description produit</h2>
          <p className="text-sm text-muted-foreground">
            {product.description || "Aucune description fournie pour ce produit."}
          </p>
        </div>

        <div className="mt-4 rounded-2xl border p-5">
          <h2 className="mb-4 text-xl font-semibold">Fraicheur et livraison</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-xl bg-neutral-50 p-3">
              <p className="inline-flex items-center gap-2 font-medium">
                <Leaf className="h-4 w-4" />
                Origine
              </p>
              <p className="text-muted-foreground">Producteur local certifie</p>
            </div>
            <div className="rounded-xl bg-neutral-50 p-3">
              <p className="inline-flex items-center gap-2 font-medium">
                <Snowflake className="h-4 w-4" />
                Conservation
              </p>
              <p className="text-muted-foreground">Maintien au frais apres reception</p>
            </div>
            <div className="rounded-xl bg-neutral-50 p-3">
              <p className="inline-flex items-center gap-2 font-medium">
                <Package className="h-4 w-4" />
                Conditionnement
              </p>
              <p className="text-muted-foreground">Emballage alimentaire protege</p>
            </div>
            <div className="rounded-xl bg-neutral-50 p-3">
              <p className="inline-flex items-center gap-2 font-medium">
                <Truck className="h-4 w-4" />
                Delai de livraison
              </p>
              <p className="text-muted-foreground">24h a 48h selon la zone</p>
            </div>
          </div>
        </div>
      </aside>
    </section>
  );
}
