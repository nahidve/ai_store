import { ProductStatus, UserRole } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const dashboardRepository = {
  async getAdminStats() {
    const [
      totalUsers,
      totalVendors,
      totalProducts,
      pendingProducts,
      approvedProducts,
      rejectedProducts,
    ] = await Promise.all([
      prisma.user.count(),

      prisma.user.count({
        where: {
          role: UserRole.VENDOR,
        },
      }),

      prisma.product.count(),

      prisma.product.count({
        where: {
          status: ProductStatus.PENDING,
        },
      }),

      prisma.product.count({
        where: {
          status: ProductStatus.APPROVED,
        },
      }),

      prisma.product.count({
        where: {
          status: ProductStatus.REJECTED,
        },
      }),
    ]);

    return {
      totalUsers,
      totalVendors,
      totalProducts,
      pendingProducts,
      approvedProducts,
      rejectedProducts,
    };
  },
};
