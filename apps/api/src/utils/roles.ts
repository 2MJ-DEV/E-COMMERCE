// Liste des rôles autorisés dans l’application
export const ROLES = ["superadmin", "vendeur", "client"] as const;

// Type de rôle dérivé de la liste
export type Role = (typeof ROLES)[number];

// Vérifie si un rôle est valide
export function isValidRole(role: string): role is Role {
  return ROLES.includes(role as Role);
}
