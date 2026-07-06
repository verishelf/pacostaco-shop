import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b-4 border-taco-gold bg-taco-cream/95 shadow-sm backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Paco's Taco Shop Logo"
            width={48}
            height={48}
            className="h-12 w-12 object-contain transition group-hover:scale-105"
            priority
          />
          <span className="text-xl font-black tracking-tight text-taco-red uppercase">
            Paco&apos;s <span className="text-taco-teal">Taco Shop</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-bold tracking-wide text-taco-dark uppercase md:flex">
          <Link href="/menu" className="transition-colors hover:text-taco-red">
            Our Menu
          </Link>
          <Link href="/#story" className="transition-colors hover:text-taco-red">
            Our Story
          </Link>
          <Link
            href="/locations"
            className="transition-colors hover:text-taco-red"
          >
            Hours &amp; Location
          </Link>
        </nav>
        <div>
          <Link
            href="/menu"
            className="transform rounded-full bg-taco-red px-5 py-2 text-sm font-bold tracking-wider text-white uppercase shadow-md transition active:scale-95 hover:bg-red-700"
          >
            Order Now
          </Link>
        </div>
      </div>
    </header>
  );
}
