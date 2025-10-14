import ProductInteraction from "@/components/ProductInteraction";
import { cardPayment, products } from "@/libs/constant";
import Image from "next/image";

const ProductDetailPage = async ({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ color: string; size: string }> }) => {
  const { id } = await params;
  const { color, size } = await searchParams;

  const product = products.find((product) => product.id === id);

  if (!product) return <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">Product not found</div>;

  const selectedSize = size || (product?.availableSizes[0] as string);
  const selectedColor = color || (product?.availableColors[0] as string);

  return (
    <section className="b-amber-500 container flex flex-col md:flex-row items-start md:gap-10 pt-10">
      {/* Left - Product Image */}
      <div className="w-full lg:w-5/12 relative aspect-[2/3]">
        <Image src={product.availableImages?.[selectedColor] ?? ""} alt={product.name} fill className="object-contain rounded-md" />
      </div>

      {/* Right - Product Detail */}
      <div className="b-sky-500 w-full lg:w-7/12 flex flex-col gap-4">
        {/* Product Name */}
        <h1 className="text-2xl font-medium">{product.name}</h1>
        {/* Product Description */}
        <p className="text-gray-500 font-sora">{product.description}</p>
        {/* Product Price */}
        <h2 className="text-2xl font-semibold">${product.basePrice.toFixed(2)}</h2>

        {/* Product Interaction */}
        <ProductInteraction product={product} selectedSize={selectedSize} selectedColor={selectedColor} />

        {/* Payment Icon */}
        <div className="flex items-center gap-2 mt-4">
          {cardPayment.map((payment) => (
            <Image key={payment.label} src={payment.icon} alt={payment.label} width={50} height={25} className="rounded-md" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductDetailPage;
