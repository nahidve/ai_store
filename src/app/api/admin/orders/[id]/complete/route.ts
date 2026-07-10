import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { purchaseService } from "@/services/purchase.service";

export async function POST(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  const { id } = await context.params;

  const order = await prisma.productOrder.findUnique({
    where: {
      id,
    },
  });

  if (!order) {
    return NextResponse.json(
      {
        message: "Order not found",
      },
      {
        status: 404,
      },
    );
  }

  await prisma.productOrder.update({
    where: {
      id,
    },
    data: {
      status: "PAID",
    },
  });

  const purchase = await purchaseService.createPurchase(
    order.buyerId,
    order.productId,
    order.id,
  );

  return NextResponse.json({
    success: true,
    purchase,
  });
}
