import { prisma } from "@/lib/prisma";

export const purchaseRepository = {
  create(data: { buyerId: string; productId: string; orderId: string }) {
    return prisma.productPurchase.create({
      data,
    });
  },

  findByBuyer(buyerId: string) {
    return prisma.productPurchase.findMany({
      where: {
        buyerId,
      },
      include: {
        product: true,
        order: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  hasAccess(buyerId: string, productId: string) {
    return prisma.productPurchase.findUnique({
      where: {
        buyerId_productId: {
          buyerId,
          productId,
        },
      },
    });
  },
};
