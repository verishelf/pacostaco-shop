import Link from "next/link";

const benefits = [
  {
    title: "Proven Operating System",
    description:
      "Standardized recipes, supply chain partnerships, and field support from day one.",
  },
  {
    title: "Territory Protection",
    description:
      "Exclusive territories with demographic analysis and site selection assistance.",
  },
  {
    title: "Training & Onboarding",
    description:
      "Comprehensive franchise training at Paco's Academy plus ongoing operational coaching.",
  },
  {
    title: "Marketing Power",
    description:
      "National brand campaigns, local store marketing kits, and digital ordering infrastructure.",
  },
];

export function FranchiseSection() {
  return (
    <section id="franchise" className="bg-taco-dark py-20 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <span className="mb-2 block text-sm font-bold tracking-widest text-taco-gold uppercase">
            Franchise Opportunities
          </span>
          <h2 className="text-3xl font-black uppercase md:text-5xl">
            Own a Piece of the Tradition
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-300">
            Join a growing network of entrepreneurs bringing authentic Mexican
            cuisine to communities nationwide. Paco&apos;s Taco Shop provides the
            brand, systems, and support — you bring the passion.
          </p>
        </div>

        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-2xl border border-gray-700 bg-gray-800/50 p-6"
            >
              <h3 className="mb-2 font-bold text-taco-gold">{benefit.title}</h3>
              <p className="text-sm leading-relaxed text-gray-300">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/franchise"
            className="rounded-xl bg-taco-red px-8 py-4 font-extrabold text-white shadow-lg transition hover:bg-red-700"
          >
            Explore Franchising
          </Link>
          <Link
            href="/franchise#inquiry"
            className="rounded-xl border-2 border-taco-gold px-8 py-4 font-extrabold text-taco-gold transition hover:bg-taco-gold hover:text-taco-dark"
          >
            Request Information
          </Link>
        </div>
      </div>
    </section>
  );
}
