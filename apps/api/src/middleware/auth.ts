import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import { type Role, normalizeRole } from "../utils/roles.js";

// Structure utilisateur attachée à req.user après validation JWT
export type AuthUser = {
  id: string;
  email: string;
  role: Role;
};

// Secret JWT (fallback en dev)
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export function auth(req: Request, res: Response, next: NextFunction) {
  // Lecture du header Authorization
  const authHeader = req.headers.authorization || "";
  const [scheme, token] = authHeader.split(" ");

  // Vérification format "Bearer <token>"
  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: "missing or invalid token" });
  }

  try {
    // Vérification signature + décodage du token
    const payload = jwt.verify(token, JWT_SECRET) as { id?: string; email?: string; role?: string };
    // Normalisation des rôles (ex: admin -> superadmin, fournisseur -> vendeur)
    const normalizedRole = payload.role ? normalizeRole(payload.role) : null;
    // Validation des champs requis
    if (!payload.id || !payload.email || !normalizedRole) {
      return res.status(401).json({ error: "invalid token" });
    }

    // Injection de l'utilisateur authentifié dans la requête
    req.user = { id: payload.id, email: payload.email, role: normalizedRole };
    // Passage au middleware suivant
    return next();
  } catch {
    // Token invalide ou expiré
    return res.status(401).json({ error: "invalid token" });
  }
}
