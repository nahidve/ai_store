import { prisma } from "@/lib/prisma";

export const orderRepository = {
  create(data: { buyerId: string; productId: string; amountInPaise: number }) {
    return prisma.productOrder.create({
      data,
    });
  },

  findByBuyer(buyerId: string) {
    return prisma.productOrder.findMany({
      where: {
        buyerId,
      },
      include: {
        product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  findById(id: string) {
    return prisma.productOrder.findUnique({
      where: {
        id,
      },
      include: {
        product: true,
        buyer: true,
        payment: true,
      },
    });
  },
};
