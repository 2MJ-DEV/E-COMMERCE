"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ShoppingBag } from "lucide-react";
import { Button } from "../ui/button";

const navItems = [
  { label: "Notre Boutique", href: "/marketplace" },
  { label: "Légumes", href: "/marketplace?category=legume" },
  { label: "Viandes", href: "/marketplace?category=viande" },
  { label: "Fournisseurs", href: "/fournisseurs" },
];

const PublicNavbar = () => {
  const router = useRouter();

  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="bg-primary px-4 py-1 text-center text-xs font-semibold uppercase tracking-[0.1rem] text-white">
        Livraison offerte à partir de 5usd 🚚
      </div>
    </header>
  );
};

export default PublicNavbar;
