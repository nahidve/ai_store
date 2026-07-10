import crypto from "crypto";

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { orderService } from "@/services/order.service";
import { paymentService } from "@/services/payment.service";
import { purchaseService } from "@/services/purchase.service";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        {
          message: "Invalid signature",
        },
        {
          status: 400,
        },
      );
    }

    const payment = await prisma.payment.findUnique({
      where: {
        razorpayOrderId: razorpay_order_id,
      },
    });

    if (!payment) {
      return NextResponse.json(
        {
          message: "Payment not found",
        },
        {
          status: 404,
        },
      );
    }

    await paymentService.markPaid(payment.id, razorpay_payment_id);

    await orderService.markPaid(payment.productOrderId!);

    const order = await prisma.productOrder.findUnique({
      where: {
        id: payment.productOrderId!,
      },
    });

    if (!order) {
      throw new Error("Order missing");
    }

    const existingPurchase = await prisma.productPurchase.findUnique({
      where: {
        buyerId_productId: {
          buyerId: order.buyerId,
          productId: order.productId,
        },
      },
    });

    if (!existingPurchase) {
      await purchaseService.createPurchase(
        order.buyerId,
        order.productId,
        order.id,
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      },
    );
  }
}
