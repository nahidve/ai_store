import { prisma } from "@/lib/prisma";

export const sessionRepository = {
  create(data: {
    userId: string;
    expiresAt: Date;
    ipAddress?: string;
    userAgent?: string;
  }) {
    return prisma.session.create({
      data: {
        ...data,
        lastUsedAt: new Date(),
      },
    });
  },

  findById(id: string) {
    return prisma.session.findUnique({
      where: {
        id,
      },
    });
  },

  deactivate(id: string) {
    return prisma.session.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });
  },
};
