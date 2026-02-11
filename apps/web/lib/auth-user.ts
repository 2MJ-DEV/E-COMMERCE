"use client";

export type StoredAuthUser = {
  email?: string;
  firstName?: string | null;
  lastName?: string | null;
  avatarUrl?: string | null;
  role?: "client" | "fournisseur" | "superadmin" | "vendeur";
};

export function normalizeUserRole(role?: StoredAuthUser["role"]) {
  if (role === "vendeur") {
    return "fournisseur";
  }
  return role;
}

export function usernameFromEmail(email: string) {
  const base = email.split("@")[0] || "user";
  return base
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function usernameFromUser(user: StoredAuthUser | null) {
  const normalizedRole = normalizeUserRole(user?.role);
  if (normalizedRole === "fournisseur") {
    return "fournisseur";
  }

  if (!user?.email) {
    return "user";
  }
  return usernameFromEmail(user.email) || "user";
}
