import { Request, Response } from "express";
import { prisma, Prisma } from "@repo/product-db";

class Controller {
  static async createProduct(req: Request, res: Response) {
    const { name, shortDescription, description, basePrice, availableSizes, availableColors, availableImages, categorySlug, variants } = req.body;

    // Validate required fields:
    if (!name || !categorySlug) {
      return res.status(400).json({
        error: "Name and category are required!",
      });
    }

    // Check if category exists:
    const existingCategory = await prisma.category.findUnique({
      where: { slug: categorySlug },
    });

    if (!existingCategory) {
      return res.status(404).json({
        error: "Category not found!",
      });
    }

    // Validate availableColors and availableImages consistency:
    if (!availableColors || !Array.isArray(availableColors) || availableColors.length === 0) {
      return res.status(400).json({ message: "Colors array is required!" });
    }

    if (!availableImages || typeof availableImages !== "object") {
      return res.status(400).json({ message: "Images object is required!" });
    }

    // Check for missing colors or images:
    const missingColors = availableColors.filter((color) => !Object.keys(availableImages).includes(color));

    if (missingColors.length > 0) {
      return res.status(400).json({ message: "Missing images for colors!", missingColors });
    }

    const missingImages = Object.keys(availableImages).filter((image) => !availableColors.includes(image));

    if (missingImages.length > 0) {
      return res.status(400).json({ message: "Missing colors for images!", missingImages });
    }

    const missingColorVariants = variants.filter((variant: any) => !availableColors.includes(variant.color));

    if (missingColorVariants.length > 0) {
      return res.status(400).json({ message: "Missing color variants!", missingColorVariants });
    }

    console.log({ missingColorVariants });

    // Prepare product data for creation:
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

    // If variants are provided, create them along with the product:
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

  static async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;

    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return res.status(404).json({
        error: "Product not found!",
      });
    }

    const product = await prisma.product.delete({
      where: { id },
    });

    res.status(200).json({
      message: "Product deleted successfully!",
      data: product,
    });
  }

  static async getProducts(req: Request, res: Response) {
    const { sort, category, search, page, limit } = req.query;

    const currentPage = Math.max(Number(page) || 1, 1); // Minimal page 1
    const pageSize = Math.max(Number(limit) || 10, 1); // Minimal limit 1

    const skip = (currentPage - 1) * pageSize;
    const take = pageSize;

    const orderBy = (() => {
      switch (sort) {
        case "asc":
          return { basePrice: Prisma.SortOrder.asc };
          break;
        case "desc":
          return { basePrice: Prisma.SortOrder.desc };
          break;
        case "oldest":
          return { createdAt: Prisma.SortOrder.asc };
          break;
        default:
          return { createdAt: Prisma.SortOrder.desc };
      }
    })();

    const where: Prisma.ProductWhereInput = {};

    if (category) {
      where.category = { slug: category as string };
    }

    if (search) {
      where.OR = [{ name: { contains: search as string, mode: "insensitive" } }, { shortDescription: { contains: search as string, mode: "insensitive" } }, { description: { contains: search as string, mode: "insensitive" } }];
    }

    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take,
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
      }),
      prisma.product.count({ where }), // Get total count with same filters
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);

    res.status(200).json({
      data: products,
      totalData: totalCount,
      limit: pageSize,
      currentPage,
      totalPages,
    });
  }

  static async getProduct(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        error: "Product ID is required!",
      });
    }

    const product = await prisma.product.findUnique({
      where: { id },
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

    if (!product) {
      return res.status(404).json({
        error: "Product not found!",
      });
    }

    res.status(200).json({
      data: product,
    });
  }
}

export default Controller;
