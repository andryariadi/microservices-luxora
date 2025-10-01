"use client";

import { ShippingFormInputs } from "@/libs/types";
import { shippingFormSchema } from "@/libs/zod/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

const ShippingForm = ({ setShippingForm }: { setShippingForm: (data: ShippingFormInputs) => void }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormInputs>({
    resolver: zodResolver(shippingFormSchema),
  });

  const handleShippingForm: SubmitHandler<ShippingFormInputs> = (data) => {
    setShippingForm(data);
    router.push("/cart?step=3", { scroll: false });
  };

  return (
    <form onSubmit={handleSubmit(handleShippingForm)} className="b-amber-500 space-y-5">
      {/* Name Input */}
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-xs text-gray-500 font-medium">
          Name
        </label>
        <input className="border-b border-gray-200 py-2 outline-none text-sm" type="text" id="name" placeholder="John Doe" {...register("name")} />
        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
      </div>

      {/* Email Input */}
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-xs text-gray-500 font-medium">
          Email
        </label>
        <input className="border-b border-gray-200 py-2 outline-none text-sm" type="email" id="email" placeholder="johndoe@gmail.com" {...register("email")} />
        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
      </div>

      {/* Phone Input */}
      <div className="flex flex-col gap-1">
        <label htmlFor="phone" className="text-xs text-gray-500 font-medium">
          Phone
        </label>
        <input className="border-b border-gray-200 py-2 outline-none text-sm" type="text" id="phone" placeholder="123456789" {...register("phone")} />
        {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
      </div>

      {/* Address Input */}
      <div className="flex flex-col gap-1">
        <label htmlFor="address" className="text-xs text-gray-500 font-medium">
          Address
        </label>
        <input className="border-b border-gray-200 py-2 outline-none text-sm" type="text" id="address" placeholder="123 Main St, Anytown" {...register("address")} />
        {errors.address && <p className="text-xs text-red-500">{errors.address.message}</p>}
      </div>

      {/* City Input */}
      <div className="flex flex-col gap-1">
        <label htmlFor="city" className="text-xs text-gray-500 font-medium">
          City
        </label>
        <input className="border-b border-gray-200 py-2 outline-none text-sm" type="text" id="city" placeholder="New York" {...register("city")} />
        {errors.city && <p className="text-xs text-red-500">{errors.city.message}</p>}
      </div>

      {/* Continue Button */}
      <button type="submit" className="group w-full bg-gray-800 hover:bg-gray-900 transition-all duration-300 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2">
        <span>Continue</span>
        <ArrowRight size={16} className="hidden group-hover:block transition-all duration-500" />
      </button>
    </form>
  );
};

export default ShippingForm;
