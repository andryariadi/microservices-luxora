import StepsCart from "@/components/StepsCart";

const CartPage = () => {
  return (
    <section className="b-amber-500 container flex flex-col items-center justify-center gap-5 pt-10">
      {/* Title */}
      <h1 className="text-2xl font-medium">Your Shopping Cart</h1>

      {/* Steps to checkout */}
      <StepsCart />
    </section>
  );
};

export default CartPage;
