import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import { normalizeRole } from "../utils/roles.js";
import { prisma } from "../utils/prisma.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export function login(req: Request, res: Response) {
  const { email, role } = req.body || {};

  if (!email || !role) {
    return res.status(400).json({ error: "email and role required" });
  }

  const normalizedRole = normalizeRole(role);
  if (!normalizedRole) {
    return res.status(401).json({ error: "invalid role" });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  const user =
    existing ??
    (await prisma.user.create({
      data: {
        email,
        role: normalizedRole,
      },
    }));

  const token = jwt.sign({ id: user.id, email, role: normalizedRole }, JWT_SECRET, {
    expiresIn: "1h",
  });
  return res.json({ token });
}
