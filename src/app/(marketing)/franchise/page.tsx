import Link from "next/link";

export const metadata = {
  title: "Franchise Opportunities | Paco's Taco Shop",
  description:
    "Own a Paco's Taco Shop franchise. Proven systems, territory protection, and comprehensive support for entrepreneurs.",
};

const processSteps = [
  {
    step: "01",
    title: "Initial Inquiry",
    description: "Submit your information and speak with our franchise development team.",
  },
  {
    step: "02",
    title: "Discovery & FDD Review",
    description: "Receive our Franchise Disclosure Document and evaluate the opportunity.",
  },
  {
    step: "03",
    title: "Approval & Site Selection",
    description: "Secure your territory with demographic analysis and real estate support.",
  },
  {
    step: "04",
    title: "Training & Grand Opening",
    description: "Complete Paco's Academy training and launch with field support on-site.",
  },
];

const investmentItems = [
  { label: "Initial Franchise Fee", value: "$45,000" },
  { label: "Estimated Initial Investment", value: "$285,000 – $525,000" },
  { label: "Royalty Fee", value: "6% of gross sales" },
  { label: "Marketing Fund", value: "2% of gross sales" },
  { label: "Typical Unit Size", value: "1,800 – 2,400 sq ft" },
];

export default function FranchisePage() {
  return (
    <>
      <section className="bg-taco-dark py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <span className="mb-4 inline-block text-sm font-bold tracking-widest text-taco-gold uppercase">
            Franchise Development
          </span>
          <h1 className="mb-6 text-4xl font-black uppercase md:text-5xl">
            Build Your Future with Paco&apos;s
          </h1>
          <p className="text-lg leading-relaxed text-gray-300">
            Join a franchise network built on authentic food, operational
            excellence, and a brand guests love. We partner with driven
            entrepreneurs who share our commitment to quality and community.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-8 text-center text-3xl font-black text-taco-dark uppercase">
          Why Franchise With Paco&apos;s?
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Recognizable Brand",
              text: "A trusted name with strong guest loyalty and distinctive visual identity in every market we enter.",
            },
            {
              title: "Operational Playbook",
              text: "Documented systems for food prep, labor, inventory, and guest service — refined across 25+ locations.",
            },
            {
              title: "Ongoing Partnership",
              text: "Dedicated franchise business consultants, annual conferences, and a corporate team invested in your success.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-amber-100 bg-white p-8 shadow-sm"
            >
              <h3 className="mb-3 text-xl font-bold text-taco-red">{item.title}</h3>
              <p className="text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="investment" className="bg-amber-50 py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-8 text-center text-3xl font-black text-taco-dark uppercase">
            Investment Overview
          </h2>
          <div className="overflow-hidden rounded-2xl border border-amber-200 bg-white shadow-sm">
            <table className="w-full text-left">
              <tbody>
                {investmentItems.map((item, i) => (
                  <tr
                    key={item.label}
                    className={i % 2 === 0 ? "bg-white" : "bg-amber-50/50"}
                  >
                    <td className="px-6 py-4 font-medium text-taco-dark">
                      {item.label}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-taco-teal">
                      {item.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-sm text-gray-500">
            *Figures are estimates. See Franchise Disclosure Document for full details.
          </p>
        </div>
      </section>

      <section id="process" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-12 text-center text-3xl font-black text-taco-dark uppercase">
          Application Process
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => (
            <div key={step.step} className="relative">
              <span className="text-5xl font-black text-amber-200">{step.step}</span>
              <h3 className="mt-2 text-lg font-bold text-taco-dark">{step.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="inquiry" className="bg-taco-teal py-16 text-white">
        <div className="mx-auto max-w-xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-black uppercase">Request Franchise Information</h2>
          <p className="mb-8 text-teal-100">
            Take the first step toward ownership. Our franchise development team
            will reach out within 2 business days.
          </p>
          <a
            href="mailto:franchise@pacostacos.com?subject=Franchise%20Inquiry"
            className="inline-block rounded-xl bg-white px-8 py-4 font-extrabold text-taco-teal shadow-lg transition hover:bg-amber-50"
          >
            Contact Franchise Development
          </a>
          <p className="mt-6 text-sm text-teal-200">
            Already a franchise owner?{" "}
            <Link href="/backoffice" className="font-bold underline hover:text-white">
              Access Back Office
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
