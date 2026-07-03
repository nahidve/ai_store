import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { authService } from "@/services/auth.service";
import { loginSchema } from "@/validations/auth.schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = loginSchema.parse(body);
    const headerStore = await headers();
    const userAgent = headerStore.get("user-agent") ?? undefined;
    const user = await authService.login(validated, {
      userAgent,
    });

    return NextResponse.json({
      success: true,
      ...user,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Login failed",
      },
      { status: 401 },
    );
  }
}
