import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/current-user";
import { categoryService } from "@/services/category.service";

import { CreateProductForm } from "@/components/vendor/create-product-form";

export default async function CreateProductPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const categories = await categoryService.getAll();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Create Product</h1>

      <CreateProductForm categories={categories} />
    </div>
  );
}
