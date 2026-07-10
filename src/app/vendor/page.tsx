import Link from "next/link";

import { getCurrentUser } from "@/lib/current-user";

import { vendorService } from "@/services/vendor.service";

export default async function VendorPage() {
  const user = await getCurrentUser();

  const stats = await vendorService.getStats(user!.id);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Vendor Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-4">
        <div className="border p-6 rounded">
          <p>Total</p>

          <h2 className="text-3xl font-bold">{stats.totalProducts}</h2>
        </div>

        <div className="border p-6 rounded">
          <p>Pending</p>

          <h2 className="text-3xl font-bold">{stats.pendingProducts}</h2>
        </div>

        <div className="border p-6 rounded">
          <p>Approved</p>

          <h2 className="text-3xl font-bold">{stats.approvedProducts}</h2>
        </div>

        <div className="border p-6 rounded">
          <p>Rejected</p>

          <h2 className="text-3xl font-bold">{stats.rejectedProducts}</h2>
        </div>
      </div>

      <div className="mt-10 flex gap-4">
        <Link href="/vendor/products" className="border px-4 py-2 rounded">
          My Products
        </Link>

        <Link
          href="/vendor/products/create"
          className="border px-4 py-2 rounded"
        >
          Create Product
        </Link>
      </div>
    </div>
  );
}
