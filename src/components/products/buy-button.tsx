"use client";

import { useRouter } from "next/navigation";

export function BuyButton({ productId }: { productId: string }) {
  const router = useRouter();

  async function buy() {
    const response = await fetch("/api/orders/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
      }),
    });

    if (!response.ok) {
      alert("Failed to create order");

      return;
    }

    router.push("/orders");
  }

  return (
    <button onClick={buy} className="border px-4 py-2 rounded">
      Buy Now
    </button>
  );
}
