import { Request, Response } from "express";
import { prisma, Prisma } from "@repo/product-db";

class Controller {
  static async createProduct(req: Request, res: Response) {
    try {
      const data: Prisma.ProductCreateInput = req.body;

      const { name, shortDescription, description, basePrice, availableSizes, availableColors, availableImages, category: categorySlug, variants } = data;

      // Validate required fields
      if (!name || !categorySlug) {
        return res.status(400).json({
          error: "Name and categorySlug are required",
        });
      }

      // Check if category exists
      const foundCategory = await prisma.category.findUnique({
        where: { slug: categorySlug },
      });

      if (!foundCategory) {
        return res.status(404).json({
          error: "Category not found",
        });
      }

      const productData: any = {
        name,
        shortDescription,
        description,
        basePrice,
        availableSizes,
        availableColors,
        availableImages,
        category: {
          connect: { slug: categorySlug },
        },
      };

      // If variants are provided, create them along with the product
      if (variants && Array.isArray(variants)) {
        productData.variants = {
          create: variants.map((variant: any) => ({
            size: variant.size,
            color: variant.color,
            stock: parseInt(variant.stock),
            price: parseInt(variant.price),
          })),
        };
      }

      const product = await prisma.product.create({
        data: productData,
        include: {
          variants: true,
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      });

      res.status(201).json({
        message: "Product created successfully!",
        data: product,
      });
    } catch (error: any) {
      console.error("Error creating product:", error);
      res.status(500).json({
        error: "Failed to create product",
        details: error.message,
      });
    }
  }
}

export default Controller;
