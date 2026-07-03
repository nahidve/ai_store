import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Register</h1>

      <RegisterForm />
    </div>
  );
}
