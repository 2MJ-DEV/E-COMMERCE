import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import { isValidRole } from "../utils/roles.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export function login(req: Request, res: Response) {
  const { email, role } = req.body || {};

  if (!email || !role) {
    return res.status(400).json({ error: "email and role required" });
  }

  if (!isValidRole(role)) {
    return res.status(401).json({ error: "invalid role" });
  }

  const token = jwt.sign({ email, role }, JWT_SECRET, { expiresIn: "1h" });
  return res.json({ token });
}
