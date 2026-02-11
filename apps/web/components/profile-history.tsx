"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { normalizeUserRole, type StoredAuthUser } from "@/lib/auth-user";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type HistoryOrder = {
  id: string;
  totalCents: number;
  status: string;
  createdAt: string;
  items: Array<{
    id: string;
    quantity: number;
    priceCents: number;
    product: { name: string };
  }>;
  payment: HistoryPayment | null;
};

type HistoryPayment = {
  id: string;
  provider: string;
  status: string;
  amountCents: number;
  currency: "USD" | "CDF";
  createdAt: string;
};

type HistoryResponse = {
  orders: HistoryOrder[];
  payments: HistoryPayment[];
};

function formatMoney(cents: number, currency: "USD" | "CDF") {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

function formatDate(value: string) {
  return new Date(value).toLocaleString("fr-FR");
}

export function ProfileHistory({ username }: { username: string }) {
  const [data, setData] = useState<HistoryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [role, setRole] = useState<"client" | "fournisseur" | "superadmin" | undefined>(undefined);

  useEffect(() => {
    let active = true;

    const loadHistory = async () => {
      try {
        const rawUser = window.localStorage.getItem("auth_user");
        const parsedUser = rawUser ? (JSON.parse(rawUser) as StoredAuthUser) : null;
        const normalizedRole = normalizeUserRole(parsedUser?.role);
        setRole(normalizedRole);

        if (normalizedRole !== "client") {
          if (active) {
            setLoading(false);
          }
          return;
        }

        const token = window.localStorage.getItem("auth_token");
        if (!token) {
          if (active) {
            setError("Connectez-vous pour voir votre historique.");
            setLoading(false);
          }
          return;
        }

        const response = await fetch(`${API_URL}/client/history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const payload = (await response.json()) as HistoryResponse | { error?: string };
        if (!response.ok || !("orders" in payload)) {
          throw new Error(("error" in payload && payload.error) || "Impossible de charger l'historique.");
        }

        if (active) {
          setData(payload);
          setLoading(false);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Erreur de chargement.");
          setLoading(false);
        }
      }
    };

    loadHistory();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Historique des commandes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {!loading && role && role !== "client" ? (
            <p>Historique commandes/paiements affiche uniquement pour les comptes client.</p>
          ) : null}
          {loading ? <p>Chargement...</p> : null}
          {error ? <p className="text-red-600">{error}</p> : null}
          {!loading && !error && role === "client" && (data?.orders.length ?? 0) === 0 ? (
            <p>Aucune commande effectuee pour @{username}.</p>
          ) : null}
          {!loading && !error && role === "client"
            ? data?.orders.map((order) => (
                <div key={order.id} className="rounded-lg border p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium">Commande #{order.id.slice(-8)}</p>
                    <p className="text-muted-foreground">{formatDate(order.createdAt)}</p>
                  </div>
                  <p className="mt-1 text-muted-foreground">Statut: {order.status}</p>
                  <p className="mt-1">
                    Total:{" "}
                    {formatMoney(order.totalCents, order.payment?.currency ?? "USD")}
                  </p>
                  <p className="mt-2 text-muted-foreground">
                    Produits: {order.items.map((item) => `${item.product.name} x${item.quantity}`).join(", ")}
                  </p>
                </div>
              ))
            : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Historique des paiements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {!loading && !error && role === "client" && (data?.payments.length ?? 0) === 0 ? (
            <p>Aucun paiement effectue pour @{username}.</p>
          ) : null}
          {!loading && !error && role === "client"
            ? data?.payments.map((payment) => (
                <div key={payment.id} className="rounded-lg border p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium">Paiement #{payment.id.slice(-8)}</p>
                    <p className="text-muted-foreground">{formatDate(payment.createdAt)}</p>
                  </div>
                  <p className="mt-1 text-muted-foreground">
                    Methode: {payment.provider} | Statut: {payment.status}
                  </p>
                  <p className="mt-1">
                    Montant: {formatMoney(payment.amountCents, payment.currency)}
                  </p>
                </div>
              ))
            : null}
        </CardContent>
      </Card>
    </div>
  );
}
