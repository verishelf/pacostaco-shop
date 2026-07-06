import type { MenuItem } from "@/types";
import { MenuCard } from "./MenuCard";

interface MenuSectionProps {
  items: MenuItem[];
  title?: string;
  subtitle?: string;
  showAll?: boolean;
}

export function MenuSection({
  items,
  title = "Customer Favorites",
  subtitle = "Fresh & Flavorful",
  showAll = false,
}: MenuSectionProps) {
  const displayItems = showAll ? items : items.filter((item) => item.is_featured);

  return (
    <section id="menu" className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-12 text-center">
        <span className="mb-2 block text-sm font-bold tracking-widest text-taco-gold uppercase">
          {subtitle}
        </span>
        <h2 className="text-3xl font-black text-taco-dark uppercase md:text-5xl">
          {title}
        </h2>
        <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-taco-red" />
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {displayItems.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
