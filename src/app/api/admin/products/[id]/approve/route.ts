import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/current-user";
import { productRepository } from "@/repositories/product.repository";

export async function POST(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 401 },
    );
  }
  if (user.role !== "ADMIN") {
    return NextResponse.json(
      {
        message: "Forbidden",
      },
      { status: 403 },
    );
  }

  const { id } = await context.params;
  const product = await productRepository.approve(id);

  return NextResponse.json({
    success: true,
    product,
  });
}
