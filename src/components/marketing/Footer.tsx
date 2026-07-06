import Image from "next/image";
import Link from "next/link";

const footerLinks = {
  company: [
    { href: "/#story", label: "About Us" },
    { href: "/locations", label: "Locations" },
    { href: "/catering", label: "Catering" },
    { href: "/menu", label: "Menu" },
  ],
  franchise: [
    { href: "/franchise", label: "Franchise Overview" },
    { href: "/franchise#investment", label: "Investment" },
    { href: "/franchise#process", label: "Application Process" },
    { href: "/franchise#inquiry", label: "Request Info" },
  ],
  portal: [
    { href: "/backoffice", label: "Franchise Back Office" },
    { href: "/auth/login", label: "Sign In" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t-4 border-taco-red bg-taco-dark text-gray-400">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Paco's Logo"
                width={40}
                height={40}
                className="h-10 w-10 object-contain opacity-80"
              />
              <div>
                <p className="font-black text-white uppercase">Paco&apos;s Taco Shop</p>
                <p className="text-xs text-gray-500">Franchise Corporation</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              Authentic Mexican food. Proven franchise systems. Growing
              nationwide.
            </p>
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="mb-4 text-xs font-bold tracking-widest text-taco-gold uppercase">
                {section}
              </h4>
              <ul className="space-y-2 text-sm">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-700 pt-8 text-sm md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Paco&apos;s Taco Shop Franchise
            Corporation. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="transition hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="transition hover:text-white">
              Terms of Service
            </Link>
            <Link href="#" className="transition hover:text-white">
              FDD Disclosure
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
