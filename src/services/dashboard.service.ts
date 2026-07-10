import { dashboardRepository } from "@/repositories/dashboard.repository";

export const dashboardService = {
  async getAdminStats() {
    return dashboardRepository.getAdminStats();
  },
};
