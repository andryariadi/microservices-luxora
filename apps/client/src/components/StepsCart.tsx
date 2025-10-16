"use client";

import { stepsMenu } from "@/libs/constant";
import useCartStore from "@/libs/stores/cartStore";
import { ArrowRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ShippingForm from "./ShippingForm";
import PaymentForm from "./PaymentForm";
import CartProductList from "./CartProductList";
import { useState } from "react";
import { ShippingFormInputs } from "@repo/types";
import StripePaymentForm from "./StripePaymentForm";

const StepsCart = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [shippingForm, setShippingForm] = useState<ShippingFormInputs>();

  const activeStep = parseInt(searchParams.get("step") || "1");

  const handleStepChange = (step: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("step", step.toString());

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const { cart } = useCartStore();

  return (
    <div className="b-fuchsia-500 w-full space-y-5">
      {/* Top - Step Buttons */}
      <div className="b-green-500 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
        {stepsMenu.map((step) => (
          <button type="button" key={step.id} className={`flex items-center gap-2 border-b-2 pb-4 ${step.id === activeStep ? "border-gray-800" : "border-gray-200"}`} onClick={() => handleStepChange(step.id)}>
            {/* Step Number */}
            <div className={`w-6 h-6 rounded-full text-white p-4 flex items-center justify-center ${step.id === activeStep ? "bg-gray-800" : "bg-gray-400"}`}>{step.id}</div>

            {/* Step Title */}
            <p className={`text-sm font-medium ${step.id === activeStep ? "text-gray-800" : "text-gray-400"}`}>{step.title}</p>
          </button>
        ))}
      </div>

      {/* Bottom - Step Content */}
      <div className="b-rose-600 w-full flex flex-col lg:flex-row gap-16">
        {/* Left - Content */}
        <div className="b-green-500 w-full lg:w-7/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8">
          {activeStep === 1 ? (
            <CartProductList />
          ) : activeStep === 2 ? (
            <ShippingForm setShippingForm={setShippingForm} />
          ) : activeStep === 3 ? (
            // <PaymentForm />
            shippingForm ? (
              <StripePaymentForm shippingForm={shippingForm} />
            ) : (
              <p className="text-sm text-gray-500">Please fill in the shipping form to continue.</p>
            )
          ) : (
            <p className="text-sm text-gray-500">Please fill in the shipping form to continue.</p>
          )}
        </div>

        {/* Right - Cart Detail */}
        <div className="b-sky-500 h-max w-full lg:w-5/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8">
          {/* Title */}
          <h2 className="font-semibold">Cart Details</h2>

          <div className="b-orange-500 space-y-4">
            {/* Subtotal */}
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Subtotal</p>
              <p className="font-medium">${cart.reduce((acc, item) => acc + (item.variantPrice ?? 0) * item.quantity, 0).toFixed(2)}</p>
            </div>

            {/* Discount */}
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Discount(10%)</p>
              <p className="font-medium">$ 10</p>
            </div>

            {/* Shipping */}
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Shipping Fee</p>
              <p className="font-medium">$10</p>
            </div>

            <hr className="border-gray-200" />

            {/* Total */}
            <div className="flex justify-between">
              <p className="text-gray-800 font-semibold">Total</p>
              <p className="font-medium">${cart.reduce((acc, item) => acc + (item.variantPrice ?? 0) * item.quantity, 0).toFixed(2)}</p>
            </div>

            {/* Continue Button */}
            {activeStep === 1 && (
              <button
                onClick={() => router.push("/cart?step=2", { scroll: false })}
                className="group w-full bg-gray-800 hover:bg-gray-900 transition-all duration-300 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight size={16} className="hidden group-hover:block transition-all duration-500" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepsCart;
