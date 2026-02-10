import { PrismaClient, ProductCategory, ProductUnit } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.product.findFirst({
    where: { name: "Carottes bio" },
  });

  if (existing) {
    return;
  }

  await prisma.product.create({
    data: {
      name: "Carottes bio",
      description: "Carottes fraiches de saison, direct producteur.",
      priceCents: 250,
      category: ProductCategory.LEGUME,
      unit: ProductUnit.KG,
      stock: 120,
    },
  });
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
