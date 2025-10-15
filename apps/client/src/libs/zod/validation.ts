import z from "zod";

export const shippingFormSchema = z.object({
  name: z.string().min(1, "Name is required!"),
  email: z.email().min(1, "Email is required!"),
  phone: z.string().min(12, "Phone number must be 12 digits!").max(12, "Phone number must be 12 digits!").regex(/^\d+$/, "Phone number must contain only numbers!"),
  address: z.string().min(1, "Address is required!"),
  city: z.string().min(1, "City is required!"),
});

export const paymentFormSchema = z.object({
  cardHolder: z.string().min(1, "Card holder is required!"),
  cardNumber: z.string().min(16, "Card Number is required!").max(16, "Card Number is required!"),
  expirationDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiration date must be in MM/YY format!"),
  cvv: z.string().min(3, "CVV is required!").max(3, "CVV is required!"),
});
