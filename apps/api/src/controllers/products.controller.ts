import { type Request, type Response } from "express";
import { prisma } from "../utils/prisma.js";
import { ProductCategory } from "../generated/prisma/index.js";

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

export async function listProducts(req: Request, res: Response) {
  const categoryParam = typeof req.query.category === "string" ? req.query.category : "";
  const normalizedCategory = categoryParam.trim().toLowerCase();

  if (normalizedCategory && normalizedCategory !== "legume" && normalizedCategory !== "viande") {
    return res.status(400).json({ error: "category must be legume or viande" });
  }

  const categoryFilter =
    normalizedCategory === "legume"
      ? ProductCategory.LEGUME
      : normalizedCategory === "viande"
        ? ProductCategory.VIANDE
        : undefined;

  const limitRaw = typeof req.query.limit === "string" ? req.query.limit : "";
  const offsetRaw = typeof req.query.offset === "string" ? req.query.offset : "";

  const limit = Math.min(
    Math.max(Number.parseInt(limitRaw || String(DEFAULT_LIMIT), 10) || DEFAULT_LIMIT, 1),
    MAX_LIMIT
  );
  const offset = Math.max(Number.parseInt(offsetRaw || "0", 10) || 0, 0);

  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where: { category: categoryFilter, isActive: true },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
      include: {
        images: {
          orderBy: { position: "asc" },
          take: 1,
        },
      },
    }),
    prisma.product.count({
      where: { category: categoryFilter, isActive: true },
    }),
  ]);

  return res.json({
    items: items.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.priceCents / 100,
      category: item.category.toLowerCase(),
      image: item.images[0]?.url ?? "/screenshots/marketplace.png",
      stock: item.stock,
    })),
    pagination: {
      limit,
      offset,
      total,
    },
  });
}

export async function getProductById(req: Request, res: Response) {
  const productId = typeof req.params.id === "string" ? req.params.id.trim() : "";

  if (!productId) {
    return res.status(400).json({ error: "product id required" });
  }

  const item = await prisma.product.findFirst({
    where: { id: productId, isActive: true },
    include: {
      images: {
        orderBy: { position: "asc" },
      },
    },
  });

  if (!item) {
    return res.status(404).json({ error: "product not found" });
  }

  return res.json({
    id: item.id,
    name: item.name,
    description: item.description,
    price: item.priceCents / 100,
    category: item.category.toLowerCase(),
    image: item.images[0]?.url ?? "/screenshots/marketplace.png",
    images: item.images.map((img) => img.url),
    stock: item.stock,
    unit: item.unit.toLowerCase(),
  });
}
