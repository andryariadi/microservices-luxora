import { Router } from "express";
import Controller from "../controllers/category.controller";

const router: Router = Router();

router.get("/", Controller.getCategories);
router.get("/:slug", Controller.getCategoryBySlug);
router.post("/", Controller.createCategory);
router.put("/:id", Controller.updateCategory);
router.delete("/:id", Controller.deleteCategory);

export default router;
