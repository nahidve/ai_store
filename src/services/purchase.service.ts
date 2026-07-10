import { purchaseRepository } from "@/repositories/purchase.repository";

export const purchaseService = {
  async createPurchase(buyerId: string, productId: string, orderId: string) {
    return purchaseRepository.create({
      buyerId,
      productId,
      orderId,
    });
  },

  async getPurchases(buyerId: string) {
    return purchaseRepository.findByBuyer(buyerId);
  },

  async hasAccess(buyerId: string, productId: string) {
    return purchaseRepository.hasAccess(buyerId, productId);
  },
};
