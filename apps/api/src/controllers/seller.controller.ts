import { type Request, type Response } from "express";
import { ProductCategory, ProductUnit } from "../generated/prisma/index.js";
import { prisma } from "../utils/prisma.js";

function parseCategory(value: unknown): ProductCategory | null {
  const normalized = String(value || "").trim().toLowerCase();
  if (normalized === "legume") {
    return ProductCategory.LEGUME;
  }
  if (normalized === "viande") {
    return ProductCategory.VIANDE;
  }
  return null;
}

function parseUnit(value: unknown): ProductUnit | null {
  const normalized = String(value || "").trim().toLowerCase();
  if (normalized === "kg") {
    return ProductUnit.KG;
  }
  if (normalized === "piece") {
    return ProductUnit.PIECE;
  }
  if (normalized === "botte") {
    return ProductUnit.BOTTE;
  }
  return null;
}

export async function listSellerProducts(req: Request, res: Response) {
  const sellerId = req.user?.id;
  if (!sellerId) {
    return res.status(401).json({ error: "unauthorized" });
  }

  const items = await prisma.product.findMany({
    where: { sellerId },
    orderBy: { createdAt: "desc" },
    include: {
      images: {
        orderBy: { position: "asc" },
        take: 1,
      },
    },
  });

  return res.json({
    items: items.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      priceCents: item.priceCents,
      category: item.category.toLowerCase(),
      unit: item.unit.toLowerCase(),
      stock: item.stock,
      isActive: item.isActive,
      image: item.images[0]?.url ?? null,
      createdAt: item.createdAt,
    })),
  });
}

export async function createSellerProduct(req: Request, res: Response) {
  const sellerId = req.user?.id;
  if (!sellerId) {
    return res.status(401).json({ error: "unauthorized" });
  }

  const { name, description, price, category, unit, stock, imageUrl } = req.body || {};
  const normalizedName = String(name || "").trim();
  const priceNumber = Number(price);
  const stockNumber = Number(stock);
  const normalizedCategory = parseCategory(category);
  const normalizedUnit = parseUnit(unit);

  if (!normalizedName) {
    return res.status(400).json({ error: "name required" });
  }
  if (!Number.isFinite(priceNumber) || priceNumber <= 0) {
    return res.status(400).json({ error: "price must be a positive number" });
  }
  if (!normalizedCategory) {
    return res.status(400).json({ error: "category must be legume or viande" });
  }
  if (!normalizedUnit) {
    return res.status(400).json({ error: "unit must be kg, piece or botte" });
  }
  if (!Number.isInteger(stockNumber) || stockNumber < 0) {
    return res.status(400).json({ error: "stock must be an integer >= 0" });
  }

  const created = await prisma.product.create({
    data: {
      name: normalizedName,
      description: typeof description === "string" ? description.trim() : null,
      priceCents: Math.round(priceNumber * 100),
      category: normalizedCategory,
      unit: normalizedUnit,
      stock: stockNumber,
      isActive: true,
      sellerId,
      images:
        typeof imageUrl === "string" && imageUrl.trim()
          ? {
              create: {
                url: imageUrl.trim(),
                alt: normalizedName,
                position: 0,
              },
            }
          : undefined,
    },
    include: {
      images: {
        orderBy: { position: "asc" },
        take: 1,
      },
    },
  });

  return res.status(201).json({
    item: {
      id: created.id,
      name: created.name,
      description: created.description,
      priceCents: created.priceCents,
      category: created.category.toLowerCase(),
      unit: created.unit.toLowerCase(),
      stock: created.stock,
      isActive: created.isActive,
      image: created.images[0]?.url ?? null,
      createdAt: created.createdAt,
    },
  });
}
