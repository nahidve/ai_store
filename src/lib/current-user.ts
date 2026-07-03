import { authService } from "@/services/auth.service";

export async function getCurrentUser() {
  return authService.getCurrentUser();
}
