import { signOut } from "@/lib/actions/auth";

export function SignOutButton({ className }: { className?: string }) {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className={className ?? "text-sm text-gray-400 transition hover:text-white"}
      >
        Sign Out
      </button>
    </form>
  );
}
