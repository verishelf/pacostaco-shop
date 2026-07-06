const stats = [
  { value: "25+", label: "Franchise Locations" },
  { value: "15+", label: "Years of Excellence" },
  { value: "98%", label: "Franchisee Satisfaction" },
  { value: "$1.2M", label: "Avg. Unit Volume" },
];

export function CorporateStats() {
  return (
    <section className="border-y border-amber-200 bg-white py-12">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl font-black text-taco-red md:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1 text-xs font-bold tracking-widest text-taco-dark uppercase md:text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
