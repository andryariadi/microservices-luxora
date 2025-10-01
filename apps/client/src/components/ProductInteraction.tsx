"use client";

import useCartStore from "@/libs/stores/cartStore";
import { ProductType } from "@/libs/types";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const ProductInteraction = ({ product, selectedSize, selectedColor }: { product: ProductType; selectedSize: string; selectedColor: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [quantity, setQuantity] = useState(1);

  const { addToCart, cart } = useCartStore();

  const selectedVariantProduct = product.variants?.find((v) => v.size === selectedSize && v.color === selectedColor);

  const selectedCartProduct = cart.find((item) => item.variantId === `${product.id}-${selectedSize}-${selectedColor}`);

  const handleTypeChange = (type: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set(type, value);

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleQuantityChange = (type: "increment" | "decrement") => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    }
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      variantId: `${product.id}-${selectedSize}-${selectedColor}`,
      quantity,
      selectedColor,
      selectedSize,
    });
  };

  console.log({ product, cart }, "<---postInteraction");

  return (
    <div className="b-rose-600 space-y-5">
      {/* Sizes */}
      <div className="flex flex-col gap-2 text-xs">
        <span className="text-gray-500">Size</span>

        <div className="flex items-center gap-2">
          {product.availableSizes.map((size) => (
            <button type="button" className={`border-1 p-[2px] ${selectedSize === size ? "border-gray-600" : "border-gray-300"}`} key={size} onClick={() => handleTypeChange("size", size)}>
              <div className={`w-6 h-6 text-center flex items-center justify-center ${selectedSize === size ? "bg-black text-white" : "bg-white text-black"}`}>{size.toUpperCase()}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-gray-500">Color</span>

        <div className="flex items-center gap-2">
          {product.availableColors.map((color) => (
            <button type="button" className={`border-1 p-[2px] ${selectedColor === color ? "border-gray-500" : "border-white"}`} key={color} onClick={() => handleTypeChange("color", color)}>
              <div className={`w-6 h-6`} style={{ backgroundColor: color }} />
            </button>
          ))}
        </div>
      </div>

      {/* Quantity & Stock */}
      <div className="flex items-center gap-3">
        {/* Quantity */}
        <div className="flex flex-col gap-2 text-sm">
          <span className="text-gray-500">Quantity</span>
          <div className="flex items-center gap-2">
            <button disabled={quantity === 1} className={`border-1 border-gray-300 p-1 ${quantity === 1 && "opacity-40 cursor-not-allowed"}`} onClick={() => handleQuantityChange("decrement")}>
              <Minus className="w-4 h-4" />
            </button>

            <span>{quantity}</span>

            <button
              disabled={selectedVariantProduct && quantity >= selectedVariantProduct?.stock}
              className={`border-1 border-gray-300 p-1 ${selectedVariantProduct && quantity >= selectedVariantProduct?.stock && "opacity-40 cursor-not-allowed"}`}
              onClick={() => handleQuantityChange("increment")}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stock */}
        <div className="self-end">
          <span className="text-xs text-gray-500">Stock: {selectedCartProduct?.remainingStock || selectedCartProduct?.remainingStock === 0 ? selectedCartProduct?.remainingStock : selectedVariantProduct?.stock}</span>
        </div>
      </div>

      {/* Button Action */}
      <div className="b-fuchsia-500 space-y-3">
        {/* Add to Cart */}
        <button onClick={handleAddToCart} className="bg-gray-800 text-white w-[92%] px-4 py-2 rounded-md shadow-lg flex items-center justify-center gap-2 text-sm font-medium">
          <Plus className="w-4 h-4" />
          Add to Cart
        </button>

        {/* Buy */}
        <button className="border border-gray-400 shadow-lg text-gray-800 w-[92%] px-4 py-2 rounded-md flex items-center justify-center gap-2 text-sm font-medium">
          <ShoppingCart className="w-4 h-4" />
          Buy this Item
        </button>
      </div>
    </div>
  );
};

export default ProductInteraction;
