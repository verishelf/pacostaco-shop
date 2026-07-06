import Link from "next/link";
import { getAllLocations } from "@/lib/data/locations";
import type { Location, LocationHours } from "@/types";

export const metadata = {
  title: "Locations | Paco's Taco Shop",
  description: "Find a Paco's Taco Shop near you. Hours, address, and contact info.",
};

const DAY_LABELS: { key: keyof LocationHours; label: string }[] = [
  { key: "monday", label: "Monday – Thursday" },
  { key: "friday", label: "Friday – Saturday" },
  { key: "sunday", label: "Sunday" },
];

function LocationCard({ location }: { location: Location }) {
  const { hours_json: hours } = location;

  return (
    <div className="rounded-3xl bg-white p-8 shadow-md border border-amber-100">
      <h2 className="mb-2 text-2xl font-black text-taco-red">{location.name}</h2>
      <p className="mb-4 text-gray-600">
        {location.address}
        <br />
        {location.city}, {location.state} {location.zip}
      </p>
      <p className="mb-4 font-bold text-taco-teal">{location.phone}</p>

      <div className="mb-6 space-y-1 border-t border-amber-100 pt-4">
        <h3 className="mb-2 text-xs font-bold tracking-wider text-taco-gold uppercase">
          Hours
        </h3>
        {DAY_LABELS.map(({ key, label }) =>
          hours[key] ? (
            <p
              key={key}
              className={`text-sm ${key === "friday" ? "font-bold text-taco-gold" : "text-gray-600"}`}
            >
              {label}: {hours[key]}
              {key === "friday" && hours.notes ? ` (${hours.notes})` : ""}
            </p>
          ) : null,
        )}
      </div>

      <Link
        href="/menu"
        className="inline-block rounded-xl bg-taco-teal px-6 py-2.5 text-sm font-bold text-white transition hover:bg-teal-800"
      >
        View Menu
      </Link>
    </div>
  );
}

export default async function LocationsPage() {
  const locations = await getAllLocations();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-12 text-center">
        <span className="mb-2 block text-sm font-bold tracking-widest text-taco-gold uppercase">
          Find Us
        </span>
        <h1 className="text-3xl font-black text-taco-dark uppercase md:text-5xl">
          Hours &amp; Locations
        </h1>
        <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-taco-red" />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {locations.map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>

      {locations.length === 0 && (
        <p className="text-center text-gray-600">
          No locations available at this time. Check back soon!
        </p>
      )}
    </div>
  );
}
