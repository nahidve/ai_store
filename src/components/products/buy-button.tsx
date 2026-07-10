"use client";

import { loadRazorpay } from "@/lib/load-razorpay";

export function BuyButton({
  productId,
  title,
}: {
  productId: string;
  title: string;
}) {
  async function buy() {
    const orderResponse = await fetch("/api/orders/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
      }),
    });

    const orderData = await orderResponse.json();

    if (!orderData.success) {
      alert("Failed to create order");
      return;
    }

    const paymentResponse = await fetch("/api/payments/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: orderData.order.id,
      }),
    });

    const paymentData = await paymentResponse.json();

    if (!paymentData.success) {
      alert("Failed to create payment");
      return;
    }

    const loaded = await loadRazorpay();

    if (!loaded) {
      alert("Razorpay SDK failed");
      return;
    }

    const options = {
      key: paymentData.key,

      amount: paymentData.amount,

      currency: paymentData.currency,

      order_id: paymentData.razorpayOrderId,

      name: "AI Superstore",

      description: title,

      handler: async (response: any) => {
        const verify = await fetch("/api/payments/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(response),
        });

        const result = await verify.json();

        if (result.success) {
          window.location.href = "/purchases";
        } else {
          alert("Verification failed");
        }
      },
    };

    const razorpay = new (window as any).Razorpay(options);

    razorpay.open();
  }

  return (
    <button onClick={buy} className="border px-4 py-2 rounded">
      Buy Now
    </button>
  );
}
