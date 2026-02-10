import { type Request, type Response } from "express";
import { prisma } from "../utils/prisma.js";
import { ProductCategory } from "../generated/prisma/index.js";

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

export async function listProducts(req: Request, res: Response) {
  const categoryParam = typeof req.query.category === "string" ? req.query.category : "";
  const normalizedCategory = categoryParam.trim().toLowerCase();

  if (normalizedCategory && normalizedCategory !== "legume") {
    return res.status(400).json({ error: "category must be legume" });
  }

  const limitRaw = typeof req.query.limit === "string" ? req.query.limit : "";
  const offsetRaw = typeof req.query.offset === "string" ? req.query.offset : "";

  const limit = Math.min(
    Math.max(Number.parseInt(limitRaw || String(DEFAULT_LIMIT), 10) || DEFAULT_LIMIT, 1),
    MAX_LIMIT
  );
  const offset = Math.max(Number.parseInt(offsetRaw || "0", 10) || 0, 0);

  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where: { category: ProductCategory.LEGUME, isActive: true },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
    }),
    prisma.product.count({
      where: { category: ProductCategory.LEGUME, isActive: true },
    }),
  ]);

  return res.json({
    items,
    pagination: {
      limit,
      offset,
      total,
    },
  });
}
