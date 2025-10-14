"use client";

import useCartStore from "@/libs/stores/cartStore";
import { ChevronDown, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ProductType } from "@repo/types";

const ProductCard = ({ product }: { product: ProductType }) => {
  const [productTypes, setProductTypes] = useState({
    size: product.availableSizes[0] || "",
    color: product.availableColors[0] || "",
  });

  const { addToCart, cart } = useCartStore();

  const handleProductType = ({ type, value }: { type: string; value: string }) => {
    setProductTypes((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  // const handleToCart = () => {
  //   addToCart({
  //     ...product,
  //     variantId: `${product.id}-${productTypes.size}-${productTypes.color}`,
  //     quantity: 1,
  //     selectedSize: productTypes.size,
  //     selectedColor: productTypes.color,
  //   });
  // };

  // console.log({ cart }, "<---card");

  return (
    <article className="bg-white shadow-sm rounded-lg overflow-hidden">
      {/* Product Image */}
      <figure className="overflow-hidden">
        <Link href={`/products/${product.id}`}>
          <div className="relative aspect-[3/4]">
            <Image src={product.availableImages?.[productTypes.color] || ""} alt={product.name} fill className="object-cover hover:scale-105 transition-all duration-500" />
          </div>
        </Link>
      </figure>

      {/* Product Info */}
      <figcaption className="p-4 space-y-4">
        {/* Title & Description */}
        <div className="space-y-1">
          {/* Title */}
          <h1 className="font-medium font-roboto">{product.name}</h1>

          {/* Description */}
          <p className="text-sm text-gray-500 line-clamp-2 font-sora">{product.shortDescription}</p>
        </div>

        {/* Types */}
        <div className="b-green-500 flex items-start gap-5">
          {/* Sizes */}
          <div className="flex flex-col gap-1">
            <span className="text-gray-500 text-xs">Size</span>

            <div className="b-rose-500 relative">
              <select name="size" id="size" className="w-[3.2rem] text-xs font-medium border border-gray-300 rounded-md px-2 py-1 appearance-none" onChange={(e) => handleProductType({ type: "size", value: e.target.value })}>
                {product.availableSizes.map((size) => (
                  <option key={size} value={size} className="text-base">
                    {size.toUpperCase()}
                  </option>
                ))}
              </select>

              <span className="pointer-events-none absolute top-[6px] right-[5px] flex items-center">
                <ChevronDown size={16} />
              </span>
            </div>
          </div>

          {/* Colors*/}
          <div className="flex flex-col gap-1">
            <span className="text-gray-500 text-xs">Color</span>

            <div className="py-1 flex items-center gap-2">
              {product.availableColors.map((color) => (
                <button type="button" className={`border-1 ${productTypes.color === color ? "border-gray-400" : "border-gray-200"} rounded-full p-[1.2px]`} key={color} onClick={() => handleProductType({ type: "color", value: color })}>
                  <div className="w-[14px] h-[14px] rounded-full" style={{ backgroundColor: color }} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Price & Cart */}
        <div className="b-fuchsia-500 flex items-center justify-between">
          {/* Price */}
          <p className="font-medium">${product.basePrice.toFixed(2)}</p>

          {/* Cart */}
          <button className="group p-2 rounded-md border-1 border-gray-200 shadow-lg text-sm hover:text-white hover:bg-black transition-all duration-300 flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden text-xs group-hover:block transition-all duration-500">Add to Cart</span>
          </button>
        </div>
      </figcaption>
    </article>
  );
};

export default ProductCard;
