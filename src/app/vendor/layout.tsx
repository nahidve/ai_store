import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/current-user";

export default async function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  if (user.role !== "VENDOR" && user.role !== "ADMIN") {
    redirect("/");
  }

  return <>{children}</>;
}
