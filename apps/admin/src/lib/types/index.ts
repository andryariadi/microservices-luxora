import z from "zod";
import { categoryFormSchemaValidation, orderFormSchemaValidation, productFormSchemaValidation, userFormSchemaValidation } from "../validations";

export type User = {
  id: string;
  avatar: string;
  fullName: string;
  email: string;
  status: "active" | "inactive";
};

export type Product = {
  id: string | number;
  price: number;
  name: string;
  shortDescription: string;
  description: string;
  sizes: string[];
  colors: string[];
  images: Record<string, string>;
};

export type Transaction = {
  id: string | number;
  title: string;
  badge: string;
  image: string;
  count: number;
};

export type UserFormSchema = z.infer<typeof userFormSchemaValidation>;
export type ProductFormSchema = z.infer<typeof productFormSchemaValidation>;
export type CategoryFormSchema = z.infer<typeof categoryFormSchemaValidation>;
export type OrderFormSchema = z.infer<typeof orderFormSchemaValidation>;
