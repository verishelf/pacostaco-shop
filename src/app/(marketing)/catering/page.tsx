import Link from "next/link";

export const metadata = {
  title: "Catering | Paco's Taco Shop",
  description:
    "Bring the Paco's Taco Shop experience to your next event with custom taco bars.",
};

export default function CateringPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="mb-12 text-center">
        <span className="mb-2 block text-sm font-bold tracking-widest text-taco-gold uppercase">
          Events &amp; Parties
        </span>
        <h1 className="text-3xl font-black text-taco-dark uppercase md:text-5xl">
          Catering Services
        </h1>
        <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-taco-red" />
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-md border border-amber-100 md:p-12">
        <p className="mb-6 text-lg leading-relaxed text-gray-600">
          Bring the Paco&apos;s Taco Shop experience to your next party, wedding,
          or corporate event. We offer custom taco bars tailored to any size group
          — from intimate gatherings to large celebrations.
        </p>

        <ul className="mb-8 space-y-3 text-gray-600">
          <li className="flex items-start gap-2">
            <span className="font-bold text-taco-gold">✓</span>
            Custom protein selections (carne asada, al pastor, pollo, veggie)
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-taco-gold">✓</span>
            Fresh tortillas, salsas, and all the fixings
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-taco-gold">✓</span>
            On-site setup and serving staff available
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-taco-gold">✓</span>
            Flexible packages for groups of 20 to 500+
          </li>
        </ul>

        <div className="flex flex-wrap gap-4">
          <a
            href="mailto:catering@pacostacos.com?subject=Catering%20Inquiry"
            className="rounded-xl bg-taco-red px-8 py-4 font-extrabold text-white shadow-lg transition hover:bg-red-700"
          >
            Email Us
          </a>
          <Link
            href="/locations"
            className="rounded-xl border-2 border-gray-200 bg-white px-8 py-4 font-extrabold text-taco-dark shadow-md transition hover:bg-gray-50"
          >
            Find a Location
          </Link>
        </div>
      </div>
    </div>
  );
}
