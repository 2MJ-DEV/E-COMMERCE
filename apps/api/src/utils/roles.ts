// Liste des roles autorises dans l'application
export const ROLES = ["superadmin", "vendeur", "client"] as const;

// Type de role derive de la liste
export type Role = (typeof ROLES)[number];

// Verifie si un role est valide
export function isValidRole(role: string): role is Role {
  return ROLES.includes(role as Role);
}
