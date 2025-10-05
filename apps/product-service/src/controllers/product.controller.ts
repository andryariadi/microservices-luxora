import { Request, Response } from "express";
import { prisma, Prisma } from "@repo/product-db";

class Controller {
  static async createProduct(req: Request, res: Response) {
    const { name, shortDescription, description, basePrice, availableSizes, availableColors, availableImages, categorySlug, variants } = req.body;

    // Validate required fields
    if (!name || !categorySlug) {
      return res.status(400).json({
        error: "Name and category are required!",
      });
    }

    // Check if category exists
    const foundCategory = await prisma.category.findUnique({
      where: { slug: categorySlug },
    });

    if (!foundCategory) {
      return res.status(404).json({
        error: "Category not found!",
      });
    }

    const productData: Prisma.ProductCreateInput = {
      name,
      shortDescription,
      description,
      basePrice,
      availableSizes,
      availableColors,
      availableImages,
      category: {
        connect: { slug: categorySlug }, // Connect to existing category by slug
      },
    };

    // If variants are provided, create them along with the product
    if (variants && Array.isArray(variants)) {
      productData.variants = {
        create: variants.map((variant: any) => ({
          // use "create" for nested creation/write
          size: variant.size,
          color: variant.color,
          stock: variant.stock,
          price: variant.price,
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
  }
}

export default Controller;
