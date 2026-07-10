import { notFound } from "next/navigation";
import { productService } from "@/services/product.service";
import { BuyButton } from "@/components/products/buy-button";

export default async function ProductPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  const product = await productService.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold">{product.title}</h1>

        <p className="mt-4 text-lg">{product.shortDescription}</p>

        <div className="mt-8">
          <p>Category: {product.category.name}</p>
          <p>Vendor: {product.vendor.name}</p>
          <p>Price: ₹{(product.priceInPaise / 100).toFixed(2)}</p>

          <div className="mt-6">
            <BuyButton productId={product.id} />
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold">Description</h2>

          <p className="mt-2 whitespace-pre-wrap">{product.description}</p>
        </div>

        <div className="mt-8 flex gap-4">
          {product.demoUrl && (
            <a
              href={product.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="border px-4 py-2 rounded"
            >
              Try Demo
            </a>
          )}

          {product.websiteUrl && (
            <a
              href={product.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="border px-4 py-2 rounded"
            >
              Visit Website
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
