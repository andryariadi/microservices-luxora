import z from "zod";
import { ProductType } from "./product";

export type CartItemType = ProductType & {
  variantId: string;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
  variantPrice?: number;
  maxStock?: number;
  remainingStock?: number;
};

export type CartType = CartItemType[];

export type CartStoreStateType = {
  cart: CartItemType[];
  hasHydrated: boolean;
};

export type CartStoreActionsType = {
  addToCart: (product: CartItemType) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeFromCart: (variantId: string) => void;
  // clearCart: () => void;
};

export const shippingFormSchema = z.object({
  name: z.string().min(1, "Name is required!"),
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
    .min(1, "Email is required!"),
  phone: z.string().min(7, "Phone number must be between 7 and 10 digits!").max(10, "Phone number must be between 7 and 10 digits!").regex(/^\d+$/, "Phone number must contain only numbers!"),
  address: z.string().min(1, "Address is required!"),
  city: z.string().min(1, "City is required!"),
});

export type ShippingFormInputs = z.infer<typeof shippingFormSchema>;
