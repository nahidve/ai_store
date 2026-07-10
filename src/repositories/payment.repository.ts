import { prisma } from "@/lib/prisma";
import { PaymentProvider, PaymentStatus } from "@prisma/client";

export const paymentRepository = {
  create(data: {
    provider: "RAZORPAY";
    razorpayOrderId: string;
    amountInPaise: number;
    productOrderId: string;
  }) {
    return prisma.payment.create({
      data: {
        provider: PaymentProvider.RAZORPAY,
        razorpayOrderId: data.razorpayOrderId,
        amountInPaise: data.amountInPaise,
        status: PaymentStatus.CREATED,
        productOrderId: data.productOrderId,
      },
    });
  },

  findByOrderId(productOrderId: string) {
    return prisma.payment.findUnique({
      where: {
        productOrderId,
      },
    });
  },

  markPaid(id: string, razorpayPaymentId: string) {
    return prisma.payment.update({
      where: {
        id,
      },
      data: {
        status: PaymentStatus.PAID,
        razorpayPaymentId,
      },
    });
  },
};
