import type { MenuItem } from "@/types";
import { OrderButton } from "./OrderButton";

interface MenuCardProps {
  item: MenuItem;
}

function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function MenuCard({ item }: MenuCardProps) {
  const isHouseSpecial = item.is_house_special;

  return (
    <div
      className={`relative flex flex-col justify-between rounded-2xl bg-white p-6 shadow-md ${
        isHouseSpecial
          ? "border-2 border-taco-gold"
          : "border border-amber-100"
      }`}
    >
      {isHouseSpecial && (
        <span className="absolute -top-3 left-6 rounded-full bg-taco-red px-3 py-1 text-xs font-bold tracking-wider text-white uppercase">
          House Special
        </span>
      )}
      <div>
        <div
          className={`mb-4 flex items-start justify-between ${isHouseSpecial ? "mt-2" : ""}`}
        >
          <h3 className="text-xl font-bold text-taco-dark">{item.name}</h3>
          <span className="rounded-lg bg-amber-100 px-2.5 py-1 text-sm font-bold text-taco-gold">
            {formatPrice(item.base_price)}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-gray-600">
          {item.description}
        </p>
      </div>
      <OrderButton
        variant={isHouseSpecial ? "house-special" : "default"}
      />
    </div>
  );
}
