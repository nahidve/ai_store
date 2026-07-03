import { Prisma, ProductStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const productRepository = {
  create(data: Prisma.ProductUncheckedCreateInput) {
    return prisma.product.create({
      data,
    });
  },

  findBySlug(slug: string) {
    return prisma.product.findUnique({
      where: { slug },
    });
  },

  findPending() {
    return prisma.product.findMany({
      where: {
        status: ProductStatus.PENDING,
      },
      include: {
        vendor: true,
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  findApproved() {
    return prisma.product.findMany({
      where: {
        status: ProductStatus.APPROVED,
      },
      include: {
        vendor: true,
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  findByVendor(vendorId: string) {
    return prisma.product.findMany({
      where: {
        vendorId,
      },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  findById(id: string) {
    return prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        vendor: true,
        category: true,
      },
    });
  },

  approve(id: string) {
    return prisma.product.update({
      where: { id },
      data: {
        status: ProductStatus.APPROVED,
      },
    });
  },

  reject(id: string) {
    return prisma.product.update({
      where: { id },
      data: {
        status: ProductStatus.REJECTED,
      },
    });
  },
};
