import Image from "next/image";
import Link from "next/link";
import type { Location } from "@/types";

interface LocationSectionProps {
  location: Location;
}

const DAY_LABELS: { key: keyof Location["hours_json"]; label: string }[] = [
  { key: "monday", label: "Monday – Thursday" },
  { key: "friday", label: "Friday – Saturday" },
  { key: "sunday", label: "Sunday" },
];

export function LocationSection({ location }: LocationSectionProps) {
  const { hours_json: hours } = location;

  return (
    <section id="locations" className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="rounded-3xl bg-taco-teal p-8 text-white shadow-xl md:p-12">
          <h2 className="mb-6 text-3xl font-black tracking-tight uppercase">
            Visit The Shop
          </h2>

          <div className="space-y-6">
            <div>
              <h4 className="mb-1 text-xs font-bold tracking-wider text-taco-gold uppercase">
                Our Location
              </h4>
              <p className="text-lg">
                {location.address}
                <br />
                {location.city}, {location.state} {location.zip}
              </p>
            </div>

            <div>
              <h4 className="mb-1 text-xs font-bold tracking-wider text-taco-gold uppercase">
                Hours of Operation
              </h4>
              {DAY_LABELS.map(({ key, label }) =>
                hours[key] ? (
                  <p
                    key={key}
                    className={`text-base ${key === "friday" ? "font-bold text-amber-200" : ""}`}
                  >
                    {label}: {hours[key]}
                    {key === "friday" && hours.notes ? ` (${hours.notes})` : ""}
                  </p>
                ) : null,
              )}
            </div>

            <div>
              <h4 className="mb-1 text-xs font-bold tracking-wider text-taco-gold uppercase">
                Contact
              </h4>
              <p className="text-lg">{location.phone}</p>
            </div>
          </div>
        </div>

        <div className="relative flex h-80 min-h-[320px] flex-col items-center justify-center overflow-hidden rounded-3xl border-4 border-white bg-amber-100 p-8 text-center shadow-md md:h-full">
          <div className="absolute inset-0 bg-[radial-gradient(#C53030_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
          <Image
            src="/logo.png"
            alt="Paco Icon"
            width={96}
            height={96}
            className="mb-4 opacity-80"
          />
          <h3 className="mb-2 text-2xl font-black text-taco-red uppercase">
            Catering Available
          </h3>
          <p className="max-w-sm text-sm text-gray-700">
            Bring the Paco&apos;s Taco Shop experience to your next party,
            wedding, or corporate event. Custom taco bars tailored to any size
            group!
          </p>
          <Link
            href="/catering"
            className="mt-6 inline-block rounded-xl bg-taco-red px-6 py-2.5 text-sm font-bold tracking-wider text-white uppercase shadow transition hover:bg-red-700"
          >
            Inquire Today
          </Link>
        </div>
      </div>
    </section>
  );
}
