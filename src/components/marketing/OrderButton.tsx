"use client";

import { useState } from "react";

interface OrderButtonProps {
  variant?: "default" | "featured" | "house-special";
  className?: string;
}

export function OrderButton({
  variant = "default",
  className = "",
}: OrderButtonProps) {
  const [showToast, setShowToast] = useState(false);

  const baseStyles =
    "mt-6 w-full rounded-xl py-2 text-sm font-bold transition";

  const variantStyles = {
    default:
      "border border-gray-200 bg-gray-50 hover:bg-taco-gold hover:text-white",
    featured: "bg-taco-teal text-white hover:bg-teal-800",
    "house-special": "bg-taco-teal text-white hover:bg-teal-800",
  };

  function handleClick() {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleClick}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      >
        Add to Order
      </button>
      {showToast && (
        <div className="absolute -top-12 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-lg bg-taco-dark px-4 py-2 text-xs font-bold text-white shadow-lg">
          Online ordering coming soon!
        </div>
      )}
    </div>
  );
}
