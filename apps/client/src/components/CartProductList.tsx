"use client";

import useCartStore from "@/libs/stores/cartStore";
import { CartItemType } from "@repo/types";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

const CartProductList = () => {
  const { cart, updateQuantity, removeFromCart } = useCartStore();

  const handleQuantityChange = (type: "increment" | "decrement", item: CartItemType) => {
    if (type === "increment") {
      updateQuantity(item.variantId, item.quantity + 1);
    } else {
      updateQuantity(item.variantId, item.quantity - 1);
    }
  };

  console.log({ cart }, "<---CartProductList");

  return (
    <>
      {cart.length > 0 ? (
        <div className="space-y-5">
          {cart.map((item) => (
            <div className="b-fuchsia-500 flex items-center justify-between" key={item.variantId}>
              {/* Image & Product Details */}
              <div className="b-sky-600 w-full flex gap-8">
                {/* Product Image */}
                <div className="relative w-32 h-32 bg-gray-50 rounded-lg overflow-hidden">
                  <Image src={item.availableImages?.[item.selectedColor] ?? ""} alt={item.name} fill className="object-contain hover:scale-125 transition-all duration-300" />
                </div>

                {/* Product Details */}
                <div className="b-rose-500 w-full flex flex-col justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                    <p className="text-xs text-gray-500">Size: {item.selectedSize}</p>
                    <p className="text-xs text-gray-500">Color: {item.selectedColor}</p>
                  </div>

                  {/* Price & Quantity */}
                  <div className="b-amber-500 w-full flex items-center gap-8">
                    {/* Price */}
                    <p className="font-medium">${(item.variantPrice ?? 0).toFixed(2)}</p>

                    {/* Quantity */}
                    <div className="text-xs">
                      <div className="flex items-center gap-2">
                        <button className={`border-1 border-gray-300 p-1 `} onClick={() => handleQuantityChange("decrement", item)}>
                          <Minus size={10} />
                        </button>

                        <span>{item.quantity}</span>

                        <button className={`border-1 border-gray-300 p-1 ${item.remainingStock === 0 ? "opacity-40 cursor-not-allowed" : ""}`} onClick={() => handleQuantityChange("increment", item)}>
                          <Plus size={10} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delete Button */}
              <div>
                <button onClick={() => removeFromCart(item.variantId)} className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 transition-all duration-300 text-red-400 flex items-center justify-center cursor-pointer">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-full flex flex-col items-center justify-center">
          <p className="text-xl text-center text-gray-500">Your cart is empty.</p>
          <span className="text-sm text-center text-gray-500">Start shopping to add items to your cart.</span>
        </div>
      )}
    </>
  );
};

export default CartProductList;
