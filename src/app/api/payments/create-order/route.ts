import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/current-user";

import { razorpay } from "@/lib/razorpay";

import { orderRepository } from "@/repositories/order.repository";

import { paymentService } from "@/services/payment.service";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const body = await request.json();

    const order = await orderRepository.findPendingOrder(body.orderId, user.id);

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

    const razorpayOrder = await razorpay.orders.create({
      amount: order.amountInPaise,
      currency: "INR",
      receipt: order.id,
    });

    await paymentService.createPayment(
      "RAZORPAY",
      razorpayOrder.id,
      order.amountInPaise,
      order.id,
    );

    return NextResponse.json({
      success: true,
      orderId: order.id,

      razorpayOrderId: razorpayOrder.id,

      amount: order.amountInPaise,

      currency: "INR",

      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create payment",
      },
      {
        status: 500,
      },
    );
  }
}
