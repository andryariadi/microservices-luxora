import { Router } from "express";
import Controller from "../controllers/product.controller";
import { authAdminMiddleware } from "../middleware/authMiddleware";

const router: Router = Router();

router.get("/", Controller.getProducts);
router.get("/:id", Controller.getProduct);
router.post("/", authAdminMiddleware, Controller.createProduct);
router.patch("/:id", authAdminMiddleware, Controller.updateProduct);
router.delete("/:id", authAdminMiddleware, Controller.deleteProduct);

export default router;
