"use client";

import { useAuth } from "@clerk/nextjs";
import { CheckoutProvider } from "@stripe/react-stripe-js/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { CartItemType, ShippingFormInputs } from "@repo/types";
import useCartStore from "@/libs/stores/cartStore";

const stripe = loadStripe("pk_test_51SHeEyKDN0zX8soh3UCSynEOM46BVhoG3mtiGL4FVILeXthtacFV2r1kW01MQJE070pVkElCK7ZL0VkvuBccQ8jI00PmkfupPC");

const fetchClientSecret = async (cart: CartItemType[], token: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ cart }),
    });

    if (!res.ok) {
      throw new Error("Network response was not ok!");
    }

    const data = await res.json();

    console.log({ data }, "<--fetchClientSecret");

    return data.checkoutSessionClientSecret;
  } catch (error) {
    console.log("Error fetching client secret:", error);
    throw error;
  }
};

const StripePaymentForm = ({ shippingForm }: { shippingForm: ShippingFormInputs }) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();
  const { cart } = useCartStore();

  useEffect(() => {
    const initialize = async () => {
      try {
        const token = await getToken();

        if (!token) return;

        const secret = await fetchClientSecret(cart, token);

        // console.log({ secret }, "<--stripePaymentForm");

        setClientSecret(secret);
      } catch (error) {
        console.log(error, "<--tripePaymentForm");
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, [getToken, cart]);

  if (loading) {
    return <div className="h-full flex items-center justify-center text-gray-900/80">Loading...</div>;
  }

  if (!clientSecret) {
    return <div className="">Failed to initialize payment</div>;
  }

  return (
    <CheckoutProvider stripe={stripe} options={{ clientSecret }}>
      <CheckoutForm shippingForm={shippingForm} />
    </CheckoutProvider>
  );
};

export default StripePaymentForm;
