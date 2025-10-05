import { Request, Response } from "express";

class Controller {
  static async getCategories(req: Request, res: Response) {
    res.status(200).json({ message: "Category controller is working!" });
  }
}

export default Controller;
