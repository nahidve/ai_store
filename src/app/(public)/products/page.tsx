import Link from "next/link";

import { productService } from "@/services/product.service";

export default async function ProductsPage() {
  const products = await productService.getMarketplaceProducts();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">AI Products</h1>

      {products.length === 0 ? (
        <div className="border rounded-lg p-8 text-center">
          <p>No products available yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="block border rounded-lg p-4 hover:bg-muted transition-colors"
            >
              <h2 className="font-semibold text-lg">{product.title}</h2>

              <p className="mt-2 text-muted-foreground">
                {product.shortDescription}
              </p>

              <div className="mt-4 flex flex-col gap-1 text-sm">
                <p>Price: ₹{(product.priceInPaise / 100).toFixed(2)}</p>

                <p>Vendor: {product.vendor.name}</p>

                <p>Category: {product.category.name}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
