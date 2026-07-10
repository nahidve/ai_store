import { productRepository } from "@/repositories/product.repository";

export const vendorService = {
  async getStats(vendorId: string) {
    const [totalProducts, pendingProducts, approvedProducts, rejectedProducts] =
      await Promise.all([
        productRepository.countByVendor(vendorId),

        productRepository.countPendingByVendor(vendorId),

        productRepository.countApprovedByVendor(vendorId),

        productRepository.countRejectedByVendor(vendorId),
      ]);

    return {
      totalProducts,
      pendingProducts,
      approvedProducts,
      rejectedProducts,
    };
  },
};
