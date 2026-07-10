import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/current-user";

import { orderService } from "@/services/order.service";

export default async function OrdersPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const orders = await orderService.getOrders(user.id);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border rounded p-4">
            <h2 className="font-semibold">{order.product.title}</h2>

            <p>Status: {order.status}</p>

            <p>₹{(order.amountInPaise / 100).toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
