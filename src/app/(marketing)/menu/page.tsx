import { MenuCard } from "@/components/marketing/MenuCard";
import { getMenuItemsByCategory } from "@/lib/data/menu";

export const metadata = {
  title: "Menu | Paco's Taco Shop",
  description: "Explore our full menu of authentic Mexican favorites.",
};

export default async function MenuPage() {
  const itemsByCategory = await getMenuItemsByCategory();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-12 text-center">
        <span className="mb-2 block text-sm font-bold tracking-widest text-taco-gold uppercase">
          Fresh &amp; Flavorful
        </span>
        <h1 className="text-3xl font-black text-taco-dark uppercase md:text-5xl">
          Our Full Menu
        </h1>
        <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-taco-red" />
        <p className="mx-auto mt-4 max-w-2xl text-gray-600">
          Every dish is made fresh daily with recipes passed down through
          generations. Prices may vary by location.
        </p>
      </div>

      <div className="space-y-16">
        {Array.from(itemsByCategory.entries()).map(([category, items]) => (
          <section key={category}>
            <h2 className="mb-8 text-2xl font-black text-taco-red uppercase">
              {category}
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
