import type { Category, Product, ProductVariant } from "@repo/product-db";
import z from "zod";

export const colors = ["blue", "green", "red", "yellow", "purple", "orange", "pink", "brown", "gray", "black", "white"] as const;

export const sizes = ["xs", "s", "m", "l", "xl", "xxl", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48"] as const;

export const ProductFormSchemaValidation = z
  .object({
    name: z.string({ message: "Product name is required!" }).min(1, { message: "Product name is required!" }),
    shortDescription: z.string({ message: "Short description is required!" }).min(1, { message: "Short description is required!" }).max(60),
    description: z.string({ message: "Description is required!" }).min(1, { message: "Description is required!" }),
    basePrice: z.number({ message: "Price is required!" }).min(1, { message: "Price is required!" }),
    categorySlug: z.string({ message: "Category is required!" }).min(1, { message: "Category is required!" }),
    availableSizes: z.array(z.enum(sizes)).min(1, { message: "At least one size is required!" }),
    availableColors: z.array(z.enum(colors)).min(1, { message: "At least one color is required!" }),
    availableImages: z.record(z.string(), z.string(), {
      message: "Image for each color is required!",
    }),
    variants: z
      .array(
        z.object({
          size: z.string().min(1, { message: "Size is required!" }),
          color: z.string().min(1, { message: "Color is required!" }),
          stock: z.number().min(0, { message: "Stock cannot be negative!" }),
          price: z.number().min(1, { message: "Price is required!" }),
        })
      )
      .min(1, { message: "At least one variant is required!" })
      .refine(
        (variants) => {
          // Check for duplicate variants (same size and color)
          const uniqueCombinations = new Set();
          for (const variant of variants) {
            const key = `${variant.size}-${variant.color}`;
            if (uniqueCombinations.has(key)) {
              return false;
            }
            uniqueCombinations.add(key);
          }
          return true;
        },
        {
          message: "Duplicate variants (same size and color combination) are not allowed!",
        }
      ),
  })
  .refine(
    (data) => {
      const missingImages = data.availableColors.filter((color: string) => !data.availableImages?.[color]);
      return missingImages.length === 0;
    },
    {
      message: "Image is required for each selected color!",
      path: ["availableImages"],
    }
  )
  .refine(
    (data) => {
      // Generate variants automatically if not provided
      if (!data.variants || data.variants.length === 0) {
        return true; // Let the min(1) validation handle this case
      }

      // Check if all variants match available sizes and colors
      const availableCombinations = new Set();
      data.availableSizes.forEach((size) => {
        data.availableColors.forEach((color) => {
          availableCombinations.add(`${size}-${color}`);
        });
      });

      for (const variant of data.variants) {
        const variantKey = `${variant.size}-${variant.color}`;
        if (!availableCombinations.has(variantKey)) {
          return false;
        }
      }
      return true;
    },
    {
      message: "Variants must match the selected sizes and colors!",
      path: ["variants"],
    }
  );

export type ProductFormSchema = z.infer<typeof ProductFormSchemaValidation>;

export type ProductType = Product & {
  variants?: ProductVariant[];
  availableImages: Record<string, string> | null; // Override JsonValue from prisma with specific type
};

export type ProductsType = ProductType[];

export type StripeProductType = {
  id: string;
  name: string;
  price: number;
};

export const CategoryFormSchemaValidation = z.object({
  name: z.string({ message: "Name is Required!" }).min(1, { message: "Name is Required!" }),
  slug: z.string({ message: "Slug is Required!" }).min(1, { message: "Slug is Required!" }),
});

export type CategoryFormSchema = z.infer<typeof CategoryFormSchemaValidation>;

export type CategoryType = Category;
