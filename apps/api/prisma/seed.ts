import { PrismaClient } from "../src/generated/prisma/index.js";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import "dotenv/config";

const prisma = new PrismaClient();
const DEFAULT_AVATAR_URL = "/profil.png";
const DEFAULT_PASSWORD = "Azerty123!";

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

async function main() {
  const client = await prisma.user.upsert({
    where: { email: "client@example.com" },
    update: {
      firstName: "Amina",
      lastName: "Kasongo",
      phone: "+243 900 000 001",
      role: "client",
      avatarUrl: DEFAULT_AVATAR_URL,
      passwordHash: hashPassword(DEFAULT_PASSWORD),
      isActive: true,
    },
    create: {
      email: "client@example.com",
      firstName: "Amina",
      lastName: "Kasongo",
      phone: "+243 900 000 001",
      role: "client",
      avatarUrl: DEFAULT_AVATAR_URL,
      passwordHash: hashPassword(DEFAULT_PASSWORD),
      isActive: true,
    },
  });

  const fournisseur = await prisma.user.upsert({
    where: { email: "fournisseur@example.com" },
    update: {
      firstName: "Patrick",
      lastName: "Mbuyi",
      role: "fournisseur",
      avatarUrl: DEFAULT_AVATAR_URL,
      passwordHash: hashPassword(DEFAULT_PASSWORD),
      isActive: true,
    },
    create: {
      email: "fournisseur@example.com",
      firstName: "Patrick",
      lastName: "Mbuyi",
      role: "fournisseur",
      avatarUrl: DEFAULT_AVATAR_URL,
      passwordHash: hashPassword(DEFAULT_PASSWORD),
      isActive: true,
    },
  });

  const superadmin = await prisma.user.upsert({
    where: { email: "superadmin@example.com" },
    update: {
      firstName: "Admin",
      lastName: "Market Fresh",
      role: "superadmin",
      avatarUrl: DEFAULT_AVATAR_URL,
      passwordHash: hashPassword(DEFAULT_PASSWORD),
      isActive: true,
    },
    create: {
      email: "superadmin@example.com",
      firstName: "Admin",
      lastName: "Market Fresh",
      role: "superadmin",
      avatarUrl: DEFAULT_AVATAR_URL,
      passwordHash: hashPassword(DEFAULT_PASSWORD),
      isActive: true,
    },
  });

  const product = await prisma.product.upsert({
    where: { sku: "LEG-CAROTTE-001" },
    update: {
      name: "Carottes bio",
      priceCents: 2500,
      unit: "KG",
      stock: 80,
      isActive: true,
      sellerId: fournisseur.id,
    },
    create: {
      sku: "LEG-CAROTTE-001",
      name: "Carottes bio",
      description: "Carottes fraiches de saison.",
      priceCents: 2500,
      category: "LEGUME",
      unit: "KG",
      stock: 80,
      isActive: true,
      sellerId: fournisseur.id,
    },
  });

  const existingOrder = await prisma.order.findFirst({
    where: { userId: client.id },
    include: { payment: true },
  });

  if (!existingOrder) {
    const order = await prisma.order.create({
      data: {
        userId: client.id,
        totalCents: 5000,
        status: "CONFIRMED",
      },
    });

    await prisma.orderItem.create({
      data: {
        orderId: order.id,
        productId: product.id,
        quantity: 2,
        priceCents: 2500,
      },
    });

    await prisma.payment.create({
      data: {
        orderId: order.id,
        userId: client.id,
        provider: "MOBILE_MONEY",
        status: "PAID",
        amountCents: 5000,
        currency: "USD",
        transactionRef: "SEED-PAY-001",
      },
    });
  }

  console.log("Seed termine:");
  console.log(`- client: ${client.email}`);
  console.log(`- fournisseur: ${fournisseur.email}`);
  console.log(`- superadmin: ${superadmin.email}`);
  console.log("- mot de passe par defaut:", DEFAULT_PASSWORD);
  console.log(
    "- verification hash:",
    verifyPassword(DEFAULT_PASSWORD, client.passwordHash || "") &&
      verifyPassword(DEFAULT_PASSWORD, fournisseur.passwordHash || "") &&
      verifyPassword(DEFAULT_PASSWORD, superadmin.passwordHash || "")
      ? "OK"
      : "ECHEC",
  );
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
