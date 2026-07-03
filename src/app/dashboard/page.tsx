import { getCurrentUser } from "@/lib/current-user";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="mt-6 rounded-lg border p-6">
        <p>Welcome, {user?.name}</p>

        <p>Role: {user?.role}</p>

        <p>Email: {user?.email}</p>
      </div>
    </div>
  );
}
