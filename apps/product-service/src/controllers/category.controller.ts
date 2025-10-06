import { Prisma, prisma } from "@repo/product-db";
import { Request, Response } from "express";

class Controller {
  static async getCategories(req: Request, res: Response) {
    const categories = await prisma.category.findMany();

    return res.status(200).json(categories);
  }

  static async getCategoryBySlug(req: Request, res: Response) {
    const { slug } = req.params;

    const category = await prisma.category.findUnique({
      where: { slug },
    });

    return res.status(200).json(category);
  }

  static async createCategory(req: Request, res: Response) {
    const data: Prisma.CategoryCreateInput = req.body;

    const existingCategory = await prisma.category.findUnique({
      where: { slug: data.slug },
    });

    if (existingCategory) {
      return res.status(400).json({ error: "Category with this slug already exists!" });
    }

    const category = await prisma.category.create({
      data,
    });

    return res.status(201).json({
      message: "Category created successfully!",
      data: category,
    });
  }

  static async updateCategory(req: Request, res: Response) {
    const { id } = req.params;
    const data: Prisma.CategoryUpdateInput = req.body;

    const category = await prisma.category.update({
      where: { id },
      data,
    });

    return res.status(200).json({
      message: "Category updated successfully!",
      data: category,
    });
  }

  static async deleteCategory(req: Request, res: Response) {
    const { id } = req.params;

    const category = await prisma.category.delete({
      where: { id },
    });

    return res.status(200).json({
      message: "Category deleted successfully!",
      data: category,
    });
  }
}

export default Controller;
