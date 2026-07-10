import { orderRepository } from "@/repositories/order.repository";

export const orderService = {
  async createOrder(buyerId: string, productId: string, amountInPaise: number) {
    return orderRepository.create({
      buyerId,
      productId,
      amountInPaise,
    });
  },

  async getOrders(buyerId: string) {
    return orderRepository.findByBuyer(buyerId);
  },

  async getOrder(id: string) {
    return orderRepository.findById(id);
  },

  async markPaid(orderId: string) {
    return orderRepository.updateStatus(orderId, "PAID");
  },
};
