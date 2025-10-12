import { Router } from "express";
import Controller from "../controllers/category.controller";
import { authAdminMiddleware } from "../middleware/authMiddleware";

const router: Router = Router();

router.get("/", Controller.getCategories);
router.get("/:slug", Controller.getCategoryBySlug);
router.post("/", authAdminMiddleware, Controller.createCategory);
router.put("/:id", authAdminMiddleware, Controller.updateCategory);
router.delete("/:id", authAdminMiddleware, Controller.deleteCategory);

export default router;
