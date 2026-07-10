import Link from "next/link";

import { dashboardService } from "@/services/dashboard.service";

export default async function AdminPage() {
  const stats = await dashboardService.getAdminStats();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="border p-6 rounded">
          <p>Total Users</p>

          <h2 className="text-3xl font-bold">{stats.totalUsers}</h2>
        </div>

        <div className="border p-6 rounded">
          <p>Total Vendors</p>

          <h2 className="text-3xl font-bold">{stats.totalVendors}</h2>
        </div>

        <div className="border p-6 rounded">
          <p>Total Products</p>

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

      <div className="mt-10">
        <Link href="/admin/products" className="border px-4 py-2 rounded">
          Manage Products
        </Link>
      </div>
    </div>
  );
}
