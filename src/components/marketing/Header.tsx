import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "/menu", label: "Menu" },
  { href: "/locations", label: "Locations" },
  { href: "/franchise", label: "Franchise" },
  { href: "/#story", label: "About" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-amber-200 bg-white/95 shadow-sm backdrop-blur-sm">
      <div className="border-b border-amber-100 bg-taco-dark py-1.5">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 text-xs text-gray-300">
          <span>Franchise opportunities available nationwide</span>
          <div className="flex items-center gap-4">
            <Link href="/franchise" className="transition hover:text-white">
              Own a Paco&apos;s
            </Link>
            <Link
              href="/backoffice"
              className="font-bold text-taco-gold transition hover:text-amber-300"
            >
              Franchise Login →
            </Link>
          </div>
        </div>
      </div>

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
          <div>
            <span className="block text-lg font-black tracking-tight text-taco-red uppercase leading-tight">
              Paco&apos;s <span className="text-taco-teal">Taco Shop</span>
            </span>
            <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
              Franchise Corporation
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-bold tracking-wide text-taco-dark uppercase lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-taco-red"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/catering"
            className="hidden rounded-lg border border-gray-200 px-4 py-2 text-sm font-bold text-taco-dark transition hover:bg-gray-50 sm:inline-block"
          >
            Catering
          </Link>
          <Link
            href="/menu"
            className="rounded-full bg-taco-red px-5 py-2 text-sm font-bold tracking-wider text-white uppercase shadow-md transition hover:bg-red-700"
          >
            Order Now
          </Link>
        </div>
      </div>
    </header>
  );
}
