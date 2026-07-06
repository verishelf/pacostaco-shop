import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t-8 border-taco-red bg-taco-dark py-12 text-gray-400">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 md:flex-row">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Paco's Logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain opacity-60 grayscale"
          />
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Paco&apos;s Taco Shop. All rights
            reserved.
          </p>
        </div>
        <div className="flex gap-6 text-sm">
          <Link href="#" className="transition hover:text-white">
            Privacy Policy
          </Link>
          <Link href="#" className="transition hover:text-white">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
