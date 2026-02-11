import { type Request, type Response } from "express";
import { prisma } from "../utils/prisma.js";

export async function getClientHistory(req: Request, res: Response) {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ error: "unauthorized" });
  }

  const orders = await prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: {
          product: {
            select: { name: true },
          },
        },
      },
      payment: {
        select: {
          id: true,
          provider: true,
          status: true,
          amountCents: true,
          currency: true,
          createdAt: true,
        },
      },
    },
  });

  const payments = orders
    .map((order) => order.payment)
    .filter((payment): payment is NonNullable<(typeof orders)[number]["payment"]> => Boolean(payment))
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return res.json({ orders, payments });
}
