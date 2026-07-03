import { NextResponse } from "next/server";
import { authService } from "@/services/auth.service";

export async function GET() {
  const user = await authService.getCurrentUser();

  return NextResponse.json({
    user,
  });
}
