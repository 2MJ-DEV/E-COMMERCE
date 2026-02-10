import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import { type Role, normalizeRole } from "../utils/roles.js";

export type AuthUser = {
  email: string;
  role: Role;
};

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export function auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization || "";
  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: "missing or invalid token" });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { email?: string; role?: string };
    const normalizedRole = payload.role ? normalizeRole(payload.role) : null;
    if (!payload.email || !normalizedRole) {
      return res.status(401).json({ error: "invalid token" });
    }

    req.user = { email: payload.email, role: normalizedRole };
    return next();
  } catch {
    return res.status(401).json({ error: "invalid token" });
  }
}
