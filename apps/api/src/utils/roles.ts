// Liste des roles autorises dans l'application (cotes backend)
export const ROLES = ["superadmin", "fournisseur", "client"] as const;

// Type de role derive de la liste
export type Role = (typeof ROLES)[number];

// Alias pour compatibilite frontend (admin + legacy vendeur)
const ROLE_ALIASES: Record<string, Role> = {
  admin: "superadmin",
  vendeur: "fournisseur",
};

// Verifie si un role est valide
export function isValidRole(role: string): role is Role {
  return ROLES.includes(role as Role);
}

// Normalise un role (backend ou alias frontend) en role backend
export function normalizeRole(role: string): Role | null {
  if (isValidRole(role)) {
    return role;
  }

  return ROLE_ALIASES[role] ?? null;
}
