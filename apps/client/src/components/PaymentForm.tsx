"use client";

import { PaymentFormInputs } from "@/libs/types";
import { paymentFormSchema } from "@/libs/zod/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

const PaymentForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormInputs>({
    resolver: zodResolver(paymentFormSchema),
  });

  const handlePaymentForm: SubmitHandler<PaymentFormInputs> = (data) => {
    console.log(data, "<---handlePaymentForm");
  };
  return (
    <form onSubmit={handleSubmit(handlePaymentForm)} className="b-amber-500 space-y-5">
      {/* Name Card Input */}
      <div className="flex flex-col gap-1">
        <label htmlFor="cardHolder" className="text-xs text-gray-500 font-medium">
          Name on card
        </label>
        <input className="border-b border-gray-200 py-2 outline-none text-sm" type="text" id="cardHolder" placeholder="John Doe" {...register("cardHolder")} />
        {errors.cardHolder && <p className="text-xs text-red-500">{errors.cardHolder.message}</p>}
      </div>

      {/* Card Number */}
      <div className="flex flex-col gap-1">
        <label htmlFor="cardNumber" className="text-xs text-gray-500 font-medium">
          Card Number
        </label>
        <input className="border-b border-gray-200 py-2 outline-none text-sm" type="text" id="cardNumber" placeholder="123456789123" {...register("cardNumber")} />
        {errors.cardNumber && <p className="text-xs text-red-500">{errors.cardNumber.message}</p>}
      </div>

      {/* Expiration Date */}
      <div className="flex flex-col gap-1">
        <label htmlFor="expirationDate" className="text-xs text-gray-500 font-medium">
          Expiration Date
        </label>
        <input className="border-b border-gray-200 py-2 outline-none text-sm" type="text" id="expirationDate" placeholder="01/32" {...register("expirationDate")} />
        {errors.expirationDate && <p className="text-xs text-red-500">{errors.expirationDate.message}</p>}
      </div>

      {/* CVV */}
      <div className="flex flex-col gap-1">
        <label htmlFor="cvv" className="text-xs text-gray-500 font-medium">
          CVV
        </label>
        <input className="border-b border-gray-200 py-2 outline-none text-sm" type="text" id="cvv" placeholder="123" {...register("cvv")} />
        {errors.cvv && <p className="text-xs text-red-500">{errors.cvv.message}</p>}
      </div>

      {/* Payment Icons */}
      <div className="flex items-center gap-2 mt-4">
        <Image src="/klarna.png" alt="klarna" width={50} height={25} className="rounded-md" />
        <Image src="/cards.png" alt="cards" width={50} height={25} className="rounded-md" />
        <Image src="/stripe.png" alt="stripe" width={50} height={25} className="rounded-md" />
      </div>

      {/* Checkout Button */}
      <button type="submit" className="group w-full bg-gray-800 hover:bg-gray-900 transition-all duration-300 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2">
        <span>Checkout</span>
        <ShoppingCart size={16} className="hidden group-hover:block transition-all duration-500" />
      </button>
    </form>
  );
};

export default PaymentForm;
