import { NextResponse } from "next/server";
import { authService } from "@/services/auth.service";
import { registerSchema } from "@/validations/auth.schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = registerSchema.parse(body);
    const user = await authService.register(validated);

    return NextResponse.json(
      {
        success: true,
        user,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Registration failed",
      },
      { status: 400 },
    );
  }
}
