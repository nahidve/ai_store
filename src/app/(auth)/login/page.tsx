import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Login</h1>

      <LoginForm />
    </div>
  );
}
