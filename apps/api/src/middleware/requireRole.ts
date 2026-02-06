import { type Request, type Response, type NextFunction } from "express";
import { type Role } from "../utils/roles.js";

export function requireRole(...roles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req.user?.role;
    if (!role || !roles.includes(role)) {
      return res.status(403).json({ error: "forbidden" });
    }

    return next();
  };
}
