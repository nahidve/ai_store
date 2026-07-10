import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/current-user";
import { productService } from "@/services/product.service";

export default async function VendorProductsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const products = await productService.getVendorProducts(user.id);

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Products</h1>

        <a href="/vendor/products/create" className="border px-4 py-2 rounded">
          Create Product
        </a>
      </div>

      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4">
            <h2 className="font-semibold">{product.title}</h2>

            <p>{product.shortDescription}</p>

            <p>Status: {product.status}</p>

            <p>₹{(product.priceInPaise / 100).toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
