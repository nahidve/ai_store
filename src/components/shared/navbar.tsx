import Link from "next/link";
import { getCurrentUser } from "@/lib/current-user";
import { LogoutButton } from "@/components/auth/logout-button";

export async function Navbar() {
  const user = await getCurrentUser();
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="font-bold text-xl">
          AI Superstore
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/services">Services</Link>
          {!user && (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          )}
          {user && (
            <>
              <Link href="/dashboard">Dashboard</Link>
              {(user.role === "VENDOR" || user.role === "ADMIN") && (
                <Link href="/vendor">Vendor</Link>
              )}
              {user.role === "ADMIN" && <Link href="/admin">Admin</Link>}
              <LogoutButton />
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
