import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/current-user";

import { purchaseService } from "@/services/purchase.service";

export default async function PurchasesPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const purchases = await purchaseService.getPurchases(user.id);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">My Purchases</h1>

      <div className="space-y-4">
        {purchases.map((purchase) => (
          <div key={purchase.id} className="border rounded p-4">
            <h2 className="font-semibold">{purchase.product.title}</h2>

            <p>Order: {purchase.order.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
