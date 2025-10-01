import z from "zod";
import { categories, colors, sizes } from "../constants";

export const userFormSchemaValidation = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters!" }).max(50),
  email: z.string().email({ message: "Invalid email address!" }),
  phone: z.string().min(10).max(15),
  address: z.string().min(2),
  city: z.string().min(2),
});

export const productFormSchemaValidation = z.object({
  name: z.string().min(1, { message: "Product name is required!" }),
  shortDescription: z.string().min(1, { message: "Short description is required!" }).max(60),
  description: z.string().min(1, { message: "Description is required!" }),
  price: z.number().min(0.01, { message: "Price must be greater than 0!" }),
  category: z.enum(categories, {
    error: "Category is required!",
  }),
  sizes: z.array(z.enum(sizes)).min(1, { message: "At least one size is required!" }),
  colors: z.array(z.enum(colors)).min(1, { message: "At least one color is required!" }),
  images: z.any().optional(),
});

export const categoryFormSchemaValidation = z.object({
  name: z.string().min(1, { message: "Name is Required!" }),
});

export const orderFormSchemaValidation = z.object({
  amount: z.string().min(1, { message: "Amount must be at least 1!" }),
  userId: z.string().min(1, { message: "User Id is required!" }),
  status: z.enum(["pending", "processing", "success", "failed"], {
    error: "Status is required and must be one of: pending, processing, success, failed",
  }),
});
