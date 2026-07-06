import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50 to-taco-cream">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <span className="mb-4 inline-block rounded-full bg-taco-teal/10 px-4 py-1.5 text-xs font-bold tracking-widest text-taco-teal uppercase">
              Authentic Mexican Food · Franchise Network
            </span>
            <h1 className="mb-4 text-4xl font-black tracking-tight text-taco-red uppercase md:text-5xl lg:text-6xl">
              A Brand Built on Tradition. A System Built to Scale.
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-gray-600 md:text-xl">
              Paco&apos;s Taco Shop delivers generations of family recipes through
              a proven franchise model — fresh food for guests, strong returns for
              owners, and consistent excellence across every location.
            </p>
            <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
              <Link
                href="/menu"
                className="rounded-xl bg-taco-teal px-8 py-4 font-extrabold text-white shadow-lg transition hover:bg-teal-800"
              >
                View Menu
              </Link>
              <Link
                href="/franchise"
                className="rounded-xl border-2 border-taco-red bg-white px-8 py-4 font-extrabold text-taco-red shadow-md transition hover:bg-taco-red hover:text-white"
              >
                Franchise With Us
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative max-w-sm rounded-full border-4 border-taco-gold bg-white p-3 shadow-xl">
              <Image
                src="/logo.png"
                alt="Paco's Taco Shop Logo"
                width={400}
                height={400}
                className="h-auto w-full rounded-full"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
