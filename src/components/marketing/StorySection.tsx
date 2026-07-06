import Link from "next/link";

export function StorySection() {
  return (
    <section id="story" className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="mb-2 block text-sm font-bold tracking-widest text-taco-gold uppercase">
            Corporate Overview
          </span>
          <h2 className="mb-6 text-3xl font-black text-taco-dark uppercase md:text-4xl">
            From One Kitchen to a National Brand
          </h2>
          <p className="mb-4 text-lg leading-relaxed text-gray-600">
            Founded on family recipes and community hospitality, Paco&apos;s Taco
            Shop has grown from a single neighborhood taqueria into a franchise
            network trusted by guests and operators alike. Our corporate team
            provides the infrastructure — supply chain, training, marketing, and
            technology — so franchise owners can focus on delivering an
            exceptional guest experience.
          </p>
          <p className="mb-6 text-lg leading-relaxed text-gray-600">
            Every location follows our proven operating playbook while adapting to
            the unique character of its community. That balance of consistency and
            local connection is what sets Paco&apos;s apart.
          </p>
          <Link
            href="/franchise"
            className="inline-flex items-center gap-2 font-bold text-taco-teal transition hover:text-teal-800"
          >
            Learn about franchise opportunities →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Founded", value: "2009" },
            { label: "Headquarters", value: "Oceanside, CA" },
            { label: "Business Model", value: "Franchise" },
            { label: "Support Team", value: "Dedicated Field Ops" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm"
            >
              <p className="text-xs font-bold tracking-wider text-taco-gold uppercase">
                {item.label}
              </p>
              <p className="mt-2 text-lg font-black text-taco-dark">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
