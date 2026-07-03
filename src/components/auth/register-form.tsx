"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterInput } from "@/validations/auth.schema";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(values: RegisterInput) {
    try {
      setLoading(true);
      await api("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(values),
      });
      router.push("/login");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input placeholder="Name" {...register("name")} />
      {errors.name && <p>{errors.name.message}</p>}

      <Input placeholder="Email" {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}

      <Input type="password" placeholder="Password" {...register("password")} />
      {errors.password && <p>{errors.password.message}</p>}

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Creating Account..." : "Register"}
      </Button>
    </form>
  );
}
