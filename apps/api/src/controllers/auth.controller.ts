import { type Request, type Response } from "express";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import jwt from "jsonwebtoken";
import { normalizeRole } from "../utils/roles.js";
import { prisma } from "../utils/prisma.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const DEFAULT_AVATAR_URL = "/profil.png";

function signToken(user: { id: string; email: string; role: string }) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });
}

function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, storedHash: string) {
  const [salt, hashHex] = storedHash.split(":");
  if (!salt || !hashHex) {
    return false;
  }

  const hashFromInput = scryptSync(password, salt, 64);
  const hashFromStorage = Buffer.from(hashHex, "hex");

  if (hashFromInput.length !== hashFromStorage.length) {
    return false;
  }

  return timingSafeEqual(hashFromInput, hashFromStorage);
}

export async function register(req: Request, res: Response) {
  const { email, password, firstName, lastName, role } = req.body || {};
  const normalizedEmail = String(email || "").toLowerCase().trim();

  if (!normalizedEmail || !password) {
    return res.status(400).json({ error: "email and password required" });
  }

  if (typeof password !== "string" || password.length < 8) {
    return res.status(400).json({ error: "password must be at least 8 characters" });
  }

  const normalizedRole = role ? normalizeRole(String(role)) : "client";
  if (!normalizedRole) {
    return res.status(400).json({ error: "invalid role" });
  }

  const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (existing) {
    return res.status(409).json({ error: "email already registered" });
  }

  const user = await prisma.user.create({
    data: {
      email: normalizedEmail,
      firstName: typeof firstName === "string" ? firstName : null,
      lastName: typeof lastName === "string" ? lastName : null,
      passwordHash: hashPassword(password),
      avatarUrl: DEFAULT_AVATAR_URL,
      role: normalizedRole,
    },
  });

  const token = signToken({ id: user.id, email: user.email, role: user.role });
  return res.status(201).json({
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      avatarUrl: user.avatarUrl ?? DEFAULT_AVATAR_URL,
    },
  });
}

export async function login(req: Request, res: Response) {
  const { email, password, role } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: "email and password required" });
  }

  const normalizedRole = role ? normalizeRole(String(role)) : null;
  if (role && !normalizedRole) {
    return res.status(400).json({ error: "invalid role" });
  }

  const user = await prisma.user.findUnique({ where: { email: String(email).toLowerCase().trim() } });
  if (!user) {
    return res.status(401).json({ error: "invalid credentials" });
  }

  if (!user.passwordHash || !verifyPassword(String(password), user.passwordHash)) {
    return res.status(401).json({ error: "invalid credentials" });
  }

  if (normalizedRole && user.role !== normalizedRole) {
    return res.status(403).json({ error: "role mismatch for this account" });
  }

  const token = signToken({ id: user.id, email: user.email, role: user.role });
  return res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      avatarUrl: user.avatarUrl ?? DEFAULT_AVATAR_URL,
    },
  });
}

export async function forgotPassword(req: Request, res: Response) {
  const { email } = req.body || {};

  if (!email) {
    return res.status(400).json({ error: "email required" });
  }

  return res.json({
    message:
      "Si un compte existe avec cet email, un lien de reinitialisation a ete envoye.",
  });
}
