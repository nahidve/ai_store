"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CreateProductForm({
  categories,
}: {
  categories: {
    id: string;
    name: string;
  }[];
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    description: "",
    price: "",
    categoryId: "",
    websiteUrl: "",
    demoUrl: "",
  });

  async function submit() {
    try {
      setLoading(true);

      const response = await fetch("/api/vendor/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          priceInPaise: Number(form.price) * 100,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create product");
      }
      console.log(data);

      router.push("/vendor/products");

      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Title"
        value={form.title}
        onChange={(e) =>
          setForm({
            ...form,
            title: e.target.value,
          })
        }
      />

      <Input
        placeholder="Short Description"
        value={form.shortDescription}
        onChange={(e) =>
          setForm({
            ...form,
            shortDescription: e.target.value,
          })
        }
      />

      <textarea
        className="w-full border p-3"
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({
            ...form,
            description: e.target.value,
          })
        }
      />

      <Input
        type="number"
        placeholder="Price (₹)"
        min="0"
        onChange={(e) =>
          setForm({
            ...form,
            price: e.target.value,
          })
        }
      />

      <select
        className="border p-3 w-full"
        value={form.categoryId}
        onChange={(e) =>
          setForm({
            ...form,
            categoryId: e.target.value,
          })
        }
      >
        <option value="">Select Category</option>

        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <Input
        type="url"
        placeholder="https://example.com"
        value={form.websiteUrl}
        onChange={(e) =>
          setForm({
            ...form,
            websiteUrl: e.target.value,
          })
        }
      />

      <Input
        type="url"
        placeholder="https://demo.example.com"
        value={form.demoUrl}
        onChange={(e) =>
          setForm({
            ...form,
            demoUrl: e.target.value,
          })
        }
      />

      <Button onClick={submit} disabled={loading}>
        Create Product
      </Button>
    </div>
  );
}
