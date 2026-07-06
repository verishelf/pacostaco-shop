import Link from "next/link";

export function FranchiseSection() {
  return (
    <section id="franchise" className="border-t-4 border-taco-gold bg-taco-dark py-16 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <span className="mb-2 block text-sm font-bold tracking-widest text-taco-gold uppercase">
            Franchise Opportunities
          </span>
          <h2 className="text-2xl font-black uppercase md:text-4xl">
            Own a Paco&apos;s Taco Shop
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-300">
            Interested in bringing authentic Mexican food to your community? Join
            our growing franchise network with proven systems, training, and
            ongoing support.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/franchise"
            className="rounded-xl bg-taco-red px-6 py-3 font-bold text-white transition hover:bg-red-700"
          >
            Explore Franchising
          </Link>
          <Link
            href="/franchise#inquiry"
            className="rounded-xl border-2 border-taco-gold px-6 py-3 font-bold text-taco-gold transition hover:bg-taco-gold hover:text-taco-dark"
          >
            Request Information
          </Link>
          <Link
            href="/backoffice"
            className="rounded-xl border border-gray-600 px-6 py-3 text-sm font-bold text-gray-300 transition hover:border-gray-400 hover:text-white"
          >
            Franchise Owner Login
          </Link>
        </div>
      </div>
    </section>
  );
}
