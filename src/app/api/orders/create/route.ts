import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/current-user";

import { productRepository } from "@/repositories/product.repository";

import { orderService } from "@/services/order.service";

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

    const product = await productRepository.findApprovedById(body.productId);

    if (!product) {
      return NextResponse.json(
        {
          message: "Product not found",
        },
        {
          status: 404,
        },
      );
    }

    const order = await orderService.createOrder(
      user.id,
      product.id,
      product.priceInPaise,
    );

    return NextResponse.json(
      {
        success: true,
        order,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create order",
      },
      {
        status: 500,
      },
    );
  }
}
