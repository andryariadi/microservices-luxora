"use client";

import useCartStore from "@/libs/stores/cartStore";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const ShoppingCartIcon = () => {
  const { cart, hasHydrated } = useCartStore();

  if (!hasHydrated) return null;

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart className="w-4 h-4 text-gray-600" />

      {cart.length > 0 && (
        <span className="absolute -top-2 -right-3 bg-amber-400 w-4 h-4 rounded-full text-gray-600 text-xs font-medium flex items-center justify-center">
          {/* {cart.reduce((acc, item) => acc + item.quantity, 0)} */}
          {cart.length}
        </span>
      )}
    </Link>
  );
};

export default ShoppingCartIcon;
