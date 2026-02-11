"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type AddCartItemInput = Omit<CartItem, "quantity"> & {
  quantity?: number;
};

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  addItem: (item: AddCartItemInput) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
};

const CART_STORAGE_KEY = "market_fresh_cart_v1";

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CART_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch {
      setItems([]);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [isHydrated, items]);

  const value = useMemo<CartContextValue>(() => {
    return {
      items,
      totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
      addItem: (item) => {
        const quantityToAdd = item.quantity ?? 1;
        setItems((prev) => {
          const existing = prev.find((p) => p.id === item.id);
          if (existing) {
            return prev.map((p) =>
              p.id === item.id ? { ...p, quantity: p.quantity + quantityToAdd } : p,
            );
          }
          return [...prev, { ...item, quantity: quantityToAdd }];
        });
      },
      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          setItems((prev) => prev.filter((item) => item.id !== itemId));
          return;
        }
        setItems((prev) =>
          prev.map((item) => (item.id === itemId ? { ...item, quantity } : item)),
        );
      },
      removeItem: (itemId) => {
        setItems((prev) => prev.filter((item) => item.id !== itemId));
      },
      clearCart: () => {
        setItems([]);
      },
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
