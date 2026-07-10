import { productService } from "@/services/product.service";

import { ProductActions } from "@/components/admin/product-actions";

export default async function AdminProductsPage() {
  const products = await productService.getPendingProducts();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Pending Products</h1>

      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4">
            <h2 className="font-semibold">{product.title}</h2>

            <p>{product.shortDescription}</p>

            <p>Vendor: {product.vendor.name}</p>

            <ProductActions productId={product.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
