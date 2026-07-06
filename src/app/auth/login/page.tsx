import { LoginForm } from "@/app/auth/login/LoginForm";

export const metadata = {
  title: "Sign In | Paco's Taco Shop",
};

interface LoginPageProps {
  searchParams: Promise<{ next?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const nextPath = params.next ?? "/backoffice";

  return (
    <div className="flex min-h-screen items-center justify-center bg-taco-cream px-4">
      <div className="w-full max-w-md rounded-3xl border border-amber-100 bg-white p-8 shadow-xl">
        <h1 className="mb-2 text-center text-2xl font-black text-taco-red uppercase">
          Franchise Back Office
        </h1>
        <p className="mb-8 text-center text-sm text-gray-600">
          Sign in to manage your location, orders, and reports
        </p>
        <LoginForm nextPath={nextPath} />
      </div>
    </div>
  );
}
