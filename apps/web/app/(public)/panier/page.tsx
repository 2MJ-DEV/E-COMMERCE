"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/components/cart/cart-provider";
import { usernameFromUser, type StoredAuthUser } from "@/lib/auth-user";

const formatPrice = (value: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);

type PromoDefinition = {
  type: "percent" | "fixed";
  value: number;
  label: string;
};

const PROMO_CODES: Record<string, PromoDefinition> = {
  BIENVENUE10: { type: "percent", value: 10, label: "-10%" },
  FRESH5: { type: "fixed", value: 5, label: "-$5.00" },
};

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, clearCart } = useCart();
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<(PromoDefinition & { code: string }) | null>(
    null,
  );

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = appliedPromo
    ? appliedPromo.type === "percent"
      ? (subtotal * appliedPromo.value) / 100
      : Math.min(subtotal, appliedPromo.value)
    : 0;
  const total = Math.max(0, subtotal - discount);

  const applyPromoCode = () => {
    const code = promoInput.trim().toUpperCase();
    if (!code) {
      setPromoError("Entrez un code promo.");
      return;
    }

    const promo = PROMO_CODES[code];
    if (!promo) {
      setPromoError("Code promo invalide.");
      return;
    }

    setAppliedPromo({ ...promo, code });
    setPromoError("");
  };

  const handleCheckout = () => {
    if (typeof window === "undefined") {
      return;
    }

    const tokenKeys = ["auth_token", "token", "access_token", "accessToken", "jwt"];
    const isAuthenticated = tokenKeys.some((key) => Boolean(window.localStorage.getItem(key)));

    if (!isAuthenticated) {
      router.push(`/login?next=${encodeURIComponent("/panier")}`);
      return;
    }

    let username = "user";
    try {
      const rawUser = window.localStorage.getItem("auth_user");
      const parsedUser = rawUser ? (JSON.parse(rawUser) as StoredAuthUser) : null;
      username = usernameFromUser(parsedUser);
    } catch {
      username = "user";
    }

    router.push(`/${username}/commandes`);
  };

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-5xl px-6 py-14">
        <h1 className="text-3xl font-semibold">Votre panier est vide</h1>
        <p className="mt-3 text-muted-foreground">
          Ajoutez des produits depuis la marketplace pour commencer votre commande.
        </p>
        <Button asChild className="mt-6">
          <Link href="/marketplace">Voir les produits</Link>
        </Button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold">Mon panier</h1>
        <Button variant="outline" onClick={clearCart}>
          Vider le panier
        </Button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="flex flex-col gap-4 rounded-2xl border p-4 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={96}
                  height={96}
                  className="h-24 w-24 rounded-xl object-cover"
                />
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    Prix unitaire: {formatPrice(item.price)}
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    Total: {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  aria-label={`Diminuer la quantité de ${item.name}`}
                >
                  <Minus />
                </Button>
                <span className="min-w-8 text-center text-sm font-semibold">{item.quantity}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  aria-label={`Augmenter la quantité de ${item.name}`}
                >
                  <Plus />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Supprimer ${item.name} du panier`}
                >
                  <Trash2 />
                </Button>
              </div>
            </article>
          ))}
        </div>

        <aside className="h-fit rounded-2xl border p-5">
          <h2 className="text-lg font-semibold">Récapitulatif</h2>
          <div className="mt-4 space-y-2">
            <label htmlFor="promo-code" className="text-sm font-medium">
              Code promo
            </label>
            <div className="flex gap-2">
              <Input
                id="promo-code"
                value={promoInput}
                onChange={(event) => setPromoInput(event.target.value)}
                placeholder="Ex: BIENVENUE10"
              />
              <Button type="button" variant="outline" onClick={applyPromoCode}>
                Appliquer
              </Button>
            </div>
            {promoError ? <p className="text-xs text-red-600">{promoError}</p> : null}
            {appliedPromo ? (
              <div className="rounded-md bg-green-50 px-3 py-2 text-xs text-green-700">
                Code actif: <strong>{appliedPromo.code}</strong> ({appliedPromo.label})
                <button
                  type="button"
                  className="ml-2 underline"
                  onClick={() => setAppliedPromo(null)}
                >
                  Retirer
                </button>
              </div>
            ) : null}
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span>Sous-total</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Reduction</span>
              <span className="font-medium">-{formatPrice(discount)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Livraison</span>
              <span className="font-medium">Gratuite</span>
            </div>
            <div className="mt-3 border-t pt-3 text-base font-semibold">
              <div className="flex items-center justify-between">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          <Button type="button" className="mt-5 w-full" onClick={handleCheckout}>
            Passer la commande
          </Button>
        </aside>
      </div>
    </section>
  );
}
