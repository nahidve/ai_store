"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export function ProductActions({
  productId,
}: {
  productId: string;
}) {
  const router = useRouter();

  async function approve() {
    await fetch(
      `/api/admin/products/${productId}/approve`,
      {
        method: "POST",
      }
    );

    router.refresh();
  }

  async function reject() {
    await fetch(
      `/api/admin/products/${productId}/reject`,
      {
        method: "POST",
      }
    );

    router.refresh();
  }

  return (
    <div className="flex gap-2 mt-4">
      <Button
        onClick={approve}
      >
        Approve
      </Button>

      <Button
        variant="destructive"
        onClick={reject}
      >
        Reject
      </Button>
    </div>
  );
}