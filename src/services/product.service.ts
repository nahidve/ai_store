import slugify from "slugify";
import { ProductStatus } from "@prisma/client";
import { productRepository } from "@/repositories/product.repository";
import { CreateProductInput } from "@/validations/product.schema";

export const productService = {
  async create(vendorId: string, input: CreateProductInput) {
    const slug =
      slugify(input.title, {
        lower: true,
        strict: true,
      }) +
      "-" +
      Date.now();

    return productRepository.create({
      ...input,
      slug,
      vendorId,
      productType: "EXTERNAL",
      status: ProductStatus.PENDING,
    });
  },

  async getVendorProducts(vendorId: string) {
    return productRepository.findByVendor(vendorId);
  },

  async getMarketplaceProducts() {
    return productRepository.findApproved();
  },

  async getPendingProducts() {
    return productRepository.findPending();
  },

  async getProductBySlug(slug: string) {
    return productRepository.findBySlug(slug);
  },
};
