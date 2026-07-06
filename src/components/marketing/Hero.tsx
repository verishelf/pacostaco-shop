import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50 to-taco-cream py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative max-w-xs rounded-full border-4 border-taco-gold bg-white p-2 shadow-xl md:max-w-sm">
            <Image
              src="/logo.png"
              alt="Paco's Taco Shop Authentic Mexican Food Logo"
              width={400}
              height={400}
              className="h-auto w-full rounded-full"
              priority
            />
          </div>
        </div>
        <h1 className="mb-4 text-4xl font-black tracking-tight text-taco-red uppercase md:text-6xl">
          Taste the Tradition
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg font-medium text-taco-teal italic md:text-2xl">
          &ldquo;Authentic Mexican Food, made fresh daily with recipes passed
          down through generations.&rdquo;
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/menu"
            className="transform rounded-xl bg-taco-teal px-8 py-4 font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-teal-800"
          >
            Explore Menu
          </Link>
          <Link
            href="/locations"
            className="transform rounded-xl border-2 border-gray-200 bg-white px-8 py-4 font-extrabold text-taco-dark shadow-md transition hover:-translate-y-0.5 hover:bg-gray-50"
          >
            Find Us
          </Link>
        </div>
      </div>
    </section>
  );
}
