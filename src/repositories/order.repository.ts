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

  findPendingOrder(orderId: string, buyerId: string) {
    return prisma.productOrder.findFirst({
      where: {
        id: orderId,
        buyerId,
        status: "PENDING",
      },
      include: {
        product: true,
      },
    });
  },

  updateStatus(
    id: string,
    status: "PENDING" | "PAID" | "CANCELLED" | "REFUNDED",
  ) {
    return prisma.productOrder.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  },
};
