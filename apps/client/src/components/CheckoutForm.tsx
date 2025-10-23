"use client";

import { ShippingFormInputs } from "@repo/types";
import { PaymentElement, useCheckout } from "@stripe/react-stripe-js/checkout";
import { ConfirmError } from "@stripe/stripe-js";
import { useState } from "react";

const CheckoutForm = ({ shippingForm }: { shippingForm: ShippingFormInputs }) => {
  const checkout = useCheckout();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ConfirmError | null>(null);

  console.log({ shippingForm, checkout });

  const handleCheckout = async () => {
    // Make sure checkout is ready:
    if (checkout.type !== "success") {
      setError({
        message: "Checkout is not ready yet",
        code: "paymentFailed",
        paymentFailed: {
          declineCode: "payment_failed",
        },
      });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Update email dan shipping address:
      await checkout.checkout.updateEmail(shippingForm.email);

      await checkout.checkout.updateShippingAddress({
        name: "shipping_address",
        address: {
          line1: shippingForm.address,
          line2: shippingForm.name,
          city: shippingForm.city,
          country: "US",
        },
      });

      // Confirm payment:
      const res = await checkout.checkout.confirm();

      console.log({ res }, "<--handleCheckoutForm");

      if (res.type === "error") {
        setError(res.error);
      }
    } catch (err) {
      setError(err as ConfirmError);
    } finally {
      setLoading(false);
    }
  };

  // Handle different checkout states:
  if (checkout.type === "loading") {
    return <div className="h-full flex items-center justify-center text-gray-900/80">Loading checkout...</div>;
  }

  if (checkout.type === "error") {
    return <div>Error: {checkout.error.message}</div>;
  }

  return (
    <form className="space-y-5">
      <PaymentElement options={{ layout: "accordion" }} className="bg-transparent" />
      <button
        type="button" // Important: prevent form submission
        disabled={loading}
        onClick={handleCheckout}
        className="bg-sky-500 w-full py-2 rounded-md text-gray-900/80"
      >
        {loading ? "Processing..." : "Pay"}
      </button>
      {error && <div className="text-rose-500 text-sm">{error.message}</div>}
    </form>
  );
};

export default CheckoutForm;
