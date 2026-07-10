import { paymentRepository } from "@/repositories/payment.repository";

export const paymentService = {
  async createPayment(
    provider: "RAZORPAY",
    razorpayOrderId: string,
    amountInPaise: number,
    productOrderId: string,
  ) {
    return paymentRepository.create({
      provider,
      razorpayOrderId,
      amountInPaise,
      productOrderId,
    });
  },

  async getByOrder(productOrderId: string) {
    return paymentRepository.findByOrderId(productOrderId);
  },

  async markPaid(id: string, razorpayPaymentId: string) {
    return paymentRepository.markPaid(id, razorpayPaymentId);
  },
};
