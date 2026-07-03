import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/current-user";
import { productService } from "@/services/product.service";
import { createProductSchema } from "@/validations/product.schema";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }
    if (user.role !== "VENDOR" && user.role !== "ADMIN") {
      return NextResponse.json(
        {
          message: "Forbidden",
        },
        { status: 403 },
      );
    }

    const body = await request.json();
    const validated = createProductSchema.parse(body);
    const product = await productService.create(user.id, validated);

    return NextResponse.json(
      {
        success: true,
        product,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed",
      },
      {
        status: 400,
      },
    );
  }
}
